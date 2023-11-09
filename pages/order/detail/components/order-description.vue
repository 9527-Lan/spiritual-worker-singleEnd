<template>
	<view class="order-description">
		<view class="body">
			<view class="flex-center between">
				<view class="title">用工描述</view>
			</view>
			<view v-html="compData.description" class="description"></view>
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
	.order-description {
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
		.description {
			padding-top: 49rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #333333;
			line-height: 48rpx;
		}
	}
</style>
