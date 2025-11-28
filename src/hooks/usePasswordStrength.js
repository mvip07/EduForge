import { useState, useCallback } from 'react'

export const usePasswordStrength = () => {
    const [strength, setStrength] = useState({ score: 0, feedback: '', color: 'bg-red-500' })

    const calculateStrength = useCallback((password) => {
        let score = 0
        let feedback = []

        if (!password) {
            setStrength({ score: 0, feedback: '', color: 'bg-red-500' })
            return
        }

        if (password.length >= 8) score += 1
        else feedback.push('At least 8 characters')

        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
        else feedback.push('Both lowercase and uppercase letters')

        if (/\d/.test(password)) score += 1
        else feedback.push('At least one number')

        if (/[^A-Za-z0-9]/.test(password)) score += 1
        else feedback.push('At least one special character')

        let color
        switch (score) {
            case 1:
                color = 'bg-red-500'
                break
            case 2:
                color = 'bg-orange-500'
                break
            case 3:
                color = 'bg-yellow-500'
                break
            case 4:
                color = 'bg-green-500'
                break
            default:
                color = 'bg-red-500'
        }

        const strengthText = score === 0 ? 'Very Weak' : score === 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong'

        setStrength({ score, feedback: feedback.length > 0 ? `Needs: ${feedback.join(', ')}` : strengthText, color })
    }, [])

    return { strength, calculateStrength }
}
