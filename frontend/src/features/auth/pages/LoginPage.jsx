import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'
import SubmitButton from '../components/SubmitButton'
import Footer from '../components/CardFooter'
import Intro from '../components/CardIntro'
import authService from '../services/authService'
import { useState } from 'react'


const LoginOptions = ({value, setForm}) => {

    const handleRemember = (event) => {
        const {name, checked} = event.target
        console.log(checked)
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

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(event.target.elements.email.value)
        authService.login({email: form.email, password: form.password, remember: form.remember})
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
                required
            />

            <LoginOptions value={form.remember} setForm={setForm}  />

            <SubmitButton label="Enter Workspace" />
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