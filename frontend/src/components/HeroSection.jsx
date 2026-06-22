function HeroSection() {

  const scrollToCompanies = () => {

    const section = document.getElementById("companies")

    if (section) {

      section.scrollIntoView({
        behavior: "smooth"
      })

    }

  }

  return (

    <div
      id="hero"
      className="px-11 py-28 relative overflow-hidden"
    >

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10">

        <h1 className="text-7xl font-black leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">

          NiftyIQ <br />

          Financial Intelligence System

        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-4xl leading-relaxed">

          Advanced financial analytics platform for investors,
          analysts, and businesses using real-time company insights,
          growth analysis, cashflow tracking, and AI-driven scoring.

        </p>

        <button
          onClick={scrollToCompanies}
          className="mt-10 bg-cyan-500 hover:bg-cyan-400 hover:scale-105 transition-all duration-300 px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-cyan-500/20"
        >

          Explore Dashboard

        </button>

      </div>

    </div>
  )
}

export default HeroSection