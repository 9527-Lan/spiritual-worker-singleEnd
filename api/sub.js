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
	console.log('data',data)
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
// 下单端-抢单中工程师列表
export function getcasualOrderList(id){
	return request({
		url:"/web/casualOrder/casualOrderEngineerList",
		method:'get',
		params:{order_id:id}
	})
}
// 任务订单根据id查询
export function getcasualOrder(id){
	return request({
		url:"/web/casualOrder/getById",
		method:'get',
		params:{id:id}
	})
}

// 根据id查工人详情
export function getEngineerdetail(id){
	return request({
		url: '/web/casualEngineer/querybyId',
		method: 'get',
		params:{id:id}
	})
}
// 抢单成功
export function successBtn(params){
	return request({
		url:'/web/casualOrder/orderItemAdd',
		method:'get',
		params:params
	})
}

//  已完成订单详情-待结算
export function listOrderSetbtn(id){
	return request({
		url:'/web/casualOrder/listOrderSettlementItem',
		method:'get',
		params:{order_id:id}
	})
}
// 订单结算保存
export function submit (data){
	console.log('data',data)
	return request({
		url: '/payOrder',
		method: 'post',
		data,
	})
}
// 订单审核
export function examine (data){
	return request({
		url: '/examine',
		method: 'get',
		params:data,
	})
}

// 已完成支付明细
export function listOrderPay (id){
	return request({
		url: '/web/casualOrder/listOrderPay',
		method: 'get',
		params:{order_id:id},
	})
}
// 已结算订单查询人员详情
export function settlementSubmission (id){
	return request({
		url: '/web/casualOrder/listOrderPay',
		method: 'get',
		params:{order_id:id},
	})
}