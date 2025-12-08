import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Quizzes = () => {
	const [quizzes] = useState([
		{
			id: 1,
			title: 'React Hooks Fundamentals',
			description: 'Test your understanding of React Hooks basics',
			questions: 15,
			duration: '30 min',
			difficulty: 'Beginner',
			status: 'completed',
			score: 92,
			attempts: 1,
			dateTaken: '2024-03-10',
			topics: ['useState', 'useEffect', 'Rules of Hooks'],
		},
		{
			id: 2,
			title: 'Advanced Hook Patterns',
			description: 'Advanced concepts and custom hooks',
			questions: 20,
			duration: '45 min',
			difficulty: 'Intermediate',
			status: 'in-progress',
			score: null,
			attempts: 0,
			dateTaken: null,
			topics: ['Custom Hooks', 'useReducer', 'useContext', 'useMemo'],
		},
		{
			id: 3,
			title: 'Next.js Routing & Data Fetching',
			description: 'Test your knowledge of Next.js features',
			questions: 25,
			duration: '60 min',
			difficulty: 'Advanced',
			status: 'not-started',
			score: null,
			attempts: 0,
			dateTaken: null,
			topics: ['SSR', 'SSG', 'ISR', 'API Routes', 'Dynamic Routing'],
		},
		{
			id: 4,
			title: 'Performance Optimization',
			description: 'React performance patterns and optimization techniques',
			questions: 18,
			duration: '40 min',
			difficulty: 'Advanced',
			status: 'not-started',
			score: null,
			attempts: 0,
			dateTaken: null,
			topics: ['Code Splitting', 'Memoization', 'Lazy Loading', 'Bundle Optimization'],
		},
	])

	const [activeQuiz, setActiveQuiz] = useState(quizzes[1])
	const [activeTab, setActiveTab] = useState('quiz')
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswers] = useState({})
	const [quizSubmitted, setQuizSubmitted] = useState(false)
	const [quizScore, setQuizScore] = useState(0)

	const questions = [
		{
			id: 1,
			type: 'multiple-choice',
			question: 'What does the useState hook return?',
			options: ['Current state and setter function', 'Previous state and current state', 'Only the current state', 'A callback function'],
			correct: 0,
			explanation: 'useState returns an array with two elements: the current state value and a function to update it.',
		},
		{
			id: 2,
			type: 'multiple-choice',
			question: 'When does useEffect run by default?',
			options: ['After every render', 'Only on component mount', 'Only when dependencies change', 'Before component unmounts'],
			correct: 0,
			explanation: 'By default, useEffect runs after every render, including the first render.',
		},
		{
			id: 3,
			type: 'fill-blanks',
			question: 'Custom hooks must start with the word ______.',
			correct: 'use',
			explanation: 'This convention allows React to automatically check for violations of Hooks rules.',
		},
		{
			id: 4,
			type: 'coding',
			question: 'Write a custom hook that tracks window size',
			language: 'javascript',
			starterCode: `import { useState, useEffect } from 'react';

function useWindowSize() {
  // Your code here
}`,
			testCases: [
				{ input: 'window.innerWidth', expected: 'number' },
				{ input: 'window.innerHeight', expected: 'number' },
			],
		},
	]

	const resultsHistory = [
		{ id: 1, quizId: 1, score: 92, date: '2024-03-10', timeSpent: '25:30' },
		{ id: 2, quizId: 1, score: 88, date: '2024-03-09', timeSpent: '28:15' },
		{ id: 3, quizId: 1, score: 95, date: '2024-03-08', timeSpent: '22:45' },
	]

	const handleAnswerSelect = (questionId, answer) => {
		setAnswers((prev) => ({ ...prev, [questionId]: answer }))
	}

	const handleNextQuestion = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion((prev) => prev + 1)
		}
	}

	const handlePrevQuestion = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1)
		}
	}

	const handleSubmitQuiz = () => {
		let score = 0
		questions.forEach((q) => {
			if (q.type === 'multiple-choice' && answers[q.id] === q.correct) {
				score += 25
			} else if (q.type === 'fill-blanks' && answers[q.id]?.toLowerCase() === q.correct.toLowerCase()) {
				score += 25
			}
		})

		setQuizScore(score)
		setQuizSubmitted(true)
		setActiveTab('results')
	}

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case 'Beginner':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
			case 'Intermediate':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
			case 'Advanced':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	const getStatusColor = (status) => {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
			case 'in-progress':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
			case 'not-started':
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<div className="space-y-8">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						<i className="fas fa-question-circle text-purple-500 mr-3"></i>
						Quizzes
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">Test your knowledge and track your progress</p>
				</div>
				<div className="flex items-center space-x-4">
					<div className="text-right">
						<div className="text-lg font-bold text-gray-900 dark:text-white">1/4 Completed</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Average Score: 92%</div>
					</div>
					<div className="w-2 h-12 bg-gray-300 dark:bg-gray-600"></div>
					<div className="text-right">
						<div className="text-lg font-bold text-gray-900 dark:text-white">25/60</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</div>
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Available Quizzes</h2>

						<div className="space-y-4">
							{quizzes.map((quiz) => (
								<button
									key={quiz.id}
									onClick={() => {
										setActiveQuiz(quiz)
										setActiveTab('quiz')
										setCurrentQuestion(0)
										setAnswers({})
										setQuizSubmitted(false)
									}}
									className={`w-full text-left p-4 rounded-xl transition-all duration-300 cursor-pointer ${activeQuiz.id === quiz.id ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-2 border-purple-200 dark:border-purple-700' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
								>
									<div className="flex justify-between items-center mb-3">
										<span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quiz.status)}`}>{quiz.status.replace('-', ' ')}</span>
										<span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>{quiz.difficulty}</span>
									</div>

									<h3 className="font-semibold text-gray-900 dark:text-white mb-2">{quiz.title}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{quiz.description}</p>

									<div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
										<div className="flex items-center">
											<i className="fas fa-question-circle mr-2"></i>
											{quiz.questions} questions
										</div>
										<div className="flex items-center">
											<i className="fas fa-clock mr-2"></i>
											{quiz.duration}
										</div>
									</div>

									{quiz.score && (
										<div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Best Score</span>
												<span className="text-lg font-bold text-gray-900 dark:text-white">{quiz.score}%</span>
											</div>
										</div>
									)}
								</button>
							))}
						</div>

						<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h3>
							<div className="space-y-4">
								<div>
									<div className="flex justify-between text-sm mb-2">
										<span className="text-gray-600 dark:text-gray-400">Quiz Completion</span>
										<span className="font-medium text-gray-900 dark:text-white">25%</span>
									</div>
									<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
										<div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '25%' }}></div>
									</div>
								</div>
								<div>
									<div className="flex justify-between text-sm mb-2">
										<span className="text-gray-600 dark:text-gray-400">Average Score</span>
										<span className="font-medium text-gray-900 dark:text-white">92%</span>
									</div>
									<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
										<div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: '92%' }}></div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				<div className="lg:col-span-2 space-y-8">
					<motion.div key={activeQuiz.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activeQuiz.title}</h2>
								<div className="flex flex-wrap items-center gap-4">
									<span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(activeQuiz.status)}`}>{activeQuiz.status.replace('-', ' ')}</span>
									<span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(activeQuiz.difficulty)}`}>{activeQuiz.difficulty}</span>
									<span className="text-sm text-gray-600 dark:text-gray-400">
										<i className="fas fa-question-circle mr-1"></i>
										{activeQuiz.questions} questions
									</span>
									<span className="text-sm text-gray-600 dark:text-gray-400">
										<i className="fas fa-clock mr-1"></i>
										{activeQuiz.duration}
									</span>
								</div>
							</div>
							<div className="mt-4 md:mt-0">
								<div className="text-right">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">{quizSubmitted ? `${quizScore}%` : 'Not Taken'}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">Current Score</div>
								</div>
							</div>
						</div>

						<div className="border-b border-gray-200 dark:border-gray-700 mb-6">
							<nav className="-mb-px flex space-x-8">
								<button onClick={() => setActiveTab('quiz')} className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${activeTab === 'quiz' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
									Take Quiz
								</button>
								<button onClick={() => setActiveTab('results')} className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${activeTab === 'results' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
									Results
								</button>
								<button onClick={() => setActiveTab('history')} className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${activeTab === 'history' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
									History
								</button>
							</nav>
						</div>

						<AnimatePresence mode="wait">
							{activeTab === 'quiz' && (
								<motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
									<div className="mb-8">
										<div className="flex justify-between items-center mb-4">
											<div>
												<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
													Question {currentQuestion + 1} of {questions.length}
												</span>
											</div>
											<div className="flex items-center space-x-4">
												<button onClick={handlePrevQuestion} disabled={currentQuestion === 0} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 cursor-pointer">
													<i className="fas fa-chevron-left mr-2"></i>
													Previous
												</button>
												<button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 cursor-pointer">
													Next
													<i className="fas fa-chevron-right ml-2"></i>
												</button>
											</div>
										</div>

										<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
											<div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
										</div>
									</div>

									<div className="mb-8">
										<div className="flex items-start mb-6">
											<span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full mr-3">{currentQuestion + 1}</span>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white">{questions[currentQuestion].question}</h3>
										</div>

										{questions[currentQuestion].type === 'multiple-choice' && (
											<div className="space-y-3">
												{questions[currentQuestion].options.map((option, index) => (
													<button key={index} onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)} className={`w-full text-left p-4 rounded-lg border transition-all duration-300 cursor-pointer ${answers[questions[currentQuestion].id] === index ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700'}`}>
														<div className="flex items-center">
															<div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${answers[questions[currentQuestion].id] === index ? 'border-purple-500 bg-purple-500' : 'border-gray-400'}`}>{answers[questions[currentQuestion].id] === index && <i className="fas fa-check text-white text-xs"></i>}</div>
															<span className="text-gray-900 dark:text-white">{option}</span>
														</div>
													</button>
												))}
											</div>
										)}

										{questions[currentQuestion].type === 'fill-blanks' && (
											<div>
												<input type="text" value={answers[questions[currentQuestion].id] || ''} onChange={(e) => handleAnswerSelect(questions[currentQuestion].id, e.target.value)} className="w-full px-4 py-3 text-lg border-2 border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Type your answer here..." />
												<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Hint: {questions[currentQuestion].explanation}</p>
											</div>
										)}

										{questions[currentQuestion].type === 'coding' && (
											<div>
												<div className="mb-4">
													<div className="flex items-center justify-between mb-2">
														<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Write your solution in JavaScript</label>
														<button className="text-sm text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">
															<i className="fas fa-redo mr-1"></i>
															Reset Code
														</button>
													</div>
													<div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
														<pre className="text-gray-300">{questions[currentQuestion].starterCode}</pre>
													</div>
												</div>
												<div className="mb-4">
													<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test Cases</label>
													<div className="space-y-2">
														{questions[currentQuestion].testCases.map((testCase, index) => (
															<div key={index} className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
																<i className="fas fa-code text-gray-400 mr-3"></i>
																<div>
																	<p className="font-medium text-gray-900 dark:text-white">{testCase.input}</p>
																	<p className="text-sm text-gray-600 dark:text-gray-400">Expected: {testCase.expected}</p>
																</div>
															</div>
														))}
													</div>
												</div>
												<button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
													<i className="fas fa-play mr-2"></i>
													Run Tests
												</button>
											</div>
										)}
									</div>

									<div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
										<div className="text-sm text-gray-600 dark:text-gray-400">
											{Object.keys(answers).length} of {questions.length} questions answered
										</div>
										<button onClick={handleSubmitQuiz} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer">
											<i className="fas fa-paper-plane mr-2"></i>
											Submit Quiz
										</button>
									</div>
								</motion.div>
							)}

							{activeTab === 'results' && quizSubmitted && (
								<motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
									<div className="text-center mb-8">
										<div className="inline-block relative">
											<div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
												<span className="text-4xl font-bold text-white">{quizScore}%</span>
											</div>
											<div className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500 animate-spin"></div>
										</div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">Quiz Completed!</h3>
										<p className="text-gray-600 dark:text-gray-400">
											You scored {quizScore}% on {activeQuiz.title}
										</p>
									</div>

									<div className="space-y-6">
										{questions.map((q, index) => (
											<div key={q.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
												<div className="flex items-start justify-between mb-4">
													<div>
														<h4 className="font-semibold text-gray-900 dark:text-white">
															Question {index + 1}: {q.question}
														</h4>
														<div className="flex items-center mt-2">
															{q.type === 'multiple-choice' && answers[q.id] === q.correct ? (
																<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
																	<i className="fas fa-check mr-2"></i>
																	Correct
																</span>
															) : q.type === 'fill-blanks' && answers[q.id]?.toLowerCase() === q.correct.toLowerCase() ? (
																<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
																	<i className="fas fa-check mr-2"></i>
																	Correct
																</span>
															) : (
																<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
																	<i className="fas fa-times mr-2"></i>
																	Incorrect
																</span>
															)}
															<span className="ml-4 text-sm text-gray-600 dark:text-gray-400">Worth 25 points</span>
														</div>
													</div>
													<span className="text-lg font-bold text-gray-900 dark:text-white">{q.type === 'multiple-choice' && answers[q.id] === q.correct ? '25' : q.type === 'fill-blanks' && answers[q.id]?.toLowerCase() === q.correct.toLowerCase() ? '25' : '0'} pts</span>
												</div>

												<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
													<p className="font-medium text-gray-900 dark:text-white mb-2">Your Answer:</p>
													<p className="text-gray-700 dark:text-gray-300 mb-4">{q.type === 'multiple-choice' ? q.options[answers[q.id]] : answers[q.id] || 'Not answered'}</p>

													<p className="font-medium text-gray-900 dark:text-white mb-2">{q.type === 'multiple-choice' ? 'Correct Answer:' : 'Expected Answer:'}</p>
													<p className="text-green-600 dark:text-green-400 mb-4">{q.type === 'multiple-choice' ? q.options[q.correct] : q.correct}</p>

													<p className="font-medium text-gray-900 dark:text-white mb-2">Explanation:</p>
													<p className="text-gray-600 dark:text-gray-400">{q.explanation}</p>
												</div>
											</div>
										))}
									</div>

									<div className="mt-8 flex justify-center">
										<button
											onClick={() => {
												setActiveTab('quiz')
												setCurrentQuestion(0)
												setAnswers({})
												setQuizSubmitted(false)
											}}
											className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-semibold cursor-pointer"
										>
											<i className="fas fa-redo mr-2"></i>
											Retake Quiz
										</button>
									</div>
								</motion.div>
							)}

							{activeTab === 'history' && (
								<motion.div key="history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quiz Attempt History</h3>

									<div className="space-y-4">
										{resultsHistory.map((result) => (
											<div key={result.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
												<div className="flex items-center justify-between mb-4">
													<div>
														<h4 className="font-semibold text-gray-900 dark:text-white">Attempt #{result.id}</h4>
														<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
															<i className="far fa-calendar mr-2"></i>
															{result.date} • Time spent: {result.timeSpent}
														</p>
													</div>
													<div className="text-right">
														<div className="text-2xl font-bold text-gray-900 dark:text-white">{result.score}%</div>
														<div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
													</div>
												</div>

												<div className="flex items-center justify-between">
													<div className="w-3/4">
														<div className="flex justify-between text-sm mb-2">
															<span className="text-gray-600 dark:text-gray-400">Performance</span>
															<span className="font-medium text-gray-900 dark:text-white">{result.score}%</span>
														</div>
														<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
															<div className={`h-full rounded-full ${result.score >= 90 ? 'bg-green-500' : result.score >= 80 ? 'bg-yellow-500' : result.score >= 70 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${result.score}%` }}></div>
														</div>
													</div>
													<button className="ml-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 cursor-pointer">View Details</button>
												</div>
											</div>
										))}
									</div>

									<div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl text-white">
										<h4 className="text-lg font-semibold mb-4">Performance Trend</h4>
										<div className="flex items-end h-32 space-x-2">
											{[88, 92, 95].map((score, index) => (
												<div key={index} className="flex-1 flex flex-col items-center">
													<div className="w-full bg-white/30 rounded-t-lg" style={{ height: `${score}%` }}></div>
													<div className="text-sm mt-2">Attempt {index + 1}</div>
													<div className="text-xs opacity-80">{score}%</div>
												</div>
											))}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="text-lg font-semibold mb-4">
							<i className="fas fa-lightbulb mr-2"></i>
							Quiz Tips
						</h3>
						<ul className="space-y-3">
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-3"></i>
								Read each question carefully before answering
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-3"></i>
								Manage your time - don't spend too long on one question
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-3"></i>
								Review your answers before submitting
							</li>
							<li className="flex items-start">
								<i className="fas fa-check mt-1 mr-3"></i>
								Use the practice quizzes to prepare for graded ones
							</li>
						</ul>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default Quizzes