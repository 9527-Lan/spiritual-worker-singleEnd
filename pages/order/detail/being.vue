<template>
	<view class="pages-order-detail-being">
		<view class="header"></view>
		<view class="body-wrapper">
			<view class="body-wrapper-top">
				<view>状态：进行中</view>
				<view>当前用工数：{{ compData.employees.length }}</view>
				<view></view>
			</view>
			<view class="body">
				<template v-if="compData.employees.length > 0">
					<view class="flex-center-between">
						<view class="title">用工列表</view>
						<!-- <view class="salary">{{ compData.salary }}</view> -->
					</view>
					<view class="employee-list">
						<u-collapse :border="false">
							<u-collapse-item v-for="(item, index) in compData.employees" :icon="item.img"
								:title="item.name" :key="index">
								<view class="progress">
									<u-steps :current="item.progress.current" direction="column" dot>
										<u-steps-item v-for="(pItem, pIndex) in item.progress.dateList" :key="pIndex">
											<view slot="desc" class="progress-item flex-center">
												<view class="progress-item-left">
													<view v-if="pItem.isRecord" class="record-tag isRecord">已记录</view>
													<view v-else class="record-tag">待记录</view>
												</view>
												<view class="progress-item-right">
													<view class="day">{{ pItem.day }}</view>
													<view class="remark">{{ pItem.remark }}</view>
													<u-album v-if="pItem.imgs && pItem.imgs.length > 0" :rowCount="3"
														:urls="pItem.imgs"></u-album>
													<view class="time">{{ pItem.time }}</view>
												</view>
											</view>
										</u-steps-item>
									</u-steps>
								</view>
							</u-collapse-item>
						</u-collapse>
					</view>
				</template>
				<template v-else>
					<view class="empty-container">
						<u-empty text="暂无数据" icon="/static/empty.png" width="277rpx" height="186rpx" textSize="28rpx" />
					</view>
				</template>
			</view>

			<orderInfo :compData="compData"></orderInfo>
			<orderDescription :compData="compData"></orderDescription>
		</view>
		<view class="footer">
			<u-icon name="phone" label="平台客服" label-pos="bottom" label-size="20rpx" label-color="#333"
				size="36rpx"></u-icon>
		</view>
	</view>
</template>

<script>
	import {
		casualOrder,
		getorderItems,
		listOrderItem
	} from '@/api/user.js'
	import orderInfo from './components/order-info.vue'
	import orderDescription from './components/order-description.vue'
	export default {
		components: {
			orderInfo,
			orderDescription,
		},
		data() {
			return {
				compData: {
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
					count: 9,
					employees: [{
							name: '张三三',
							img: 'https://cdn.uviewui.com/uview/album/1.jpg',
							progress: {
								current: 1,
								dateList: [{
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
									{
										day: '第二天',
										time: '2023.09.18',
										isRecord: true
									},
									{
										day: '第三天',
										time: '2023.09.19'
									},
								],
							},
						},
						{
							name: '李林',
							img: 'https://cdn.uviewui.com/uview/album/2.jpg',
							progress: {
								current: 0,
								dateList: [{
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
									{
										day: '第二天',
										time: '2023.09.18'
									},
									{
										day: '第三天',
										time: '2023.09.19'
									},
								],
							},
						},
						{
							name: '肖国运',
							img: 'https://cdn.uviewui.com/uview/album/3.jpg',
							progress: {
								current: -1,
								dateList: [{
										day: '第一天',
										time: '2023.09.17 10:25:30',
									},
									{
										day: '第二天',
										time: '2023.09.18'
									},
									{
										day: '第三天',
										time: '2023.09.19'
									},
								],
							},
						},
					],
					description: '对公司的项目进行临时安保工作<br /><br />一、工作地点:<br />可根据个人意愿就近分配工作，如有环境不适应可申请调换。<br />二、任职资格:<br />1、年龄18-55周岁;身高180cm以上有无经验均可。<br />2、积极向上者优先考虑。<br />3、退伍军人优先，应届生，农村待业青年，下岗职工等。<br /><br />三、岗位职责:<br />1、年龄18-55周岁;身高180cm以上有无经验均可。<br />2、积极向上者优先考虑。<br />3、退伍军人优先，应届生，农村待业青年，下岗职工等。<br />',
				},
				id: "1",
				OrderId: '1',
				order_id: '10',
				engineer_id: '1',
			}
		},
		onLoad() {
			this.casualOrderList()
			this.getorderItemsList()
			this.listOrderItemList()
		},
		methods: {
			casualOrderList() {
				let params = {
					order_id: this.id
				}
				casualOrder(params).then(res => {
					console.log(res)
				})
			},
			getorderItemsList() {
				let params = {
					order_id: this.OrderId
				}
				getorderItems(params).then(res => {
					console.log(res)
				})
			},
			listOrderItemList() {
				let params = {
					order_id: this.order_id,
					engineer_id: this.engineer_id
				}
				listOrderItem(params).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.pages-order-detail-being {
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
		.empty-container {
			height: 380rpx;
			display: flex;
			align-items: center;
			justify-content: center;
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
		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		.tag-list {
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			.tag-item {
				display: flex;
				align-items: center;
				height: 43rpx;
				line-height: 43rpx;
				border-radius: 5rpx;
				font-size: 24rpx;
				font-weight: 500;
				padding: 0 13rpx;
				background-color: #eaeff4;
				color: #333333;
				&.jobs {
					background-color: #e6f0ff !important;
					color: #3a84f0 !important;
				}
				& + .tag-item {
					margin-left: 10rpx;
				}
			}
		}
		.employee-item {
			height: 92rpx;
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
			.body-wrapper-top {
				display: flex;
				justify-content: space-between;
				color: #b18a50;
				background-color: #fff0d6;
				height: 78rpx;
				line-height: 78rpx;
				border-radius: 15rpx 15rpx 0 0;
				padding: 0 36rpx;
				font-size: 24rpx;
				font-weight: 500;
			}
			.body {
				padding: 32rpx;
				box-sizing: border-box;
				background-color: #fff;
				border-radius: 0 0 15rpx 15rpx;
				.employee-list {
					/deep/.u-collapse-item {
						margin-top: 40rpx;
						.u-cell__body {
							image {
								height: 92rpx !important;
								width: 92rpx !important;
								border-radius: 50%;
							}
						}
						.u-cell__title-text {
							margin-left: 38rpx;
							font-size: 32rpx;
							font-weight: bold;
							color: #333333;
						}
					}
				}
				.progress {
					margin-top: 50rpx;
					.progress-item {
						margin-top: 30rpx;
						min-height: 80rpx;
						.progress-item-left {
							height: 100%;
							.record-tag {
								border: 1px solid #999999;
								color: #999999;
								border-radius: 3rpx;
								padding: 5rpx 10rpx;
								font-size: 20rpx;
								font-weight: 500;
								line-height: 28rpx;
								text-align: center;
								&.isRecord {
									border: 1px solid #3a84f0;
									color: #3a84f0;
								}
							}
						}
						.progress-item-right {
							flex: 1;
							margin-left: 10rpx;
							/deep/.u-album {
								margin-top: 10rpx;
								image {
									width: 132rpx !important;
									height: 114rpx !important;
								}
							}
							.remark {
								margin-top: 29rpx;
								font-size: 24rpx;
								font-weight: 500;
								color: #333333;
							}
							.day {
								font-size: 24rpx;
								font-weight: 500;
								color: #333333;
							}
							.time {
								margin-top: 24rpx;
								font-size: 20rpx;
								font-weight: 500;
								color: #666666;
							}
						}
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