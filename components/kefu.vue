<template>
	<view>
		<u-icon @click.native.stop="callPhone" :labelPos='labelPos' :label='label' :labelSize='labelSize' :labelColor='labelColor' :size='size' :name='name' :class='className'></u-icon>
		<u-modal :show="show" :title="title?title:'拨打客服电话进行咨询'"  :showCancelButton='true' 
			@cancel="del">
			<view class="modalContent">
				<rich-text style="width: 100%;" :nodes="content" class="rText"></rich-text>
			</view>
			<view slot='confirmButton' class="confirmButton">
				<u-button class="meiyige" shape="circle" text="取消" @click="del"></u-button>
				<u-button class="meiyige" shape="meiyige" type="primary" text="确定" @click="closeCard"></u-button>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		tomerService
	} from "@/api/user.js"
	export default{
		data(){
			return {
				show:false,
				content:''
			}
		},
		props:{
			labelPos:'',
			label:'',
			labelSize:'',
			labelColor:'',
			size:'',
			name:'',
			className:'',
			phone:'',
			title:''
		},
		created(){
			if(this.phone){
				this.content = this.phone
			}else{
				tomerService().then((res) => {
					this.content = res.data
				})
			}
			
		},
		methods:{
			closeCard() {
				uni.makePhoneCall({
					phoneNumber: this.content //仅为示例
				});
				this.show = false;
			},
			callPhone(){
				this.show = true
			},
			del() {
				this.show = false;
			},
		}
	}
</script>

<style scoped lang="scss">
	.modalContent{
		padding: 30rpx 0;
		font-size: 32rpx;
		font-weight: bold;
		color: #606266;
	}
	.confirmButton{
		display: flex;
		width: 80%;
		margin: 0 auto;
		justify-content: space-between;
		& .meiyige{
			width: 45%;
		}
	}
</style>