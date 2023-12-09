<template>
	<view class="page-my-index">
		<view class="information">
			<u-avatar :src="avater" size="120rpx"></u-avatar>
			<view class="information-right">
				<view class="name">{{ userInfo.name }}</view>
				<view v-if="userInfo.mobile" class="phone">手机号：{{ userInfo.mobile }}</view>
			</view>
		</view>
		<view class="operate-container">
			<view class="title">我的订单</view>
			<u-grid :col="5" :border="false">
				<u-grid-item v-for="(item, index) in operates" :key="index" @click="$toRoute(item.route)">
					<view class="operate-item">
						<view class="number" :style="{ color: item.color }">{{ item.number }}</view>
						<view class="laber">{{ item.label }}</view>
					</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="cell-container">
			<u-cell-group :border="false">
				<u-cell :border="false" v-for="(item, index) in cellList" :key="index" isLink @click="toBtn(item)">
					<view slot="title" class="title">
						<u-icon :name="item.icon" size="35rpx"></u-icon>
						<view class="label">{{ item.title }}</view>
						<u-badge v-if="item.status" type="error " numberType="overflow" max="99" :value="msgnum"></u-badge>
						<!-- <view v-if="index == 0" class="status">待完善</view> -->
					</view>
				</u-cell>
			</u-cell-group>
			<u-modal :show="show" :title="title" :content='content' :showCancelButton='true' @confirm="closeCard"
				@cancel="del"></u-modal>
		</view>
	</view>
</template>

<script>
import {
	personage
} from "@/api/sub.js"
import {
	tomerService, getmessageCount
} from "@/api/user.js"
export default {
	data() {
		return {
			userInfo: {},
			avater: '',
			show: false,
			content: "",
			msgnum: "",
			title: '拨打客服电话进行咨询',
			operates: [
			{
				number: 3,
				label: '已创建',
				color: '#333333',
				route: '/pages/order/index?state=creatyj'
			},
			{
				number: 3,
				label: '已报名',
				color: '#333333',
				route: '/pages/order/index?state=grab'
			},
			{
				number: 1,
				label: '进行中',
				color: '#333333',
				route: '/pages/order/index?state=being'
			},
			{
				number: 56,
				label: '已完成',
				color: '#333333',
				route: '/pages/order/index?state=completes'
			},
			{
				number: 0,
				label: '异常',
				color: '#F37878',
				route: '/pages/order/index?state=exception'
			},
			],
			cellList: [{
				icon: '/static/我的信息.png',
				title: '我的信息',
				// route: '/pages/my/editInfo',
				route: '/pages/my/enterpriseCertification'
			},
			{
				icon: '/static/我的信息.png',
				title: '消息',
				status: '1',
				// route: '/pages/my/editInfo',
				route: '/pages/my/messageList'
			},
			{
				icon: '/static/我的信息.png',
				title: '账户管理',
				// route: '/pages/my/editInfo',
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
	onLoad() {

	},
	onShow() {
		this.personageList()
		// 执行页面刷新的操作
		this.getmsgNum()
		// ...
	},
	methods: {
		personageList() {
			let userInfo = this.$store.state.user.userInfo
			this.userInfo = userInfo
			let params = {
				id: userInfo.id,
				type: this.$store.state.user.loginType,
			}
			personage(params).then(res => {
				const item = res.data;
				this.avater = item.headSculptureUrl
				this.operates = [
				{
					number: item.cjOrderCount,
					label: '已创建',
					color: '#333333',
					route: '/pages/order/index?state=creatyj'
				},	
				{
					number: item.qdzOrderCount,
					label: '已报名',
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
			console.log(this.operates);
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
			console.log(this.userInfo.id,'id');
			getmessageCount(
				{
					id: this.userInfo.id,
					type: this.$store.state.user.loginType,
				}
			).then((res) => {
				console.log(res,'res');
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

<style lang="scss">
page {
	background-color: #f2f6ff;
}

.page-my-index {
	padding-top: 222rpx;
	width: 100%;

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
		margin: 53rpx 30rpx 0 30rpx;

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