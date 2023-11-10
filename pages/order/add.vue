<template>
	<view class="pages-order-add">
		<view class="body">
			<view class="title">完善下单信息</view>
			<view class="form">
				<u-form label-width="145rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }">
					<u-form-item v-for="(item, index) in formList" :key="index" :label="item.label" :required="item.required" border-bottom>
						<u-input v-if="item.fieldType == 'picker'" readonly :placeholder="item.placeholder" :border="item.border" @click="handleClick(item.clickEvent)">
							<view slot="suffix">
								<u-icon v-if="item.suffix && item.suffix.type == 'icon'" :name="item.suffix.name" :size="item.suffix.size"></u-icon>
								<u-tag
									v-if="item.suffix && item.suffix.type == 'tag'"
									:text="item.suffix.text"
									:shape="item.suffix.shape"
									:plain="item.suffix.plain"
									size="mini"
									@click="handleClick(item.btnClickEvent)"></u-tag>
							</view>
						</u-input>
						<view v-else-if="item.fieldType == 'number'" class="number-container">
							<u-number-box v-model="dataForm[item.field]" :max="item.max" :min="item.min" :step="item.step" :decimal-length="item.decimalLength"></u-number-box>
						</view>
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
					{ field: '', label: '用工标题', required: true, placeholder: '张三', border: 'none' },
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '用工类型',
						required: true,
						placeholder: '请选择',
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
						border: 'none',
					},
					{
						field: '',
						label: '用工标签',
						fieldType: 'picker',
						required: true,
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
						placeholder: '',
						border: 'none',
					},
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '用工地址',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
						btnClickEvent: 'selectAddress',
					},
					{
						field: '',
						label: '详细描述',
						required: true,
						placeholder: '',
						border: 'none',
					},
					{ field: '', label: '用工数量', required: true, fieldType: 'number', placeholder: '请输入', min: 0, border: 'none' },
					{ field: '', label: '单人日薪', required: true, fieldType: 'number', placeholder: '请输入', min: 0, decimalLength: 2, border: 'none' },
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '开始时间',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
					},
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '结束时间',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
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
	.pages-order-add {
		.body {
			padding: 53rpx 36rpx 45rpx 36rpx;
			box-sizing: border-box;
			margin: 38rpx 32rpx;
			border-radius: 15rpx;
			background-color: #fff;
			height: calc(100vh - 230rpx);
			position: relative;
			.number-container {
				width: 100%;
				height: 100%;
				/deep/.u-number-box {
					width: 100% !important;
				}
			}
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
