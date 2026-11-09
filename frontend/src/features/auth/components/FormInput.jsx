import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const FormInput = ({label, id, value, setForm, ...inputProps}) => {
    const [showPassword, setShowPassword] = useState(false)
    const labelClassName = "text-xs font-bold text-[#625F57] uppercase"
    const inputClassName = `
        text-sm font-normal text-[#171713]
        placeholder:font-normal placeholder:text-sm
        border border-solid border-[#D8D4CA] rounded-2xl 
        focus:border-[#8D6D29] focus:outline-none
        focus:ring-4 focus:ring-[#C99934]/[0.12]
        py-3.5 px-4 bg-white
    `

    const password = id === "password" ? true : false
    console.log(password)

    const handleInput = (event) => {
        const {name, value} = event.target
        console.log(value)
        setForm(prevForm => ({...prevForm, [name]: value}))
    }

    const handleEye = (event) => {
        setShowPassword(!showPassword)
        console.log(showPassword)
    }

    return (
        <div className="flex flex-col gap-2">
            <label className={labelClassName} htmlFor={id}>{label}</label>
            {!password
                ? <input className={inputClassName} id={id} {...inputProps} value={value} onChange={handleInput}  />
                : <div className="flex items-center">
                    <input className={`${inputClassName} w-full`} id={id} {...inputProps} value={value} onChange={handleInput}  />
                    {showPassword ? <Eye className="-ml-7" size={16} onClick={handleEye} /> : <EyeOff className="-ml-7" size={16} onClick={handleEye} />}
                </div>
            }           
        </div>
    )
}

export default FormInput