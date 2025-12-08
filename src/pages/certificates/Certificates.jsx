import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../../components/layout/MainLayout'
import CertificateCard from './components/CertificateCard'
import InProgressCertificate from './components/InProgressCertificate'
import CertificateVerification from './components/CertificateVerification'
import CertificateModal from './components/CertificateModal'

const Certificates = () => {
	const [activeTab, setActiveTab] = useState('achieved')
	const [selectedCertificate, setSelectedCertificate] = useState(null)
	const [verificationResult, setVerificationResult] = useState(null)

	const tabs = [
		{ id: 'achieved', label: 'Achieved Certificates', icon: 'fas fa-award', count: 5 },
		{ id: 'in-progress', label: 'In Progress', icon: 'fas fa-spinner', count: 3 },
		{ id: 'verification', label: 'Verification', icon: 'fas fa-check-circle', count: null },
	]

	const achievedCertificates = [
		{
			id: 'CERT-2024-001',
			courseId: 'REACT-101',
			courseName: 'Advanced React & Next.js',
			issueDate: '2024-03-15',
			expiryDate: null, // Lifetime access
			grade: 'A+',
			score: 98,
			instructor: 'Sarah Johnson',
			verificationUrl: 'https://eduforge.com/verify/CERT-2024-001',
			qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://eduforge.com/verify/CERT-2024-001',
			downloadUrl: '/certificates/CERT-2024-001.pdf',
			shareCount: 12,
			views: 45,
			skills: ['React Hooks', 'Next.js', 'TypeScript', 'SSR', 'Performance'],
		},
		{
			id: 'CERT-2024-002',
			courseId: 'JS-202',
			courseName: 'Full Stack JavaScript',
			issueDate: '2024-02-28',
			expiryDate: '2027-02-28',
			grade: 'A',
			score: 95,
			instructor: 'Michael Chen',
			verificationUrl: 'https://eduforge.com/verify/CERT-2024-002',
			qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://eduforge.com/verify/CERT-2024-002',
			downloadUrl: '/certificates/CERT-2024-002.pdf',
			shareCount: 8,
			views: 32,
			skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication'],
		},
		{
			id: 'CERT-2024-003',
			courseId: 'DESIGN-101',
			courseName: 'UI/UX Design Masterclass',
			issueDate: '2024-02-15',
			expiryDate: null,
			grade: 'A+',
			score: 99,
			instructor: 'Emma Wilson',
			verificationUrl: 'https://eduforge.com/verify/CERT-2024-003',
			qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://eduforge.com/verify/CERT-2024-003',
			downloadUrl: '/certificates/CERT-2024-003.pdf',
			shareCount: 15,
			views: 56,
			skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
		},
		{
			id: 'CERT-2024-004',
			courseId: 'DATA-101',
			courseName: 'Machine Learning Fundamentals',
			issueDate: '2024-01-30',
			expiryDate: '2026-01-30',
			grade: 'A-',
			score: 92,
			instructor: 'Dr. Alex Rodriguez',
			verificationUrl: 'https://eduforge.com/verify/CERT-2024-004',
			qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://eduforge.com/verify/CERT-2024-004',
			downloadUrl: '/certificates/CERT-2024-004.pdf',
			shareCount: 6,
			views: 28,
			skills: ['Python', 'Scikit-learn', 'TensorFlow', 'Data Analysis', 'Model Evaluation'],
		},
		{
			id: 'CERT-2024-005',
			courseId: 'WEB-101',
			courseName: 'Complete Web Developer',
			issueDate: '2023-12-20',
			expiryDate: null,
			grade: 'B+',
			score: 88,
			instructor: 'Robert Garcia',
			verificationUrl: 'https://eduforge.com/verify/CERT-2024-005',
			qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://eduforge.com/verify/CERT-2024-005',
			downloadUrl: '/certificates/CERT-2024-005.pdf',
			shareCount: 10,
			views: 41,
			skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Deployment'],
		},
	]

	const inProgressCertificates = [
		{
			id: 'PROG-001',
			courseId: 'NEXT-301',
			courseName: 'Advanced Next.js & React Patterns',
			progress: 75,
			estimatedCompletion: '2024-04-10',
			modulesCompleted: 9,
			totalModules: 12,
			requiredScore: 85,
			currentScore: 92,
			skills: ['Server Components', 'Middleware', 'Optimization', 'Advanced Patterns'],
		},
		{
			id: 'PROG-002',
			courseId: 'CLOUD-201',
			courseName: 'Cloud Computing with AWS',
			progress: 45,
			estimatedCompletion: '2024-05-15',
			modulesCompleted: 6,
			totalModules: 14,
			requiredScore: 80,
			currentScore: 78,
			skills: ['EC2', 'S3', 'Lambda', 'RDS', 'CloudFront'],
		},
		{
			id: 'PROG-003',
			courseId: 'DEV-301',
			courseName: 'DevOps & CI/CD Pipeline',
			progress: 30,
			estimatedCompletion: '2024-06-01',
			modulesCompleted: 3,
			totalModules: 10,
			requiredScore: 85,
			currentScore: 82,
			skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Monitoring'],
		},
	]

	const certificateStats = {
		total: achievedCertificates.length,
		avgScore: Math.round(achievedCertificates.reduce((acc, cert) => acc + cert.score, 0) / achievedCertificates.length),
		totalShares: achievedCertificates.reduce((acc, cert) => acc + cert.shareCount, 0),
		totalViews: achievedCertificates.reduce((acc, cert) => acc + cert.views, 0),
	}

	const handleCertificateClick = (certificate) => {
		setSelectedCertificate(certificate)
	}

	const handleCloseCertificate = () => {
		setSelectedCertificate(null)
	}

	const handleVerifyCertificate = (certificateId) => {
		const certificate = achievedCertificates.find((cert) => cert.id === certificateId)
		if (certificate) {
			setVerificationResult({
				valid: true,
				certificate,
				verifiedAt: new Date().toISOString(),
			})
		} else {
			setVerificationResult({
				valid: false,
				message: 'Certificate not found or invalid',
				verifiedAt: new Date().toISOString(),
			})
		}
	}

	const handleShareCertificate = (certificate, platform) => {
		const message = `I earned a certificate in ${certificate.courseName} from EduForge!`
		const url = certificate.verificationUrl

		switch (platform) {
			case 'linkedin':
				window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
				break
			case 'twitter':
				window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`, '_blank')
				break
			case 'facebook':
				window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
				break
			default:
				navigator.clipboard.writeText(`${message} ${url}`)
				alert('Certificate link copied to clipboard!')
		}
	}

	const handleDownloadAll = () => {
		alert('Downloading all certificates as ZIP...')
	}

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Certificates</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Showcase your achievements and verify certificates</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button onClick={handleDownloadAll} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<i className="fas fa-download mr-2"></i>
							Download All
						</button>
						<button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-share-alt mr-2"></i>
							Share Profile
						</button>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Certificates</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{certificateStats.total}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
								<i className="fas fa-award text-purple-600 dark:text-purple-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{certificateStats.avgScore}%</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
								<i className="fas fa-chart-line text-green-600 dark:text-green-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Shares</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{certificateStats.totalShares}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
								<i className="fas fa-share-alt text-blue-600 dark:text-blue-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{certificateStats.totalViews}</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 flex items-center justify-center">
								<i className="fas fa-eye text-yellow-600 dark:text-yellow-400 text-xl"></i>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
				<div className="border-b border-gray-200 dark:border-gray-700">
					<nav className="-mb-px flex space-x-8 overflow-x-auto">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => {
									setActiveTab(tab.id)
									setSelectedCertificate(null)
									setVerificationResult(null)
								}}
								className={` whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${activeTab === tab.id ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
							>
								<i className={`${tab.icon} mr-2`}></i>
								{tab.label}
								{tab.count !== null && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">{tab.count}</span>}
							</button>
						))}
					</nav>
				</div>
			</motion.div>

			<AnimatePresence mode="wait">
				<motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
					{activeTab === 'achieved' && (
						<div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
								{achievedCertificates.map((certificate, index) => (
									<motion.div key={certificate.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
										<CertificateCard certificate={certificate} onClick={() => handleCertificateClick(certificate)} onShare={handleShareCertificate} />
									</motion.div>
								))}
							</div>

							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
									<i className="fas fa-code-branch text-purple-500 mr-2"></i>
									Skills Earned
								</h3>
								<div className="flex flex-wrap gap-3">
									{Array.from(new Set(achievedCertificates.flatMap((cert) => cert.skills))).map((skill, index) => (
										<span key={skill} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300">
											<i className="fas fa-check-circle text-green-500 mr-2"></i>
											{skill}
										</span>
									))}
								</div>
							</motion.div>
						</div>
					)}

					{activeTab === 'in-progress' && (
						<div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
								{inProgressCertificates.map((certificate, index) => (
									<motion.div key={certificate.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
										<InProgressCertificate certificate={certificate} />
									</motion.div>
								))}
							</div>

							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
								<div className="flex flex-col md:flex-row md:items-center justify-between">
									<div>
										<h3 className="text-xl font-bold mb-2">Keep Learning!</h3>
										<p className="text-blue-100">Complete {inProgressCertificates.length} courses to earn new certificates</p>
										<div className="mt-4 flex items-center">
											<i className="fas fa-trophy text-3xl mr-4"></i>
											<div>
												<div className="text-2xl font-bold">{Math.round(inProgressCertificates.reduce((acc, cert) => acc + cert.progress, 0) / inProgressCertificates.length)}%</div>
												<div className="text-blue-200">Average Progress</div>
											</div>
										</div>
									</div>
									<button className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
										<i className="fas fa-rocket mr-2"></i>
										Continue Learning
									</button>
								</div>
							</motion.div>
						</div>
					)}

					{activeTab === 'verification' && <CertificateVerification onVerify={handleVerifyCertificate} verificationResult={verificationResult} certificates={achievedCertificates} />}
				</motion.div>
			</AnimatePresence>

			<AnimatePresence>{selectedCertificate && <CertificateModal certificate={selectedCertificate} onClose={handleCloseCertificate} onShare={handleShareCertificate} />}</AnimatePresence>
		</MainLayout>
	)
}

export default Certificates
