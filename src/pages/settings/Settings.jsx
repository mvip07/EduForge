import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import MainLayout from '../../components/layout/MainLayout'
import AvatarModal from './components/AvatarModal'
import TwoFactorModal from './components/TwoFactorModal'
import DataExportModal from './components/DataExportModal'
import SecuritySettings from './components/SecuritySettings'
import PrivacySettings from './components/PrivacySettings'
import AccountSettings from './components/AccountSettings'
import ProfileSettings from './components/ProfileSettings'
import NotificationSettings from './components/NotificationSettings'

const Settings = () => {
	const [activeSection, setActiveSection] = useState('profile')
	const [showAvatarModal, setShowAvatarModal] = useState(false)
	const [show2FAModal, setShow2FAModal] = useState(false)
	const [showExportModal, setShowExportModal] = useState(false)
	const { user, updateProfile } = useAuth()

	const [profile, setProfile] = useState({
		name: user?.name || 'John Doe',
		email: user?.email || 'john.doe@example.com',
		username: 'johndoe',
		bio: 'Full stack developer passionate about React, Node.js, and cloud technologies. Always learning!',
		avatar: 'JD',
		location: 'San Francisco, CA',
		website: 'https://johndoe.dev',
		twitter: '@johndoe',
		github: 'johndoe',
	})

	const [account, setAccount] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
		emailVerified: true,
		connectedAccounts: [
			{ provider: 'google', connected: true, email: 'john.doe@gmail.com' },
			{ provider: 'github', connected: true, username: 'johndoe' },
			{ provider: 'apple', connected: false },
		],
	})

	const [privacy, setPrivacy] = useState({
		profileVisibility: 'public',
		showOnlineStatus: true,
		showCourses: true,
		showAchievements: true,
		showActivity: true,
		allowMessages: 'everyone',
		allowFriendRequests: 'everyone',
		dataSharing: {
			analytics: true,
			personalizedAds: false,
			research: false,
		},
	})

	const [notifications, setNotifications] = useState({
		email: {
			courseUpdates: true,
			assignmentDeadlines: true,
			liveSessions: true,
			forumReplies: true,
			promotional: false,
			weeklyDigest: true,
		},
		push: {
			courseUpdates: true,
			assignmentDeadlines: true,
			liveSessions: true,
			messages: true,
			achievementUnlocks: true,
		},
		sms: {
			urgentDeadlines: true,
			liveSessionReminders: false,
			securityAlerts: true,
		},
		doNotDisturb: {
			enabled: false,
			startTime: '22:00',
			endTime: '07:00',
			days: ['sat', 'sun'],
		},
	})

	const [security, setSecurity] = useState({
		twoFactorEnabled: false,
		twoFactorMethod: 'app',
		backupCodes: ['123456', '654321', '987654'],
		loggedInDevices: [
			{ id: 1, device: 'MacBook Pro', browser: 'Chrome', location: 'San Francisco', lastActive: '2 hours ago', current: true },
			{ id: 2, device: 'iPhone 13', browser: 'Safari', location: 'San Francisco', lastActive: '1 day ago', current: false },
			{ id: 3, device: 'Windows PC', browser: 'Firefox', location: 'New York', lastActive: '1 week ago', current: false },
		],
		activeSessions: 3,
		ipHistory: [
			{ ip: '192.168.1.1', location: 'San Francisco, US', date: '2024-03-15', status: 'active' },
			{ ip: '10.0.0.1', location: 'New York, US', date: '2024-03-10', status: 'inactive' },
			{ ip: '172.16.0.1', location: 'London, UK', date: '2024-03-05', status: 'inactive' },
		],
	})

	const settingsSections = [
		{ id: 'profile', label: 'Profile', icon: 'fas fa-user', color: 'from-purple-500 to-indigo-600' },
		{ id: 'account', label: 'Account', icon: 'fas fa-cog', color: 'from-blue-500 to-cyan-600' },
		{ id: 'privacy', label: 'Privacy', icon: 'fas fa-shield-alt', color: 'from-green-500 to-emerald-600' },
		{ id: 'notifications', label: 'Notifications', icon: 'fas fa-bell', color: 'from-yellow-500 to-orange-600' },
		{ id: 'security', label: 'Security', icon: 'fas fa-lock', color: 'from-red-500 to-pink-600' },
	]

	const avatarColors = ['from-purple-500 to-indigo-600', 'from-blue-500 to-cyan-600', 'from-green-500 to-emerald-600', 'from-yellow-500 to-orange-600', 'from-red-500 to-pink-600', 'from-pink-500 to-rose-600']

	const handleProfileUpdate = () => {
		updateProfile(profile)
		alert('Profile updated successfully!')
	}

	const handlePasswordChange = () => {
		if (account.newPassword !== account.confirmPassword) {
			alert('New passwords do not match')
			return
		}
		if (account.newPassword.length < 8) {
			alert('Password must be at least 8 characters')
			return
		}
		alert('Password changed successfully!')
		setAccount({
			...account,
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		})
	}

	const handleConnectAccount = (provider) => {
		alert(`Connecting ${provider} account...`)
	}

	const handleDisconnectAccount = (provider) => {
		if (provider === 'google' && account.connectedAccounts.filter((c) => c.connected).length === 1) {
			alert('You must have at least one connected account')
			return
		}
		setAccount({
			...account,
			connectedAccounts: account.connectedAccounts.map((acc) => (acc.provider === provider ? { ...acc, connected: false } : acc)),
		})
	}

	const handleEnable2FA = () => {
		setShow2FAModal(true)
	}

	const handleDisable2FA = () => {
		if (window.confirm('Are you sure you want to disable two-factor authentication? This reduces your account security.')) {
			setSecurity({ ...security, twoFactorEnabled: false })
		}
	}

	const handleConfirm2FA = () => {
		setSecurity({ ...security, twoFactorEnabled: true })
		setShow2FAModal(false)
	}

	const handleExportData = () => {
		setShowExportModal(true)
	}

	const handleDownloadData = (format) => {
		alert(`Downloading your data in ${format} format...`)
		setShowExportModal(false)
	}

	const handleTerminateSession = (deviceId) => {
		setSecurity({
			...security,
			loggedInDevices: security.loggedInDevices.filter((device) => device.id !== deviceId),
			activeSessions: security.activeSessions - 1,
		})
	}

	const handleTerminateAllSessions = () => {
		if (window.confirm('This will log you out from all devices except this one. Continue?')) {
			setSecurity({
				...security,
				loggedInDevices: security.loggedInDevices.filter((device) => device.current),
				activeSessions: 1,
			})
		}
	}

	const handleAvatarSelect = (color) => {
		setProfile({ ...profile, avatar: 'JD' })
		setShowAvatarModal(false)
	}

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Manage your profile, security, and preferences</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button
							onClick={() => {
								if (activeSection === 'profile') handleProfileUpdate()
								if (activeSection === 'account' && account.newPassword) handlePasswordChange()
							}}
							className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
						>
							<i className="fas fa-save mr-2"></i>
							Save Changes
						</button>
						<button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-undo mr-2"></i>
							Reset
						</button>
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<div className="lg:col-span-1">
					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ">
						<div className="p-6 border-b border-gray-200 dark:border-gray-700">
							<div className="flex items-center mb-4">
								<div className="relative">
									<div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">{profile.avatar}</div>
									<button onClick={() => setShowAvatarModal(true)} className="absolute bottom-0 right-0 w-6 h-6 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-700 cursor-pointer">
										<i className="fas fa-camera"></i>
									</button>
								</div>
								<div className="ml-4">
									<h3 className="font-bold text-gray-900 dark:text-white">{profile.name}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">@{profile.username}</p>
									<div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
										<i className="fas fa-shield-check text-green-500 mr-1"></i>
										<span>Account verified</span>
									</div>
								</div>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
									<i className="fas fa-crown mr-2"></i>
									Pro Member
								</div>
							</div>
						</div>

						<nav className="p-4">
							<div className="space-y-2">
								{settingsSections.map((section) => (
									<button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 cursot-pointer ${activeSection === section.id ? `bg-gradient-to-r ${section.color} text-white shadow-lg` : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
										<i className={`${section.icon} mr-3`}></i>
										<span className="font-medium">{section.label}</span>
										{activeSection === section.id && <i className="fas fa-chevron-right ml-auto"></i>}
									</button>
								))}
							</div>
						</nav>

						<div className="p-4 border-t border-gray-200 dark:border-gray-700">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-3">Account Status</h4>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-sm text-gray-600 dark:text-gray-400">Member since</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">Jan 2023</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-gray-600 dark:text-gray-400">Last login</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">2 hours ago</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-gray-600 dark:text-gray-400">Active sessions</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">{security.activeSessions}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-gray-600 dark:text-gray-400">Storage used</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">1.2 GB / 5 GB</span>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="font-semibold mb-4">Danger Zone</h3>
						<div className="space-y-3">
							<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fas fa-archive mr-3"></i>
									<span>Deactivate Account</span>
								</div>
								<i className="fas fa-chevron-right"></i>
							</button>
							<button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 cursor-pointer">
								<div className="flex items-center">
									<i className="fas fa-trash mr-3"></i>
									<span>Delete Account</span>
								</div>
								<i className="fas fa-chevron-right"></i>
							</button>
						</div>
						<p className="text-sm text-red-100 mt-4">
							<i className="fas fa-exclamation-triangle mr-1"></i>
							These actions are permanent and cannot be undone
						</p>
					</div>
				</div>

				<div className="lg:col-span-3">
					<AnimatePresence mode="wait">
						<motion.div key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
							{activeSection === 'profile' && <ProfileSettings profile={profile} setProfile={setProfile} onAvatarClick={() => setShowAvatarModal(true)} />}

							{activeSection === 'account' && <AccountSettings account={account} setAccount={setAccount} onConnectAccount={handleConnectAccount} onDisconnectAccount={handleDisconnectAccount} onChangePassword={handlePasswordChange} />}

							{activeSection === 'privacy' && <PrivacySettings privacy={privacy} setPrivacy={setPrivacy} onExportData={handleExportData} />}

							{activeSection === 'notifications' && <NotificationSettings notifications={notifications} setNotifications={setNotifications} />}

							{activeSection === 'security' && <SecuritySettings security={security} onEnable2FA={handleEnable2FA} onDisable2FA={handleDisable2FA} onTerminateSession={handleTerminateSession} onTerminateAllSessions={handleTerminateAllSessions} />}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			<AnimatePresence>{showAvatarModal && <AvatarModal onClose={() => setShowAvatarModal(false)} onSelect={handleAvatarSelect} colors={avatarColors} currentAvatar={profile.avatar} />}</AnimatePresence>

			<AnimatePresence>{show2FAModal && <TwoFactorModal onClose={() => setShow2FAModal(false)} onConfirm={handleConfirm2FA} />}</AnimatePresence>

			<AnimatePresence>{showExportModal && <DataExportModal onClose={() => setShowExportModal(false)} onDownload={handleDownloadData} />}</AnimatePresence>
		</MainLayout>
	)
}

export default Settings
