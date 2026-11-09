import { Link } from 'react-router'

const Footer = ({message, linkText, link}) => {
    return (
        <div className="flex flex-row justify-center gap-1 py-6 -mx-5 -mb-5 mt-5 border-t border-solid border-[#E7E3DA] bg-[#F6F3ED]">
            <p className="text-sm font-normal text-[#716D64]">{message}</p>
            <Link className="text-sm font-bold text-[#171713] underline underline-offset-4 decoration-[#C9C3B7]" to={link}>{linkText}</Link>
        </div>
    )
}

export default Footer