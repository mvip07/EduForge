import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../../components/layout/MainLayout'
import OverviewTab from './components/OverviewTab'
import ProgressTab from './components/ProgressTab'
import QuizzesTab from './components/QuizzesTab'
import LeaderboardTab from './components/LeaderboardTab'

const ProgressAnalytics = () => {
	const [activeTab, setActiveTab] = useState('overview')
	const [timeRange, setTimeRange] = useState('week')

	const progressData = [
		{ day: 'Mon', hours: 3.2, completed: 85, quizzes: 2 },
		{ day: 'Tue', hours: 4.5, completed: 92, quizzes: 3 },
		{ day: 'Wed', hours: 2.8, completed: 78, quizzes: 1 },
		{ day: 'Thu', hours: 5.2, completed: 95, quizzes: 4 },
		{ day: 'Fri', hours: 3.7, completed: 88, quizzes: 2 },
		{ day: 'Sat', hours: 6.1, completed: 98, quizzes: 5 },
		{ day: 'Sun', hours: 2.4, completed: 75, quizzes: 1 },
	]

	const courseProgress = [
		{ name: 'Advanced React', progress: 92, hours: 45, quizzes: 12, color: '#8B5CF6' },
		{ name: 'Full Stack JS', progress: 78, hours: 32, quizzes: 8, color: '#3B82F6' },
		{ name: 'UI/UX Design', progress: 85, hours: 28, quizzes: 10, color: '#EC4899' },
		{ name: 'Machine Learning', progress: 65, hours: 40, quizzes: 15, color: '#10B981' },
		{ name: 'DevOps', progress: 45, hours: 18, quizzes: 6, color: '#F59E0B' },
	]

	const quizAnalytics = [
		{ topic: 'React Hooks', score: 95, timeSpent: 25, questions: 20, date: '2024-03-15' },
		{ topic: 'State Management', score: 88, timeSpent: 32, questions: 25, date: '2024-03-10' },
		{ topic: 'Component Lifecycle', score: 92, timeSpent: 28, questions: 22, date: '2024-03-05' },
		{ topic: 'Context API', score: 84, timeSpent: 30, questions: 24, date: '2024-02-28' },
		{ topic: 'Performance', score: 76, timeSpent: 35, questions: 28, date: '2024-02-22' },
		{ topic: 'Testing', score: 90, timeSpent: 40, questions: 30, date: '2024-02-18' },
	]

	const skillData = [
		{ skill: 'JavaScript', level: 92, fullMark: 100 },
		{ skill: 'React', level: 88, fullMark: 100 },
		{ skill: 'Node.js', level: 75, fullMark: 100 },
		{ skill: 'UI/UX', level: 80, fullMark: 100 },
		{ skill: 'Database', level: 70, fullMark: 100 },
		{ skill: 'DevOps', level: 65, fullMark: 100 },
		{ skill: 'Problem Solving', level: 85, fullMark: 100 },
	]

	const timeDistribution = [
		{ name: 'Video Lessons', value: 35, color: '#8B5CF6' },
		{ name: 'Practice', value: 25, color: '#3B82F6' },
		{ name: 'Quizzes', value: 20, color: '#10B981' },
		{ name: 'Projects', value: 15, color: '#F59E0B' },
		{ name: 'Reading', value: 5, color: '#EC4899' },
	]

	const leaderboardData = [
		{ rank: 1, name: 'Alex Chen', score: 9850, courses: 8, streak: 42, avatar: 'AC' },
		{ rank: 2, name: 'Sarah Johnson', score: 9420, courses: 7, streak: 38, avatar: 'SJ' },
		{ rank: 3, name: 'Mike Rodriguez', score: 9120, courses: 9, streak: 35, avatar: 'MR' },
		{ rank: 4, name: 'Emma Wilson', score: 8950, courses: 6, streak: 45, avatar: 'EW' },
		{ rank: 5, name: 'David Kim', score: 8650, courses: 7, streak: 28, avatar: 'DK' },
		{ rank: 6, name: 'Lisa Wang', score: 8420, courses: 8, streak: 31, avatar: 'LW' },
		{ rank: 7, name: 'James Brown', score: 8120, courses: 5, streak: 25, avatar: 'JB' },
		{ rank: 8, name: 'You', score: 7850, courses: 6, streak: 21, avatar: 'ME' },
	]

	const achievements = [
		{ id: 1, name: 'Fast Learner', icon: 'fas fa-bolt', description: 'Complete 5 courses in 30 days', earned: true, date: '2024-03-10', rarity: 'common' },
		{ id: 2, name: 'Perfect Score', icon: 'fas fa-star', description: 'Score 100% on any quiz', earned: true, date: '2024-03-05', rarity: 'rare' },
		{ id: 3, name: 'Early Bird', icon: 'fas fa-sun', description: 'Study before 7 AM for 7 days', earned: false, progress: 5, total: 7, rarity: 'uncommon' },
		{ id: 4, name: 'Marathon', icon: 'fas fa-running', description: 'Study 10+ hours in one week', earned: true, date: '2024-02-28', rarity: 'rare' },
		{ id: 5, name: 'Quiz Master', icon: 'fas fa-trophy', description: 'Complete 50 quizzes', earned: false, progress: 38, total: 50, rarity: 'epic' },
		{ id: 6, name: 'Consistency', icon: 'fas fa-fire', description: '30-day learning streak', earned: false, progress: 21, total: 30, rarity: 'legendary' },
	]

	const streakData = Array.from({ length: 30 }, (_, i) => {
		const date = new Date()
		date.setDate(date.getDate() - (29 - i))
		return {
			date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			hours: Math.floor(Math.random() * 6) + 1,
			active: i >= 21, // Last 21 days active
		}
	})

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
		{ id: 'progress', label: 'Progress', icon: 'fas fa-tasks' },
		{ id: 'quizzes', label: 'Quiz Analytics', icon: 'fas fa-question-circle' },
		{ id: 'leaderboard', label: 'Leaderboard', icon: 'fas fa-trophy' },
	]

	const timeRanges = [
		{ id: 'day', label: 'Today' },
		{ id: 'week', label: 'This Week' },
		{ id: 'month', label: 'This Month' },
		{ id: 'year', label: 'This Year' },
	]

	const calculateTotalHours = () => {
		return progressData.reduce((sum, day) => sum + day.hours, 0).toFixed(1)
	}

	const calculateAverageScore = () => {
		return Math.round(quizAnalytics.reduce((sum, quiz) => sum + quiz.score, 0) / quizAnalytics.length)
	}

	const calculateCompletionRate = () => {
		return Math.round(courseProgress.reduce((sum, course) => sum + course.progress, 0) / courseProgress.length)
	}

	const getCurrentStreak = () => {
		return streakData.filter((day) => day.active).length
	}

	const stats = {
		totalHours: calculateTotalHours(),
		averageScore: calculateAverageScore(),
		completionRate: calculateCompletionRate(),
		currentStreak: getCurrentStreak(),
		quizzesCompleted: quizAnalytics.length,
		coursesInProgress: courseProgress.length,
		totalPoints: 7850,
		rank: 8,
	}

	const [activeLeaderboardFilter, setActiveLeaderboardFilter] = useState('global')

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Progress & Analytics</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-2">Track your learning journey with detailed insights</p>
					</div>
					<div className="mt-4 md:mt-0 flex space-x-3">
						<button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
							<i className="fas fa-download mr-2"></i>
							Export Report
						</button>
						<button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
							<i className="fas fa-share-alt mr-2"></i>
							Share Progress
						</button>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalHours}h</p>
								<p className="text-sm text-green-600 dark:text-green-400 mt-1">
									<i className="fas fa-arrow-up mr-1"></i>
									+12% from last week
								</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
								<i className="fas fa-clock text-purple-600 dark:text-purple-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Avg. Quiz Score</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.averageScore}%</p>
								<p className="text-sm text-green-600 dark:text-green-400 mt-1">
									<i className="fas fa-star mr-1"></i>
									Top 15% of students
								</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
								<i className="fas fa-chart-line text-green-600 dark:text-green-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.completionRate}%</p>
								<p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
									<i className="fas fa-check-circle mr-1"></i>
									{stats.coursesInProgress} courses
								</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
								<i className="fas fa-tasks text-blue-600 dark:text-blue-400 text-xl"></i>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.currentStreak} days</p>
								<p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
									<i className="fas fa-fire mr-1"></i>
									Keep it up!
								</p>
							</div>
							<div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
								<i className="fas fa-fire text-orange-600 dark:text-orange-400 text-xl"></i>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
				<div className="border-b border-gray-200 dark:border-gray-700">
					<nav className="-mb-px flex space-x-8 overflow-x-auto">
						{tabs.map((tab) => (
							<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap cursor-pointer py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300  ${activeTab === tab.id ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>
								<i className={`${tab.icon} mr-2`}></i>
								{tab.label}
							</button>
						))}
					</nav>
				</div>
			</motion.div>

			<div className="mb-6">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Analytics</h3>
					<div className="flex items-center space-x-2">
						{timeRanges.map((range) => (
							<button key={range.id} onClick={() => setTimeRange(range.id)} className={`px-3 py-1 cursor-pointer text-sm font-medium rounded-lg transition-all duration-300 ${timeRange === range.id ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
								{range.label}
							</button>
						))}
					</div>
				</div>
			</div>

			<AnimatePresence mode="wait">
				<motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
					{activeTab === 'overview' && <OverviewTab progressData={progressData} courseProgress={courseProgress} skillData={skillData} timeDistribution={timeDistribution} achievements={achievements} streakData={streakData} />}

					{activeTab === 'progress' && <ProgressTab courseProgress={courseProgress} progressData={progressData} stats={stats} />}

					{activeTab === 'quizzes' && <QuizzesTab quizAnalytics={quizAnalytics} stats={stats} />}

					{activeTab === 'leaderboard' && <LeaderboardTab leaderboardData={leaderboardData} activeFilter={activeLeaderboardFilter} onFilterChange={setActiveLeaderboardFilter} />}
				</motion.div>
			</AnimatePresence>
		</MainLayout>
	)
}

export default ProgressAnalytics
