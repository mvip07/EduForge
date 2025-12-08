import { useState } from 'react'
import { motion } from 'framer-motion'

const CourseOverview = ({ course, onTabChange }) => {
	const [activeReviewFilter, setActiveReviewFilter] = useState('all')

	const reviews = [
		{
			id: 1,
			user: 'Alex Johnson',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			rating: 5,
			date: '2 weeks ago',
			comment: 'Excellent course! The instructor explains complex concepts in a very understandable way. The projects were challenging but rewarding.',
			helpful: 42,
		},
		{
			id: 2,
			user: 'Maria Garcia',
			avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			rating: 4,
			date: '1 month ago',
			comment: 'Great content, but some sections could use more examples. Overall, I learned a lot about React patterns.',
			helpful: 18,
		},
		{
			id: 3,
			user: 'David Chen',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			rating: 5,
			date: '3 days ago',
			comment: 'The Next.js section was fantastic! I was able to implement SSR in my project immediately after watching.',
			helpful: 56,
		},
	]

	const stats = [
		{ label: 'Students Enrolled', value: course?.enrolled.toLocaleString(), icon: 'fas fa-users' },
		{ label: 'Average Rating', value: course?.rating.toFixed(1), icon: 'fas fa-star' },
		{ label: 'Total Lessons', value: course?.totalLessons, icon: 'fas fa-play-circle' },
		{ label: 'Course Duration', value: course?.duration, icon: 'fas fa-clock' },
	]

	return (
		<div className="space-y-8">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-2xl overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
				<img src={course?.thumbnail} alt={course?.title} className="w-full h-64 md:h-80 object-cover" />
				<div className="absolute inset-0 z-20 flex items-center p-8">
					<div className="max-w-2xl">
						<span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm mb-4">
							{course?.category} • {course?.level}
						</span>
						<h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course?.title}</h1>
						<p className="text-white/90 text-lg mb-6">{course?.description}</p>
						<div className="flex flex-wrap gap-4">
							<button onClick={() => onTabChange('player')} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer">
								<i className="fas fa-play mr-2"></i>
								Start Learning
							</button>
							<button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/30 transition-colors duration-300 cursor-pointer">
								<i className="fas fa-share-alt mr-2"></i>
								Share Course
							</button>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
						<div className="flex items-center">
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mr-4">
								<i className={`${stat.icon} text-purple-600 dark:text-purple-400 text-xl`}></i>
							</div>
							<div>
								<div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
							</div>
						</div>
					</div>
				))}
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-8">
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
							<i className="fas fa-graduation-cap text-purple-500 mr-2"></i>
							What You'll Learn
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{['Master React Hooks and advanced patterns', 'Build full-stack applications with Next.js', 'Implement Server-side Rendering (SSR)', 'Optimize React performance', 'TypeScript integration', 'Deployment strategies'].map((item, index) => (
								<div key={index} className="flex items-start">
									<i className="fas fa-check text-green-500 mt-1 mr-3"></i>
									<span className="text-gray-700 dark:text-gray-300">{item}</span>
								</div>
							))}
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Curriculum</h2>
							<button onClick={() => onTabChange('player')} className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">
								View All
							</button>
						</div>

						<div className="space-y-4">
							{[1, 2, 3].map((module) => (
								<div key={module} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
									<div className="flex justify-between items-center mb-3">
										<h3 className="font-semibold text-gray-900 dark:text-white">Module {module}: Getting Started</h3>
										<span className="text-sm text-gray-600 dark:text-gray-400">4 lessons • 2h 30m</span>
									</div>
									<div className="space-y-2">
										{[1, 2, 3].map((lesson) => (
											<div key={lesson} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
												<div className="flex items-center">
													<i className="fas fa-play-circle text-purple-500 mr-3"></i>
													<div>
														<p className="font-medium text-gray-900 dark:text-white">Lesson {lesson}: Introduction</p>
														<p className="text-sm text-gray-600 dark:text-gray-400">45 min • Video</p>
													</div>
												</div>
												{lesson === 1 && <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Completed</span>}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex justify-between items-center mb-6">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Student Reviews</h2>
								<div className="flex items-center">
									<div className="flex text-yellow-400 mr-2">
										{[...Array(5)].map((_, i) => (
											<i key={i} className="fas fa-star"></i>
										))}
									</div>
									<span className="text-gray-600 dark:text-gray-400">
										{course?.rating.toFixed(1)} • {course?.reviews} reviews
									</span>
								</div>
							</div>

							<div className="flex space-x-2">
								{['all', '5', '4', '3', '2', '1'].map((filter) => (
									<button key={filter} onClick={() => setActiveReviewFilter(filter)} className={`px-3 py-1 rounded-lg text-sm ${activeReviewFilter === filter ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
										{filter === 'all' ? 'All' : `${filter} stars`}
									</button>
								))}
							</div>
						</div>

						<div className="mb-8">
							<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
								{[5, 4, 3, 2, 1].map((rating) => (
									<div key={rating} className="text-center">
										<div className="text-2xl font-bold text-gray-900 dark:text-white">{rating}</div>
										<div className="flex justify-center mt-2">
											{[...Array(5)].map((_, i) => (
												<i key={i} className={`fas fa-star text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
											))}
										</div>
										<div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{Math.floor(Math.random() * 100)}%</div>
									</div>
								))}
							</div>
						</div>

						<div className="space-y-6">
							{reviews.map((review) => (
								<div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center">
											<img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full mr-4" />
											<div>
												<h4 className="font-semibold text-gray-900 dark:text-white">{review.user}</h4>
												<div className="flex items-center">
													<div className="flex text-yellow-400 mr-2">
														{[...Array(5)].map((_, i) => (
															<i key={i} className={`fas fa-star text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
														))}
													</div>
													<span className="text-sm text-gray-600 dark:text-gray-400">{review.date}</span>
												</div>
											</div>
										</div>
										<button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
											<i className="fas fa-ellipsis-h"></i>
										</button>
									</div>
									<p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
									<div className="flex items-center">
										<button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
											<i className="fas fa-thumbs-up mr-2"></i>
											Helpful ({review.helpful})
										</button>
										<button className="ml-4 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">Reply</button>
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 text-center">
							<button className="px-6 py-3 border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-300 cursor-pointer">Load More Reviews</button>
						</div>
					</motion.div>
				</div>

				<div className="space-y-6">
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Instructor</h3>
						<div className="text-center">
							<img src={course?.instructor?.avatar} alt={course?.instructor?.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-lg" />
							<h4 className="font-bold text-gray-900 dark:text-white text-lg">{course?.instructor?.name}</h4>
							<p className="text-gray-600 dark:text-gray-400 mb-3">{course?.instructor?.title}</p>
							<div className="flex items-center justify-center mb-4">
								<div className="flex text-yellow-400 mr-2">
									{[...Array(5)].map((_, i) => (
										<i key={i} className="fas fa-star"></i>
									))}
								</div>
								<span className="text-gray-600 dark:text-gray-400">{course?.instructor?.rating.toFixed(1)} Instructor Rating</span>
							</div>
							<div className="grid grid-cols-3 gap-4 mb-6">
								<div className="text-center">
									<div className="text-lg font-bold text-gray-900 dark:text-white">{course?.instructor?.students?.toLocaleString()}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
								</div>
								<div className="text-center">
									<div className="text-lg font-bold text-gray-900 dark:text-white">{course?.instructor?.courses}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
								</div>
								<div className="text-center">
									<div className="text-lg font-bold text-gray-900 dark:text-white">4.9</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
								</div>
							</div>
							<button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
								<i className="fas fa-envelope mr-2"></i>
								Message Instructor
							</button>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="text-xl font-bold mb-4">Course Includes</h3>
						<ul className="space-y-3 mb-6">
							<li className="flex items-center">
								<i className="fas fa-video mr-3"></i>
								<span>48 hours on-demand video</span>
							</li>
							<li className="flex items-center">
								<i className="fas fa-file-alt mr-3"></i>
								<span>12 downloadable resources</span>
							</li>
							<li className="flex items-center">
								<i className="fas fa-infinity mr-3"></i>
								<span>Full lifetime access</span>
							</li>
							<li className="flex items-center">
								<i className="fas fa-mobile-alt mr-3"></i>
								<span>Access on mobile and TV</span>
							</li>
							<li className="flex items-center">
								<i className="fas fa-certificate mr-3"></i>
								<span>Certificate of completion</span>
							</li>
						</ul>
						<div className="space-y-3">
							<button className="w-full px-4 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
								<i className="fas fa-shopping-cart mr-2"></i>
								Purchase Course - ${course?.price}
							</button>
							<button className="w-full px-4 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer">
								<i className="fas fa-gift mr-2"></i>
								Gift This Course
							</button>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Progress</h3>
						<div className="mb-6">
							<div className="flex justify-between text-sm mb-2">
								<span className="text-gray-600 dark:text-gray-400">Overall</span>
								<span className="font-bold text-gray-900 dark:text-white">{course?.progress}%</span>
							</div>
							<div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
								<motion.div initial={{ width: 0 }} animate={{ width: `${course?.progress}%` }} className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-gray-600 dark:text-gray-400">Lessons Completed</span>
								<span className="font-bold text-gray-900 dark:text-white">9/48</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-600 dark:text-gray-400">Time Spent</span>
								<span className="font-bold text-gray-900 dark:text-white">18h 30m</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-600 dark:text-gray-400">Current Streak</span>
								<span className="font-bold text-gray-900 dark:text-white">7 days</span>
							</div>
						</div>
						<button onClick={() => onTabChange('player')} className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer">
							Continue Learning
						</button>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default CourseOverview