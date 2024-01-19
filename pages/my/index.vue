<template>
	<view class="page-my-index">
		<view class="information">
			<view class="left">
				<u-avatar :src="avater" size="120" @click="upAvatar"></u-avatar>
				<avatar @upload="myUpload" v-if="!avater" ref="avatar" style="width: 0;height: 0;"></avatar>
			</view>
			<view class="information-right">
				<view class="name">{{ userInfo.name }}</view>
				<view v-if="userInfo.mobile" class="phone">手机号：{{ userInfo.mobile }}</view>
			</view>
		</view>
		<view class="operate-container">
			<view class="title">我的订单</view>
			<u-grid :col="3" class="margin" :border="false">
				<u-grid-item v-for="(item, index) in operates" :key="index" @click="$toRoute(item.route)">
					<view class="operate-item" :style="{marginBottom:index<3?'50rpx':''}">
						<view class="number" :style="{ color: item.color }">{{ item.number }}</view>
						<view class="laber">{{ item.label }}</view>
					</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="cell-container">
			<u-cell-group :border="false">
				<u-cell :border="false" v-show='!(item.title == "账户管理" && !hind)' v-for="(item, index) in cellList" :key="index" isLink @click="toBtn(item)">
					<view slot="title" class="title">
						<u-icon :name="item.icon" size="35rpx"></u-icon>
						<view class="label">{{ item.title }}</view>
						<u-badge v-if="item.status" type="error " numberType="overflow" max="99" :value="msgnum"></u-badge>
					</view>
				</u-cell>
			</u-cell-group>
			<u-modal :show="show" :title="title" :showCancelButton='true'
				@cancel="del">
				<view class="modalContent">
					<rich-text style="width: 100%;" :nodes="content" class="rText"></rich-text>
				</view>
				<view slot='confirmButton' class="confirmButton">
					<u-button class="meiyige" shape="circle" text="取消" @click="del"></u-button>
					<u-button class="meiyige" shape="circle" type="primary" text="确定" @click="closeCard"></u-button>
				</view>
			</u-modal>
		</view>
		<view class="">
			<!-- <u-button   text="退出登录"></u-button> -->
		<button shape='circle' @click="unLogin" style="width: 50%;
		margin: 20rpx auto;
		background-color: #1e80ff;
		border-color: #1e80ff;
		border-radius: 60rpx;
		color: #fff;">退出登录</button>
		</view>
	</view>
</template>

<script>
import {
	personage
} from "@/api/sub.js"
import avatar from "../../components/yq-avatar/yq-avatar.vue";
import service from '@/utils/request.js'
import {
	tomerService, getmessageCount,
	casualPersonageAvatar,
	casualEntrepreneurAvatar
} from "@/api/user.js"
export default {
	data() {
		return {
			hind:'',
			userInfo: {},
			avater: '',
			show: false,
			content: "",
			msgnum: "",
			title: '拨打客服电话进行咨询',
			operates: [
			{
				number: 0,
				label: '待发布',
				color: '#333333',
				route: '/pages/order/index?state=creatyj'
			},
			{
				number: 0,
				label: '抢单中',
				color: '#333333',
				route: '/pages/order/index?state=grab'
			},
			{
				number: 0,
				label: '进行中',
				color: '#333333',
				route: '/pages/order/index?state=being'
			},
			{
				number: 0,
				label: '已完成',
				color: '#333333',
				route: '/pages/order/index?state=completes'
			},
			{
				number: 0,
				label: '已取消',
				color: '#333333',
				route: '/pages/order/index?state=Cancelled'
			},
			{
				number: 0,
				label: '异常',
				color: '#F37878',
				route: '/pages/order/index?state=exception'
			},
			],
			cellList: [
				{
					icon: '/static/消息.png',
					title: '消息',
					status: '',
					// route: '/pages/my/editInfo',
					route: '/pages/my/messageList'
				},
				{
					icon: '/static/我的信息.png',
					title: '我的信息',
					// route: '/pages/my/editInfo',
					route: '/pages/my/enterpriseCertification'
				},
				{
					icon: '/static/账户.png',
					title: '账户管理',
					route: '/pages/my/userList'
				},
				{
					icon: '/static/咨询客服.png',
					title: '咨询客服'
				},
				{
					icon: '/static/关于我们.png',
					title: '关于我们',
					route: '/pages/my/callMe/callMe'
				},
			],
		}
	},
	components:{
		avatar
	},
	onLoad() {
		this.$nextTick(()=>{
			this.hind = uni.getStorageSync('userInfoItem').isMain
		})
	},
	onShow() {
		this.personageList()
		// 执行页面刷新的操作
		this.getmsgNum()
		// ...
	},
	methods: {
		unLogin(){
			uni.redirectTo({
				url: '/pages/login/index',
				success:()=>{
					this.$store.commit('SET_HAS_LOGIN',false)
					uni.setStorageSync('userInfo',{})
				}
			})
		},
		upAvatar() {
			this.$refs.avatar.fChooseImg(0, {
				selWidth: "300upx", selHeight: "300upx",
				expWidth: '260upx', expHeight: '260upx'
			});
		},
		myUpload(rsp) {
			console.log(rsp, 'rsp');
			let that = this
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					//service.defaults.baseURL
					url: 'https://lhyg.hnxfsd.cn/prod-api' + '/file/upload', // 仅为示例，非真实的接口地址
					filePath: rsp.base64,
					name: 'file',
					formData: {
						user: 'test',
					},
					success: (res) => {
						console.log(JSON.parse(res.data).data);
						
						let parmas = {
							id: uni.getStorageSync('userInfoItem').headSculpture,
							img: JSON.parse(res.data).data.id
						}
						casualEntrepreneurAvatar(parmas).then(res => {
							uni.$u.toast('上传成功')
							this.personageList()
						})
					},
					fail() {
		
					}
				});
			})
		},
		personageList() {
			let userInfo = uni.getStorageSync('userInfo')
			this.userInfo = userInfo
			let params = {
				id: userInfo.id,
				type: uni.getStorageSync('loginType'),
			}
			personage(params).then(res => {
				const item = res.data;
				this.avater = item.headSculptureUrl
				this.operates = [
				{
					number: item.cjOrderCount,
					label: '待发布',
					color: '#333333',
					route: '/pages/order/index?state=creatyj'
				},	
				{
					number: item.qdzOrderCount,
					label: '抢单中',
					color: '#333333',
					route: '/pages/order/index?state=grab'
				}, {
					number: item.jxzOrderCount,
					label: '进行中',
					color: '#333333',
					route: '/pages/order/index?state=being'
				}, {
					number: item.ywcOrderCount,
					label: '已完成',
					color: '#333333',
					route: '/pages/order/index?state=completes'
				},
				{
					number: item.qxOrderCount,
					label: '已取消',
					color: '#333333',
					route: '/pages/order/index?state=Cancelled'
				},
				{
					number: item.ycOrderCount,
					label: '异常',
					color: '#F37878',
					route: '/pages/order/index?state=exception'
				},
				
			]
			})
			tomerService().then((res) => {
				this.content = res.data
			})
		},
		toBtn(item) {
			if (item.title === '咨询客服') {
				this.show = true
			} else {
				this.$toRoute(item.route)
			}
		},
		closeCard() {
			uni.makePhoneCall({
				phoneNumber: this.content //仅为示例
			});
			this.show = false;
		},
		del() {
			this.show = false;
		},
		getmsgNum() {
			getmessageCount(
				{
					id: this.userInfo.id,
					type: uni.getStorageSync('loginType'),
				}
			).then((res) => {
				this.msgnum = res.data
			});
		},
	},
	mounted() {
		this.personageList()
		this.getmsgNum()
	}
}
</script>

<style lang="scss" scoped>
	.modalContent{
		padding: 30rpx 0;
		font-size: 32rpx;
		font-weight: bold;
		color: #606266;
	}
	.confirmButton{
		display: flex;
		width: 80%;
		margin: 0 auto;
		justify-content: space-between;
		& .meiyige{
			width: 45%;
		}
	}
	.unLogin{
		width: 50%;
		margin: 20px auto;
		background-color: #1e80ff;
		border-color: #1e80ff;
		color: #fff;
	}
page {
	background-color: #f2f6ff;
}

.page-my-index {
	padding-top: 222rpx;
	padding-bottom: 60rpx;
	width: 100%;
	background-color: #f2f6ff;

	.information {
		display: flex;
		margin: 0 60rpx 68rpx 60rpx;

		.information-right {
			margin-left: 34rpx;

			.name {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}

			.phone {
				margin-top: 24rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #666666;
			}
		}
	}

	.operate-container {
		padding: 41rpx 46rpx;
		box-sizing: border-box;
		margin: 0 32rpx;
		border-radius: 15rpx;
		background-color: #fff;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin-bottom: 50rpx;
		}

		.operate-item {
			text-align: center;

			.number {
				font-size: 50rpx;
				font-weight: 800;
			}

			.laber {
				margin-top: 32rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #666666;
			}
		}
	}

	.cell-container {
		margin: 30rpx 30rpx 0 30rpx;

		.title {
			display: flex;
			align-items: center;

			.label {
				margin-left: 23rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
			}

			.status {
				margin-left: 13rpx;
				padding: 0 19rpx;
				height: 35rpx;
				line-height: 35rpx;
				box-sizing: border-box;
				background-color: #f37878;
				color: #fff;
				font-size: 20rpx;
				font-weight: bold;
				color: #ffffff;
				border-radius: 17rpx;
			}
		}
	}
}

</style>