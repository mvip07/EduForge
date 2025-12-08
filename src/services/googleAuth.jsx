export const githubAuth = {
    init() {
        // Initialize GitHub Auth
        console.log('GitHub Auth initialized')
    },

    async signIn() {
        // Simulate GitHub Sign In
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id: 'github-123',
                        email: 'user@github.com',
                        name: 'GitHub User',
                        isVerified: true,
                    },
                    token: 'github-auth-token',
                })
            }, 1000)
        })
    },
}
