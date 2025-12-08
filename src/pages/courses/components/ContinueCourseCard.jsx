import { motion } from 'framer-motion'

const ContinueCourseCard = ({ title, instructor, progress, thumbnail, category, modules, lastAccessed, rating, students }) => {
    const formatTimeAgo = (dateString) => {
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

	const nextLesson = `Lesson ${Math.floor(progress / 10) + 1} of ${modules}`

	return (
		<motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<div className="flex items-center space-x-2 mb-3">
							<span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">{category}</span>
							<span className="text-xs text-gray-500 dark:text-gray-400">
								<i className="fas fa-clock mr-1"></i>
								{formatTimeAgo(lastAccessed)}
							</span>
						</div>

						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-4">by {instructor}</p>

						<div className="mb-4">
							<div className="flex justify-between text-sm mb-2">
								<span className="text-gray-600 dark:text-gray-400">Progress</span>
								<span className="font-medium text-gray-900 dark:text-white">{progress}%</span>
							</div>
							<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
								<motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className={`h-full ${progress >= 75 ? 'bg-green-500' : progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'} rounded-full`} />
							</div>
						</div>

						<div className="mb-6">
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next Lesson</p>
							<p className="font-medium text-gray-900 dark:text-white">{nextLesson}</p>
						</div>

						<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
							<div className="flex items-center">
								<i className="fas fa-star text-yellow-500 mr-1"></i>
								<span>{rating}</span>
								<span className="mx-2">•</span>
								<i className="fas fa-users mr-1"></i>
								<span>{students.toLocaleString()}</span>
							</div>
							<div className="flex items-center">
								<i className="fas fa-book-open mr-1"></i>
								<span>{modules} modules</span>
							</div>
						</div>
					</div>

					<div className="ml-4">
						<div className="w-20 h-20 rounded-xl overflow-hidden">
							<img src={thumbnail} alt={title} className="w-full h-full object-cover" />
						</div>
					</div>
				</div>

				<div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
					<button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium cursor-pointer">
						<i className="fas fa-play mr-2"></i>
						Continue
					</button>
					<button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 text-sm cursor-pointer">
						<i className="fas fa-ellipsis-h"></i>
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default ContinueCourseCard
