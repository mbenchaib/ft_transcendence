import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'

const SetupForm = () => {
    return (
        <form onSubmit={(event) => {event.preventDefault()}}>
            <FormInput
                label="Business name"
                type="text"
                id="businessName"
                name="businessName"
                required
            />

            <FormInput
                label="Your name"
                type="text"
                id="OwnerName"
                name="OwnerName"
                required
            />

            <FormInput
                label="Business email"
                type="email"
                id="email"
                name="email"
                required
            />

            <FormInput
                label="Password"
                type="password"
                id="password"
                name="password"
                required
            />

            <button type="submit">Create my workspace</button>
        </form>
    )
}

const SetupBusinessPage = () => {
    return (
        <AuthLayout>
            <h1>Start Your Engine</h1>
            <p>Create a CRM workspace for your rental car business.</p>
            <SetupForm />
        </AuthLayout>
    )
}

export default SetupBusinessPage