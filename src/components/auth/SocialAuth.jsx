import { BsGithub, BsGoogle } from 'react-icons/bs'
import { useAuth } from '../../contexts/AuthContext'
import { googleAuth } from '../../services/githubAuth'
import { githubAuth } from '../../services/googleAuth'

import Button from '../UI/Button'

const SocialAuth = () => {
    const { setUser, setLoading } = useAuth()

    const handleGoogleAuth = async () => {
        setLoading(true)
        try {
            const response = await googleAuth.signIn()
            setUser(response.user)
        } catch (error) {
            console.error('Google auth error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleGithubAuth = async () => {
        setLoading(true)
        try {
            const response = await githubAuth.signIn()
            setUser(response.user)
        } catch (error) {
            console.error('GitHub auth error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            <Button variant="google" onClick={handleGoogleAuth}>
                <BsGoogle className="fab fa-google text-red-500 mr-2" /> Google
            </Button>
            <Button variant="github" onClick={handleGithubAuth}>
                <BsGithub  className="fab fa-github mr-2" /> GitHub
            </Button>
        </div>
    )
}

export default SocialAuth
