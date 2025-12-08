const NotificationSettings = ({ notifications, setNotifications }) => {
	const updateNotification = (type, category, value) => {
		setNotifications({
			...notifications,
			[type]: { ...notifications[type], [category]: value },
		})
	}

	const updateDoNotDisturb = (field, value) => {
		setNotifications({
			...notifications,
			doNotDisturb: { ...notifications.doNotDisturb, [field]: value },
		})
	}

	const toggleDay = (day) => {
		const newDays = notifications.doNotDisturb.days.includes(day) ? notifications.doNotDisturb.days.filter((d) => d !== day) : [...notifications.doNotDisturb.days, day]
		updateDoNotDisturb('days', newDays)
	}

	return (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold mb-2">Notification Settings</h2>
						<p className="text-yellow-100">Control how and when you receive notifications</p>
					</div>
					<div className="mt-4 md:mt-0">
						<div className="flex items-center">
							<i className="fas fa-bell-slash text-3xl mr-4"></i>
							<div>
								<div className="text-2xl font-bold">Do Not Disturb</div>
								<div className="text-sm text-yellow-200">{notifications.doNotDisturb.enabled ? 'Active' : 'Inactive'}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
					<i className="fas fa-envelope text-blue-500 mr-2"></i>
					Email Notifications
				</h3>
				<div className="space-y-4">
					{Object.entries(notifications.email).map(([key, value]) => (
						<div key={key} className="flex items-center justify-between">
							<div>
								<span className="text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
								<p className="text-sm text-gray-500 dark:text-gray-500">
									{key === 'courseUpdates' && 'New courses, updates, and announcements'}
									{key === 'assignmentDeadlines' && 'Reminders for upcoming assignments'}
									{key === 'liveSessions' && 'Upcoming live sessions and workshops'}
									{key === 'forumReplies' && 'Replies to your forum posts'}
									{key === 'promotional' && 'Special offers and promotions'}
									{key === 'weeklyDigest' && 'Weekly summary of your progress'}
								</p>
							</div>
							<button onClick={() => updateNotification('email', key, !value)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
					<i className="fas fa-mobile-alt text-purple-500 mr-2"></i>
					Push Notifications
				</h3>
				<div className="space-y-4">
					{Object.entries(notifications.push).map(([key, value]) => (
						<div key={key} className="flex items-center justify-between">
							<div>
								<span className="text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
								<p className="text-sm text-gray-500 dark:text-gray-500">
									{key === 'courseUpdates' && 'Instant course updates'}
									{key === 'assignmentDeadlines' && 'Assignment due dates'}
									{key === 'liveSessions' && 'Live session reminders'}
									{key === 'messages' && 'New messages from instructors'}
									{key === 'achievementUnlocks' && 'When you earn badges'}
								</p>
							</div>
							<button onClick={() => updateNotification('push', key, !value)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${value ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
					<i className="fas fa-sms text-green-500 mr-2"></i>
					SMS Notifications
				</h3>
				<div className="space-y-4">
					{Object.entries(notifications.sms).map(([key, value]) => (
						<div key={key} className="flex items-center justify-between">
							<div>
								<span className="text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
								<p className="text-sm text-gray-500 dark:text-gray-500">
									{key === 'urgentDeadlines' && 'Critical deadline alerts'}
									{key === 'liveSessionReminders' && 'Live session notifications'}
									{key === 'securityAlerts' && 'Important security alerts'}
								</p>
							</div>
							<button onClick={() => updateNotification('sms', key, !value)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${value ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
					))}
				</div>
				<div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
					<div className="flex items-center">
						<i className="fas fa-info-circle text-green-500 mr-3"></i>
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white">SMS Charges May Apply</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400">Standard messaging rates from your carrier may apply for SMS notifications.</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
					<i className="fas fa-moon text-yellow-500 mr-2"></i>
					Do Not Disturb
				</h3>
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<span className="text-gray-700 dark:text-gray-300">Enable Do Not Disturb</span>
							<p className="text-sm text-gray-500 dark:text-gray-500">Silence notifications during selected hours</p>
						</div>
						<button onClick={() => updateDoNotDisturb('enabled', !notifications.doNotDisturb.enabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${notifications.doNotDisturb.enabled ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${notifications.doNotDisturb.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
						</button>
					</div>

					{notifications.doNotDisturb.enabled && (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
									<input type="time" value={notifications.doNotDisturb.startTime} onChange={(e) => updateDoNotDisturb('startTime', e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time</label>
									<input type="time" value={notifications.doNotDisturb.endTime} onChange={(e) => updateDoNotDisturb('endTime', e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Days of Week</label>
								<div className="flex flex-wrap gap-2">
									{[
										{ id: 'mon', label: 'Mon' },
										{ id: 'tue', label: 'Tue' },
										{ id: 'wed', label: 'Wed' },
										{ id: 'thu', label: 'Thu' },
										{ id: 'fri', label: 'Fri' },
										{ id: 'sat', label: 'Sat' },
										{ id: 'sun', label: 'Sun' },
									].map((day) => (
										<button key={day.id} onClick={() => toggleDay(day.id)} className={`  px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${notifications.doNotDisturb.days.includes(day.id) ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
											{day.label}
										</button>
									))}
								</div>
							</div>

							<div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
								<div className="flex items-center">
									<i className="fas fa-info-circle text-yellow-500 mr-3"></i>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-white">Emergency Override</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">Critical security alerts will still be delivered even during Do Not Disturb hours.</p>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default NotificationSettings
