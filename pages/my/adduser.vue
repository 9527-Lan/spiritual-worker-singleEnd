<template>
    <view class="pages-order-add">
        <view class="body">
            <view class="title">请输入账户信息</view>
            <view class="form">
                <u-form label-width="145rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }"
                   >
                    <u-form-item label="账号" prop="userInfo.name" borderBottom ref="item1" required>
                        <u--input v-model="dataForm.accountName" border="none" placeholder="请输入账号名称"
                            ></u--input>
                    </u-form-item>
                    <u-form-item label="密码" prop="userInfo.workType" borderBottom ref="item1"
                        required>
                        <u--input v-model="dataForm.password" border="none" type="password" placeholder="请输入密码"
                            @change='getpassword'></u--input>
                    </u-form-item>
					<u-form-item label="确认密码" prop="userInfo.workType" borderBottom ref="item1"
					    required>
					    <u--input v-model="dataForm.confirmPassword" border="none" type="password" placeholder="请输入密码"
					        @change='getpassword'></u--input>
					</u-form-item>
                </u-form>
            </view>
            <view class="footer-tip">平台承诺，严格保障您的隐私安全</view>
        </view>
        <view class="footer">
            <u-button text="保存" color="#3A84F0" @click="onBack"></u-button>
        </view>
    </view>
</template>

<script>

import {addItem,updateItem} from "@/api/user.js"
export default {
    data() {
        return {
            value4:false,
            dataForm: {
                accountName: '',
                password: '',
                isMain:false,
				confirmPassword:''
            },
        }
    },
    created() {
		console.log(this.$route)
		if(this.$route.query){
			this.$route.query.isMain = this.$route.query.isMain == 1 ? true :false
			this.dataForm = this.$route.query
		}
		this.$route.query? this.dataForm = this.$route.query :null
		this.dataForm.password = ''
    },
    methods: {
        addressConfirm() {

            let addressForm = this.addressForm
            this.dataForm.workAddress = addressForm.name
            this.dataForm.addressItem = addressForm.address
            this.dataForm.longitude = addressForm.longitude
            this.dataForm.latitude = addressForm.latitude
            this.addressPopVisible = false
        },
        onBack() {
            if (this.dataForm.workTitile == '') {
                uni.showToast({
                    title: '请输入用工标题',
                    icon: 'none'
                })
                return;
            }
            if (this.dataForm.workTypeId == '') {
                uni.showToast({
                    title: '请选择用工类型',
                    icon: 'none'
                })
                return;
            }
			if (this.dataForm.confirmPassword != this.dataForm.password) {
				uni.showToast({
				    title: '密码和确认密码框不一致',
				    icon: 'none'
				})
				return;
			}
            this.dataForm.entrepreneurId=this.$store.state.user.userInfo.id
			let dataFormCopy = JSON.parse(JSON.stringify(this.dataForm))
            dataFormCopy.isMain= this.dataForm.isMain?'1':'0'
			if(this.dataForm.id){
				updateItem(dataFormCopy).then(res=>{
					if (res.code == "00000") {
					    uni.showToast({
					        title: "编辑账户成功",
					        duration: 2000,
					        success: (res) => {
					            setTimeout(() => {
					                uni.navigateTo({
					                  url:'/pages/my/userList'
					                })
					            }, 2000)
					        },
					    })
					} else {
					    uni.showToast({
					        title: res.msg,
					        icon: 'none'
					    })
					}
				})
			}else{
				addItem(dataFormCopy).then(res => {
				    if (res.code == "00000") {
				        uni.showToast({
				            title: "新增账户成功",
				            duration: 2000,
				            success: (res) => {
				                setTimeout(() => {
				                    uni.navigateTo({
				                      
				                    })
				                }, 2000)
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
        accountName(e){
            console.log(e);
        },
        getisMain(e){
         this.dataForm.isMain=e
        },
        getpassword(e){
        }
    },
}
</script>

<style lang="scss">
page {
    background-color: #f2f6ff;
}

.pages-order-add {
    padding-bottom: 173rpx;
    ;

    .address-form {
        height: 630rpx;
        padding: 42rpx 32rpx;
        box-sizing: border-box;
        position: relative;

        .flex-center-between {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        /deep/.u-form-item {
            margin-top: 50rpx;
        }

        .address-btn {
            margin: 50rpx 0;
        }

        .form-footer {
            position: absolute;
            border-top: 1rpx solid #c0c0c0;
            z-index: 3;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 20rpx 42rpx;
            padding-bottom: 60rpx;
            box-sizing: border-box;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn-box {
                height: 89rpx;
                width: 521rpx;

                .u-button {
                    height: 100%;
                }
            }
        }
    }

    .body {
        padding: 53rpx 36rpx 45rpx 36rpx;
        box-sizing: border-box;
        margin: 38rpx 32rpx;
        border-radius: 15rpx;
        background-color: #fff;
        height: auto;
        position: relative;

        .number-container {
            width: 100%;
            height: 100%;

            /deep/.u-number-box {
                width: 100% !important;
            }
        }

        .authenticate {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 15rpx;
            box-sizing: border-box;
            background-color: #fef8f8;
            padding: 28rpx 25rpx;

            &+.authenticate {
                margin-top: 24rpx;
            }

            .authenticate-left {
                display: flex;
                align-items: center;
                font-size: 28rpx;

                .label {
                    margin-left: 24rpx;
                    font-size: 28rpx;
                    font-weight: bold;
                    color: #f37878;
                }
            }

            .authenticate-right {
                height: 55rpx;
            }
        }

        .title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333333;
            margin-bottom: 50rpx;
        }

        .form {
            width: 100%;
            margin-top: 46rpx;
            margin-bottom: 60rpx;
        }

        .footer-tip {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 43rpx;
            text-align: center;
            font-size: 24rpx;
            font-weight: 500;
            color: #999999;
        }
    }

    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        background-color: #fff;
        height: 173rpx;
        padding: 19rpx 42rpx;
    }

    ::v-deep .u-textarea--disabled {
        background-color: #ffffff;
    }
}</style>