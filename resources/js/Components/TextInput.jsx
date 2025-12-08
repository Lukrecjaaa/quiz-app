import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-2xl border-2 border-cute-pink-100 bg-white/80 px-4 py-3 text-pastel-purple-700 shadow-md placeholder:text-pastel-lavender-400 focus:border-pastel-purple-300 focus:ring-4 focus:ring-cute-pink-100 transition-all ' + className
            }
            ref={localRef}
        />
    );
});
