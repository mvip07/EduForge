import { motion } from 'framer-motion'

const Input = ({ label, error, touched, className = '', ...props }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
            <motion.input whileFocus={{ scale: 1.01 }} className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${className} ${error && touched ? 'border-red-500 focus:ring-red-500' : ''}`} {...props} />
            {error && touched && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {error}
                </motion.p>
            )}
        </div>
    )
}

export default Input
