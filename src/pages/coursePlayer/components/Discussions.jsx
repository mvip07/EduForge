import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Discussions = ({ course }) => {
	const [discussions] = useState([
		{
			id: 1,
			title: 'Understanding useEffect dependencies array',
			author: 'Alex Chen',
			authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			content: "I'm having trouble understanding when to include variables in the dependencies array. Can someone explain with examples?",
			tags: ['hooks', 'useEffect', 'beginners'],
			upvotes: 24,
			replies: 8,
			views: 156,
			timestamp: '2 hours ago',
			isResolved: true,
			isPinned: true,
		},
		{
			id: 2,
			title: 'Best practices for custom hooks in large applications',
			author: 'Sarah Johnson',
			authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			content: 'What are some best practices for creating and organizing custom hooks in enterprise-level React applications?',
			tags: ['custom-hooks', 'best-practices', 'architecture'],
			upvotes: 18,
			replies: 12,
			views: 234,
			timestamp: '1 day ago',
			isResolved: false,
			isPinned: true,
		},
		{
			id: 3,
			title: 'Performance issues with useMemo in production',
			author: 'Marcus Lee',
			authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			content: 'I implemented useMemo for expensive calculations but still seeing performance issues. Any debugging tips?',
			tags: ['performance', 'useMemo', 'debugging'],
			upvotes: 15,
			replies: 6,
			views: 189,
			timestamp: '2 days ago',
			isResolved: false,
			isPinned: false,
		},
		{
			id: 4,
			title: 'Next.js vs React Router for large applications',
			author: 'Emma Wilson',
			authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			content: 'Comparing Next.js routing with React Router for enterprise applications. What are the trade-offs?',
			tags: ['nextjs', 'routing', 'comparison'],
			upvotes: 32,
			replies: 15,
			views: 312,
			timestamp: '3 days ago',
			isResolved: true,
			isPinned: false,
		},
	])

	const [activeDiscussion, setActiveDiscussion] = useState(discussions[0])
	const [newPost, setNewPost] = useState({
		title: '',
		content: '',
		tags: [],
	})
	const [newReply, setNewReply] = useState('')
	const [activeTab, setActiveTab] = useState('all')
	const [tagInput, setTagInput] = useState('')

	const replies = [
		{
			id: 1,
			author: course.instructor.name,
			authorAvatar: course.instructor.avatar,
			authorRole: 'Instructor',
			content: "Great question! The dependencies array should include all values that the effect depends on. If you're using a variable inside useEffect and it can change between renders, it should be in the array.",
			timestamp: '1 hour ago',
			upvotes: 12,
			isInstructor: true,
		},
		{
			id: 2,
			author: 'David Miller',
			authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			authorRole: 'Teaching Assistant',
			content: "Here's an example: If your effect uses a prop or state variable, add it to the array. Empty array [] means run once on mount.",
			timestamp: '45 minutes ago',
			upvotes: 8,
			isInstructor: false,
		},
		{
			id: 3,
			author: 'You',
			authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			authorRole: 'Student',
			content: 'Thanks for the explanation! That clears things up. What about functions defined inside the component?',
			timestamp: '30 minutes ago',
			upvotes: 3,
			isInstructor: false,
		},
	]

	const allTags = Array.from(new Set(discussions.flatMap((d) => d.tags)))

	const filteredDiscussions = discussions.filter((discussion) => {
		if (activeTab === 'unresolved') return !discussion.isResolved
		if (activeTab === 'my-posts') return discussion.author === 'You'
		return true
	})

	const handleCreatePost = () => {
		if (!newPost.title.trim() || !newPost.content.trim()) return

		const post = {
			id: discussions.length + 1,
			title: newPost.title,
			author: 'You',
			authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
			content: newPost.content,
			tags: newPost.tags,
			upvotes: 0,
			replies: 0,
			views: 0,
			timestamp: 'Just now',
			isResolved: false,
			isPinned: false,
		}

		alert('Post created successfully!')
		setNewPost({ title: '', content: '', tags: [] })
	}

	const handleAddReply = () => {
		if (!newReply.trim()) return

		alert('Reply posted!')
		setNewReply('')
	}

	const handleAddTag = () => {
		if (tagInput.trim() && !newPost.tags.includes(tagInput.trim())) {
			setNewPost({ ...newPost, tags: [...newPost.tags, tagInput.trim()] })
			setTagInput('')
		}
	}

	return (
		<div className="space-y-8">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						<i className="fas fa-comments text-purple-500 mr-3"></i>
						Discussions
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">Ask questions, share insights, and help fellow students</p>
				</div>
				<div className="flex items-center space-x-4">
					<div className="text-right">
						<div className="text-lg font-bold text-gray-900 dark:text-white">{discussions.length}</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Active Discussions</div>
					</div>
					<div className="w-2 h-12 bg-gray-300 dark:bg-gray-600"></div>
					<div className="text-right">
						<div className="text-lg font-bold text-gray-900 dark:text-white">92%</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Questions Resolved</div>
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
							<button onClick={() => setActiveTab('all')} className={`flex-1 py-2 text-center font-medium text-sm cursor-pointer ${activeTab === 'all' ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}>
								All Posts
							</button>
							<button onClick={() => setActiveTab('unresolved')} className={`flex-1 py-2 text-center font-medium text-sm cursor-pointer ${activeTab === 'unresolved' ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}>
								Unresolved
							</button>
							<button onClick={() => setActiveTab('my-posts')} className={`flex-1 py-2 text-center font-medium text-sm cursor-pointer ${activeTab === 'my-posts' ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}>
								My Posts
							</button>
						</div>

						<div className="relative mb-6">
							<input type="text" placeholder="Search discussions..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
							<i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
						</div>

						<div className="space-y-4">
							<AnimatePresence>
								{filteredDiscussions.map((discussion, index) => (
									<motion.button key={discussion.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} onClick={() => setActiveDiscussion(discussion)} className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${activeDiscussion.id === discussion.id ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-2 border-purple-200 dark:border-purple-700' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
										<div className="flex items-start justify-between mb-3">
											<div className="flex items-center">
												<img src={discussion.authorAvatar} alt={discussion.author} className="w-8 h-8 rounded-full mr-2" />
												<span className="font-medium text-gray-900 dark:text-white">{discussion.author}</span>
											</div>
											<div className="flex items-center space-x-2">
												{discussion.isPinned && <i className="fas fa-thumbtack text-yellow-500" title="Pinned"></i>}
												{discussion.isResolved && <i className="fas fa-check-circle text-green-500" title="Resolved"></i>}
											</div>
										</div>

										<h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{discussion.title}</h3>

										<div className="flex flex-wrap gap-2 mb-3">
											{discussion.tags.map((tag) => (
												<span key={tag} className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
													{tag}
												</span>
											))}
										</div>

										<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
											<div className="flex items-center space-x-4">
												<span className="flex items-center">
													<i className="fas fa-thumbs-up mr-1"></i>
													{discussion.upvotes}
												</span>
												<span className="flex items-center">
													<i className="fas fa-comment mr-1"></i>
													{discussion.replies}
												</span>
												<span className="flex items-center">
													<i className="fas fa-eye mr-1"></i>
													{discussion.views}
												</span>
											</div>
											<span>{discussion.timestamp}</span>
										</div>
									</motion.button>
								))}
							</AnimatePresence>
						</div>

						<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Tags</h3>
							<div className="flex flex-wrap gap-2">
								{allTags.map((tag) => (
									<button key={tag} className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
										#{tag}
									</button>
								))}
							</div>
						</div>
					</motion.div>
				</div>

				<div className="lg:col-span-2 space-y-8">
					<motion.div key={activeDiscussion.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-start justify-between mb-6">
							<div>
								<div className="flex items-center mb-4">
									{activeDiscussion.isPinned && (
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 mr-3">
											<i className="fas fa-thumbtack mr-1"></i>
											Pinned
										</span>
									)}
									{activeDiscussion.isResolved && (
										<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
											<i className="fas fa-check-circle mr-1"></i>
											Resolved
										</span>
									)}
								</div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{activeDiscussion.title}</h2>
								<div className="flex items-center">
									<img src={activeDiscussion.authorAvatar} alt={activeDiscussion.author} className="w-10 h-10 rounded-full mr-3" />
									<div>
										<div className="font-medium text-gray-900 dark:text-white">{activeDiscussion.author}</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">{activeDiscussion.timestamp}</div>
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
									<i className="fas fa-thumbs-up mr-2"></i>
									{activeDiscussion.upvotes}
								</button>
								<button className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
									<i className="fas fa-flag"></i>
								</button>
							</div>
						</div>

						<div className="prose dark:prose-invert max-w-none mb-8">
							<p className="text-gray-700 dark:text-gray-300">{activeDiscussion.content}</p>
						</div>

						<div className="flex flex-wrap gap-2 mb-8">
							{activeDiscussion.tags.map((tag) => (
								<span key={tag} className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
									#{tag}
								</span>
							))}
						</div>

						<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
							<div className="flex items-center space-x-6">
								<span className="flex items-center">
									<i className="fas fa-thumbs-up mr-2"></i>
									{activeDiscussion.upvotes} upvotes
								</span>
								<span className="flex items-center">
									<i className="fas fa-comment mr-2"></i>
									{activeDiscussion.replies} replies
								</span>
								<span className="flex items-center">
									<i className="fas fa-eye mr-2"></i>
									{activeDiscussion.views} views
								</span>
							</div>
							<button className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Share</button>
						</div>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
							<i className="fas fa-reply mr-2"></i>
							Replies ({replies.length})
						</h3>

						<div className="space-y-6">
							{replies.map((reply) => (
								<div key={reply.id} className={`p-6 rounded-xl ${reply.isInstructor ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center">
											<img src={reply.authorAvatar} alt={reply.author} className="w-10 h-10 rounded-full mr-3" />
											<div>
												<div className="flex items-center">
													<span className="font-medium text-gray-900 dark:text-white">{reply.author}</span>
													{reply.isInstructor && <span className="ml-2 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">Instructor</span>}
													{reply.authorRole === 'Teaching Assistant' && <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">TA</span>}
												</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">{reply.timestamp}</div>
											</div>
										</div>
										<div className="flex items-center space-x-4">
											<button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
												<i className="fas fa-thumbs-up mr-2"></i>
												{reply.upvotes}
											</button>
											<button className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">Reply</button>
										</div>
									</div>
									<p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
								</div>
							))}
						</div>

						<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
							<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add a Reply</h4>
							<div className="mb-4">
								<textarea value={newReply} onChange={(e) => setNewReply(e.target.value)} placeholder="Type your reply here..." className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" rows={4} />
							</div>
							<div className="flex justify-end">
								<button onClick={handleAddReply} disabled={!newReply.trim()} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
									<i className="fas fa-paper-plane mr-2"></i>
									Post Reply
								</button>
							</div>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
							<i className="fas fa-plus-circle text-purple-500 mr-2"></i>
							Start New Discussion
						</h3>

						<div className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Discussion Title</label>
								<input type="text" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} placeholder="What would you like to discuss?" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Detailed Description</label>
								<textarea value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} placeholder="Describe your question or topic in detail. Include any code snippets or error messages." className="w-full h-48 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" rows={6} />
								<div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
									<i className="fas fa-info-circle mr-1"></i>
									You can use markdown formatting and code blocks
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tags (Add up to 5 tags)</label>
								<div className="flex flex-wrap gap-2 mb-3">
									{newPost.tags.map((tag) => (
										<span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
											#{tag}
											<button onClick={() => setNewPost({ ...newPost, tags: newPost.tags.filter((t) => t !== tag) })} className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 cursor-pointer">
												<i className="fas fa-times"></i>
											</button>
										</span>
									))}
								</div>
								<div className="flex">
									<input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTag()} placeholder="Add a tag and press Enter" className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
									<button onClick={handleAddTag} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
										Add
									</button>
								</div>
							</div>

							<div className="flex justify-end space-x-4">
								<button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">Cancel</button>
								<button onClick={handleCreatePost} disabled={!newPost.title.trim() || !newPost.content.trim()} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
									<i className="fas fa-plus mr-2"></i>
									Create Discussion
								</button>
							</div>
						</div>
					</motion.div>

					{/* Community Guidelines */}
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="text-lg font-semibold mb-4">
							<i className="fas fa-users mr-2"></i>
							Community Guidelines
						</h3>
						<ul className="space-y-3 text-sm">
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-3"></i>
								Be respectful and constructive in discussions
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-3"></i>
								Include code snippets when asking technical questions
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-3"></i>
								Mark helpful answers as resolved
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-3"></i>
								Search before posting to avoid duplicates
							</li>
						</ul>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default Discussions