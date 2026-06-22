import { FaChartLine, FaDatabase, FaBuilding } from "react-icons/fa"

function StatsCards() {

  const cards = [
    {
      title: "Companies",
      value: "100+",
      icon: <FaBuilding />
    },

    {
      title: "Financial Records",
      value: "12 Years",
      icon: <FaDatabase />
    },

    {
      title: "Growth Analytics",
      value: "AI Powered",
      icon: <FaChartLine />
    }
  ]

  return (

    <div className="grid md:grid-cols-3 gap-8 px-10 pb-24">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-[#1e293b]/80 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
        >

          <div className="text-5xl text-cyan-400 mb-6">

            {card.icon}

          </div>

          <h2 className="text-5xl font-black">

            {card.value}

          </h2>

          <p className="text-gray-400 mt-4 text-lg">

            {card.title}

          </p>

        </div>

      ))}

    </div>
  )
}

export default StatsCards