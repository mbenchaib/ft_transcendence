import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'
import SubmitButton from '../components/SubmitButton'
import Footer from '../components/CardFooter'
import Intro from '../components/CardIntro'
import authService from '../services/authService'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const SetupForm = () => {
    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    const [form, setForm] = useState(initialState)

    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSetup = async (event) => {
        event.preventDefault()
        setError('')
        setLoading(true)
        try {
            await authService.signUp({
                first_name: form.firstName,
                last_name: form.lastName,
                email: form.email,
                password: form.password
            })
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Try again.')
        } finally { setLoading(false) }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSetup}>
            <FormInput
                value={form.firstName}
                setForm={setForm}
                label="First name"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                required
            />

            <FormInput
                value={form.lastName}
                setForm={setForm}
                label="Last name"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                required
            />

            <FormInput
                value={form.email}
                setForm={setForm}
                label="Business email"
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

            {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
            <SubmitButton label={loading ? "Creating..." : "Create my Workspace"} />
        </form>
    )
}

const SetupBusinessPage = () => {
    return (
        <AuthLayout>
            <Intro title="Start Your Engine" description="Create a CRM workspace for your rental car business." />
            <SetupForm />
            <Footer message="Already have a workspace?" linkText="Log in instead" link="/login" />
        </AuthLayout>
    )
}

export default SetupBusinessPage