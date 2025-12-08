import { motion } from 'framer-motion'

const InProgressCertificate = ({ certificate }) => {
	const getProgressColor = (progress) => {
		if (progress >= 75) return 'bg-gradient-to-r from-green-500 to-emerald-500'
		if (progress >= 50) return 'bg-gradient-to-r from-blue-500 to-cyan-500'
		if (progress >= 25) return 'bg-gradient-to-r from-yellow-500 to-orange-500'
		return 'bg-gradient-to-r from-gray-500 to-gray-600'
	}

	const getProgressStatus = (progress) => {
		if (progress >= 90) return 'Almost There!'
		if (progress >= 70) return 'Great Progress'
		if (progress >= 50) return 'Halfway There'
		if (progress >= 30) return 'Getting There'
		return 'Just Started'
	}

	const getDaysRemaining = (date) => {
		const target = new Date(date)
		const today = new Date()
		const diffTime = target - today
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		return diffDays > 0 ? diffDays : 0
	}

	const daysRemaining = getDaysRemaining(certificate.estimatedCompletion)

	return (
		<motion.div whileHover={{ y: -3 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{certificate.courseName}</h3>
						<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
							<i className="fas fa-book mr-2"></i>
							<span>Course ID: {certificate.courseId}</span>
						</div>
					</div>
					<span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">In Progress</span>
				</div>

				<div className="mb-6">
					<div className="flex justify-between text-sm mb-2">
						<span className="text-gray-600 dark:text-gray-400">Progress</span>
						<span className="font-medium text-gray-900 dark:text-white">
							{certificate.progress}% • {getProgressStatus(certificate.progress)}
						</span>
					</div>
					<div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
						<motion.div initial={{ width: 0 }} animate={{ width: `${certificate.progress}%` }} transition={{ duration: 1, delay: 0.2 }} className={`h-full ${getProgressColor(certificate.progress)} rounded-full`} />
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
						{certificate.modulesCompleted} of {certificate.totalModules} modules completed
					</div>
				</div>

				<div className="mb-6">
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Certificate Requirements</h4>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${certificate.currentScore >= certificate.requiredScore ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
									<i className={`fas ${certificate.currentScore >= certificate.requiredScore ? 'fa-check text-green-600 dark:text-green-400' : 'fa-times text-gray-400'} text-xs`}></i>
								</div>
								<span className="text-sm text-gray-700 dark:text-gray-300">Minimum Score: {certificate.requiredScore}%</span>
							</div>
							<span className={`text-sm font-medium ${certificate.currentScore >= certificate.requiredScore ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>Current: {certificate.currentScore}%</span>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${certificate.modulesCompleted === certificate.totalModules ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
									<i className={`fas ${certificate.modulesCompleted === certificate.totalModules ? 'fa-check text-green-600 dark:text-green-400' : 'fa-times text-gray-400'} text-xs`}></i>
								</div>
								<span className="text-sm text-gray-700 dark:text-gray-300">Complete all modules</span>
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-400">
								{certificate.modulesCompleted}/{certificate.totalModules}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
									<i className="fas fa-clock text-gray-400 text-xs"></i>
								</div>
								<span className="text-sm text-gray-700 dark:text-gray-300">Complete before deadline</span>
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-400">{daysRemaining} days left</span>
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills You'll Earn</h4>
					<div className="flex flex-wrap gap-2">
						{certificate.skills.map((skill, index) => (
							<span key={index} className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full">
								{skill}
							</span>
						))}
					</div>
				</div>

				<div className="mb-6">
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Estimated Completion</h4>
					<div className="flex items-center">
						<div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white mr-3">
							<i className="fas fa-calendar"></i>
						</div>
						<div>
							<div className="font-medium text-gray-900 dark:text-white">
								{new Date(certificate.estimatedCompletion).toLocaleDateString('en-US', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">{daysRemaining} days remaining</div>
						</div>
					</div>
				</div>

				<div className="flex space-x-3">
					<button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium cursor-pointer">
						<i className="fas fa-play mr-2"></i>
						Continue Course
					</button>
					<button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 text-sm cursor-pointer">
						<i className="fas fa-ellipsis-h"></i>
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default InProgressCertificate
