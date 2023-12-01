/**
 * 用户相关api
 */
import request from '@/utils/request'



// 企业登录
export function firmLogin(data) {
	return request({
		url: '/entrepreneurLogin',
		method: 'post',
		data: data
	})
}
// 个人登录
export function personLogin(data) {
	return request({
		url: '/personageLogin',
		method: 'post',
		data: data
	})
}



// 任务订单新增
export function casualOrderAdd(){
	return request({
		url: '/web/casualOrder/add',
		method: 'post'
	})
}
//ta的用工记录
export function employment(params){
	return request({
		url: '/app/employment_records',
		method: 'get',
		params:params
	})
}
// 我的下单人查询
export function personage(params){
	return request({
		url: '/app/my_personage',
		method: 'get',
		params:params
	})
}
// 取消订单
export function casualOrder(params){
	return request({
		url: '/web/casualOrder/cancellationOrder',
		method: 'get',
		params:params
	})
}
// 任务订单信息
export function casualOrderPages(params){
	return request({
		url: '/web/casualOrder/pages',
		method: 'get',
		params:params
	})
}
// 订单明细查询
export function getorderItems(params){
	return request({
		url: '/web/casualOrder/getorderItems',
		method: 'get',
		params:params
	})
}
// 根据订单id 和 工程师id 查询进行中的订单详情
export function listOrderItem(params){
	return request({
		url: '/web/casualOrder/listOrderItem',
		method: 'get',
		params:params
	})
}
// 子账户修改
export function updateItem(data) {
	return request({
		url: '/updateItem',
		method: 'post',
		data: data
	})
}
// 子账户修改
export function getuser(data) {
	console.log(data,'data');
	return request({
		url: '/getByIdEntrepreneur?id='+data,
		method: 'post',
	})
}
//企业用户修改
export function casuaEdit(data) {
	console.log(data,'data');
	return request({
		url: '/web/casualEntrepreneur/edit',
		method: 'post',
		data: data
	})
}
//工程师端-关于我们
export function engineerEndAboutUs(params) {
	return request({
		url: '/aboutUs',
		method: 'get',
		params: params,
	})
}

// 联系客服
export function tomerService(params) {
	return request({
		url: '/consultCustomerService',
		method: 'get',
		params: params,
	})
}