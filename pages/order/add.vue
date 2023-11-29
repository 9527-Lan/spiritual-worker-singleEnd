<template>
	<view class="pages-order-add">
		<view class="body">

			<view class="title">完善下单信息</view>
			<view class="form">
				<u-form label-width="145rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }"
					:model="form">
					<u-form-item label="用工标题" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workTitile" border="none" placeholder="张三"
							@change='getWorkTitile'></u--input>
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
						<u--input v-model="dataForm.workAddress" border="none" placeholder="请输入"
							@change='getWorkAddress'></u--input>
					</u-form-item>
					<u-form-item label="详细描述" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workPlace" border="none" placeholder="请输入"
							@change='getWorkplace'></u--input>
					</u-form-item>
					<u-form-item label="用工数量" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workNum" border="none" placeholder="请输入"
							@change='getWorkNum'></u--input>
					</u-form-item>
					
					<u-form-item label="抢单人数" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.qdQuantity" border="none" placeholder="请输入"
							@change='getworkpeople'></u--input>
					</u-form-item>
					
					
					<u-form-item label="单人日薪" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.singleMoney" border="none" @change='getSingleMoney'
							placeholder="请输入"></u--input>
					</u-form-item>
					<u-form-item label="开始时间" prop="userInfo.name" borderBottom ref="item1" required
						@click="dateShow = !dateShow;">
						<u--input v-model="dataForm.startTime" border="none" placeholder="请选择"></u--input>
					</u-form-item>
					<u-form-item label="结束时间" prop="userInfo.name" borderBottom ref="item1" required
						@click="endDateShow = !endDateShow;">
						<u--input v-model="dataForm.endTime" border="none" placeholder="请选择"></u--input>
					</u-form-item>

				</u-form>
			</view>
			<view class="footer-tip">平台承诺，严格保障您的隐私安全</view>
		</view>
		<u-action-sheet :show="showSex" :actions="workTypeList" title="请选择类型" @close="showSex = false"
			@select="typeSelect">
		</u-action-sheet>
		<u-action-sheet :show="showLabel" :actions="labelList" title="请选择标签" @close="showLabel = false"
			@select="labelSelect">
		</u-action-sheet>
		<u-datetime-picker :show="dateShow" mode="datetime" @cancel='starts' @confirm="getStartTimes"
			:formatter="formatter" ref="startPicker"></u-datetime-picker>
		<u-datetime-picker :show="endDateShow" mode="datetime" @cancel='ends' @confirm="getEndTimes"
			:formatter="formatter" ref="endPicker"></u-datetime-picker>
		<view class="footer">
			<u-button text="保存" color="#3A84F0" @click="onBack"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		getWorkType,
		getType,
		submitLis
	} from '@/api/sub.js'
	import {
		mapstate
	} from 'vuex';
	export default {
		data() {
			return {
				dataForm: {
					principal:'',
					principalType:'',
					workTitile: '',
					workType: '',
					workLabel: '',
					workAddress: '',
					workPlace: '',
					workNum: '',
					singleMoney: '',
					startTime: '',
					endTime: '',
					workTypeId: '',
					workLabelId: '',
					qdQuantity:''

				},
				workTypeList: [],
				labelList: [],
				options: [{
					label: "222",
					value: 1
				}],
				showSex: false,
				showLabel: false,
				dateShow: false,
				endDateShow: false,
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
		created() {
			this.principalType=this.$store.state.user.loginType
		this.principal=this.$store.state.user.userInfo.id
			getType().then(res => {
				this.workTypeList = res.data.map(item => {
					return {
						name: item.label,
						value: item.value
					}
				});
			})
		},
		methods: {
			onBack() {
				if(this.dataForm.workTitile == '') {
					uni.showToast({
						title:'请输入用工标题',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.workTypeId == '') {
					uni.showToast({
						title:'请选择用工类型',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.workLabelId == '') {
					uni.showToast({
						title:'请选择用工标签',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.workAddress == '') {
					uni.showToast({
						title:'请输入用工地址',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.workPlace == '') {
					uni.showToast({
						title:'请输入详细描述',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.workNum == '') {
					uni.showToast({
						title:'请输入用工数量',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.singleMoney == '') {
					uni.showToast({
						title:'请输入单人日薪',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.startTime == '') {
					uni.showToast({
						title:'请选择开始时间',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.workPlace == '') {
					uni.showToast({
						title:'请输入详细描述',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.endTime == '') {
					uni.showToast({
						title:'请选择结束时间',
						icon:'none'
					})
					return;
				}
				submitLis({
					name: this.dataForm.workTitile,
					typeId: this.dataForm.workTypeId,
					labelIds: this.dataForm.workLabelId,
					address: this.dataForm.workAddress,
					addressItem: this.dataForm.workPlace,
					orderQuantity: this.dataForm.workNum,
					price: this.dataForm.singleMoney,
					orderStatr: this.dataForm.startTime,
					orderEnd: this.dataForm.endTime,
					description: this.dataForm.workPlace,
					principal:this.principal,
					principalType:this.principalType
				}).then(res => {
					if (res.code == "00000") {
						let ids = res.data;
						uni.showToast({
							title: "确认下单成功",
							duration: 2000,
							success: (res) => {
								uni.setStorageSync('order_ids', ids);
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/order/confirm?datas=' + JSON.stringify(this.dataForm) + '&orderId=' + ids,
									})
								}, 2000)
							},
						})
					}

				})

			},
			starts() {
				this.dateShow = false;
			},
			ends() {
				this.endDateShow = false;
			},
			getStartTimes(e) {
				this.dataForm.startTime = this.timestampToTime(e.value);
				this.dateShow = false;
			},
			getEndTimes(e) {
				this.dataForm.endTime = this.timestampToTime(e.value);
				this.endDateShow = false;
			},
			typeSelect(e) {
				this.dataForm.workType = e.name;
				this.dataForm.workTypeId = e.value;
				getWorkType({
					typeId: e.value
				}).then(res => {
					this.labelList = res.data.map(item => {
						return {
							name: item.label,
							value: item.value
						}
					})
				})
			},
			labelSelect(e) {
				this.dataForm.workLabel = e.name;
				this.dataForm.workLabelId = e.value;
			},
			getWorkTitile(e) {
				this.dataForm.workTitile = e;
			},
			getWorkAddress(e) {
				this.dataForm.workAddress = e;
			},
			getWorkplace(e) {
				this.dataForm.workPlace = e;
			},
			getWorkNum(e) {
				this.dataForm.workNum = e;
			},
			getworkpeople(e){
				this.dataForm.qdQuantity = e;
			},
			getSingleMoney(e) {
				this.dataForm.singleMoney = e;
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
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
			timestampToTime(timestamp) {
				// 时间戳为10位需*1000，时间戳为13位不需乘1000
				let date = new Date(parseInt(timestamp));
				let Year = date.getFullYear();
				let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
				let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
				let Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
				let GMT = Year + '-' + Moth + '-' + Day + ' ' + Hour + ':' + Minute;
				return GMT;
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