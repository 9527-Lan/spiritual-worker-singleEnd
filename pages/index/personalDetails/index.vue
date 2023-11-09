<template>
	<view class="pages-index-personalDetails-index">
		<view class="header"></view>
		<view class="body-wrapper">
			<view class="body">
				<view class="information">
					<view class="information-left">
						<view class="flex-center">
							<view class="name">{{ detailData.name }}</view>
							<view class="sex-box" :style="{ backgroundColor: sexBgColor[detailData.sex] }">
								<u-icon
									name="account-fill"
									size="24rpx"
									labelSize="24rpx"
									:label="detailData.sex"
									:color="colorFilter[detailData.sex]"
									:label-color="colorFilter[detailData.sex]"></u-icon>
							</view>
						</view>
						<view class="information-tag">
							<view class="tag-item">{{ detailData.role }}</view>
							<view class="tag-item">{{ detailData.experience }}</view>
							<view class="tag-item" v-if="detailData.hasCertificate">持证上岗</view>
						</view>
					</view>
					<u-avatar :src="detailData.img" size="96rpx"></u-avatar>
				</view>
				<view class="title">持有证书</view>
				<view class="certificate">
					<u-image :src="detailData.certificate" height="457rpx" width="615rpx"></u-image>
				</view>
				<view class="flex-center-between">
					<view class="title">Ta的用工记录</view>
					<view class="tip-text">用工数：{{ detailData.times }}次</view>
				</view>
				<view class="record-list">
					<view class="record-item flex-center-between" v-for="(item, index) in detailData.records" :key="index">
						<view class="record-item-title">{{ item.title }}</view>
						<view class="record-item-time">{{ item.startTime }}-{{ item.endTime }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//detialsID
		},
		data() {
			return {
				detailData: {
					img: '',
					name: '',
					sex: '',
					role: '',
					experience: '',
					hasCertificate: false,
					certificate: '',
					times: 0,
					records: [],
				},
				colorFilter: {
					男: '#3A84F0',
					女: '#F37878',
				},
				sexBgColor: {
					男: '#E6F0FF',
					女: '#FFF1F1',
				},
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				//id获取个人信息
				return new Promise((resolve, reject) => {
					//api().then(res)=>{}
					const res = {
						img: 'https://cdn.uviewui.com/uview/album/1.jpg',
						name: '张三三',
						sex: '男',
						role: '电工',
						experience: '三年经验以上',
						hasCertificate: true,
						certificate: '/static/证书.png',
						times: 13,
						records: [
							{ title: '电工维修', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '大厦电路检测', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '物业机房电路维修', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '电力抢救', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '大厦电路检测', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '物业机房电路维修', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '电力抢救', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '大厦电路检测', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '物业机房电路维修', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '电力抢救', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '大厦电路检测', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '物业机房电路维修', startTime: '2023.09.17', endTime: '2023.09.25' },
							{ title: '电工维修', startTime: '2023.09.17', endTime: '2023.09.25' },
						],
					}
					this.detailData = JSON.parse(JSON.stringify(res))
					resolve(res)
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.pages-index-personalDetails-index {
		position: relative;
		.header {
			background-color: #3a84f0;
			color: #fff;
			height: 340rpx;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
		}
		.flex-center {
			display: flex;
			align-items: center;
		}
		.flex-center-between {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.body-wrapper {
			position: absolute;
			top: 32rpx;
			left: 0;
			right: 0;
			padding: 0 32rpx;
			box-sizing: border-box;
			z-index: 1;
			.title {
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
				margin: 30rpx 0;
			}
			.tip-text {
				font-size: 24rpx;
				color: #666666;
			}
			.body {
				padding: 32rpx;
				box-sizing: border-box;
				background-color: #fff;
				border-radius: 15rpx;
				margin-bottom: 50rpx;
				.information {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.information-left {
						height: 100%;
					}
					.name {
						font-size: 32rpx;
						font-weight: bold;
						color: #333333;
					}
					.sex-box {
						margin-left: 33rpx;
						padding: 10rpx;
						border-radius: 5rpx;
					}
					.information-tag {
						margin-top: 24rpx;
						display: flex;
						align-items: center;
						.tag-item {
							border-radius: 5rpx;
							font-size: 24rpx;
							font-weight: 500;
							color: #333333;
							background-color: #eaeff4;
							padding: 0 11rpx;
							height: 43rpx;
							line-height: 43rpx;
							& + .tag-item {
								margin-left: 10rpx;
							}
						}
					}
				}
				.certificate {
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.record-list {
					.record-item {
						margin-top: 40rpx;
					}
					.record-item-title {
						font-size: 24rpx;
						font-weight: 500;
						color: #333333;
					}
					.record-item-time {
						font-size: 20rpx;
						font-weight: 500;
						color: #666666;
					}
				}
			}
		}
	}
</style>
