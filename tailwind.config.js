/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                olive: {
                    50: '#f8faf4',
                    100: '#e9edc9',
                    200: '#d4dba8',
                    300: '#a3b18a',
                    400: '#7a8f6d',
                    500: '#606c38',
                    600: '#4d572d',
                    700: '#3d4424',
                    800: '#283618',
                    900: '#1a2410',
                }
            },
            fontFamily: {
                serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'spin-reverse-slow': 'spin 20s linear infinite reverse',
            }
        },
    },
    plugins: [],
}
