import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { HomePage } from "@pages/home"
import { LoginPage } from "@pages/login"
import { AdminPage } from "@pages/admin"
import { UserPage } from "@pages/user"
import { RegistrationPage } from "@pages/registration"
import { UserProfilePage } from "@pages/user-profile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/user/*" element={<UserPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
