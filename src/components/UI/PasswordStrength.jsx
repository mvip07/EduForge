import { motion, AnimatePresence } from 'framer-motion'

const PasswordStrength = ({ strength }) => {
    const { score, feedback, color } = strength

    return (
        <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Password strength</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{score === 0 ? 'Very Weak' : score === 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong'}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(score / 4) * 100}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} className={`h-full ${color} transition-all duration-500`} />
            </div>
            <AnimatePresence>
                {feedback && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {feedback}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PasswordStrength