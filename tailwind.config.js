/** @type {import('tailwindcss').Config} */

import { _fontFamily } from '#tailwind-config/theme';

const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
    darkMode: 'media',
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./node_modules/flowbite/**/*.{js,ts}",
        "./node_modules/vue-tailwind-datepicker/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                'livecrowdblue': '#0e084c',
                'livecrowdturquoise': '#5eb3b4',
                'vtd-primary': colors.sky, // Light mode Datepicker color
                'vtd-secondary': colors.gray, // Dark mode Datepicker color
                ...colors,
            },
            animation: {
                'bounce-short': 'bounce 1s ease-in-out 5'
            },
            width: {
                '45vw': '45vw',
            },
			fontFamily: {
				gotham: ['GothamMedium', 'sans-serif'],
        		'gotham-bold': ['GothamBold', 'sans-serif']
			}
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}
