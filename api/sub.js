import request from '@/utils/request'
// 首页列表渲染
export function employmentPerson (params){
	return request({
		url: '/app/employment_records',
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


// 一键下单

export function submitLis (data){
	return request({
		url: '/web/casualOrder/add',
		method: 'post',
		data,
	})
}

// 确认下单

export function surePre (params){
	return request({
		url: '/web/casualOrder/releaseOrder',
		method: 'get',
		params:params,
	})
}

// 抢单中 

export function casualOrderEngineerList (params){
	return request({
		url: '/web/casualOrder/casualOrderEngineerList',
		method: 'get',
		params:params,
	})
}

//任务id查询订单详情

export function casualOrder (params){
	return request({
		url: '/web/casualOrder/getById',
		method: 'get',
		params:params,
	})
}

//撤销订单

export function cancellationOrder (params){
	return request({
		url: '/web/casualOrder/cancellationOrder',
		method: 'get',
		params:params,
	})
}

// 个人中心订单

export function personage (params){
	return request({
		url: '/app/my_personage',
		method: 'get',
		params:params,
	})
}

// 抢单中订单
export function queryOrderbyEngId (params){
	return request({
		url: '/queryOrderbyEngId',
		method: 'get',
		params:params,
	})
}

// 进行中订单
export function queryOrderbyJxzEngId(params) {
	return request({
		url: '/queryOrderbyJxzEngId',
		method: 'get',
		params:params
	})
}

// 已完成订单
export function queryOrderbyWcEngId(params) {
	return request({
		url: '/queryOrderbyWcEngId',
		method: 'get',
		params:params
	})
}

// 异常订单
export function queryOrderbyYcEngId(params) {
	return request({
		url: '/queryOrderbyYcEngId',
		method: 'get',
		params:params
	})
}