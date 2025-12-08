import { useState, useEffect } from 'react'

export const useDarkMode = () => {
	const [darkMode, setDarkMode] = useState(() => {
		if (typeof window === 'undefined') return false
		const saved = localStorage.getItem('darkMode')
		return saved ? JSON.parse(saved) : false
	})

	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode))
		const html = document.documentElement
		if (darkMode) {
			html.classList.add('dark')
		} else {
			html.classList.remove('dark')
		}
	}, [darkMode])

	const toggleDarkMode = () => setDarkMode((prev) => !prev)

	return { darkMode, toggleDarkMode }
}
