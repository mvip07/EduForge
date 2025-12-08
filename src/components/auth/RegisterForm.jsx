import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'
import { usePasswordStrength } from '../../hooks/usePasswordStrength'
import Input from '../UI/Input'
import Button from '../UI/Button'
import PasswordInput from '../UI/PasswordInput'
import PasswordStrength from '../UI/PasswordStrength'
import SocialAuth from './SocialAuth'
import AuthContainer from './AuthContainer'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const navigate = useNavigate()
    const {  setUser, setLoading, loading } = useAuth()
    const [error, setError] = useState('')
    const { strength, calculateStrength } = usePasswordStrength()

    const { values, errors, touched, handleChange, handleBlur } = useForm(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        {
            firstName: (value) => (!value ? 'First name is required' : ''),
            lastName: (value) => (!value ? 'Last name is required' : ''),
            email: (value) => (!value ? 'Email is required' : !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : ''),
            password: (value) => (!value ? 'Password is required' : value.length < 8 ? 'Password must be at least 8 characters' : ''),
            confirmPassword: (value, allValues) => (value !== allValues.password ? 'Passwords do not match' : ''),
        }
    )

    const handlePasswordChange = (e) => {
        handleChange(e)
        calculateStrength(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            const response = await authService.register({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            })
            setUser(response.user)
            navigate('/auth/verification')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContainer title="Create your account">
            <form onSubmit={handleSubmit}>
                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                        {error}
                    </motion.div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="First Name" type="text" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={errors.firstName} touched={touched.firstName} placeholder="John" />
                    <Input label="Last Name" type="text" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={errors.lastName} touched={touched.lastName} placeholder="Doe" />
                </div>

                <Input label="Email" type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} placeholder="your@email.com" />

                <PasswordInput label="Password" name="password" value={values.password} onChange={handlePasswordChange} onBlur={handleBlur} error={errors.password} touched={touched.password} placeholder="••••••••" />
                <div className="mb-4">
                    <PasswordStrength strength={strength} />
                </div>

                <PasswordInput label="Confirm Password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} error={errors.confirmPassword} touched={touched.confirmPassword} placeholder="••••••••" />

                <div className="mb-6">
                    <div className="flex items-center">
                        <input type="checkbox" id="agreeTerms" className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                        <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            I agree to the{' '}
                            <a href="#terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>
                </div>

                <Button type="submit" loading={loading}>
                    Create Account
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
            </div>

            <SocialAuth />

            <div className="text-center mt-6">
                <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
                <button onClick={() => navigate('/auth/login')} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-colors duration-300 cursor-pointer">
                    Sign in
                </button>
            </div>
        </AuthContainer>
    )
}

export default RegisterForm