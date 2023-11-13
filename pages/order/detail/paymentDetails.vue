<template>
	<view class="pages-order-detail-paymentDetails">
		<view class="header"></view>
		<view class="body-wrapper">
			<orderInfo :compData="compData">
				<view slot="footer" class="orderStatistic-container">
					<u-grid :col="3" :border="false">
						<u-grid-item v-for="(item, index) in orderStatistics" :key="index">
							<view class="orderStatistic-item">
								<view class="item-title" :style="{ color: item.color }">{{ item.title }}</view>
								<view class="item-value" :style="{ color: item.color }">{{ compData.orderStatistics[item.field] }}</view>
							</view>
						</u-grid-item>
					</u-grid>
				</view>
			</orderInfo>
			<view class="payment-list">
				<view class="title">支付明细</view>
				<view class="payment-item" v-for="(item, index) in compData.employees" :key="index">
					<view class="payment-left flex-center">
						<u-avatar :src="item.img" size="92rpx"></u-avatar>
						<view class="name">{{ item.name }}</view>
					</view>
					<view class="payment-right">
						<view class="spend-salary">-{{ item.complete }}</view>
						<view class="spend-time">{{ item.spendTime }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="footer">
			<u-icon name="phone" label="平台客服" label-pos="bottom" label-size="20rpx" label-color="#333" size="36rpx"></u-icon>
		</view>
	</view>
</template>

<script>
	import orderInfo from './components/order-info.vue'
	export default {
		components: {
			orderInfo,
		},
		data() {
			return {
				editPopVisible: false,
				editForm: {
					name: '',
					img: '',
					times: '',
					complete: '',
					realComplete: '',
				},
				orderStatistics: [
					{ field: 'summary', title: '订单总额（元）', color: '#333333' },
					{ field: 'complete', title: '待结算（元）', color: '#333333' },
					{ field: 'Remain', title: '结余（元）', color: '#3A84F0' },
				],
				compData: {
					orderStatistics: {
						summary: '3,600.00',
						complete: '3,600.00',
						Remain: '0.00',
					},
					state: 'being',
					title: '临时电工',
					salary: '300元/天',
					jobs: 9,
					tags: ['中级电工证'],
					address: '长沙湘银物业有限公司',
					location: '长沙市岳麓区洋湖街道湘江时代写字楼A1栋',
					startTime: '2023.09.18',
					endTime: '2023.09.20',
					// title: '用工列表',
					tags: ['退伍军人', '1米8以上'],
					count: 9,
					employeesCopy: [],
					employees: [
						{
							name: '张三三',
							complete: '1200.00',
							spendTime: '2023.09.18 12:05:14',
							img: 'https://cdn.uviewui.com/uview/album/1.jpg',
							progress: {
								current: 1,
								dateList: [
									{
										day: '第一天',
										isRecord: true,
										time: '2023.09.17 10:25:30',
										remark: '备注：已完成安保工作',
										imgs: [
											'https://cdn.uviewui.com/uview/album/1.jpg',
											'https://cdn.uviewui.com/uview/album/2.jpg',
											'https://cdn.uviewui.com/uview/album/3.jpg',
										],
									},
									{ day: '第二天', time: '2023.09.18 10:25:30', isRecord: true, imgs: ['https://cdn.uviewui.com/uview/album/1.jpg'] },
									{
										day: '第三天',
										time: '2023.09.19 10:25:30',
										isRecord: true,
										imgs: ['https://cdn.uviewui.com/uview/album/3.jpg'],
									},
								],
							},
						},
						{
							name: '李林',
							complete: '1200.00',
							spendTime: '2023.09.18 12:05:14',
							img: 'https://cdn.uviewui.com/uview/album/2.jpg',
							progress: {
								current: 0,
								dateList: [
									{
										day: '第一天',
										isRecord: true,
										time: '2023.09.17 10:25:30',
										remark: '备注：已完成安保工作',
										imgs: [
											'https://cdn.uviewui.com/uview/album/4.jpg',
											'https://cdn.uviewui.com/uview/album/5.jpg',
											'https://cdn.uviewui.com/uview/album/6.jpg',
										],
									},
									{ day: '第二天', time: '2023.09.18' },
									{ day: '第三天', time: '2023.09.19' },
								],
							},
						},
						{
							name: '肖国运',
							complete: '1200.00',
							spendTime: '2023.09.18 12:05:14',
							img: 'https://cdn.uviewui.com/uview/album/3.jpg',
							progress: {
								current: -1,
								dateList: [
									{
										day: '第一天',
										time: '2023.09.17 10:25:30',
									},
									{ day: '第二天', time: '2023.09.18' },
									{ day: '第三天', time: '2023.09.19' },
								],
							},
						},
					],
					description:
						'对公司的项目进行临时安保工作<br /><br />一、工作地点:<br />可根据个人意愿就近分配工作，如有环境不适应可申请调换。<br />二、任职资格:<br />1、年龄18-55周岁;身高180cm以上有无经验均可。<br />2、积极向上者优先考虑。<br />3、退伍军人优先，应届生，农村待业青年，下岗职工等。<br /><br />三、岗位职责:<br />1、年龄18-55周岁;身高180cm以上有无经验均可。<br />2、积极向上者优先考虑。<br />3、退伍军人优先，应届生，农村待业青年，下岗职工等。<br />',
				},
			}
		},
		methods: {
			toDetail() {
				this.$toRoute('/pages/order/detail/paymentDetails')
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.pages-order-detail-paymentDetails {
		position: relative;
		.header {
			background-color: #3a84f0;
			color: #fff;
			height: 340rpx;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
		}
		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}

		.orderStatistic-container {
			border-top: 1rpx solid #f0f0f0;
			background-color: #fff;
			.orderStatistic-item {
				height: 158rpx;
				line-height: 67rpx;
				.item-title {
					font-size: 24rpx;
					font-weight: 500;
				}
				.item-value {
					font-size: 32rpx;
					font-weight: 800;
				}
			}
		}
		.flex-center {
			display: flex;
			align-items: center;
		}
		.flex-center-between {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.salary {
			font-size: 32rpx;
			font-weight: bold;
			color: #3a84f0;
		}

		.body-wrapper {
			position: absolute;
			top: 32rpx;
			left: 0;
			right: 0;
			padding: 0 32rpx;
			box-sizing: border-box;
			z-index: 1;
			padding-bottom: 160rpx;
			overflow: hidden;
			border-radius: 15rpx;
			.payment-list {
				box-sizing: border-box;
				padding: 30rpx;
				padding-bottom: 0;
				// margin-top: 28rpx;
				background-color: #fff;
				border-radius: 15rpx;
				overflow: hidden;
				.payment-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 30rpx 0;
					& + .payment-item {
						border-top: 1px solid #f0f0f0;
					}
					.payment-left {
						width: 220rpx;
						.name {
							margin-left: 30rpx;
							font-size: 32rpx;
							font-weight: bold;
							color: #333333;
						}
					}
					.payment-right {
						width: 260rpx;
						text-align: right;
						// height: 100%;
						// display: flex;
						// flex-direction: column;
						// justify-content: space-between;
						.spend-salary {
							font-size: 32rpx;
							font-weight: 800;
							color: #666666;
						}
						.spend-time {
							font-size: 24rpx;
							font-weight: 500;
							color: #999999;
						}
						// height: 100%;
					}
				}
			}
		}
		.footer {
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
	}
</style>
