import logo from "../assets/NiftyIQ.png"

function Navbar() {

  const scrollToSection = (sectionId) => {

    const section = document.getElementById(sectionId)

    if (section) {

      section.scrollIntoView({
        behavior: "smooth"
      })

    }

  }

  return (

    <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#020617]/80 border-b border-gray-800">

      <div className="flex justify-between items-center px-10 py-4">

        {/* LOGO SECTION */}

        <div className="flex items-center gap-3">

          {/* <img
            src={logo}
            alt="NiftyIQ Logo"
            className="w-12 h-12 hover:scale-105 transition-transform duration-300"
          /> */}

          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            NiftyIQ
          </span>

        </div>

        {/* NAV LINKS */}

        <div className="flex gap-10 text-gray-300 font-medium">

          <button
            onClick={() => scrollToSection("hero")}
            className="hover:text-cyan-400 transition-all duration-300 hover:scale-105"
          >
            Dashboard
          </button>

          <button
            onClick={() => scrollToSection("companies")}
            className="hover:text-cyan-400 transition-all duration-300 hover:scale-105"
          >
            Companies
          </button>

          <button
            onClick={() => scrollToSection("analytics")}
            className="hover:text-cyan-400 transition-all duration-300 hover:scale-105"
          >
            Analytics
          </button>

        </div>

      </div>

    </div>
  )
}

export default Navbar