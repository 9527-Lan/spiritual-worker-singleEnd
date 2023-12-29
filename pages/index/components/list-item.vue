<template>
	<view class="list-item" @click="onClick">
		<u-avatar :src="'https://lhyg.hnxfsd.cn/prod-api/file/download?fileId=' + compData.headSculpture" size="92rpx"></u-avatar>
		<view class="information" >
			<view class="information-top">
				<view class="flex-center">
					<view class="name">{{ compData.name }}</view>
					<view class="sex-box" :style="{ backgroundColor: sexBgColor[compData.sex] }">
						<u-icon
							name="account-fill"
							size="24rpx"
							labelSize="24rpx"
							:label="compData.sex"
							:color="colorFilter[compData.sex]"
							:label-color="colorFilter[compData.sex]"></u-icon>
					</view>
				</view>
				<view class="tip-text">用工数：{{ compData.times }}次</view>
			</view>
			<view class="information-tag">
				<view class="tag-item" :style="{minWidth:item.length*24 + 20 + 'rpx'}" v-for="(item, index) in compData.role" :key="item">{{ item }}</view>
				<view class="tag-item" :style="{minWidth:item.length*24 + 20 + 'rpx'}" v-if="compData.experience != null" v-for="(item, index) in compData.experience" :key="index">{{ item }}</view>
				<view class="tag-item" :style="{minWidth:4*24 + 20 + 'rpx'}" v-if="compData.hasCertificate">持证上岗</view>
			</view>
			<view class="tip-text">{{ compData.hasCertificate ? '已上传证书' : '' }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: { compData: Object },
		data() {
			return {
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
		mounted(){
			// this.ss()
		},
		methods:{
			onClick(){
				this.$emit('onClick')
			},
			
			// ss(){
			// 	let parent = {}
			// 	let children = {}
			// 	const query = uni.createSelectorQuery().in(this);
			// 	query.select('.information-tag').boundingClientRect(data=>{
			// 		console.log(data);
			// 		parent = data
			// 	}).exec()
			// 	const query1 = uni.createSelectorQuery().in(this);
			// 	query1.selectAll('.tag-item').fields({rect:true},data=>{
			// 		console.log(data);
			// 		children = data
			// 	}).exec()
			// 	children.forEach(child => {
			// 	    const isOverflowX = child.right > parent.right;
				
			// 	    if (isOverflowX || isOverflowY) {
			// 	      console.log('Child is overflowing:', child);
			// 	    }
			// 	  });
			// }
		}
	}
</script>

<style lang="scss">
	.list-item {
		background-color: #fff;
		padding: 27rpx 40rpx;
		box-sizing: border-box;
		display: flex;
		border-radius: 15rpx;
		margin-top: 30rpx;

		// & + .list-item {
		// 	margin-top: 30rpx;
		// }
		.flex-center {
			display: flex;
			align-items: center;
		}

		.information {
			height: 100%;
			flex: 1;
			margin-left: 38rpx;
			.information-top {
				height: 43rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.sex-box {
					margin-left: 33rpx;
					padding: 10rpx;
					border-radius: 5rpx;
				}
			}
			.information-tag {
				margin: 28rpx 0;
				display: flex;
				width: calc(100vw - 334rpx);
				align-items: center;
				overflow: hidden;
				.tag-item {
					border-radius: 5rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;
					background-color: #eaeff4;
					padding:0 11rpx;
					height: 43rpx;
					line-height: 43rpx;
					  -webkit-line-clamp: 1;
					  overflow: hidden;
					  display: -webkit-box;
					  text-overflow: ellipsis;
					  -webkit-box-orient: vertical;
					& + .tag-item {
						margin-left: 10rpx;
					}
				}
			}
			.tip-text {
				font-size: 24rpx;
				color: #666666;
			}
			.name {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
		}
	}
</style>
