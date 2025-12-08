import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'

const LessonPlayer = ({ playerExpanded }) => {
	const [playing, setPlaying] = useState(false)
	const [played, setPlayed] = useState(0)
	const [volume, setVolume] = useState(0.8)
	const [playbackRate] = useState(1)
	const [duration, setDuration] = useState(0)
	const [subtitles] = useState(['English', 'Spanish', 'French', 'German'])
	const [activeSubtitle, setActiveSubtitle] = useState('English')
	const [activeTab, setActiveTab] = useState('materials')
	const [timestamp, setTimestamp] = useState('')

	const playerRef = useRef(null)
	const videoUrl = 'https://www.youtube.com/watch?v=wWgIAphfn2U'

	const timestamps = [
		{ time: 120, title: 'Introduction to Hooks', description: 'Overview of React Hooks' },
		{ time: 540, title: 'useState Deep Dive', description: 'Detailed explanation of useState' },
		{ time: 1200, title: 'useEffect Examples', description: 'Practical useEffect examples' },
		{ time: 1800, title: 'Custom Hooks', description: 'Creating custom hooks' },
		{ time: 2400, title: 'Performance Optimization', description: 'Optimizing with useMemo' },
	]

	const materials = [
		{ type: 'pdf', name: 'React Hooks Cheatsheet.pdf', size: '2.4 MB', pages: 12 },
		{ type: 'zip', name: 'Source Code.zip', size: '15.7 MB', files: 24 },
		{ type: 'doc', name: 'Assignment Instructions.docx', size: '1.2 MB' },
		{ type: 'ppt', name: 'Presentation Slides.pptx', size: '8.5 MB', slides: 45 },
	]

	const handlePlayPause = () => {
		setPlaying(!playing)
	}

	const handleProgress = (state) => {
		setPlayed(state.played)
		const currentTime = state.played * duration
		const found = timestamps.find((ts) => Math.abs(ts.time - currentTime) < 30)
		if (found) {
			setTimestamp(found.title)
		} else {
			setTimestamp('')
		}
	}

	const handleSeek = (value) => {
		setPlayed(parseFloat(value))
		if (playerRef.current) {
			playerRef.current.seekTo(parseFloat(value))
		}
	}

	const handleVolumeChange = (value) => {
		setVolume(parseFloat(value))
	}

	const formatTime = (seconds) => {
		const date = new Date(seconds * 1000)
		const hh = date.getUTCHours()
		const mm = date.getUTCMinutes()
		const ss = date.getUTCSeconds()

		if (hh) {
			return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
		}
		return `${mm}:${ss.toString().padStart(2, '0')}`
	}

	const handleTimestampClick = (time) => {
		if (playerRef.current) {
			playerRef.current.seekTo(time / duration)
		}
	}

	return (
		<div className={`${playerExpanded ? 'space-y-8' : 'grid grid-cols-1 lg:grid-cols-3 gap-8'}`}>
			<div className={`${playerExpanded ? 'lg:col-span-2' : 'lg:col-span-2'}`}>
				<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black rounded-2xl overflow-hidden shadow-2xl">
					<div className="relative pt-[56.25%]">
						<ReactPlayer ref={playerRef} url={videoUrl} playing={playing} volume={volume} playbackRate={playbackRate} onProgress={handleProgress} onDuration={setDuration} width="100%" height="100%" className="absolute top-0 left-0" controls={false} />
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
							<div className="mb-4">
								<input type="range" min={0} max={1} step="any" value={played} onChange={(e) => handleSeek(e.target.value)} className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${played * 100}%, #4b5563 ${played * 100}%, #4b5563 100%)` }} />
								<div className="flex justify-between text-sm text-white mt-2">
									<span>{formatTime(played * duration)}</span>
									<span>{formatTime(duration)}</span>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<button onClick={handlePlayPause} className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
										<i className={`fas ${playing ? 'fa-pause' : 'fa-play'} text-black text-lg`}></i>
									</button>

									<div className="flex items-center space-x-2">
										<i className="fas fa-volume-up text-white"></i>
										<input type="range" min={0} max={1} step="0.1" value={volume} onChange={(e) => handleVolumeChange(e.target.value)} className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
									</div>

									<div className="relative">
										<button className="px-3 py-1 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 cursor-pointer">{playbackRate}x</button>
									</div>
								</div>

								<div className="flex items-center space-x-4">
									<button className="text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer">
										<i className="fas fa-closed-captioning text-xl"></i>
									</button>
									<button className="text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer">
										<i className="fas fa-cog text-xl"></i>
									</button>
									<button className="text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer">
										<i className="fas fa-expand text-xl"></i>
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="p-6 bg-gray-900">
						<h2 className="text-xl font-bold text-white mb-2">Lesson 9: useMemo and useCallback</h2>
						<p className="text-gray-400">Learn how to optimize React performance with useMemo and useCallback hooks</p>
					</div>
				</motion.div>

				{timestamp && (
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white shadow-lg">
						<div className="flex items-center">
							<i className="fas fa-clock text-xl mr-3"></i>
							<div>
								<p className="font-semibold">Current Topic: {timestamp}</p>
								<p className="text-sm text-purple-200 mt-1">{timestamps.find((ts) => ts.title === timestamp)?.description}</p>
							</div>
						</div>
					</motion.div>
				)}
			</div>

			<div className="space-y-6">
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lesson Navigation</h3>
					<div className="space-y-3">
						{['Previous Lesson', 'Current Lesson', 'Next Lesson'].map((item, index) => (
							<button key={item} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-300 cursor-pointer ${index === 1 ? 'bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
								<div className="flex items-center">
									<div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${index === 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
										<i className={`fas ${index === 0 ? 'fa-chevron-left' : index === 1 ? 'fa-play' : 'fa-chevron-right'}`}></i>
									</div>
									<div className="text-left">
										<p className="font-medium text-gray-900 dark:text-white">{item}</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">{index === 0 ? 'Custom Hooks' : index === 1 ? 'useMemo & useCallback' : 'Advanced Hook Patterns'}</p>
									</div>
								</div>
								<span className="text-sm text-gray-500 dark:text-gray-400">45 min</span>
							</button>
						))}
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						<i className="fas fa-clock mr-2"></i>
						Video Timestamps
					</h3>
					<div className="space-y-3">
						{timestamps.map((ts, index) => (
							<button key={index} onClick={() => handleTimestampClick(ts.time)} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 group cursor-pointer">
								<div className="flex justify-between items-start">
									<div>
										<p className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">{ts.title}</p>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ts.description}</p>
									</div>
									<span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full whitespace-nowrap">{formatTime(ts.time)}</span>
								</div>
							</button>
						))}
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
						<button onClick={() => setActiveTab('materials')} className={`flex-1 py-2 text-center font-medium cursor-pointer ${activeTab === 'materials' ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' : 'text-gray-600 dark:text-gray-400'}`}>
							Materials
						</button>
						<button onClick={() => setActiveTab('subtitles')} className={`flex-1 py-2 text-center font-medium cursor-pointer ${activeTab === 'subtitles' ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' : 'text-gray-600 dark:text-gray-400'}`}>
							Subtitles
						</button>
					</div>

					{activeTab === 'materials' ? (
						<div className="space-y-3">
							{materials.map((material, index) => (
								<div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
									<div className="flex items-center">
										<div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${material.type === 'pdf' ? 'bg-red-100 dark:bg-red-900' : material.type === 'zip' ? 'bg-blue-100 dark:bg-blue-900' : material.type === 'doc' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
											<i className={`fas fa-file-${material.type === 'pdf' ? 'pdf' : material.type === 'zip' ? 'file-archive' : material.type === 'doc' ? 'file-word' : 'file-powerpoint'} ${material.type === 'pdf' ? 'text-red-600 dark:text-red-400' : material.type === 'zip' ? 'text-blue-600 dark:text-blue-400' : material.type === 'doc' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}></i>
										</div>
										<div>
											<p className="font-medium text-gray-900 dark:text-white">{material.name}</p>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{material.size} • {material.pages ? `${material.pages} pages` : material.files ? `${material.files} files` : ''}
											</p>
										</div>
									</div>
									<button className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
										<i className="fas fa-download"></i>
									</button>
								</div>
							))}
						</div>
					) : (
						<div className="space-y-3">
							{subtitles.map((sub, index) => (
								<button key={index} onClick={() => setActiveSubtitle(sub)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-300 cursor-pointer ${activeSubtitle === sub ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600'}`}>
									<div className="flex items-center">
										<i className="fas fa-closed-captioning mr-3"></i>
										<span>{sub} Subtitles</span>
									</div>
									{activeSubtitle === sub && <i className="fas fa-check-circle text-green-500"></i>}
								</button>
							))}
						</div>
					)}
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
					<h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
					<div className="space-y-3">
						<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
							<div className="flex items-center">
								<i className="fas fa-sticky-note mr-3"></i>
								<span>Take Notes</span>
							</div>
							<i className="fas fa-chevron-right"></i>
						</button>
						<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
							<div className="flex items-center">
								<i className="fas fa-question-circle mr-3"></i>
								<span>Ask Question</span>
							</div>
							<i className="fas fa-chevron-right"></i>
						</button>
						<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
							<div className="flex items-center">
								<i className="fas fa-bookmark mr-3"></i>
								<span>Bookmark</span>
							</div>
							<i className="fas fa-chevron-right"></i>
						</button>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default LessonPlayer