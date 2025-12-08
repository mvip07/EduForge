export const getStatusColor = (status) => {
	switch (status) {
		case 'open':
			return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
		case 'in-progress':
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
		case 'resolved':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
		case 'closed':
			return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
		default:
			return 'bg-gray-100 text-gray-800'
	}
}

export const getPriorityColor = (priority) => {
	switch (priority) {
		case 'high':
			return 'text-red-600 dark:text-red-400'
		case 'medium':
			return 'text-amber-600 dark:text-amber-400'
		case 'low':
			return 'text-green-600 dark:text-green-400'
		default:
			return 'text-gray-600'
	}
}

export const getPriorityIcon = (priority) => {
	switch (priority) {
		case 'high':
			return 'fas fa-exclamation-circle'
		case 'medium':
			return 'fas fa-exclamation-triangle'
		case 'low':
			return 'fas fa-info-circle'
		default:
			return 'fas fa-circle'
	}
}
