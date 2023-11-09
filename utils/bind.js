import Vue from 'vue'

module.exports = (vm) => {
	
	Vue.prototype.$toRoute = (url, params = {}, type = 'to') => {
		if (!url) return;
		uni.$u.route({
			url,
			params,
			type
		})
	}
	//
	Vue.prototype.$ShowModal = (content, showCancel = true, title = '提示') => {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title,
				content,
				showCancel,
				success(e) {
					if (e.confirm) {
						resolve();
					} else {
						reject();
					}
				},
				fail() {
					reject();
				}
			})
		})
	}
}
