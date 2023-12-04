<template>
	<view class="pages-order-detail-exception">
		<view class="header"></view>
		<view class="body-wrapper">
			<view class="body-wrapper-top">
				<view>状态：异常订单</view>
			</view>
			<view class="body">
				<template v-if="employees.length > 0">
					<view class="flex-center-between">
						<view class="title">用工列表</view>
						<!-- <view class="salary">{{ compData.salary }}</view> -->
					</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-y" @scrolltoupper="upper"
						@scrolltolower="lower" @scroll="scroll">
						<view class="employee-list">
							<u-collapse @change="change" @open="open" accordion :border="false">
								<u-collapse-item ref="collapseItem" :name="index" v-for="(item, index) in employees"
									:icon="item.headSculptureUrl" :title="item.engineerName" :key="index">
									<view class="progress">
										<u-steps :current="progress.current" direction="column" dot>

											<u-steps-item v-for="(pItem, pIndex) in progress.dateList" :key="pIndex">
												<view slot="desc" class="progress-item flex-center">
													<view class="progress-item-left">
														<view v-if="pItem.isRecord" class="record-tag isRecord">已记录
														</view>
														<view v-else class="record-tag">待记录</view>
													</view>
													<view class="progress-item-right">
														<view class="day">{{ pItem.day }}</view>
														<view class="remark">{{ pItem.remark }}</view>
														<u-album v-if="pItem.imgs && pItem.imgs.length > 0"
															:rowCount="3" :urls="pItem.imgs"></u-album>
														<view class="time">{{ pItem.time }}</view>
													</view>
												</view>
											</u-steps-item>
										</u-steps>
									</view>
								</u-collapse-item>
							</u-collapse>
						</view>
					</scroll-view>
				</template>
				<template v-else>
					<view class="empty-container">
						<u-empty text="暂无数据" icon="/static/empty.png" width="277rpx" height="186rpx" textSize="28rpx" />
					</view>
				</template>
			</view>


			<orderInfo :compData="compData" margin="0" radius="0 0 15rpx 15rpx">
				<!-- <view slot="footer" class="progress">
					<u-steps :current="progress.current" direction="column" dot>
						<u-steps-item v-for="(pItem, pIndex) in progress.dateList" :key="pIndex">
							<view slot="desc" class="progress-item flex-center">
								<view class="progress-item-left">
									<view v-if="pItem.isRecord" class="record-tag isRecord">已记录</view>
									<view v-else class="record-tag noRecord">无记录</view>
								</view>
								<view class="progress-item-right">
									<view class="day">{{ pItem.day }}</view>
									<view class="remark" v-if="pItem.remark">{{ pItem.remark }}</view>
									<u-album v-if="pItem.imgs && pItem.imgs.length > 0" :rowCount="3" :urls="pItem.imgs"></u-album>
									<view class="time">{{ pItem.time }}</view>
								</view>
							</view>
						</u-steps-item>
					</u-steps>
				</view> -->
			</orderInfo>
			<orderDescription :compData="compData"></orderDescription>
		</view>
		<view class="footer">
			<u-icon name="phone" label="平台客服" label-pos="bottom" label-size="20rpx" label-color="#333"
				size="36rpx"></u-icon>
		</view>
	</view>
</template>

<script>
	import orderInfo from './components/order-info.vue'
	import orderDescription from './components/order-description.vue'
	import {
		getorderItems,
		listOrderItem
	} from '@/api/user.js'

	export default {
		components: {
			orderInfo,
			orderDescription,
		},
		data() {
			return {
				id: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				employees: [{
						name: '张三三',
						state: '',
						img: 'https://cdn.uviewui.com/uview/album/1.jpg',
						progress: {
							current: -1,
							dateList: []
						},
					},
					{
						name: '李林',
						state: 0, //失败
						img: 'https://cdn.uviewui.com/uview/album/2.jpg',
						progress: {
							current: -1,
							dateList: []
						},
					},
					{
						name: '肖国运',
						state: 1, //成功
						img: 'https://cdn.uviewui.com/uview/album/3.jpg',
						progress: {
							current: -1,
							dateList: []
						},
					},
				],
				progress: {
					current: 3,
					dateList: [

					],
				},
				compData: {

				},


			}
		},
		methods: {
			getdetail(params) {
				getorderItems(params).then((res) => {
					this.employees = res.data
				})
			},
			scroll(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			open(index) {
				console.log("index", index);
				let item = this.employees[index]
				this.listOrderItemList(this.id, item.engineerId)
			},
			// 获取u-collapse数据
			change(v) {
				const index = v.findIndex(el => el.status === 'open');
				if (index === -1) return;

				setTimeout(() => {
					this.$refs.collapseItem[index].setContentAnimate();
				}, 500);
			},
			listOrderItemList(orderId, engineerId) {
				let params = {
					order_id: orderId,
					engineer_id: engineerId
				}
				listOrderItem(params).then(res => {
					if (res.data.length) {
						let dateList = res.data.map((el, index) => {
							let big = index + 1
							return {
								day: '第' + big + '天',
								time: el.orderDate,
								remark: el.orderDesc,
								imgs: el.orderImgUrl,
								isRecord: el.orderImgUrl.length
							}
						})
						this.progress.dateList = dateList
					}
				})
			},
		},
		onLoad(option) {
			let obj = JSON.parse(option.orderItem)
			this.id = obj.id
			obj.labelName = obj.labelName.split(',')
			this.compData = obj
			this.getdetail({
				order_id: this.compData.id
			})
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}

	.pages-order-detail-exception {
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

		.progress {
			border-top: 1rpx solid #f0f0f0;
			margin: 0 35rpx;
			padding: 29rpx 0;
			box-sizing: border-box;

			.progress-item {
				min-height: 80rpx;
				padding-bottom: 30rpx;

				.progress-item-left {
					height: 100%;

					.record-tag {
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

						&.noRecord {
							border: 1px solid #f37878;
							color: #f37878;
						}
					}
				}

				.progress-item-right {
					flex: 1;
					height: 100%;
					margin-left: 10rpx;
					display: flex;
					flex-wrap: wrap;

					/deep/.u-album {
						width: 100%;
						margin-bottom: 10rpx;

						image {
							width: 132rpx !important;
							height: 114rpx !important;
						}
					}

					.remark {
						width: 100%;
						font-size: 24rpx;
						font-weight: 500;
						color: #333333;
						margin-bottom: 10rpx;
					}

					.day {
						font-size: 24rpx;
						font-weight: 500;
						color: #333333;
						margin-right: 10rpx;
						margin-bottom: 10rpx;
					}

					.time {
						font-size: 20rpx;
						font-weight: 500;
						color: #666666;
					}
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

				&+.tag-item {
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
				color: #f37878;
				background-color: #fef8f8;
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
					.employee-item-footer {
						height: 82rpx;
						line-height: 82rpx;
						padding: 0 29rpx;
						background-color: #f9f9f9;

						.single-complete {
							font-size: 24rpx;
							font-weight: bold;
							color: #999999;
						}

						.edit-btn {
							height: 55rpx;

							/deep/.u-button {
								height: 100%;
							}
						}
					}

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