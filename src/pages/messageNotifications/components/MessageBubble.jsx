import { motion } from 'framer-motion'

const MessageBubble = ({ message, isUser }) => {
	return (
		<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
			<div className={`max-w-[70%] ${isUser ? 'order-1' : 'order-2'}`}>
				<div className={`rounded-2xl p-4 ${isUser ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'}`}>
					<p>{message.content}</p>

					{message.attachments && message.attachments.length > 0 && (
						<div className="mt-3 space-y-2">
							{message.attachments.map((file, index) => (
								<div key={index} className={`p-3 rounded-lg ${isUser ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600'}`}>
									<div className="flex items-center">
										<div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${file.type === 'pdf' ? 'bg-red-100 dark:bg-red-900/30' : file.type === 'document' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-200 dark:bg-gray-700'}`}>
											<i className={`fas fa-${file.type === 'pdf' ? 'file-pdf' : file.type === 'document' ? 'file-word' : 'file'} text-${file.type === 'pdf' ? 'red' : file.type === 'document' ? 'blue' : 'gray'}-600 dark:text-${file.type === 'pdf' ? 'red' : file.type === 'document' ? 'blue' : 'gray'}-400`}></i>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium truncate">{file.name}</p>
											<p className="text-xs opacity-80">{file.size}</p>
										</div>
										<a href={file.url} download className="ml-2 p-2 hover:opacity-80" title="Download">
											<i className="fas fa-download"></i>
										</a>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
				<div className={`flex items-center text-xs mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
					<span className={isUser ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'}>{message.time}</span>
					{isUser && (
						<span className="ml-2 text-green-500">
							<i className="fas fa-check-double"></i>
						</span>
					)}
				</div>
			</div>

			{!isUser && (
				<div className="order-1 mr-3">
					<div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold">{message.sender === 'instructor' ? 'I' : 'S'}</div>
				</div>
			)}
		</motion.div>
	)
}

export default MessageBubble
