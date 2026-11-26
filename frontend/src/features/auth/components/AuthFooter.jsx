import { Link } from 'react-router'

const AuthFooter = () => {
    return (
        <footer className="px-12">
            <div className="flex justify-evenly py-6 px-6 border-t border-[#d8d4ca]">
                <p>© 2026 Our CRM</p>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
            </div>
        </footer>
    )
}

export default AuthFooter