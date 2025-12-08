import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdPayment } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { IoIosChatbubbles } from 'react-icons/io'
import { FaCalendarAlt, FaCog, FaHome } from 'react-icons/fa'
import { FaArrowRightFromBracket, FaBookOpen, FaCertificate, FaChartLine, FaCircle, FaCrown, FaMessage } from 'react-icons/fa6'
import EduForge from '../assets/logo/eduforge.png'

const Sidebar = ({ isOpen, onClose }) => {
	const { user } = useAuth()
	const navigate = useNavigate()

	const menuItems = [
		{ icon: <FaHome className="text-center w-5" />, label: 'Dashboard', path: '/' },
		{ icon: <FaBookOpen className="text-center w-5" />, label: 'My Courses', path: '/courses' },
		{ icon: <FaChartLine className="text-center w-5" />, label: 'Progress', path: '/progress/analytics' },
		{ icon: <FaCalendarAlt className="text-center w-5" />, label: 'Schedule', path: '/calendar' },
		{ icon: <FaCertificate className="text-center w-5" />, label: 'Certificates', path: '/certificates' },
		{ icon: <IoIosChatbubbles className="text-center w-5" />, label: 'Forum', path: '/forum' },
		{ icon: <FaMessage className="text-center w-5" />, label: 'Message', path: '/message' },
		{ icon: <MdPayment className="text-center w-5" />, label: 'Payment', path: '/payments' },
		{ icon: <BiSupport className="text-center w-5" />, label: 'Support', path: '/support' },
		{ icon: <FaCog className="text-center w-5" />, label: 'Settings', path: '/settings' },
	]

	const handleLogout = () => {
		navigate('/login')
	}

	return (
		<motion.aside initial={{ x: -320 }} animate={{ x: isOpen ? 0 : -320 }} transition={{ type: 'spring', damping: 25 }} className="fixed inset-y-0 left-0 lg:left-80 z-80 w-80 bg-white dark:bg-gray-800 shadow-2xl">
			<div className="w-full flex flex-col h-full overflow-y-auto scollbar-none">
				<div className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-indigo-600">
					<div className="flex items-center space-x-2">
						<div className="size-15 p-[2px] rounded-full bg-white flex items-center justify-center">
							<img src={EduForge} alt="EduForge Logo" loading="lazy" />
						</div>
						<span className="text-white font-bold text-xl">EduForge</span>
					</div>
				</div>

				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center space-x-3">
						<div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
							{user?.firstName?.charAt(0)}
							{user?.lastName?.charAt(0)}
						</div>
						<div>
							<p className="font-semibold text-gray-900 dark:text-white">
								{user?.firstName} {user?.lastName}
							</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
							<div className="flex items-center mt-1">
								<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
									<FaCircle className="text-xs mr-1" />
									Student
								</span>
							</div>
						</div>
					</div>
				</div>

				<nav className="flex-1 p-4 space-y-2">
					{menuItems.map((item, index) => (
						<motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
							<NavLink to={item.path} onClick={onClose} className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-600 dark:text-purple-300 border-l-4 border-purple-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
								{item.icon}
								<span>{item.label}</span>
							</NavLink>
						</motion.div>
					))}
				</nav>

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="p-4 m-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
					<div className="text-center">
						<FaCrown className="text-2xl mb-2" />
						<p className="font-semibold mb-2">Upgrade to Pro</p>
						<p className="text-sm text-purple-100 mb-3">Get unlimited access to all courses</p>
						<button className="w-full bg-white text-purple-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">Upgrade Now</button>
					</div>
				</motion.div>

				<div className="p-4 border-t border-gray-200 dark:border-gray-700">
					<button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors duration-300">
						<FaArrowRightFromBracket />
						<span>Logout</span>
					</button>
				</div>
			</div>
		</motion.aside>
	)
}

export default Sidebar
