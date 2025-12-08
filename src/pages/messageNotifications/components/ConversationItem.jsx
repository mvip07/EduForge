import { motion } from 'framer-motion'

const ConversationItem = ({ conversation, isSelected, onClick }) => {
	return (
		<motion.div whileHover={{ x: 3 }} onClick={onClick} className={`p-4 cursor-pointer transition-all duration-300 ${isSelected ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-l-4 border-purple-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
			<div className="flex items-start">
				<div className="relative">
					<div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold ${conversation.type === 'instructor' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-purple-500 to-indigo-600'}`}>{conversation.avatar}</div>
					{conversation.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>}
				</div>

				<div className="ml-4 flex-1 min-w-0">
					<div className="flex justify-between items-start">
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white truncate">{conversation.name}</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conversation.role}</p>
						</div>
						<div className="flex flex-col items-end">
							<span className="text-xs text-gray-500 dark:text-gray-400">{conversation.time}</span>
							{conversation.unread > 0 && <span className="mt-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">{conversation.unread}</span>}
						</div>
					</div>

					<p className="mt-2 text-sm text-gray-700 dark:text-gray-300 truncate">{conversation.lastMessage}</p>

					<div className="flex items-center mt-2 space-x-4">
						{conversation.rating && (
							<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
								<i className="fas fa-star text-yellow-500 mr-1"></i>
								{conversation.rating}
							</div>
						)}
						{conversation.responseTime && (
							<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
								<i className="fas fa-bolt text-green-500 mr-1"></i>
								Avg: {conversation.responseTime}
							</div>
						)}
						{conversation.courses && (
							<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
								<i className="fas fa-book mr-1"></i>
								{conversation.courses.length} courses
							</div>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default ConversationItem
