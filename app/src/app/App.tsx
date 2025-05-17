import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { HomePage } from "@pages/home"
import { LoginPage } from "@pages/login"
import { AdminPage } from "@pages/admin"
import { UserPage } from "@pages/user"
import { RegistrationPage } from "@pages/registration"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/user/*" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
