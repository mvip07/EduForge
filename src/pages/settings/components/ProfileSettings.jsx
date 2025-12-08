const ProfileSettings = ({ profile, setProfile, onAvatarClick }) => {
	return (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
						<p className="text-purple-100">Customize how others see you on EduForge</p>
					</div>
					<div className="mt-4 md:mt-0">
						<div className="flex items-center">
							<i className="fas fa-user-edit text-3xl mr-4"></i>
							<div>
								<div className="text-2xl font-bold">100%</div>
								<div className="text-sm text-purple-200">Profile Complete</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Basic Information</h3>
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
									<input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username *</label>
									<input type="text" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
								<input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
								<textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" placeholder="Tell us about yourself..." />
								<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{profile.bio.length}/500 characters</p>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Social Links</h3>
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
									<input type="url" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="https://" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
									<input type="text" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="City, Country" />
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										<i className="fab fa-twitter mr-2 text-blue-400"></i>
										Twitter
									</label>
									<input type="text" value={profile.twitter} onChange={(e) => setProfile({ ...profile, twitter: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="@username" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										<i className="fab fa-github mr-2"></i>
										GitHub
									</label>
									<input type="text" value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="username" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Picture</h3>
						<div className="text-center">
							<div className="relative inline-block mb-6">
								<div className="w-32 h-32 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-4xl">{profile.avatar}</div>
								<button onClick={onAvatarClick} className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
									<i className="fas fa-camera"></i>
								</button>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Click the camera icon to change your profile picture</p>
							<div className="space-y-3">
								<button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									<i className="fas fa-upload mr-2"></i>
									Upload Photo
								</button>
								<button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									<i className="fas fa-trash mr-2"></i>
									Remove Photo
								</button>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="font-semibold mb-4">Profile Preview</h3>
						<div className="space-y-4">
							<div className="flex items-center">
								<div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-xl mr-4">{profile.avatar.charAt(0)}</div>
								<div>
									<div className="font-bold">{profile.name}</div>
									<div className="text-sm text-blue-200">@{profile.username}</div>
								</div>
							</div>
							<div className="text-sm">
								<div className="flex items-center mb-2">
									<i className="fas fa-map-marker-alt mr-2"></i>
									<span>{profile.location}</span>
								</div>
								<div className="flex items-center">
									<i className="fas fa-globe mr-2"></i>
									<span className="truncate">{profile.website}</span>
								</div>
							</div>
							<div className="pt-4 border-t border-blue-400">
								<div className="text-sm">Member since Jan 2023</div>
								<div className="text-xs text-blue-200">Last active: 2 hours ago</div>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="font-semibold text-gray-900 dark:text-white mb-4">Profile Tips</h3>
						<ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-start">
								<i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
								<span>Complete profiles get 30% more responses</span>
							</li>
							<li className="flex items-start">
								<i className="fas fa-check-circle text-green-500 mt=1 mr-3"></i>
								<span>Add a professional photo for better recognition</span>
							</li>
							<li className="flex items-start">
								<i className="fas fa-check-circle text-green-500 mt=1 mr-3"></i>
								<span>Include your skills to attract opportunities</span>
							</li>
							<li className="flex items-start">
								<i className="fas fa-check-circle text-green-500 mt=1 mr-3"></i>
								<span>Keep your information up to date</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileSettings