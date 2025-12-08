import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import CoursePlayerSidebar from './components/CoursePlayerSidebar'
import CoursePlayerHeader from './components/CoursePlayerHeader'
import MainLayout from '../../components/layout/MainLayout'

const CoursePlayerLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [playerExpanded, setPlayerExpanded] = useState(false)
	const [activeTab, setActiveTab] = useState('overview')
	const { courseId } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const course = {
		id: courseId,
		title: 'Advanced React & Next.js',
		instructor: {
			name: 'Sarah Johnson',
			title: 'Senior Frontend Engineer at Google',
			avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
			rating: 4.9,
			students: 12500,
			courses: 8,
		},
		description: 'Master modern React development with Next.js, TypeScript, and advanced patterns used by top tech companies.',
		category: 'Web Development',
		level: 'Advanced',
		duration: '8 weeks',
		modules: 12,
		totalLessons: 48,
		price: 89.99,
		enrolled: 2456,
		rating: 4.8,
		reviews: 342,
		thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		progress: 75,
		lastAccessed: '2024-03-10T14:30:00',
	}

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: 'fas fa-info-circle' },
		{ id: 'player', label: 'Lessons', icon: 'fas fa-play-circle' },
		{ id: 'notes', label: 'Notes', icon: 'fas fa-sticky-note' },
		{ id: 'assignments', label: 'Assignments', icon: 'fas fa-tasks' },
		{ id: 'quizzes', label: 'Quizzes', icon: 'fas fa-question-circle' },
		{ id: 'discussions', label: 'Discussions', icon: 'fas fa-comments' },
		{ id: 'resources', label: 'Resources', icon: 'fas fa-folder-open' },
	]

	useEffect(() => {
		const path = location.pathname.split('/').pop()
		if (tabs.some((tab) => tab.id === path)) {
			setActiveTab(path)
		}
	}, [location.pathname])

	const handleTabClick = (tabId) => {
		setActiveTab(tabId)
		navigate(`/courses/${courseId}/${tabId}`)
	}

	return (
		<MainLayout className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
			<AnimatePresence>{sidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 backdrop-blur-md bg-white/30 lg:hidden" />}</AnimatePresence>

			<CoursePlayerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} course={course} activeTab={activeTab} onTabClick={handleTabClick} />

			<CoursePlayerHeader isOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(true)} onExpandToggle={() => setPlayerExpanded(!playerExpanded)} />

			<AnimatePresence mode="wait">
				<motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="mt-6">
					{React.cloneElement(children, {
						course,
						playerExpanded,
						onTabChange: handleTabClick,
					})}
				</motion.div>
			</AnimatePresence>
		</MainLayout>
	)
}

export default CoursePlayerLayout
