import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'
const OverviewTab = ({ progressData, courseProgress, skillData, timeDistribution, achievements, streakData }) => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Learning Activity</h3>
							<p className="text-gray-600 dark:text-gray-400">Hours spent per day this week</p>
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">
							<i className="fas fa-calendar mr-1"></i>
							This Week
						</div>
					</div>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={progressData}>
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
								<Area type="monotone" dataKey="hours" stroke="#8B5CF6" fill="url(#colorHours)" strokeWidth={2} />
								<defs>
									<linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
									</linearGradient>
								</defs>
							</AreaChart>
						</ResponsiveContainer>
					</div>
					<div className="mt-4 grid grid-cols-3 gap-4 text-center">
						<div>
							<div className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">Total Hours</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900 dark:text-white">{Math.max(...progressData.map((d) => d.hours)).toFixed(1)}h</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">Peak Day</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900 dark:text-white">{(progressData.reduce((sum, day) => sum + day.hours, 0) / 7).toFixed(1)}h</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">Daily Avg.</div>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Course Progress</h3>
							<p className="text-gray-600 dark:text-gray-400">Completion across active courses</p>
						</div>
						<div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
							<i className="fas fa-arrow-right mr-1"></i>
							View All
						</div>
					</div>
					<div className="space-y-4">
						{courseProgress.map((course, index) => (
							<div key={index} className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: course.color }}></div>
										<span className="font-medium text-gray-900 dark:text-white">{course.name}</span>
									</div>
									<span className="font-bold text-gray-900 dark:text-white">{course.progress}%</span>
								</div>
								<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
									<motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1, delay: index * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: course.color }} />
								</div>
								<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
									<span>{course.hours} hours spent</span>
									<span>{course.quizzes} quizzes</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skill Assessment</h3>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<RadarChart data={skillData}>
								<PolarGrid stroke="#374151" />
								<PolarAngleAxis dataKey="skill" stroke="#9CA3AF" />
								<PolarRadiusAxis stroke="#9CA3AF" />
								<Radar name="Your Level" dataKey="level" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
								<Tooltip
									contentStyle={{
										backgroundColor: '#1F2937',
										border: 'none',
										borderRadius: '0.5rem',
										color: 'white',
									}}
								/>
							</RadarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Time Distribution</h3>
					<div className="h-64">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie data={timeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
									{timeDistribution.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: '#1F2937',
										border: 'none',
										borderRadius: '0.5rem',
										color: 'white',
									}}
								/>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
					<div className="mt-4 grid grid-cols-2 gap-4">
						{timeDistribution.map((item, index) => (
							<div key={index} className="flex items-center">
								<div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
								<span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
								<span className="ml-auto text-sm font-medium text-gray-900 dark:text-white">{item.value}%</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h3>
						<span className="text-sm text-gray-600 dark:text-gray-400">
							{achievements.filter((a) => a.earned).length} of {achievements.length} earned
						</span>
					</div>
					<div className="grid grid-cols-2 gap-4">
						{achievements.map((achievement) => (
							<div key={achievement.id} className={`p-4 rounded-xl border ${achievement.earned ? 'border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'}`}>
								<div className="flex items-center mb-3">
									<div className={`  w-10 h-10 rounded-lg flex items-center justify-center mr-3  ${achievement.earned ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'} `}>
										<i className={achievement.icon}></i>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-white">{achievement.name}</h4>
										<span className={` text-xs px-2 py-0.5 rounded-full ${achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : ''} ${achievement.rarity === 'uncommon' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''} ${achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''} ${achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : ''} ${achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}`}>{achievement.rarity}</span>
									</div>
								</div>
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
								{achievement.earned ? (
									<div className="flex items-center text-sm text-green-600 dark:text-green-400">
										<i className="fas fa-check-circle mr-2"></i>
										Earned {new Date(achievement.date).toLocaleDateString()}
									</div>
								) : (
									<div>
										<div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
											<span>Progress</span>
											<span>
												{achievement.progress}/{achievement.total}
											</span>
										</div>
										<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
											<div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}></div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">Study Streak</h3>
							<p className="text-gray-600 dark:text-gray-400">{streakData.filter((d) => d.active).length} consecutive days</p>
						</div>
						<div className="flex items-center text-orange-600 dark:text-orange-400">
							<i className="fas fa-fire text-xl mr-2"></i>
							<span className="text-2xl font-bold">{streakData.filter((d) => d.active).length}</span>
						</div>
					</div>
					<div className="mb-6">
						<div className="grid grid-cols-7 gap-2">
							{streakData.map((day, index) => (
								<div key={index} className="text-center">
									<div className={`  w-full aspect-square rounded-lg mb-1 flex items-center justify-center  ${day.active ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
										<span className="text-xs font-medium">{day.hours}h</span>
									</div>
									<span className="text-xs text-gray-600 dark:text-gray-400">{day.date}</span>
								</div>
							))}
						</div>
					</div>
					<div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
						<div className="flex items-center">
							<i className="fas fa-gem text-orange-500 text-xl mr-3"></i>
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-white">Keep the streak alive!</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">Study today to maintain your {streakData.filter((d) => d.active).length}-day streak</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default OverviewTab
