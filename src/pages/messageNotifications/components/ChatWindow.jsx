import { useRef } from "react"
import MessageBubble from "./MessageBubble"

const ChatWindow = ({ conversation, messages, messageInput, setMessageInput, onSendMessage, onFileUpload }) => {
	const fileInputRef = useRef(null)

	return (
		<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-[600px] flex flex-col">
			<div className="p-6 border-b border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold mr-4 ${conversation.type === 'instructor' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-purple-500 to-indigo-600'}`}>{conversation.avatar}</div>
						<div>
							<h3 className="font-bold text-gray-900 dark:text-white">{conversation.name}</h3>
							<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
								{conversation.online ? (
									<>
										<div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
										<span>Online</span>
									</>
								) : (
									<>
										<div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
										<span>Offline</span>
									</>
								)}
								<span className="mx-2">•</span>
								<span>{conversation.role}</span>
							</div>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-phone"></i>
						</button>
						<button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-video"></i>
						</button>
						<button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-ellipsis-v"></i>
						</button>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-6 space-y-6">
				{messages.map((message) => (
					<MessageBubble key={message.id} message={message} isUser={message.sender === 'user'} />
				))}
			</div>

			<div className="p-6 border-t border-gray-200 dark:border-gray-700">
				<div className="flex items-center space-x-4">
					<button onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" title="Attach file">
						<i className="fas fa-paperclip"></i>
					</button>

					<input type="file" ref={fileInputRef} onChange={onFileUpload} className="hidden" accept=".pdf,.doc,.docx,.jpg,.png,.txt" />

					<div className="flex-1 relative">
						<input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && onSendMessage()} placeholder="Type your message here..." className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
						<i className="fas fa-smile absolute left-4 top-3.5 text-gray-400 cursor-pointer"></i>
					</div>

					<button onClick={onSendMessage} disabled={!messageInput.trim()} className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${messageInput.trim() ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'} transition-all duration-300`}>
						<i className="fas fa-paper-plane"></i>
					</button>
				</div>

				<div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
					<div className="flex items-center space-x-4">
						<span>Press Enter to send</span>
						<span>•</span>
						<span>File size limit: 25MB</span>
					</div>
					<div className="flex items-center space-x-2">
						<i className="fas fa-lock"></i>
						<span>End-to-end encrypted</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatWindow
