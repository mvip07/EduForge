import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const ChatModal = ({ messages, messageInput, setMessageInput, onSendMessage, onClose }) => {
	const chatContainerRef = React.useRef(null)

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
		}
	}, [messages])

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
				<div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-2xl">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3">
								<i className="fas fa-headset text-xl"></i>
							</div>
							<div>
								<h3 className="font-bold">Live Chat Support</h3>
								<div className="flex items-center text-sm text-green-100">
									<span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
									Online • 2 min wait
								</div>
							</div>
						</div>
						<button onClick={onClose} className="text-white/80 hover:text-white text-xl cursor-pointer">
							<i className="fas fa-times"></i>
						</button>
					</div>
				</div>

				<div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4">
					{messages.map((msg) => (
						<div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
							<div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
								<img src={msg.avatar} alt={msg.name} className="w-8 h-8 rounded-full" />
								<div className={`mx-3 ${msg.sender === 'user' ? 'text-right' : ''}`}>
									<div className="mb-1">
										<span className="text-xs text-gray-500 dark:text-gray-400">{msg.name}</span>
									</div>
									<div className={` px-4 py-2 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>{msg.message}</div>
									<div className="mt-1">
										<span className="text-xs text-gray-500 dark:text-gray-400">{msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="p-4 border-t border-gray-200 dark:border-gray-700">
					<form onSubmit={onSendMessage} className="flex space-x-3">
						<input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
						<button type="submit" className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
							<i className="fas fa-paper-plane"></i>
						</button>
					</form>
					<div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
						<i className="fas fa-clock mr-1"></i>
						Average response time: 2 minutes
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default ChatModal
