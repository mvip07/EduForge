import { motion, AnimatePresence } from 'framer-motion'
import DarkModeToggle from '../components/UI/DarkModeToggle'
import FloatingBackground from '../components/layout/FloatingBackground'

const AuthPage = ({ children }) => {

    const getPageTransition = () => {
        return {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 20 },
            transition: { duration: 0.3 },
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center p-4 relative overflow-hidden">
            <FloatingBackground />
            <DarkModeToggle />

            <AnimatePresence mode="wait">
                <motion.div initial="initial" animate="animate" exit="exit" variants={getPageTransition()} className="w-full max-w-lg">
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default AuthPage
