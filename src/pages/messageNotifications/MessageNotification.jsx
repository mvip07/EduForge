import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../../components/layout/MainLayout'
import ChatWindow from './components/ChatWindow'
import ConversationItem from './components/ConversationItem'
import NotificationCard from './components/NotificationCard'

const MessagesNotifications = () => {
	const [activeTab, setActiveTab] = useState('notifications')
	const [activeNotificationFilter, setActiveNotificationFilter] = useState('all')
	const [selectedConversation, setSelectedConversation] = useState(null)
	const [messageInput, setMessageInput] = useState('')

	const notifications = [
		{
			id: 1,
			type: 'new_course',
			title: 'New Course Available',
			message: 'Advanced React Patterns course is now available',
			time: '10 min ago',
			read: false,
			icon: 'fas fa-graduation-cap',
			color: 'from-purple-500 to-indigo-600',
			action: 'View Course',
			courseId: 'REACT-301',
		},
		{
			id: 2,
			type: 'assignment',
			title: 'Assignment Feedback',
			message: 'Your JavaScript project has been reviewed',
			time: '2 hours ago',
			read: false,
			icon: 'fas fa-file-code',
			color: 'from-blue-500 to-cyan-600',
			action: 'View Feedback',
			grade: 'A+',
			score: 95,
		},
		{
			id: 3,
			type: 'certificate',
			title: 'Certificate Achieved!',
			message: 'You earned a certificate for Web Development',
			time: '1 day ago',
			read: true,
			icon: 'fas fa-award',
			color: 'from-green-500 to-emerald-600',
			action: 'View Certificate',
			certificateId: 'CERT-2024-006',
		},
		{
			id: 4,
			type: 'system',
			title: 'System Maintenance',
			message: 'Scheduled maintenance on Saturday, 2 AM - 4 AM',
			time: '2 days ago',
			read: true,
			icon: 'fas fa-cogs',
			color: 'from-gray-500 to-gray-700',
			action: 'Learn More',
			importance: 'low',
		},
		{
			id: 5,
			type: 'new_course',
			title: 'New Course: Machine Learning',
			message: 'Introduction to ML with Python is now available',
			time: '3 days ago',
			read: true,
			icon: 'fas fa-robot',
			color: 'from-orange-500 to-red-600',
			action: 'Enroll Now',
			courseId: 'ML-101',
		},
	]

	const conversations = [
		{
			id: 'instructor_1',
			type: 'instructor',
			name: 'Dr. Sarah Johnson',
			role: 'React & Next.js Instructor',
			avatar: 'SJ',
			lastMessage: 'Great job on the assignment! Check my feedback.',
			time: '2 hours ago',
			unread: 3,
			online: true,
			rating: 4.9,
			courses: ['REACT-101', 'NEXT-201'],
		},
		{
			id: 'support_1',
			type: 'support',
			name: 'EduForge Support',
			role: 'Technical Support Team',
			avatar: 'LS',
			lastMessage: 'Your issue has been resolved.',
			time: '1 day ago',
			unread: 0,
			online: true,
			responseTime: '15 min',
		},
		{
			id: 'instructor_2',
			type: 'instructor',
			name: 'Prof. Michael Chen',
			role: 'Full Stack Development',
			avatar: 'MC',
			lastMessage: 'Remember to submit your project by Friday.',
			time: '2 days ago',
			unread: 0,
			online: false,
			rating: 4.8,
			courses: ['JS-202', 'NODE-301'],
		},
		{
			id: 'instructor_3',
			type: 'instructor',
			name: 'Emma Wilson',
			role: 'UI/UX Design Expert',
			avatar: 'EW',
			lastMessage: 'Love your design mockups!',
			time: '3 days ago',
			unread: 0,
			online: true,
			rating: 4.9,
			courses: ['DESIGN-101'],
		},
	]

	const [messages, setMessages] = useState([
		{
			id: 1,
			sender: 'instructor',
			content: 'Hi! I wanted to give you feedback on your latest assignment.',
			time: '10:30 AM',
			date: 'Today',
			attachments: [],
		},
		{
			id: 2,
			sender: 'user',
			content: "Thank you! I'm looking forward to your feedback.",
			time: '10:32 AM',
			date: 'Today',
			attachments: [],
		},
		{
			id: 3,
			sender: 'instructor',
			content: 'Your code structure is excellent. The use of React hooks is very clean. I especially liked your custom useFetch hook implementation.',
			time: '10:35 AM',
			date: 'Today',
			attachments: [],
		},
		{
			id: 4,
			sender: 'instructor',
			content: "I've attached a document with detailed feedback and suggestions for improvement.",
			time: '10:36 AM',
			date: 'Today',
			attachments: [
				{
					name: 'Assignment_Feedback.pdf',
					size: '2.4 MB',
					type: 'pdf',
					url: '#',
				},
				{
					name: 'Code_Review_Comments.docx',
					size: '1.8 MB',
					type: 'document',
					url: '#',
				},
			],
		},
		{
			id: 5,
			sender: 'user',
			content: "Thank you so much for the detailed feedback! I'll work on implementing your suggestions.",
			time: '10:40 AM',
			date: 'Today',
			attachments: [],
		},
	])

	const notificationFilters = [
		{ id: 'all', label: 'All', icon: 'fas fa-bell', count: notifications.length },
		{ id: 'unread', label: 'Unread', icon: 'fas fa-envelope', count: notifications.filter((n) => !n.read).length },
		{ id: 'course', label: 'Courses', icon: 'fas fa-graduation-cap', count: notifications.filter((n) => n.type === 'new_course').length },
		{ id: 'assignment', label: 'Assignments', icon: 'fas fa-file-code', count: notifications.filter((n) => n.type === 'assignment').length },
		{ id: 'certificate', label: 'Certificates', icon: 'fas fa-award', count: notifications.filter((n) => n.type === 'certificate').length },
		{ id: 'system', label: 'System', icon: 'fas fa-cogs', count: notifications.filter((n) => n.type === 'system').length },
	]

	const handleMarkAsRead = (id) => {
		console.log('Mark as read:', id)
	}

	const handleMarkAllAsRead = () => {
		console.log('Mark all as read')
	}

	const handleClearAll = () => {
		console.log('Clear all notifications')
	}

	const handleSendMessage = () => {
		if (!messageInput.trim()) return

		const newMessage = {
			id: messages.length + 1,
			sender: 'user',
			content: messageInput,
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			date: 'Today',
			attachments: [],
		}

		setMessages([...messages, newMessage])
		setMessageInput('')
	}

	const handleFileUpload = (event) => {
		const file = event.target.files[0]
		if (!file) return

		const newMessage = {
			id: messages.length + 1,
			sender: 'user',
			content: `Attached file: ${file.name}`,
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			date: 'Today',
			attachments: [
				{
					name: file.name,
					size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
					type: file.type.split('/')[1] || 'file',
					url: URL.createObjectURL(file),
				},
			],
		}

		setMessages([...messages, newMessage])
	}

	const filteredNotifications = notifications.filter((notification) => {
		if (activeNotificationFilter === 'all') return true
		if (activeNotificationFilter === 'unread') return !notification.read
		return notification.type === activeNotificationFilter
	})

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages & Notifications</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Stay updated with your learning progress</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button onClick={handleMarkAllAsRead} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<i className="fas fa-check-double mr-2"></i>
							Mark All as Read
						</button>
						<button onClick={handleClearAll} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-trash mr-2"></i>
							Clear All
						</button>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Notifications</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
								<i className="fas fa-bell text-purple-600 dark:text-purple-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{notifications.filter((n) => !n.read).length}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 flex items-center justify-center">
								<i className="fas fa-envelope text-red-600 dark:text-red-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Active Chats</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{conversations.filter((c) => c.unread > 0).length}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
								<i className="fas fa-comments text-green-600 dark:text-green-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">98%</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
								<i className="fas fa-bolt text-blue-600 dark:text-blue-400 text-xl"></i>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
				<div className="border-b border-gray-200 dark:border-gray-700">
					<nav className="-mb-px flex space-x-8 overflow-x-auto">
						<button
							onClick={() => {
								setActiveTab('notifications')
								setSelectedConversation(null)
							}}
							className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${activeTab === 'notifications' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
						>
							<i className="fas fa-bell mr-2"></i>
							Notifications
							<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">{notifications.length}</span>
						</button>

						<button onClick={() => setActiveTab('messages')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${activeTab === 'messages' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>
							<i className="fas fa-comments mr-2"></i>
							Private Messages
							<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{conversations.reduce((acc, conv) => acc + conv.unread, 0)}</span>
						</button>
					</nav>
				</div>
			</motion.div>

			<AnimatePresence mode="wait">
				<motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
					{activeTab === 'notifications' ? (
						<div className="space-y-6">
							<div className="flex flex-wrap gap-2">
								{notificationFilters.map((filter) => (
									<button key={filter.id} onClick={() => setActiveNotificationFilter(filter.id)} className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${activeNotificationFilter === filter.id ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}>
										<i className={`${filter.icon} mr-2`}></i>
										{filter.label}
										{filter.count > 0 && <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeNotificationFilter === filter.id ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>{filter.count}</span>}
									</button>
								))}
							</div>

							<div className="space-y-4">
								{filteredNotifications.length > 0 ? (
									filteredNotifications.map((notification, index) => (
										<motion.div key={notification.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
											<NotificationCard notification={notification} onMarkAsRead={() => handleMarkAsRead(notification.id)} />
										</motion.div>
									))
								) : (
									<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
										<i className="fas fa-bell-slash text-4xl text-gray-400 mb-4"></i>
										<p className="text-gray-600 dark:text-gray-400">No notifications found</p>
										<p className="text-sm text-gray-500 dark:text-gray-500 mt-2">You're all caught up!</p>
									</div>
								)}
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-1">
								<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
									<div className="p-4 border-b border-gray-200 dark:border-gray-700">
										<div className="flex items-center justify-between">
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conversations</h3>
											<span className="text-sm text-gray-600 dark:text-gray-400">{conversations.length} chats</span>
										</div>
										<div className="mt-4 relative">
											<input type="text" placeholder="Search messages..." className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
											<i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
										</div>
									</div>

									<div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[500px] overflow-x-hidden overflow-y-auto">
										{conversations.map((conversation) => (
											<ConversationItem key={conversation.id} conversation={conversation} isSelected={selectedConversation?.id === conversation.id} onClick={() => setSelectedConversation(conversation)} />
										))}
									</div>
								</div>
							</div>

							<div className="lg:col-span-2">
								{selectedConversation ? (
									<ChatWindow conversation={selectedConversation} messages={messages} messageInput={messageInput} setMessageInput={setMessageInput} onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
								) : (
									<div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
										<div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-6">
											<i className="fas fa-comments text-4xl text-purple-600 dark:text-purple-400"></i>
										</div>
										<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Select a conversation</h3>
										<p className="text-gray-600 dark:text-gray-400 text-center">Choose a conversation from the list to start messaging</p>
									</div>
								)}
							</div>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
		</MainLayout>
	)
}

export default MessagesNotifications
