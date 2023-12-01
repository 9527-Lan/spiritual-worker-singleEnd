<template>
	<view class="order-info" :style="{borderRadius:radius,margin:margin}">
		<view class="body">
			<view class="flex-center between">
				<view class="title">{{ compData.name }}</view>
				<view class="salary">{{ compData.price }}元/天</view>
			</view>
			<view class="tag-list">
				<view class="tag-item jobs">
					<u-icon name="account-fill" size="24rpx" color="#3A84F0" :label="`岗位量${compData.orderQuantity}`" label-color="#3A84F0" label-size="24rpx"></u-icon>
				</view>
				<view class="tag-item" v-for="(item, index) in compData.labelName" :key="index">{{ item }}</view>
			</view>
			<view class="body-line">
				<u-icon name="/static/address.png" size="24rpx" color="#666666" :label="compData.principalName" label-color="#666666" label-size="24rpx"></u-icon>
			</view>
			<view class="body-line">
				<u-icon name="map-fill" size="24rpx" color="#666666" :label="compData.address == null ? '' : compData.address " label-color="#666666" label-size="24rpx"></u-icon>
			</view>
			<view class="body-line" >
				<u-icon name="clock-fill" size="24rpx" color="#666666" :label="`${compData.orderStatr}-${compData.orderEnd}`" label-color="#666666" label-size="24rpx"></u-icon>
			</view>
		</view>
		<slot name="footer"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			compData: Object,
			radius: {
				type: String,
				default: '15rpx',
			},
			margin: {
				type: String,
				default: '28rpx 0 35rpx 0',
			},
		},
		data() {
			return {}
		},
		methods: {},
	}
</script>

<style lang="scss">
	.order-info {
		background-color: #fff;
		overflow: hidden;
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
				& + .tag-item {
					margin-left: 10rpx;
				}
			}
		}
		
	}
</style>
