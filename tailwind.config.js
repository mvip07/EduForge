import { defineConfig } from 'tailwindcss'

export default defineConfig({
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: { extend: {} },
})
