import request from '@/utils/request'
// 首页列表渲染
export function findCasualEngineer(params){
	return request({
		url: '/web/casualEngineer/pages',
		method: 'get',
		params:params,
	})
}
// 首页tab栏渲染
export function casualServiceType(){
	return request({
		url: '/web/casualServiceType/options',
		method: 'get',
	})
}


// 首页搜索接口
export function casualEngineerSearch(params){
	return request({
		url: '/web/casualEngineer/pages',
		method: 'get',
		params:params,
	})
}


