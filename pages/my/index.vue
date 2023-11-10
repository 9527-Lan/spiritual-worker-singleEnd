<template>
	<view class="page-my-index">
		<view class="information">
			<u-avatar :src="information.img" size="120rpx"></u-avatar>
			<view class="information-right">
				<view class="name">{{ information.name }}</view>
				<view v-if="information.phone" class="phone">手机号：{{ information.phone }}</view>
			</view>
		</view>
		<view class="operate-container">
			<view class="title">我的订单</view>
			<u-grid :col="4" :border="false">
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
				<u-cell :border="false" v-for="(item, index) in cellList" :key="index" isLink @click="$toRoute(item.route)">
					<view slot="title" class="title">
						<u-icon :name="item.icon" size="35rpx"></u-icon>
						<view class="label">{{ item.title }}</view>
						<view v-if="index == 0" class="status">待完善</view>
					</view>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information: { img: '', name: '张三三', phone: 15344446666 },
				operates: [
					{ number: 3, label: '抢单中', color: '#333333', route: '/pages/order/index?state=grab' },
					{ number: 1, label: '进行中', color: '#333333', route: '/pages/order/index?state=being' },
					{ number: 56, label: '已完成', color: '#333333', route: '/pages/order/index?state=completes' },
					{ number: 0, label: '异常', color: '#F37878', route: '/pages/order/index?state=exceptions' },
				],
				cellList: [
					{ icon: '/static/我的信息.png', title: '我的信息', route: '/pages/my/editInfo' },
					{ icon: '/static/咨询客服.png', title: '咨询客服' },
					{ icon: '/static/关于我们.png', title: '关于我们' },
				],
			}
		},
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
