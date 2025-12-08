import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import MainLayout from '../../components/layout/MainLayout'
import ChatModal from './components/ChatModal'
import { getPriorityColor, getPriorityIcon, getStatusColor } from './utils/getColorIcon'

const SupportCenter = () => {
	const [activeTab, setActiveTab] = useState('faq')
	const [searchQuery, setSearchQuery] = useState('')
	const [tickets, setTickets] = useState([])
	const [newTicket, setNewTicket] = useState({
		title: '',
		category: 'technical',
		priority: 'medium',
		description: '',
	})
	const [faqCategories, setFaqCategories] = useState([])
	const [chatOpen, setChatOpen] = useState(false)
	const [chatMessages, setChatMessages] = useState([])
	const [messageInput, setMessageInput] = useState('')
	const { user } = useAuth()

	useEffect(() => {
		const faqCategoriess = [
			{
				id: 1,
				title: 'Account & Access',
				icon: 'fas fa-user-circle',
				color: 'from-blue-500 to-cyan-600',
				questions: [
					{
						id: 1,
						question: 'How do I reset my password?',
						answer: 'To reset your password, go to the login page and click "Forgot Password". Enter your registered email address and follow the instructions sent to your email. You can also change your password from the Account Settings page.',
						expanded: false,
					},
					{
						id: 2,
						question: 'Why am I unable to access my courses?',
						answer: 'This could be due to browser cache issues, payment status, or course enrollment period. Try clearing your browser cache first. If the issue persists, contact support with your course details.',
						expanded: false,
					},
					{
						id: 3,
						question: 'How do I update my profile information?',
						answer: 'Navigate to your Profile page from the dashboard. Click the "Edit Profile" button to update your personal information, profile picture, and notification preferences.',
						expanded: false,
					},
				],
			},
			{
				id: 2,
				title: 'Technical Issues',
				icon: 'fas fa-laptop-code',
				color: 'from-purple-500 to-indigo-600',
				questions: [
					{
						id: 4,
						question: 'The video player is not working properly',
						answer: 'Ensure you have a stable internet connection and try refreshing the page. Clear your browser cache, disable any ad blockers, and try using a different browser (Chrome or Firefox recommended).',
						expanded: false,
					},
					{
						id: 5,
						question: 'How do I clear browser cache for the platform?',
						answer: 'Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac) to open clear browsing data options. Select "Cached images and files" and choose time range "All time".',
						expanded: false,
					},
					{
						id: 6,
						question: 'System requirements for live sessions',
						answer: 'We recommend Chrome 90+, Firefox 88+, or Safari 14+. Ensure you have a stable internet connection (minimum 5 Mbps), allow camera/microphone permissions, and disable any VPN that might interfere.',
						expanded: false,
					},
				],
			},
			{
				id: 3,
				title: 'Course Content',
				icon: 'fas fa-graduation-cap',
				color: 'from-green-500 to-emerald-600',
				questions: [
					{
						id: 7,
						question: 'How do I download course materials?',
						answer: 'Navigate to the course page, click on the Resources tab. Available materials will have a download icon. Some materials may only be available for offline viewing within the app.',
						expanded: false,
					},
					{
						id: 8,
						question: 'Can I access courses after completion?',
						answer: 'Yes, all completed courses remain accessible in your library. You can review materials, but live sessions and instructor support may have time limitations.',
						expanded: false,
					},
					{
						id: 9,
						question: 'How do I track my progress?',
						answer: 'Your progress dashboard shows completion percentage, quiz scores, and assignment status. Each course has a progress bar in the sidebar showing completed modules.',
						expanded: false,
					},
				],
			},
			{
				id: 4,
				title: 'Payments & Refunds',
				icon: 'fas fa-credit-card',
				color: 'from-amber-500 to-orange-600',
				questions: [
					{
						id: 10,
						question: 'What payment methods do you accept?',
						answer: 'We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Some regions may have additional local payment options.',
						expanded: false,
					},
					{
						id: 11,
						question: 'What is your refund policy?',
						answer: 'Full refunds are available within 30 days of purchase if you have completed less than 20% of the course content. After 30 days, partial refunds may be considered on a case-by-case basis.',
						expanded: false,
					},
					{
						id: 12,
						question: 'How do I get a receipt?',
						answer: 'Receipts are automatically emailed to your registered email after each payment. You can also download invoices from your Billing History page in Account Settings.',
						expanded: false,
					},
				],
			},
		]

		setFaqCategories(faqCategoriess)
	}, [])

	useEffect(() => {
		const sampleTickets = [
			{
				id: 'TKT-001',
				title: 'Cannot access React course materials',
				category: 'Technical',
				priority: 'high',
				status: 'open',
				createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
				lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
				messages: 3,
			},
			{
				id: 'TKT-002',
				title: 'Question about assignment submission',
				category: 'Course Content',
				priority: 'medium',
				status: 'in-progress',
				createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
				lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000),
				messages: 5,
			},
			{
				id: 'TKT-003',
				title: 'Payment receipt not received',
				category: 'Billing',
				priority: 'medium',
				status: 'resolved',
				createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
				lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
				messages: 4,
			},
			{
				id: 'TKT-004',
				title: 'Certificate download issue',
				category: 'Technical',
				priority: 'low',
				status: 'closed',
				createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
				lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
				messages: 6,
			},
		]
		setTickets(sampleTickets)
	}, [])

	useEffect(() => {
		const sampleMessages = [
			{
				id: 1,
				sender: 'support',
				name: 'Alex Johnson',
				message: 'Hello! How can I help you today?',
				time: new Date(Date.now() - 30 * 60 * 1000),
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
			},
			{
				id: 2,
				sender: 'user',
				name: user?.name || 'You',
				message: "I'm having trouble accessing my course materials.",
				time: new Date(Date.now() - 25 * 60 * 1000),
				avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
			},
			{
				id: 3,
				sender: 'support',
				name: 'Alex Johnson',
				message: "I'll help you with that. Which course are you trying to access?",
				time: new Date(Date.now() - 20 * 60 * 1000),
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
			},
		]
		setChatMessages(sampleMessages)
	}, [user])

	const handleCreateTicket = (e) => {
		e.preventDefault()
		const newTicketObj = {
			id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
			title: newTicket.title,
			category: newTicket.category,
			priority: newTicket.priority,
			status: 'open',
			createdAt: new Date(),
			lastUpdated: new Date(),
			messages: 0,
		}
		setTickets([newTicketObj, ...tickets])
		setNewTicket({
			title: '',
			category: 'technical',
			priority: 'medium',
			description: '',
		})
		setActiveTab('tickets')
	}

	const handleSendMessage = (e) => {
		e.preventDefault()
		if (!messageInput.trim()) return

		const newMessage = {
			id: chatMessages.length + 1,
			sender: 'user',
			name: user?.name || 'You',
			message: messageInput,
			time: new Date(),
			avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
		}

		setChatMessages([...chatMessages, newMessage])
		setMessageInput('')

		setTimeout(() => {
			const autoReply = {
				id: chatMessages.length + 2,
				sender: 'support',
				name: 'Alex Johnson',
				message: 'Thanks for your message. Our support agent will respond shortly.',
				time: new Date(),
				avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
			}
			setChatMessages((prev) => [...prev, autoReply])
		}, 2000)
	}

	const toggleFAQ = (categoryId, questionId) => {
		setFaqCategories((prev) =>
			prev.map((category) => {
				if (category.id === categoryId) {
					return {
						...category,
						questions: category.questions.map((q) => ({ ...q, expanded: q.id === questionId ? !q.expanded : false })),
					}
				}
				return category
			})
		)
	}

	const filteredFAQs = faqCategories.map((category) => ({ ...category, questions: category.questions.filter((q) => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.answer.toLowerCase().includes(searchQuery.toLowerCase())) })).filter((category) => category.questions.length > 0)

	const filteredTickets = tickets.filter((ticket) => ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.category.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.id.toLowerCase().includes(searchQuery.toLowerCase()))

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Support Center</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Get help with your account, courses, and technical issues</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button onClick={() => setChatOpen(true)} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<i className="fas fa-comments mr-2"></i>
							Start Live Chat
						</button>
						<button onClick={() => setActiveTab('create')} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<i className="fas fa-plus mr-2"></i>
							New Ticket
						</button>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Open Tickets</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{tickets.filter((t) => t.status === 'open').length}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 flex items-center justify-center">
								<i className="fas fa-ticket-alt text-red-600 dark:text-red-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Avg. Response Time</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">2.4h</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
								<i className="fas fa-clock text-blue-600 dark:text-blue-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Resolution Rate</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">94%</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
								<i className="fas fa-check-circle text-green-600 dark:text-green-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Live Chat</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">Online</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
								<i className="fas fa-headset text-purple-600 dark:text-purple-400 text-xl"></i>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<div className="mb-8">
				<div className="relative">
					<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for answers, tickets, or ask a question..." className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
					<div className="absolute right-4 top-1/2 transform -translate-y-1/2">
						<i className="fas fa-search text-gray-400"></i>
					</div>
				</div>
			</div>

			<div className="mb-8">
				<div className="flex flex-wrap gap-2">
					{['faq', 'tickets', 'create'].map((tab) => (
						<button key={tab} onClick={() => setActiveTab(tab)} className={` px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${activeTab === tab ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} `}>
							<i className={` mr-2  ${tab === 'faq' ? 'fas fa-question-circle' : ''}  ${tab === 'tickets' ? 'fas fa-ticket-alt' : ''}  ${tab === 'create' ? 'fas fa-plus-circle' : ''}  ${tab === 'chat' ? 'fas fa-comments' : ''}`}></i>
							{tab === 'faq' && 'FAQ'}
							{tab === 'tickets' && 'My Tickets'}
							{tab === 'create' && 'Create Ticket'}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					{activeTab === 'faq' && (
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>

							{filteredFAQs.length > 0 ? (
								filteredFAQs.map((category) => (
									<div key={category.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
										<div className={`p-6 bg-gradient-to-r ${category.color} text-white`}>
											<div className="flex items-center">
												<i className={`${category.icon} text-2xl mr-3`}></i>
												<h3 className="text-xl font-bold">{category.title}</h3>
											</div>
										</div>
										<div className="p-6">
											<div className="space-y-4">
												{category.questions.map((question) => (
													<div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
														<button onClick={() => toggleFAQ(category.id, question.id)} className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer">
															<span className="font-medium text-gray-900 dark:text-white">{question.question}</span>
															<i className={`fas fa-chevron-down transition-transform duration-300 ${question.expanded ? 'rotate-180' : ''}`}></i>
														</button>
														<AnimatePresence>
															{question.expanded && (
																<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
																	<div className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
																		<p className="text-gray-600 dark:text-gray-400">{question.answer}</p>
																	</div>
																</motion.div>
															)}
														</AnimatePresence>
													</div>
												))}
											</div>
										</div>
									</div>
								))
							) : (
								<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
									<i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
									<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
									<p className="text-gray-600 dark:text-gray-400">Try different search terms or browse by category</p>
								</div>
							)}
						</motion.div>
					)}

					{activeTab === 'tickets' && (
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
							<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
								<div className="p-6 border-b border-gray-200 dark:border-gray-700">
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Support Tickets</h2>
									<p className="text-gray-600 dark:text-gray-400 mt-2">Track all your support requests and their status</p>
								</div>
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b border-gray-200 dark:border-gray-700">
												<th className="text-left p-6 text-sm font-medium text-gray-700 dark:text-gray-300">Ticket ID</th>
												<th className="text-left p-6 text-sm font-medium text-gray-700 dark:text-gray-300">Title</th>
												<th className="text-left p-6 text-sm font-medium text-gray-700 dark:text-gray-300">Category</th>
												<th className="text-left p-6 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
												<th className="text-left p-6 text-sm font-medium text-gray-700 dark:text-gray-300">Last Updated</th>
											</tr>
										</thead>
										<tbody>
											{filteredTickets.map((ticket) => (
												<tr
													key={ticket.id}
													className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-300"
													onClick={() => {
														/* Handle ticket click */
													}}
												>
													<td className="p-6">
														<span className="font-mono font-medium text-gray-900 dark:text-white">{ticket.id}</span>
													</td>
													<td className="p-6">
														<div>
															<p className="font-medium text-gray-900 dark:text-white">{ticket.title}</p>
															<div className="flex items-center mt-1">
																<i className={`${getPriorityIcon(ticket.priority)} mr-2 ${getPriorityColor(ticket.priority)}`}></i>
																<span className="text-xs text-gray-500 dark:text-gray-400">{ticket.priority} priority</span>
															</div>
														</div>
													</td>
													<td className="p-6">
														<span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">{ticket.category}</span>
													</td>
													<td className="p-6">
														<span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</span>
													</td>
													<td className="p-6">
														<span className="text-sm text-gray-600 dark:text-gray-400">{ticket.lastUpdated.toLocaleDateString()}</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</motion.div>
					)}

					{activeTab === 'create' && (
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
							<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
								<div className="p-6 border-b border-gray-200 dark:border-gray-700">
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Support Ticket</h2>
									<p className="text-gray-600 dark:text-gray-400 mt-2">Describe your issue in detail for faster resolution</p>
								</div>
								<form onSubmit={handleCreateTicket} className="p-6">
									<div className="space-y-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ticket Title</label>
											<input type="text" value={newTicket.title} onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })} placeholder="Briefly describe your issue" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
												<select value={newTicket.category} onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
													<option value="technical">Technical Issue</option>
													<option value="account">Account & Access</option>
													<option value="course">Course Content</option>
													<option value="billing">Billing & Payment</option>
													<option value="other">Other</option>
												</select>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
												<select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
													<option value="low">Low</option>
													<option value="medium">Medium</option>
													<option value="high">High</option>
												</select>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
											<textarea value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} placeholder="Please provide detailed information about your issue..." rows="6" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" required />
										</div>

										<div className="flex justify-end">
											<button type="submit" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium cursor-pointer">
												<i className="fas fa-paper-plane mr-2"></i>
												Submit Ticket
											</button>
										</div>
									</div>
								</form>
							</div>
						</motion.div>
					)}
				</div>

				<div className="space-y-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
							<i className="fas fa-lightbulb text-amber-500 mr-2"></i>
							Helpful Resources
						</h3>
						<div className="space-y-4">
							<a href="#" className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 group">
								<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center mr-3">
									<i className="fas fa-book text-blue-600 dark:text-blue-400"></i>
								</div>
								<div>
									<p className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">Platform Guide</p>
									<p className="text-xs text-gray-600 dark:text-gray-400">Complete user manual</p>
								</div>
							</a>
							<a href="#" className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 group">
								<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center mr-3">
									<i className="fas fa-video text-green-600 dark:text-green-400"></i>
								</div>
								<div>
									<p className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">Video Tutorials</p>
									<p className="text-xs text-gray-600 dark:text-gray-400">Step-by-step guides</p>
								</div>
							</a>
							<a href="#" className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 group">
								<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mr-3">
									<i className="fas fa-download text-purple-600 dark:text-purple-400"></i>
								</div>
								<div>
									<p className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">Troubleshooting Guide</p>
									<p className="text-xs text-gray-600 dark:text-gray-400">Common issues & fixes</p>
								</div>
							</a>
						</div>
					</div>

					<div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="font-semibold mb-4">Support Hours</h3>
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-blue-100">Monday - Friday</span>
								<span className="font-medium">9:00 AM - 8:00 PM EST</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-blue-100">Saturday - Sunday</span>
								<span className="font-medium">10:00 AM - 6:00 PM EST</span>
							</div>
						</div>
						<div className="mt-6 pt-6 border-t border-blue-400">
							<div className="flex items-center">
								<i className="fas fa-phone-alt mr-3"></i>
								<div>
									<p className="text-sm text-blue-100">Emergency Support</p>
									<p className="font-semibold">+1 (555) 123-4567</p>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
						<div className="space-y-3">
							<button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fas fa-history text-purple-500 mr-3"></i>
									<span>View Ticket History</span>
								</div>
								<i className="fas fa-chevron-right text-gray-400"></i>
							</button>
							<button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fas fa-file-download text-blue-500 mr-3"></i>
									<span>Download Resources</span>
								</div>
								<i className="fas fa-chevron-right text-gray-400"></i>
							</button>
							<button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fas fa-user-cog text-green-500 mr-3"></i>
									<span>Account Settings</span>
								</div>
								<i className="fas fa-chevron-right text-gray-400"></i>
							</button>
						</div>
					</div>

					<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="font-semibold mb-4">Support Team</h3>
						<p className="text-purple-100 text-sm mb-4">Our team is ready to help you</p>
						<div className="space-y-4">
							<div className="flex items-center">
								<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Support Agent" className="w-12 h-12 rounded-full border-2 border-white/20" />
								<div className="ml-4">
									<p className="font-semibold">Alex Johnson</p>
									<p className="text-sm text-purple-200">Senior Support Specialist</p>
								</div>
								<span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
							</div>
							<div className="flex items-center">
								<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" alt="Support Agent" className="w-12 h-12 rounded-full border-2 border-white/20" />
								<div className="ml-4">
									<p className="font-semibold">Maria Garcia</p>
									<p className="text-sm text-purple-200">Technical Support Lead</p>
								</div>
								<span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AnimatePresence>{chatOpen && <ChatModal messages={chatMessages} messageInput={messageInput} setMessageInput={setMessageInput} onSendMessage={handleSendMessage} onClose={() => setChatOpen(false)} />}</AnimatePresence>
		</MainLayout>
	)
}

export default SupportCenter
