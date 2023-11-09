<template>
	<view class="order-info">
		<view class="body">
			<view class="flex-center between">
				<view class="title">{{ compData.title }}</view>
				<view class="salary">{{ compData.salary }}</view>
			</view>
			<view class="tag-list">
				<view class="tag-item jobs">
					<u-icon name="account-fill" size="24rpx" color="#3A84F0" :label="`岗位量${compData.jobs}`" label-color="#3A84F0" label-size="24rpx"></u-icon>
				</view>
				<view class="tag-item" v-for="(item, index) in compData.tags" :key="index">{{ item }}</view>
			</view>
			<view class="body-line">
				<u-icon name="/static/address.png" size="24rpx" color="#666666" :label="compData.address" label-color="#666666" label-size="24rpx"></u-icon>
			</view>
			<view class="body-line">
				<u-icon name="map-fill" size="24rpx" color="#666666" :label="compData.location" label-color="#666666" label-size="24rpx"></u-icon>
			</view>
			<view class="body-line" v-if="compData.state == 'grab' || compData.state == 'being'">
				<u-icon name="clock-fill" size="24rpx" color="#666666" :label="`${compData.startTime}-${compData.endTime}`" label-color="#666666" label-size="24rpx"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			compData: Object,
		},
		data() {
			return {}
		},
		methods: {},
	}
</script>

<style lang="scss">
	.order-info {
		margin-top: 28rpx;
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
				& + .tag-item {
					margin-left: 10rpx;
				}
			}
		}
		
	}
</style>
