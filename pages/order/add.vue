<template>
	<view class="pages-order-add">
		<view class="body">
			<view class="title">完善下单信息</view>
			<view class="form">
				<u-form label-width="145rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }"
					:model="form">
					<u-form-item label="用工标题" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workTitile" border="none" placeholder="张三"></u--input>
					</u-form-item>
					<u-form-item label="用工类型" prop="userInfo.sex" borderBottom @click="showSex = !showSex; " ref="item1"
						required>
						<u--input v-model="dataForm.workType" disabled disabledColor="#ffffff" placeholder="请选择"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="用工标签" prop="userInfo.sex" borderBottom @click="showLabel = !showSex; "
						ref="item1" required>
						<u--input v-model="dataForm.workLabel" disabled disabledColor="#ffffff" placeholder="请选择"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="用工地址" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workAddress" border="none" placeholder="请输入"></u--input>
					</u-form-item>
					<u-form-item label="详细描述" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workPlace" border="none" placeholder="请输入"></u--input>
					</u-form-item>
					<u-form-item label="用工数量" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workNum" border="none" placeholder="请输入"></u--input>
					</u-form-item>
					<u-form-item label="单人日新" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.singleMoney" border="none" placeholder="请输入"></u--input>
					</u-form-item>
					<u-form-item label="开始时间" prop="userInfo.name" borderBottom ref="item1" required @click="dateShow = !dateShow;">
						<u--input v-model="dataForm.startTime" border="none" placeholder="请输入"></u--input>
					</u-form-item>
					<u-form-item label="结束时间" prop="userInfo.name" borderBottom ref="item1" required @click="endDateShow = !endDateShow;">
						<u--input v-model="dataForm.endTime" border="none" placeholder="请输入"></u--input>
					</u-form-item>

				</u-form>
			</view>
			<view class="footer-tip">平台承诺，严格保障您的隐私安全</view>
		</view>
		<u-action-sheet :show="showSex" :actions="actions" title="请选择类型" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>
		<u-action-sheet :show="showLabel" :actions="actions" title="请选择标签" @close="showLabel = false"
			@select="sexSelect">
		</u-action-sheet>
		<u-datetime-picker :show="dateShow" v-model="dataForm.startTime" mode="datetime"></u-datetime-picker>
		<u-datetime-picker :show="endDateShow" v-model="dataForm.endTime" mode="datetime"></u-datetime-picker>
		<view class="footer">
			<u-button text="保存" color="#3A84F0" @click="onBack"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				formList: [{
						field: 'name',
						label: '用工标题',
						required: true,
						placeholder: '张三',
						border: 'none',
					},
					{
						field: 'workType',
						fieldType: 'picker',
						options: [{
							label: "222",
							value: 1
						}],
						label: '用工类型',
						required: true,
						placeholder: '请选择',
						suffix: {
							type: 'icon',
							name: 'arrow-right',
							size: '21rpx'
						},
						border: 'none',
					},
					{
						field: 'workLabel',
						label: '用工标签',
						fieldType: 'picker',
						required: true,
						suffix: {
							type: 'icon',
							name: 'arrow-right',
							size: '21rpx'
						},
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
						suffix: {
							type: 'icon',
							name: 'arrow-right',
							size: '21rpx'
						},
						btnClickEvent: 'selectAddress',
					},
					{
						field: '',
						label: '详细描述',
						required: true,
						placeholder: '请输入',
						border: 'none',
					},
					{
						field: '',
						label: '用工数量',
						required: true,
						fieldType: 'input',
						placeholder: '请输入',
						min: 0,
						border: 'none'
					},
					{
						field: '',
						label: '单人日薪',
						required: true,
						fieldType: 'input',
						placeholder: '请输入',
						min: 0,
						decimalLength: 2,
						border: 'none'
					},
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '开始时间',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: {
							type: 'icon',
							name: 'arrow-right',
							size: '21rpx'
						},
					},
					{
						field: '',
						fieldType: 'picker',
						options: [],
						label: '结束时间',
						required: true,
						placeholder: '',
						border: 'none',
						suffix: {
							type: 'icon',
							name: 'arrow-right',
							size: '21rpx'
						},
					},
				],
			}
		},
		methods: {
			onBack() {
				console.log(this.dataForm);
				// uni.navigateBack(1)
			},
			handleClick(event) {
				console.log(111);
				this.show = true;
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