import { motion } from 'framer-motion'

const CategoryCard = ({ category, isSelected, onClick }) => {
	return (
		<motion.div whileHover={{ y: -3 }} onClick={onClick} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border cursor-pointer ${isSelected ? 'border-purple-500 dark:border-purple-500' : 'border-gray-200 dark:border-gray-700'}`}>
			<div className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center">
						<div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white mr-4`}>
							<i className={category.icon}></i>
						</div>
						<div>
							<h3 className="font-bold text-gray-900 dark:text-white">{category.name}</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
						</div>
					</div>
					{isSelected && (
						<span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-nowrap">
							<i className="fas fa-check mr-1"></i>
							Selected
						</span>
					)}
				</div>

				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
						<div className="text-lg font-bold text-gray-900 dark:text-white">{category.threads.toLocaleString()}</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Threads</div>
					</div>
					<div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
						<div className="text-lg font-bold text-gray-900 dark:text-white">{category.posts.toLocaleString()}</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
					</div>
				</div>

				<div className="mb-4">
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Topics:</h4>
					<div className="flex flex-wrap gap-2">
						{category.subcategories.slice(0, 3).map((subcat, index) => (
							<span key={index} className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
								{subcat}
							</span>
						))}
						{category.subcategories.length > 3 && <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">+{category.subcategories.length - 3}</span>}
					</div>
				</div>

				<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
					<div className="flex items-center">
						<i className="fas fa-clock mr-2"></i>
						<span>Active {category.latestActivity}</span>
					</div>
					<button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium cursor-pointer">
						Browse <i className="fas fa-arrow-right ml-1"></i>
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default CategoryCard
