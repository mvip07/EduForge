export const getTypeIcon = (type) => {
	switch (type) {
		case 'pdf':
			return 'fas fa-file-pdf text-red-500'
		case 'zip':
			return 'fas fa-file-archive text-blue-500'
		case 'github':
			return 'fab fa-github text-gray-800 dark:text-gray-300'
		case 'doc':
			return 'fas fa-file-word text-blue-600'
		case 'ppt':
			return 'fas fa-file-powerpoint text-orange-500'
		case 'json':
			return 'fas fa-code text-yellow-500'
		case 'link':
			return 'fas fa-external-link-alt text-purple-500'
		default:
			return 'fas fa-file text-gray-500'
	}
}

export const getTypeColor = (type) => {
	switch (type) {
		case 'pdf':
			return 'bg-red-100 dark:bg-red-900'
		case 'zip':
			return 'bg-blue-100 dark:bg-blue-900'
		case 'github':
			return 'bg-gray-100 dark:bg-gray-700'
		case 'doc':
			return 'bg-blue-50 dark:bg-blue-900/30'
		case 'ppt':
			return 'bg-orange-100 dark:bg-orange-900'
		case 'json':
			return 'bg-yellow-100 dark:bg-yellow-900'
		case 'link':
			return 'bg-purple-100 dark:bg-purple-900'
		default:
			return 'bg-gray-100 dark:bg-gray-700'
	}
}