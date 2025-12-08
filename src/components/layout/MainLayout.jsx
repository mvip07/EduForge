import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DarkModeToggle from '../UI/DarkModeToggle'
import FloatingBackground from './FloatingBackground'
import Header from '../Header'
import Sidebar from '../Sidebar'

const MainLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
			<FloatingBackground />
			<DarkModeToggle />

			<AnimatePresence>{sidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-80 backdrop-blur-md bg-white/30 lg:hidden" />}</AnimatePresence>

			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			<motion.aside transition={{ type: 'spring', damping: 25 }} className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto lg:left-80 lg:w-[calc(100%-320px)]">
				<Header onMenuClick={() => setSidebarOpen(true)} />
				<main className="w-full py-6 px-4 sm:px-6 lg:px-8">{children}</main>
			</motion.aside>
		</div>
	)
}

export default MainLayout
