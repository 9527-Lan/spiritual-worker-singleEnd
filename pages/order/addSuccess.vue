<template>
	<view class="pages-order-addSuccess">
		<view class="body">
			<u-image src="/static/order-success.png" height="197rpx" width="185rpx"></u-image>
			<view class="success-text">下单成功</view>
			<view class="tip-text">您可以在 【我的-我的订单-报名中】 查看详细订单信息</view>
			<view class="btns">
				<u-button text="返回首页" color="#3A84F0" plain @click="routeTo"></u-button>
				<u-button text="查看详情" color="#3A84F0" @click="pageTo"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			routeTo(){
				uni.switchTab({
					url:'/pages/index/home'
				})
			},
			pageTo(){
				uni.navigateTo({
					url:'/pages/order/detail/grab'
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.pages-order-addSuccess {
		padding: 76rpx 32rpx 40rpx 32rpx;
		box-sizing: border-box;
		height: 100vh;
		width: 100%;

		.flex-center-between {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.flex-center {
			display: flex;
			align-items: center;
		}
		.success-text {
			margin-top: 57rpx;
			font-size: 34rpx;
			font-weight: bold;
			color: #3a84f0;
		}
		.tip-text {
			margin-top: 40rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #666666;
			line-height: 36rpx;
			text-align: center;
		}
		.btns {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 55rpx;
			margin-top: 53rpx;
			width: 100%;
			/deep/.u-button {
				width: 168rpx;
				height: 100%;
			}
		}
		.body {
			box-sizing: border-box;
			height: 100%;
			border-radius: 15rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 0 146rpx;
			padding-top: 122rpx;
			box-sizing: border-box;
		}
	}
</style>
