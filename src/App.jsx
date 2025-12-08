import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthPage from './auth/AuthPage'

import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import VerificationForm from './components/auth/VerificationForm'
import ResetPasswordForm from './components/auth/ResetPasswordForm'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm'

import Courses from './pages/courses/Courses'
import Settings from './pages/settings/Settings'
import Calendar from './pages/calendar/Calendar'
import SupportCenter from './pages/support/Support'
import Dashboard from './pages/dashboard/Dashboard'
import PaymentsBilling from './pages/payments/Payments'
import Certificates from './pages/certificates/Certificates'
import ForumCommunity from './pages/forumCommunity/ForumCommunity'
import ProgressAnalytics from './pages/progressAnalytics/ProgressAnalytics'
import MessagesNotifications from './pages/messageNotifications/MessageNotification'

import Quizzes from './pages/coursePlayer/components/Quizzes'
import Resources from './pages/coursePlayer/components/Resources'
import Discussions from './pages/coursePlayer/components/Discussions'
import Assignments from './pages/coursePlayer/components/Assignments'
import LessonNotes from './pages/coursePlayer/components/LessonNotes'
import LessonPlayer from './pages/coursePlayer/components/LessonPlayer'
import CourseOverview from './pages/coursePlayer/components/CourseOverview'

import CoursePlayerLayout from './pages/coursePlayer/CoursePlayer'

function App() {
	return (
		<div>
			<ToastContainer />
			<AuthProvider>
				<Routes>
					<Route
						element={
							<AuthPage>
								<RegisterForm />
							</AuthPage>
						}
						path="/auth/register"
					/>
					<Route
						element={
							<AuthPage>
								<LoginForm />
							</AuthPage>
						}
						path="/auth/login"
					/>
					<Route
						element={
							<AuthPage>
								<VerificationForm />
							</AuthPage>
						}
						path="/auth/verification"
					/>
					<Route
						element={
							<AuthPage>
								<ForgotPasswordForm />
							</AuthPage>
						}
						path="/auth/forgot/password"
					/>
					<Route
						element={
							<AuthPage>
								<ResetPasswordForm />
							</AuthPage>
						}
						path="/auth/new/password"
					/>

					<Route
						path="/courses/:courseId"
						element={
							<CoursePlayerLayout>
								<CourseOverview />
							</CoursePlayerLayout>
						}
					/>

					<Route
						path="/courses/:courseId/player"
						element={
							<CoursePlayerLayout>
								<LessonPlayer />
							</CoursePlayerLayout>
						}
					/>

					<Route
						path="/courses/:courseId/notes"
						element={
							<CoursePlayerLayout>
								<LessonNotes />
							</CoursePlayerLayout>
						}
					/>

					<Route
						path="/courses/:courseId/assignments"
						element={
							<CoursePlayerLayout>
								<Assignments />
							</CoursePlayerLayout>
						}
					/>

					<Route
						path="/courses/:courseId/quizzes"
						element={
							<CoursePlayerLayout>
								<Quizzes />
							</CoursePlayerLayout>
						}
					/>

					<Route
						path="/courses/:courseId/discussions"
						element={
							<CoursePlayerLayout>
								<Discussions />
							</CoursePlayerLayout>
						}
					/>

					<Route
						path="/courses/:courseId/resources"
						element={
							<CoursePlayerLayout>
								<Resources />
							</CoursePlayerLayout>
						}
					/>

					<Route path="/" element={<Dashboard />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/support" element={<SupportCenter />} />
					<Route path="/forum" element={<ForumCommunity />} />
					<Route path="/certificates" element={<Certificates />} />
					<Route path="/payments" element={<PaymentsBilling />} />
					<Route path="/message" element={<MessagesNotifications />} />
					<Route path="/progress/analytics" element={<ProgressAnalytics />} />
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
