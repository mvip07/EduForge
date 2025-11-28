import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import VerificationForm from './components/auth/VerificationForm'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm'
import ResetPasswordForm from './components/auth/ResetPasswordForm'
import AuthPage from './auth/AuthPage'

function App() {
    return (
        <>
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
                </Routes>
            </AuthProvider>
        </>
    )
}

export default App