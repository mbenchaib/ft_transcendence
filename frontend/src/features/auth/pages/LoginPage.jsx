import AuthLayout from '../components/AuthLayout'
import FormInput from '../components/FormInput'

const Intro = () => {
    return (
        <div className="mt-9 mb-7">
            <h1 className="font-['Libre_Caslon_Display'] text-3xl">Welcome back.</h1>
            <p className="mt-2 text-[#747067] text-sm">Enter your details to access your customer workspace.</p>
        </div>
    )

}

const LoginForm = () => {
    return (
        <form onSubmit={(event) => {event.preventDefault()}}>
            <FormInput
                label="Work email"
                type="email"
                id="email"
                name="email"
                required
                labelClassName="mb-2 text-xs font-bold text-[#625F57] uppercase"
                inputClassName=""
            />

            <FormInput
                label="Password"
                type="password"
                id="password"
                name="password"
                required
            />

            <FormInput
                label="Remember me"
                type="checkbox"
                id="remember"
                name="remember_me"
            />

            <button type="submit">Enter Workspace</button>
        </form>
    )
}

const LoginPage = () => {
    return (
        <AuthLayout>
            <Intro />
            <LoginForm />
        </AuthLayout>
    )
}

export default LoginPage