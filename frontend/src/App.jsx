import { BrowserRouter, Routes, Route } from "react-router"
import LoginPage from "./features/auth/pages/LoginPage"
import SetupBusinessPage from "./features/auth/pages/SetupBusinessPage"
import './index.css'

function App() {

      return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/setup-business" element={<SetupBusinessPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
