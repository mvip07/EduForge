import { motion } from 'framer-motion'
import { useDarkMode } from '../../hooks/useDarkMode'

const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useDarkMode()

    return (
        <div className="fixed top-5 right-5 z-50">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleDarkMode} className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none">
                <motion.div className="w-4 h-4 bg-white rounded-full shadow-md" animate={{ x: darkMode ? 24 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
            </motion.button>
        </div>
    )
}

export default DarkModeToggle
