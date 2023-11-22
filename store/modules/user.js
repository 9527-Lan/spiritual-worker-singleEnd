import {
	login,
	firmLogin,
	personLogin
} from '@/api/user.js'

const state = {
	hasLogin: false,
	nickname: '',
	avatar: '',
	balance: 0,
	loginType: null, // 1企业 2个人
	memberId: '',
	userInfo:{},
	userInfoItem: {}
}

const mutations = {
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
	SET_USER_INFO_ITEM: (state, userInfoItem) => {
		state.userInfoItem = userInfoItem
	},
	SET_LOGIN_TYPE: (state, loginType) => {
		state.loginType = loginType
	},
	SET_HAS_LOGIN: (state, hasLogin) => {
		state.hasLogin = hasLogin
	},
	SET_NICKNAME: (state, nickname) => {
		state.nickname = nickname
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_BALANCE: (state, balance) => {
		state.balance = balance
	},
	SET_MEMBERID: (state, memberId) => {
		state.memberId = memberId
	}
}

const actions = {
	//  #ifndef MP
	login({
		commit
	}, data) {
		const {
			mobile,
			code
		} = data
		return new Promise((resolve, reject) => {
			login(mobile, code).then(response => {
				const {
					access_token,
					token_type
				} = response.data
				const token = token_type + " " + access_token
				uni.setStorageSync('token', token)
				commit('SET_HAS_LOGIN', true)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	// #endif
	firmLogin({
		commit
	}, data) {
		return new Promise((resolve, reject) => {
			firmLogin(data).then(response => {
				console.log(response.data);
				let data = response.data
				let userInfo = data.casualEntrepreneur
				let userInfoItem = data.casualEntrepreneurItem
				uni.setStorageSync('userInfo', userInfo)
				uni.setStorageSync('userInfoItem', userInfoItem)
				commit('SET_LOGIN_TYPE', 1)
				commit('SET_USER_INFO', userInfo)
				commit('SET_USER_INFO_ITEM', userInfoItem)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}