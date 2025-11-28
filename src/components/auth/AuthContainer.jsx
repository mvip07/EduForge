import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'

const AuthContainer = ({ children, title, subtitle }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-gray-800 dark:text-white font-bold text-xl">
                        <FaGraduationCap className="size-10" />
                    </div>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl font-bold text-gray-800 dark:text-white">
                    LearnHub
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-600 dark:text-gray-300 mt-2">
                    Your gateway to knowledge
                </motion.p>
            </div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-gray-600 dark:text-gray-400 mb-6">
                    {subtitle}
                </motion.p>
            )}

            {children}
        </motion.div>
    )
}

export default AuthContainer
