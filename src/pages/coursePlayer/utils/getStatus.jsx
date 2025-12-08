export const getStatusColor = (status) => {
	switch (status) {
		case 'submitted':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
		case 'pending':
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
		case 'not-started':
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
		default:
			return 'bg-gray-100 text-gray-800'
	}
}

export const getStatusIcon = (status) => {
	switch (status) {
		case 'submitted':
			return 'fas fa-check-circle text-green-500'
		case 'pending':
			return 'fas fa-clock text-yellow-500'
		case 'not-started':
			return 'fas fa-circle text-gray-400'
		default:
			return 'fas fa-circle'
	}
}