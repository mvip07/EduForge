import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CourseFilter = ({ filters, onFilterChange, activeTab, courses }) => {
	const [filterOpen, setFilterOpen] = useState(false)

	const categories = ['all', ...new Set(courses.map((c) => c.category))]
	const instructors = ['all', ...new Set(courses.map((c) => c.instructor))]

	const progressOptions = [
		{ value: 'all', label: 'All Progress' },
		{ value: 'not-started', label: 'Not Started' },
		{ value: 'beginner', label: 'Beginner (1-30%)' },
		{ value: 'intermediate', label: 'Intermediate (31-70%)' },
		{ value: 'advanced', label: 'Advanced (71-99%)' },
		{ value: 'completed', label: 'Completed' },
	]

	const sortOptions = [
		{ value: 'recent', label: 'Recently Accessed' },
		{ value: 'progress', label: 'Progress' },
		{ value: 'title', label: 'Title' },
		{ value: 'rating', label: 'Rating' },
	]

	const getFilteredCount = (type, value) => {
		return courses.filter((course) => {
			if (activeTab === 'myCourses' && !course.enrolled) return false
			if (activeTab === 'continue' && (!course.enrolled || !course.lastAccessed)) return false
			if (activeTab === 'saved' && !course.saved) return false

			if (type === 'category' && value !== 'all') return course.category === value
			if (type === 'instructor' && value !== 'all') return course.instructor === value
			if (type === 'progress' && value !== 'all') {
				const progress = course.progress
				switch (value) {
					case 'not-started':
						return progress === 0
					case 'beginner':
						return progress > 0 && progress <= 30
					case 'intermediate':
						return progress > 30 && progress <= 70
					case 'advanced':
						return progress > 70 && progress < 100
					case 'completed':
						return progress === 100
					default:
						return true
				}
			}
			return true
		}).length
	}

	return (
		<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<button onClick={() => setFilterOpen(!filterOpen)} className="lg:hidden flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
					<i className="fas fa-filter mr-2"></i>
					Filters
					{filterOpen ? <i className="fas fa-chevron-up ml-2"></i> : <i className="fas fa-chevron-down ml-2"></i>}
				</button>

				<div className="hidden lg:flex items-center gap-4 flex-wrap">
					<div className="relative">
						<select value={filters.category} onChange={(e) => onFilterChange({ category: e.target.value })} className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">
							{categories.map((category) => (
								<option key={category} value={category}>
									{category === 'all' ? 'All Categories' : category}
									{category !== 'all' && ` (${getFilteredCount('category', category)})`}
								</option>
							))}
						</select>
						<i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
					</div>

					<div className="relative">
						<select value={filters.progress} onChange={(e) => onFilterChange({ progress: e.target.value })} className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">
							{progressOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
									{option.value !== 'all' && ` (${getFilteredCount('progress', option.value)})`}
								</option>
							))}
						</select>
						<i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
					</div>

					<div className="relative">
						<select value={filters.instructor} onChange={(e) => onFilterChange({ instructor: e.target.value })} className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">
							{instructors.map((instructor) => (
								<option key={instructor} value={instructor}>
									{instructor === 'all' ? 'All Instructors' : instructor}
									{instructor !== 'all' && ` (${getFilteredCount('instructor', instructor)})`}
								</option>
							))}
						</select>
						<i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
					</div>
				</div>

				<div className="relative">
					<select value={filters.sortBy} onChange={(e) => onFilterChange({ sortBy: e.target.value })} className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">
						{sortOptions.map((option) => (
							<option key={option.value} value={option.value}>
								Sort by: {option.label}
							</option>
						))}
					</select>
					<i className="fas fa-sort absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
				</div>
			</div>

			<AnimatePresence>
				{filterOpen && (
					<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden mt-4 overflow-hidden">
						<div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
								<div className="flex flex-wrap gap-2">
									{categories.map((category) => (
										<button key={category} onClick={() => onFilterChange({ category })} className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${filters.category === category ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
											{category === 'all' ? 'All' : category}
											<span className="ml-1 text-xs opacity-75">({getFilteredCount('category', category)})</span>
										</button>
									))}
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Progress</label>
								<div className="flex flex-wrap gap-2">
									{progressOptions.map((option) => (
										<button key={option.value} onClick={() => onFilterChange({ progress: option.value })} className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${filters.progress === option.value ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
											{option.label}
											<span className="ml-1 text-xs opacity-75">({getFilteredCount('progress', option.value)})</span>
										</button>
									))}
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instructor</label>
								<div className="flex flex-wrap gap-2">
									{instructors.map((instructor) => (
										<button key={instructor} onClick={() => onFilterChange({ instructor })} className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${filters.instructor === instructor ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
											{instructor === 'all' ? 'All' : instructor}
											<span className="ml-1 text-xs opacity-75">({getFilteredCount('instructor', instructor)})</span>
										</button>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default CourseFilter