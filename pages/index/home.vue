<template>
	<view class="page-index">
		<u-navbar :bgColor="bgColor">
			<view slot="left" class="search-box">
				<u-search :showAction="false" placeholder="搜索用工类型信息..." bgColor="#fff" style="width: 100%"  disabled @click="$toRoute('/pages/index/search')"></u-search>
			</view>
		</u-navbar>
		<view class="swiper-box">
			<u-swiper :list="swiperList" circular height="280rpx" :radius="15" indicator></u-swiper>
		</view>
		<view class="order-box">
			<u-image src="@/static/publish.png" height="200rpx" width="100%"></u-image>
			<view class="order-btn">
				<u-button color="#3A84F0" size="mini" @click="$toRoute('/pages/order/index')">一键下单</u-button>
			</view>
		</view>
		<view>
			<u-tabs :list="tabList" @click="onTabClick" lineHeight="16rpx" lineWidth="64rpx"></u-tabs>
		</view>
		<view>
			<!-- /pages/index/personalDetails/index -->
			<listItem v-for="(item, index) in pageList" :key="index" :compData="item" @onClick="$toRoute('/pages/index/personalDetails/check')"></listItem>
		</view>
	</view>
</template>

<script>
	import listItem from './components/list-item'
	export default {
		components: {
			listItem,
		},
		data() {
			return {
				bgColor: '#f2f6ff',
				swiperList: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				tabList: [{ name: '推荐' }, { name: '保安' }, { name: '保洁' }, { name: '电工' }, { name: '环卫' }, { name: '物业' }],
				pageList: [
					{ img: 'https://cdn.uviewui.com/uview/album/1.jpg', name: '张三三', sex: '男', role: '电工', experience: '三年经验以上', hasCertificate: true, times: 13 },
					{ img: 'https://cdn.uviewui.com/uview/album/4.jpg', name: '李林', sex: '女', role: '电工', experience: '有经验', hasCertificate: false, times: 0 },
					{ img: '', name: '张三三', sex: '男', role: '电工', experience: '三年经验以上', hasCertificate: true, times: 1 },
				],
			}
		},
		methods: {
			onTabClick() {},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}
	.page-index {
		padding: 0 32rpx;
		padding-top: 88px;
		width: 100%;
		.search-box {
			width: 480rpx;
			height: 64rpx;
		}
		.swiper-box {
			margin-top: 16rpx;
			border-radius: 15rpx;
			overflow: hidden;
		}
		.order-box {
			margin-top: 16rpx;
			position: relative;
			.order-btn {
				position: absolute;
				width: 149rpx;
				height: 47rpx;
				bottom: 52rpx;
				right: 139rpx;
			}
		}
		.body {
		}
	}
</style>
