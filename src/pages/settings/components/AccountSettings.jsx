const AccountSettings = ({ account, setAccount, onConnectAccount, onDisconnectAccount, onChangePassword }) => {
	return (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold mb-2">Account Settings</h2>
						<p className="text-blue-100">Manage your account preferences and connected services</p>
					</div>
					<div className="mt-4 md:mt-0">
						<div className="flex items-center">
							<i className="fas fa-shield-check text-3xl mr-4"></i>
							<div>
								<div className="text-2xl font-bold">Verified</div>
								<div className="text-sm text-blue-200">Email Verified</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Change Password</h3>
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
						<input type="password" value={account.currentPassword} onChange={(e) => setAccount({ ...account, currentPassword: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
							<input type="password" value={account.newPassword} onChange={(e) => setAccount({ ...account, newPassword: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
							<input type="password" value={account.confirmPassword} onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
						</div>
					</div>

					<div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-2">Password Requirements</h4>
						<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-center">
								<i className={`fas ${account.newPassword.length >= 8 ? 'fa-check-circle text-green-500' : 'fa-times-circle text-gray-400'} mr-2`}></i>
								<span>At least 8 characters</span>
							</li>
							<li className="flex items-center">
								<i className={`fas ${/[A-Z]/.test(account.newPassword) ? 'fa-check-circle text-green-500' : 'fa-times-circle text-gray-400'} mr-2`}></i>
								<span>At least one uppercase letter</span>
							</li>
							<li className="flex items-center">
								<i className={`fas ${/[0-9]/.test(account.newPassword) ? 'fa-check-circle text-green-500' : 'fa-times-circle text-gray-400'} mr-2`}></i>
								<span>At least one number</span>
							</li>
							<li className="flex items-center">
								<i className={`fas ${/[!@#$%^&*]/.test(account.newPassword) ? 'fa-check-circle text-green-500' : 'fa-times-circle text-gray-400'} mr-2`}></i>
								<span>At least one special character</span>
							</li>
						</ul>
					</div>

					<div className="flex justify-end">
						<button onClick={onChangePassword} disabled={account.currentPassword || account.newPassword || account.confirmPassword} className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${account.currentPassword && account.newPassword && account.confirmPassword ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
							<i className="fas fa-key mr-2"></i>
							Update Password
						</button>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Email Verification</h3>
				<div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
					<div className="flex items-center">
						<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center mr-4">
							<i className="fas fa-envelope text-green-600 dark:text-green-400 text-xl"></i>
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white">Email Address</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400">john.doe@example.com</p>
						</div>
					</div>
					<div>
						{account.emailVerified ? (
							<span className="px-4 py-2 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full cursor-pointer">
								<i className="fas fa-check-circle mr-1"></i>
								Verified
							</span>
						) : (
							<button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg text-sm cursor-pointer">Verify Email</button>
						)}
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Connected Accounts</h3>
				<div className="space-y-4">
					{account.connectedAccounts.map((acc) => (
						<div key={acc.provider} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
							<div className="flex items-center">
								<div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${acc.provider === 'google' ? 'bg-gradient-to-r from-red-500 to-orange-500' : acc.provider === 'github' ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-gray-700 to-gray-800'}`}>
									<i className={`fab fa-${acc.provider} text-white text-xl`}></i>
								</div>
								<div>
									<h4 className="font-semibold text-gray-900 dark:text-white capitalize">{acc.provider}</h4>
									{acc.connected ? <p className="text-sm text-gray-600 dark:text-gray-400">{acc.email || `@${acc.username}`}</p> : <p className="text-sm text-gray-500 dark:text-gray-500">Not connected</p>}
								</div>
							</div>
							<div>
								{acc.connected ? (
									<button onClick={() => onDisconnectAccount(acc.provider)} className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-300 cursor-pointer">
										Disconnect
									</button>
								) : (
									<button onClick={() => onConnectAccount(acc.provider)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
										Connect
									</button>
								)}
							</div>
						</div>
					))}
				</div>

				<div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
					<h4 className="font-semibold text-gray-900 dark:text-white mb-2">Why Connect Accounts?</h4>
					<p className="text-sm text-gray-600 dark:text-gray-400">Connecting accounts makes signing in easier and allows you to share your learning progress across platforms. We never post to your social accounts without your permission.</p>
				</div>
			</div>

			<div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
				<h3 className="font-semibold mb-4">Account Management</h3>
				<div className="space-y-3">
					<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
						<div className="flex items-center">
							<i className="fas fa-download mr-3"></i>
							<span>Download Your Data</span>
						</div>
						<i className="fas fa-arrow-right"></i>
					</button>
					<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
						<div className="flex items-center">
							<i className="fas fa-file-export mr-3"></i>
							<span>Export Learning History</span>
						</div>
						<i className="fas fa-arrow-right"></i>
					</button>
					<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
						<div className="flex items-center">
							<i className="fas fa-language mr-3"></i>
							<span>Language & Region</span>
						</div>
						<i className="fas fa-arrow-right"></i>
					</button>
				</div>
			</div>
		</div>
	)
}

export default AccountSettings