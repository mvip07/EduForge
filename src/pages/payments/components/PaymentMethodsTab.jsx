import { AnimatePresence, motion } from 'framer-motion'
import { getCardColor, getCardIcon } from '../utils/getCard'

const PaymentMethodsTab = ({ paymentMethods, showAddCard, newCard, setNewCard, onAddCard, onCancelAddCard, onSubmitAddCard, onSetDefault, onRemoveCard }) => {
	return (
		<>
			<div className="mb-8">
				<div className="flex justify-between items-center mb-6">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Payment Methods</h3>
					<button onClick={onAddCard} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" disabled={showAddCard}>
						<i className="fas fa-plus mr-2"></i>
						Add New Card
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{paymentMethods.map((card) => (
						<div key={card.id} className={` bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border ${card.isDefault ? 'border-purple-500' : 'border-gray-200 dark:border-gray-700'}`}>
							<div className={`p-6 bg-gradient-to-r ${getCardColor(card.type)} text-white`}>
								<div className="flex justify-between items-start mb-6">
									<div>
										<div className="text-sm opacity-80">Card Holder</div>
										<div className="text-lg font-bold">{card.name}</div>
									</div>
									<i className={`${getCardIcon(card.type)} text-3xl`}></i>
								</div>

								<div className="text-2xl font-mono tracking-wider mb-4">**** **** **** {card.last4}</div>

								<div className="flex justify-between items-center">
									<div>
										<div className="text-sm opacity-80">Expires</div>
										<div className="font-semibold">{card.expiry}</div>
									</div>
									{card.isDefault && (
										<span className="px-3 py-1 text-sm font-medium bg-white/20 rounded-full cursor-pointer">
											<i className="fas fa-star mr-1"></i>
											Default
										</span>
									)}
								</div>
							</div>

							<div className="p-4 bg-gray-50 dark:bg-gray-700/50">
								<div className="flex space-x-3">
									{!card.isDefault && (
										<button onClick={() => onSetDefault(card.id)} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 text-sm cursor-pointer">
											Set as Default
										</button>
									)}
									<button onClick={() => onRemoveCard(card.id)} className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-300 text-sm cursor-pointer">
										Remove
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<AnimatePresence>
				{showAddCard && (
					<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8">
						<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Card</h3>
								<button onClick={onCancelAddCard} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
									<i className="fas fa-times text-xl"></i>
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
									<div className="relative">
										<input type="text" value={newCard.number} onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, '') })} placeholder="1234 5678 9012 3456" maxLength={16} className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
										<i className="fas fa-credit-card absolute left-4 top-3.5 text-gray-400"></i>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
										<input type="text" value={newCard.expiry} onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })} placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVC</label>
										<input type="text" value={newCard.cvc} onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value.replace(/\D/g, '') })} placeholder="123" maxLength={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Holder Name</label>
									<input type="text" value={newCard.name} onChange={(e) => setNewCard({ ...newCard, name: e.target.value })} placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
								</div>

								<div className="flex items-center">
									<input type="checkbox" id="defaultCard" checked={newCard.isDefault} onChange={(e) => setNewCard({ ...newCard, isDefault: e.target.checked })} className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2" />
									<label htmlFor="defaultCard" className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
										Set as default payment method
									</label>
								</div>
							</div>

							<div className="mt-6 flex justify-end space-x-3">
								<button onClick={onCancelAddCard} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									Cancel
								</button>
								<button onClick={onSubmitAddCard} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
									<i className="fas fa-check mr-2"></i>
									Add Card
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div className="mb-4 md:mb-0">
						<h3 className="text-xl font-bold mb-2">
							<i className="fas fa-shield-alt mr-2"></i>
							Payment Security
						</h3>
						<p className="text-green-100">Your payment information is encrypted and secure. We never store your full card details.</p>
					</div>
					<div className="flex items-center space-x-4">
						<div className="text-center">
							<i className="fab fa-cc-visa text-3xl"></i>
						</div>
						<div className="text-center">
							<i className="fab fa-cc-mastercard text-3xl"></i>
						</div>
						<div className="text-center">
							<i className="fab fa-cc-amex text-3xl"></i>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PaymentMethodsTab
