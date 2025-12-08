import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                quicksand: ['Quicksand', 'sans-serif'],
                comfortaa: ['Comfortaa', 'sans-serif'],
            },
            colors: {
                'cute-pink': {
                    50: '#fef7fb',
                    100: '#fef0f7',
                    200: '#fde1ef',
                    300: '#fbc2df',
                    400: '#f8a3cf',
                    500: '#f17ab8',
                    600: '#e255a1',
                    700: '#c93d84',
                    800: '#a6346d',
                    900: '#892f5c',
                },
                'pastel-purple': {
                    50: '#faf5ff',
                    100: '#f5ebff',
                    200: '#ead5ff',
                    300: '#d9b3ff',
                    400: '#c291ff',
                    500: '#a666ff',
                    600: '#8f47ff',
                    700: '#7a2eeb',
                    800: '#6626c5',
                    900: '#5522a1',
                },
                'pastel-lavender': {
                    50: '#faf7fd',
                    100: '#f5eefb',
                    200: '#ebe0f7',
                    300: '#d9c7f0',
                    400: '#c0a4e7',
                    500: '#a47dd9',
                    600: '#8a5ec7',
                    700: '#734baa',
                    800: '#61408d',
                    900: '#503773',
                },
            },
        },
    },

    plugins: [forms],
};
