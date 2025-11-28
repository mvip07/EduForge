import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'
import AuthContainer from './AuthContainer'
import Button from '../UI/Button'
import PasswordInput from '../UI/PasswordInput'
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import PasswordStrength from '../UI/PasswordStrength'
import { usePasswordStrength } from '../../hooks/usePasswordStrength'

const ResetPasswordForm = () => {
    const navigate = useNavigate()
    const { setLoading, loading } = useAuth()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const { strength, calculateStrength } = usePasswordStrength()

    const { values, errors, touched, handleChange, handleBlur } = useForm(
        {
            password: '',
            confirmPassword: '',
            token: '', // In real app, this would come from URL params
        },
        {
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
            await authService.resetPassword(values.token, values.password)
            setSuccess(true)

            // Redirect to login after success
            setTimeout(() => {
                navigate('/auth/login')
            }, 3000)
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
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheck className="text-green-500 text-2xl" />
                    </motion.div>
                    <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Password Reset Successfully!
                    </motion.h3>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-600 dark:text-gray-400 mb-6">
                        Your password has been successfully reset. Redirecting to login page...
                    </motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} className="h-full bg-green-500 rounded-full" />
                    </motion.div>
                </motion.div>
            </AuthContainer>
        )
    }

    return (
        <AuthContainer title="Reset your password" subtitle="Enter your new password below">
            <form onSubmit={handleSubmit}>
                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                        {error}
                    </motion.div>
                )}

                <PasswordInput label="New Password" name="password" value={values.password} onChange={handlePasswordChange} onBlur={handleBlur} error={errors.password} touched={touched.password} placeholder="••••••••" />

                <div className="mb-4">
                    <PasswordStrength strength={strength} />
                </div>

                <PasswordInput label="Confirm New Password" name="confirmPassword" value={values.confirmPassword} onChange={handlePasswordChange} onBlur={handleBlur} error={errors.confirmPassword} touched={touched.confirmPassword} placeholder="••••••••" />

                <Button type="submit"  loading={loading} className="mb-4">
                    Reset Password
                </Button>

                <div className="text-center">
                    <button type="button" onClick={() => navigate('/auth/login')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline transition-colors duration-300">
                        Back to login
                    </button>
                </div>
            </form>
        </AuthContainer>
    )
}

export default ResetPasswordForm
