import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		firstName: 'Mirabzal',
		lastName: 'Ozodov',
		email: "mirabzal@gmail.com"
	})
	const [loading, setLoading] = useState(false)
	const [authPage, setAuthPage] = useState('login')

	const navigateToPage = (page) => {
		setAuthPage(page)
	}

	const value = {
		user,
		setUser,
		loading,
		setLoading,
		authPage,
		setAuthPage: navigateToPage,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
