import { motion } from 'framer-motion'

const TransactionDetailModal = ({ transaction, onClose, onDownloadReceipt }) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction Details</h2>
						<button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-times text-xl"></i>
						</button>
					</div>
				</div>

				<div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
					<div className="mb-8">
						<div className="flex items-center justify-between mb-4">
							<div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Invoice Number</div>
								<div className="text-xl font-bold text-gray-900 dark:text-white">{transaction.id}</div>
							</div>
							<span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(transaction.status)}`}>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Date</div>
								<div className="font-medium text-gray-900 dark:text-white">
									{new Date(transaction.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</div>
							</div>
							<div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Payment Method</div>
								<div className="flex items-center">
									<div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${transaction.paymentMethod === 'visa' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gradient-to-r from-red-500 to-orange-600'}`}>
										<i className={`fab fa-${transaction.paymentMethod} text-white`}></i>
									</div>
									<span className="font-medium text-gray-900 dark:text-white">**** {transaction.paymentMethod === 'visa' ? '4242' : '8888'}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-8">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-4">Items</h3>
						<div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden">
							<div className="p-4 border-b border-gray-200 dark:border-gray-700">
								<div className="grid grid-cols-12 text-sm font-medium text-gray-600 dark:text-gray-400">
									<div className="col-span-8">Description</div>
									<div className="col-span-2 text-right">Quantity</div>
									<div className="col-span-2 text-right">Amount</div>
								</div>
							</div>
							{transaction.items.map((item, index) => (
								<div key={index} className="p-4 border-b border-gray-200 dark:border-gray-700">
									<div className="grid grid-cols-12 items-center">
										<div className="col-span-8">
											<div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
										</div>
										<div className="col-span-2 text-right text-gray-900 dark:text-white">{item.quantity}</div>
										<div className="col-span-2 text-right font-bold text-gray-900 dark:text-white">${item.price.toFixed(2)}</div>
									</div>
								</div>
							))}
							<div className="p-4">
								<div className="flex justify-between items-center">
									<div className="text-lg font-bold text-gray-900 dark:text-white">Total</div>
									<div className="text-2xl font-bold text-gray-900 dark:text-white">${transaction.amount.toFixed(2)}</div>
								</div>
							</div>
						</div>
					</div>

					<div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
							<i className="fas fa-info-circle text-purple-500 mr-2"></i>
							Need Help?
						</h4>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">If you have questions about this transaction, our support team is here to help.</p>
						<div className="flex space-x-3">
							<button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer">
								<i className="fas fa-question-circle mr-1"></i>
								Get Help
							</button>
							<button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer">
								<i className="fas fa-exclamation-triangle mr-1"></i>
								Report Issue
							</button>
						</div>
					</div>
				</div>

				<div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
					<div className="flex justify-between">
						<button onClick={onDownloadReceipt} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
							<i className="fas fa-download mr-2"></i>
							Download Receipt (PDF)
						</button>
						<button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
							Close
						</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default TransactionDetailModal
