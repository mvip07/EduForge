const PrivacySettings = ({ privacy, setPrivacy, onExportData }) => {
	return (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold mb-2">Privacy Settings</h2>
						<p className="text-green-100">Control your privacy and data sharing preferences</p>
					</div>
					<div className="mt-4 md:mt-0">
						<div className="flex items-center">
							<i className="fas fa-user-shield text-3xl mr-4"></i>
							<div>
								<div className="text-2xl font-bold">Protected</div>
								<div className="text-sm text-green-200">Enhanced Privacy</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Visibility</h3>
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Who can see your profile?</label>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{['public', 'connections', 'private'].map((option) => (
								<button key={option} onClick={() => setPrivacy({ ...privacy, profileVisibility: option })} className={`p-4 border rounded-xl text-center transition-all duration-300 cursor-pointer ${privacy.profileVisibility === option ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-green-500'}`}>
									<div className="font-semibold text-gray-900 dark:text-white capitalize mb-1">{option}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										{option === 'public' && 'Anyone on EduForge'}
										{option === 'connections' && 'Only your connections'}
										{option === 'private' && 'Only you'}
									</div>
								</button>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold text-gray-900 dark:text-white">Profile Details</h4>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div>
									<span className="text-gray-700 dark:text-gray-300">Show online status</span>
									<p className="text-sm text-gray-500 dark:text-gray-500">Let others see when you're online</p>
								</div>
								<button onClick={() => setPrivacy({ ...privacy, showOnlineStatus: !privacy.showOnlineStatus })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${privacy.showOnlineStatus ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${privacy.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<span className="text-gray-700 dark:text-gray-300">Show enrolled courses</span>
									<p className="text-sm text-gray-500 dark:text-gray-500">Display courses you're taking</p>
								</div>
								<button onClick={() => setPrivacy({ ...privacy, showCourses: !privacy.showCourses })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${privacy.showCourses ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${privacy.showCourses ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<span className="text-gray-700 dark:text-gray-300">Show achievements</span>
									<p className="text-sm text-gray-500 dark:text-gray-500">Display your certificates and badges</p>
								</div>
								<button onClick={() => setPrivacy({ ...privacy, showAchievements: !privacy.showAchievements })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${privacy.showAchievements ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${privacy.showAchievements ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<span className="text-gray-700 dark:text-gray-300">Show activity</span>
									<p className="text-sm text-gray-500 dark:text-gray-500">Share your learning activity</p>
								</div>
								<button onClick={() => setPrivacy({ ...privacy, showActivity: !privacy.showActivity })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${privacy.showActivity ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${privacy.showActivity ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Communication Preferences</h3>
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Who can send you messages?</label>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{['everyone', 'connections', 'none'].map((option) => (
								<button key={option} onClick={() => setPrivacy({ ...privacy, allowMessages: option })} className={` p-4 border rounded-xl text-center transition-all duration-300 cursor-pointer ${privacy.allowMessages === option ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-green-500'}`}>
									<div className="font-semibold text-gray-900 dark:text-white capitalize mb-1">{option === 'none' ? 'No one' : option}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										{option === 'everyone' && 'Any EduForge member'}
										{option === 'connections' && 'Only your connections'}
										{option === 'none' && 'Disable messages'}
									</div>
								</button>
							))}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Who can send friend requests?</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{['everyone', 'connections'].map((option) => (
								<button key={option} onClick={() => setPrivacy({ ...privacy, allowFriendRequests: option })} className={` p-4 border rounded-xl text-center transition-all duration-300 cursor-pointer ${privacy.allowFriendRequests === option ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-green-500'}`}>
									<div className="font-semibold text-gray-900 dark:text-white capitalize mb-1">{option}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										{option === 'everyone' && 'Any EduForge member'}
										{option === 'connections' && 'Only friends of friends'}
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Data Sharing & Analytics</h3>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<span className="text-gray-700 dark:text-gray-300">Usage analytics</span>
							<p className="text-sm text-gray-500 dark:text-gray-500">Help improve EduForge by sharing usage data</p>
						</div>
						<button onClick={() => setPrivacy({ ...privacy, dataSharing: { ...privacy.dataSharing, analytics: !privacy.dataSharing.analytics } })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${privacy.dataSharing.analytics ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${privacy.dataSharing.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
						</button>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<span className="text-gray-700 dark:text-gray-300">Personalized ads</span>
							<p className="text-sm text-gray-500 dark:text-gray-500">Show ads based on your interests</p>
						</div>
						<button onClick={() => setPrivacy({ ...privacy, dataSharing: { ...privacy.dataSharing, personalizedAds: !privacy.dataSharing.personalizedAds } })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${privacy.dataSharing.personalizedAds ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${privacy.dataSharing.personalizedAds ? 'translate-x-6' : 'translate-x-1'}`} />
						</button>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<span className="text-gray-700 dark:text-gray-300">Research participation</span>
							<p className="text-sm text-gray-500 dark:text-gray-500">Contribute to educational research</p>
						</div>
						<button onClick={() => setPrivacy({ ...privacy, dataSharing: { ...privacy.dataSharing, research: !privacy.dataSharing.research } })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${privacy.dataSharing.research ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
							<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${privacy.dataSharing.research ? 'translate-x-6' : 'translate-x-1'}`} />
						</button>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h3 className="font-semibold mb-2">Your Data Rights</h3>
						<p className="text-green-100">Under GDPR, you have the right to access, export, and delete your personal data.</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button onClick={onExportData} className="px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-download mr-2"></i>
							Export Data
						</button>
						<button className="px-6 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-trash mr-2"></i>
							Delete Data
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PrivacySettings