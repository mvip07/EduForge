import React from 'react'
import { motion } from 'framer-motion'

const UpcomingCourses = () => {
	const upcoming = [
		{
			id: 1,
			title: 'Advanced TypeScript',
			date: 'Mar 15, 2024',
			time: '10:00 AM - 12:00 PM',
			instructor: 'David Miller',
			category: 'Programming',
			enrolled: true,
		},
		{
			id: 2,
			title: 'Cloud Computing with AWS',
			date: 'Mar 18, 2024',
			time: '2:00 PM - 4:00 PM',
			instructor: 'Lisa Wang',
			category: 'Cloud',
			enrolled: false,
		},
		{
			id: 3,
			title: 'Mobile App Development',
			date: 'Mar 22, 2024',
			time: '11:00 AM - 1:00 PM',
			instructor: 'Robert Garcia',
			category: 'Mobile',
			enrolled: true,
		},
	]

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
			<div className="p-6 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Courses</h2>
				<p className="text-gray-600 dark:text-gray-400 mt-1">Schedule of upcoming sessions</p>
			</div>

			<div className="p-6">
				<div className="space-y-4">
					{upcoming.map((course, index) => (
						<motion.div key={course.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} className={`p-4 rounded-xl border ${course.enrolled ? 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
									<div className="flex items-center mt-2 space-x-3">
										<span className="text-sm text-gray-600 dark:text-gray-400">
											<i className="fas fa-user mr-1"></i>
											{course.instructor}
										</span>
										<span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">{course.category}</span>
									</div>
								</div>
								{course.enrolled && <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Enrolled</span>}
							</div>

							<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
								<div>
									<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
										<i className="fas fa-calendar mr-2"></i>
										{course.date}
									</div>
									<div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
										<i className="fas fa-clock mr-2"></i>
										{course.time}
									</div>
								</div>
								<button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${course.enrolled ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800' : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg'}`}>{course.enrolled ? 'View Details' : 'Enroll Now'}</button>
							</div>
						</motion.div>
					))}
				</div>

				<div className="mt-6">
					<button className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
						<i className="fas fa-plus mr-2"></i>
						Browse More Courses
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default UpcomingCourses
