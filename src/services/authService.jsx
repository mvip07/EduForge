export const authService = {
    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'user@example.com' && password === 'password') {
                    resolve({
                        user: {
                            id: 1,
                            email,
                            name: 'John Doe',
                            isVerified: false,
                        },
                        token: 'mock-jwt-token',
                    })
                } else {
                    reject(new Error('Invalid credentials'))
                }
            }, 1000)
        })
    },

    async register(userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id: Date.now(),
                        ...userData,
                        isVerified: false,
                    },
                    token: 'mock-jwt-token',
                })
            }, 1000)
        })
    },

    async forgotPassword(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true })
            }, 1000)
        })
    },

    async resetPassword(token, newPassword) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true })
            }, 1000)
        })
    },

    async verifyEmail(code) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true })
            }, 1000)
        })
    },
}
