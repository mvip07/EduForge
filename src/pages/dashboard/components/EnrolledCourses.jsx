import React from 'react'
import { motion } from 'framer-motion'
import CourseCard from '../../../components/UI/CourseCard'

const EnrolledCourses = () => {
	const courses = [
		{
			id: 1,
			title: 'Advanced React & Next.js',
			instructor: 'Sarah Johnson',
			progress: 75,
			thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
			category: 'Web Development',
			duration: '8 weeks',
			modules: 12,
			nextLesson: 'State Management with Redux',
			nextLessonTime: 'Tomorrow, 10:00 AM',
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
			nextLesson: 'Building REST APIs',
			nextLessonTime: 'Today, 3:00 PM',
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
			nextLesson: 'Prototyping with Figma',
			nextLessonTime: 'Completed',
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
			nextLesson: 'Linear Regression Models',
			nextLessonTime: 'Friday, 11:00 AM',
		},
	]

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
			<div className="p-6 border-b border-gray-200 dark:border-gray-700">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">Enrolled Courses</h2>
						<p className="text-gray-600 dark:text-gray-400 mt-1">Continue where you left off</p>
					</div>
					<button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center">
						View All
						<i className="fas fa-arrow-right ml-2"></i>
					</button>
				</div>
			</div>

			<div className="divide-y divide-gray-200 dark:divide-gray-700">
				{courses.map((course, index) => (
					<motion.div key={course.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }}>
						<CourseCard {...course} />
					</motion.div>
				))}
			</div>
		</motion.div>
	)
}

export default EnrolledCourses
