import { useState } from 'react'
import { motion } from 'framer-motion'

const DataExportModal = ({ onClose, onDownload }) => {
	const [format, setFormat] = useState('json')
	const [dataTypes, setDataTypes] = useState({
		profile: true,
		courses: true,
		certificates: true,
		messages: true,
		forum: true,
		payment: false,
	})

	const toggleDataType = (type) => {
		setDataTypes({ ...dataTypes, [type]: !dataTypes[type] })
	}

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-md max-h-md h-full w-full shadow-2xl overflow-auto scollbar-none">
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Export Your Data</h2>
						<button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-times text-xl"></i>
						</button>
					</div>
				</div>

				<div className="p-6">
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Export Format</label>
						<div className="grid grid-cols-2 gap-4">
							{['json', 'csv', 'pdf', 'xml'].map((fmt) => (
								<button key={fmt} onClick={() => setFormat(fmt)} className={`p-4 border rounded-xl text-center transition-all duration-300 cursor-pointer ${format === fmt ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-500'}`}>
									<div className="font-semibold text-gray-900 dark:text-white uppercase mb-1">{fmt}</div>
									<div className="text-xs text-gray-600 dark:text-gray-400">
										{fmt === 'json' && 'Machine readable'}
										{fmt === 'csv' && 'Spreadsheet ready'}
										{fmt === 'pdf' && 'Printable format'}
										{fmt === 'xml' && 'Structured data'}
									</div>
								</button>
							))}
						</div>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Data to Include</label>
						<div className="space-y-2">
							{Object.entries(dataTypes).map(([type, checked]) => (
								<div key={type} className="flex items-center justify-between">
									<div className="flex items-center">
										<input type="checkbox" id={type} checked={checked} onChange={() => toggleDataType(type)} className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2" />
										<label htmlFor={type} className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize cursor-pointer">
											{type} data
										</label>
									</div>
									<span className="text-xs text-gray-500 dark:text-gray-500">
										{type === 'profile' && '~50 KB'}
										{type === 'courses' && '~2 MB'}
										{type === 'certificates' && '~1 MB'}
										{type === 'messages' && '~500 KB'}
										{type === 'forum' && '~1.5 MB'}
										{type === 'payment' && '~100 KB'}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl mb-6">
						<div className="flex items-start">
							<i className="fas fa-info-circle text-purple-500 mt-0.5 mr-3"></i>
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-white mb-1">What to Expect</h4>
								<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
									<li>• Export may take a few minutes to prepare</li>
									<li>• You'll receive an email with download link</li>
									<li>• Data is available for 7 days</li>
									<li>• Total size: ~5.2 MB</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="flex justify-between">
						<button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
							Cancel
						</button>
						<button onClick={() => onDownload(format)} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
							<i className="fas fa-download mr-2"></i>
							Request Export
						</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default DataExportModal
