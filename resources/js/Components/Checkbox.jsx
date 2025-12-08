export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-lg border-cute-pink-200 text-cute-pink-500 shadow-sm focus:ring-4 focus:ring-cute-pink-200 ' +
                className
            }
        />
    );
}
