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
	} from "@/api/user.js"
	import listItem from './components/list-item'
	export default {
		components: {
			listItem,
		},
		data() {
			return {
				searchPlaceholder: '保安',
				pageList: [{
						img: 'https://cdn.uviewui.com/uview/album/1.jpg',
						name: '张三三',
						sex: '男',
						role: '电工',
						experience: '三年经验以上',
						hasCertificate: true,
						times: 13
					},
					{
						img: 'https://cdn.uviewui.com/uview/album/4.jpg',
						name: '李林',
						sex: '女',
						role: '电工',
						experience: '有经验',
						hasCertificate: false,
						times: 0
					},
					{
						img: '',
						name: '李贤峰',
						sex: '男',
						role: '电工',
						experience: '三年经验以上',
						hasCertificate: true,
						times: 1
					},
					{
						img: '',
						name: '肖国运',
						sex: '男',
						role: '电工',
						experience: '三年经验以上',
						hasCertificate: false,
						times: 0
					},
					{
						img: '',
						name: '徐敏',
						sex: '女',
						role: '电工',
						experience: '三年经验以上',
						hasCertificate: false,
						times: 0
					},
					{
						img: '',
						name: '刘三琪',
						sex: '男',
						role: '电工',
						experience: '三年经验以上',
						hasCertificate: false,
						times: 0
					},
				],
			}
		},
		onLoad(){
		this.findCasualEngineerList()	
		},
		methods: {
			// 工程师查询
			findCasualEngineerList() {
				findCasualEngineer().then(res => {
					console.log(res)
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