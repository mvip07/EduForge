import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubscriptionTab from './components/SubscriptionTab'
import UpgradePlanModal from './components/UpgradePlanModal'
import BillingHistoryTab from './components/BillingHistoryTab'
import PaymentMethodsTab from './components/PaymentMethodsTab'
import TransactionDetailModal from './components/TransactionDetailModal'
import MainLayout from '../../components/layout/MainLayout'

const PaymentsBilling = () => {
	const [activeTab, setActiveTab] = useState('billing')
	const [selectedTransaction, setSelectedTransaction] = useState(null)
	const [upgradePlanModal, setUpgradePlanModal] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState(null)
	const [paymentMethods, setPaymentMethods] = useState([
		{
			id: 'card_1',
			type: 'visa',
			last4: '4242',
			expiry: '12/25',
			isDefault: true,
			name: 'John Doe',
		},
		{
			id: 'card_2',
			type: 'mastercard',
			last4: '8888',
			expiry: '08/26',
			isDefault: false,
			name: 'John Doe',
		},
	])

	const subscriptionPlans = [
		{
			id: 'free',
			name: 'Free',
			price: 0,
			period: 'forever',
			features: ['Access to 3 basic courses', 'Community forum access', 'Limited quizzes (5/month)', 'Basic support', '720p video quality', 'Certificate upon completion'],
			popular: false,
			current: true,
			color: 'from-gray-500 to-gray-700',
		},
		{
			id: 'pro',
			name: 'Pro',
			price: 19.99,
			period: 'month',
			features: ['Unlimited course access', 'Priority forum support', 'Unlimited quizzes', 'Advanced projects', '1080p HD video quality', 'Professional certificates', 'Downloadable resources', 'Career guidance'],
			popular: true,
			current: false,
			color: 'from-purple-500 to-indigo-600',
		},
		{
			id: 'team',
			name: 'Team',
			price: 49.99,
			period: 'month',
			features: ['Everything in Pro', 'Up to 5 team members', 'Team progress tracking', 'Custom learning paths', 'Admin dashboard', 'Priority email & chat support', 'API access', 'Custom branding'],
			popular: false,
			current: false,
			color: 'from-blue-500 to-cyan-600',
		},
	]

	const billingHistory = [
		{
			id: 'INV-2024-001',
			date: '2024-03-15',
			description: 'Pro Plan - Monthly Subscription',
			amount: 19.99,
			status: 'paid',
			paymentMethod: 'visa',
			invoiceUrl: '/invoices/INV-2024-001.pdf',
			items: [{ name: 'EduForge Pro Plan', quantity: 1, price: 19.99 }],
		},
		{
			id: 'INV-2024-002',
			date: '2024-02-15',
			description: 'Pro Plan - Monthly Subscription',
			amount: 19.99,
			status: 'paid',
			paymentMethod: 'visa',
			invoiceUrl: '/invoices/INV-2024-002.pdf',
			items: [{ name: 'EduForge Pro Plan', quantity: 1, price: 19.99 }],
		},
		{
			id: 'INV-2024-003',
			date: '2024-01-15',
			description: 'Pro Plan - Monthly Subscription',
			amount: 19.99,
			status: 'paid',
			paymentMethod: 'visa',
			invoiceUrl: '/invoices/INV-2024-003.pdf',
			items: [{ name: 'EduForge Pro Plan', quantity: 1, price: 19.99 }],
		},
		{
			id: 'INV-2023-012',
			date: '2023-12-15',
			description: 'Course Purchase - Advanced React',
			amount: 49.99,
			status: 'paid',
			paymentMethod: 'mastercard',
			invoiceUrl: '/invoices/INV-2023-012.pdf',
			items: [{ name: 'Advanced React Course', quantity: 1, price: 49.99 }],
		},
		{
			id: 'INV-2023-011',
			date: '2023-11-15',
			description: 'Pro Plan - Monthly Subscription',
			amount: 19.99,
			status: 'refunded',
			paymentMethod: 'visa',
			invoiceUrl: '/invoices/INV-2023-011.pdf',
			items: [{ name: 'EduForge Pro Plan', quantity: 1, price: 19.99 }],
		},
		{
			id: 'INV-2023-010',
			date: '2023-10-15',
			description: 'Team Plan - Monthly Subscription',
			amount: 49.99,
			status: 'paid',
			paymentMethod: 'visa',
			invoiceUrl: '/invoices/INV-2023-010.pdf',
			items: [{ name: 'EduForge Team Plan', quantity: 1, price: 49.99 }],
		},
	]

	const currentSubscription = {
		plan: 'Pro',
		status: 'active',
		nextBillingDate: '2024-04-15',
		price: 19.99,
		period: 'month',
		autoRenew: true,
		startDate: '2024-01-15',
		billingCycle: 'monthly',
	}

	const tabs = [
		{ id: 'billing', label: 'Billing History', icon: 'fas fa-receipt' },
		{ id: 'subscription', label: 'Subscription', icon: 'fas fa-crown' },
		{ id: 'payment-methods', label: 'Payment Methods', icon: 'fas fa-credit-card' },
	]

	const billingFilters = [
		{ id: 'all', label: 'All Transactions' },
		{ id: 'paid', label: 'Paid' },
		{ id: 'pending', label: 'Pending' },
		{ id: 'refunded', label: 'Refunded' },
	]

	const [activeFilter, setActiveFilter] = useState('all')
	const [showAddCard, setShowAddCard] = useState(false)
	const [newCard, setNewCard] = useState({
		number: '',
		expiry: '',
		cvc: '',
		name: '',
		isDefault: false,
	})

	const filteredTransactions = billingHistory.filter((transaction) => {
		if (activeFilter === 'all') return true
		return transaction.status === activeFilter
	})

	const totalSpent = billingHistory
		.filter((t) => t.status === 'paid')
		.reduce((sum, t) => sum + t.amount, 0)
		.toFixed(2)

	const monthlyAverage = (totalSpent / 6).toFixed(2)

	const handleDownloadReceipt = (transaction) => {
		alert(`Downloading receipt: ${transaction.id}`)
	}

	const handleUpgradePlan = (plan) => {
		setSelectedPlan(plan)
		setUpgradePlanModal(true)
	}

	const handleConfirmUpgrade = () => {
		alert(`Upgrading to ${selectedPlan.name} plan for $${selectedPlan.price}/${selectedPlan.period}`)
		setUpgradePlanModal(false)
	}

	const handleAddPaymentMethod = () => {
		if (!newCard.number || !newCard.expiry || !newCard.cvc || !newCard.name) {
			alert('Please fill in all card details')
			return
		}

		const newPaymentMethod = {
			id: `card_${paymentMethods.length + 1}`,
			type: newCard.number.startsWith('4') ? 'visa' : 'mastercard',
			last4: newCard.number.slice(-4),
			expiry: newCard.expiry,
			isDefault: newCard.isDefault,
			name: newCard.name,
		}

		setPaymentMethods((prev) => {
			if (newCard.isDefault) {
				return [newPaymentMethod, ...prev.map((p) => ({ ...p, isDefault: false }))]
			}
			return [...prev, newPaymentMethod]
		})

		setNewCard({
			number: '',
			expiry: '',
			cvc: '',
			name: '',
			isDefault: false,
		})
		setShowAddCard(false)
	}

	const handleSetDefault = (id) => {
		setPaymentMethods((prev) => prev.map((p) => ({ ...p, isDefault: p.id === id })))
	}

	const handleRemoveCard = (id) => {
		if (paymentMethods.find((p) => p.id === id)?.isDefault && paymentMethods.length > 1) {
			alert('Please set another card as default before removing this one')
			return
		}
		setPaymentMethods((prev) => prev.filter((p) => p.id !== id))
	}

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments & Billing</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Manage your subscription and billing history</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<i className="fas fa-download mr-2"></i>
							Export Statements
						</button>
						<button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-question-circle mr-2"></i>
							Get Help
						</button>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Current Plan</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">{currentSubscription.plan}</p>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									${currentSubscription.price}/{currentSubscription.period}
								</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
								<i className="fas fa-crown text-purple-600 dark:text-purple-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Next Billing Date</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">{new Date(currentSubscription.nextBillingDate).getDate()}</p>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{new Date(currentSubscription.nextBillingDate).toLocaleDateString('en-US', { month: 'long' })}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
								<i className="fas fa-calendar-alt text-green-600 dark:text-green-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">${totalSpent}</p>
								<p className="text-sm text-green-600 dark:text-green-400 mt-1">
									<i className="fas fa-chart-line mr-1"></i>
									Last 6 months
								</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
								<i className="fas fa-dollar-sign text-blue-600 dark:text-blue-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Monthly Average</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">${monthlyAverage}</p>
								<p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
									<i className="fas fa-calendar mr-1"></i>
									Per month
								</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
								<i className="fas fa-chart-pie text-orange-600 dark:text-orange-400 text-xl"></i>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
				<div className="border-b border-gray-200 dark:border-gray-700">
					<nav className="-mb-px flex space-x-8 overflow-x-auto">
						{tabs.map((tab) => (
							<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${activeTab === tab.id ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>
								<i className={`${tab.icon} mr-2`}></i>
								{tab.label}
							</button>
						))}
					</nav>
				</div>
			</motion.div>

			<AnimatePresence mode="wait">
				<motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
					{activeTab === 'billing' && <BillingHistoryTab transactions={filteredTransactions} billingFilters={billingFilters} activeFilter={activeFilter} onFilterChange={setActiveFilter} onViewDetails={setSelectedTransaction} onDownloadReceipt={handleDownloadReceipt} />}

					{activeTab === 'subscription' && <SubscriptionTab currentSubscription={currentSubscription} plans={subscriptionPlans} onUpgrade={handleUpgradePlan} />}

					{activeTab === 'payment-methods' && <PaymentMethodsTab paymentMethods={paymentMethods} showAddCard={showAddCard} newCard={newCard} setNewCard={setNewCard} onAddCard={() => setShowAddCard(true)} onCancelAddCard={() => setShowAddCard(false)} onSubmitAddCard={handleAddPaymentMethod} onSetDefault={handleSetDefault} onRemoveCard={handleRemoveCard} />}
				</motion.div>
			</AnimatePresence>

			<AnimatePresence>{selectedTransaction && <TransactionDetailModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} onDownloadReceipt={handleDownloadReceipt} />}</AnimatePresence>

			<AnimatePresence>
				{upgradePlanModal && selectedPlan && (
					<UpgradePlanModal
						plan={selectedPlan}
						onClose={() => {
							setUpgradePlanModal(false)
							setSelectedPlan(null)
						}}
						onConfirm={handleConfirmUpgrade}
						currentPlan={subscriptionPlans.find((p) => p.current)}
					/>
				)}
			</AnimatePresence>
		</MainLayout>
	)
}

export default PaymentsBilling
