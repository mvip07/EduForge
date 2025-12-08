import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const ProgressTab = ({ courseProgress, progressData, stats }) => {
	return (
		<>
			<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detailed Course Progress</h3>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-200 dark:border-gray-700">
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Course</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Progress</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Hours Spent</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Quizzes</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Score</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
							</tr>
						</thead>
						<tbody>
							{courseProgress.map((course, index) => (
								<tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
									<td className="py-4 px-4">
										<div className="flex items-center">
											<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">{course.name.charAt(0)}</div>
											<div>
												<div className="font-medium text-gray-900 dark:text-white">{course.name}</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">Advanced Level</div>
											</div>
										</div>
									</td>
									<td className="py-4 px-4">
										<div className="flex items-center">
											<div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-3">
												<div
													className="h-full rounded-full"
													style={{
														backgroundColor: course.color,
														width: `${course.progress}%`,
													}}
												></div>
											</div>
											<span className="font-bold text-gray-900 dark:text-white">{course.progress}%</span>
										</div>
									</td>
									<td className="py-4 px-4">
										<div className="font-medium text-gray-900 dark:text-white">{course.hours}h</div>
									</td>
									<td className="py-4 px-4">
										<div className="font-medium text-gray-900 dark:text-white">{course.quizzes}</div>
									</td>
									<td className="py-4 px-4">
										<div className="font-medium text-gray-900 dark:text-white">{Math.floor(Math.random() * 20) + 80}%</div>
									</td>
									<td className="py-4 px-4">
										<span className={`px-3 py-1 text-xs font-medium rounded-full ${course.progress >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''} ${course.progress >= 70 && course.progress < 90 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''} ${course.progress < 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''} `}>{course.progress >= 90 ? 'Almost Done' : course.progress >= 70 ? 'Good Progress' : 'In Progress'}</span>
									</td>
									<td className="py-4 px-4">
										<button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg text-sm font-medium cursor-pointer">Continue</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weekly Progress Trend</h3>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={progressData}>
								<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
								<XAxis dataKey="day" stroke="#9CA3AF" />
								<YAxis stroke="#9CA3AF" />
								<Tooltip
									contentStyle={{
										backgroundColor: '#1F2937',
										border: 'none',
										borderRadius: '0.5rem',
										color: 'white',
									}}
								/>
								<Line type="monotone" dataKey="completed" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
								<Line type="monotone" dataKey="quizzes" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="mt-4 flex items-center justify-center space-x-6">
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
							<span className="text-sm text-gray-600 dark:text-gray-400">Completion %</span>
						</div>
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
							<span className="text-sm text-gray-600 dark:text-gray-400">Quizzes Taken</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Progress Insights</h3>
					<div className="space-y-6">
						<div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-gray-600 dark:text-gray-400">Best Performing Course</span>
								<span className="text-sm font-medium text-blue-600 dark:text-blue-400">Advanced React</span>
							</div>
							<div className="w-full h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
								<div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '92%' }}></div>
							</div>
						</div>

						<div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-gray-600 dark:text-gray-400">Most Productive Day</span>
								<span className="text-sm font-medium text-green-600 dark:text-green-400">Saturday</span>
							</div>
							<div className="w-full h-2 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
								<div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '87%' }}></div>
							</div>
						</div>

						<div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-gray-600 dark:text-gray-400">Learning Consistency</span>
								<span className="text-sm font-medium text-purple-600 dark:text-purple-400">Excellent</span>
							</div>
							<div className="w-full h-2 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
								<div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: '94%' }}></div>
							</div>
						</div>

						<div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-gray-600 dark:text-gray-400">Time to Completion</span>
								<span className="text-sm font-medium text-orange-600 dark:text-orange-400">~2 weeks</span>
							</div>
							<div className="w-full h-2 bg-orange-100 dark:bg-orange-900/30 rounded-full overflow-hidden">
								<div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" style={{ width: '65%' }}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}


export default ProgressTab