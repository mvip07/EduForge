const LeaderboardTab = ({ leaderboardData, activeFilter, onFilterChange }) => {
	const filters = [
		{ id: 'global', label: 'Global', icon: 'fas fa-globe' },
		{ id: 'weekly', label: 'Weekly', icon: 'fas fa-calendar-week' },
		{ id: 'monthly', label: 'Monthly', icon: 'fas fa-calendar-alt' },
		{ id: 'course', label: 'By Course', icon: 'fas fa-book' },
		{ id: 'friends', label: 'Friends', icon: 'fas fa-user-friends' },
	]

	return (
		<>
			<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold mb-2">Learning Leaderboard</h2>
						<p className="text-purple-100">Compete with learners worldwide and track your ranking</p>
					</div>
					<div className="mt-4 md:mt-0">
						<div className="flex items-center">
							<i className="fas fa-trophy text-3xl mr-4"></i>
							<div>
								<div className="text-2xl font-bold">Top 8</div>
								<div className="text-sm text-purple-200">Your Current Rank</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-6">
				<div className="flex flex-wrap gap-2">
					{filters.map((filter) => (
						<button key={filter.id} onClick={() => onFilterChange(filter.id)} className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${activeFilter === filter.id ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}>
							<i className={`${filter.icon} mr-2`}></i>
							{filter.label}
						</button>
					))}
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Rank</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Learner</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Score</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Courses</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Streak</th>
								<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
							</tr>
						</thead>
						<tbody>
							{leaderboardData.map((user) => (
								<tr key={user.rank} className={` border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${user.name === 'You' ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10' : ''} `}>
									<td className="py-4 px-6">
										<div className="flex items-center">{user.rank <= 3 ? <div className={`  w-8 h-8 rounded-full flex items-center justify-center text-white font-bold  ${user.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : ''}  ${user.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600' : ''}  ${user.rank === 3 ? 'bg-gradient-to-r from-amber-700 to-amber-900' : ''}`}>{user.rank}</div> : <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">{user.rank}</div>}</div>
									</td>
									<td className="py-4 px-6">
										<div className="flex items-center">
											<div className={`  w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3  ${user.name === 'You' ? 'bg-gradient-to-r from-purple-500 to-indigo-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} `}>{user.avatar}</div>
											<div>
												<div className="font-medium text-gray-900 dark:text-white">
													{user.name}
													{user.name === 'You' && <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full">You</span>}
												</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">Level {Math.floor(user.score / 1000) + 1}</div>
											</div>
										</div>
									</td>
									<td className="py-4 px-6">
										<div className="font-bold text-gray-900 dark:text-white">{user.score.toLocaleString()}</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">points</div>
									</td>
									<td className="py-4 px-6">
										<div className="font-medium text-gray-900 dark:text-white">{user.courses}</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">completed</div>
									</td>
									<td className="py-4 px-6">
										<div className="flex items-center">
											<i className="fas fa-fire text-orange-500 mr-2"></i>
											<span className="font-medium text-gray-900 dark:text-white">{user.streak} days</span>
										</div>
									</td>
									<td className="py-4 px-6">
										<div className="flex space-x-2">
											<button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">View Profile</button>
											{user.name !== 'You' && <button className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg cursor-pointer">Challenge</button>}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
					<h3 className="font-semibold mb-4">Your Position</h3>
					<div className="flex items-center justify-between mb-6">
						<div>
							<div className="text-3xl font-bold">#8</div>
							<div className="text-sm text-purple-200">Global Rank</div>
						</div>
						<div className="text-right">
							<div className="text-3xl font-bold">7,850</div>
							<div className="text-sm text-purple-200">Points</div>
						</div>
					</div>
					<div className="space-y-3">
						<div className="flex items-center justify-between text-sm">
							<span>Points to next rank</span>
							<span className="font-medium">1,150</span>
						</div>
						<div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
							<div className="h-full bg-white rounded-full" style={{ width: '87%' }}></div>
						</div>
						<div className="text-sm">
							You're ahead of <span className="font-bold">92%</span> of learners
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Performers This Week</h3>
					<div className="space-y-4">
						{leaderboardData.slice(0, 3).map((user) => (
							<div key={user.rank} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
								<div className="flex items-center">
									<div className={`  w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3  ${user.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : ''}  ${user.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600' : ''}  ${user.rank === 3 ? 'bg-gradient-to-r from-amber-700 to-amber-900' : ''}`}>{user.rank}</div>
									<div>
										<div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">+{Math.floor(Math.random() * 500) + 200} pts</div>
									</div>
								</div>
								<div className="text-right">
									<div className="font-bold text-gray-900 dark:text-white">{user.score.toLocaleString()}</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">points</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
					<h3 className="font-semibold text-gray-900 dark:text-white mb-4">Earn More Points</h3>
					<div className="space-y-3">
						{[
							{ activity: 'Complete a course', points: 500, icon: 'fas fa-graduation-cap' },
							{ activity: 'Daily streak bonus', points: 100, icon: 'fas fa-fire' },
							{ activity: 'Quiz score 90%+', points: 200, icon: 'fas fa-star' },
							{ activity: 'Help other learners', points: 150, icon: 'fas fa-hands-helping' },
						].map((item, index) => (
							<div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
								<div className="flex items-center">
									<i className={`${item.icon} text-purple-500 mr-3`}></i>
									<span className="text-gray-700 dark:text-gray-300">{item.activity}</span>
								</div>
								<span className="font-bold text-purple-600 dark:text-purple-400">+{item.points}</span>
							</div>
						))}
					</div>
					<button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
						<i className="fas fa-rocket mr-2"></i>
						Boost Your Rank
					</button>
				</div>
			</div>
		</>
	)
}

export default LeaderboardTab
