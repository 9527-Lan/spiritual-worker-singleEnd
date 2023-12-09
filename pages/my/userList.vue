<template>
    <view class="container">
      <!-- <u-navbar
        title="推广列表"
        @rightClick="rightClick"
        :autoBack="true"
        leftIconSize="34rpx"
        bgColor="#F2F6FF"
        leftIconColor="#000"
        titleStyle="color: #000;font-size:34rpx"
      >
      </u-navbar> -->
      <view class="addCard" @click="adduser">
				+添加账户
			</view>
      <view class="list-box">
      
        <view class="list-item" v-for="(item, index) in list" :key="index">
          <view class="item-img">
            <u-avatar
              :src="item.headSculptureUrl"
              mode="aspectFit"
              size="108"
            ></u-avatar>
            <view
              style="
                line-height: 54px;
                margin-left: 20px;
                font-weight: bold;
                font-size: 32rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 240rpx;
              "
            >
              {{ item.accountName }}</view
            >
          </view>
          <view
            class="item"
            style="text-align: right; margin-left: 10px; width: 110px"
          >
			<button class="button" @click="updateUser(item)">编辑</button>
			<button class="button" @click="deleteUser(item)">删除</button>
          </view>
        </view>
      </view>
      <view class="bottom"> </view>
	  <uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="warn" cancelText="否" confirmText="是" title="通知" content="是否删除该子账户" @confirm="dialogConfirm"
			></uni-popup-dialog>
	  </uni-popup>
    </view>
  </template>
  
  <script>
  import { itempages,delItem } from "@/api/user.js";
  export default {
    data() {
      return {
        queryYear: "2023",
        queryMouth: "09",
        DateShow: false,
        params: {
          pageNum: 1,
          pageSize: 10,
          id: this.$store.state.user.userInfo.id,
        },
        queryDateShow: false,
        queryTypeShow: false,
        list: [],
		selectUser:{}
      };
    },
    onLoad() {
    },
    methods: {
        adduser(){
            this.$toRoute('/pages/my/adduser')
        },
		updateUser(data){
			this.$toRoute('/pages/my/adduser',data)
		},
		deleteUser(item){
			this.$refs.alertDialog.open()
			this.selectUser = item
		},
		itempages(){
			itempages(this.params).then((res)=>{
				this.list=res.data.list
			})
		},
		dialogConfirm(){
			delItem({id:this.selectUser.id}).then(res=>{
				if (res.code == "00000") {
				    uni.showToast({
				        title: "删除账户成功",
				        duration: 2000,
				        success: (res) => {
							this.itempages()
				            this.$refs.alertDialog.close()
				        },
				    })
				} else {
				    uni.showToast({
				        title: res.msg,
				        icon: 'none'
				    })
				}
			})
		}
    },
    onShow(){
        this.itempages()
    },
    mounted(){
        this.itempages()
    }
  };
  </script>
  
  <style lang="scss">
  page {
    background: #f2f6ff;
  }
  .item{
	display: flex; 
	 justify-content: space-around;
	 align-items: center;
  }
  .button{
	  background-color: #fff;
	  padding: 0 5px;
  	&::after{
  		border: none;
		width: 0;
  	}
  }
  .container {
    margin: 0 auto;
    padding: 0 32rpx;
  }
  
  .query-box {
    display: flex;
    justify-content: space-between;
    margin-top: 100rpx;
  
    .query-item {
      display: flex;
      align-items: center;
    }
    p {
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
      margin-right: 10rpx;
    }
  }
  
  .list-box {
    background: #ffffff;
    width: 100%;
    height: auto;
    margin-top: 36rpx;
    border-radius: 15rpx;
    justify-content: center;
  
    .list-item {
      width: 95%;
      display: flex;
      border-bottom: 2rpx solid #f0f0f0;
      justify-content: space-between;
      padding: 24rpx 36rpx;
      height: 160rpx;
  
      .item-img {
        display: flex;
      }
    }
  }
  .addCard {
	width: 686rpx;
	height: 120rpx;
	background: #FFFFFF;
	border-radius: 15rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #3A84F0;
}
  </style>