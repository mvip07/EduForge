import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import FloatingBackground from '../../components/layout/FloatingBackground'
import DarkModeToggle from '../../components/UI/DarkModeToggle'
import MainLayout from '../../components/layout/MainLayout'
import EventDetailModal from './components/EventDetailModal'
import LiveSessionCard from './components/LiveSessionCard'

const Calendar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [activeView, setActiveView] = useState('month')
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [eventModalOpen, setEventModalOpen] = useState(false)

	const events = [
		{
			id: 1,
			title: 'Live: Advanced React Patterns',
			type: 'live_lesson',
			instructor: 'Sarah Johnson',
			course: 'REACT-301',
			date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 14, 0),
			duration: 90,
			description: 'Learn advanced React patterns including compound components, render props, and custom hooks.',
			joinLink: 'https://meet.eduforge.com/react-301',
			attendees: 45,
			maxAttendees: 100,
			color: 'from-purple-500 to-indigo-600',
			icon: 'fas fa-video',
			room: 'Virtual Room A',
		},
		{
			id: 2,
			title: 'Web Development Assignment Due',
			type: 'assignment',
			course: 'WEB-101',
			date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2, 23, 59),
			description: 'Submit your final project: Responsive Portfolio Website',
			status: 'pending',
			points: 100,
			color: 'from-blue-500 to-cyan-600',
			icon: 'fas fa-file-code',
			submissionType: 'GitHub Repository',
		},
		{
			id: 3,
			title: 'Midterm Exam: JavaScript Fundamentals',
			type: 'exam',
			course: 'JS-202',
			date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5, 10, 0),
			duration: 120,
			description: 'Covering topics: ES6+ features, async programming, DOM manipulation',
			location: 'Exam Hall B',
			seats: 30,
			color: 'from-red-500 to-pink-600',
			icon: 'fas fa-clipboard-check',
			totalMarks: 100,
		},
		{
			id: 4,
			title: 'Live: UI/UX Design Workshop',
			type: 'live_lesson',
			instructor: 'Emma Wilson',
			course: 'DESIGN-101',
			date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 16, 30),
			duration: 120,
			description: 'Interactive workshop on prototyping with Figma and user testing methodologies.',
			joinLink: 'https://meet.eduforge.com/design-101',
			attendees: 28,
			maxAttendees: 50,
			color: 'from-pink-500 to-rose-600',
			icon: 'fas fa-palette',
			room: 'Virtual Room B',
		},
		{
			id: 5,
			title: 'Project Proposal Deadline',
			type: 'deadline',
			course: 'ML-101',
			date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 4, 12, 0),
			description: 'Submit your machine learning project proposal and dataset description',
			status: 'upcoming',
			color: 'from-orange-500 to-amber-600',
			icon: 'fas fa-flag-checkered',
			importance: 'high',
		},
		{
			id: 6,
			title: 'Live: Node.js Backend Development',
			type: 'live_lesson',
			instructor: 'Mike Chen',
			course: 'NODE-301',
			date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7, 18, 0),
			duration: 90,
			description: 'Building RESTful APIs with Express.js and MongoDB. Authentication and error handling.',
			joinLink: 'https://meet.eduforge.com/node-301',
			attendees: 32,
			maxAttendees: 60,
			color: 'from-green-500 to-emerald-600',
			icon: 'fas fa-server',
			room: 'Virtual Room C',
		},
		{
			id: 7,
			title: 'Final Exam: Full Stack Development',
			type: 'exam',
			course: 'FSD-401',
			date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10, 9, 0),
			duration: 180,
			description: 'Comprehensive exam covering frontend, backend, and deployment',
			location: 'Main Auditorium',
			seats: 150,
			color: 'from-red-500 to-orange-600',
			icon: 'fas fa-graduation-cap',
			totalMarks: 200,
		},
		{
			id: 8,
			title: 'Weekly Quiz: React Hooks',
			type: 'assignment',
			course: 'REACT-201',
			date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 20, 0),
			description: '20 questions on useState, useEffect, useContext, and custom hooks',
			status: 'pending',
			points: 50,
			color: 'from-blue-500 to-indigo-600',
			icon: 'fas fa-question-circle',
			submissionType: 'Online Quiz',
		},
	]

	const upcomingEvents = events
		.filter((event) => {
			const today = new Date()
			const eventDate = new Date(event.date)
			const diffTime = eventDate - today
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
			return diffDays >= 0 && diffDays <= 7
		})
		.sort((a, b) => new Date(a.date) - new Date(b.date))

	const todaysEvents = events.filter((event) => {
		const today = new Date()
		const eventDate = new Date(event.date)
		return eventDate.getDate() === today.getDate() && eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear()
	})

	const generateCalendar = (date) => {
		const year = date.getFullYear()
		const month = date.getMonth()

		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0)
		const daysInMonth = lastDay.getDate()

		const startingDay = firstDay.getDay()

		const calendar = []
		let day = 1

		for (let i = 0; i < 6; i++) {
			const week = []
			for (let j = 0; j < 7; j++) {
				if (i === 0 && j < startingDay) {
					week.push(null)
				} else if (day > daysInMonth) {
					week.push(null)
				} else {
					const currentDate = new Date(year, month, day)
					const dayEvents = events.filter((event) => {
						const eventDate = new Date(event.date)
						return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
					})
					week.push({
						date: currentDate,
						day: day,
						events: dayEvents,
						isToday: currentDate.toDateString() === new Date().toDateString(),
						isSelected: currentDate.toDateString() === selectedDate.toDateString(),
					})
					day++
				}
			}
			calendar.push(week)
		}

		return calendar
	}

	const calendarGrid = generateCalendar(selectedDate)

	const handlePrevMonth = () => {
		setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
	}

	const handleNextMonth = () => {
		setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
	}

	const handleToday = () => {
		setSelectedDate(new Date())
	}

	const handleJoinLive = (event) => {
		window.open(event.joinLink, '_blank')
	}

	const handleAddToCalendar = (event) => {
		const start = new Date(event.date)
		const end = new Date(start.getTime() + event.duration * 60000)

		const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&dates=${formatGoogleCalendarDate(start)}/${formatGoogleCalendarDate(end)}`

		window.open(calendarUrl, '_blank')
	}

	const formatGoogleCalendarDate = (date) => {
		const d = new Date(date)
		if (isNaN(d.getTime())) {
			console.error('Invalid date:', date)
			return ''
		}

		return d.toISOString().replace(/-|:|\.\d+/g, '')
	}

	const getEventTypeLabel = (type) => {
		switch (type) {
			case 'live_lesson':
				return 'Live Lesson'
			case 'assignment':
				return 'Assignment'
			case 'exam':
				return 'Exam'
			case 'deadline':
				return 'Deadline'
			default:
				return 'Event'
		}
	}

	const getTimeRemaining = (date) => {
		const now = new Date()
		const eventDate = new Date(date)
		const diffMs = eventDate - now

		if (diffMs <= 0) return 'Past'

		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
		const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

		if (diffDays > 0) return `${diffDays}d ${diffHours}h`
		if (diffHours > 0) return `${diffHours}h ${diffMinutes}m`
		return `${diffMinutes}m`
	}

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Academic Calendar</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Track your schedule, deadlines, and live sessions</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button onClick={handleToday} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<i className="fas fa-calendar-day mr-2"></i>
							Today
						</button>
						<button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-plus mr-2"></i>
							Add Event
						</button>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Today's Events</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{todaysEvents.length}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
								<i className="fas fa-calendar-day text-purple-600 dark:text-purple-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Live</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{events.filter((e) => e.type === 'live_lesson' && new Date(e.date) > new Date()).length}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 flex items-center justify-center">
								<i className="fas fa-video text-red-600 dark:text-red-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Pending Assignments</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{events.filter((e) => e.type === 'assignment' && new Date(e.date) > new Date()).length}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
								<i className="fas fa-file-code text-blue-600 dark:text-blue-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Exams This Month</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{events.filter((e) => e.type === 'exam' && new Date(e.date).getMonth() === new Date().getMonth() && new Date(e.date).getFullYear() === new Date().getFullYear()).length}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
								<i className="fas fa-graduation-cap text-orange-600 dark:text-orange-400 text-xl"></i>
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
								<h2 className="text-2xl font-bold mb-2">{selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
								<p className="text-purple-100">Stay organized with your academic schedule</p>
							</div>
							<div className="mt-4 md:mt-0 flex items-center space-x-4">
								<div className="flex items-center bg-white/20 rounded-lg p-1">
									<button onClick={handlePrevMonth} className="p-2 rounded-lg hover:bg-white/20 cursor-pointer">
										<i className="fas fa-chevron-left"></i>
									</button>
									<button onClick={handleToday} className="px-4 py-2 text-sm font-medium cursor-pointer">
										Today
									</button>
									<button onClick={handleNextMonth} className="p-2 rounded-lg hover:bg-white/20 cursor-pointer">
										<i className="fas fa-chevron-right"></i>
									</button>
								</div>
							</div>
						</div>

						<div className="mt-6 flex space-x-2">
							{['month', 'week', 'day'].map((view) => (
								<button key={view} onClick={() => setActiveView(view)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 cursor-pointer ${activeView === view ? 'bg-white text-purple-600' : 'text-purple-200 hover:bg-white/20'}`}>
									{view} view
								</button>
							))}
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
						<div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
							{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
								<div key={day} className="p-4 text-center font-semibold text-gray-700 dark:text-gray-300">
									{day}
								</div>
							))}
						</div>

						<div className="p-2">
							{calendarGrid.map((week, weekIndex) => (
								<div key={weekIndex} className="grid grid-cols-7 mb-2">
									{week.map((day, dayIndex) => (
										<div key={dayIndex} className={` min-h-32 p-2 border border-gray-100 dark:border-gray-700 rounded-lg ${day ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''} ${day?.isToday ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' : ''} ${day?.isSelected ? 'ring-2 ring-purple-500' : ''}`} onClick={() => day && setSelectedDate(day.date)}>
											{day ? (
												<div className="h-full">
													<div className="flex justify-between items-start mb-2">
														<span className={` text-sm font-medium px-2 py-1 rounded-full ${day.isToday ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}>{day.day}</span>
														{day.events.length > 0 && (
															<span className="text-xs text-gray-500 dark:text-gray-400">
																{day.events.length} event{day.events.length !== 1 ? 's' : ''}
															</span>
														)}
													</div>

													<div className="space-y-1 max-h-20 overflow-y-auto">
														{day.events.slice(0, 3).map((event, eventIndex) => (
															<div
																key={eventIndex}
																className={`text-xs p-1 rounded truncate cursor-pointer${event.type === 'live_lesson' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}${event.type === 'assignment' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}${event.type === 'exam' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : ''}${event.type === 'deadline' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' : ''}`}
																onClick={(e) => {
																	e.stopPropagation()
																	setSelectedEvent(event)
																	setEventModalOpen(true)
																}}
															>
																<div className="flex items-center">
																	<i className={`${event.icon} mr-1 text-xs`}></i>
																	<span className="truncate">{event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title}</span>
																</div>
															</div>
														))}
														{day.events.length > 3 && <div className="text-xs text-center text-gray-500 dark:text-gray-400">+{day.events.length - 3} more</div>}
													</div>
												</div>
											) : (
												<div className="h-full bg-gray-50 dark:bg-gray-800/50 rounded"></div>
											)}
										</div>
									))}
								</div>
							))}
						</div>
					</div>

					<div className="mt-8">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
							<i className="fas fa-video mr-2 text-purple-500"></i>
							Upcoming Live Sessions
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{events
								.filter((e) => e.type === 'live_lesson' && new Date(e.date) > new Date())
								.slice(0, 4)
								.map((event, index) => (
									<motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
										<LiveSessionCard
											event={event}
											onClick={() => {
												setSelectedEvent(event)
												setEventModalOpen(true)
											}}
											onJoin={() => handleJoinLive(event)}
										/>
									</motion.div>
								))}
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-4">
							<i className="fas fa-calendar-alt text-purple-500 mr-2"></i>
							{selectedDate.toLocaleDateString('en-US', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</h3>

						<div className="space-y-4">
							{calendarGrid
								.flat()
								.find((day) => day?.date.toDateString() === selectedDate.toDateString())
								?.events.map((event) => (
									<div
										key={event.id}
										className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-colors duration-300 cursor-pointer"
										onClick={() => {
											setSelectedEvent(event)
											setEventModalOpen(true)
										}}
									>
										<div className="flex items-start justify-between">
											<div>
												<div className="flex items-center mb-1">
													<div className={`w-3 h-3 rounded-full bg-gradient-to-r ${event.color} mr-2`}></div>
													<span className="text-sm font-medium text-gray-900 dark:text-white">{getEventTypeLabel(event.type)}</span>
												</div>
												<p className="text-sm font-semibold text-gray-900 dark:text-white">{event.title}</p>
												<p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
													<i className="far fa-clock mr-1"></i>
													{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
													{event.duration && ` • ${event.duration} min`}
												</p>
											</div>
											<span className="text-xs font-medium text-gray-500 dark:text-gray-400">{getTimeRemaining(event.date)}</span>
										</div>
									</div>
								))}

							{!calendarGrid.flat().find((day) => day?.date.toDateString() === selectedDate.toDateString())?.events?.length && (
								<div className="text-center py-8 text-gray-500 dark:text-gray-400">
									<i className="fas fa-calendar-times text-3xl mb-3"></i>
									<p>No events scheduled</p>
								</div>
							)}
						</div>
					</div>

					<div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="font-semibold mb-4 flex items-center">
							<i className="fas fa-exclamation-triangle mr-2"></i>
							Upcoming Deadlines
						</h3>
						<div className="space-y-4">
							{events
								.filter((e) => (e.type === 'assignment' || e.type === 'deadline') && new Date(e.date) > new Date())
								.sort((a, b) => new Date(a.date) - new Date(b.date))
								.slice(0, 3)
								.map((event, index) => (
									<div key={event.id} className="bg-white/10 rounded-lg p-4">
										<div className="flex items-start justify-between mb-2">
											<div className="flex-1">
												<h4 className="font-semibold">{event.course}</h4>
												<p className="text-sm text-red-100">{event.title}</p>
											</div>
											<span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">{getTimeRemaining(event.date)}</span>
										</div>
										<div className="flex items-center text-sm text-red-200">
											<i className="far fa-calendar mr-2"></i>
											<span>
												{event.date.toLocaleDateString()} •{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
											</span>
										</div>
										{event.points && (
											<div className="mt-2 text-sm">
												<span className="bg-white/20 px-2 py-1 rounded">{event.points} points</span>
											</div>
										)}
									</div>
								))}
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
							<i className="fas fa-graduation-cap text-orange-500 mr-2"></i>
							Exam Schedule
						</h3>
						<div className="space-y-4">
							{events
								.filter((e) => e.type === 'exam')
								.sort((a, b) => new Date(a.date) - new Date(b.date))
								.map((exam, index) => (
									<div key={exam.id} className="border-l-4 border-orange-500 pl-4">
										<div className="flex justify-between items-start">
											<div>
												<h4 className="font-semibold text-gray-900 dark:text-white">{exam.course}</h4>
												<p className="text-sm text-gray-600 dark:text-gray-400">{exam.title}</p>
											</div>
											<span className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">{getTimeRemaining(exam.date)}</span>
										</div>
										<div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
											<div className="flex items-center space-x-4">
												<span>
													<i className="far fa-calendar mr-1"></i>
													{exam.date.toLocaleDateString()}
												</span>
												<span>
													<i className="far fa-clock mr-1"></i>
													{exam.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
												</span>
												{exam.duration && (
													<span>
														<i className="fas fa-hourglass-half mr-1"></i>
														{exam.duration} min
													</span>
												)}
											</div>
										</div>
									</div>
								))}
						</div>
					</div>

					<div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="font-semibold mb-4">Sync Calendar</h3>
						<p className="text-blue-100 text-sm mb-4">Never miss an event by syncing with your favorite calendar app</p>
						<div className="space-y-3">
							<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fab fa-google mr-3"></i>
									<span>Google Calendar</span>
								</div>
								<i className="fas fa-external-link-alt"></i>
							</button>
							<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fab fa-microsoft mr-3"></i>
									<span>Outlook Calendar</span>
								</div>
								<i className="fas fa-external-link-alt"></i>
							</button>
							<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fab fa-apple mr-3"></i>
									<span>Apple Calendar</span>
								</div>
								<i className="fas fa-external-link-alt"></i>
							</button>
						</div>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{eventModalOpen && selectedEvent && (
					<EventDetailModal
						event={selectedEvent}
						onClose={() => {
							setEventModalOpen(false)
							setSelectedEvent(null)
						}}
						onJoin={() => handleJoinLive(selectedEvent)}
						onAddToCalendar={() => handleAddToCalendar(selectedEvent)}
					/>
				)}
			</AnimatePresence>
		</MainLayout>
	)
}

export default Calendar
