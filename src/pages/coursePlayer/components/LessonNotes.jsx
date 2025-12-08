import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LessonNotes = ({ course }) => {
	const [notes, setNotes] = useState([
		{
			id: 1,
			lessonId: 5,
			lessonTitle: 'useState and useEffect',
			content: 'Important: useState returns an array with current state and setter function. useEffect runs after every render by default.',
			tags: ['hooks', 'basics'],
			timestamp: '12:45',
			date: '2024-03-08',
			color: 'purple',
		},
		{
			id: 2,
			lessonId: 6,
			lessonTitle: 'Custom Hooks',
			content: 'Custom hooks start with "use". They can call other hooks. Great for sharing logic between components.',
			tags: ['custom-hooks', 'best-practices'],
			timestamp: '08:30',
			date: '2024-03-09',
			color: 'blue',
		},
		{
			id: 3,
			lessonId: 7,
			lessonTitle: 'useContext and useReducer',
			content: 'useContext provides global state. useReducer is for complex state logic. They work well together!',
			tags: ['state-management', 'context'],
			timestamp: '15:20',
			date: '2024-03-10',
			color: 'green',
		},
		{
			id: 4,
			lessonId: 11,
			lessonTitle: 'Introduction to Next.js',
			content: 'Next.js provides SSR, SSG, ISR. File-based routing in pages directory. Built-in API routes.',
			tags: ['nextjs', 'ssr'],
			timestamp: '10:15',
			date: '2024-03-11',
			color: 'yellow',
		},
	])

	const [newNote, setNewNote] = useState({
		content: '',
		tags: [],
		color: 'purple',
	})
	const [activeFilter, setActiveFilter] = useState('all')
	const [editingNoteId, setEditingNoteId] = useState(null)
	const [tagInput, setTagInput] = useState('')

	const colors = [
		{ id: 'purple', name: 'Purple', class: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700' },
		{ id: 'blue', name: 'Blue', class: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' },
		{ id: 'green', name: 'Green', class: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' },
		{ id: 'yellow', name: 'Yellow', class: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700' },
		{ id: 'pink', name: 'Pink', class: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700' },
	]

	const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)))

	const filteredNotes = activeFilter === 'all' ? notes : notes.filter((note) => note.tags.includes(activeFilter) || note.color === activeFilter)

	const handleAddNote = () => {
		if (!newNote.content.trim()) return

		const note = {
			id: notes.length + 1,
			lessonId: 9, // Current lesson
			lessonTitle: 'useMemo and useCallback',
			content: newNote.content,
			tags: newNote.tags,
			timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			date: new Date().toISOString().split('T')[0],
			color: newNote.color,
		}

		setNotes([note, ...notes])
		setNewNote({ content: '', tags: [], color: 'purple' })
	}

	const handleDeleteNote = (id) => {
		setNotes(notes.filter((note) => note.id !== id))
	}

	const handleAddTag = () => {
		if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
			setNewNote({ ...newNote, tags: [...newNote.tags, tagInput.trim()] })
			setTagInput('')
		}
	}

	const handleRemoveTag = (tagToRemove) => {
		setNewNote({ ...newNote, tags: newNote.tags.filter((tag) => tag !== tagToRemove) })
	}

	const handleEditNote = (note) => {
		setEditingNoteId(note.id)
		setNewNote({ content: note.content, tags: note.tags, color: note.color })
	}

	const handleUpdateNote = () => {
		if (!newNote.content.trim()) return

		setNotes(notes.map((note) => (note.id === editingNoteId ? { ...note, content: newNote.content, tags: newNote.tags, color: newNote.color } : note)))

		setEditingNoteId(null)
		setNewNote({ content: '', tags: [], color: 'purple' })
	}

	return (
		<div className="space-y-8">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						<i className="fas fa-sticky-note text-purple-500 mr-3"></i>
						Lesson Notes
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">Your personal notes and key takeaways from each lesson</p>
				</div>
				<div className="flex items-center space-x-4">
					<span className="text-gray-600 dark:text-gray-400">
						{notes.length} notes • {allTags.length} tags
					</span>
					<button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
						<i className="fas fa-download mr-2"></i>
						Export Notes
					</button>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{editingNoteId ? 'Edit Note' : 'Add New Note'}</h2>

						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Note Color</label>
							<div className="flex space-x-3">
								{colors.map((color) => (
									<button key={color.id} onClick={() => setNewNote({ ...newNote, color: color.id })} className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 cursor-pointer ${newNote.color === color.id ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent hover:scale-105'} ${color.class}`} title={color.name} />
								))}
							</div>
						</div>

						<div className="mb-6">
							<textarea value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} placeholder="Type your notes here... You can use markdown formatting!" className="w-full h-48 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" rows={6} />
							<div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
								<i className="fas fa-info-circle mr-1"></i>
								Supports markdown: **bold**, *italic*, `code`, [links](url)
							</div>
						</div>

						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tags</label>
							<div className="flex flex-wrap gap-2 mb-3">
								{newNote.tags.map((tag) => (
									<span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
										#{tag}
										<button onClick={() => handleRemoveTag(tag)} className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 cursor-pointer">
											<i className="fas fa-times"></i>
										</button>
									</span>
								))}
							</div>
							<div className="flex">
								<input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTag()} placeholder="Add a tag and press Enter" className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
								<button onClick={handleAddTag} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									Add
								</button>
							</div>
						</div>

						<div className="flex justify-end space-x-3">
							{editingNoteId && (
								<button
									onClick={() => {
										setEditingNoteId(null)
										setNewNote({ content: '', tags: [], color: 'purple' })
									}}
									className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
								>
									Cancel
								</button>
							)}
							<button onClick={editingNoteId ? handleUpdateNote : handleAddNote} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
								<i className={`fas ${editingNoteId ? 'fa-save' : 'fa-plus'} mr-2`}></i>
								{editingNoteId ? 'Update Note' : 'Add Note'}
							</button>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white text-center">
								<div className="text-3xl font-bold mb-2">{notes.length}</div>
								<div className="text-purple-200">Total Notes</div>
							</div>
							<div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white text-center">
								<div className="text-3xl font-bold mb-2">{allTags.length}</div>
								<div className="text-blue-200">Unique Tags</div>
							</div>
							<div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
								<div className="text-3xl font-bold mb-2">9/48</div>
								<div className="text-green-200">Lessons with Notes</div>
							</div>
						</div>
					</motion.div>
				</div>

				<div className="space-y-6">
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Notes</h3>

						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">By Color</label>
							<div className="flex flex-wrap gap-2">
								<button onClick={() => setActiveFilter('all')} className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${activeFilter === 'all' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
									All Colors
								</button>
								{colors.map((color) => (
									<button key={color.id} onClick={() => setActiveFilter(color.id)} className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${activeFilter === color.id ? `${color.class} border` : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
										{color.name}
									</button>
								))}
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">By Tag</label>
							<div className="flex flex-wrap gap-2">
								<button onClick={() => setActiveFilter('all')} className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${activeFilter === 'all' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
									All Tags
								</button>
								{allTags.map((tag) => (
									<button key={tag} onClick={() => setActiveFilter(tag)} className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${activeFilter === tag ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
										#{tag}
									</button>
								))}
							</div>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Notes</h3>
							<span className="text-sm text-gray-600 dark:text-gray-400">{filteredNotes.length} found</span>
						</div>

						<div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
							<AnimatePresence>
								{filteredNotes.map((note) => (
									<motion.div key={note.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className={`p-4 rounded-xl border ${colors.find((c) => c.id === note.color)?.class}`}>
										<div className="flex justify-between items-start mb-3">
											<div>
												<h4 className="font-semibold text-gray-900 dark:text-white">{note.lessonTitle}</h4>
												<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
													<i className="fas fa-clock mr-1"></i>
													{note.timestamp} • {note.date}
												</p>
											</div>
											<div className="flex space-x-2">
												<button onClick={() => handleEditNote(note)} className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer" title="Edit">
													<i className="fas fa-edit"></i>
												</button>
												<button onClick={() => handleDeleteNote(note.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer" title="Delete">
													<i className="fas fa-trash"></i>
												</button>
											</div>
										</div>
										<p className="text-gray-700 dark:text-gray-300 mb-3">{note.content}</p>
										<div className="flex flex-wrap gap-2">
											{note.tags.map((tag) => (
												<span key={tag} className="inline-block px-2 py-1 text-xs font-medium bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded">
													#{tag}
												</span>
											))}
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="text-lg font-semibold mb-3">
							<i className="fas fa-lightbulb mr-2"></i>
							Note-taking Tips
						</h3>
						<ul className="space-y-2 text-sm">
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-2"></i>
								Use your own words to summarize concepts
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-2"></i>
								Add code snippets with proper formatting
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-2"></i>
								Tag notes for easy searching later
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-2"></i>
								Review notes before starting new lessons
							</li>
						</ul>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default LessonNotes