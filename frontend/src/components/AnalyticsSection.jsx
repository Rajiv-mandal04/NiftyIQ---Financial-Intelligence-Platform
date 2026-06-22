import { useEffect, useState } from "react"
import axios from "axios"

function AnalyticsSection() {

  const [companies, setCompanies] = useState([])

  useEffect(() => {

    axios.get("http://127.0.0.1:8000/api/top-growth/")
      .then((response) => {

        const cleanedData = response.data
          .filter((item) => item.sales_growth !== null)
          .sort((a, b) => b.sales_growth - a.sales_growth)
          .slice(0, 10)
          .map((item, index) => ({

            rank: index + 1,

            company: item.company__company_name,

            sales_growth: Number(item.sales_growth || 0),

            profit_growth: Number(item.profit_growth || 0)

          }))

        setCompanies(cleanedData)

      })
      .catch((error) => {

        console.log(error)

      })

  }, [])

  return (

    <div
      id="analytics"
      className="px-10 pb-24"
    >

      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">

          Analytics Overview

        </h2>

        <p className="text-gray-400 mt-2">

          Top 10 companies based on sales growth

        </p>

      </div>

      {/* MAIN CARD */}

      <div
        className="
          bg-[#1e293b]/90
          backdrop-blur-xl
          rounded-3xl
          border
          border-gray-800
          overflow-hidden
          shadow-xl
        "
      >

        {/* HEADER ROW */}

        <div
          className="
            grid
            grid-cols-12
            px-6
            py-4
            bg-[#0f172a]
            border-b
            border-gray-800
            text-gray-400
            text-sm
            font-medium
          "
        >

          <div className="col-span-1">
            Rank
          </div>

          <div className="col-span-4">
            Company
          </div>

          <div className="col-span-5">
            Sales Growth Performance
          </div>

          <div className="col-span-2 text-right">
            Growth
          </div>

        </div>

        {/* ROWS */}

        {companies.map((item, index) => (

          <div
            key={index}
            className="
              grid
              grid-cols-12
              items-center
              px-6
              py-5
              border-b
              border-gray-800
              hover:bg-[#334155]/30
              transition-all
              duration-300
            "
          >

            {/* RANK */}

            <div className="col-span-1">

              <p className="text-cyan-400 font-semibold text-base">

                #{item.rank}

              </p>

            </div>

            {/* COMPANY */}

            <div className="col-span-4">

              <h3 className="text-white font-medium text-[15px]">

                {item.company}

              </h3>

              <p className="text-gray-500 text-sm mt-1">

                Profit Growth: {item.profit_growth.toFixed(2)}%

              </p>

            </div>

            {/* BAR */}

            <div className="col-span-5 pr-6">

              <div className="w-full bg-[#0f172a] rounded-full h-3 overflow-hidden">

                <div
                  className="
                    h-3
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    to-blue-500
                    transition-all
                    duration-[1800ms]
                    ease-out
                  "
                  style={{
                    width: `${Math.min(
                      Math.abs(item.sales_growth),
                      100
                    )}%`
                  }}
                ></div>

              </div>

            </div>

            {/* VALUE */}

            <div className="col-span-2 text-right">

              <p className="text-cyan-400 font-semibold text-base">

                {item.sales_growth.toFixed(2)}%

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AnalyticsSection