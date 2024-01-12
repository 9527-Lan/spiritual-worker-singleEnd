<template>
	<view class="order-item" >
		<view class="body" @click="onCheckDetail">
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
				<u-steps :current="sept" direction="column" dot>
					<u-steps-item v-for="(item, index) in compData.progress.dateList" :key="index">
						<view slot="desc" class="progress-item">
							<view class="day">{{ item.day }}</view>
							<view class="time">{{ item.time }}</view>
						</view>
					</u-steps-item>
				</u-steps>
			</view>
			<view class="deleteButton" v-if="compData.status === 0" @click.stop="deleteOrder">
				<u-icon color="red" size="40" name="trash"></u-icon>
			</view>
			<view class="copyButton" :class="compData.status == 2 || compData.status == 4?'copyButtonwudel':''" v-if="compData.status === 0 || compData.status == 2 || compData.status == 4" @click.stop="copyOrder">
				<u-icon  size="40" name="/static/copy.png"></u-icon>
			</view>
			
		</view>
		<view class="footer" v-if="compData.status != 4" :class="compData.state">
			<text v-if="compData.state == 'being'">状态：进行中</text>
			<text v-if="compData.state == 'completing'">状态：<text :class="compData.auditStatus == '3'?'red':''">{{compData.auditStatus == '3'?'驳回'+`(${compData.auditText})`:'待结算'}}</text></text>
			<text v-if="compData.state == 'completed'">状态：已结算</text>
			<text v-if="compData.state == 'exception'">订单存在异常，若有结算争议，请联系平台客服</text>
			<text v-if="compData.state == 'grab'">抢单成功数：{{ compData.successSum == null ? 0 : compData.successSum }}/{{
				compData.orderQuantity }}</text>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="warn" cancelText="否" confirmText="是" title="通知" content="是否删除该订单" @confirm="dialogConfirm"
			></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="copyDialog" type="dialog">
			<uni-popup-dialog type="warn" cancelText="否" confirmText="是" title="通知" content="是否复制该订单" @confirm="confirmCopy"
				></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import {getorderItems} from "@/api/sub.js"
import {formattedTime} from "@/utils/utils.js"
export default {
	name: 'order-item',
	props: {
		compData: Object,
	},
	data() {
		return {
			endDateShow:false,
			dateShow:false,
			value1:Number(new Date()),
			value2:Number(new Date()),
			dataForm:{
				endTime:'',
				startTime:''
			},
			show:false
		}
	},
	computed:{
		sept(){
			let aaa = 0
			console.log(this.compData.progress.dateList)
			let dangqianDate = new Date(formattedTime()).getTime()
			for (let i = 0; i < this.compData.progress.dateList.length; i++) {
				if(this.compData.progress.dateList[i].sign == 1 ||
				  new Date(this.compData.progress.dateList[i].time).getTime()<dangqianDate){
					aaa = i
				}
			}
			console.log(aaa)
			return aaa
		}
	},
	methods: {
		dialogConfirm(){
			this.$emit('deleteOrder',this.compData)
		},
		deleteOrder(){
			this.$refs.alertDialog.open()
		},
		copyOrder(){
			this.$refs.copyDialog.open()
		},
		confirmCopy(){
			this.$emit('copyOrder',this.compData)
		},
		timestampToTime(timestamp) {
			// 时间戳为10位需*1000，时间戳为13位不需乘1000
			let date = new Date(parseInt(timestamp));
			let Year = date.getFullYear();
			let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
			let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
			let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
			let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
			let Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
			let GMT = Year + '-' + Moth + '-' + Day + ' ' + Hour + ':' + Minute;
			return GMT;
		},
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
						startAge:res.data.startAge, 
						endAge:res.data.endAge, 
						qdQuantity:res.data.qdQuantity,	
						endTime:res.data.orderEnd, 	
						workPlace:res.data.description, 
						principal:res.data.principal,	
						principalType:res.data.principalType,
						employmentDay:res.data.employmentDay,
						id:res.data.id,
						orderClose:res.data.orderClose
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
	.red{
		color: red;
	}
	.copytitle{
		padding: 10rpx 0 10rpx 10rpx;
	}
	.copyDate{
		.text{
			padding: 10rpx;
			border: 1px solid #bababa;
		}
	}
.order-item {
	background-color: #fff;
	border-radius: 15rpx;
	margin-bottom: 35rpx;

	.body {
		box-sizing: border-box;
		padding: 35rpx;
		position: relative;
		.body-line {
			margin-top: 28rpx;
		}
		.deleteButton{
			position: absolute;
			bottom: 0;
			right: 40rpx;
			color: #f37878;
			font-size: 40rpx;
		}
		.copyButton{
			position: absolute;
			bottom: 0;
			right: 100rpx;
			font-size: 40rpx;
		}
		.copyButtonwudel{
			bottom: 30rpx;
			right: 32rpx;
			font-size: 40rpx;
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
