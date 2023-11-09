<template>
	<view class="page-my-editInfo">
		<view class="body">
			<view class="title">完善我的信息</view>
			<view class="authenticate">
				<view class="authenticate-left">
					<u-icon name="/static/authenticate.png" size="34rpx"></u-icon>
					<view class="label">您还未进行企业认证</view>
				</view>
				<view class="authenticate-right">
					<u-button color="#3A84F0" :customStyle="{ height: '55rpx' }" @click="$toRoute('/pages/my/authenticate/uploadLicense')">去认证</u-button>
				</view>
			</view>
			<view class="authenticate">
				<view class="authenticate-left">
					<u-icon name="/static/authenticate.png" size="34rpx"></u-icon>
					<view class="label">您的企业认证未通过</view>
				</view>
				<view class="authenticate-right">
					<u-button color="#3A84F0" :customStyle="{ height: '55rpx' }" @click="$toRoute('/pages/my/authenticate/uploadIDCard')">重新认证</u-button>
				</view>
			</view>
			<view class="form">
				<u-form label-width="145rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }">
					<u-form-item v-for="(item, index) in formList" :key="index" :label="item.label" :required="item.required" border-bottom>
						<u-input v-if="item.fieldType == 'picker'" readonly :placeholder="item.placeholder" :border="item.border">
							<view slot="suffix">
								<u-icon v-if="item.suffix && item.suffix.type == 'icon'" :name="item.suffix.name" :size="item.suffix.size"></u-icon>
								<u-tag
									v-if="item.suffix && item.suffix.type == 'tag'"
									:text="item.suffix.text"
									:shape="item.suffix.shape"
									:plain="item.suffix.plain"
									size="mini"
									@click="handleClick(item.clickEvent)"></u-tag>
							</view>
						</u-input>
						<u-input v-else v-model="dataForm[item.field]" :type="item.type" :placeholder="item.placeholder" :border="item.border"></u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="footer-tip">平台承诺，严格保障您的隐私安全</view>
		</view>
		<view class="footer">
			<u-button text="保存" color="#3A84F0" @click="onBack"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataForm: {},
				formList: [
					{ field: '', fieldType: 'input', label: '姓名', required: true, placeholder: '张三', border: 'none' },
					{ field: '', fieldType: 'input', type: 'number', label: '电话', required: true, placeholder: '请输入', border: 'none' },
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '类型',
						required: true,
						placeholder: '企业',
						border: 'none',
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
					},
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '企业认证',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: { type: 'tag', text: '去认证', shape: 'circle', plain: true },
						clickEvent: 'enterpriseCertification',
					},
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '签署合同',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: { type: 'tag', text: '去签署', shape: 'circle', plain: true },
						clickEvent: 'signContract',
					},
				],
			}
		},
		methods: {
			onBack() {
				uni.navigateBack(1)
			},
			handleClick(event) {
				switch (event) {
					case 'enterpriseCertification':
						this.$toRoute('/pages/my/enterpriseCertification')
						break
					case 'signContract':
						this.$toRoute('/pages/my/signContract')
						break
					default:
						break
				}
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.page-my-editInfo {
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
			}
			.authenticate {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 15rpx;
				box-sizing: border-box;
				background-color: #fef8f8;
				padding: 28rpx 25rpx;
				& + .authenticate {
					margin-top: 24rpx;
				}
				.authenticate-left {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					.label {
						margin-left: 24rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: #f37878;
					}
				}
				.authenticate-right {
					height: 55rpx;
				}
			}
			.form {
				width: 100%;
				margin-top: 46rpx;
			}
			.footer-tip {
				margin-top: 210rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
				text-align: center;
			}
		}
		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1;
			background-color: #fff;
			height: 173rpx;
			padding: 19rpx 42rpx;
		}
	}
</style>
