import { motion } from 'framer-motion'

const CancelSubscriptionModal = ({ onClose, onConfirm, nextBillingDate }) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl">
				<div className="p-8">
					<div className="text-center mb-6">
						<div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
							<i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
						</div>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cancel Subscription?</h2>
						<p className="text-gray-600 dark:text-gray-400">Are you sure you want to cancel your subscription? You'll lose access to premium features.</p>
					</div>

					<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl mb-6">
						<div className="flex items-start">
							<i className="fas fa-info-circle text-red-500 mt-0.5 mr-3"></i>
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-white mb-1">What happens next?</h4>
								<ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
									<li>• You'll keep access until {new Date(nextBillingDate).toLocaleDateString()}</li>
									<li>• You'll revert to the Free plan automatically</li>
									<li>• All your progress and data will be saved</li>
									<li>• You can resubscribe anytime</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="space-y-3">
						<button onClick={onConfirm} className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold cursor-pointer">
							<i className="fas fa-times mr-2"></i>
							Cancel Subscription
						</button>
						<button onClick={onClose} className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
							Keep My Subscription
						</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default CancelSubscriptionModal
