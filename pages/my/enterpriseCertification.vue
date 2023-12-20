<template>
	<view class="page-my-enterpriseCertification">
		<view class="body">
			<view class="title">完善企业信息</view>
			<view class="form">
				<u-form label-width="145rpx" :model="dataForm" :rules="rules"
					:label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }">
					<u-form-item label="企业名称" borderBottom required name="name">
						<u--input border="none" v-model="dataForm.name" placeholder="请输入"
							@change='getname'></u--input>
					</u-form-item>
					<u-form-item label="法人" borderBottom required name="delegate">
						<u--input border="none" v-model="dataForm.delegate" placeholder="请输入"
							@change='getworkpeople'></u--input>
					</u-form-item>
					<u-form-item label="法人身份证件号码" borderBottom required name="idCard">
						<u--input v-model="dataForm.idCard" type='number' disabledColor="#ffffff" placeholder="请输入"
							border="none" @change='getnumber'></u--input>

					</u-form-item>
					<u-form-item label="社会统一信用代码" borderBottom required name="taxNo">
						<u--input v-model="dataForm.taxNo" type='number' placeholder="请输入" disabledColor="#ffffff"
							border="none" @change="getdm"></u--input>

						<!-- </view> -->
					</u-form-item>
					<u-form-item label="法人身份证件照片" borderBottom required>
						<u--input v-model="dataForm.workType" disabled disabledColor="#ffffff" border="none"></u--input>
						<view class="imgdelegate" v-if="dataForm.delegateImgGh&&dataForm.delegateImgRx">
							<u-image  :src="'https://lhyg.hnxfsd.cn/prod-api/file/download?fileId=' + dataForm.delegateImgGh" height="150rpx" width="200rpx"  style="margin-right: 20px;"></u-image>
						   <u-image  :src="'https://lhyg.hnxfsd.cn/prod-api/file/download?fileId=' + dataForm.delegateImgRx" height="150rpx" width="200rpx"></u-image>
						</view>
						
						<u-tag v-else text='去认证' shape="circle" plain size="mini"
							@click="handleClick('uploadIDCard')"></u-tag>
						<!-- </view> -->
					</u-form-item>
	
					<u-form-item label="营业执照" borderBottom required>
						<u--input v-model="dataForm.workType" disabled disabledColor="#ffffff" border="none"></u--input>
						<u-image v-if="'https://lhyg.hnxfsd.cn/prod-api/file/download?fileId=' + dataForm.licenseImg" :src="dataForm.licenseImgUrl" height="200rpx" width="200rpx"></u-image>
						<u-tag v-else text="去认证" shape="circle" plain size="mini"
							@click="handleClick('uploadLicense')"></u-tag>
						<!-- </view> -->
					</u-form-item>
					<!-- <u-form-item :label="item.label" :required="item.required" border-bottom>
						<u-input readonly :placeholder="item.placeholder" :border="item.border" v-model="item.values">
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
						<u-input  :type="item.type" :placeholder="item.placeholder" :border="item.border"></u-input>
					</u-form-item> -->
				</u-form>
			</view>
			<view class="footer-tip">平台承诺，严格保障您的隐私安全</view>
		</view>
		<view class="footer">
			<u-button text="保存" color="#3A84F0" @click="sumbit"></u-button>
		</view>
	</view>
</template>

<script>
import {
	getuser,
	casuaEdit
} from '@/api/user.js'
export default {
	data() {
		return {
			dataForm: {
				name: '',
				delegate: '',//法人
				idCard: '',//身份证号码
				taxNo: '',//社会统一信用代码
				delegateImgGh: '',//身份证国徽
				delegateImgRx: '',//身份证人像
				delegateImgGhUrl: '',//身份证国徽
				delegateImgRxUrl: '',//身份证人像
			},
			imgData:null,
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
			rules:{
				idCard:[
					{min:18,max:18,message:'请输入正确的身份证号码'},
				]
			}
		}
	},
	methods: {
		onBack() {
			uni.navigateBack(1)
		},
		// 保存
		sumbit(){
			this.dataForm.id=this.$store.state.user.userInfo.id
			if(!uni.$u.test.idCard(this.dataForm.idCard)){
				uni.$u.toast('请填写正确的身份证号')
				return
			}
			casuaEdit(this.dataForm).then((res)=>{
				if(res.code==='00000'){
					uni.showToast({
							title: "上传成功",
							duration: 2000,
							success: (res) => {
								
								setTimeout(() => {
									uni.switchTab({
					url:'/pages/my/index'
				})
								}, 2000)
							},
						})
				}else{
					uni.$u.toast('上传失败')
				}
			})
		},
		setImg(){
			if (this.imgData) {
				this.dataForm.delegateImgGhUrl = this.imgData.delegateImgGh.url
				this.dataForm.delegateImgGh = this.imgData.delegateImgGh.id
				this.dataForm.delegateImgRxUrl = this.imgData.delegateImgRx.url
				this.dataForm.delegateImgRx = this.imgData.delegateImgRx.id
			}
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
		// 企业名称
		getname(e){
			this.dataForm.name = e;
		},
		// 法人
		getworkpeople(e){
			this.dataForm.getworkpeople=e
		},
		// 身份证号码
		getnumber(e){
			this.dataForm.idCard=e
		},
		//社会统一信用代码
		getdm(e){
			this.dataForm.taxNo=e
		}

	},
	onLoad(options) {
		if (options.data) {
			this.imgData = JSON.parse(options.data)
			console.log(this.imgData);
		}
	},
	mounted() {

		getuser(Number(this.$store.state.user.userInfo.id)).then((res) => {
			this.dataForm=res.data
			this.$store.state.user.userCard.licenseImgUrl=res.data.licenseImgUrl
			this.setImg()
			console.log(this.dataForm, '939939399');

		})
	},
	onShow(){
		getuser(Number(this.$store.state.user.userInfo.id)).then((res) => {
			// this.dataForm.name = res.data.name
			// this.dataForm.delegate = res.data.delegate
			// this.dataForm.idCard = res.data.idCard
			// this.dataForm.taxNo = res.data.taxNo
			this.dataForm=res.data
			this.setImg()
			// this.$store.state.user.userCard.licenseImgUrl=res.data.licenseImgUrl

			console.log(this.dataForm, '939939399');

		})
	}
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

		::v-deep .u-form-item__body__left {
			width: 78px !important;

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
	.imgdelegate{
		display: flex;
	}
	::v-deep .u-image{
		height: 150rpx;
	}
}</style>
