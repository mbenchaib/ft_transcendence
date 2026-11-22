import { useNavigate } from 'react-router'
import authService from '../auth/services/authService'
export default function WorkspacePage() {
  const navigate = useNavigate()
  async function signOut() {
    try { await authService.logout() } catch (error) { console.error('Logout failed', error) } finally { navigate('/login') }
  }
  return <main className="min-h-screen bg-[#F2F0EB] p-8">
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow">
      <h1 className="text-3xl font-bold">Workspace starter</h1>
      <p className="mt-4">Authentication is connected. Customers, bookings, and CRM dashboards are not implemented yet.</p>
      <button className="mt-6 rounded-full bg-[#C99934] px-6 py-3" onClick={signOut}>Log out</button>
    </div>
  </main>
}
