const Intro = ({title, description}) => {
    return (
        <div className="mt-9 mb-7">
            <h1 className="font-['Libre_Caslon_Display'] text-3xl">{title}</h1>
            <p className="mt-2 text-[#747067] text-sm">{description}</p>
        </div>
    )
}

export default Intro