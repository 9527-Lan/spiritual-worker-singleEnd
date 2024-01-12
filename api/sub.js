import request from '@/utils/request'
// 首页列表渲染
export function employmentPerson (params){
	return request({
		url: '/app/employment_records',
		method: 'get',
		params:params,
	})
}
//截止抢单
export function casualOrderCutoff (params){
	return request({
		url: '/web/casualOrder/cutoff',
		method: 'get',
		params:params,
	})
}
//信用分变更
export function creditscoreEdit (params){
	return request({
		url: '/creditscoreEdit',
		method: 'get',
		params:params,
	})
}
//查询所有的工程师不分页
export function casualEngineerList (params){
	return request({
		url: '/web/casualEngineer/list',
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
export function casualOrderCopy (params){
	return request({
		url: '/web/casualOrder/copy',
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
export function casualEngineerAdd (params,){
	console.log('data',params,)
	return request({
		url: '/web/casualEngineer/add',
		method: 'get',
		params,
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
// 已结算订单查询人员详情
export function reviewNodes (id){
	return request({
		url: '/reviewNodes',
		method: 'get',
		params:{orderId:id},
	})
}
// 下单端-一键下单修改
export function edit (data){
	return request({
		url: '/web/casualOrder/edit',
		method: 'post',
		data,
	})
}
// 取消下单
export function orderItemDesc (params){
	return request({
		url: '/web/casualOrder/orderItemDesc',
		method: 'get',
		params:params,
	})
}

// 下单人根据id 查询创建的订单
export function queryOrderbyCjId (params){
	return request({
		url: '/queryOrderbyCjId',
		method: 'get',
		params:params,
	})
}
// 下单人根据id 查询取消的订单
export function queryOrderbyQxId (params){
	return request({
		url: '/queryOrderbyQxId',
		method: 'get',
		params:params,
	})
}
// 订单明细查询
export function getorderItems (id){
	return request({
		url: '/web/casualOrder/getById',
		method: 'get',
		params:{id:id},
	})
}