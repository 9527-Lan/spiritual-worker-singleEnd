import request from '@/utils/request'
// 首页列表渲染
export function employmentPerson (params){
	return request({
		url: '/LowerSingleEnd/app/employment_records',
		method: 'get',
		params:params,
	})
}

// 获取用工类型
export function getWorkType (params){
	return request({
		url: '/web/casualServiceLabel/getByIdOption',
		method: 'get',
		params:params,
	})
}
// 服务类型

export function getType (){
	return request({
		url: '/web/casualServiceType/options',
		method: 'get',
	})
}