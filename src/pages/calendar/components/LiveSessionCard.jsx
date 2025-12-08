import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LiveSessionCard = ({ event, onClick, onJoin }) => {
	const [timeRemaining, setTimeRemaining] = useState('')

	useEffect(() => {
		const updateTimeRemaining = () => {
			const now = new Date()
			const eventDate = new Date(event.date)
			const diffMs = eventDate - now

			if (diffMs <= 0) {
				setTimeRemaining('Live Now')
				return
			}

			const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
			const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

			if (diffHours > 0) {
				setTimeRemaining(`in ${diffHours}h ${diffMinutes}m`)
			} else {
				setTimeRemaining(`in ${diffMinutes}m`)
			}
		}

		updateTimeRemaining()
		const interval = setInterval(updateTimeRemaining, 60000)

		return () => clearInterval(interval)
	}, [event.date])

	const isLiveSoon = () => {
		const now = new Date()
		const eventDate = new Date(event.date)
		const diffMs = eventDate - now
		return diffMs > 0 && diffMs < 3600000
	}

	return (
		<motion.div whileHover={{ y: -3 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className={`p-6 bg-gradient-to-r ${event.color} text-white`}>
				<div className="flex justify-between items-start">
					<div>
						<div className="flex items-center mb-2">
							<i className="fas fa-video text-xl mr-3"></i>
							<span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Live Session</span>
						</div>
						<h3 className="text-lg font-bold line-clamp-2">{event.title}</h3>
					</div>
					{isLiveSoon() && (
						<span className="px-3 py-1 text-sm font-medium bg-red-500 text-white rounded-full animate-pulse">
							<i className="fas fa-bell mr-1"></i>
							Soon
						</span>
					)}
				</div>
			</div>

			<div className="p-6">
				<div className="mb-4">
					<div className="flex items-center justify-between mb-3">
						<span className="text-sm text-gray-600 dark:text-gray-400">Instructor</span>
						<span className="font-medium text-gray-900 dark:text-white">{event.instructor}</span>
					</div>
					<div className="flex items-center justify-between mb-3">
						<span className="text-sm text-gray-600 dark:text-gray-400">Course</span>
						<span className="font-medium text-gray-900 dark:text-white">{event.course}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-600 dark:text-gray-400">Date & Time</span>
						<span className="font-medium text-gray-900 dark:text-white">
							{new Date(event.date).toLocaleDateString()} •{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</span>
					</div>
				</div>

				<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>

				<div className="mb-6">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm text-gray-600 dark:text-gray-400">Attendees</span>
						<span className="text-sm font-medium text-gray-900 dark:text-white">
							{event.attendees}/{event.maxAttendees}
						</span>
					</div>
					<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
						<motion.div initial={{ width: 0 }} animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }} className={`h-full bg-gradient-to-r ${event.color} rounded-full`} />
					</div>
				</div>

				<div className="flex space-x-3">
					<button onClick={onJoin} className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium cursor-pointer">
						<i className="fas fa-video mr-2"></i>
						{timeRemaining === 'Live Now' ? 'Join Now' : `Join ${timeRemaining}`}
					</button>
					<button onClick={onClick} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 text-sm cursor-pointer" title="View Details">
						<i className="fas fa-info-circle"></i>
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default LiveSessionCard
