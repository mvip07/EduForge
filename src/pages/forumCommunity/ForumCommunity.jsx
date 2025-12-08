import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import MainLayout from '../../components/layout/MainLayout'
import ThreadCard from './components/ThreadCard'
import CategoryCard from './components/CategoryCard'
import NewThreadModal from './components/NewThreadModal'
import ThreadDetailModal from './components/ThreadDetailModal'

const ForumCommunity = () => {
	const [activeTab, setActiveTab] = useState('all')
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedThread, setSelectedThread] = useState(null)
	const [newPostOpen, setNewPostOpen] = useState(false)
	const [replyTo, setReplyTo] = useState(null)
	const [commentInput, setCommentInput] = useState('')
	const { user } = useAuth()

	const categories = [
		{
			id: 'web-dev',
			name: 'Web Development',
			icon: 'fas fa-code',
			color: 'from-blue-500 to-cyan-600',
			description: 'HTML, CSS, JavaScript, Frameworks',
			threads: 1245,
			posts: 8920,
			latestActivity: '2 min ago',
			subcategories: ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript'],
		},
		{
			id: 'mobile-dev',
			name: 'Mobile Development',
			icon: 'fas fa-mobile-alt',
			color: 'from-purple-500 to-indigo-600',
			description: 'iOS, Android, React Native, Flutter',
			threads: 890,
			posts: 5420,
			latestActivity: '15 min ago',
			subcategories: ['React Native', 'Flutter', 'iOS', 'Android', 'Kotlin'],
		},
		{
			id: 'data-science',
			name: 'Data Science',
			icon: 'fas fa-chart-line',
			color: 'from-green-500 to-emerald-600',
			description: 'Python, ML, AI, Data Analysis',
			threads: 756,
			posts: 4320,
			latestActivity: '1 hour ago',
			subcategories: ['Machine Learning', 'Python', 'R', 'TensorFlow', 'SQL'],
		},
		{
			id: 'design',
			name: 'UI/UX Design',
			icon: 'fas fa-palette',
			color: 'from-pink-500 to-rose-600',
			description: 'Figma, Adobe XD, Prototyping',
			threads: 543,
			posts: 3210,
			latestActivity: '30 min ago',
			subcategories: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Wireframing'],
		},
		{
			id: 'devops',
			name: 'DevOps & Cloud',
			icon: 'fas fa-cloud',
			color: 'from-orange-500 to-amber-600',
			description: 'AWS, Docker, Kubernetes, CI/CD',
			threads: 678,
			posts: 3980,
			latestActivity: '45 min ago',
			subcategories: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
		},
		{
			id: 'career',
			name: 'Career & Jobs',
			icon: 'fas fa-briefcase',
			color: 'from-teal-500 to-cyan-600',
			description: 'Interview prep, Resume tips, Job market',
			threads: 1123,
			posts: 7680,
			latestActivity: '5 min ago',
			subcategories: ['Interview Prep', 'Resume Tips', 'Salary Talk', 'Job Search'],
		},
		{
			id: 'general',
			name: 'General Discussion',
			icon: 'fas fa-comments',
			color: 'from-gray-500 to-gray-700',
			description: 'Off-topic discussions and community',
			threads: 1987,
			posts: 12560,
			latestActivity: 'Just now',
			subcategories: ['Announcements', 'Introductions', 'Feedback', 'Water Cooler'],
		},
		{
			id: 'help',
			name: 'Help & Support',
			icon: 'fas fa-question-circle',
			color: 'from-red-500 to-pink-600',
			description: 'Get help with technical issues',
			threads: 432,
			posts: 2540,
			latestActivity: '10 min ago',
			subcategories: ['Technical Issues', 'Course Help', 'Platform Questions'],
		},
	]

	const popularThreads = [
		{
			id: 1,
			title: 'React 18 Concurrent Features - Best Practices?',
			category: 'web-dev',
			author: {
				name: 'Sarah Johnson',
				avatar: 'SJ',
				role: 'React Instructor',
				verified: true,
			},
			replies: 142,
			views: 2540,
			likes: 320,
			lastActivity: '15 min ago',
			tags: ['react', 'javascript', 'frontend'],
			isPinned: true,
			isSolved: true,
			isTrending: true,
			contentPreview: 'With React 18 now stable, what are the best practices for using concurrent features like startTransition and useDeferredValue in production applications?',
		},
		{
			id: 2,
			title: 'Next.js 14 App Router vs Pages Router',
			category: 'web-dev',
			author: {
				name: 'Mike Chen',
				avatar: 'MC',
				role: 'Senior Developer',
				verified: true,
			},
			replies: 89,
			views: 1870,
			likes: 210,
			lastActivity: '1 hour ago',
			tags: ['nextjs', 'react', 'ssr'],
			isPinned: false,
			isSolved: false,
			isTrending: true,
			contentPreview: "Should new projects use the App Router or stick with Pages Router? Let's discuss the pros and cons based on real-world experience.",
		},
		{
			id: 3,
			title: 'Best Machine Learning Projects for Beginners',
			category: 'data-science',
			author: {
				name: 'Dr. Alex Rodriguez',
				avatar: 'AR',
				role: 'ML Instructor',
				verified: true,
			},
			replies: 67,
			views: 1430,
			likes: 145,
			lastActivity: '2 hours ago',
			tags: ['machine-learning', 'python', 'beginners'],
			isPinned: true,
			isSolved: false,
			isTrending: false,
			contentPreview: 'Looking for project ideas to build your ML portfolio. What are some beginner-friendly projects that still look impressive?',
		},
		{
			id: 4,
			title: "2024 UI Design Trends - What's Next?",
			category: 'design',
			author: {
				name: 'Emma Wilson',
				avatar: 'EW',
				role: 'UI/UX Designer',
				verified: true,
			},
			replies: 45,
			views: 1250,
			likes: 98,
			lastActivity: '3 hours ago',
			tags: ['design', 'ui', 'trends'],
			isPinned: false,
			isSolved: true,
			isTrending: true,
			contentPreview: 'Glassmorphism, neumorphism, brutalist design - what trends are you implementing in your projects this year?',
		},
		{
			id: 5,
			title: 'Kubernetes in Production - Lessons Learned',
			category: 'devops',
			author: {
				name: 'Robert Kim',
				avatar: 'RK',
				role: 'DevOps Engineer',
				verified: true,
			},
			replies: 112,
			views: 1980,
			likes: 187,
			lastActivity: '4 hours ago',
			tags: ['kubernetes', 'devops', 'production'],
			isPinned: false,
			isSolved: false,
			isTrending: false,
			contentPreview: 'After running Kubernetes in production for 3 years, here are the most important lessons we learned about scaling and maintenance.',
		},
	]

	const threadComments = [
		{
			id: 1,
			author: {
				name: 'Sarah Johnson',
				avatar: 'SJ',
				role: 'React Instructor',
				verified: true,
				joinDate: '2022-01-15',
				reputation: 12450,
			},
			content: `In React 18, the concurrent features open up new possibilities for improving user experience. Here are my recommended best practices: 1. **Use startTransition for non-urgent updates**: Wrap state updates that don't need immediate feedback (like search filters) in startTransition 2. **Leverage useDeferredValue for expensive computations**: This is perfect for debouncing expensive calculations while keeping the UI responsive 3. **Combine Suspense with streaming SSR**: This can dramatically improve initial load times for data-heavy applications What's been your experience with these features so far?`,
			timestamp: '2 days ago',
			likes: 142,
			isAuthor: true,
			isPinned: false,
			attachments: [
				{
					type: 'code',
					language: 'javascript',
					content: `import { startTransition, useDeferredValue } from 'react'; function SearchComponent() {  const [query, setQuery] = useState('');  const deferredQuery = useDeferredValue(query);  const handleSearch = (newQuery) => {    startTransition(() => {      setQuery(newQuery);    });  };  return (    <>      <input onChange={(e) => handleSearch(e.target.value)} />      <SearchResults query={deferredQuery} />    </>  );}`,
				},
			],
		},
		{
			id: 2,
			author: {
				name: 'Mike Chen',
				avatar: 'MC',
				role: 'Senior Developer',
				verified: true,
				joinDate: '2021-08-22',
				reputation: 8920,
			},
			content: `Great summary, Sarah! I'd add that proper error boundaries are more important than ever with concurrent features. Since updates can be interrupted, you need to handle errors gracefully. Also, don't forget about the Profiler component - it's invaluable for identifying which components are causing unnecessary re-renders in concurrent mode.`,
			timestamp: '1 day ago',
			likes: 67,
			isAuthor: false,
			isPinned: false,
			attachments: [],
		},
		{
			id: 3,
			author: {
				name: 'Alex Turner',
				avatar: 'AT',
				role: 'Frontend Lead',
				verified: false,
				joinDate: '2023-03-10',
				reputation: 2450,
			},
			content: `I've found that useTransition is particularly useful for optimistic UI updates. For example, when a user likes a post, you can show the like immediately while the API request happens in the background. This makes the app feel much faster!`,
			timestamp: '20 hours ago',
			likes: 45,
			isAuthor: false,
			isPinned: false,
			attachments: [],
		},
	]

	const filters = [
		{ id: 'all', label: 'All Threads', icon: 'fas fa-globe' },
		{ id: 'trending', label: 'Trending', icon: 'fas fa-fire' },
		{ id: 'unanswered', label: 'Unanswered', icon: 'fas fa-question-circle' },
		{ id: 'solved', label: 'Solved', icon: 'fas fa-check-circle' },
		{ id: 'following', label: 'Following', icon: 'fas fa-star' },
		{ id: 'my-threads', label: 'My Threads', icon: 'fas fa-user' },
	]

	const [threads, setThreads] = useState(popularThreads)
	const [comments, setComments] = useState(threadComments)

	useEffect(() => {
		if (activeTab === 'trending') {
			setThreads(popularThreads.filter((t) => t.isTrending))
		} else if (activeTab === 'unanswered') {
			setThreads(popularThreads.filter((t) => !t.isSolved))
		} else if (activeTab === 'solved') {
			setThreads(popularThreads.filter((t) => t.isSolved))
		} else {
			setThreads(popularThreads)
		}
	}, [activeTab])

	const handleCreateThread = (threadData) => {
		const newThread = {
			id: threads.length + 1,
			...threadData,
			replies: 0,
			views: 0,
			likes: 0,
			lastActivity: 'Just now',
			isPinned: false,
			isSolved: false,
			isTrending: false,
		}
		setThreads([newThread, ...threads])
		setNewPostOpen(false)
	}

	const handleAddComment = () => {
		if (!commentInput.trim()) return

		const newComment = {
			id: comments.length + 1,
			author: {
				name: 'You',
				avatar: user?.name?.charAt(0) || 'U',
				role: 'Student',
				verified: false,
				joinDate: new Date().toISOString().split('T')[0],
				reputation: 150,
			},
			content: commentInput,
			timestamp: 'Just now',
			likes: 0,
			isAuthor: false,
			isPinned: false,
			attachments: [],
		}

		setComments([...comments, newComment])
		setCommentInput('')
		setReplyTo(null)
	}

	const handleLikeThread = (threadId) => {
		setThreads(threads.map((thread) => (thread.id === threadId ? { ...thread, likes: thread.likes + 1 } : thread)))
	}

	const handleLikeComment = (commentId) => {
		setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)))
	}

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community Forum</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Connect, learn, and share with fellow learners</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button onClick={() => setNewPostOpen(true)} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer">
							<i className="fas fa-plus mr-2"></i>
							New Thread
						</button>
						<button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-search mr-2"></i>
							Search
						</button>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Threads</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{categories.reduce((acc, cat) => acc + cat.threads, 0).toLocaleString()}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
								<i className="fas fa-comments text-purple-600 dark:text-purple-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">24.5K</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
								<i className="fas fa-users text-green-600 dark:text-green-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Online Now</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">1,247</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
								<i className="fas fa-wifi text-blue-600 dark:text-blue-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Solved Today</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">84</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 flex items-center justify-center">
								<i className="fas fa-check-circle text-yellow-600 dark:text-yellow-400 text-xl"></i>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl mb-6">
						<div className="flex flex-col md:flex-row md:items-center justify-between">
							<div>
								<h2 className="text-2xl font-bold mb-2">Global Discussion Board</h2>
								<p className="text-purple-100">Join conversations with learners worldwide</p>
							</div>
							<div className="mt-4 md:mt-0">
								<div className="flex items-center">
									<i className="fas fa-rocket text-3xl mr-4"></i>
									<div>
										<div className="text-2xl font-bold">98%</div>
										<div className="text-sm text-purple-200">Questions Answered</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-6">
						<div className="flex flex-wrap gap-2">
							{filters.map((filter) => (
								<button key={filter.id} onClick={() => setActiveTab(filter.id)} className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${activeTab === filter.id ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}>
									<i className={`${filter.icon} mr-2`}></i>
									{filter.label}
								</button>
							))}
						</div>
					</div>

					<div className="mb-8">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Topic Categories</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{categories.map((category, index) => (
								<motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
									<CategoryCard category={category} isSelected={selectedCategory === category.id} onClick={() => setSelectedCategory(category.id)} />
								</motion.div>
							))}
						</div>
					</div>

					<div>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Popular Threads</h3>
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
								<i className="fas fa-fire text-orange-500"></i>
								<span>Sorted by popularity</span>
							</div>
						</div>

						<div className="space-y-4">
							{threads.map((thread, index) => (
								<motion.div key={thread.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
									<ThreadCard thread={thread} onClick={() => setSelectedThread(thread)} onLike={() => handleLikeThread(thread.id)} />
								</motion.div>
							))}
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center mb-6">
							<div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mr-4">{user?.name?.charAt(0) || 'U'}</div>
							<div>
								<h4 className="font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">Community Member</p>
								<div className="flex items-center mt-1">
									<i className="fas fa-star text-yellow-500 text-sm mr-1"></i>
									<span className="text-sm font-medium dark:text-white">Reputation: 150</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Threads</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Replies</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-gray-900 dark:text-white">142</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Solved</div>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
							<i className="fas fa-fire text-orange-500 mr-2"></i>
							Trending Topics
						</h3>
						<div className="space-y-3">
							{['React 18', 'Next.js 14', 'AI/ML', 'Web3', 'DevOps'].map((topic, index) => (
								<div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
									<div className="flex items-center">
										<span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs flex items-center justify-center mr-3">{index + 1}</span>
										<span className="font-medium text-gray-900 dark:text-white">{topic}</span>
									</div>
									<span className="text-sm text-gray-600 dark:text-gray-400">1.2k posts</span>
								</div>
							))}
						</div>
					</div>

					<div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="font-semibold mb-4 flex items-center">
							<i className="fas fa-trophy mr-2"></i>
							Community Leaders
						</h3>
						<div className="space-y-4">
							{[
								{ name: 'Sarah Johnson', role: 'React Expert', points: '12.4k' },
								{ name: 'Mike Chen', role: 'Full Stack Dev', points: '8.9k' },
								{ name: 'Emma Wilson', role: 'UI/UX Designer', points: '7.2k' },
							].map((leader, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold mr-3">{leader.name.charAt(0)}</div>
										<div>
											<div className="font-medium">{leader.name}</div>
											<div className="text-sm text-blue-200">{leader.role}</div>
										</div>
									</div>
									<div className="text-sm bg-white/20 px-3 py-1 rounded-full">{leader.points} pts</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
						<div className="space-y-3">
							<button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fas fa-bookmark mr-3"></i>
									<span>Saved Threads</span>
								</div>
								<i className="fas fa-chevron-right"></i>
							</button>
							<button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fas fa-bell mr-3"></i>
									<span>Notifications</span>
								</div>
								<span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">3</span>
							</button>
							<button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fas fa-tags mr-3"></i>
									<span>My Tags</span>
								</div>
								<i className="fas fa-chevron-right"></i>
							</button>
						</div>
					</div>
				</div>
			</div>

			<AnimatePresence>{newPostOpen && <NewThreadModal onClose={() => setNewPostOpen(false)} onSubmit={handleCreateThread} categories={categories} />}</AnimatePresence>

			<AnimatePresence>{selectedThread && <ThreadDetailModal thread={selectedThread} comments={comments} onClose={() => setSelectedThread(null)} onLikeComment={handleLikeComment} onReply={setReplyTo} replyTo={replyTo} commentInput={commentInput} setCommentInput={setCommentInput} onAddComment={handleAddComment} />}</AnimatePresence>
		</MainLayout>
	)
}

export default ForumCommunity
