/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                gold: '#b8881d',
                primary: '#161b22',
                secondary: '#737373',
                tertiary: '#0d1016'
            },
            boxShadow: {
                skew: '#0000002e 20px -18px 20px 20px',
                big: '0px 0px 20px 14px #00000090',
                section: 'inset -1px 10px 20px 0px #000000'
            },
            fontFamily: {
                seven: ['var(--font-seven)'],
                minecraft: ['var(--font-minecraft)']
            },
            gridTemplateColumns: {
                craft: 'repeat(auto-fill, minmax(420px, 1fr))',
                items: 'repeat(auto-fill, minmax(56px, 1fr))'
            },
            gridTemplateRows: {
                craft: 'repeat(auto-fill, minmax(420px, 1fr))',
                items: 'repeat(auto-fill, minmax(56px, 1fr))'
            }
        }
    },
    plugins: []
};
