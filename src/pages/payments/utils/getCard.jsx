export const getCardIcon = (type) => {
	switch (type) {
		case 'visa':
			return 'fab fa-cc-visa'
		case 'mastercard':
			return 'fab fa-cc-mastercard'
		case 'amex':
			return 'fab fa-cc-amex'
		default:
			return 'fas fa-credit-card'
	}
}

export const getCardColor = (type) => {
	switch (type) {
		case 'visa':
			return 'from-blue-500 to-indigo-600'
		case 'mastercard':
			return 'from-red-500 to-orange-600'
		case 'amex':
			return 'from-blue-400 to-cyan-500'
		default:
			return 'from-gray-500 to-gray-700'
	}
}
