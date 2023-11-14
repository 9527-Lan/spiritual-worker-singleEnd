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


// 一键下单

export function submitLis (data){
	return request({
		url: '/LowerSingleEnd/web/casualOrder/add',
		method: 'post',
		data,
	})
}

// 确认下单

export function surePre (params){
	return request({
		url: '/LowerSingleEnd/web/casualOrder/releaseOrder',
		method: 'get',
		params:params,
	})
}

// 抢单中 

export function casualOrderEngineerList (params){
	return request({
		url: '/LowerSingleEnd/web/casualOrder/casualOrderEngineerList',
		method: 'get',
		params:params,
	})
}

//任务id查询订单详情

export function casualOrder (params){
	return request({
		url: '/LowerSingleEnd/web/casualOrder/getById',
		method: 'get',
		params:params,
	})
}

//撤销订单

export function cancellationOrder (params){
	return request({
		url: '/LowerSingleEnd/web/casualOrder/cancellationOrder',
		method: 'get',
		params:params,
	})
}

// 个人中心订单

export function personage (params){
	return request({
		url: '/LowerSingleEnd/app/my_personage',
		method: 'get',
		params:params,
	})
}

// 抢单中订单

export function queryOrderbyEngId (params){
	return request({
		url: '/LowerSingleEnd/queryOrderbyEngId',
		method: 'get',
		params:params,
	})
}