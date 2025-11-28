import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useForm } from '../../hooks/useForm'
import { authService } from '../../services/authService'
import Input from '../UI/Input'
import Button from '../UI/Button'
import AuthContainer from './AuthContainer'
import { FaEnvelope } from 'react-icons/fa'

const ForgotPasswordForm = () => {
    const navigate = useNavigate()
    const { setLoading, loading } = useAuth()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const { values, errors, touched, handleChange, handleBlur } = useForm(
        {
            email: '',
        },
        {
            email: (value) => (!value ? 'Email is required' : !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : ''),
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await authService.forgotPassword(values.email)
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <AuthContainer title="">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaEnvelope className="fas fa-envelope text-blue-500 text-2xl" />
                    </motion.div>
                    <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Check Your Email
                    </motion.h3>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-600 dark:text-gray-400 mb-2">
                        We've sent a password reset link to:
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-medium text-gray-800 dark:text-white mb-6">
                        {values.email}
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Click the link in the email to reset your password. The link will expire in 1 hour.
                    </motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                        <Button onClick={() => navigate('/auth/login')} variant="secondary">
                            Back to Login
                        </Button>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-4">
                        <button onClick={() => setSuccess(false)} className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm transition-colors duration-300">
                            Didn't receive the email? Try again
                        </button>
                    </motion.div>
                </motion.div>
            </AuthContainer>
        )
    }

    return (
        <AuthContainer title="Forgot your password?" subtitle="Enter your email and we'll send you a reset link">
            <form onSubmit={handleSubmit}>
                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                        {error}
                    </motion.div>
                )}

                <Input label="Email" type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} placeholder="your@email.com" autoFocus />

                <Button type="submit" loading={loading} className="mb-6">
                    Send Reset Link
                </Button>

                <div className="text-center">
                    <button type="button" onClick={() => navigate('/auth/login')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline transition-colors duration-300">
                        Back to login
                    </button>
                </div>
            </form>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex items-start">
                    <i className="fas fa-info-circle text-blue-500 mt-0.5 mr-3"></i>
                    <div>
                        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Need help?</h4>
                        <p className="text-xs text-blue-600 dark:text-blue-400">If you don't see the email in your inbox, check your spam folder or contact our support team.</p>
                    </div>
                </div>
            </motion.div>
        </AuthContainer>
    )
}

export default ForgotPasswordForm