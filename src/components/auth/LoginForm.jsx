import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'
import Input from '../UI/Input'
import Button from '../UI/Button'
import PasswordInput from '../UI/PasswordInput'
import SocialAuth from './SocialAuth'
import AuthContainer from './AuthContainer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const navigate = useNavigate()
    const { setUser, setLoading, loading } = useAuth()
    const [error, setError] = useState('')

    const { values, errors, touched, handleChange, handleBlur } = useForm(
        {
            email: '',
            password: '',
        },
        {
            email: (value) => (!value ? 'Email is required' : !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : ''),
            password: (value) => (!value ? 'Password is required' : ''),
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await authService.login(values.email, values.password)
            setUser(response.user)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContainer title="Welcome back">
            <form onSubmit={handleSubmit}>
                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                        {error}
                    </motion.div>
                )}

                <Input label="Email" type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} placeholder="your@email.com" />

                <PasswordInput label="Password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={errors.password} touched={touched.password} placeholder="••••••••" />

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <input type="checkbox" id="rememberMe" className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>
                    <button type="button" onClick={() => navigate('/auth/forgot/password')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline transition-colors duration-300">
                        Forgot password?
                    </button>
                </div>

                <Button type="submit" loading={loading}>
                    Sign In
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
                <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
                <button onClick={() => navigate('/auth/register')} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-colors duration-300">
                    Sign up
                </button>
            </div>
        </AuthContainer>
    )
}

export default LoginForm
