import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import StatsCards from './components/StatsCards'
import ProgressChart from './components/ProgressChart'
import RecentActivity from './components/RecentActivity'
import EnrolledCourses from './components/EnrolledCourses'
import UpcomingCourses from './components/UpcomingCourses'
import MainLayout from '../../components/layout/MainLayout'

const Dashboard = () => {
	const { user } = useAuth()

	return (
		<MainLayout>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{user?.firstName || 'Student'}!</span>
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-2">Continue your learning journey and track your progress</p>
			</motion.div>

			<StatsCards />

			<div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					<EnrolledCourses />
					<ProgressChart />
				</div>

				<div className="space-y-6">
					<RecentActivity />
					<UpcomingCourses />
					<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
						<h3 className="text-lg font-semibold mb-4">Learning Streak</h3>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-3xl font-bold">12 days</p>
								<p className="text-blue-200 text-sm">Current streak</p>
							</div>
							<div className="text-4xl">
								<i className="fas fa-fire"></i>
							</div>
						</div>
						<div className="mt-4 pt-4 border-t border-blue-400">
							<p className="text-blue-200 text-sm">Complete a lesson to maintain your streak!</p>
						</div>
					</motion.div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Dashboard
