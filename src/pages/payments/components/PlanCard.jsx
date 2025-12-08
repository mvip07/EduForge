import { motion } from 'framer-motion'

const PlanCard = ({ plan, billingCycle, isCurrent, onUpgrade }) => {
	const getPriceDisplay = () => {
		if (plan.price === 0) return 'Free'
		if (billingCycle === 'yearly') {
			return `$${plan.price.toFixed(2)}/year`
		}
		return `$${plan.price.toFixed(2)}/${plan.period}`
	}

	const getMonthlyEquivalent = () => {
		if (plan.price === 0 || billingCycle === 'monthly') return null
		return `$${plan.monthlyEquivalent.toFixed(2)} per month`
	}

	return (
		<motion.div whileHover={{ y: -5 }} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border relative  ${plan.popular ? 'border-purple-500' : 'border-gray-200 dark:border-gray-700'}  ${isCurrent ? 'ring-2 ring-purple-500' : ''}`}>
			{plan.popular && (
				<div className="absolute top-0 right-0">
					<div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
						<i className="fas fa-crown mr-1"></i>
						Most Popular
					</div>
				</div>
			)}

			{isCurrent && (
				<div className="absolute top-0 left-0">
					<div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 text-sm font-medium rounded-br-lg">
						<i className="fas fa-check mr-1"></i>
						Current Plan
					</div>
				</div>
			)}

			<div className={`p-6 bg-gradient-to-r ${plan.color} text-white`}>
				<div className="text-center">
					<h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
					<div className="text-4xl font-bold mb-2">{getPriceDisplay()}</div>
					{getMonthlyEquivalent() && <div className="text-white/80">{getMonthlyEquivalent()}</div>}
				</div>
			</div>

			<div className="p-6">
				<div className="mb-6">
					<h4 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h4>
					<ul className="space-y-3">
						{plan.features.map((feature, index) => (
							<li key={index} className="flex items-start">
								<i className="fas fa-check text-green-500 mt-1 mr-3"></i>
								<span className="text-gray-700 dark:text-gray-300">{feature}</span>
							</li>
						))}
					</ul>
				</div>

				<button onClick={() => onUpgrade(plan)} disabled={isCurrent} className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${isCurrent ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : plan.popular ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
					{isCurrent ? 'Current Plan' : plan.price === 0 ? 'Get Started Free' : 'Upgrade Now'}
				</button>
			</div>
		</motion.div>
	)
}

export default PlanCard
