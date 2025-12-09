export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-full border-2 border-pastel-lavender-200 bg-white px-5 py-2 font-quicksand text-sm font-semibold text-pastel-purple-600 shadow-md transition-all duration-300 ease-in-out hover:bg-pastel-lavender-50 hover:scale-105 hover-glow focus:outline-none focus:ring-4 focus:ring-pastel-lavender-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
