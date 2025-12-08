import { motion } from 'framer-motion'

const CommentCard = ({ comment, onLike, onReply, isReplying }) => {
	return (
		<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`bg-white dark:bg-gray-800 rounded-xl border ${comment.isAuthor ? 'border-purple-200 dark:border-purple-800' : 'border-gray-200 dark:border-gray-700'} p-6`}>
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center">
					<div className="relative">
						<div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${comment.isAuthor ? 'bg-gradient-to-r from-purple-500 to-indigo-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}>{comment.author.avatar}</div>
						{comment.author.verified && <i className="fas fa-check-circle absolute -bottom-1 -right-1 text-blue-500 bg-white rounded-full"></i>}
					</div>

					<div className="ml-4">
						<div className="flex items-center">
							<h4 className="font-semibold text-gray-900 dark:text-white">{comment.author.name}</h4>
							{comment.isAuthor && <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full">Author</span>}
						</div>
						<div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
							<span>{comment.timestamp}</span>
							<span className="mx-2">•</span>
							<span>{comment.author.reputation.toLocaleString()} reputation</span>
						</div>
					</div>
				</div>

				<div className="flex items-center space-x-3">
					<button onClick={onLike} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer">
						<i className="fas fa-heart mr-1"></i>
						<span>{comment.likes}</span>
					</button>
					{comment.isPinned && (
						<span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
							<i className="fas fa-thumbtack mr-1"></i> Pinned
						</span>
					)}
				</div>
			</div>

			<div className="prose dark:prose-invert max-w-none mb-6">
				<p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>

				{comment.attachments && comment.attachments.length > 0 && (
					<div className="mt-4 space-y-3">
						{comment.attachments.map((attachment, index) => (
							<div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
								{attachment.type === 'code' ? (
									<div>
										<div className="flex items-center justify-between mb-2">
											<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
												<i className="fas fa-code mr-2"></i>
												<span>Code Snippet</span>
											</div>
											<button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
												<i className="fas fa-copy"></i>
											</button>
										</div>
										<pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
											<code>{attachment.content}</code>
										</pre>
									</div>
								) : (
									<div className="flex items-center">
										<i className="fas fa-file text-gray-400 text-xl mr-3"></i>
										<div className="flex-1">
											<div className="font-medium text-gray-900 dark:text-white">{attachment.name}</div>
											<div className="text-sm text-gray-600 dark:text-gray-400">{attachment.size}</div>
										</div>
										<a href={attachment.url} download className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
											<i className="fas fa-download"></i>
										</a>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>

			<div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
				<div className="flex items-center space-x-4">
					<button onClick={onReply} className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
						<i className="fas fa-reply mr-2"></i>
						Reply
					</button>
					<button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
						<i className="fas fa-flag mr-2"></i>
						Report
					</button>
				</div>

				{isReplying && (
					<div className="text-sm text-purple-600 dark:text-purple-400">
						<i className="fas fa-spinner fa-spin mr-2"></i>
						Replying...
					</div>
				)}
			</div>
		</motion.div>
	)
}

export default CommentCard