import { motion } from 'framer-motion'
import CourseCard from './CourseCard'
import EmptyState from './EmptyState'

const MyCoursesGrid = ({ courses, filters, searchQuery }) => {
	if (courses.length === 0) {
		return <EmptyState icon="fas fa-book-open" title="No courses found" description={searchQuery ? `No courses match "${searchQuery}". Try a different search.` : filters.category !== 'all' || filters.progress !== 'all' || filters.instructor !== 'all' ? 'No courses match your filters. Try adjusting them.' : "You haven't enrolled in any courses yet."} actionText="Browse Courses" onAction={() => (window.location.href = '/explore')} />
	}

	const notStarted = courses.filter((c) => c.progress === 0)
	const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100)
	const completed = courses.filter((c) => c.progress === 100)

	return (
		<div>
			<div className="mb-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-blue-700 dark:text-blue-300">Not Started</p>
								<p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{notStarted.length} courses</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
								<i className="fas fa-clock text-blue-600 dark:text-blue-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-purple-700 dark:text-purple-300">In Progress</p>
								<p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{inProgress.length} courses</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
								<i className="fas fa-play-circle text-purple-600 dark:text-purple-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-green-700 dark:text-green-300">Completed</p>
								<p className="text-2xl font-bold text-green-900 dark:text-green-100">{completed.length} courses</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-800 flex items-center justify-center">
								<i className="fas fa-check-circle text-green-600 dark:text-green-400 text-xl"></i>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				{inProgress.length > 0 && (
					<div className="mb-8">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								<i className="fas fa-spinner mr-2 text-blue-500"></i>
								In Progress ({inProgress.length})
							</h3>
							<div className="text-sm text-gray-500 dark:text-gray-400">{Math.round(inProgress.reduce((acc, c) => acc + c.progress, 0) / inProgress.length)}% average progress</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{inProgress.map((course, index) => (
								<motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
									<CourseCard {...course} variant="my-courses" />
								</motion.div>
							))}
						</div>
					</div>
				)}

				{notStarted.length > 0 && (
					<div className="mb-8">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							<i className="far fa-clock mr-2 text-gray-500"></i>
							Not Started ({notStarted.length})
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{notStarted.map((course, index) => (
								<motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
									<CourseCard {...course} variant="my-courses" />
								</motion.div>
							))}
						</div>
					</div>
				)}

				{completed.length > 0 && (
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							<i className="fas fa-trophy mr-2 text-yellow-500"></i>
							Completed ({completed.length})
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{completed.map((course, index) => (
								<motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
									<CourseCard {...course} variant="my-courses" />
								</motion.div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
					<div>
						Showing {courses.length} of {courses.length} courses
					</div>
					<div className="flex items-center space-x-4">
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
							<span>Not Started</span>
						</div>
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
							<span>In Progress</span>
						</div>
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
							<span>Completed</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyCoursesGrid