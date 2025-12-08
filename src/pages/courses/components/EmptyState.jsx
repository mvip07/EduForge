import { motion } from 'framer-motion'

const EmptyState = ({ icon, title, description, actionText, onAction }) => {
	return (
		<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 px-4">
			<div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
				<i className={`${icon} text-3xl text-purple-600 dark:text-purple-400`}></i>
			</div>
			<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
			<p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">{description}</p>
			{actionText && onAction && (
				<button onClick={onAction} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
					{actionText}
				</button>
			)}
		</motion.div>
	)
}

export default EmptyState
