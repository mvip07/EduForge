import React from 'react'
import { motion } from 'framer-motion'

const RecentActivity = () => {
	const activities = [
		{
			id: 1,
			type: 'assignment',
			title: 'Submitted React Assignment',
			course: 'Advanced React & Next.js',
			time: '2 hours ago',
			icon: 'fas fa-file-code',
			color: 'text-blue-500 bg-blue-100 dark:bg-blue-900',
		},
		{
			id: 2,
			type: 'quiz',
			title: 'Completed JavaScript Quiz',
			course: 'Full Stack JavaScript',
			score: '95%',
			time: 'Yesterday',
			icon: 'fas fa-question-circle',
			color: 'text-green-500 bg-green-100 dark:bg-green-900',
		},
		{
			id: 3,
			type: 'lesson',
			title: 'Watched UI Design Principles',
			course: 'UI/UX Design Masterclass',
			duration: '45 min',
			time: '2 days ago',
			icon: 'fas fa-play-circle',
			color: 'text-purple-500 bg-purple-100 dark:bg-purple-900',
		},
		{
			id: 4,
			type: 'certificate',
			title: 'Earned Web Development Certificate',
			course: 'Complete Web Developer',
			time: '1 week ago',
			icon: 'fas fa-award',
			color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900',
		},
		{
			id: 5,
			type: 'discussion',
			title: 'Posted in Community Forum',
			course: 'Machine Learning Fundamentals',
			time: '1 week ago',
			icon: 'fas fa-comments',
			color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900',
		},
	]

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
			<div className="p-6 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
				<p className="text-gray-600 dark:text-gray-400 mt-1">Your learning journey timeline</p>
			</div>

			<div className="p-6">
				<div className="space-y-4">
					{activities.map((activity, index) => (
						<motion.div key={activity.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }} className="flex items-start space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
							<div className={`flex-shrink-0 w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center`}>
								<i className={`${activity.icon} text-lg`}></i>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
								<div className="flex items-center mt-1">
									<span className="text-xs text-gray-500 dark:text-gray-400">{activity.course}</span>
									{activity.score && <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">{activity.score}</span>}
									{activity.duration && <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">{activity.duration}</span>}
								</div>
							</div>
							<div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{activity.time}</div>
						</motion.div>
					))}
				</div>

				<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
					<button className="w-full text-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">View All Activity</button>
				</div>
			</div>
		</motion.div>
	)
}

export default RecentActivity