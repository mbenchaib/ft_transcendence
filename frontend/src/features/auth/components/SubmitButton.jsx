const SubmitButton = ({label}) => {
    return (
        <button className="group flex w-full flex-row items-center justify-between px-6 py-4 border-solid rounded-full bg-[#C99934] hover:bg-[#D8AA49]" type="submit">
            <span className="text-[#171713]">
                {label}
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
    )
}

export default SubmitButton