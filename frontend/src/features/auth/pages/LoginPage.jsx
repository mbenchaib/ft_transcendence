import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'
import SubmitButton from '../components/SubmitButton'
import Footer from '../components/CardFooter'
import Intro from '../components/CardIntro'
import authService from '../services/authService'
import { useState } from 'react'
import { useNavigate } from 'react-router'


const LoginOptions = ({value, setForm}) => {

    const handleRemember = (event) => {
        const {name, checked} = event.target
        setForm(prevForm => ({...prevForm, [name]: checked}))
    }

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <input
                    type="checkbox"
                    id="remember-me"
                    name="remember"
                    className="size-4"
                    checked={value}
                    onChange={handleRemember}
                />
                <label className="text-sm text-[#625F57]" htmlFor="remember-me">Remember me</label>
            </div>

            <p className="text-sm text-[#171713] text-semibold">Forgot password?</p>
        </div>
    )
}

const LoginForm = () => {
    const [form, setForm] = useState({email: "", password: "", remember: false})

    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleLogin = async (event) => {
        event.preventDefault()
        setError('')
        setLoading(true)
        try {
            await authService.login({ email: form.email, password: form.password })
            navigate('/workspace')
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Try again.')
        } finally { setLoading(false) }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <FormInput
                value={form.email}
                setForm={setForm}
                label="Work email"
                type="email"
                id="email"
                name="email"
                placeholder="you@company.com"
                required
            />

            <FormInput
                value={form.password}
                setForm={setForm}
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Enter you password"
                minLength={8}
                maxLength={64}
                required
            />

            <LoginOptions value={form.remember} setForm={setForm}  />

            {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
            <SubmitButton label={loading ? "Signing in..." : "Enter Workspace"} />
        </form>
    )
}

const LoginPage = () => {
    return (
        <AuthLayout>
            <Intro title="Welcome back." description="Enter your details to access your customer workspace." />
            <LoginForm />
            <Footer message="New to Apex Drive?" linkText="Set up your business" link="/setup-business" />
        </AuthLayout>
    )
}

export default LoginPage