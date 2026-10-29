const FormInput = ({label, id, labelClassName, inputClassName, ...inputProps}) => {
    return (
        <div className="flex flex-col">
            <label className={labelClassName} htmlFor={id}>{label}</label>
            <input className={inputClassName} id={id} {...inputProps} />
        </div>
    )
}

export default FormInput