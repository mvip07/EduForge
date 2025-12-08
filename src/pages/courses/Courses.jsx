import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CourseFilter from './components/CourseFilter'
import SavedCourses from './components/SavedCourses'
import MyCoursesGrid from './components/MyCoursesGrid'
import ContinueLearning from './components/ContinueLearning'
import MainLayout from '../../components/layout/MainLayout'

const Courses = () => {
	const [activeTab, setActiveTab] = useState('myCourses')
	const [searchQuery, setSearchQuery] = useState('')
	const [filters, setFilters] = useState({
		category: 'all',
		progress: 'all',
		instructor: 'all',
		sortBy: 'recent',
	})

	const tabs = [
		{ id: 'myCourses', label: 'My Courses', icon: 'fas fa-book', count: 12 },
		{ id: 'continue', label: 'Continue Learning', icon: 'fas fa-play-circle', count: 5 },
		{ id: 'saved', label: 'Saved Courses', icon: 'fas fa-heart', count: 8 },
	]

	const allCourses = [
		{
			id: 1,
			title: 'Advanced React & Next.js',
			instructor: 'Sarah Johnson',
			progress: 75,
			thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'Web Development',
			duration: '8 weeks',
			modules: 12,
			price: 89.99,
			enrolled: true,
			saved: false,
			lastAccessed: '2024-03-10T14:30:00',
			rating: 4.8,
			students: 1245,
		},
		{
			id: 2,
			title: 'Full Stack JavaScript',
			instructor: 'Michael Chen',
			progress: 45,
			thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'Full Stack',
			duration: '12 weeks',
			modules: 16,
			price: 99.99,
			enrolled: true,
			saved: false,
			lastAccessed: '2024-03-12T10:15:00',
			rating: 4.7,
			students: 987,
		},
		{
			id: 3,
			title: 'UI/UX Design Masterclass',
			instructor: 'Emma Wilson',
			progress: 90,
			thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'Design',
			duration: '6 weeks',
			modules: 8,
			price: 79.99,
			enrolled: true,
			saved: true,
			lastAccessed: '2024-03-11T16:45:00',
			rating: 4.9,
			students: 1567,
		},
		{
			id: 4,
			title: 'Machine Learning Fundamentals',
			instructor: 'Dr. Alex Rodriguez',
			progress: 30,
			thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'Data Science',
			duration: '10 weeks',
			modules: 14,
			price: 119.99,
			enrolled: true,
			saved: false,
			lastAccessed: '2024-03-09T09:20:00',
			rating: 4.6,
			students: 2345,
		},
		{
			id: 5,
			title: 'Mobile App Development with Flutter',
			instructor: 'Robert Garcia',
			progress: 0,
			thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'Mobile',
			duration: '9 weeks',
			modules: 11,
			price: 94.99,
			enrolled: true,
			saved: true,
			lastAccessed: null,
			rating: 4.8,
			students: 876,
		},
		{
			id: 6,
			title: 'DevOps & CI/CD Pipeline',
			instructor: 'Lisa Wang',
			progress: 60,
			thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'DevOps',
			duration: '7 weeks',
			modules: 10,
			price: 109.99,
			enrolled: true,
			saved: false,
			lastAccessed: '2024-03-08T11:30:00',
			rating: 4.7,
			students: 654,
		},
		{
			id: 7,
			title: 'Advanced TypeScript',
			instructor: 'David Miller',
			progress: 0,
			thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'Programming',
			duration: '5 weeks',
			modules: 7,
			price: 69.99,
			enrolled: false,
			saved: true,
			lastAccessed: null,
			rating: 4.9,
			students: 3456,
		},
		{
			id: 8,
			title: 'Cloud Computing with AWS',
			instructor: 'Lisa Wang',
			progress: 0,
			thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'Cloud',
			duration: '10 weeks',
			modules: 13,
			price: 129.99,
			enrolled: false,
			saved: true,
			lastAccessed: null,
			rating: 4.8,
			students: 4321,
		},
	]

	const filteredCourses = allCourses.filter((course) => {
		// Search filter
		if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())) {
			return false
		}

		// Category filter
		if (filters.category !== 'all' && course.category !== filters.category) {
			return false
		}

		// Instructor filter
		if (filters.instructor !== 'all' && course.instructor !== filters.instructor) {
			return false
		}

		// Progress filter
		if (filters.progress !== 'all') {
			const progress = course.progress
			switch (filters.progress) {
				case 'not-started':
					if (progress > 0) return false
					break
				case 'beginner':
					if (progress <= 0 || progress > 30) return false
					break
				case 'intermediate':
					if (progress <= 30 || progress > 70) return false
					break
				case 'advanced':
					if (progress <= 70) return false
					break
				case 'completed':
					if (progress < 100) return false
					break
			}
		}

		// Based on active tab
		switch (activeTab) {
			case 'myCourses':
				return course.enrolled
			case 'continue':
				return course.enrolled && course.lastAccessed && course.progress < 100
			case 'saved':
				return course.saved
			default:
				return true
		}
	})

	const sortedCourses = [...filteredCourses].sort((a, b) => {
		switch (filters.sortBy) {
			case 'recent':
				return new Date(b.lastAccessed || 0) - new Date(a.lastAccessed || 0)
			case 'progress':
				return b.progress - a.progress
			case 'title':
				return a.title.localeCompare(b.title)
			case 'rating':
				return b.rating - a.rating
			default:
				return 0
		}
	})

	const handleFilterChange = (newFilters) => {
		setFilters((prev) => ({ ...prev, ...newFilters }))
	}

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Manage and continue your learning journey</p>
					</div>
					<div className="mt-4 sm:mt-0">
						<div className="relative">
							<input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
							<i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
				<div className="border-b border-gray-200 dark:border-gray-700">
					<nav className="-mb-px flex space-x-8 overflow-x-auto">
						{tabs.map((tab) => (
							<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${activeTab === tab.id ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'} `}>
								<i className={`${tab.icon} mr-2`}></i>
								{tab.label}
								<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">{tab.count}</span>
							</button>
						))}
					</nav>
				</div>
			</motion.div>

			<CourseFilter filters={filters} onFilterChange={handleFilterChange} activeTab={activeTab} courses={allCourses} />

			<AnimatePresence mode="wait">
				<motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
					{activeTab === 'myCourses' && <MyCoursesGrid courses={sortedCourses} filters={filters} searchQuery={searchQuery} />}

					{activeTab === 'continue' && <ContinueLearning courses={sortedCourses} />}

					{activeTab === 'saved' && <SavedCourses courses={sortedCourses} />}
				</motion.div>
			</AnimatePresence>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm opacity-90">Total Learning Hours</p>
							<p className="text-2xl font-bold mt-1">148 hours</p>
						</div>
						<i className="fas fa-clock text-3xl opacity-80"></i>
					</div>
					<div className="mt-4 text-sm opacity-90">
						<i className="fas fa-arrow-up mr-1"></i>
						12% increase this month
					</div>
				</div>

				<div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm opacity-90">Course Completion Rate</p>
							<p className="text-2xl font-bold mt-1">68%</p>
						</div>
						<i className="fas fa-trophy text-3xl opacity-80"></i>
					</div>
					<div className="mt-4 text-sm opacity-90">3 courses completed this month</div>
				</div>

				<div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm opacity-90">Average Score</p>
							<p className="text-2xl font-bold mt-1">92%</p>
						</div>
						<i className="fas fa-chart-line text-3xl opacity-80"></i>
					</div>
					<div className="mt-4 text-sm opacity-90">Top 15% of all students</div>
				</div>
			</motion.div>
		</MainLayout>
	)
}

export default Courses
