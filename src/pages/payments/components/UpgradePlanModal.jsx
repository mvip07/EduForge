import { motion } from 'framer-motion'
import { useState } from 'react'

const UpgradePlanModal = ({ plan, onClose, onConfirm, currentPlan }) => {
	const [selectedCycle, setSelectedCycle] = useState('monthly')

	const monthlyPrice = plan.price
	const yearlyPrice = plan.price * 12 * 0.8

	const displayPrice = selectedCycle === 'monthly' ? monthlyPrice : yearlyPrice
	const displayPeriod = selectedCycle === 'monthly' ? 'month' : 'year'

	const calculateSavings = () => {
		if (selectedCycle === 'yearly') {
			return (monthlyPrice * 12 - yearlyPrice).toFixed(2)
		}
		return 0
	}

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-md max-h-md h-full scollbar-none overflow-y-auto w-full shadow-2xl">
				<div className={`p-8 bg-gradient-to-r ${plan.color} text-white rounded-t-2xl`}>
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-2">Upgrade to {plan.name}</h2>
						<p className="text-white/80">Unlock premium features and enhance your learning experience</p>
					</div>
				</div>

				<div className="p-8">
					{/* Billing Cycle Toggle */}
					<div className="mb-6">
						<div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex">
							<button onClick={() => setSelectedCycle('monthly')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer  ${selectedCycle === 'monthly' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}>
								Monthly
							</button>
							<button onClick={() => setSelectedCycle('yearly')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${selectedCycle === 'yearly' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'} `}>
								Yearly
								{selectedCycle !== 'yearly' && <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">Save 20%</span>}
							</button>
						</div>
					</div>

					<div className="text-center mb-6">
						<div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
							${displayPrice.toFixed(2)}/{displayPeriod}
						</div>
						{selectedCycle === 'yearly' && (
							<div className="text-sm text-green-600 dark:text-green-400">
								<i className="fas fa-piggy-bank mr-1"></i>
								Save ${calculateSavings()} compared to monthly billing
							</div>
						)}
						{currentPlan && plan.price > currentPlan.price && (
							<div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
								Upgrade from ${currentPlan.price}/{currentPlan.period}
							</div>
						)}
					</div>

					<div className="mb-8">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-4">You'll get:</h4>
						<ul className="space-y-2">
							{plan.features.slice(0, 5).map((feature, index) => (
								<li key={index} className="flex items-center">
									<i className="fas fa-check-circle text-green-500 mr-3"></i>
									<span className="text-gray-700 dark:text-gray-300">{feature}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-6">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm text-gray-600 dark:text-gray-400">Payment method</span>
							<span className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
								<i className="fab fa-cc-visa text-blue-500 mr-2"></i>
								**** 4242
							</span>
						</div>
						<div className="text-xs text-gray-500 dark:text-gray-500">
							<i className="fas fa-lock mr-1"></i>
							Secure payment processed by Stripe
						</div>
					</div>

					<div className="space-y-3">
						<button onClick={onConfirm} className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer">
							<i className="fas fa-arrow-up mr-2"></i>
							Upgrade to {plan.name}
						</button>
						<button onClick={onClose} className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 cursor-pointer">
							Cancel
						</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default UpgradePlanModal