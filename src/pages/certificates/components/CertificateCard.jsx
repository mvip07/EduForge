import { motion } from 'framer-motion'

const CertificateCard = ({ certificate, onClick, onShare }) => {
	const getGradeColor = (grade) => {
		switch (grade) {
			case 'A+':
				return 'from-green-500 to-emerald-600'
			case 'A':
				return 'from-green-400 to-emerald-500'
			case 'A-':
				return 'from-green-300 to-emerald-400'
			case 'B+':
				return 'from-blue-500 to-cyan-600'
			case 'B':
				return 'from-blue-400 to-cyan-500'
			case 'B-':
				return 'from-blue-300 to-cyan-400'
			case 'C+':
				return 'from-yellow-500 to-orange-600'
			case 'C':
				return 'from-yellow-400 to-orange-500'
			default:
				return 'from-gray-500 to-gray-600'
		}
	}

	const getScoreColor = (score) => {
		if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900'
		if (score >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900'
		if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900'
		return 'text-gray-600 bg-gray-100 dark:bg-gray-900'
	}

	return (
		<motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className={`p-6 bg-gradient-to-r ${getGradeColor(certificate.grade)} text-white`}>
				<div className="flex justify-between items-start">
					<div>
						<div className="flex items-center mb-2">
							<i className="fas fa-award text-xl mr-3"></i>
							<span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">{certificate.grade}</span>
						</div>
						<h3 className="text-xl font-bold line-clamp-2">{certificate.courseName}</h3>
					</div>
					<button onClick={() => onShare(certificate, 'copy')} className="text-white/80 hover:text-white cursor-pointer" title="Copy verification link">
						<i className="fas fa-link"></i>
					</button>
				</div>
			</div>

			<div className="p-6">
				<div className="mb-4">
					<div className="flex items-center justify-between mb-3">
						<span className="text-sm text-gray-600 dark:text-gray-400">Instructor</span>
						<span className="font-medium text-gray-900 dark:text-white">{certificate.instructor}</span>
					</div>
					<div className="flex items-center justify-between mb-3">
						<span className="text-sm text-gray-600 dark:text-gray-400">Issued</span>
						<span className="font-medium text-gray-900 dark:text-white">{new Date(certificate.issueDate).toLocaleDateString()}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-600 dark:text-gray-400">Expires</span>
						<span className="font-medium text-gray-900 dark:text-white">{certificate.expiryDate ? new Date(certificate.expiryDate).toLocaleDateString() : 'Never'}</span>
					</div>
				</div>

				<div className="mb-6">
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-600 dark:text-gray-400">Final Score</span>
						<span className={`px-3 py-1 text-sm font-medium rounded-full ${getScoreColor(certificate.score)}`}>{certificate.score}%</span>
					</div>
					<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
						<motion.div initial={{ width: 0 }} animate={{ width: `${certificate.score}%` }} className={`h-full bg-gradient-to-r ${getGradeColor(certificate.grade)} rounded-full`} />
					</div>
				</div>

				<div className="mb-6">
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills Earned</h4>
					<div className="flex flex-wrap gap-2">
						{certificate.skills.slice(0, 3).map((skill, index) => (
							<span key={index} className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
								{skill}
							</span>
						))}
						{certificate.skills.length > 3 && <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">+{certificate.skills.length - 3}</span>}
					</div>
				</div>

				<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
					<div className="flex items-center">
						<i className="fas fa-eye mr-2"></i>
						<span>{certificate.views} views</span>
					</div>
					<div className="flex items-center">
						<i className="fas fa-share-alt mr-2"></i>
						<span>{certificate.shareCount} shares</span>
					</div>
				</div>

				<div className="flex space-x-3">
					<button onClick={onClick} className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium cursor-pointer">
						<i className="fas fa-eye mr-2"></i>
						View Details
					</button>
					<button onClick={() => window.open(certificate.downloadUrl, '_blank')} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 text-sm cursor-pointer" title="Download">
						<i className="fas fa-download"></i>
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default CertificateCard