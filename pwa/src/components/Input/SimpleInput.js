import { makeStyles } from "@material-ui/core"

const useStyle = makeStyles((theme) => ({
    input: {
        fontFamily: 'Homa',
        border: '1px solid black',
        fontSize: '16px',
        width: 'inherit',
        height: 'inherit'
    },
    error: {
        color: 'red',
    }
}))
export default function SimpleInput({ inputClassName, errorClassName, onChange, key, value, autoComplete, placeholder, type, name, error, disabled }) {
    const classes = useStyle();
    return (
        <>
            <input
                disabled={disabled}
                className={`${classes.input} ${inputClassName}`}
                onChange={onChange}
                value={value}
                autoComplete={autoComplete} placeholder={placeholder} type={type} name={name} />
            {
                error ?
                    <div className={`${classes.error} ${errorClassName}`} >{error}</div>
                    :
                    <></>
            }
        </>
    )
}