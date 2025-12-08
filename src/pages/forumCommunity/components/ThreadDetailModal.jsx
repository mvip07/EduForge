import { useRef } from 'react'
import { motion } from 'framer-motion'
import CommentCard from './CommentCard'

const ThreadDetailModal = ({ thread, comments, onClose, onLikeComment, onReply, replyTo, commentInput, setCommentInput, onAddComment }) => {
	const fileInputRef = useRef(null)

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex justify-between items-center">
						<div className="flex-1">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">{thread.title}</h2>
							<div className="flex items-center mt-2 space-x-4 text-sm text-gray-600 dark:text-gray-400">
								<div className="flex items-center">
									<i className="far fa-clock mr-2"></i>
									<span>Posted {thread.lastActivity}</span>
								</div>
								<div className="flex items-center">
									<i className="fas fa-eye mr-2"></i>
									<span>{thread.views.toLocaleString()} views</span>
								</div>
							</div>
						</div>
						<button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-4 cursor-pointer">
							<i className="fas fa-times text-xl"></i>
						</button>
					</div>
				</div>

				<div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
					<div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8">
						<div className="flex items-start justify-between mb-6">
							<div className="flex items-center">
								<div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg mr-4">{thread.author.avatar}</div>
								<div>
									<div className="flex items-center">
										<h3 className="font-bold text-gray-900 dark:text-white">{thread.author.name}</h3>
										{thread.author.verified && <i className="fas fa-check-circle text-blue-500 ml-2" title="Verified"></i>}
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-400">{thread.author.role}</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
									<i className="fas fa-share-alt mr-2"></i>
									Share
								</button>
								<button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer">
									<i className="far fa-bookmark mr-2"></i>
									Save
								</button>
							</div>
						</div>

						<div className="prose dark:prose-invert max-w-none">
							<p className="text-gray-700 dark:text-gray-300 mb-6">{thread.contentPreview}</p>

							<div className="flex items-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
								<div className="flex items-center space-x-6">
									<button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
										<i className="fas fa-heart"></i>
										<span>{thread.likes}</span>
									</button>
									<button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
										<i className="fas fa-comment"></i>
										<span>{thread.replies}</span>
									</button>
								</div>

								<div className="flex-1 flex justify-end">
									<div className="flex items-center space-x-2">
										{thread.tags.map((tag, index) => (
											<span key={index} className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-8">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">
								<i className="fas fa-comments mr-2"></i>
								Comments ({comments.length})
							</h3>
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
								<i className="fas fa-sort"></i>
								<span>Sorted by: Most Helpful</span>
							</div>
						</div>

						<div className="space-y-6">
							{comments.map((comment) => (
								<CommentCard key={comment.id} comment={comment} onLike={() => onLikeComment(comment.id)} onReply={() => onReply(comment.id)} isReplying={replyTo === comment.id} />
							))}
						</div>
					</div>

					<div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-4">Add your comment</h4>

						{replyTo && (
							<div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
								<div className="flex justify-between items-center">
									<span className="text-sm text-purple-700 dark:text-purple-300">
										<i className="fas fa-reply mr-2"></i>
										Replying to comment
									</span>
									<button onClick={() => onReply(null)} className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer">
										Cancel
									</button>
								</div>
							</div>
						)}

						<textarea value={commentInput} onChange={(e) => setCommentInput(e.target.value)} rows={4} placeholder="Share your thoughts or ask a question..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4 resize-none" />

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" title="Attach file">
									<i className="fas fa-paperclip"></i>
								</button>

								<input type="file" ref={fileInputRef} className="hidden" accept=".jpg,.png,.pdf,.txt" />

								<button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" title="Insert code">
									<i className="fas fa-code"></i>
								</button>

								<button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" title="Add image">
									<i className="fas fa-image"></i>
								</button>
							</div>

							<div className="flex items-center space-x-3">
								<button onClick={() => setCommentInput('')} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
									Cancel
								</button>
								<button onClick={onAddComment} disabled={!commentInput.trim()} className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer ${commentInput.trim() ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
									<i className="fas fa-paper-plane mr-2"></i>
									Post Comment
								</button>
							</div>
						</div>

						<div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
							<i className="fas fa-info-circle mr-1"></i>
							Markdown formatting is supported
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default ThreadDetailModal