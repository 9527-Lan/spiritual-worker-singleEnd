<template>
	<view class="pages-order-detail-completing">
		<view class="header"></view>
		<view class="body-wrapper">
			<view class="body-wrapper-top">
				<view>状态：<text :class="orderItem.auditStatus == 3?'red':''">{{orderItem.auditStatus == 3?'驳回':'待结算'}}</text></view>
			</view>
			<view class="body">
				<view class="orderStatistic-container">
					<u-grid :col="3" :border="false">
						<u-grid-item v-for="(item, index) in orderStatistics" :key="index">
							<view class="orderStatistic-item">
								<view class="item-title" :style="{ color: item.color }">{{ item.title }}</view>
								<view class="item-value" :style="{ color: item.color }">{{
									compData.orderStatistics[item.field] }}</view>
							</view>
						</u-grid-item>
					</u-grid>
				</view>

				<template v-if="compData.employees.length > 0">
					<view class="flex-center-between title">结算列表</view>
					<view class="employee-list">
						<u-collapse @change="change" @open="open" accordion :border="false">
							<view class="employee-item" v-for="(item, index) in compData.employees" :key="index">
								<u-collapse-item ref="collapseItem" :name="index" :icon="item.headSculptureUrl"
									:title="item.engineerRealname">
									<view class="progress">
										<u-steps :current="compData.progress.current" direction="column" dot>
											<u-steps-item v-for="(pItem, pIndex) in compData.progress.dateList"
												:key="pIndex">
												<view slot="desc" class="progress-item flex-center">
													<view class="progress-item-left">
														<view v-if="pItem.imgs.length>0" class="record-tag isRecord">已记录</view>
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
								<view class="employee-item-footer flex-center-between">
									<view class="single-complete">单人待结算：￥{{ item.settlementMoney || '0.00' }}</view>
									<view class="edit-btn">
										<u-button type="primary" plain text="修改" @click="onEdit(item, index)"></u-button>
									</view>
								</view>
							</view>
						</u-collapse>
					</view>
				</template>
				<template v-else>
					<view class="empty-container">
						<u-empty text="暂无数据" icon="/static/empty.png" width="277rpx" height="186rpx" textSize="28rpx" />
					</view>
				</template>
			</view>
			<!-- <orderInfo :compData="compData"></orderInfo>
			<orderDescription :compData="compData"></orderDescription> -->
		</view>
		<view class="footer">
			<kefu name="phone" label="平台客服" label-pos="bottom" label-size="20rpx" label-color="#333"
				size="36rpx"/>
			<view class="flex-center btn-box">
				<!-- <u-button text="划入异常" type="primary" plain></u-button> -->
				<u-button text="全部结算" color="#3A84F0" v-if="orderItem.auditStatus == 3"
				@click="submitbtn('noId')"></u-button>
				<u-button text="全部结算" color="#3A84F0" v-if="compData.orderStatistics.isSubmit === '0'"
				@click="submitbtn">
				</u-button>
				<u-button text="查看进度" color="#3A84F0" v-else @click="look"></u-button>
			</view>
		</view>
		<u-popup :show="editPopVisible" round="30rpx" mode="bottom">
			<view class="edit-form">
				<view class="flex-center-between">
					<view class="title">结算修改</view>
					<u-icon name="close-circle-fill" size="40rpx" color="#CCCCCC" @click="editPopVisible = false"></u-icon>
				</view>

				<u-form :model="editForm" label-width="180rpx"
					:label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }">
					<u-form-item label="用工对象：">
						<view class="round-img">
							<u-icon :name="editForm.img" size="60rpx" :label="editForm.name" label-size="28rpx"
								label-color="#333"></u-icon>
						</view>
					</u-form-item>
					<u-form-item label="用工时间：">
						<u-input v-model="editForm.times" border="none" readonly></u-input>
					</u-form-item>
					<u-form-item label="单人待结算：" readonly>
						<u-input v-model="editForm.complete" readonly border="none"></u-input>
					</u-form-item>
					<u-form-item label="实际结算：" required>
						<u-input v-model="editForm.realComplete" placeholder="请输入" border="none"></u-input>
					</u-form-item>
				</u-form>
				<view class="form-footer">
					<kefu name="phone" label="平台客服" label-pos="bottom" label-size="20rpx" label-color="#333" size="36rpx"
						className="page-footer" />
					<view class="btn-box">
						<u-button text="确认提交" color="#3A84F0" @click="submit"></u-button>
					</view>
				</view>
			</view>
		</u-popup>

		<u-modal :show="cardShow" :showConfirmButton="false" cancelText="关闭" width="622rpx" style="padding-top: 0;">
			<view style="min-height: 750rpx; position: relative;">
				<view style="text-align: center;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;">审核进度</view>
				<u-steps :current="looklist.length" direction="column" dot>
					<u-steps-item v-for="(item, index) in looklist">
						<view slot="desc" class="progress-item flex-center">

							<view class="progress-item-right">
								<view class="day">{{ item.nodeName }}</view>
								<view class="day">{{ item.createTime }}</view>
								<view class="time">{{ item.userName }}</view>

							</view>
						</view>
					</u-steps-item>
				</u-steps>
				
			</view>
			<u-button  text="关闭" style="position: absolute; bottom: 10px; font-size: 32rpx;font-family: PingFang SC;font-weight: 500;color: #3A84F0;" @click="cardShow = !cardShow"></u-button>
		</u-modal>
	</view>
</template>

<script>
import orderInfo from './components/order-info.vue'
import kefu from "@/components/kefu.vue"
import orderDescription from './components/order-description.vue'
import { listOrderSetbtn, submit, examine, reviewNodes,settlementSubmission } from '@/api/sub.js'
import {

	listOrderItem
} from '@/api/user.js'
export default {
	components: {
		orderInfo,
		orderDescription,
		kefu
	},
	data() {
		return {
			editPopVisible: false,
			id: '',
			orderItem:{},
			looklist: [],
			cardShow: false,
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
			index: '',
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
				employees: [],
				progress: {
					current: 1,
					dateList: [

					],
				},
				description:
					'对公司的项目进行临时安保工作<br /><br />一、工作地点:<br />可根据个人意愿就近分配工作，如有环境不适应可申请调换。<br />二、任职资格:<br />1、年龄18-55周岁;身高180cm以上有无经验均可。<br />2、积极向上者优先考虑。<br />3、退伍军人优先，应届生，农村待业青年，下岗职工等。<br /><br />三、岗位职责:<br />1、年龄18-55周岁;身高180cm以上有无经验均可。<br />2、积极向上者优先考虑。<br />3、退伍军人优先，应届生，农村待业青年，下岗职工等。<br />',
			},
		}
	},
	onLoad(options) {
		// 获取id
		
		let obj = JSON.parse(options.orderItem)
		this.orderItem = obj
		console.log(obj,'obj');
		this.id = obj.id
		// 通过id获取详情
		if(obj.auditStatus===0){
			this.getdetail(this.id)
		}else{
			this.getdetailed(this.id)
		}
		
	},
	methods: {
		onEdit(row, index) {
			console.log(row, 'row');
			this.index = index
			let params = {
				order_id: this.id,
				engineer_id: row.engineerId
			}
			listOrderItem(params).then(res => {
				this.editForm.name = row.engineerRealname
				this.editForm.img = row.headSculptureUrl
				this.editForm.times = res?.data.length + '天'
				this.editForm.complete = '￥' + row.settlementMoney
				this.editPopVisible = true
			})


		},
		// 获取详情
		getdetail(id) {
			listOrderSetbtn(id).then((res) => {
				this.compData.orderStatistics = {
					summary: res.data.orderMoney,
					complete: res.data.settlementMoney,
					Remain: Math.abs(res.data.orderMoney - res.data.settlementMoney),
					isSubmit: res.data.isSubmit
				}
				this.compData.employees = res.data.casualOrderSettlementItemVoList
			})
		},
		// 结算后获取详情
		getdetailed(id){
			settlementSubmission(id).then((res)=>{
				this.compData.orderStatistics = {
					summary: res.data.orderMoney,
					complete: res.data.settlementMoney,
					Remain: Math.abs(res.data.orderMoney - res.data.settlementMoney),
					isSubmit: res.data.isSubmit
				}
				this.compData.employees = res.data.casualOrderPaymentRecordItems
			})
		},
		// 工程师修改
		submit() {
			this.editPopVisible = false
			this.compData.employees[this.index].settlementMoney = Number(this.editForm.realComplete)
			let sum = 0
			this.compData.employees.forEach((item, index) => {
				console.log(item, 'item')
				sum += item.settlementMoney
			})
			this.compData.orderStatistics.complete = sum
			this.compData.orderStatistics.Remain = this.compData.orderStatistics.summary - this.compData.orderStatistics.complete
			this.editForm.realComplete = ''


		},
		open(index) {
			console.log("index", index);
			let item = this.compData.employees[index]
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
							imgs: el.orderImgUrl
						}
					})
					this.compData.progress.dateList = dateList
				}
			})
		},
		submitbtn(noId) {
			let obj = {
				casualOrderPaymentRecordItems: this.compData.employees,
				cashSurplusMoney: this.compData.orderStatistics.Remain,
				orderMoney: this.compData.orderStatistics.summary,
				settlementMoney: this.compData.orderStatistics.complete,
				id: Number(this.id)
			}
			if(noId){
				obj.casualOrderPaymentRecordItems.forEach(item=>{
					item.id = ''
				})
			}
			submit(obj).then((res) => {
				if (res.code === '00000') {
					examine({
						businessId: Number(this.id),
						businessType: '1'
					}).then((res) => {
						if (res.code === '00000') {
							uni.showToast({
								title: res.data,
								duration: 2000,

							})
							this.getdetailed(this.id)
							// this.getdetail(this.id)
						}
					})
				}
			})
		},

		look() {
			reviewNodes(
				Number(this.id)
			).then((res) => {
				this.looklist = res.data
			})
			this.cardShow = true
		}

	},
}
</script>

<style lang="scss">
page {
	background-color: #f2f6ff;
}

.pages-order-detail-completing {
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

	.edit-form {
		height: 730rpx;
		padding: 42rpx 32rpx;
		box-sizing: border-box;
		position: relative;

		.round-img {
			image {
				border-radius: 50%;
			}
		}

		/deep/.u-form-item {
			margin-top: 20rpx;
		}

		.form-footer {
			position: absolute;
			border-top: 1rpx solid #c0c0c0;
			z-index: 3;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 20rpx 42rpx;
			padding-bottom: 120rpx;
			box-sizing: border-box;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn-box {
				height: 89rpx;
				width: 521rpx;

				.u-button {
					height: 100%;
				}
			}
		}
	}

	.orderStatistic-container {
		border-bottom: 1rpx solid #f0f0f0;

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
			.title {
				margin-top: 39rpx;
			}

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
		height: 120rpx;
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

				&+.u-button {
					margin-left: 20rpx;
				}
			}
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
::v-deep uni-image>view{
	height: 100px;
}
.red{
	color: red;
}

</style>
