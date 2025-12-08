import React from 'react'
import { motion } from 'framer-motion'

const StatsCard = ({ title, value, change, icon, color, progress }) => {
	return (
		<motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
					<p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
					<p className="text-sm text-green-600 dark:text-green-400 mt-1">{change}</p>
				</div>
				<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
					<i className={`${icon} text-white text-xl`}></i>
				</div>
			</div>

			{/* Progress bar */}
			<div className="mt-4">
				<div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
					<span>Progress</span>
					<span>{progress}%</span>
				</div>
				<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
					<motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, delay: 0.3 }} className={`h-full bg-gradient-to-r ${color} rounded-full`} />
				</div>
			</div>
		</motion.div>
	)
}

export default StatsCard