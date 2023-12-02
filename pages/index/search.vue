<template>
	<view class="page-index-search">
		<u-search :showAction="false" :placeholder="searchPlaceholder" bgColor="#fff" v-model='value' @search="getValue"></u-search>
		<view>
			<listItem v-for="(item, index) in pageList" :key="index" @onClick="pageTo(item)"  :compData="item"></listItem>
		</view>
	</view>
</template>

<script>
	import {
		findCasualEngineer,
		casualEngineerSearch
	} from "@/api/index.js"
	import listItem from './components/list-item'
	export default {
		components: {
			listItem,
		},
		data() {
			return {
				searchPlaceholder: '保安',
				pageList: [],
				value:"",
			}
		},
		onLoad(){
		this.findCasualEngineerList()	
		},
		methods: {
			// 搜索
			findCasualEngineerList() {
				findCasualEngineer().then(res => {					
					this.pageList=res.data.list.map(item => {
						return {
							img: item.cardImgPositive,
							name: item.engineerRealname,
							sex: item.engineerSexName,
							role: item.typeName,
							experience: item.labelName,
							times: item.employmentNumber,
							id:item.id,
							hasCertificate:true
						}			
					})
				})
			},
			pageTo(e) {
				uni.navigateTo({
					url:'/pages/index/personalDetails/check?id=' + e.id,
				})
			},
			getValue(e) {
				casualEngineerSearch({
					name:e
				}).then(res =>{
					const data = res.data;
					this.pageList = data.list.map(item => {
						return {
							img: item.cardImgPositive,
							name: item.engineerRealname,
							sex: item.engineerSexName,
							role: item.typeName,
							experience: item.labelName,
							times: item.employmentNumber,
							id:item.id,
							hasCertificate:true
						}			
					})
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}

	.page-index-search {
		background: #F2F6FF;
		padding: 38rpx 32rpx;
	}
		::v-deep .u-search__content{
		height: 64rpx;
	}
</style>