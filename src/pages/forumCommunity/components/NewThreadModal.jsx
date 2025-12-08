import { useState } from 'react'
import { motion } from 'framer-motion'

const NewThreadModal = ({ onClose, onSubmit, categories }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('web-dev')
	const [tags, setTags] = useState([])
	const [tagInput, setTagInput] = useState('')

	const handleSubmit = () => {
		if (!title.trim() || !content.trim()) {
			alert('Please fill in all required fields')
			return
		}

		onSubmit({
			title,
			content,
			category: selectedCategory,
			tags,
			author: {
				name: 'You',
				avatar: 'U',
				role: 'Student',
				verified: false,
			},
		})
	}

	const handleAddTag = () => {
		if (tagInput.trim() && !tags.includes(tagInput.trim())) {
			setTags([...tags, tagInput.trim()])
			setTagInput('')
		}
	}

	const handleRemoveTag = (tagToRemove) => {
		setTags(tags.filter((tag) => tag !== tagToRemove))
	}

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Thread</h2>
						<button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-times text-xl"></i>
						</button>
					</div>
				</div>

				<div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
					<div className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thread Title *</label>
							<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What would you like to discuss?" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Category</label>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
								{categories.slice(0, 8).map((category) => (
									<button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-300 cursor-pointer ${selectedCategory === category.id ? `border-${category.color.split('-')[1]}-500 bg-gradient-to-r ${category.color} bg-opacity-10` : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500'}`}>
										<i className={`${category.icon} text-lg mb-2 ${selectedCategory === category.id ? `text-${category.color.split('-')[1]}-600 dark:text-${category.color.split('-')[1]}-400` : 'text-gray-500'}`}></i>
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
									</button>
								))}
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content *</label>
							<textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder="Describe your question or topic in detail..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" />
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (Optional)</label>
							<div className="flex items-center mb-3">
								<input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTag()} placeholder="Add a tag and press Enter" className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
								<button onClick={handleAddTag} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-r-lg cursor-pointer">
									<i className="fas fa-plus"></i>
								</button>
							</div>
							<div className="flex flex-wrap gap-2">
								{tags.map((tag, index) => (
									<span key={index} className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
										{tag}
										<button onClick={() => handleRemoveTag(tag)} className="ml-2 text-purple-500 hover:text-purple-700 cursor-pointer">
											<i className="fas fa-times"></i>
										</button>
									</span>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
					<div className="flex justify-between items-center">
						<div className="text-sm text-gray-600 dark:text-gray-400">
							<i className="fas fa-info-circle mr-2"></i>
							Be specific and provide details for better responses
						</div>
						<div className="flex space-x-3">
							<button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								Cancel
							</button>
							<button onClick={handleSubmit} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
								<i className="fas fa-paper-plane mr-2"></i>
								Post Thread
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default NewThreadModal
