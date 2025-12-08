import React from 'react'
import { motion } from 'framer-motion'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const ProgressChart = () => {
	const lineData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
		datasets: [
			{
				label: 'Hours Studied',
				data: [12, 19, 15, 25, 22, 30, 28],
				borderColor: 'rgb(139, 92, 246)',
				backgroundColor: 'rgba(139, 92, 246, 0.1)',
				tension: 0.4,
				fill: true,
			},
			{
				label: 'Assignments Completed',
				data: [3, 5, 4, 8, 7, 10, 9],
				borderColor: 'rgb(59, 130, 246)',
				backgroundColor: 'rgba(59, 130, 246, 0.1)',
				tension: 0.4,
				fill: true,
			},
		],
	}

	const doughnutData = {
		labels: ['Completed', 'In Progress', 'Not Started'],
		datasets: [
			{
				data: [45, 35, 20],
				backgroundColor: ['rgb(34, 197, 94)', 'rgb(59, 130, 246)', 'rgb(226, 232, 240)'],
				borderWidth: 0,
			},
		],
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
				labels: {
					color: '#6B7280',
					font: {
						family: "'Poppins', sans-serif",
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: 'rgba(0, 0, 0, 0.05)',
				},
				ticks: {
					color: '#6B7280',
					font: {
						family: "'Poppins', sans-serif",
					},
				},
			},
			x: {
				grid: {
					color: 'rgba(0, 0, 0, 0.05)',
				},
				ticks: {
					color: '#6B7280',
					font: {
						family: "'Poppins', sans-serif",
					},
				},
			},
		},
	}

	const doughnutOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					color: '#6B7280',
					font: {
						family: "'Poppins', sans-serif",
					},
				},
			},
		},
	}

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
			<div className="p-6 border-b border-gray-200 dark:border-gray-700">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Progress</h2>
						<p className="text-gray-600 dark:text-gray-400 mt-1">Track your study progress over time</p>
					</div>
					<div className="flex space-x-2">
						<button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">Monthly</button>
						<button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-lg">Weekly</button>
					</div>
				</div>
			</div>

			<div className="p-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2">
						<div className="h-80">
							<Line data={lineData} options={options} />
						</div>
					</div>
					<div className="lg:col-span-1">
						<div className="h-80">
							<Doughnut data={doughnutData} options={doughnutOptions} />
						</div>
						<div className="mt-6 grid grid-cols-3 gap-4 text-center">
							<div>
								<div className="text-2xl font-bold text-gray-900 dark:text-white">45%</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-gray-900 dark:text-white">35%</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-gray-900 dark:text-white">20%</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">Not Started</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-semibold text-gray-900 dark:text-white">Weekly Goal Progress</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">15/20 hours completed</p>
						</div>
						<div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
							<motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ delay: 1, duration: 1 }} className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
						</div>
						<span className="font-semibold text-gray-900 dark:text-white">75%</span>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default ProgressChart
