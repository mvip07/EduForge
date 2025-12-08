import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import PlanCard from "./PlanCard"
import CancelSubscriptionModal from "./CancelSubscriptionModal"

const SubscriptionTab = ({ currentSubscription, plans, onUpgrade }) => {
	const [billingCycle, setBillingCycle] = useState('monthly')
	const [showCancelModal, setShowCancelModal] = useState(false)

	const annualPlans = plans.map((plan) => ({
		...plan,
		price: plan.price * 12 * 0.8,
		period: 'year',
		monthlyEquivalent: plan.price,
	}))

	const displayPlans = billingCycle === 'monthly' ? plans : annualPlans

	const handleCancelSubscription = () => {
		alert('Subscription cancellation requested. You will have access until the end of your billing period.')
		setShowCancelModal(false)
	}

	return (
		<>
			<div className="mb-8">
				<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
					<div className="flex flex-col md:flex-row md:items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold mb-2">Current Subscription</h2>
							<p className="text-purple-100">Manage your plan and billing preferences</p>
						</div>
						<div className="mt-4 md:mt-0 text-right">
							<div className="text-3xl font-bold">
								${currentSubscription.price}/{currentSubscription.period}
							</div>
							<div className="text-purple-200">{currentSubscription.plan} Plan</div>
						</div>
					</div>

					<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white/10 p-4 rounded-xl">
							<div className="text-sm text-purple-200 mb-1">Status</div>
							<div className="text-lg font-semibold flex items-center">
								<div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
								{currentSubscription.status.charAt(0).toUpperCase() + currentSubscription.status.slice(1)}
							</div>
						</div>
						<div className="bg-white/10 p-4 rounded-xl">
							<div className="text-sm text-purple-200 mb-1">Next Billing Date</div>
							<div className="text-lg font-semibold">
								{new Date(currentSubscription.nextBillingDate).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</div>
						</div>
						<div className="bg-white/10 p-4 rounded-xl">
							<div className="text-sm text-purple-200 mb-1">Billing Cycle</div>
							<div className="text-lg font-semibold">
								{currentSubscription.billingCycle.charAt(0).toUpperCase() + currentSubscription.billingCycle.slice(1)}
								{currentSubscription.autoRenew && <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded">Auto-renew</span>}
							</div>
						</div>
					</div>

					<div className="mt-8 flex flex-wrap gap-3">
						<button onClick={() => onUpgrade(plans.find((p) => p.id === 'team'))} className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-rocket mr-2"></i>
							Upgrade Plan
						</button>
						<button onClick={() => setShowCancelModal(true)} className="px-6 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-times mr-2"></i>
							Cancel Subscription
						</button>
						<button className="px-6 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-bell mr-2"></i>
							Update Billing Email
						</button>
					</div>
				</div>
			</div>

			<div className="mb-8">
				<div className="flex items-center justify-center">
					<div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
						<button onClick={() => setBillingCycle('monthly')} className={`  px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${billingCycle === 'monthly' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}>
							Monthly Billing
						</button>
						<button onClick={() => setBillingCycle('yearly')} className={` px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${billingCycle === 'yearly' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}>
							Yearly Billing
							<span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Save 20%</span>
						</button>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
				{displayPlans.map((plan) => (
					<PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} isCurrent={plan.current} onUpgrade={onUpgrade} />
				))}
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
				<div className="space-y-4">
					{[
						{
							question: 'Can I switch plans at any time?',
							answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
						},
						{
							question: 'What happens when I cancel my subscription?',
							answer: 'You will retain access to all features until the end of your current billing period.',
						},
						{
							question: 'Do you offer refunds?',
							answer: 'We offer a 30-day money-back guarantee for annual plans. Monthly plans can be cancelled anytime.',
						},
						{
							question: 'Can I change my billing cycle?',
							answer: 'Yes, you can switch between monthly and annual billing from your subscription settings.',
						},
					].map((faq, index) => (
						<div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h4>
							<p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
						</div>
					))}
				</div>
			</div>

			<AnimatePresence>{showCancelModal && <CancelSubscriptionModal onClose={() => setShowCancelModal(false)} onConfirm={handleCancelSubscription} nextBillingDate={currentSubscription.nextBillingDate} />}</AnimatePresence>
		</>
	)
}

export default SubscriptionTab
