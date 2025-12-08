import { motion } from 'framer-motion'
import StatsCard from './StatsCard'

const StatsCards = () => {
	const stats = [
		{
			title: 'Enrolled Courses',
			value: '12',
			change: '+2 this month',
			icon: 'fas fa-book',
			color: 'from-blue-500 to-cyan-500',
			progress: 75,
		},
		{
			title: 'Learning Hours',
			value: '48h',
			change: '+8h this week',
			icon: 'fas fa-clock',
			color: 'from-purple-500 to-pink-500',
			progress: 60,
		},
		{
			title: 'Avg. Score',
			value: '92%',
			change: '+5% from last month',
			icon: 'fas fa-chart-line',
			color: 'from-green-500 to-emerald-500',
			progress: 92,
		},
		{
			title: 'Certificates',
			value: '7',
			change: '+1 pending',
			icon: 'fas fa-award',
			color: 'from-orange-500 to-red-500',
			progress: 70,
		},
	]

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{stats.map((stat, index) => (
				<motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
					<StatsCard {...stat} />
				</motion.div>
			))}
		</div>
	)
}

export default StatsCards
