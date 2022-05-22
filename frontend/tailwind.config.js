module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            keyframes: {
                'slide-down': {
                    '0%': {opacity: 0, transform: 'translateY(-3rem)'},
                    '100%': {opacity: 1, transform: 'translateY(0)'}
                }
            },
            animation: {
                slidedown: 'slide-down'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar')
    ],
    variants: {
        scrollbar: ["dark"],
    },
}
