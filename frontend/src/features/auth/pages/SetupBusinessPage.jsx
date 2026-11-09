import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'
import SubmitButton from '../components/SubmitButton'
import Footer from '../components/CardFooter'
import Intro from '../components/CardIntro'
import authService from '../services/authService'
import { useState } from 'react'

const SetupForm = () => {
    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    const [form, setForm] = useState(initialState)

    const handleSetup = (event) => {
        event.preventDefault()
        authService.signUp({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password
        })
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
                required
            />

            <FormInput
                value={form.lastName}
                setForm={setForm}
                label="Last name"
                type="text"
                id="lastName"
                name="lastName"
                required
            />

            <FormInput
                value={form.email}
                setForm={setForm}
                label="Business email"
                type="email"
                id="email"
                name="email"
                required
            />

            <FormInput
                value={form.password}
                setForm={setForm}
                label="Password"
                type="password"
                id="password"
                name="password"
                minLength={15}
                maxLength={64}
                required
            />

            <SubmitButton label="Create my Workspace" />
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