<template>
	<view class="page-my-enterpriseCertification">
		<view class="body">
			<view class="title">完善企业信息</view>
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
					{ field: '', label: '企业名称', required: true, placeholder: '湖南湘银物业有限责任公司', border: 'none' },
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '法人',
						required: true,
						placeholder: '请输入',
						border: 'none',
					},
					{ field: '', label: '法人身份证件号码', required: true, placeholder: '请输入', border: 'none' },
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '法人身份证件照片',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: { type: 'tag', text: '去上传', shape: 'circle', plain: true },
						clickEvent: 'uploadIDCard',
					},
					{ field: '', label: '社会统一信用代码', required: true, placeholder: '请输入', border: 'none' },
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '营业执照',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: { type: 'tag', text: '去上传', shape: 'circle', plain: true },
						clickEvent: 'uploadLicense',
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
						console.log('handleClick')
						this.$toRoute('/pages/my/enterpriseCertification')
						break
					case 'uploadLicense':
						this.$toRoute('/pages/my/authenticate/uploadLicense')
						break
					case 'uploadIDCard':
						this.$toRoute('/pages/my/authenticate/uploadIDCard')
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
	.page-my-enterpriseCertification {
		.body {
			padding: 53rpx 36rpx 45rpx 36rpx;
			box-sizing: border-box;
			margin: 38rpx 32rpx;
			border-radius: 15rpx;
			background-color: #fff;
			height: calc(100vh - 230rpx);
			position: relative;
			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				margin-bottom: 50rpx;
			}
			.form {
				width: 100%;
				margin-top: 46rpx;
			}
			.footer-tip {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 43rpx;
				text-align: center;
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
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
