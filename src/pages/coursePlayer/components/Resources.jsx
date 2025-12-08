import { useState } from 'react'
import { motion } from 'framer-motion'
import { getTypeColor, getTypeIcon } from '../utils/getType'

const Resources = () => {
	const [resources] = useState([
		{
			id: 1,
			title: 'React Hooks Cheatsheet',
			description: 'Complete reference for all React Hooks with examples',
			type: 'pdf',
			size: '2.4 MB',
			downloads: 1245,
			date: '2024-03-10',
			category: 'Reference',
			tags: ['hooks', 'cheatsheet', 'reference'],
		},
		{
			id: 2,
			title: 'Complete Course Source Code',
			description: 'All code examples and projects from the course',
			type: 'zip',
			size: '45.2 MB',
			downloads: 876,
			date: '2024-03-09',
			category: 'Code',
			tags: ['source-code', 'projects', 'examples'],
		},
		{
			id: 3,
			title: 'Next.js Project Template',
			description: 'Starter template with TypeScript, Tailwind, and best practices',
			type: 'github',
			size: 'GitHub',
			downloads: 1567,
			date: '2024-03-08',
			category: 'Template',
			tags: ['template', 'nextjs', 'typescript'],
		},
		{
			id: 4,
			title: 'Performance Optimization Guide',
			description: 'Comprehensive guide to React performance optimization',
			type: 'doc',
			size: '3.1 MB',
			downloads: 654,
			date: '2024-03-07',
			category: 'Guide',
			tags: ['performance', 'optimization', 'guide'],
		},
		{
			id: 5,
			title: 'React Interview Questions',
			description: '100+ React interview questions with detailed answers',
			type: 'pdf',
			size: '5.8 MB',
			downloads: 2345,
			date: '2024-03-06',
			category: 'Interview',
			tags: ['interview', 'questions', 'preparation'],
		},
		{
			id: 6,
			title: 'Course Presentation Slides',
			description: 'All presentation slides from the course lectures',
			type: 'ppt',
			size: '12.7 MB',
			downloads: 543,
			date: '2024-03-05',
			category: 'Slides',
			tags: ['slides', 'presentation', 'lecture'],
		},
		{
			id: 7,
			title: 'API Documentation',
			description: 'Complete API reference for all endpoints used in the course',
			type: 'json',
			size: '1.2 MB',
			downloads: 432,
			date: '2024-03-04',
			category: 'Documentation',
			tags: ['api', 'documentation', 'reference'],
		},
		{
			id: 8,
			title: 'Additional Reading Materials',
			description: 'Curated list of articles, books, and resources',
			type: 'link',
			size: 'External',
			downloads: 789,
			date: '2024-03-03',
			category: 'Reading',
			tags: ['articles', 'books', 'resources'],
		},
	])

	const [activeCategory, setActiveCategory] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState('date')

	const categories = ['all', 'Reference', 'Code', 'Template', 'Guide', 'Interview', 'Slides', 'Documentation', 'Reading']
	const allTags = Array.from(new Set(resources.flatMap((r) => r.tags)))

	const filteredResources = resources
		.filter((resource) => {
			if (activeCategory !== 'all' && resource.category !== activeCategory) return false
			if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
			return true
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'name':
					return a.title.localeCompare(b.title)
				case 'size':
					return parseInt(b.size) - parseInt(a.size)
				case 'downloads':
					return b.downloads - a.downloads
				default:
					return new Date(b.date) - new Date(a.date)
			}
		})



	const handleDownload = (resource) => {
		alert(`Downloading ${resource.title}...`)
	}

	return (
		<div className="space-y-8">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						<i className="fas fa-folder-open text-purple-500 mr-3"></i>
						Course Resources
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">Download additional materials, code examples, and reference documents</p>
				</div>
				<div className="flex items-center space-x-4">
					<div className="text-right">
						<div className="text-lg font-bold text-gray-900 dark:text-white">{resources.length}</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Total Resources</div>
					</div>
					<div className="w-2 h-12 bg-gray-300 dark:bg-gray-600"></div>
					<div className="text-right">
						<div className="text-lg font-bold text-gray-900 dark:text-white">8.2 GB</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Total Size</div>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div className="flex-1">
						<div className="relative">
							<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search resources..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
							<i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<span className="text-sm text-gray-700 dark:text-gray-300">Sort by:</span>
						<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
							<option value="date">Date Added</option>
							<option value="name">Name</option>
							<option value="size">Size</option>
							<option value="downloads">Downloads</option>
						</select>
					</div>
				</div>

				<div className="mt-6">
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by Category</label>
					<div className="flex flex-wrap gap-2">
						{categories.map((category) => (
							<button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer ${activeCategory === category ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
								{category === 'all' ? 'All Categories' : category}
							</button>
						))}
					</div>
				</div>

				<div className="mt-6">
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Popular Tags</label>
					<div className="flex flex-wrap gap-2">
						{allTags.map((tag) => (
							<button key={tag} className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								#{tag}
							</button>
						))}
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredResources.map((resource, index) => (
					<motion.div key={resource.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
						<div className="p-6">
							<div className="flex items-start justify-between mb-4">
								<div className={`w-12 h-12 rounded-xl ${getTypeColor(resource.type)} flex items-center justify-center`}>
									<i className={`${getTypeIcon(resource.type)} text-xl`}></i>
								</div>
								<span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">{resource.category}</span>
							</div>

							<h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{resource.title}</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{resource.description}</p>

							<div className="flex flex-wrap gap-2 mb-4">
								{resource.tags.slice(0, 2).map((tag) => (
									<span key={tag} className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
										#{tag}
									</span>
								))}
								{resource.tags.length > 2 && <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded">+{resource.tags.length - 2}</span>}
							</div>

							<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
								<div className="flex items-center">
									<i className="fas fa-download mr-2"></i>
									{resource.downloads.toLocaleString()}
								</div>
								<div className="flex items-center">
									<i className="fas fa-hdd mr-2"></i>
									{resource.size}
								</div>
							</div>
						</div>

						<div className="px-6 pb-6">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600 dark:text-gray-400">Added {resource.date}</span>
								<button onClick={() => handleDownload(resource)} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium cursor-pointer">
									<i className="fas fa-download mr-2"></i>
									Download
								</button>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
					<h3 className="text-xl font-bold mb-6">
						<i className="fas fa-chart-bar mr-2"></i>
						Download Statistics
					</h3>
					<div className="space-y-4">
						{resources.slice(0, 3).map((resource) => (
							<div key={resource.id} className="flex items-center justify-between">
								<div className="flex items-center">
									<i className={`${getTypeIcon(resource.type)} mr-3`}></i>
									<span className="truncate max-w-xs">{resource.title}</span>
								</div>
								<div className="flex items-center">
									<span className="mr-4">{resource.downloads.toLocaleString()} downloads</span>
									<div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
										<div className="h-full bg-white rounded-full" style={{ width: `${(resource.downloads / 2500) * 100}%` }}></div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-6 pt-6 border-t border-white/20">
						<div className="flex justify-between">
							<span>Total Downloads:</span>
							<span className="font-bold">{resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}</span>
						</div>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Resource Types</h3>
					<div className="space-y-4">
						{[
							{ type: 'PDF Documents', count: 2, icon: 'fas fa-file-pdf', color: 'text-red-500' },
							{ type: 'Code Archives', count: 1, icon: 'fas fa-file-archive', color: 'text-blue-500' },
							{ type: 'GitHub Repositories', count: 1, icon: 'fab fa-github', color: 'text-gray-800 dark:text-gray-300' },
							{ type: 'Documentation', count: 2, icon: 'fas fa-file-alt', color: 'text-green-500' },
							{ type: 'External Links', count: 1, icon: 'fas fa-external-link-alt', color: 'text-purple-500' },
							{ type: 'Other Files', count: 1, icon: 'fas fa-file', color: 'text-gray-500' },
						].map((item) => (
							<div key={item.type} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
								<div className="flex items-center">
									<i className={`${item.icon} ${item.color} mr-3 text-lg`}></i>
									<span className="font-medium text-gray-900 dark:text-white">{item.type}</span>
								</div>
								<span className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">{item.count} files</span>
							</div>
						))}
					</div>
				</motion.div>
			</div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h3 className="text-xl font-bold mb-2">Download All Resources</h3>
						<p className="text-green-100">Get all course materials in one convenient package</p>
						<div className="mt-4 flex items-center">
							<i className="fas fa-hdd mr-3 text-2xl"></i>
							<div>
								<div className="text-2xl font-bold">8.2 GB</div>
								<div className="text-sm text-green-200">Total size</div>
							</div>
						</div>
					</div>
					<div className="mt-6 md:mt-0">
						<button className="px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:-translate-y-0.5 cursor-pointer">
							<i className="fas fa-download mr-2"></i>
							Download All ({resources.length} files)
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default Resources