<template>
	<view class="page-index">
		<u-navbar :bgColor="bgColor" >
			<!-- #ifdef MP-WEIXIN -->
			<view slot="left" class="search-box" >
				<u-search :showAction="false" placeholder="搜索用工类型信息..." bgColor="#fff" style="width: 100%" disabled
					@click="toSearch" ></u-search>
			</view>
			<!-- #endif -->
			
			<!-- #ifdef H5 -->
			<view slot="left" class="search-box-h5" @click="toSearch">
				<u-search  :showAction="false"  placeholder="搜索工程师..." bgColor="#fff" style="width: 100%"
				></u-search>
			</view>
			<!-- #endif -->
			<!-- h5 -->
			
		</u-navbar>
		<view class="swiper-box">
			<u-swiper :list="swiperList" circular height="280rpx" :radius="15" indicator></u-swiper>
		</view>
		<view class="order-box">
			<u-image @click="$toRoute('/pages/order/add')" src="@/static/publish.png" height="200rpx" width="100%"></u-image>
			<view class="order-btn">
				<u-button color="#3A84F0" size="mini" @click="$toRoute('/pages/order/add')">一键下单</u-button>
			</view>
		</view>
		<view class="tab">
			<!-- <u-tabs :list="tabList" lineHeight="0.4rem" lineWidth="35" @change="changeTabList"></u-tabs> -->
			<u-tabs @change="changeTabList" :list="tabList" lineWidth="33" lineHeight="0.4rem" :scrollable="false"
				:activeStyle="{
						color: '#333333',
						fontWeight: 'bold',
						transform: 'scale(1.05)',
						fontFamily: 'PingFang SC'
					}">
			</u-tabs>
		</view>
		<view>
			<!-- /pages/index/personalDetails/index -->
			<listItem v-for="(item, index) in pageList" :key="index" :compData="item"
				@onClick="pageTo(item)"></listItem>
		</view>
	</view>
</template>

<script>
	import {
		findCasualEngineer,
		casualServiceType
	} from "@/api/index.js"
	import listItem from './components/list-item'
	export default {
		components: {
			listItem,
		},
		data() {
			return {
				bgColor: '#f2f6ff',
				swiperList: [
					'/static/shareBg.png',
					'/static/shareBg.png',
					'/static/shareBg.png',
					// 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					// 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					// 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				tabList: [],
				// {
				// 		img: 'https://cdn.uviewui.com/uview/album/1.jpg',
				// 		name: '张三三',
				// 		sex: '男',
				// 		role: '电工',
				// 		experience: '三年经验以上',
				// 		hasCertificate: true,
				// 		times: 13
				// 	},
				pageList: [],					
				pageNum: 1,
				pageSize: 5,
				typeId: null,
				personData: "",
			}
		},
		methods: {
			onTabClick() {},
			toSearch(){
				uni.navigateTo({
					url:`/pages/index/search`
				})
			},
			pageTo(item) {
				uni.navigateTo({
					url:'/pages/index/personalDetails/check?data=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			// 首页列表渲染
			findCasualEngineerList(){
				let params = {
					typeId: this.typeId,
					pageNum: this.pageNum,
					status:2,
					pageSize: this.pageSize
				}
				findCasualEngineer(params).then(res => {			
					const dataList = res.data.list.map(item => {
						return {
							headSculpture: item.headSculpture,
							img:[item.cardImgNegative,item.cardImgPositive],
							name: item.engineerRealname,
							sex: item.engineerSexName,
							role: item.typeName?.split(','),
							experience: item.labelName?.split(','),
							times: item.employmentNumber,
							id: item.id,
							age: item.age,
							phone:item.phone,
							hasCertificate: item.casualEngineerCertificate.length,
							casualEngineerCertificate: item.casualEngineerCertificate.length?item.casualEngineerCertificate:['/static/nodata.png']
						}			
					})
					const data = res.data.list;
					this.personData = data;
					this.pageList=this.pageList.concat(dataList)
					console.log(this.pageList,'000000');
				})				
			},
	
		// 首页tab栏渲染
		async casualServiceTypeList(){
			let res = await casualServiceType();
			console.log(res,'res')
			let data = res.data.map(item=>{
				return {
					name:item.label,
					value:item.value
				}
			})
			
			let list = [
				{
					name: '推荐',
					value: null,
				}
			]
			list.push(...data)
			this.tabList = list
		},
		// 改变tab栏
		changeTabList(e){
			this.pageNum = 1
			this.pageList = []
			this.typeId = this.tabList[e.index].value
			this.findCasualEngineerList()
		},
		},
		mounted() {
			this.findCasualEngineerList()
			this.casualServiceTypeList()
		},
		// 触底加载
		onReachBottom(){
			this.pageNum++;
			this.casualServiceTypeList()
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f2f6ff;
	}
	.tab {
		margin: 42rpx 32rpx;
	
		/deep/ .u-tabs__wrapper__nav__line {
			width: 35px !important;
		}
	}
	.page-index {
		padding: 0 32rpx;
		padding-top: 103rpx;
		width: 100%;
		padding-bottom: 12rpx;

		.search-box {
			margin-top: 20rpx;
			width: 480rpx;
			height: 64rpx;
		}
		.search-box-h5 {
			margin-top: 20rpx;
			width: 100%;
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

		.body {}
	}
	::v-deep .u-navbar__content__left{
		width: 100%;
	}
	::v-deep .u-search__content{
		height: 64rpx;

	}
</style>