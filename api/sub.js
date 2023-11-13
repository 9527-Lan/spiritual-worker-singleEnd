import request from '@/utils/request'
// 首页列表渲染
export function employmentPerson (params){
	return request({
		url: '/LowerSingleEnd/app/employment_records',
		method: 'get',
		params:params,
	})
}