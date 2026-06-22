import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function CompanyTable() {

  const [companies, setCompanies] = useState([])

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  useEffect(() => {

    axios.get("http://127.0.0.1:8000/api/companies/")
      .then((response) => {

        setCompanies(response.data)

      })
      .catch((error) => {

        console.log(error)

      })

  }, [])

  const filteredCompanies = companies.filter((company) =>

    company.company_name.toLowerCase().includes(search.toLowerCase()) ||

    company.company_id.toLowerCase().includes(search.toLowerCase())

  )

  return (

    <div
      id="companies"
      className="px-10 pb-24"
    >

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-10">

        <div>

          <h2 className="text-3xl md:text-4xl font-black text-white">

            Top Companies

          </h2>

          <p className="text-gray-400 mt-2">

            Explore Nifty100 companies with financial intelligence

          </p>

        </div>

        <input
          type="text"
          placeholder="Search Company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1e293b] border border-gray-700 rounded-2xl px-5 py-3 outline-none w-full md:w-[320px] focus:border-cyan-400 transition-all duration-300"
        />

      </div>

      <div className="bg-[#1e293b]/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">

        <table className="w-full">

          <thead className="bg-[#0f172a]">

            <tr>

              <th className="text-left p-5 text-gray-400 text-base">
                Company ID
              </th>

              <th className="text-left p-5 text-gray-400 text-base">
                Company Name
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCompanies.map((company, index) => (

              <tr
                key={index}
                onClick={() => navigate(`/dashboard/${company.company_id}`)}
                className="border-t border-gray-800 hover:bg-[#334155] transition-all duration-300 cursor-pointer"
              >

                <td className="p-5 text-cyan-400 font-bold">
                  {company.company_id}
                </td>

                <td className="p-5 text-white">
                  {company.company_name}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default CompanyTable