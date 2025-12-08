export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-comfortaa font-semibold text-pastel-purple-700 tracking-wide ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
