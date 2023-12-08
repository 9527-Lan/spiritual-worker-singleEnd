<template>
	<view class="order-item" @click="onCheckDetail">
		<view class="body">
			<view class="flex-center between">
				<view class="title">{{ compData.name }}</view>
				<view class="salary">{{ compData.price }}元/天</view>
			</view>
			<view class="tag-list">
				<view class="tag-item jobs">
					<u-icon name="account-fill" size="24rpx" color="#3A84F0" :label="`岗位量${compData.orderQuantity}`"
						label-color="#3A84F0" label-size="24rpx"></u-icon>
				</view>
				<view class="tag-item" v-for="(item, index) in compData.tags" :key="index">{{ item }}</view>
			</view>
			<view class="body-line">
				<u-icon name="/static/address.png" size="24rpx" color="#666666" :label="compData.address"
					label-color="#666666" label-size="24rpx"></u-icon>
			</view>
			<view class="body-line">
				<u-icon name="clock-fill" size="24rpx" color="#666666"
					:label="`${compData.orderStatr}-${compData.orderEnd}`" label-color="#666666"
					label-size="24rpx"></u-icon>
			</view>
			<!-- <view class="body-line" v-if="compData.state == 'completing' || compData.state == 'completed'">
				<u-icon name="clock-fill" size="24rpx" color="#666666" :label="`${compData.completeTime}`" label-color="#666666" label-size="24rpx"></u-icon>
			</view> -->
			<view class="body-line" v-if="compData.state == 'being'">
				<u-icon name="/static/employees.png" size="24rpx" color="#666666" :label="`当前用工数：${compData.successSum}`"
					label-color="#666666" label-size="24rpx"></u-icon>
			</view>
			<view class="body-line" v-if="compData.state == 'grab'">
				<u-icon name="/static/employees.png" size="24rpx" color="#666666"
					:label="`当前抢单数：${compData.haveRegistered == null ? 0 : compData.haveRegistered}`" label-color="#666666"
					label-size="24rpx"></u-icon>
			</view>
			<view class="progress" v-if="compData.state == 'being'">
				<!-- <view  v-for="(item, index) in compData.progress.dateList" :key="index" class="progress-item">
					<view class="day">{{ item.day }}</view>
					<view class="day">{{ item.day }}</view>
					<view class="time">{{ item.time }}</view>
				</view> -->
				<u-steps :current="compData.progress.current" direction="column" dot>
					<u-steps-item v-for="(item, index) in compData.progress.dateList" :key="index">
						<view slot="desc" class="progress-item">
							<view class="day">{{ item.day }}</view>
							<view class="time">{{ item.time }}</view>
						</view>
					</u-steps-item>
				</u-steps>
			</view>
		</view>
		<view class="footer" :class="compData.state">
			<text v-if="compData.state == 'being'">状态：进行中</text>
			<text v-if="compData.state == 'completing'">状态：待结算</text>
			<text v-if="compData.state == 'completed'">状态：已结算</text>
			<text v-if="compData.state == 'exception'">订单存在异常，若有结算争议，请联系平台客服</text>
			<text v-if="compData.state == 'grab'">抢单成功数：{{ compData.successSum == null ? 0 : compData.successSum }}/{{
				compData.orderQuantity }}</text>
		</view>
	</view>
</template>

<script>
import {getorderItems} from "@/api/sub.js"
export default {
	name: 'order-item',
	props: {
		compData: Object,
	},
	data() {
		return {}
	},
	methods: {
		onCheckDetail() {
			console.log(this.compData, 'compData');
			let compData = this.compData
			if(compData.state==='creatyj'){
				getorderItems(compData.id).then((res)=>{
		let obj = {
							workTitile:res.data.name,  
							workTypeId:"1",      
							workType:res.data.typeName,
							workLabel:res.data.labelName,
						  	workLabelId:res.data.labelIds,     
							workAddress:res.data.address,     
							addressItem:res.data.addressItem, 
							longitude:res.data.longitude, 	
							latitude:res.data.latitude, 	
					 		workNum:res.data.orderQuantity,
							singleMoney:res.data.price, 		
							startTime:res.data.orderStatr, 	
							qdQuantity:res.data.qdQuantity,	
							endTime:res.data.orderEnd, 	
							workPlace:res.data.description, 
							principal:res.data.principal,	
							principalType:res.data.principalType,
							employmentDay:res.data.employmentDay,

							 id:res.data.id
				}
				uni.navigateTo({
				url: '/pages/order/orderDetail?data=' + JSON.stringify(obj),
			})
				})
				
				
			}else{
				uni.navigateTo({
				url: `/pages/order/detail/${compData.state}?orderItem=` + encodeURIComponent(JSON.stringify(compData))
			})
			}
			


			// this.$toRoute(`/pages/order/detail/${compData.state}?orderItem=` + encodeURIComponent(JSON.stringify(compData)))
		}
	},
}
</script>

<style lang="scss">
.order-item {
	background-color: #fff;
	border-radius: 15rpx;
	margin-bottom: 35rpx;

	.body {
		box-sizing: border-box;
		padding: 35rpx;

		.body-line {
			margin-top: 28rpx;
		}
	}

	.flex-center {
		display: flex;
		align-items: center;

		&.between {
			justify-content: space-between;
		}
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.progress {
		margin-top: 50rpx;

		.progress-item {
			display: flex;
			align-items: flex-start;
			height: 80rpx;
		}

		.day {
			margin-left: 24rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #333333;
		}

		.time {
			margin-left: 24rpx;
			font-size: 20rpx;
			font-weight: 500;
			color: #666666;
		}
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

	.footer {
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 0 0 15rpx 15rpx;
		padding: 0 36rpx;
		font-size: 24rpx;
		font-weight: 500;

		&.being,
		&.completed {
			color: #b18a50;
			background-color: #fff0d6;
		}

		&.grab,
		&.completing {
			color: #3a84f0;
			background-color: #e6f0ff;
		}

		&.exception {
			color: #f37878;
			background-color: #fef8f8;
		}
	}
}</style>
