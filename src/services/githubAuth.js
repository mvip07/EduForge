export const googleAuth = {
    init() {
        console.log('Google Auth initialized')
    },

    async signIn() {
        // Simulate Google Sign In
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id: 'google-123',
                        email: 'user@gmail.com',
                        name: 'Google User',
                        isVerified: true,
                    },
                    token: 'google-auth-token',
                })
            }, 1000)
        })
    },
}
