import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const QuizzesTab = ({ quizAnalytics, stats }) => {
	return (
		<>
			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">Quiz Performance</h3>
						<p className="text-gray-600 dark:text-gray-400">Detailed analysis of your quiz results</p>
					</div>
					<div className="text-right">
						<div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageScore}%</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
					</div>
				</div>

				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={quizAnalytics}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
							<XAxis dataKey="topic" stroke="#9CA3AF" />
							<YAxis stroke="#9CA3AF" />
							<Tooltip
								contentStyle={{
									backgroundColor: '#1F2937',
									border: 'none',
									borderRadius: '0.5rem',
									color: 'white',
								}}
							/>
							<Bar dataKey="score" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Score (%)" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quiz Breakdown</h3>
					<div className="space-y-4">
						{quizAnalytics.map((quiz, index) => (
							<div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
								<div className="flex items-center justify-between mb-3">
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-white">{quiz.topic}</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{quiz.questions} questions • {quiz.timeSpent} min
										</p>
									</div>
									<div className={`text-lg font-bold ${quiz.score >= 90 ? 'text-green-600 dark:text-green-400' : quiz.score >= 80 ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{quiz.score}%</div>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-gray-600 dark:text-gray-400">Date: {new Date(quiz.date).toLocaleDateString()}</span>
									<button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
										Review Answers <i className="fas fa-arrow-right ml-1"></i>
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-8">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Accuracy Statistics</h3>
						<div className="space-y-6">
							<div>
								<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
									<span>Correct Answers</span>
									<span>84%</span>
								</div>
								<div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
									<div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '84%' }}></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
									<span>Incorrect Answers</span>
									<span>12%</span>
								</div>
								<div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
									<div className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full" style={{ width: '12%' }}></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
									<span>Skipped Questions</span>
									<span>4%</span>
								</div>
								<div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
									<div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" style={{ width: '4%' }}></div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Time Analysis</h3>
						<div className="grid grid-cols-2 gap-6">
							<div className="text-center">
								<div className="text-3xl font-bold text-gray-900 dark:text-white">{Math.round(quizAnalytics.reduce((sum, quiz) => sum + quiz.timeSpent, 0) / quizAnalytics.length)}</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Avg. Time per Quiz</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-gray-900 dark:text-white">{Math.round(quizAnalytics.reduce((sum, quiz) => sum + quiz.timeSpent, 0) / quizAnalytics.reduce((sum, quiz) => sum + quiz.questions, 0))}</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Avg. Time per Question</div>
							</div>
						</div>
						<div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
							<div className="flex items-center">
								<i className="fas fa-lightbulb text-blue-500 text-xl mr-3"></i>
								<div>
									<h4 className="font-semibold text-gray-900 dark:text-white">Improvement Tip</h4>
									<p className="text-sm text-gray-600 dark:text-gray-400">Focus on React Hooks questions for faster completion</p>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Question Type Performance</h3>
						<div className="space-y-4">
							{[
								{ type: 'Multiple Choice', correct: 92, total: 100 },
								{ type: 'True/False', correct: 88, total: 100 },
								{ type: 'Coding Challenges', correct: 75, total: 100 },
								{ type: 'Scenario-based', correct: 82, total: 100 },
							].map((item, index) => (
								<div key={index}>
									<div className="flex justify-between text-sm mb-1">
										<span className="text-gray-700 dark:text-gray-300">{item.type}</span>
										<span className="font-medium text-gray-900 dark:text-white">{item.correct}%</span>
									</div>
									<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
										<div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: `${item.correct}%` }}></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}


export default QuizzesTab