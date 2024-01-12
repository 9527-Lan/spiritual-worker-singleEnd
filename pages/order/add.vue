<template>
	<view class="pages-order-add">
		<view class="body">

			<view class="title">完善下单信息</view>
			<view class="form">
				<u-form label-width="145rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }"
					:model="form">
					<u-form-item label="用工标题" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workTitile" border="none" placeholder="请输入用工标题"
							@change='getWorkTitile'></u--input>
					</u-form-item>
					<u-form-item label="用工类型" prop="userInfo.workType" borderBottom @click="showSex = !showSex; " ref="item1"
						required>
						<u--input v-model="dataForm.workType" disabled disabledColor="#ffffff" placeholder="请选择用工类型"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="用工标签" prop="userInfo.sex" borderBottom @click="showLabel = !showSex; "
						ref="item1" required>
						<u--textarea  v-model="dataForm.workLabel" disabled disabledColor="#ffffff" placeholder="请选择用工标签"
							border="none" autoHeight></u--textarea>


						<!-- <u--textarea v-model="dataForm.workLabel" disabled disabledColor="#ffffff" placeholder="请选择"
							border="none"></u--textarea> -->
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="用工地址" prop="userInfo.name" borderBottom ref="item1" @click="addressPopVisible = !addressPopVisible; " required>
						<u--input v-model="dataForm.workAddress" border="none" placeholder="请选择用工地址"
							></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="详细地址" prop="userInfo.name" borderBottom ref="item1" @click="addressPopVisible = !addressPopVisible; " required>
						<u--input v-model="dataForm.addressItem" border="none" placeholder="请选择用工详细地址"
							></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="联系电话" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.phone" border="none" placeholder="请填写联系电话"
							></u--input>
					</u-form-item>
					<u-form-item label="用工数量" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.workNum" border="none" placeholder="请输入用工数量"
							@change='getWorkNum'></u--input>
					</u-form-item>
					
					<u-form-item label="报名人数" prop="userInfo.name" borderBottom ref="item1" required>
						<u--input v-model="dataForm.qdQuantity" class="qdQuantity" border="none" placeholder="建议报名人数大于用工人数，避免人员不符合要求"
							@change='getworkpeople'></u--input>
						<!-- <u--textarea @change='getworkpeople' v-model="dataForm.qdQuantity" placeholder="建议报名人数大于用工人数，避免人员不符合要求" ></u--textarea> -->
					</u-form-item>
					<u-form-item label="年龄区间" @click="agePopVisible = !agePopVisible" borderBottom ref="item1" >
						<u--input v-model="age" border="none" placeholder="请输入最小年龄"
							></u--input>
					</u-form-item>
					
					
					<u-form-item label="单人服务费用" prop="userInfo.singleMoney" borderBottom ref="item1" required>
						<u--input v-model="dataForm.singleMoney" border="none" @change='getSingleMoney'
							placeholder="请输入单人服务费用"></u--input>
					</u-form-item>
					<u-form-item label="用工天数" prop="userInfo.employmentDay" borderBottom ref="item1" required>
						<u--input v-model="dataForm.employmentDay" border="none"
							placeholder="请输入用工天数"></u--input>
					</u-form-item>
					<u-form-item label="用工开始时间" prop="userInfo.startTime" borderBottom ref="item1" required
						@click="dateShow = !dateShow;">
						<u--input v-model="dataForm.startTime" border="none" placeholder="请选择用工开始时间"></u--input>
					</u-form-item>
					<u-form-item label="用工结束时间" prop="userInfo.endTime" borderBottom ref="item1" required
						@click="endDateShow = !endDateShow;">
						<u--input v-model="dataForm.endTime" border="none" placeholder="请选择用工结束时间"></u--input>
					</u-form-item>
					<u-form-item label="报名截至时间" prop="userInfo.orderClose" borderBottom ref="item1" required
						@click="orderCloseShow = !orderCloseShow;">
						<u--input v-model="dataForm.orderClose" border="none" placeholder="请选择报名截至时间"></u--input>
					</u-form-item>
					<u-form-item label="详细描述" prop="userInfo.name" @click="goToMpHtml" borderBottom ref="item1" required>
						<rich-text style="width: 100%;" :nodes="dataForm.workPlace"></rich-text>
					</u-form-item>
				</u-form>
			</view>
			<view class="footer-tip">平台承诺，严格保障您的隐私安全</view>
		</view>
		<qianziyu-select :show="showLabel" type="checkbox" name="label" :showSearch="false"
					:dataLists="labelList" popupTitle="请选择服务类型" @cancel="showLabel=false" @submit="labelSelect" />


		<u-action-sheet :show="showSex" :actions="workTypeList" title="请选择类型" @close="showSex = false"
			@select="typeSelect">
		</u-action-sheet>
		<!-- <u-action-sheet :show="showLabel" :actions="labelList" title="请选择标签" @close="showLabel = false"
			@select="labelSelect">
		</u-action-sheet> -->
		<u-datetime-picker :show="dateShow" mode="datetime" @cancel='starts' @confirm="getStartTimes"
			v-model="value1" :formatter="formatter" ref="startPicker"></u-datetime-picker>
		<u-datetime-picker :show="endDateShow" mode="datetime" @cancel='ends' @confirm="getEndTimes"
			v-model="value2" :formatter="formatter" ref="endPicker"></u-datetime-picker>
		<u-datetime-picker :show="orderCloseShow" mode="datetime" @cancel='orderCloseShow = false' @confirm="orderCloseTimes"
			v-model="value3" :formatter="formatter" ref="endPicker"></u-datetime-picker>


			
		<view class="footer">
			<u-button text="保存" :disabled="!submitDisabled" color="#3A84F0" @click="onBack"></u-button>
		</view>
		
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
					<u-form-item label="地址" prop="address" :required="true" v-if="addressForm.address">
						<u-input v-model="addressForm.name" placeholder="请选择地址" border="none">
							<u-icon slot="suffix" label="重新选择" label-color="#3A84F0" label-size="28rpx" @click="openMap"></u-icon>
						</u-input>
					</u-form-item>
					<u-form-item prop="doorNumber" label="详细地址" :required="true">
						<u-input v-model="addressForm.address" placeholder="请输入详细地址，例1层101室" border="none"></u-input>
					</u-form-item>
				</u-form>
				<view class="form-footer">
					<kefu name="phone" label="平台客服" labelPos="bottom" labelSize="20rpx" labelColor="#333" size="36rpx" className="page-footer"></kefu>
					<view class="btn-box">
						<u-button @click="addressConfirm" text="确认提交" color="#3A84F0"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-picker :defaultIndex='[17,44]' :show="agePopVisible" ref="uPicker" :columns="columns" @confirm="confirmAge" @cancel='agePopVisible = !agePopVisible'></u-picker>
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
	import kefu from "@/components/kefu.vue"
	import qianziyuSelect from "@/pages/index/components/qianziyu-select.vue"
	export default {
		components: {
			qianziyuSelect,
			kefu
		},
		data() {
			return {
				placeholder: '写点什么吧 ~',
				// 是否只读
				readOnly: false,
				// 最大字数限制，-1不限
				maxlength: -1,
				// 初始模板
				templates:'',
				addressPopVisible: false,
				agePopVisible: false,
				orderCloseShow: false,
				addressForm: {},
				value1:Number(new Date()),
				value2:Number(new Date()),
				value3:Number(new Date()),
				columns: [
					
				],
				age:'',
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
					qdQuantity:'',
					employmentDay:'',
					orderClose:''
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
						link:'pages/order/components/mp-html-demo/index/index'
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
						label: '单人服务费用',
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
			let ageList = []
			for (var i = 1; i < 100; i++) {
				ageList.push(i)
			}
			this.columns[0] = ageList
			this.columns[1] = ageList
			getType().then(res => {
				this.workTypeList = res.data.map(item => {
					return {
						name: item.label,
						value: item.value
					}
				});
			})
		},
		computed:{
			submitDisabled(){
				if(this.dataForm.workTitile == '') {
					return;
				}
				if(this.dataForm.workTypeId == '') {
					return;
				}
				if(this.dataForm.workLabelId == '') {
					return;
				}
				if(this.dataForm.workAddress == '') {
					return;
				}
				if(this.dataForm.workNum == '') {
					return;
				}
				if(this.dataForm.qdQuantity == '') {
					return;
				}
				if(this.dataForm.singleMoney == '') {
					return;
				}
				if(this.dataForm.employmentDay == '') {
					return;
				}
				if(this.dataForm.startTime == '') {
					return;
				}
				if(this.dataForm.endTime == '') {
					return;
				}
				if(this.dataForm.workPlace == '') {
					return;
				}
				if(this.dataForm.phone == '') {
					return;
				}
				return true
			}
		},
		onShow(){
			console.log(uni.getStorageSync('workPlace'));
			this.dataForm.workPlace = uni.getStorageSync('workPlace');
			uni.setStorageSync('workPlace','');
		},
		onLoad() {
			
		},
		methods: {
			addressConfirm() {
				
				let addressForm = this.addressForm
				this.dataForm.workAddress = addressForm.name
				this.dataForm.addressItem = addressForm.address
				this.dataForm.longitude = addressForm.longitude
				this.dataForm.latitude = addressForm.latitude
				this.addressPopVisible = false
			},
			confirmAge(e){
				console.log(e);
				if(e.value[0]>e.value[1]){
					uni.showToast({
						title: '最小年龄不可大于最大年龄',
						icon: 'none',
						duration: 1000,
					})
					return
				}else{
					this.dataForm.startAge = e.value[0]
					this.dataForm.endAge = e.value[1]
					this.age = e.value[0] + '-' + e.value[1] + '岁'
					this.agePopVisible = false
				}
			},
			goToMpHtml(){
				uni.navigateTo({
					url:`/pages/order/components/mp-html-demo/index/index?data=${this.dataForm.workPlace}`
				})
			},
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
				if(this.dataForm.workNum == '') {
					uni.showToast({
						title:'请输入用工数量',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.qdQuantity == '') {
					uni.showToast({
						title:'请输入报名人数',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.singleMoney == '') {
					uni.showToast({
						title:'请输入单人服务费用',
						icon:'none'
					})
					return;
				}
				if(this.dataForm.employmentDay == '') {
					uni.showToast({
						title:'请输入用工天数',
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
				if(this.dataForm.endTime == '') {
					uni.showToast({
						title:'请选择结束时间',
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
				if(!uni.$u.test.mobile(this.dataForm.phone)) {
					uni.showToast({
						title:'请正确填写手机号',
						icon:'none'
					})
					return 
				}
				console.log(this.dataForm,'222222');
				submitLis({
					name: this.dataForm.workTitile,
					typeId: this.dataForm.workTypeId,
					labelIds: this.dataForm.workLabelId,
					address: this.dataForm.workAddress,
					addressItem: this.dataForm.addressItem,
					longitude: this.dataForm.longitude,
					latitude: this.dataForm.latitude,
					orderQuantity: this.dataForm.workNum,
					price: this.dataForm.singleMoney,
					orderStatr: this.dataForm.startTime,
					qdQuantity:this.dataForm.qdQuantity,
					orderEnd: this.dataForm.endTime,
					description: this.dataForm.workPlace,
					principal:this.principal,
					principalType:this.principalType,
					employmentDay: this.dataForm.employmentDay,
					startAge:this.dataForm.startAge,
					endAge:this.dataForm.endAge,
					orderClose:this.dataForm.orderClose,
					phone:this.dataForm.phone,
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
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
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
				let data = new Date(this.dataForm.endTime.replace(/-/g,'/')).getTime()
				if(data>e.value || !this.dataForm.endTime){
					this.dataForm.startTime = this.timestampToTime(e.value);
					this.dateShow = false;
				}else{
					uni.showToast({
						title: '开始时间不可大于结束时间',
						icon: 'none',
						duration: 1000,
					})
					this.dataForm.startTime = ''
				}
			},
			orderCloseTimes(e){
				this.dataForm.orderClose = this.timestampToTime(e.value);
				this.orderCloseShow = false
			},
			getEndTimes(e) {
				let data = new Date(this.dataForm.startTime.replace(/-/g,'/')).getTime()
				if(data<e.value ||!this.dataForm.startTime){
					this.dataForm.endTime = this.timestampToTime(e.value);
					this.endDateShow = false;
				}else{
					uni.showToast({
						title: '结束时间不可小于开始时间',
						icon: 'none',
						duration: 1000,
					})
					this.dataForm.endTime = ''
				}
			},
			typeSelect(e) {
				this.dataForm.workType = e.name;
				this.dataForm.workTypeId = e.value;
				getWorkType({
					typeId: e.value
				}).then(res => {
					this.labelList = res.data
				})
			},
			
			openMap() {
				this.getMapLocation()
			},
			getMapLocation() {
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this.addressForm = res
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


			labelSelect(e) {
				console.log(e,'22222');
				this.showLabel = false
				this.dataForm.workLabelId = e.length ? e.map(el => el.value).toString() : ''
				this.dataForm.workLabel = e.length ? e.map(el => el.label).toString() : ''


				// this.dataForm.workLabel = e.name;
				// this.dataForm.workLabelId = e.value;
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
	.editor-box{
		width: 100vw;
		height: 100vh;
	}
	page {
		background-color: #f2f6ff;
	}
	/deep/ .u-form-item__body__left__content__required{
		left: -24rpx;
	}
	.qdQuantity{
		/deep/ .u-input__content__field-wrapper__field{
			height: 50px ;
			.uni-input-placeholder.input-placeholder{
				text-wrap: balance
			}
		}
	}
	.pages-order-add {
		padding-bottom: 173rpx;;
		.address-form {
			height: 630rpx;
			padding: 42rpx 32rpx;
			box-sizing: border-box;
			position: relative;
			.flex-center-between {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
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
		.body {
			padding: 53rpx 36rpx 45rpx 36rpx;
			box-sizing: border-box;
			margin: 38rpx 32rpx;
			border-radius: 15rpx;
			background-color: #fff;
			height: auto;
			position: relative;

			.number-container {
				width: 100%;
				height: 100%;

				/deep/.u-number-box {
					width: 100% !important;
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

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				margin-bottom: 50rpx;
			}

			.form {
				width: 100%;
				margin-top: 46rpx;
				margin-bottom: 60rpx;
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
		::v-deep .u-textarea--disabled{
			background-color: #ffffff ;
		}
	}
</style>