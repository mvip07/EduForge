import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CertificateVerification = ({ onVerify, verificationResult, certificates }) => {
	const [verificationId, setVerificationId] = useState('')
	const [isValidating, setIsValidating] = useState(false)
	const [verificationHistory, setVerificationHistory] = useState([])
	const [activeTab, setActiveTab] = useState('verify')

	useEffect(() => {
		const savedHistory = localStorage.getItem('certificateVerificationHistory')
		if (savedHistory) {
			setVerificationHistory(JSON.parse(savedHistory))
		}
	}, [])

	useEffect(() => {
		if (verificationHistory.length > 0) {
			localStorage.setItem('certificateVerificationHistory', JSON.stringify(verificationHistory))
		}
	}, [verificationHistory])

	const handleVerify = () => {
		if (!verificationId.trim()) {
			alert('Please enter a certificate ID')
			return
		}

		setIsValidating(true)

		setTimeout(() => {
			onVerify(verificationId)

			const newHistory = {
				id: verificationId,
				timestamp: new Date().toISOString(),
				result: verificationResult ? 'Valid' : 'Invalid',
				searchedAt: new Date().toLocaleString(),
			}

			setVerificationHistory((prev) => [newHistory, ...prev.slice(0, 9)]) // Keep last 10
			setIsValidating(false)
		}, 1500)
	}

	const handleQuickVerify = (certificateId) => {
		setVerificationId(certificateId)
		handleVerify()
	}

	const handleClearHistory = () => {
		setVerificationHistory([])
		localStorage.removeItem('certificateVerificationHistory')
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	return (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold mb-2">Verify Certificates</h2>
						<p className="text-purple-100">Validate certificate authenticity with our secure verification system</p>
					</div>
					<div className="mt-4 md:mt-0">
						<div className="flex items-center">
							<i className="fas fa-shield-alt text-3xl mr-4"></i>
							<div>
								<div className="text-2xl font-bold">100% Secure</div>
								<div className="text-sm text-purple-200">Blockchain Verified</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
						<button onClick={() => setActiveTab('verify')} className={`flex-1 py-3 text-center font-medium text-sm cursor-pointer ${activeTab === 'verify' ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}>
							<i className="fas fa-search mr-2"></i>
							Verify Certificate
						</button>
						<button onClick={() => setActiveTab('history')} className={`flex-1 py-3 text-center font-medium text-sm cursor-pointer ${activeTab === 'history' ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}>
							<i className="fas fa-history mr-2"></i>
							Verification History
						</button>
					</div>

					<AnimatePresence mode="wait">
						{activeTab === 'verify' ? (
							<motion.div key="verify" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
								<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Enter Certificate ID</h3>
									<div className="flex">
										<input type="text" value={verificationId} onChange={(e) => setVerificationId(e.target.value)} placeholder="Enter certificate ID (e.g., CERT-2024-001)" className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
										<button onClick={handleVerify} disabled={isValidating || !verificationId.trim()} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-r-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold cursor-pointer">
											{isValidating ? (
												<>
													<i className="fas fa-spinner fa-spin mr-2"></i>
													Verifying...
												</>
											) : (
												<>
													<i className="fas fa-check-circle mr-2"></i>
													Verify Now
												</>
											)}
										</button>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
										<i className="fas fa-info-circle mr-2"></i>
										Find the certificate ID on the bottom of your certificate
									</p>
								</div>

								{/* Verification Result */}
								{verificationResult && (
									<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
										<div className={`p-4 rounded-xl mb-6 ${verificationResult.valid ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
											<div className="flex items-center">
												<div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${verificationResult.valid ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}>
													<i className={`fas ${verificationResult.valid ? 'fa-check' : 'fa-times'} text-xl ${verificationResult.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}></i>
												</div>
												<div>
													<h4 className="text-lg font-bold text-gray-900 dark:text-white">{verificationResult.valid ? 'Certificate Valid!' : 'Certificate Invalid'}</h4>
													<p className="text-gray-600 dark:text-gray-400">{verificationResult.valid ? 'This certificate has been verified and is authentic.' : verificationResult.message}</p>
												</div>
											</div>
										</div>

										{verificationResult.valid && verificationResult.certificate && (
											<div className="space-y-4">
												<h5 className="font-semibold text-gray-900 dark:text-white">Certificate Details</h5>
												<div className="grid grid-cols-2 gap-4">
													<div>
														<p className="text-sm text-gray-600 dark:text-gray-400">Course Name</p>
														<p className="font-medium text-gray-900 dark:text-white">{verificationResult.certificate.courseName}</p>
													</div>
													<div>
														<p className="text-sm text-gray-600 dark:text-gray-400">Certificate ID</p>
														<p className="font-medium text-gray-900 dark:text-white">{verificationResult.certificate.id}</p>
													</div>
													<div>
														<p className="text-sm text-gray-600 dark:text-gray-400">Issued To</p>
														<p className="font-medium text-gray-900 dark:text-white">John Doe</p>
													</div>
													<div>
														<p className="text-sm text-gray-600 dark:text-gray-400">Issue Date</p>
														<p className="font-medium text-gray-900 dark:text-white">{new Date(verificationResult.certificate.issueDate).toLocaleDateString()}</p>
													</div>
													<div>
														<p className="text-sm text-gray-600 dark:text-gray-400">Grade</p>
														<p className="font-medium text-gray-900 dark:text-white">
															{verificationResult.certificate.grade} ({verificationResult.certificate.score}%)
														</p>
													</div>
													<div>
														<p className="text-sm text-gray-600 dark:text-gray-400">Verified At</p>
														<p className="font-medium text-gray-900 dark:text-white">{formatDate(verificationResult.verifiedAt)}</p>
													</div>
												</div>

												<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
													<div className="flex space-x-3">
														<button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
															<i className="fas fa-print mr-2"></i>
															Print Verification Report
														</button>
														<button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
															<i className="fas fa-share-alt mr-2"></i>
															Share Result
														</button>
													</div>
												</div>
											</div>
										)}
									</motion.div>
								)}

								<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Verify Your Certificates</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{certificates.slice(0, 4).map((cert) => (
											<button key={cert.id} onClick={() => handleQuickVerify(cert.id)} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-colors duration-300 cursor-pointer">
												<div className="flex items-center">
													<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mr-3">
														<i className="fas fa-award text-purple-600 dark:text-purple-400"></i>
													</div>
													<div className="text-left">
														<p className="font-medium text-gray-900 dark:text-white text-sm">{cert.courseName}</p>
														<p className="text-xs text-gray-600 dark:text-gray-400">ID: {cert.id}</p>
													</div>
												</div>
												<i className="fas fa-chevron-right text-gray-400"></i>
											</button>
										))}
									</div>
								</div>
							</motion.div>
						) : (
							<motion.div key="history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
								<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
									<div className="flex justify-between items-center mb-6">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white">Verification History</h3>
										<button onClick={handleClearHistory} className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer" disabled={verificationHistory.length === 0}>
											<i className="fas fa-trash mr-2"></i>
											Clear History
										</button>
									</div>

									{verificationHistory.length > 0 ? (
										<div className="space-y-4">
											{verificationHistory.map((item, index) => (
												<div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
													<div className="flex items-center">
														<div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${item.result === 'Valid' ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}>
															<i className={`fas ${item.result === 'Valid' ? 'fa-check' : 'fa-times'} ${item.result === 'Valid' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}></i>
														</div>
														<div>
															<p className="font-medium text-gray-900 dark:text-white">Certificate ID: {item.id}</p>
															<p className="text-sm text-gray-600 dark:text-gray-400">{item.searchedAt}</p>
														</div>
													</div>
													<span className={`px-3 py-1 text-xs font-medium rounded-full ${item.result === 'Valid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>{item.result}</span>
												</div>
											))}
										</div>
									) : (
										<div className="text-center py-12">
											<i className="fas fa-history text-4xl text-gray-400 mb-4"></i>
											<p className="text-gray-600 dark:text-gray-400">No verification history yet</p>
											<p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start verifying certificates to see your history here</p>
										</div>
									)}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className="space-y-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							<i className="fas fa-shield-alt text-purple-500 mr-2"></i>
							Verification Features
						</h3>
						<ul className="space-y-3">
							<li className="flex items-start">
								<i className="fas fa-check text-green-500 mt-1 mr-3"></i>
								<span className="text-gray-700 dark:text-gray-300">Blockchain-verified authenticity</span>
							</li>
							<li className="flex items-start">
								<i className="fas fa-check text-green-500 mt-1 mr-3"></i>
								<span className="text-gray-700 dark:text-gray-300">Public URL verification</span>
							</li>
							<li className="flex items-start">
								<i className="fas fa-check text-green-500 mt-1 mr-3"></i>
								<span className="text-gray-700 dark:text-gray-300">QR code scanning support</span>
							</li>
							<li className="flex items-start">
								<i className="fas fa-check text-green-500 mt-1 mr-3"></i>
								<span className="text-gray-700 dark:text-gray-300">Printable verification reports</span>
							</li>
							<li className="flex items-start">
								<i className="fas fa-check text-green-500 mt=1 mr-3"></i>
								<span className="text-gray-700 dark:text-gray-300">Secure API for employers</span>
							</li>
						</ul>
					</div>

					<div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="text-lg font-semibold mb-4">
							<i className="fas fa-question-circle mr-2"></i>
							How to Verify
						</h3>
						<ol className="space-y-3 text-sm">
							<li className="flex items-start">
								<span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">1</span>
								<span>Enter the certificate ID from the certificate</span>
							</li>
							<li className="flex items-start">
								<span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">2</span>
								<span>Click "Verify Now" to check authenticity</span>
							</li>
							<li className="flex items-start">
								<span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">3</span>
								<span>View verification result and details</span>
							</li>
							<li className="flex items-start">
								<span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">4</span>
								<span>Download or share verification report</span>
							</li>
						</ol>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							<i className="fas fa-link text-purple-500 mr-2"></i>
							Public Verification URLs
						</h3>
						<div className="space-y-3">
							<div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Certificate Verification URL:</p>
								<p className="font-mono text-sm text-purple-600 dark:text-purple-400 break-all">https://eduforge.com/verify/[certificate-id]</p>
							</div>
							<div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Example URL:</p>
								<p className="font-mono text-sm text-blue-600 dark:text-blue-400 break-all">https://eduforge.com/verify/CERT-2024-001</p>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-500">
								<i className="fas fa-info-circle mr-1"></i>
								Share these URLs with employers for instant verification
							</p>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							<i className="fas fa-qrcode text-purple-500 mr-2"></i>
							QR Code Scanner
						</h3>
						<div className="text-center">
							<div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
								<i className="fas fa-camera text-3xl text-gray-400"></i>
							</div>
							<button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
								<i className="fas fa-camera mr-2"></i>
								Scan QR Code
							</button>
							<p className="text-xs text-gray-500 dark:text-gray-500 mt-3">Scan the QR code on any EduForge certificate</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl">
				<div className="flex flex-col lg:flex-row lg:items-center justify-between">
					<div>
						<h3 className="text-xl font-bold mb-2">API for Employers</h3>
						<p className="text-gray-300">Integrate our verification API into your HR systems</p>
						<div className="mt-4">
							<code className="bg-gray-900 px-4 py-2 rounded-lg text-sm font-mono">
								GET https://api.eduforge.com/v1/verify/{'{'}certificate_id{'}'}
							</code>
						</div>
					</div>
					<div className="mt-6 lg:mt-0">
						<button className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-code mr-2"></i>
							View API Documentation
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CertificateVerification
