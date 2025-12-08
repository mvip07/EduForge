import { useState } from 'react'
import { notify } from '../lib/toastify'
import { AuthServices } from '../services/authServices'

export const useRegister = () => {
	const [register, setRegister] = useState({})
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})

	const handleInput = (e) => {
		const { name, value } = e.target
		setRegister((prev) => ({ ...prev, [name]: value }))
	}

	const submitRegister = async () => {
		setLoading(true)
		try {
			const res = await AuthServices.register(register)
			setErrors({})
			setRegister({})
			notify('success', res.data.message || 'Registration successful')
			// navigate("/auth/verfication")
		} catch (err) {
			setErrors(err.response.data.errors)
		} finally {
			setLoading(false)
		}
	}

	return {
		errors,
		loading,
		register,
		handleInput,
		submitRegister,
	}
}
