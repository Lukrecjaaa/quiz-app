export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-full border-2 border-pink-300 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 px-6 py-3 font-quicksand text-sm font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover-glow-intense magical-pulse hover:from-pink-500 hover:via-pink-600 hover:to-rose-600 focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            <span className="relative">
                {children}
            </span>
        </button>
    );
}
