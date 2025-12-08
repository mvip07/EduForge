import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const CoursePlayerHeader = ({ isOpen, onMenuClick, onExpandToggle, playerExpanded }) => {
	const [showSettings, setShowSettings] = useState(false)
	const navigate = useNavigate()

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center ml-4">
						<button onClick={() => navigate('/courses')} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-pointer">
							<i className="fas fa-chevron-left mr-2"></i>
							Back to Courses
						</button>
					</div>

					<div className="flex items-center space-x-4">
						<button onClick={onExpandToggle} className="hidden lg:flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer" title={playerExpanded ? 'Collapse Player' : 'Expand Player'}>
							{playerExpanded ? (
								<>
									<i className="fas fa-compress mr-2"></i>
									Collapse
								</>
							) : (
								<>
									<i className="fas fa-expand mr-2"></i>
									Expand
								</>
							)}
						</button>

						<div className="relative">
							<button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
								<i className="fas fa-cog text-xl"></i>
							</button>

							<AnimatePresence>
								{showSettings && (
									<motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
										<div className="p-4 border-b border-gray-200 dark:border-gray-700">
											<h3 className="font-semibold text-gray-900 dark:text-white">Player Settings</h3>
										</div>

										<div className="p-4 space-y-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Playback Speed</label>
												<div className="flex flex-wrap gap-2">
													{[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
														<button key={speed} className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${speed === 1 ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
															{speed}x
														</button>
													))}
												</div>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Video Quality</label>
												<select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
													<option>Auto (1080p)</option>
													<option>1080p</option>
													<option>720p</option>
													<option>480p</option>
													<option>360p</option>
												</select>
											</div>

											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-700 dark:text-gray-300">Subtitles</span>
												<label className="relative inline-flex items-center cursor-pointer">
													<input type="checkbox" className="sr-only peer" defaultChecked />
													<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
												</label>
											</div>

											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-700 dark:text-gray-300">Auto-play</span>
												<label className="relative inline-flex items-center cursor-pointer">
													<input type="checkbox" className="sr-only peer" />
													<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
												</label>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						<button onClick={onMenuClick} className="flex items-center p-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							{isOpen ? <i className="fas fa-times text-xl"></i> : <i className="fas fa-bars text-xl"></i>}
						</button>

						<div className="lg:hidden">
							<button className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
								<i className="fas fa-ellipsis-v text-xl"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default CoursePlayerHeader
