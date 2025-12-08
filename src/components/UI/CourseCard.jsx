import { motion } from 'framer-motion'

const CourseCard = ({ title, instructor, progress, thumbnail, category, duration, modules, nextLesson, nextLessonTime }) => {
	return (
		<div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
			<div className="flex flex-col md:flex-row md:items-center">
				{/* Course Image */}
				<div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
					<div className="relative rounded-xl overflow-hidden h-40 md:h-32">
						<img src={thumbnail} alt={title} className="w-full h-full object-cover" />
						<div className="absolute top-3 left-3">
							<span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full">{category}</span>
						</div>
						<div className="absolute bottom-3 right-3">
							<span className="px-2 py-1 text-xs font-medium bg-black/70 text-white rounded">{duration}</span>
						</div>
					</div>
				</div>

				{/* Course Info */}
				<div className="flex-1">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
							<p className="text-gray-600 dark:text-gray-400 mt-1">
								by {instructor} • {modules} modules
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<span className="text-sm font-medium text-gray-900 dark:text-white">{progress}%</span>
							<div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
								<motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className={`h-full ${progress >= 75 ? 'bg-green-500' : progress >= 50 ? 'bg-blue-500' : progress >= 25 ? 'bg-yellow-500' : 'bg-red-500'} rounded-full`} />
							</div>
						</div>
					</div>

					{/* Next Lesson Info */}
					<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Next Lesson</p>
								<p className="font-medium text-gray-900 dark:text-white">{nextLesson}</p>
								<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
									<i className="far fa-clock mr-1"></i>
									{nextLessonTime}
								</p>
							</div>
							<div className="flex space-x-3">
								<button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
									<i className="fas fa-book-open mr-2"></i>
									Resume
								</button>
								<button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
									<i className="fas fa-play mr-2"></i>
									Start Lesson
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CourseCard
