<template>
	<view class="page-my-authenticate-uploadLicense">
		<view class="body">
			<view class="title1">请上传营业执照照片</view>
			<view class="tip">仅支持在有效期内的中国大陆工商局监督管理局颁发的工 商营业执照:必须是原件照片、扫描件或者复印件加盖企业 公章后的扫描件。</view>

			<view class="image-box">
				<u-image src="/static/uploadLicense.png" height="242rpx" width="370rpx"></u-image>
				<view class="click-text">点击上传</view>
			</view>

			<view class="tip footer">平台承诺，严格保障您的隐私安全</view>
		</view>
		<view class="footer-btn">
			<u-button text="上传" color="#3A84F0"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.page-my-authenticate-uploadLicense {
		.body {
			padding: 47rpx 36rpx 45rpx 36rpx;
			box-sizing: border-box;
			margin: 38rpx 32rpx;
			border-radius: 15rpx;
			background-color: #fff;
			height: calc(100vh - 230rpx);
			position: relative;
			.footer {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 43rpx;
				text-align: center;
			}
			.title1 {
				margin: 0 0 24rpx 0;
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
			.title2 {
				margin-top: 102rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
			}
			.image-box {
				margin-top: 62rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				position: relative;
				.click-text {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					font-weight: bold;
					color: #3a84f0;
				}
			}
			.tip {
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
			}
		}
		.footer-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1;
			background-color: #fff;
			height: 153rpx;
			padding: 19rpx 42rpx;
		}
	}
</style>
