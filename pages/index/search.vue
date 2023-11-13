<template>
	<view class="page-index-search">
		<u-search :showAction="false" :placeholder="searchPlaceholder" bgColor="#fff" style="width: 100%"></u-search>
		<view>
			<listItem v-for="(item, index) in pageList" :key="index" :compData="item"></listItem>
		</view>
	</view>
</template>

<script>
	import {
		findCasualEngineer
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
							hasCertificate:true
						}			
					})
				})
			}
			
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f6ff;
	}

	.page-index-search {
		padding: 38rpx 32rpx;
	}
</style>