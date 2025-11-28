import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'
import Button from '../UI/Button'
import AuthContainer from './AuthContainer'

const VerificationForm = () => {
    const navigate = useNavigate()
    const { setUser, setLoading, loading } = useAuth()
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [error, setError] = useState('')
    const [resendCooldown, setResendCooldown] = useState(0)
    const inputRefs = useRef([])

    useEffect(() => {
        // Start cooldown timer for resend button
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCooldown])

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }

        // Auto-submit when all digits are filled
        if (newCode.every((digit) => digit !== '') && index === 5) {
            handleSubmit(newCode.join(''))
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text')
        const digits = pastedData.replace(/\D/g, '').split('').slice(0, 6)

        if (digits.length === 6) {
            const newCode = [...code]
            digits.forEach((digit, index) => {
                newCode[index] = digit
            })
            setCode(newCode)
            inputRefs.current[5].focus()
        }
    }

    const handleSubmit = async (verificationCode = code.join('')) => {
        if (verificationCode.length !== 6) {
            setError('Please enter the 6-digit verification code')
            return
        }

        setLoading(true)
        setError('')

        try {
            await authService.verifyEmail(verificationCode)
            setUser((prev) => ({ ...prev, isVerified: true }))

            setTimeout(() => {
                console.log('Verification successful!')
            }, 1000)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleResendCode = () => {
        setResendCooldown(30)
        console.log('Resending verification code...')
    }

    return (
        <AuthContainer title="Verify your email" subtitle="We've sent a 6-digit code to your email">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                        {error}
                    </motion.div>
                )}

                <div className="flex justify-center space-x-3 mb-8">
                    {code.map((digit, index) => (
                        <motion.input key={index} ref={(el) => (inputRefs.current[index] = el)} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} onPaste={handlePaste} whileFocus={{ scale: 1.05 }} className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-300" />
                    ))}
                </div>

                <Button type="submit" loading={loading} className="mb-4">
                    Verify Account
                </Button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Didn't receive the code?{' '}
                    {resendCooldown > 0 ? (
                        <span className="text-gray-500">Resend in {resendCooldown}s</span>
                    ) : (
                        <button type="button" onClick={handleResendCode} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-colors duration-300">
                            Resend
                        </button>
                    )}
                </div>

                <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" onClick={() => navigate('/auth/login')} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-colors duration-300">
                        Back to login
                    </button>
                </div>
            </form>

            {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: code.every((digit) => digit !== '') ? 1 : 0 }} className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: code.every((digit) => digit !== '') ? 1 : 0 }} className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-check text-green-500 text-2xl"></i>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Ready to verify!</p>
                </motion.div>
            </motion.div> */}
        </AuthContainer>
    )
}

export default VerificationForm
