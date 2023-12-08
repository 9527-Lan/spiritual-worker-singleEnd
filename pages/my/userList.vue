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
        
          </view>
        </view>
      </view>
      <view class="bottom"> </view>
    </view>
  </template>
  
  <script>
  import { itempages } from "@/api/user.js";
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
      };
    },
    onLoad() {
    },
    methods: {
        adduser(){
            this.$toRoute('/pages/my/adduser')
        }
    },
    onShow(){
        itempages(this.params).then((res)=>{
            this.list=res.data.list
        })
    },
    mounted(){
        itempages(this.params).then((res)=>{
            this.list=res.data.list
        })
    }
  };
  </script>
  
  <style lang="scss">
  page {
    background: #f2f6ff;
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