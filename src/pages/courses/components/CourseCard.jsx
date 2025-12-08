import { motion } from 'framer-motion'

const CourseCard = ({ title, instructor, progress, thumbnail, category, duration, modules, lastAccessed, variant = 'default' }) => {
	const formatTimeAgo = (dateString) => {
		if (!dateString) return 'Not started'
		const date = new Date(dateString)
		const now = new Date()
		const diffMs = now - date
		const diffMins = Math.floor(diffMs / 60000)
		const diffHours = Math.floor(diffMs / 3600000)
		const diffDays = Math.floor(diffMs / 86400000)

		if (diffMins < 60) return `${diffMins}m ago`
		if (diffHours < 24) return `${diffHours}h ago`
		return `${diffDays}d ago`
	}

	const getProgressColor = (progress) => {
		if (progress >= 75) return 'text-green-600 bg-green-100 dark:bg-green-900'
		if (progress >= 50) return 'text-blue-600 bg-blue-100 dark:bg-blue-900'
		if (progress >= 25) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900'
		return 'text-red-600 bg-red-100 dark:bg-red-900'
	}

	const getProgressLabel = (progress) => {
		if (progress === 0) return 'Not Started'
		if (progress === 100) return 'Completed'
		return `${progress}% Complete`
	}

	return (
		<motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className="relative h-48 overflow-hidden">
				<img src={thumbnail} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
				<div className="absolute top-3 left-3">
					<span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full">{category}</span>
				</div>
				<div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
					<span className="text-white text-sm font-medium">
						{duration} • {modules} modules
					</span>
					<span className={`px-3 py-1 text-xs font-medium rounded-full ${getProgressColor(progress)}`}>{getProgressLabel(progress)}</span>
				</div>
			</div>

			<div className="p-6">
				<div className="flex justify-between items-start mb-3">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{title}</h3>
					{variant === 'my-courses' && lastAccessed && <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{formatTimeAgo(lastAccessed)}</span>}
				</div>

				<p className="text-gray-600 dark:text-gray-400 mb-4">by {instructor}</p>

				<div className="mb-4">
					<div className="flex justify-between text-sm mb-2">
						<span className="text-gray-600 dark:text-gray-400">Progress</span>
						<span className="font-medium text-gray-900 dark:text-white">{progress}%</span>
					</div>
					<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
						<motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className={`h-full ${progress >= 75 ? 'bg-green-500' : progress >= 50 ? 'bg-blue-500' : progress >= 25 ? 'bg-yellow-500' : 'bg-red-500'} rounded-full`} />
					</div>
				</div>

				<div className="flex space-x-3">
					{progress === 0 ? (
						<button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium cursor-pointer">
							<i className="fas fa-play mr-2"></i>
							Start Course
						</button>
					) : progress === 100 ? (
						<button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm font-medium cursor-pointer">
							<i className="fas fa-certificate mr-2"></i>
							View Certificate
						</button>
					) : (
						<button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium cursor-pointer">
							<i className="fas fa-play mr-2"></i>
							Continue Learning
						</button>
					)}
					<button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 text-sm cursor-pointer">
						<i className="fas fa-ellipsis-h"></i>
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default CourseCard