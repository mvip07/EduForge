import { getStatusColor } from "../utils/getStatusColor"

const BillingHistoryTab = ({ transactions, billingFilters, activeFilter, onFilterChange, onViewDetails, onDownloadReceipt }) => {
	return (
		<>
			<div className="mb-6">
				<div className="flex flex-wrap gap-2">
					{billingFilters.map((filter) => (
						<button key={filter.id} onClick={() => onFilterChange(filter.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${activeFilter === filter.id ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}>
							{filter.label}
						</button>
					))}
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Description</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Payment Method</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
							</tr>
						</thead>
						<tbody>
							{transactions.length > 0 ? (
								transactions.map((transaction) => (
									<tr key={transaction.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
										<td className="py-4 px-6">
											<div className="text-sm text-gray-900 dark:text-white">
												{new Date(transaction.date).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
												})}
											</div>
										</td>
										<td className="py-4 px-6">
											<div>
												<div className="font-medium text-gray-900 dark:text-white">{transaction.description}</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">Invoice #{transaction.id}</div>
											</div>
										</td>
										<td className="py-4 px-6">
											<div className="font-bold text-gray-900 dark:text-white">${transaction.amount.toFixed(2)}</div>
											<div className="text-sm text-gray-600 dark:text-gray-400">USD</div>
										</td>
										<td className="py-4 px-6">
											<span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
										</td>
										<td className="py-4 px-6">
											<div className="flex items-center">
												<div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${transaction.paymentMethod === 'visa' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gradient-to-r from-red-500 to-orange-600'}`}>
													<i className={`fab fa-${transaction.paymentMethod} text-white`}></i>
												</div>
												<span className="text-gray-900 dark:text-white">**** {transaction.paymentMethod === 'visa' ? '4242' : '8888'}</span>
											</div>
										</td>
										<td className="py-4 px-6">
											<div className="flex items-center space-x-3">
												<button onClick={() => onViewDetails(transaction)} className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer">
													<i className="fas fa-eye mr-1"></i>
													View
												</button>
												<button onClick={() => onDownloadReceipt(transaction)} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer">
													<i className="fas fa-download mr-1"></i>
													Receipt
												</button>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="6" className="py-8 text-center">
										<div className="text-gray-500 dark:text-gray-400">
											<i className="fas fa-receipt text-3xl mb-3"></i>
											<p>No transactions found</p>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
					<div className="flex justify-between items-center">
						<div className="text-sm text-gray-600 dark:text-gray-400">
							Showing {transactions.length} of {transactions.length} transactions
						</div>
						<div className="text-right">
							<div className="text-lg font-bold text-gray-900 dark:text-white">${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">Total amount</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
						<i className="fas fa-chart-line text-green-500 mr-2"></i>
						Spending Trend
					</h3>
					<div className="space-y-3">
						<div className="flex justify-between text-sm">
							<span className="text-gray-600 dark:text-gray-400">This Month</span>
							<span className="font-medium text-gray-900 dark:text-white">$19.99</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600 dark:text-gray-400">Last Month</span>
							<span className="font-medium text-gray-900 dark:text-white">$19.99</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-600 dark:text-gray-400">Total Savings</span>
							<span className="font-medium text-green-600 dark:text-green-400">$120.00</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
						<i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
						Upcoming Payments
					</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<div className="font-medium text-gray-900 dark:text-white">Pro Plan Renewal</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">April 15, 2024</div>
							</div>
							<div className="text-right">
								<div className="font-bold text-gray-900 dark:text-white">$19.99</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Auto-renew</div>
							</div>
						</div>
						<button className="w-full text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer">
							<i className="fas fa-bell mr-1"></i>
							Set reminder for due date
						</button>
					</div>
				</div>

				<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
					<h3 className="font-semibold mb-4">Need Help?</h3>
					<p className="text-purple-100 text-sm mb-4">Have questions about your bill or need to request a refund?</p>
					<div className="space-y-3">
						<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
							<div className="flex items-center">
								<i className="fas fa-file-invoice-dollar mr-3"></i>
								<span>Request Refund</span>
							</div>
							<i className="fas fa-arrow-right"></i>
						</button>
						<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
							<div className="flex items-center">
								<i className="fas fa-question-circle mr-3"></i>
								<span>Billing Support</span>
							</div>
							<i className="fas fa-arrow-right"></i>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default BillingHistoryTab
