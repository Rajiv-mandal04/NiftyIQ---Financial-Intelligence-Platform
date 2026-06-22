import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import CompanyDashboard from "./pages/CompanyDashboard"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard/:companyId"
          element={<CompanyDashboard />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App