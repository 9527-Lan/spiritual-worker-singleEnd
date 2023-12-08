<template>
	<view class="pages-order-index">
		<u-navbar :bgColor="bgColor" :title="typeList[currentType].title"
			:titleStyle="{ fontSize: '34rpx', color: '#000000' }">
			<u-icon slot="left" color="#333" size="34rpx" name="arrow-left" @click="onBack"></u-icon>
		</u-navbar>
		<view class="flex-center">
			<view class="select-box" @click="onTypePickShow">
				<u-icon :label="typeList[currentType].title" label-color="#333333" labelSize="28rpx"></u-icon>
				<u-icon size="18rpx" name="arrow-down-fill" color="#333333"></u-icon>
			</view>
		</view>
		<view class="order-list">
			<orderItem v-for="(item, index) in orderList" :key="index" :compData="item"></orderItem>
		</view>

		<view class="page-footer">
			<u-icon name="phone" label="平台客服" label-pos="bottom" label-size="20rpx" label-color="#333" size="36rpx"
				class="page-footer"></u-icon>
		</view>
		<u-picker :show="typePickerVisble" :columns="[typeList]" keyName="title" @confirm="onTypePickConfirm"
			@cancel="onTypePickCancle"></u-picker>
	</view>
</template>

<script>
import orderItem from './components/order-item.vue'
import {
	queryOrderbyEngId,
	queryOrderbyJxzEngId,
	queryOrderbyWcEngId,
	queryOrderbyYcEngId,
	queryOrderbyCjId
} from '@/api/sub.js'
import { toChineseBig } from '@/utils/utils.js'
export default {
	components: {
		orderItem,
	},
	data() {
		return {
			bgColor: '#f2f6ff',
			currentType: 0,
			currentValue: '',
			typeList: [
				{ title: '进行中', value: 0 },
				{ title: '抢单中', value: 0 },
				{ title: '已完成', value: 0 },
				{ title: '异常订单', value: 0 },
				{ title: '已创建', value: 0 },
			],
			typePickerVisble: false,
			orderList: [],
			being: [
				{
					state: 'being',
					title: '临时电工',
					salary: '300元/天',
					jobs: 9,
					tags: ['中级电工证'],
					address: '金碧物业有限公司',
					startTime: '2023.09.18',
					endTime: '2023.09.20',
					employeesNumber: 9,
					progress: {
						current: 2,
						dateList: [
							{ day: '第一天', time: '2023.09.17' },
							{ day: '第二天', time: '2023.09.18' },
							{ day: '第三天', time: '2023.09.19' },
							{ day: '第四天', time: '2023.09.20' },
						],
					},
				},
			],
			grab: [
				{
					state: 'grab',
					title: '临时电工',
					salary: '300元/天',
					jobs: 9,
					tags: ['中级电工证'],
					address: '金碧物业有限公司',
					startTime: '2023.09.18',
					endTime: '2023.09.20',
					employeesNumber: 9,
					count: 9,
					successCount: 1,
				},
			],
			completes: [
				{
					state: 'completing',
					title: '临时电工',
					jobs: 9,
					salary: '300元/天',
					tags: ['退伍军人', '1米8以上'],
					address: '长沙湘银物业有限公司',
					completeTime: '2023.09.18 16:05:59',
				},
				{
					state: 'completed',
					title: '临时电工',
					salary: '300元/天',
					jobs: 5,
					tags: ['中级电工证'],
					address: '金碧物业有限公司',
					completeTime: '2023.09.18 16:05:59',
				},
			],
			exceptions: [
				{
					state: 'exception',
					title: '临时保洁',
					jobs: 9,
					salary: '200元/天',
					tags: ['不限年龄'],
					address: '金碧物业有限公司',
					startTime: '2023.09.18',
					endTime: '2023.09.20',
				},
				{
					state: 'exception',
					title: '写字楼保洁员',
					salary: '200元/天',
					jobs: 5,
					tags: ['不限年龄'],
					address: '湖南湘银物业有限公司',
					startTime: '2023.09.18',
					endTime: '2023.09.20',
				},
			],
		}
	},
	async onLoad(event) {
		console.log(event.state, 'event')
		let state = event.state
		this.currentValue = state
		console.log("this.currentValue", this.currentValue);
		this.switchStatus()
	},

	onPullDownRefresh() {
		this.switchStatus()
	},
	methods: {
		onBack() {
			uni.navigateBack(1)
		},

		onTypePickShow() {
			this.typePickerVisble = true
		},
		onTypePickCancle() {
			this.typePickerVisble = false
		},
		onTypePickConfirm(event) {
			console.log('onTypePickConfirm', event)
			this.currentType = event.indexs[0]
			this.typePickerVisble = false
			// switch (event.indexs[0]) {
			// 	case 0:
			// 		this.orderList = JSON.parse(JSON.stringify(this.being))
			// 		break
			// 	case 1:
			// 		this.orderList = JSON.parse(JSON.stringify(this.grab))
			// 		break
			// 	case 2:
			// 		this.orderList = JSON.parse(JSON.stringify(this.completes))
			// 		break
			// 	case 3:
			// 		this.orderList = JSON.parse(JSON.stringify(this.exceptions))
			// 		break
			// 	default:
			// 		break
			// }
		},
		switchStatus() {
			let userInfo = this.$store.state.user.userInfo
			let userId = userInfo.id
			let loginType = this.$store.state.user.loginType
			switch (this.currentValue) {
				case 'being':
					this.currentType = 0
					this.getBeingList(userId, loginType)
					break
				case 'grab':
					this.currentType = 1
					this.getGrabList(userId, loginType)
					break
				case 'completes':
					this.currentType = 2
					this.getCompletesList(userId, loginType)
					break
				case 'exception':
					this.currentType = 3;
					this.getExceptionsList(userId, loginType)
					break
				case 'creatyj':
					this.currentType = 4
					this.getcreateyjList(userId, loginType)
					break;
				default:
					break
			}
			uni.stopPullDownRefresh()
		},
		async getGrabList(userId, loginType) {
			let res = await queryOrderbyEngId({ id: userId, type: loginType })
			console.log(res);
			if (res.data.length) {
				let data = res.data.map(el => {
					return {
						...el,
						state: this.currentValue
					}
				});
				this.orderList = data
			}
		},
		async getBeingList(userId, loginType) {
			let res = await queryOrderbyJxzEngId({ id: userId, type: loginType })
			if (res.data.length) {
				let data = res.data.map(el => {
					let dateList = el.casualOrderRecords.map((el, index) => {
						let big = toChineseBig(index + 1)
						return {
							day: '第' + big + '天',
							time: el.order_date
						}
					})
					let sign = el.casualOrderRecords.filter(el => { return el.sign })
					return {
						...el,
						state: this.currentValue,
						progress: {
							current: sign.length - 1,
							dateList: dateList,
						}
					}
				});
				this.orderList = data
				console.log('BeingList', this.orderList)
			}
		},
		async getCompletesList(userId, loginType) {
			let res = await queryOrderbyWcEngId({ id: userId, type: loginType })
			console.log(res, 'res');
			if (res.data.length) {
				let data = res.data.map(el => {
					return {
						...el,
						state: el.settlementStatusText === '已结算' ? 'completed' : el.settlementStatusText === '未结算' ? 'completing' : ''
					}
				});
				console.log(data, '22222');
				this.orderList = data
			}
		},
		async getExceptionsList(userId, loginType) {
			let res = await queryOrderbyYcEngId({ id: userId, type: loginType })
			if (res.data.length) {
				let data = res.data.map(el => {
					return {
						...el,
						state: this.currentValue
					}
				});
				this.orderList = data
			}
		},
		async getcreateyjList(userId, loginType) {
			let res = await queryOrderbyCjId({ id: userId, type: loginType })
			if (res.data.length) {
				let data = res.data.map(el => {
					return {
						...el,
						state: this.currentValue

					}
				});
				console.log(data, '22222');
				this.orderList = data
			}
		}
	},
}
</script>

<style lang="scss">
page {
	background-color: #f2f6ff;
}

.pages-order-index {
	padding: 0 32rpx;
	padding-top: 203rpx;
	width: 100%;

	.flex-center {
		display: flex;
		align-items: center;
	}

	.select-box {
		display: flex;
		margin-top: 40rpx;

		.u-icon {
			&+.u-icon {
				margin-left: 20rpx;
			}
		}

		&+.select-box {
			margin-left: 20rpx;
		}
	}

	.order-list {
		margin-top: 42rpx;
	}

	.page-footer {
		position: fixed;
		z-index: 3;
		left: 0;
		right: 0;
		bottom: 0;
		height: 173rpx;
		padding: 20rpx 42rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
}</style>
