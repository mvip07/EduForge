import API from '../lib/axios'

export const AuthServices = {
    async register(data) {
        return await API.post('/auth/register', data)
    },
}
