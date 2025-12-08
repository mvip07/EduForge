import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FaBars } from 'react-icons/fa6'
import { FaBell, FaPlus, FaSearch } from 'react-icons/fa'

const Header = ({ onMenuClick }) => {
	const [notificationsOpen, setNotificationsOpen] = useState(false)
	const [profileOpen, setProfileOpen] = useState(false)
	const { user } = useAuth()

	const notifications = [
		{ id: 1, text: 'New assignment in React Course', time: '10 min ago', unread: true },
		{ id: 2, text: 'You completed "JavaScript Basics"', time: '1 hour ago', unread: true },
		{ id: 3, text: 'Live session starting in 30 minutes', time: '2 hours ago', unread: false },
		{ id: 4, text: 'New course available: Advanced Node.js', time: '1 day ago', unread: false },
	]

	const unreadCount = notifications.filter((n) => n.unread).length

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
							<FaBars className="text-xl" />
						</button>

						<div className="hidden md:block ml-4 relative">
							<div className="relative">
								<input type="text" placeholder="Search courses, assignments..." className="w-64 lg:w-80 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
								<FaSearch className="absolute left-3 top-3 text-gray-400" />
							</div>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						{/* <button className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<FaPlus className="mr-2" />
							Create Course
						</button> */}

						<div className="relative">
							<button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
								<FaBell className="text-xl" />
								{unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>}
							</button>

							<AnimatePresence>
								{notificationsOpen && (
									<motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="cursor-pointer absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
										<div className="p-4 border-b border-gray-200 dark:border-gray-700">
											<h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
										</div>
										<div className="max-h-96 overflow-y-auto">
											{notifications.map((notification) => (
												<div key={notification.id} className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-300 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
													<div className="flex items-start">
														<div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
														<div className="ml-3 flex-1">
															<p className="text-sm text-gray-900 dark:text-white">{notification.text}</p>
															<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
														</div>
													</div>
												</div>
											))}
										</div>
										<div className="p-3 border-t border-gray-200 dark:border-gray-700">
											<button className="text-sm text-purple-600 dark:text-purple-400 hover:underline w-full text-center">Mark all as read</button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Profile Dropdown */}
						<div className="relative">
							<button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-3 focus:outline-none cursor-pointer">
								<div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold">{user?.firstName?.charAt(0)}</div>
								<div className="hidden md:block text-left">
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{user?.firstName} {user?.lastName}
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
								</div>
								<i className="fas fa-chevron-down text-gray-400 hidden md:block"></i>
							</button>

							<AnimatePresence>
								{profileOpen && (
									<motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
										<div className="p-4 border-b border-gray-200 dark:border-gray-700">
											<p className="text-sm font-medium text-gray-900 dark:text-white">
												{user?.firstName} {user?.lastName}
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
										</div>
										<div className="py-1">
											<a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
												<i className="fas fa-user-circle mr-3"></i>
												Your Profile
											</a>
											<a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
												<i className="fas fa-cog mr-3"></i>
												Settings
											</a>
											<a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
												<i className="fas fa-question-circle mr-3"></i>
												Help & Support
											</a>
										</div>
										<div className="border-t border-gray-200 dark:border-gray-700 py-1">
											<button
												onClick={() => {
													setProfileOpen(false)
												}}
												className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
											>
												<i className="fas fa-sign-out-alt mr-3"></i>
												Sign out
											</button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
