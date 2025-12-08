import { motion } from 'framer-motion'

const ThreadCard = ({ thread, onClick, onLike }) => {
	return (
		<motion.div whileHover={{ x: 5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<div className="flex items-center mb-2">
							{thread.isPinned && (
								<span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full mr-2">
									<i className="fas fa-thumbtack mr-1"></i> Pinned
								</span>
							)}
							{thread.isSolved && (
								<span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full mr-2">
									<i className="fas fa-check-circle mr-1"></i> Solved
								</span>
							)}
							{thread.isTrending && (
								<span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full">
									<i className="fas fa-fire mr-1"></i> Trending
								</span>
							)}
						</div>

						<h3 onClick={onClick} className="text-lg font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer mb-2">
							{thread.title}
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{thread.contentPreview}</p>
					</div>
					<button onClick={onLike} className="ml-4 flex flex-col items-center cursor-pointer">
						<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-1">
							<i className="fas fa-heart text-purple-600 dark:text-purple-400"></i>
						</div>
						<span className="text-sm font-medium text-gray-900 dark:text-white">{thread.likes}</span>
					</button>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm mr-3">{thread.author.avatar}</div>
						<div>
							<div className="flex items-center">
								<span className="font-medium text-gray-900 dark:text-white">{thread.author.name}</span>
								{thread.author.verified && <i className="fas fa-check-circle text-blue-500 ml-1" title="Verified"></i>}
							</div>
							<p className="text-xs text-gray-600 dark:text-gray-400">{thread.author.role}</p>
						</div>
					</div>

					<div className="flex items-center space-x-6">
						<div className="text-center">
							<div className="text-lg font-bold text-gray-900 dark:text-white">{thread.replies}</div>
							<div className="text-xs text-gray-600 dark:text-gray-400">Replies</div>
						</div>
						<div className="text-center">
							<div className="text-lg font-bold text-gray-900 dark:text-white">{thread.views.toLocaleString()}</div>
							<div className="text-xs text-gray-600 dark:text-gray-400">Views</div>
						</div>
					</div>
				</div>

				<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						{thread.tags.map((tag, index) => (
							<span key={index} className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
								{tag}
							</span>
						))}
					</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">
						<i className="far fa-clock mr-1"></i>
						{thread.lastActivity}
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default ThreadCard