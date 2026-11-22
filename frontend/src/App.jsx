import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import LoginPage from './features/auth/pages/LoginPage'
import SetupBusinessPage from './features/auth/pages/SetupBusinessPage'
import WorkspacePage from './features/workspace/WorkspacePage'
import './index.css'
export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/setup-business" element={<SetupBusinessPage />} />
    <Route path="/workspace" element={<WorkspacePage />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes></BrowserRouter>
}
