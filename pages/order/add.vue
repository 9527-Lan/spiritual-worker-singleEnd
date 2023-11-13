<template>
	<view class="pages-order-add">
		<view class="body">
			<view class="title">完善下单信息</view>
			<view class="authenticate">
				<view class="authenticate-left">
					<u-icon name="/static/authenticate.png" size="34rpx"></u-icon>
					<view class="label">您还未进行企业认证</view>
				</view>
				<view class="authenticate-right">
					<u-button color="#3A84F0" :customStyle="{ height: '55rpx' }" @tap="$toRoute('/pages/my/enterpriseCertification')">去认证</u-button>
				</view>
			</view>
			<view class="form">
				<u-form label-width="145rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }">
<!--					<u-form-item label="用工标题" prop="userInfo.name" borderBottom ref="item1" required>-->
<!--						<u&#45;&#45;input v-model="dataForm.workTitile" border="none" placeholder="张三"></u&#45;&#45;input>-->
<!--					</u-form-item>-->
<!--					<u-form-item label="用工类型" prop="userInfo.sex" borderBottom @click="showSex = !showSex; " ref="item1"-->
<!--						required>-->
<!--						<u&#45;&#45;input v-model="dataForm.workType" disabled disabledColor="#ffffff" placeholder="请选择"-->
<!--							border="none"></u&#45;&#45;input>-->
<!--						<u-icon slot="right" name="arrow-right"></u-icon>-->
<!--					</u-form-item>-->
<!--					<u-form-item label="用工标签" prop="userInfo.sex" borderBottom @click="showLabel = !showSex; "-->
<!--						ref="item1" required>-->
<!--						<u&#45;&#45;input v-model="dataForm.workLabel" disabled disabledColor="#ffffff" placeholder="请选择"-->
<!--							border="none"></u&#45;&#45;input>-->
<!--						<u-icon slot="right" name="arrow-right"></u-icon>-->
<!--					</u-form-item>-->
<!--					<u-form-item label="用工地址" prop="userInfo.name" borderBottom ref="item1" required>-->
<!--						<u&#45;&#45;input v-model="dataForm.workAddress" border="none" placeholder="请输入"></u&#45;&#45;input>-->
<!--					</u-form-item>-->
<!--					<u-form-item label="详细描述" prop="userInfo.name" borderBottom ref="item1" required>-->
<!--						<u&#45;&#45;input v-model="dataForm.workPlace" border="none" placeholder="请输入"></u&#45;&#45;input>-->
<!--					</u-form-item>-->
<!--					<u-form-item label="用工数量" prop="userInfo.name" borderBottom ref="item1" required>-->
<!--						<u&#45;&#45;input v-model="dataForm.workNum" border="none" placeholder="请输入"></u&#45;&#45;input>-->
<!--					</u-form-item>-->
<!--					<u-form-item label="单人日新" prop="userInfo.name" borderBottom ref="item1" required>-->
<!--						<u&#45;&#45;input v-model="dataForm.singleMoney" border="none" placeholder="请输入"></u&#45;&#45;input>-->
<!--					</u-form-item>-->
<!--					<u-form-item label="开始时间" prop="userInfo.name" borderBottom ref="item1" required @click="dateShow = !dateShow;">-->
<!--						<u&#45;&#45;input v-model="dataForm.startTime" border="none" placeholder="请输入"></u&#45;&#45;input>-->
<!--					</u-form-item>-->
<!--					<u-form-item label="结束时间" prop="userInfo.name" borderBottom ref="item1" required @click="endDateShow = !endDateShow;">-->
<!--						<u&#45;&#45;input v-model="dataForm.endTime" border="none" placeholder="请输入"></u&#45;&#45;input>-->
<!--					</u-form-item>-->
					<u-form-item v-for="(item, index) in formList" :key="index" :label="item.label" :required="item.required" border-bottom>
						<view v-if="item.fieldType == 'picker'" class="input-container">
							<u-input readonly :placeholder="item.placeholder" :border="item.border">
								<view slot="suffix" @tap="handleClick(item.btnClickEvent)">
									<u-icon v-if="item.suffix && item.suffix.type == 'icon'" :name="item.suffix.name" :size="item.suffix.size"></u-icon>
									<u-tag
											v-if="item.suffix && item.suffix.type == 'tag'"
											:text="item.suffix.text"
											:shape="item.suffix.shape"
											:plain="item.suffix.plain"
											size="mini"></u-tag>
								</view>
							</u-input>
							<view class="click-over" @tap="handleClick(item.clickEvent)"></view>
						</view>

						<view v-else-if="item.fieldType == 'number'" class="number-container" @tap="handleClick(item.clickEvent)">
							<u-number-box v-model="dataForm[item.field]" :max="item.max" :min="item.min" :step="item.step" :decimal-length="item.decimalLength"></u-number-box>
						</view>
						<view v-else class="input-container" @tap="handleClick(item.clickEvent)">
							<u-input v-model="dataForm[item.field]" :type="item.type" :placeholder="item.placeholder" :border="item.border"></u-input>
						</view>
					</u-form-item>

				</u-form>
				<view class="footer-tip">平台承诺，严格保障您的隐私安全</view>
			</view>
		</view>
		<view class="footer">
			<u-button text="保存" color="#3A84F0" @tap="onSave"></u-button>
		</view>
		<u-action-sheet :show="showSex" :actions="actions" title="请选择类型" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>
		<u-action-sheet :show="showLabel" :actions="actions" title="请选择标签" @close="showLabel = false"
			@select="sexSelect">
		</u-action-sheet>
		<u-datetime-picker :show="dateShow" v-model="dataForm.startTime" mode="datetime"></u-datetime-picker>
		<u-datetime-picker :show="endDateShow" v-model="dataForm.endTime" mode="datetime"></u-datetime-picker>
		<u-popup :show="addressPopVisible" round="30rpx" mode="bottom">
			<view class="address-form">
				<view class="flex-center-between">
					<view class="title">选择地址</view>
					<u-icon name="close-circle-fill" size="40rpx" color="#CCCCCC" @click="addressPopVisible = false"></u-icon>
				</view>
				<view class="address-btn" v-if="!addressForm.address">
					<u-button type="primary" shape="square" text="在地图上选择地址 >" plain @click="openMap"></u-button>
				</view>
				<u-form :model="addressForm" label-width="100rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }">
					<u-form-item label="门牌号" prop="address" :required="true" v-if="addressForm.address">
						<u-input v-model="addressForm.address" placeholder="请选择地址" border="none">
							<u-icon slot="suffix" label="重新选择" label-color="#3A84F0" label-size="28rpx" @click="openMap"></u-icon>
						</u-input>
					</u-form-item>
					<u-form-item prop="doorNumber" label="门牌号" :required="true">
						<u-input v-model="addressForm.doorNumber" placeholder="请输入详细地址，例1层101室" border="none"></u-input>
					</u-form-item>
				</u-form>
				<view class="form-footer">
					<u-icon name="phone" label="平台客服" label-pos="bottom" label-size="20rpx" label-color="#333" size="36rpx" class="page-footer"></u-icon>
					<view class="btn-box">
						<u-button text="确认提交" color="#3A84F0"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressPopVisible: false,
				addressForm: {
					address: '',
					doorNumber: '',
				},
				dataForm: {
					workTitile: '',
					workType: '',
					workLabel: '',
					workAddress: '',
					workPlace: '',
					workNum: '',
					singleMoney: '',
					startTime:'',
					endTime:'',
				},
				options: [{
					label: "222",
					value: 1
				}],
				showSex: false,
				showLabel: false,
				dateShow:false,
				endDateShow:false,
				form: {
					name: '',
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
				formList: [
					{ field: '1', label: '用工标题', required: true, placeholder: '张三', border: 'none' },
					{
						field: '2',
						fieldType: 'picker',
						options: [],
						label: '用工类型',
						required: true,
						placeholder: '请选择',
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
						border: 'none',
					},
					{
						field: '3',
						label: '用工标签',
						fieldType: 'picker',
						required: true,
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
						placeholder: '',
						border: 'none',
					},
					{
						field: '4',
						fieldType: 'picker',
						options: [],
						label: '用工地址',
						required: true,
						placeholder: '请选择',
						border: 'none',
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
						clickEvent: 'selectAddress',
					},
					{
						field: '5',
						label: '详细描述',
						required: true,
						placeholder: '',
						border: 'none',
					},
					{ field: '6', label: '用工数量', required: true, fieldType: 'number', placeholder: '请输入', min: 0, border: 'none' },
					{ field: '7', label: '单人日薪', required: true, fieldType: 'number', placeholder: '请输入', min: 0, decimalLength: 2, border: 'none' },
					{
						field: '8',
						fieldType: 'picker',
						options: [],
						label: '开始时间',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: { type: 'icon', name: 'arrow-right', size: '21rpx' },
					},
					{
						field: '9',
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
				console.log(this.dataForm);
				// uni.navigateBack(1)
			},
			onSave(){
				this.$toRoute('/pages/order/confirm')
			},
			openMap() {
				this.getMapLocation()
			},
			getMapLocation() {
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this.addressForm.address = res.address
						// this.getRegionFn(res);
					},
					fail: () => {
						// 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
						uni.getSetting({
							success: (res) => {
								console.log(res)
								var status = res.authSetting
								if (!status['scope.userLocation']) {
									// 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
									uni.showModal({
										title: '是否授权当前位置',
										content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
										success: (tip) => {
											if (tip.confirm) {
												// 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
												uni.openSetting({
													success: (data) => {
														// 如果用户授权了地理信息在，则提示授权成功
														if (data.authSetting['scope.userLocation'] === true) {
															uni.showToast({
																title: '授权成功',
																icon: 'success',
																duration: 1000,
															})
															// 授权成功后，然后再次chooseLocation获取信息
															uni.chooseLocation({
																success: (res) => {
																	console.log('详细地址', res)
																	// this.getRegionFn(res);
																},
															})
														} else {
															uni.showToast({
																title: '授权失败',
																icon: 'none',
																duration: 1000,
															})
														}
													},
												})
											}
										},
									})
								}
							},
							fail: (res) => {
								uni.showToast({
									title: '调用授权窗口失败',
									icon: 'none',
									duration: 1000,
								})
							},
						})
					},
				})
			},
			handleClick(event) {
				console.log(111);
				this.show = true;
				switch (event) {
					case 'selectAddress':
						console.log('handleClick')
						this.addressPopVisible = true
						break
					default:
						break
				}
				// switch (event) {
				// 	case 'enterpriseCertification':
				// 		console.log('handleClick')
				// 		this.$toRoute('/pages/my/enterpriseCertification')
				// 		break
				// 	case 'uploadLicense':
				// 		this.$toRoute('/pages/my/authenticate/uploadLicense')
				// 		break
				// 	case 'uploadIDCard':
				// 		this.$toRoute('/pages/my/authenticate/uploadIDCard')
				// 		break
				// 	default:
				// 		break
				// }
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.pages-order-add {
		.address-form {
			height: 630rpx;
			padding: 42rpx 32rpx;
			box-sizing: border-box;
			position: relative;
			/deep/.u-form-item {
				margin-top: 50rpx;
			}
			.address-btn {
				margin: 50rpx 0;
			}
			.form-footer {
				position: absolute;
				border-top: 1rpx solid #c0c0c0;
				z-index: 3;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 20rpx 42rpx;
				padding-bottom: 60rpx;
				box-sizing: border-box;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.btn-box {
					height: 89rpx;
					width: 521rpx;
					.u-button {
						height: 100%;
					}
				}
			}
		}
		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		.flex-center-between {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.flex-center {
			display: flex;
			align-items: center;
		}
		.body {
			padding: 53rpx 36rpx 45rpx 36rpx;
			box-sizing: border-box;
			margin: 38rpx 32rpx;
			margin-bottom: 200rpx;
			border-radius: 15rpx;
			background-color: #fff;
			// height: calc(100vh - 230rpx);
			position: relative;
			.title {
				margin-bottom: 50rpx;
			}
			.input-container {
				width: 100%;
				height: 100%;
				position: relative;
				.click-over {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 10;
				}
			}
			.number-container {
				width: 100%;
				height: 100%;
				/deep/.u-number-box__input {
					width: 100% !important;
					background-color: #fff !important;
				}
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