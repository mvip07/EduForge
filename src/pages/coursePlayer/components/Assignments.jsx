import { useState } from 'react'
import { motion } from 'framer-motion'
import { getStatusColor, getStatusIcon } from '../utils/getStatus'

const Assignments = ({ course }) => {
	const [assignments] = useState([
		{
			id: 1,
			title: 'Build a Todo App with React Hooks',
			description: 'Create a todo application using useState and useEffect hooks. Implement add, edit, delete, and filter functionalities.',
			dueDate: '2024-03-15',
			status: 'submitted',
			grade: '95/100',
			instructorFeedback: 'Great job! The app is well-structured. Consider adding local storage persistence for extra credit.',
			submissionDate: '2024-03-14',
			attachments: ['todo-app.zip', 'screenshot.png'],
			requirements: ['Use functional components', 'Implement at least 5 features', 'Add proper error handling', 'Include unit tests'],
		},
		{
			id: 2,
			title: 'Custom Hook Implementation',
			description: 'Create a custom useLocalStorage hook and use it in a sample application.',
			dueDate: '2024-03-20',
			status: 'pending',
			grade: null,
			instructorFeedback: null,
			submissionDate: null,
			attachments: [],
			requirements: ['Hook should handle get, set, and remove operations', 'Include TypeScript types', 'Add error handling', 'Write documentation'],
		},
		{
			id: 3,
			title: 'Next.js Blog Application',
			description: 'Build a blog using Next.js with SSG and API routes. Include authentication and comment system.',
			dueDate: '2024-03-25',
			status: 'not-started',
			grade: null,
			instructorFeedback: null,
			submissionDate: null,
			attachments: [],
			requirements: ['Use Next.js 14', 'Implement ISR for posts', 'Add Markdown support', 'Deploy to Vercel'],
		},
		{
			id: 4,
			title: 'Performance Optimization Task',
			description: 'Optimize a given React application using useMemo, useCallback, and React.memo.',
			dueDate: '2024-04-01',
			status: 'not-started',
			grade: null,
			instructorFeedback: null,
			submissionDate: null,
			attachments: [],
			requirements: ['Reduce re-renders by 50%', 'Improve Lighthouse score', 'Add performance metrics', 'Write optimization report'],
		},
	])

	const [activeAssignment, setActiveAssignment] = useState(assignments[0])
	const [submission, setSubmission] = useState({
		files: [],
		text: '',
		githubUrl: '',
	})
	const [uploadProgress, setUploadProgress] = useState(0)
	const [uploading, setUploading] = useState(false)

	const handleFileUpload = (e) => {
		const files = Array.from(e.target.files)
		setUploading(true)

		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval)
					setUploading(false)
					setSubmission((prev) => ({ ...prev, files: [...prev.files, ...files] }))
					return 0
				}
				return prev + 10
			})
		}, 200)
	}

	const handleRemoveFile = (index) => {
		setSubmission((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }))
	}

	const handleSubmit = () => {
		if (!submission.text.trim() && submission.files.length === 0 && !submission.githubUrl.trim()) {
			alert('Please add a submission before submitting.')
			return
		}

		alert('Assignment submitted successfully!')
		setSubmission({ files: [], text: '', githubUrl: '' })
	}

	return (
		<div className="space-y-8">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						<i className="fas fa-tasks text-purple-500 mr-3"></i>
						Assignments
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">Submit your work and receive feedback from instructors</p>
				</div>
				<div className="flex items-center space-x-4">
					<div className="text-right">
						<div className="text-lg font-bold text-gray-900 dark:text-white">1/4 Completed</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Total Assignments</div>
					</div>
					<div className="w-2 h-12 bg-gray-300 dark:bg-gray-600"></div>
					<div className="text-right">
						<div className="text-lg font-bold text-gray-900 dark:text-white">95%</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Average Grade</div>
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">All Assignments</h2>

						<div className="space-y-4">
							{assignments.map((assignment) => (
								<button key={assignment.id} onClick={() => setActiveAssignment(assignment)} className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${activeAssignment.id === assignment.id ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-2 border-purple-200 dark:border-purple-700' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
									<div className="flex items-start justify-between mb-3">
										<div className="flex items-center">
											<i className={getStatusIcon(assignment.status)}></i>
											<span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>{assignment.status.replace('-', ' ')}</span>
										</div>
										{assignment.grade && <span className="text-lg font-bold text-gray-900 dark:text-white">{assignment.grade}</span>}
									</div>

									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">{assignment.title}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{assignment.description}</p>

									<div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
										<div className="flex items-center">
											<i className="far fa-calendar mr-2"></i>
											Due: {assignment.dueDate}
										</div>
										<div className="flex items-center">
											<i className="fas fa-paperclip mr-2"></i>
											{assignment.attachments.length}
										</div>
									</div>
								</button>
							))}
						</div>

						<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progress Overview</h3>
							<div className="space-y-4">
								<div>
									<div className="flex justify-between text-sm mb-2">
										<span className="text-gray-600 dark:text-gray-400">Completion</span>
										<span className="font-medium text-gray-900 dark:text-white">25%</span>
									</div>
									<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
										<div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '25%' }}></div>
									</div>
								</div>
								<div>
									<div className="flex justify-between text-sm mb-2">
										<span className="text-gray-600 dark:text-gray-400">Average Grade</span>
										<span className="font-medium text-gray-900 dark:text-white">95%</span>
									</div>
									<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
										<div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: '95%' }}></div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				<div className="lg:col-span-2 space-y-8">
					<motion.div key={activeAssignment.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activeAssignment.title}</h2>
								<div className="flex items-center space-x-4">
									<span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(activeAssignment.status)}`}>{activeAssignment.status.replace('-', ' ')}</span>
									{activeAssignment.grade && <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">Grade: {activeAssignment.grade}</span>}
									<span className="text-sm text-gray-600 dark:text-gray-400">
										<i className="far fa-calendar mr-1"></i>
										Due: {activeAssignment.dueDate}
									</span>
								</div>
							</div>
							<button className="mt-4 md:mt-0 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
								<i className="fas fa-download mr-2"></i>
								Download Brief
							</button>
						</div>

						<div className="mb-8">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
							<div className="prose dark:prose-invert max-w-none">
								<p className="text-gray-700 dark:text-gray-300">{activeAssignment.description}</p>
							</div>
						</div>

						<div className="mb-8">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Requirements</h3>
							<ul className="space-y-2">
								{activeAssignment.requirements.map((req, index) => (
									<li key={index} className="flex items-start">
										<i className="fas fa-check text-green-500 mt-1 mr-3"></i>
										<span className="text-gray-700 dark:text-gray-300">{req}</span>
									</li>
								))}
							</ul>
						</div>

						{activeAssignment.instructorFeedback && (
							<div className="mb-8">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
									<i className="fas fa-comment-alt text-purple-500 mr-2"></i>
									Instructor Feedback
								</h3>
								<div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
									<div className="flex items-start">
										<img src={course.instructor.avatar} alt={course.instructor.name} className="w-10 h-10 rounded-full mr-3" />
										<div>
											<div className="font-semibold text-gray-900 dark:text-white">{course.instructor.name}</div>
											<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
												{activeAssignment.submissionDate} • Grade: {activeAssignment.grade}
											</div>
											<p className="text-gray-700 dark:text-gray-300">{activeAssignment.instructorFeedback}</p>
										</div>
									</div>
								</div>
							</div>
						)}

						{activeAssignment.attachments.length > 0 && (
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
									<i className="fas fa-paperclip mr-2"></i>
									Submitted Files
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{activeAssignment.attachments.map((file, index) => (
										<div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
											<div className="flex items-center">
												<i className="fas fa-file-alt text-gray-400 mr-3"></i>
												<div>
													<p className="font-medium text-gray-900 dark:text-white">{file}</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">2.4 MB • Submitted {activeAssignment.submissionDate}</p>
												</div>
											</div>
											<button className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
												<i className="fas fa-download"></i>
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</motion.div>

					{activeAssignment.status !== 'submitted' && (
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submit Assignment</h2>

							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Written Submission (Optional)</label>
								<textarea value={submission.text} onChange={(e) => setSubmission({ ...submission, text: e.target.value })} placeholder="Describe your solution, include any notes for the instructor..." className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" rows={4} />
							</div>

							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">File Upload</label>
								<div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-colors duration-300">
									<input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
									<label htmlFor="file-upload" className="cursor-pointer">
										<i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
										<p className="text-gray-600 dark:text-gray-400 mb-2">Drag & drop files here or click to browse</p>
										<p className="text-sm text-gray-500 dark:text-gray-500">Maximum file size: 100MB</p>
									</label>
								</div>

								{uploading && (
									<div className="mt-4">
										<div className="flex justify-between text-sm mb-2">
											<span className="text-gray-600 dark:text-gray-400">Uploading...</span>
											<span className="font-medium text-gray-900 dark:text-white">{uploadProgress}%</span>
										</div>
										<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
											<div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
										</div>
									</div>
								)}

								{submission.files.length > 0 && (
									<div className="mt-4">
										<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Uploaded Files ({submission.files.length})</h4>
										<div className="space-y-2">
											{submission.files.map((file, index) => (
												<div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
													<div className="flex items-center">
														<i className="fas fa-file text-gray-400 mr-3"></i>
														<div>
															<p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
															<p className="text-sm text-gray-600 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
														</div>
													</div>
													<button onClick={() => handleRemoveFile(index)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer">
														<i className="fas fa-times"></i>
													</button>
												</div>
											))}
										</div>
									</div>
								)}
							</div>

							<div className="mb-8">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">GitHub Repository URL (Optional)</label>
								<input type="url" value={submission.githubUrl} onChange={(e) => setSubmission({ ...submission, githubUrl: e.target.value })} placeholder="https://github.com/username/repository" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
							</div>

							<div className="flex justify-end">
								<button onClick={handleSubmit} disabled={uploading} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
									{uploading ? (
										<>
											<i className="fas fa-spinner fa-spin mr-2"></i>
											Uploading...
										</>
									) : (
										<>
											<i className="fas fa-paper-plane mr-2"></i>
											Submit Assignment
										</>
									)}
								</button>
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Assignments
