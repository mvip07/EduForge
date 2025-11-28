import { useState } from 'react'
import { AuthServices } from '../services/authServices'
import { notify } from '../lib/toastify'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
    const navigate = useNavigate()
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
            notify("success", res.data.message || "Registration successful")
            // navigate("/auth/verfication")

        } catch(err) {
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
        submitRegister
    }
}
