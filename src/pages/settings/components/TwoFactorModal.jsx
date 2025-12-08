import { useState } from 'react'
import { motion } from 'framer-motion'

const TwoFactorModal = ({ onClose, onConfirm }) => {
	const [step, setStep] = useState(1)
	const [code, setCode] = useState('')

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30" onClick={onClose}>
			<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl">
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">{step === 1 ? 'Setup Two-Factor Authentication' : 'Verify Setup'}</h2>
						<button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
							<i className="fas fa-times text-xl"></i>
						</button>
					</div>
				</div>

				<div className="p-6">
					{step === 1 ? (
						<>
							<div className="mb-6">
								<div className="flex items-center justify-center mb-6">
									<div className="w-20 h-20 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white">
										<i className="fas fa-qrcode text-3xl"></i>
									</div>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Scan QR Code</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-4">
									1. Open your authenticator app (Google Authenticator, Authy, etc.)
									<br />
									2. Scan the QR code below
									<br />
									3. Enter the 6-digit code shown in the app
								</p>
								<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex justify-center">
									<div className="w-48 h-48 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
										<i className="fas fa-qrcode text-4xl text-gray-500"></i>
									</div>
								</div>
								<div className="mt-4 text-center">
									<button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer">
										<i className="fas fa-sync-alt mr-1"></i>
										Generate new QR code
									</button>
								</div>
							</div>

							<div className="flex justify-between">
								<button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									Cancel
								</button>
								<button onClick={() => setStep(2)} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
									Next Step
								</button>
							</div>
						</>
					) : (
						<>
							<div className="mb-6">
								<div className="flex items-center justify-center mb-6">
									<div className="w-20 h-20 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white">
										<i className="fas fa-key text-3xl"></i>
									</div>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Enter Verification Code</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-6">Enter the 6-digit code from your authenticator app to complete setup.</p>
								<div className="flex justify-center mb-6">
									<input type="text" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} className="w-48 text-center text-3xl font-mono tracking-widest px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="000000" maxLength={6} />
								</div>
								<div className="text-center">
									<button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer">
										<i className="fas fa-redo mr-1"></i>
										Didn't receive a code?
									</button>
								</div>
							</div>

							<div className="flex justify-between">
								<button onClick={() => setStep(1)} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
									Back
								</button>
								<button onClick={onConfirm} disabled={code.length !== 6} className={`px-6 py-2 rounded-lg transition-all duration-300 cursor-pointer ${code.length === 6 ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
									Verify & Enable
								</button>
							</div>
						</>
					)}
				</div>
			</motion.div>
		</motion.div>
	)
}

export default TwoFactorModal
