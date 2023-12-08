<template>
	<view class="page-my-authenticate-uploadLicense">
		<view class="body">
			<view class="title1">请上传营业执照照片</view>
			<view class="tip">仅支持在有效期内的中国大陆工商局监督管理局颁发的工 商营业执照:必须是原件照片、扫描件或者复印件加盖企业 公章后的扫描件。</view>

			<view class="image-box">
				<u-upload :fileList="frontList" @afterRead="aftFront" @delete="delFront" name="6" multiple :maxCount="1"
					width="370rpx" height="242rpx">
					
					<view v-if="url">
						<u-image :src="url" height="242rpx" width="370rpx"></u-image>
					</view>
					<view v-else>
						<u-image src="/static/uploadLicense.png" height="242rpx" width="370rpx"></u-image>
				<view class="click-text">点击上传</view>
					</view>
					
					
				</u-upload>


				
			</view>

			<view class="tip footer">平台承诺，严格保障您的隐私安全</view>
		</view>
		<view class="footer-btn">
			<u-button text="上传" color="#3A84F0" @click="add"></u-button>
		</view>
	</view>
</template>

<script>
import {casuaEdit} from "@/api/user.js"
	export default {
		data() {
			return {
				frontList:[],
				url:''
			}
		},
		methods:{
			async aftFront(event) {
				let lists = [].concat(event.file)
				let fileListLen = this.frontList.length
				lists.map((item) => {
					this.frontList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.frontList[fileListLen]
					this.frontList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: JSON.parse(result).data.fileUrl,
						id: JSON.parse(result).data.id,
					}))
					fileListLen++
				}
				console.log(this.frontList,'jjjjj');
			},
			delFront(file, lists, name) {
				this.frontList = []
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://39.108.59.181:9001' + '/file/upload', 
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						}
					});
				})
			},
			add(){
				let status= this.frontList.every((item)=>{
					return item.status==="success"
				})
				let state=this.frontList.length>0
				if(status&&state) {
					casuaEdit({
						licenseImg:this.frontList[0].id,
						id:Number(this.$store.state.user.userInfo.id)
					}).then((res)=>{
						if(res.code==='00000'){
							uni.showToast({
							title: "上传成功",
							duration: 2000,
							success: (res) => {
								setTimeout(() => {
									uni.navigateBack(1)
								}, 2000)
							},
						})
							
						}else{
							uni.$u.toast(res.data)
						}
					})
					// uni.setStorageSync('licenseImg', this.frontList[0].id)
				}else{
					 uni.$u.toast('请上传完上传营业执照照片再试')
				
				}
			
				// this.$store.state.user.userCard.licenseImg=this.frontList[0].id
				// console.log(this.$store.state.user.userCard);
			
			}
		},
		mounted(){
			this.url=this.$store.state.user.userCard.licenseImgUrl
			this.frontList[0].id=this.$store.state.user.userCard.licenseImg
			console.log(this.frontList[0]);
		},
		created(){

		}
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
				::v-deep .u-upload__wrap{
		margin: 0 auto;
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
