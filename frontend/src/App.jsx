import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from '@/features/auth/pages/LoginPage'
import SetupBusinessPage from '@/features/auth/pages/SetupBusinessPage'
import Dashboard from '@/features/dashboard/pages/Dashboard'
import './index.css'
import PrivacyPolicy from '@/features/legal/pages/PrivacyPolicy'
import TermsOfService from '@/features/legal/pages/TermsOfService'

function App() {

      return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/setup-business" element={<SetupBusinessPage />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
            </Routes>
        </BrowserRouter>
    )
}
