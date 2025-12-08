import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', loading = false, className = '', ...props }) => {
	const baseClasses = 'w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer'

	const variants = {
		primary: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg transform hover:-translate-y-0.5',
		secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600',
		google: 'bg-white text-gray-700 border border-gray-300 dark:border-gray-600 hover:shadow-lg',
		github: 'bg-gray-800 text-white hover:shadow-lg',
	}

	return (
		<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${baseClasses} ${variants[variant]} ${className} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={loading} {...props}>
			{loading ? (
				<div className="flex items-center">
					<div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
					Loading...
				</div>
			) : (
				children
			)}
		</motion.button>
	)
}

export default Button
