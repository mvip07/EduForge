import { motion } from 'framer-motion'

const CertificateModal = ({ certificate, onClose, onShare }) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificate Details</h2>
						<button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-times text-xl"></i>
						</button>
					</div>
				</div>

				<div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2">
							<div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-8">
								<div className="text-center mb-8">
									<div className="flex justify-center mb-4">
										<div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white">
											<i className="fas fa-award text-2xl"></i>
										</div>
									</div>
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Certificate of Completion</h3>
									<p className="text-gray-600 dark:text-gray-400">This certifies that</p>
								</div>

								<div className="text-center mb-8">
									<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{certificate.courseName}</h2>
									<p className="text-gray-600 dark:text-gray-400">has been successfully completed by</p>
									<div className="mt-4">
										<div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg">
											<div className="text-xl font-bold">John Doe</div>
											<div className="text-sm opacity-90">Student ID: STD-2024-001</div>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4 mb-8">
									<div className="text-center">
										<div className="text-sm text-gray-600 dark:text-gray-400">Issued On</div>
										<div className="font-semibold text-gray-900 dark:text-white">
											{new Date(certificate.issueDate).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</div>
									</div>
									<div className="text-center">
										<div className="text-sm text-gray-600 dark:text-gray-400">Grade</div>
										<div className="font-semibold text-gray-900 dark:text-white">
											{certificate.grade} ({certificate.score}%)
										</div>
									</div>
								</div>

								<div className="text-center border-t border-amber-200 dark:border-amber-800 pt-6">
									<p className="text-sm text-gray-600 dark:text-gray-400">Verify this certificate at:</p>
									<p className="font-mono text-sm text-purple-600 dark:text-purple-400 break-all">{certificate.verificationUrl}</p>
								</div>
							</div>
						</div>

						<div className="space-y-6">
							<div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
								<h4 className="font-semibold text-gray-900 dark:text-white mb-4">Certificate Information</h4>
								<div className="space-y-3">
									<div>
										<p className="text-sm text-gray-600 dark:text-gray-400">Certificate ID</p>
										<p className="font-medium text-gray-900 dark:text-white">{certificate.id}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
										<p className="font-medium text-gray-900 dark:text-white">{certificate.instructor}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600 dark:text-gray-400">Validity</p>
										<p className="font-medium text-gray-900 dark:text-white">{certificate.expiryDate ? `Valid until ${new Date(certificate.expiryDate).toLocaleDateString()}` : 'Lifetime Access'}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600 dark:text-gray-400">Issuing Platform</p>
										<p className="font-medium text-gray-900 dark:text-white">EduForge Academy</p>
									</div>
								</div>
							</div>

							<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
								<h4 className="font-semibold text-gray-900 dark:text-white mb-4">Verification QR Code</h4>
								<img src={certificate.qrCode} alt="QR Code" className="w-32 h-32 mx-auto mb-3" />
								<p className="text-xs text-gray-600 dark:text-gray-400">Scan to verify certificate</p>
							</div>

							<div className="space-y-3">
								<button onClick={() => window.open(certificate.downloadUrl, '_blank')} className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer">
									<i className="fas fa-download mr-2"></i>
									Download PDF Certificate
								</button>

								<div className="grid grid-cols-2 gap-3">
									<button onClick={() => onShare(certificate, 'linkedin')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
										<i className="fab fa-linkedin mr-2"></i>
										LinkedIn
									</button>
									<button onClick={() => onShare(certificate, 'twitter')} className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 cursor-pointer">
										<i className="fab fa-twitter mr-2"></i>
										Twitter
									</button>
								</div>

								<button onClick={() => onShare(certificate, 'copy')} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									<i className="fas fa-link mr-2"></i>
									Copy Verification Link
								</button>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default CertificateModal
