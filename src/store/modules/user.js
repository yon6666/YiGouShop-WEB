export default {
    state () {
        return {
            profile: {
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                token: ''
            }
}
    },
    mutations: {
        setUser (state, payload) {
            state.profile = payload
        }
    }
}
