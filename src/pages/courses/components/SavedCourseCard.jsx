import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SavedCourseCard = ({ title, instructor, thumbnail, category, duration, price, rating, students, enrolled }) => {
	const [isSaved, setIsSaved] = useState(true)

	const handleSaveToggle = () => {
		setIsSaved(!isSaved)
	}

	const handleEnroll = () => {
		if (!enrolled) {
			alert(`Enrolling in ${title}`)
		}
	}

	return (
		<motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className="relative h-48 overflow-hidden">
				<img src={thumbnail} alt={title} className="w-full h-full object-cover" />
				<div className="absolute top-3 left-3">
					<span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full">{category}</span>
				</div>
				<button onClick={handleSaveToggle} className="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
					<i className={`fas fa-heart ${isSaved ? 'text-red-500' : 'text-gray-400'}`}></i>
				</button>
				{enrolled && (
					<div className="absolute bottom-3 left-3">
						<span className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
							<i className="fas fa-check mr-1"></i>
							Enrolled
						</span>
					</div>
				)}
			</div>

			<div className="p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{title}</h3>
				<p className="text-gray-600 dark:text-gray-400 mb-4">by {instructor}</p>

				<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
					<div className="flex items-center">
						<i className="fas fa-star text-yellow-500 mr-1"></i>
						<span>{rating}</span>
						<span className="mx-2">•</span>
						<i className="fas fa-users mr-1"></i>
						<span>{students.toLocaleString()}</span>
					</div>
					<div className="flex items-center">
						<i className="fas fa-clock mr-1"></i>
						<span>{duration}</span>
					</div>
				</div>

				<div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
					<div>
						<p className="text-2xl font-bold text-gray-900 dark:text-white">${price}</p>
						{price > 100 && <p className="text-sm text-gray-500 dark:text-gray-400 line-through">${(price * 1.2).toFixed(2)}</p>}
					</div>
					<div className="flex space-x-2">
						{enrolled ? (
							<button className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-300 text-sm font-medium cursor-pointer">Go to Course</button>
						) : (
							<button onClick={handleEnroll} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium cursor-pointer">
								Enroll Now
							</button>
						)}
					</div>
				</div>
			</div>

			{price > 100 && (
				<div className="px-6 pb-6">
					<div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3 text-white text-center cursor-pointer">
						<p className="text-sm font-medium">
							<i className="fas fa-gift mr-2"></i>
							Save 20% with bundle purchase
						</p>
					</div>
				</div>
			)}
		</motion.div>
	)
}

export default SavedCourseCard
