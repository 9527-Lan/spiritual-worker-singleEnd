<template>
	<view class="pages-order-detail-grab">
		<view class="header"></view>
		<view class="body-wrapper">
			<view class="body-wrapper-top">
				<view>状态：抢单中</view>
				<view>抢单数：{{ compData.employees.length }}</view>
				<view>抢单成功数：{{ compData.employees.length }}/{{ compData.count }}</view>
			</view>
			<view class="body">
				<template v-if="compData.employees.length > 0">
					<view class="flex-center-between">
						<view class="title">抢单列表</view>
					</view>
					<view class="employee-list">
						<view class="employee-item flex-center-between" v-for="(item, index) in compData.employees" :key="index">
							<view class="flex-center">
								<u-avatar :src="item.img" size="92rpx"></u-avatar>
								<view class="name">{{ item.name }}</view>
							</view>
							<view v-if="item.state === 0" class="grab-failed">抢单失败</view>
							<view v-else-if="item.state === 1" class="grab-success">抢单成功</view>
							<view v-else class="flex-center review-btn">
								<u-button text="抢单失败" type="info" plain></u-button>
								<u-button text="抢单成功" color="#3A84F0"></u-button>
							</view>
						</view>
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
			<u-icon name="phone" label="平台客服" label-pos="bottom" label-size="20rpx" label-color="#333" size="36rpx"></u-icon>
			<view class="flex-center btn-box">
				<u-button text="撤销订单" type="primary" plain @click="onCancelOrder"></u-button>
				<u-button text="审核通过" color="#3A84F0"></u-button>
			</view>
		</view>
		<u-modal :show="cancelModalVisible" title="是否撤销此订单" :showConfirmButton="false">
			<view class="cancel-modal-btns">
				<u-button text="取消" type="info" plain style="height: 100%" @click="cancelModalVisible = false"></u-button>
				<u-button text="确定" type="primary" color="#3A84F0" style="height: 100%" @click="cancelModalVisible = false"></u-button>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import orderInfo from './components/order-info.vue'
	import orderDescription from './components/order-description.vue'
	export default {
		components: {
			orderInfo,
			orderDescription,
		},
		data() {
			return {
				cancelModalVisible: false,
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
					tags: ['退伍军人', '1米8以上'],
					count: 9,
					employeesCopy: [],
					employees: [
						{
							name: '张三三',
							state: '',
							img: 'https://cdn.uviewui.com/uview/album/1.jpg',
							progress: { current: -1, dateList: [] },
						},
						{
							name: '李林',
							state: 0, //失败
							img: 'https://cdn.uviewui.com/uview/album/2.jpg',
							progress: { current: -1, dateList: [] },
						},
						{
							name: '肖国运',
							state: 1, //成功
							img: 'https://cdn.uviewui.com/uview/album/3.jpg',
							progress: { current: -1, dateList: [] },
						},
					],
					description:
						'对公司的项目进行临时安保工作<br /><br />一、工作地点:<br />可根据个人意愿就近分配工作，如有环境不适应可申请调换。<br />二、任职资格:<br />1、年龄18-55周岁;身高180cm以上有无经验均可。<br />2、积极向上者优先考虑。<br />3、退伍军人优先，应届生，农村待业青年，下岗职工等。<br /><br />三、岗位职责:<br />1、年龄18-55周岁;身高180cm以上有无经验均可。<br />2、积极向上者优先考虑。<br />3、退伍军人优先，应届生，农村待业青年，下岗职工等。<br />',
				},
			}
		},
		onShareAppMessage: function (options) {
			return {
				title: this.compData.title + ',' + this.compData.salary,
				path: '/pages/order/detail/grab',
				imageUrl: '/static/shareBg.png',
			}
		},
		methods: {
			onCancelOrder() {
				this.cancelModalVisible = true
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.pages-order-detail-grab {
		position: relative;
		.cancel-modal-btns {
			padding-top: 80rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			/deep/.u-button {
				height: 73rpx !important;
				width: 207rpx !important;
			}
		}
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
				color: #3a84f0;
				background-color: #e6f0ff;
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
					margin-top: 20rpx;
					.employee-item {
						box-sizing: border-box;
						padding: 21rpx 10rpx;
						.review-btn {
							height: 55rpx;
							font-size: 24rpx;
							.u-button {
								height: 100%;
								
								& + .u-button {
									margin-left: 18rpx;
								}
							}
						}
						.name {
							margin-left: 38rpx;
							font-size: 32rpx;
							font-weight: bold;
							color: #333333;
						}
					}
					.grab-success {
						font-size: 24rpx;
						font-weight: bold;
						color: #3a84f0;
					}
					.grab-failed {
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
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
							.u-album {
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
			display: flex;
			align-items: center;
			.btn-box {
				flex: 1;
				height: 89rpx;
				margin-left: 47rpx;
				.u-button {
					height: 100%;
					& + .u-button {
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
