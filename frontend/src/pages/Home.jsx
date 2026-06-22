import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import StatsCards from "../components/StatsCards"
import CompanyTable from "../components/CompanyTable"
import AnalyticsSection from "../components/AnalyticsSection"

function Home() {

  return (

    <div className="bg-[#020617] min-h-screen text-white overflow-x-hidden">

      <Navbar />

      <HeroSection />

      <StatsCards />

      <CompanyTable />

      <AnalyticsSection />

    </div>
  )
}

export default Home