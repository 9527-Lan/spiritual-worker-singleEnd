<template>
	<view class="login-index">
		<view class="body">
			<u-image src="@/static/logo.png" mode="aspectFit" width="108rpx" height="108rpx"></u-image>
			<view class="title">灵活用工服务平台</view>
			<view class="type">企业端</view>
			<view class="radius-input">
				<text class="label">账号</text>
				<!-- <uni-easyinput placeholder="请输入登录账号"></uni-easyinput> -->
				<u--input customStyle="	input-box" border="none" placeholder="请输入登录账号"></u--input>
			</view>
			<view class="radius-input">
				<text class="label">密码</text>
				<u--input customStyle="	input-box" type="password" border="none" placeholder="请输入登录密码"></u--input>
			</view>
			<u-button @click="onLogin" color="#3A84F0" :customStyle="{ marginTop: '60rpx' }">登录</u-button>
			<view class="footer-tip">
				<!-- <view class="circle"></view> -->
				<u-checkbox-group v-model="isAgree">
					<u-checkbox size="28rpx" shape="circle"></u-checkbox>
				</u-checkbox-group>
				我已阅读并理解
				<text class="link">《服务协议》</text>
				和
				<text class="link">《隐私协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAgree: false,
			}
		},
		methods: {
			onLogin() {
				uni.reLaunch({
					url: '/pages/index/home',
				})
			},
		},
	}
</script>

<style lang="scss">
	.login-index {
		height: 100vh;
		background-color: #f2f6ff;
		display: flex;
		align-items: center;
		justify-content: center;

		.body {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				margin-top: 40rpx;
				font-size: 52rpx;
				font-weight: 500;
				color: #333333;
			}
			.type {
				font-size: 36rpx;
				margin-top: 42rpx;
				color: #666666;
				margin-bottom: 61px;
			}
			.radius-input {
				display: flex;
				align-items: center;
				border-radius: 44rpx;
				width: 629rpx;
				height: 88rpx;
				margin-bottom: 32rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				background-color: #e8ebf4;
				.label {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					margin-right: 20rpx;
				}
			}
			.footer-tip {
				margin-top: 154rpx;
				font-size: 24rpx;
				color: #666666;
				display: flex;
				align-items: center;
				.circle {
				}
				.link {
					cursor: pointer;
					color: #3a84f0;
				}
			}
		}

		.input-box {
			background-color: #e8ebf4 !important;
		}
	}
</style>
