import { motion } from 'framer-motion'
const AvatarModal = ({ onClose, onSelect, colors }) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl">
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Avatar Color</h2>
						<button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-times text-xl"></i>
						</button>
					</div>
				</div>

				<div className="p-6">
					<div className="grid grid-cols-3 gap-4 mb-6">
						{colors.map((color, index) => (
							<button key={index} onClick={() => onSelect(color)} className={`w-20 h-20 rounded-xl flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-r cursor-pointer ${color} transform hover:scale-105 transition-transform duration-300`}>
								JD
							</button>
						))}
					</div>

					<div className="mb-6">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-3">Upload Custom Avatar</h4>
						<div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer">
							<i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
							<p className="text-gray-600 dark:text-gray-400 mb-4">Drag & drop an image here, or click to browse</p>
							<button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg cursor-pointer">Browse Files</button>
							<p className="text-xs text-gray-500 dark:text-gray-500 mt-4">JPG, PNG or GIF • Max 5MB</p>
						</div>
					</div>

					<div className="flex justify-end">
						<button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
							Cancel
						</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default AvatarModal
