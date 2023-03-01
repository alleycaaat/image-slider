export const Button = ({ id, value, arialabel, onClick, className, children }) => {
    return (
        <button
            //id={id}
            //value={value}
            aria-label={arialabel}
            onClick={onClick}
            className={className}>
            {children}
        </button>
    )
}