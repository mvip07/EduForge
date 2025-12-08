import { motion } from 'framer-motion'
import EmptyState from './EmptyState'
import ContinueCourseCard from './ContinueCourseCard'

const ContinueLearning = ({ courses }) => {
	const continueCourses = courses.filter((c) => c.lastAccessed)

	if (continueCourses.length === 0) {
		return <EmptyState icon="fas fa-play-circle" title="Nothing to continue" description="You haven't started any courses yet. Pick a course and start your learning journey!" actionText="Browse Courses" onAction={() => (window.location.href = '/explore')} />
	}

	const sortedCourses = [...continueCourses].sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))

	const totalTime = sortedCourses.reduce((acc, course) => {
		return acc + Math.floor(course.progress / 10) * 60 // minutes
	}, 0)

	const hours = Math.floor(totalTime / 60)
	const minutes = totalTime % 60

	return (
		<div>
			<div className="mb-8">
				<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
					<div className="flex flex-col md:flex-row md:items-center justify-between">
						<div>
							<h3 className="text-xl font-bold mb-2">Continue Your Learning Journey</h3>
							<p className="text-purple-100">
								You've spent {hours}h {minutes}m learning this week. Keep going!
							</p>
						</div>
						<div className="mt-4 md:mt-0">
							<button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:-translate-y-0.5 cursor-pointer">
								<i className="fas fa-rocket mr-2"></i>
								Start Learning Session
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-8">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learning Progress Overview</h4>
					<div className="space-y-4">
						{sortedCourses.map((course, index) => (
							<div key={course.id} className="flex items-center">
								<div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
									<img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
								</div>
								<div className="ml-4 flex-1">
									<div className="flex justify-between items-center">
										<span className="font-medium text-gray-900 dark:text-white">{course.title}</span>
										<span className="text-sm font-medium text-gray-900 dark:text-white">{course.progress}%</span>
									</div>
									<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
										<motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1, delay: index * 0.1 }} className={`h-full ${course.progress >= 75 ? 'bg-green-500' : course.progress >= 50 ? 'bg-blue-500' : course.progress >= 25 ? 'bg-yellow-500' : 'bg-red-500'} rounded-full`} />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">Pick up where you left off</h3>
					<div className="text-sm text-gray-600 dark:text-gray-400">Sorted by most recent activity</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{sortedCourses.map((course, index) => (
						<motion.div key={course.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
							<ContinueCourseCard {...course} />
						</motion.div>
					))}
				</div>
			</div>

			<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
				<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<button className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl text-left hover:shadow-md transition-shadow duration-300 cursor-pointer">
						<i className="fas fa-video text-blue-500 text-xl mb-2"></i>
						<p className="font-medium text-gray-900 dark:text-white">Watch Next Lesson</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Continue with the next video</p>
					</button>

					<button className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl text-left hover:shadow-md transition-shadow duration-300 cursor-pointer">
						<i className="fas fa-tasks text-purple-500 text-xl mb-2"></i>
						<p className="font-medium text-gray-900 dark:text-white">Complete Assignments</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">3 pending assignments</p>
					</button>

					<button className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl text-left hover:shadow-md transition-shadow duration-300 cursor-pointer">
						<i className="fas fa-question-circle text-green-500 text-xl mb-2"></i>
						<p className="font-medium text-gray-900 dark:text-white">Get Help</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ask questions in community</p>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ContinueLearning