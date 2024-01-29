<template>
	<view class="page-my-authenticate-uploadIDCard">
		<view class="body">
			<view class="title1">请上传身份证照片</view>
			<view class="tip">确认该身份证影像是法人名下最新且有效的身份证影像</view>

			<view class="title2">01. 上传身份证人像面</view>
			<view class="image-box">
				<u-upload :fileList="frontList" @afterRead="aftFront" @delete="delFront" name="6" multiple :maxCount="1"
					width="370rpx" height="242rpx">
					<u-image src="/static/uploadHeader.png" height="242rpx" width="370rpx"></u-image>

					<view class="click-text">点击上传</view>
				</u-upload>
			</view>
			<view class="title2">02. 上传身份证国徽面</view>
			<view class="image-box">


				<u-upload :fileList="contraryList" @afterRead="aftContrary" @delete="delContrary" name="6" multiple
					:maxCount="1" width="370rpx" height="242rpx">
					<u-image src="/static/uploadEmblem.png" height="242rpx" width="370rpx"></u-image>
					<view class="click-text">点击上传</view>
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
import service from '@/utils/request.js'
import {casuaEdit} from "@/api/user.js"
import {translate} from "@/utils/yasuoimg.js"
export default {
	data() {
		return {
			frontList: [],
			contraryList: [],
		}
	},
	methods: {
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
				await translate(lists[i].url,async (res)=>{
					const result = await this.uploadFilePromise(res)
					let item = this.frontList[fileListLen]
					this.frontList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: JSON.parse(result).data.fileUrl,
						id: JSON.parse(result).data.id,
					}))
					fileListLen++
				})
			}
			console.log(this.frontList, 'jjjjj');
		},
		delFront(file, lists, name) {
			this.frontList = []
		},
		async aftContrary(event) {
			let lists = [].concat(event.file)
			let fileListLen = this.contraryList.length
			lists.map((item) => {
				this.contraryList.push({
					...item,
					status: 'uploading',
					message: '上传中'
				})
			})
			for (let i = 0; i < lists.length; i++) {
				await translate(lists[i].url,async (res)=>{
					const result = await this.uploadFilePromise(res)
					let item = this.contraryList[fileListLen]
					this.contraryList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: JSON.parse(result).data.fileUrl,
						id: JSON.parse(result).data.id,
					}))
					fileListLen++
				})
			}
		},
		delContrary(file, lists, name) {
			this.contraryList = []
		},
		uploadFilePromise(url) {
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: 'https://lhyg.hollwingroup.com/prod-api'+'/file/upload',
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
		add() {
			// 判断是否上传
			let state=this.frontList.length>0&&this.contraryList.length>0
			// 判断人面是否上传完
			let status2 = this.frontList.every((item) => {
				return item.status === "success" && item.status
			})

			// 判断国徽是否上传完
			let status = this.contraryList.every((item) => {
				return item.status === "success" && item.status
			})
			if (status2 && status&&state) {
				let l = {
					delegateImgGh:this.contraryList[0],
					delegateImgRx:this.frontList[0],
				}
				uni.redirectTo({
					url:'/pages/my/enterpriseCertification?data=' + JSON.stringify(l)
				})
				// casuaEdit({
				// 	delegateImgGh:this.contraryList[0].id,
				// 	delegateImgRx:this.frontList[0].id,
				// 	id:Number(this.$store.state.user.userInfo.id)
				// }).then((res)=>{
				// 	if(res.code==='00000'){
				// 		uni.showToast({
				// 			title: "上传成功",
				// 			duration: 2000,
				// 			success: (res) => {
				// 				setTimeout(() => {
				// 					uni.navigateBack(1)
				// 				}, 2000)
				// 			},
				// 		})
				// 	}else{
				// 		uni.$u.toast(res.data)
				// 	}
					 
				// })
				// uni.navigateBack(1)
			} else {
				 uni.$u.toast('请上传完身份证信息后再试')
			}





		}

	}
}
</script>

<style lang="scss">
page {
	background-color: #f2f6ff;
}

.page-my-authenticate-uploadIDCard {
	.body {
		padding: 47rpx 36rpx 45rpx 36rpx;
		box-sizing: border-box;
		margin: 38rpx 32rpx;
		border-radius: 15rpx;
		background-color: #fff;

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
			margin: auto;
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
				color: #3A84F0;
			}

			::v-deep .u-upload__wrap {
				margin: 0 auto;
			}
		}

		.tip {
			font-size: 24rpx;
			font-weight: 500;
			color: #999999;

			&.footer {
				margin-top: 120rpx;
				text-align: center;
			}
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
}</style>
