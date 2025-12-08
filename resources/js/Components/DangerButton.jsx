export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-full border-2 border-rose-200 bg-gradient-to-r from-rose-400 to-rose-500 px-5 py-2 font-comfortaa text-sm font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:from-rose-500 hover:to-rose-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
