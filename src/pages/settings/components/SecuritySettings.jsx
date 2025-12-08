const SecuritySettings = ({ security, onEnable2FA, onDisable2FA, onTerminateSession, onTerminateAllSessions }) => {
	return (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold mb-2">Security Settings</h2>
						<p className="text-red-100">Protect your account with advanced security features</p>
					</div>
					<div className="mt-4 md:mt-0">
						<div className="flex items-center">
							<i className="fas fa-shield-alt text-3xl mr-4"></i>
							<div>
								<div className="text-2xl font-bold">{security.twoFactorEnabled ? 'Protected' : 'At Risk'}</div>
								<div className="text-sm text-red-200">{security.twoFactorEnabled ? '2FA Enabled' : 'Enable 2FA'}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<div className="flex items-start justify-between mb-6">
					<div>
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
						<p className="text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
					</div>
					<div>
						{security.twoFactorEnabled ? (
							<span className="px-4 py-2 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
								<i className="fas fa-check-circle mr-1"></i>
								Enabled
							</span>
						) : (
							<span className="px-4 py-2 text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">
								<i className="fas fa-exclamation-triangle mr-1"></i>
								Disabled
							</span>
						)}
					</div>
				</div>

				<div className="space-y-6">
					{security.twoFactorEnabled ? (
						<div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
							<div className="flex items-start">
								<i className="fas fa-shield-check text-green-500 text-2xl mr-4 mt-1"></i>
								<div className="flex-1">
									<h4 className="font-semibold text-gray-900 dark:text-white mb-2">2FA is Active</h4>
									<p className="text-gray-600 dark:text-gray-400 mb-4">Your account is protected with two-factor authentication using {security.twoFactorMethod}.</p>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-gray-700 dark:text-gray-300">Authentication Method</span>
											<span className="font-medium text-gray-900 dark:text-white capitalize">{security.twoFactorMethod}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-700 dark:text-gray-300">Last Used</span>
											<span className="font-medium text-gray-900 dark:text-white">2 hours ago</span>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-6 flex space-x-3">
								<button onClick={onDisable2FA} className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-300 cursor-pointer">
									<i className="fas fa-times mr-2"></i>
									Disable 2FA
								</button>
								<button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									<i className="fas fa-redo mr-2"></i>
									Regenerate Backup Codes
								</button>
							</div>
						</div>
					) : (
						<div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl">
							<div className="flex items-start">
								<i className="fas fa-exclamation-triangle text-red-500 text-2xl mr-4 mt-1"></i>
								<div className="flex-1">
									<h4 className="font-semibold text-gray-900 dark:text-white mb-2">2FA is Disabled</h4>
									<p className="text-gray-600 dark:text-gray-400 mb-4">Enable two-factor authentication to add an extra layer of security to your account.</p>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
										<div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
											<div className="flex items-center mb-2">
												<i className="fas fa-mobile-alt text-blue-500 text-xl mr-3"></i>
												<span className="font-medium text-gray-900 dark:text-white">Authenticator App</span>
											</div>
											<p className="text-sm text-gray-600 dark:text-gray-400">Use apps like Google Authenticator or Authy</p>
										</div>
										<div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
											<div className="flex items-center mb-2">
												<i className="fas fa-sms text-green-500 text-xl mr-3"></i>
												<span className="font-medium text-gray-900 dark:text-white">SMS Verification</span>
											</div>
											<p className="text-sm text-gray-600 dark:text-gray-400">Receive codes via text message</p>
										</div>
									</div>
								</div>
							</div>
							<button onClick={onEnable2FA} className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer">
								<i className="fas fa-lock mr-2"></i>
								Enable Two-Factor Authentication
							</button>
						</div>
					)}

					{security.twoFactorEnabled && security.backupCodes && (
						<div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-3">Backup Codes</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Save these backup codes in a secure place. Each code can be used once if you lose access to your authenticator app.</p>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
								{security.backupCodes.map((code, index) => (
									<div key={index} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center font-mono">
										{code}
									</div>
								))}
							</div>
							<button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer">
								<i className="fas fa-download mr-1"></i>
								Download Backup Codes
							</button>
						</div>
					)}
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Logged-in Devices</h3>
						<p className="text-gray-600 dark:text-gray-400">
							{security.activeSessions} active session{security.activeSessions !== 1 ? 's' : ''}
						</p>
					</div>
					<button onClick={onTerminateAllSessions} className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-300 cursor-pointer">
						<i className="fas fa-sign-out-alt mr-2"></i>
						Log Out All Devices
					</button>
				</div>

				<div className="space-y-4">
					{security.loggedInDevices.map((device) => (
						<div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
							<div className="flex items-center">
								<div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${device.current ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`}>
									<i className={`fas ${device.device.includes('Mac') ? 'fa-laptop' : device.device.includes('iPhone') ? 'fa-mobile-alt' : 'fa-desktop'} text-white`}></i>
								</div>
								<div>
									<h4 className="font-semibold text-gray-900 dark:text-white">
										{device.device}
										{device.current && <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Current Device</span>}
									</h4>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										{device.browser} • {device.location} • Last active: {device.lastActive}
									</div>
								</div>
							</div>
							{!device.current && (
								<button onClick={() => onTerminateSession(device.id)} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									Log Out
								</button>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">IP Login History</h3>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50">
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">IP Address</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Location</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
							</tr>
						</thead>
						<tbody>
							{security.ipHistory.map((ip, index) => (
								<tr key={index} className="border-b border-gray-200 dark:border-gray-700">
									<td className="py-4 px-4">
										<div className="font-mono text-gray-900 dark:text-white">{ip.ip}</div>
									</td>
									<td className="py-4 px-4">
										<div className="text-gray-900 dark:text-white">{ip.location}</div>
									</td>
									<td className="py-4 px-4">
										<div className="text-gray-900 dark:text-white">{ip.date}</div>
									</td>
									<td className="py-4 px-4">
										<span className={`px-3 py-1 text-xs font-medium rounded-full ${ip.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>{ip.status.charAt(0).toUpperCase() + ip.status.slice(1)}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
					<div className="flex items-center">
						<i className="fas fa-info-circle text-blue-500 mr-3"></i>
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white">Security Monitoring</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400">We monitor login activity for suspicious behavior. You'll be notified of any unusual activity.</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
				<h3 className="font-semibold mb-4">Security Tips</h3>
				<div className="space-y-4">
					<div className="flex items-start">
						<i className="fas fa-check-circle mt-1 mr-3"></i>
						<div>
							<h4 className="font-medium mb-1">Use a Strong Password</h4>
							<p className="text-red-100 text-sm">Combine letters, numbers, and special characters</p>
						</div>
					</div>
					<div className="flex items-start">
						<i className="fas fa-check-circle mt-1 mr-3"></i>
						<div>
							<h4 className="font-medium mb-1">Enable Two-Factor Authentication</h4>
							<p className="text-red-100 text-sm">Add an extra layer of security to your account</p>
						</div>
					</div>
					<div className="flex items-start">
						<i className="fas fa-check-circle mt=1 mr-3"></i>
						<div>
							<h4 className="font-medium mb-1">Review Login Activity</h4>
							<p className="text-red-100 text-sm">Regularly check your logged-in devices</p>
						</div>
					</div>
					<div className="flex items-start">
						<i className="fas fa-check-circle mt=1 mr-3"></i>
						<div>
							<h4 className="font-medium mb-1">Log Out from Shared Devices</h4>
							<p className="text-red-100 text-sm">Always sign out from public computers</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SecuritySettings