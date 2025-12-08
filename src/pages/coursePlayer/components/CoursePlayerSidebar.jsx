import { useState } from 'react'
import { motion } from 'framer-motion'

const CoursePlayerSidebar = ({ isOpen, onClose, course, activeTab, onTabClick }) => {
	const [modules] = useState([
		{
			id: 1,
			title: 'Getting Started with React',
			lessonsCount: 4,
			completed: 4,
			duration: '2h 30m',
			lessons: [
				{ id: 1, title: 'Introduction to React', duration: '45m', type: 'video', completed: true },
				{ id: 2, title: 'JSX and Components', duration: '60m', type: 'video', completed: true },
				{ id: 3, title: 'Props and State', duration: '40m', type: 'video', completed: true },
				{ id: 4, title: 'Assignment: First React App', duration: '25m', type: 'assignment', completed: true },
			],
		},
		{
			id: 2,
			title: 'React Hooks Deep Dive',
			lessonsCount: 6,
			completed: 4,
			duration: '4h 15m',
			lessons: [
				{ id: 5, title: 'useState and useEffect', duration: '55m', type: 'video', completed: true },
				{ id: 6, title: 'Custom Hooks', duration: '45m', type: 'video', completed: true },
				{ id: 7, title: 'useContext and useReducer', duration: '65m', type: 'video', completed: true },
				{ id: 8, title: 'Quiz: React Hooks', duration: '30m', type: 'quiz', completed: true },
				{ id: 9, title: 'useMemo and useCallback', duration: '50m', type: 'video', completed: false },
				{ id: 10, title: 'Advanced Hook Patterns', duration: '50m', type: 'video', completed: false },
			],
		},
		{
			id: 3,
			title: 'Next.js Fundamentals',
			lessonsCount: 5,
			completed: 2,
			duration: '3h 40m',
			lessons: [
				{ id: 11, title: 'Introduction to Next.js', duration: '40m', type: 'video', completed: true },
				{ id: 12, title: 'File-based Routing', duration: '50m', type: 'video', completed: true },
				{ id: 13, title: 'Data Fetching Methods', duration: '55m', type: 'video', completed: false },
				{ id: 14, title: 'API Routes', duration: '45m', type: 'video', completed: false },
				{ id: 15, title: 'Assignment: Build Next.js App', duration: '30m', type: 'assignment', completed: false },
			],
		},
		{
			id: 4,
			title: 'Advanced Patterns',
			lessonsCount: 4,
			completed: 0,
			duration: '3h 20m',
			lessons: [
				{ id: 16, title: 'Server-side Rendering', duration: '60m', type: 'video', completed: false },
				{ id: 17, title: 'Static Site Generation', duration: '50m', type: 'video', completed: false },
				{ id: 18, title: 'Incremental Static Regeneration', duration: '45m', type: 'video', completed: false },
				{ id: 19, title: 'Performance Optimization', duration: '45m', type: 'video', completed: false },
			],
		},
	])

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: 'fas fa-info-circle' },
		{ id: 'player', label: 'Lessons', icon: 'fas fa-play-circle' },
		{ id: 'notes', label: 'Notes', icon: 'fas fa-sticky-note' },
		{ id: 'assignments', label: 'Assignments', icon: 'fas fa-tasks' },
		{ id: 'quizzes', label: 'Quizzes', icon: 'fas fa-question-circle' },
		{ id: 'discussions', label: 'Discussions', icon: 'fas fa-comments' },
		{ id: 'resources', label: 'Resources', icon: 'fas fa-folder-open' },
	]

	return (
		<>
			<motion.aside initial={{ x: 320 }} animate={{ x: isOpen ? 0 : 320 }} transition={{ type: 'spring', damping: 25 }} className="fixed inset-y-0 end-0 z-100 w-80 bg-white dark:bg-gray-800 shadow-2xl">
				<div className="flex flex-col h-full">
					<div className="p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-4">
							<button onClick={onClose} className="p-2 w-10 h-10 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
								<i className="fas fa-times"></i>
							</button>
							<div>
								<h2 className="font-bold text-gray-900 dark:text-white truncate">{course.title}</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400">Progress: {course.progress}%</p>
							</div>
						</div>

						<div className="mt-4">
							<div className="flex justify-between text-sm mb-1">
								<span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
								<span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
							</div>
							<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
								<motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
							</div>
						</div>
					</div>

					<div className="p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="grid grid-cols-3 gap-2">
							{tabs.map((tab) => (
								<button key={tab.id} onClick={() => onTabClick(tab.id)} className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 cursor-pointer ${activeTab === tab.id ? 'bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-600 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
									<i className={`${tab.icon} text-lg mb-1`}></i>
									<span className="text-xs font-medium">{tab.label}</span>
								</button>
							))}
						</div>
					</div>

					<div className="flex-1 overflow-y-auto">
						<div className="p-4">
							<h3 className="font-semibold text-gray-900 dark:text-white mb-4">Course Content</h3>
							<div className="space-y-4">
								{modules.map((module, index) => (
									<motion.div key={module.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
										<div className="flex items-center justify-between mb-3">
											<div>
												<h4 className="font-medium text-gray-900 dark:text-white">
													Module {module.id}: {module.title}
												</h4>
												<p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
													{module.completed}/{module.lessonsCount} lessons • {module.duration}
												</p>
											</div>
											<div className={`w-8 h-8 rounded-full flex items-center justify-center ${module.completed === module.lessons ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'}`}>
												<i className={`fas ${module.completed === module.lessons ? 'fa-check' : 'fa-book-open'} text-sm`}></i>
											</div>
										</div>

										<div className="space-y-2">
											{module.lessons.map((lesson) => (
												<button key={lesson.id} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${lesson.completed ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
													<div className="flex items-center">
														<div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${lesson.completed ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-600'}`}>
															<i className={`fas ${lesson.type === 'video' ? 'fa-play' : lesson.type === 'assignment' ? 'fa-tasks' : 'fa-question-circle'} ${lesson.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}></i>
														</div>
														<div className="text-left">
															<p className="text-sm font-medium text-gray-900 dark:text-white">{lesson.title}</p>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																{lesson.duration} • {lesson.type}
															</p>
														</div>
													</div>
													{lesson.completed && <i className="fas fa-check-circle text-green-500"></i>}
												</button>
											))}
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>

					<div className="p-4 border-t border-gray-200 dark:border-gray-700">
						<div className="grid grid-cols-2 gap-3">
							<div className="text-center">
								<div className="text-2xl font-bold text-gray-900 dark:text-white">{course.progress}%</div>
								<div className="text-xs text-gray-600 dark:text-gray-400">Complete</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-gray-900 dark:text-white">18h</div>
								<div className="text-xs text-gray-600 dark:text-gray-400">Time Spent</div>
							</div>
						</div>
					</div>
				</div>
			</motion.aside>
		</>
	)
}

export default CoursePlayerSidebar
