<template>
	<view class="page-my-signContract">
		<view class="body">
			<view class="title">{{ contract.title }}</view>
			<view v-html="contract.content" class="content"></view>
		</view>
		<view class="footer-btn">
			<u-button text="同意并签字" color="#3A84F0" @click="onSign"></u-button>
		</view>
		<u-popup :show="signVisible" mode="bottom" round="30rpx">
			<view class="sign-container">
				<view class="sign-container-title">
					<view>请在以下区域签字</view>
					<u-icon name="close-circle-fill" size="40rpx" color="#CCCCCC" @click="popClose"></u-icon>
				</view>
				<view class="sign-container-write">
					<liu-signature bgColor="#F8F8F8" lineColor="#000" :width="660" :height="320" @change="saveSign"></liu-signature>
				</view>
				<!-- 	<view class="sign-container-footer">
					<view class="reload-container"><u-icon name="reload" color="#333" size="40rpx"></u-icon></view>
					<u-button color="#3A84F0" text="提交"></u-button>
				</view> -->
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signVisible: false,
				contract: {
					title: '临时劳动用工合同',
					content:
						'<p>根据《劳动合同法》及有关法律、法规、用人单位与劳动者经平等自愿，协商一致签订本合同，确定劳动关系，明确双方权利和义务，并共同遵守履行。</p><br><p>&nbsp;</p><p>用人单位名称:<br />劳动者姓名:<br />身份证号:</p><p>本合同从____年____月____日起至____年____月____日止</p><br><p>&nbsp;</p><p>劳动者同意用人单位安排在后勤(部门)从事保安员(工种)的工作。<br />劳动者在该岗位的职责要求是:亚格遵守学校的各项规章制度和本岗位的职责，具体按《巴燕乡中心学校食堂及职工管理办法和考核细则》执行。<br />劳动者月工资标准:用人单位必须按月支付劳动者工资不得克扣或者无故拖欠劳动者工资:劳动者的工资按当地教育局批准的标准执行。<br />用人单位、劳动者严格遵守国家的法律、法规和政策劳动者同意用人单位安排在后勤(部门)从事保安员(工种)的工作。<br />劳动者在该岗位的职责要求是:亚格遵守学校的各项规章...<br />​</p>',
				},
			}
		},
		methods: {
			onSign() {
				this.signVisible = true
			},
			popClose() {
				this.signVisible = false
			},
			saveSign(imgUrl) {
				console.log('saveSign', imgUrl)
				this.signVisible = false
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.page-my-signContract {
		.body {
			padding: 53rpx 36rpx 45rpx 36rpx;
			box-sizing: border-box;
			margin: 38rpx 32rpx;
			border-radius: 15rpx;
			background-color: #fff;
			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				margin-bottom: 50rpx;
				text-align: center;
			}
		}
		.content {
			font-size: 24rpx;
			font-weight: 500;
			color: #333333;
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
		.sign-container {
			height: 617rpx;
			padding: 32rpx;
			box-sizing: border-box;
			position: relative;
			.sign-container-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.sign-container-write {
				width: 100%;
				display: flex;
				justify-content: center;
				box-sizing: border-box;
			}
			.sign-container-footer {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 123rpx;
				padding: 19rpx 42rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				.reload-container {
					padding: 0 30rpx;
				}
			}
		}
	}
</style>
