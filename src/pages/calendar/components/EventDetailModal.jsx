import { motion } from 'framer-motion'

const EventDetailModal = ({ event, onClose, onJoin, onAddToCalendar }) => {
	const getEventIcon = (type) => {
		switch (type) {
			case 'live_lesson':
				return 'fas fa-video'
			case 'assignment':
				return 'fas fa-file-code'
			case 'exam':
				return 'fas fa-graduation-cap'
			case 'deadline':
				return 'fas fa-flag-checkered'
			default:
				return 'fas fa-calendar'
		}
	}

	const formatDuration = (minutes) => {
		const hours = Math.floor(minutes / 60)
		const mins = minutes % 60
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
	}

	const getStatusBadge = (event) => {
		const now = new Date()
		const eventDate = new Date(event.date)

		if (eventDate < now) {
			return (
				<span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full">
					<i className="fas fa-check-circle mr-1"></i>
					Completed
				</span>
			)
		}

		if (event.type === 'assignment' || event.type === 'deadline') {
			const diffHours = Math.floor((eventDate - now) / (1000 * 60 * 60))
			if (diffHours < 24) {
				return (
					<span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full animate-pulse">
						<i className="fas fa-exclamation-triangle mr-1"></i>
						Urgent
					</span>
				)
			}
		}

		return (
			<span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
				<i className="fas fa-clock mr-1"></i>
				Upcoming
			</span>
		)
	}

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
				<div className={`p-6 bg-gradient-to-r ${event.color} text-white`}>
					<div className="flex justify-between items-start">
						<div className="flex-1">
							<div className="flex items-center mb-3">
								<i className={`${getEventIcon(event.type)} text-2xl mr-3`}></i>
								{getStatusBadge(event)}
							</div>
							<h2 className="text-2xl font-bold mb-2">{event.title}</h2>
							<div className="flex items-center text-white/80">
								<i className="fas fa-book mr-2"></i>
								<span>{event.course}</span>
								{event.instructor && (
									<>
										<span className="mx-3">•</span>
										<i className="fas fa-user mr-2"></i>
										<span>{event.instructor}</span>
									</>
								)}
							</div>
						</div>
						<button onClick={onClose} className="text-white/80 hover:text-white text-xl cursor-pointer">
							<i className="fas fa-times"></i>
						</button>
					</div>
				</div>

				<div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
								<i className="far fa-calendar mr-2"></i>
								Date & Time
							</h4>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">Date</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{new Date(event.date).toLocaleDateString('en-US', {
											weekday: 'long',
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">Time</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{new Date(event.date).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
											timeZoneName: 'short',
										})}
									</span>
								</div>
								{event.duration && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
										<span className="font-medium text-gray-900 dark:text-white">{formatDuration(event.duration)}</span>
									</div>
								)}
							</div>
						</div>

						{/* Event Details */}
						<div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
								<i className="fas fa-info-circle mr-2"></i>
								Event Details
							</h4>
							<div className="space-y-2">
								{event.type === 'live_lesson' && (
									<>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600 dark:text-gray-400">Room</span>
											<span className="font-medium text-gray-900 dark:text-white">{event.room}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600 dark:text-gray-400">Attendees</span>
											<span className="font-medium text-gray-900 dark:text-white">
												{event.attendees}/{event.maxAttendees}
											</span>
										</div>
									</>
								)}
								{event.type === 'exam' && (
									<>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
											<span className="font-medium text-gray-900 dark:text-white">{event.location}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600 dark:text-gray-400">Total Marks</span>
											<span className="font-medium text-gray-900 dark:text-white">{event.totalMarks}</span>
										</div>
									</>
								)}
								{event.type === 'assignment' && (
									<>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600 dark:text-gray-400">Points</span>
											<span className="font-medium text-gray-900 dark:text-white">{event.points}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600 dark:text-gray-400">Submission</span>
											<span className="font-medium text-gray-900 dark:text-white">{event.submissionType}</span>
										</div>
									</>
								)}
								{event.type === 'deadline' && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-600 dark:text-gray-400">Priority</span>
										<span className="font-medium text-gray-900 dark:text-white capitalize">{event.importance}</span>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="mb-6">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h4>
						<p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{event.description}</p>
					</div>

					{event.type === 'live_lesson' && event.joinLink && (
						<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
								<i className="fas fa-link mr-2 text-blue-500"></i>
								Join Link
							</h4>
							<p className="font-mono text-sm text-blue-600 dark:text-blue-400 break-all mb-3">{event.joinLink}</p>
							<button onClick={onJoin} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
								<i className="fas fa-video mr-2"></i>
								Join Live Session
							</button>
						</div>
					)}

					{event.type === 'assignment' && (
						<div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
								<i className="fas fa-tasks mr-2 text-green-500"></i>
								Submission Requirements
							</h4>
							<ul className="space-y-2 text-gray-700 dark:text-gray-300">
								<li className="flex items-center">
									<i className="fas fa-check-circle text-green-500 mr-2"></i>
									<span>Submit before deadline</span>
								</li>
								<li className="flex items-center">
									<i className="fas fa-check-circle text-green-500 mr-2"></i>
									<span>Follow the project guidelines</span>
								</li>
								<li className="flex items-center">
									<i className="fas fa-check-circle text-green-500 mr-2"></i>
									<span>Include all required files</span>
								</li>
							</ul>
						</div>
					)}

					{event.type === 'exam' && (
						<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
								<i className="fas fa-exclamation-triangle mr-2 text-red-500"></i>
								Exam Instructions
							</h4>
							<ul className="space-y-2 text-gray-700 dark:text-gray-300">
								<li className="flex items-center">
									<i className="fas fa-clock text-red-500 mr-2"></i>
									<span>Arrive 15 minutes before start time</span>
								</li>
								<li className="flex items-center">
									<i className="fas fa-id-card text-red-500 mr-2"></i>
									<span>Bring your student ID</span>
								</li>
								<li className="flex items-center">
									<i className="fas fa-ban text-red-500 mr-2"></i>
									<span>No electronic devices allowed</span>
								</li>
							</ul>
						</div>
					)}
				</div>

				<div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
						<div className="text-sm text-gray-600 dark:text-gray-400">
							<i className="fas fa-bell mr-2"></i>
							Set a reminder 30 minutes before
						</div>
						<div className="flex space-x-3">
							<button onClick={onAddToCalendar} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								<i className="far fa-calendar-plus mr-2"></i>
								Add to Calendar
							</button>
							<button onClick={onClose} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
								Done
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default EventDetailModal
