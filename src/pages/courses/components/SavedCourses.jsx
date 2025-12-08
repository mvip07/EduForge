import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SavedCourseCard from './SavedCourseCard'
import EmptyState from './EmptyState'

const SavedCourses = ({ courses }) => {
	const [sortBy, setSortBy] = useState('recent')

	const savedCourses = courses.filter((c) => c.saved)

	if (savedCourses.length === 0) {
		return <EmptyState icon="fas fa-heart" title="No saved courses" description="You haven't saved any courses yet. Browse courses and save your favorites to view them later." actionText="Browse Courses" onAction={() => (window.location.href = '/explore')} />
	}

	const sortedCourses = [...savedCourses].sort((a, b) => {
		switch (sortBy) {
			case 'price-low':
				return a.price - b.price
			case 'price-high':
				return b.price - a.price
			case 'rating':
				return b.rating - a.rating
			case 'students':
				return b.students - a.students
			default:
				return new Date(b.lastAccessed || 0) - new Date(a.lastAccessed || 0)
		}
	})

	const totalPrice = savedCourses.reduce((acc, course) => acc + course.price, 0)
	const estimatedSavings = totalPrice * 0.3

	return (
		<div>
			<div className="mb-8">
				<div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl">
					<div className="flex flex-col md:flex-row md:items-center justify-between">
						<div>
							<h3 className="text-xl font-bold mb-2">Your Wishlist</h3>
							<p className="text-pink-100">
								{savedCourses.length} courses saved • Total: ${totalPrice.toFixed(2)}
							</p>
							<p className="text-sm text-pink-200 mt-2">
								<i className="fas fa-gift mr-1"></i>
								Save ${estimatedSavings.toFixed(2)} with a bundle purchase
							</p>
						</div>
						<div className="mt-4 md:mt-0 flex space-x-3">
							<button className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
								<i className="fas fa-shopping-cart mr-2"></i>
								Buy Bundle
							</button>
							<button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer">Share List</button>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Saved Courses ({savedCourses.length})</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Courses you're interested in</p>
					</div>
					<div className="mt-4 sm:mt-0">
						<div className="flex items-center space-x-2">
							<span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
							<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="pl-3 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">
								<option value="recent">Recently Added</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
								<option value="rating">Highest Rated</option>
								<option value="students">Most Popular</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sortedCourses.map((course, index) => (
					<motion.div key={course.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
						<SavedCourseCard {...course} />
					</motion.div>
				))}
			</div>

			<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
				<div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
					<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pricing Summary</h4>
					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-gray-600 dark:text-gray-400">Individual Courses</span>
							<span className="font-medium text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600 dark:text-gray-400">Bundle Discount (30%)</span>
							<span className="font-medium text-green-600 dark:text-green-400">-${estimatedSavings.toFixed(2)}</span>
						</div>
						<div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
							<span className="text-lg font-semibold text-gray-900 dark:text-white">Bundle Total</span>
							<span className="text-lg font-bold text-gray-900 dark:text-white">${(totalPrice - estimatedSavings).toFixed(2)}</span>
						</div>
					</div>
					<div className="mt-6 flex justify-end">
						<button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<i className="fas fa-shopping-cart mr-2"></i>
							Purchase Bundle & Save ${estimatedSavings.toFixed(2)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SavedCourses
