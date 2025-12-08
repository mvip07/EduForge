import { motion } from 'framer-motion'

const NotificationCard = ({ notification, onMarkAsRead }) => {
	return (
		<motion.div whileHover={{ x: 5 }} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border ${!notification.read ? 'border-purple-200 dark:border-purple-800' : 'border-gray-200 dark:border-gray-700'}`}>
			<div className="p-6">
				<div className="flex items-start">
					<div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${notification.color} flex items-center justify-center text-white mr-4 flex-shrink-0`}>
						<i className={notification.icon}></i>
					</div>

					<div className="flex-1">
						<div className="flex justify-between items-start mb-2">
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
								<p className="text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
							</div>
							{!notification.read && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">New</span>}
						</div>

						<div className="flex items-center justify-between mt-4">
							<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
								<i className="far fa-clock mr-2"></i>
								{notification.time}

								{notification.courseId && (
									<span className="ml-4">
										<i className="fas fa-book mr-1"></i>
										{notification.courseId}
									</span>
								)}

								{notification.grade && (
									<span className="ml-4">
										<i className="fas fa-star mr-1"></i>
										{notification.grade} ({notification.score}%)
									</span>
								)}
							</div>

							<div className="flex items-center space-x-3">
								<button className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer">{notification.action}</button>
								{!notification.read && (
									<button onClick={onMarkAsRead} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" title="Mark as read">
										<i className="fas fa-check"></i>
									</button>
								)}
								<button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
									<i className="fas fa-ellipsis-h"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default NotificationCard
