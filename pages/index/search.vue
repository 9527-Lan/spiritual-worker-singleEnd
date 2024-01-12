<template>
	<view class="page-index-search">
		<u-search :showAction="false" :placeholder="searchPlaceholder" bgColor="#fff" v-model='value' @search="getValue"></u-search>
		<view>
			<listItem :search='search' v-for="(item, index) in pageList" :key="index" @onClick="pageTo(item)"  :compData="item"></listItem>
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
		props:{
			search:false
		},
		data() {
			return {
				searchPlaceholder: '保安',
				pageList: [],
				value:"",
			}
		},
		created() {
			this.findCasualEngineerList()
		},
		methods: {
			// 搜索
			findCasualEngineerList() {
				findCasualEngineer().then(res => {					
					this.pageList=res.data.list.map(item => {
						return {
							headSculpture: item.headSculpture,
							name: item.engineerRealname,
							img:[item.cardImgNegative,item.cardImgPositive],
							sex: item.engineerSexName,
							role: item.typeName?item.typeName.split(','):[],
							experience: item.labelName?item.labelName.split(','):[],
							times: item.employmentNumber,
							id:item.id,
							hasCertificate:true,
							hasCertificate: item.casualEngineerCertificate.length,
							casualEngineerCertificate: item.casualEngineerCertificate.length?item.casualEngineerCertificate:['/static/nodata.png']
						}			
					})
				})
			},
			pageTo(item) {
				if (this.search) {
					this.$emit('searchItem',item)
					return
				}
				uni.navigateTo({
					url:'/pages/index/personalDetails/check?data=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			getValue(e) {
				casualEngineerSearch({
					name:e
				}).then(res =>{
					const data = res.data;
					this.pageList = data.list.map(item => {
						return {
							headSculpture: item.headSculpture,
							img:[item.cardImgNegative,item.cardImgPositive],
							name: item.engineerRealname,
							sex: item.engineerSexName,
							role: item.typeName?item.typeName.split(','):[],
							experience: item.labelName?item.labelName.split(','):[],
							times: item.employmentNumber,
							id:item.id,
							hasCertificate:true,
							hasCertificate: item.casualEngineerCertificate.length,
							casualEngineerCertificate: item.casualEngineerCertificate.length?item.casualEngineerCertificate:['/static/nodata.png']
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