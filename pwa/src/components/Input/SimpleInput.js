import { makeStyles } from "@material-ui/core"
import { numberOnly } from "../../infrastructure/FormHelper";

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
export default function SimpleInput({ inputClassName, errorClassName, onChange, key, value, autoComplete, placeholder, type, name, error, disabled, ...other }) {
    const classes = useStyle();
    return (
        <>
            <input
                disabled={disabled}
                className={`${classes.input} ${inputClassName}`}
                onChange={onChange}
                value={value}
                autoFocus
                onKeyDown={numberOnly}
                autoComplete={autoComplete} placeholder={placeholder} type={type} name={name}
                {...other}
                type="tel"
                />
            {
                error ?
                    <div className={`${classes.error} ${errorClassName}`} >{error}</div>
                    :
                    <></>
            }
        </>
    )
}