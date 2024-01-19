<template>
	<view class="login-index">
		<view class="body">
			<u-image src="@/static/logo.png" mode="aspectFit" width="108rpx" height="108rpx"></u-image>
			<view class="title">灵活用工服务平台</view>
			<view class="type">企业端</view>
			<u--form labelPosition="left" errorType="toast" :model="form" :rules="rules" ref="uForm">
				<u-form-item label="类型" labelWidth="120rpx" prop="password" ref="item1">
					<u-radio-group v-model="radiovalue1" size="35" labelSize="50" placement="row" @change="groupChange">
						<u-radio 
							:customStyle="{marginLeft: '16rpx',fontSize:'24rpx'}" 
							v-for="(item, index) in radiolist1" 
							:key="index"
							iconSize = '30'
							labelSize='30'
							:label="item.name" 
							:name="item.name" 
							@change="radioChange">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="账号" prop="accountName" labelWidth="120rpx" ref="item1">
					<u--input v-model="form.accountName" customStyle="input-box" border="none"
						placeholder="请输入登录账号"></u--input>
				</u-form-item>
				<u-form-item label="密码" labelWidth="120rpx" prop="password" ref="item1">
					<u--input v-model="form.password" customStyle="input-box" type="password" border="none"
						placeholder="请输入登录密码"></u--input>
				</u-form-item>
			</u--form>
			<!-- 			<view class="radius-input">
				<text class="label">账号</text>
				<u--input customStyle="	input-box" border="none" placeholder="请输入登录账号"></u--input>
			</view>
			<view class="radius-input">
				<text class="label">密码</text>
				<u--input customStyle="	input-box" type="password" border="none" placeholder="请输入登录密码"></u--input>
			</view> -->
			<u-button @click="onLogin" color="#3A84F0" :disabled="logining" :customStyle="{ marginTop: '60rpx' }">登录</u-button>
			<view class="footer-tip">
				<!-- <view class="circle"></view> -->
				<u-radio-group :value="agree" @change="checkboxChange">
					<u-radio name='a' size="28rpx"></u-radio>
				</u-radio-group>
				我已阅读并理解
				<text class="link">《服务协议》</text>
				和
				<text class="link">《隐私协议》</text>
			</view>
			<u-modal :show="cardShow" :showConfirmButton="false" width="622rpx" style="padding-top: 0;">
			
			<view class="rich" style="height: calc(100vh - 300rpx); margin:  auto; overflow: scroll">
				<u-loading-icon v-if="!node" text="加载中" textSize="24"></u-loading-icon>
				<view v-else>
					<rich-text :nodes="node"></rich-text>
				<view style="display: flex;">
					<u-button text="确认"
						style=" font-size: 32rpx;font-family: PingFang SC;margin-top: 15px; font-weight: 500;color: #3A84F0;"
						@click="cardbtn"></u-button>
				</view>
				</view>
				
			</view>
		</u-modal>
		</view>
		
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import {  getAgreement,querybyAccount } from "@/api/user.js"
	export default {
		data() {
			return {
				logining: false,
				cardShow:false,
				node:``,
				isAgree: [{
					nema : 'argree'
				}],
				agree: false,
				form: {
					accountName: "",
					password: ""
				},
				rules: {
					accountName: {
						type: 'string',
						required: true,
						message: '请填写账号',
						trigger: ['blur', 'change']
					},
					password: {
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					}
				},
				// 基本案列数据
				radiolist1: [
					{
						name: '企业',
						disabled: false
					},
					// {
					// 	name: '个人',
					// 	disabled: false
					// }

				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '企业',
			}
		},
		methods: {
			...mapMutations(['firmLogin']),
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
			},
			checkboxChange() {
				this.cardShow=!this.cardShow;
				getAgreement().then((res) => {
				this.carloading=!this.carloading
				this.node = res.data
			})
			},
			cardbtn() {
				this.cardShow = !this.cardShow
				this.loginStatus=true
				console.log(this.agree)
			},
			onLogin() {
				querybyAccount({accountName:this.form.accountName}).then(res=>{
					if(res.data!=0){
						this.agree = 'a'
						this.loginGoGoGo()
					}else{
						if (this.loginStatus) {
							this.loginGoGoGo()
						} else {
							this.$api.msg('请仔细阅读协议后登录');
						}
					}
				})
				
			},
			loginGoGoGo(){
				this.$refs.uForm.validate().then(res => {
					if(this.radiovalue1 === '企业') {
						this.firmLogin()
					} 
					if(this.radiovalue1 === '个人') {
						this.personLogin()
					}
				}).catch(errors => {
					// uni.$u.toast('校验失败')
				})
			},
			firmLogin() {
				this.logining = true;
				let data = this.form
				this.$store.dispatch('user/firmLogin', data).then(res => {
					const pages = getCurrentPages();
					if (pages.length > 1) {
						uni.navigateBack()
					} else {
						// 跳转首页
						uni.switchTab({
							url: '/pages/index/home'
						});
					}
					this.logining = false;
				}).catch((err) => {
					this.logining = false;
				});
			},
			personLogin() {
				this.logining = true;
				let data = this.form
				this.$store.dispatch('user/personLogin',data).then(res=>{
					const pages = getCurrentPages();
					if (pages.length > 1) {
						uni.navigateBack()
					} else {
						// 跳转首页
						uni.switchTab({
							url: '/pages/index/home'
						});
					}
					this.logining = false;
				}).catch((err)=>{
					this.logining=false
				})
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
	}
</script>

<style lang="scss">
	.login-index {
		height: 100vh;
		background-color: #f2f6ff;
		display: flex;
		align-items: center;
		justify-content: center;

		.body {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				margin-top: 40rpx;
				font-size: 52rpx;
				font-weight: 500;
				color: #333333;
			}

			.type {
				font-size: 36rpx;
				margin-top: 42rpx;
				color: #666666;
				margin-bottom: 61px;
			}

			.radius-input {
				display: flex;
				align-items: center;
				border-radius: 44rpx;
				width: 629rpx;
				height: 88rpx;
				margin-bottom: 32rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				background-color: #e8ebf4;

				.label {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					margin-right: 20rpx;
				}
			}

			.footer-tip {
				margin-top: 154rpx;
				font-size: 24rpx;
				color: #666666;
				display: flex;
				align-items: center;

				.circle {}

				.link {
					cursor: pointer;
					color: #3a84f0;
				}
			}
		}

		.input-box {
			background-color: #e8ebf4 !important;
		}
	}

	.popup-container {
		width: 100%;
		height: 100%;
		padding: 72rpx 46rpx;

		.popup-top-box {
			font-size: 28rpx;

			.link {
				color: #1989ff;
			}
		}

		.popup-bottom-box {
			display: flex;
			justify-content: space-between;
			margin-top: 50rpx;

			.popup-button {
				width: 251rpx;
				height: 72rpx;
				border-radius: 10rpx;
			}
		}
	}
	::v-deep .u-radio__text{
		span{
			font-size: 24rpx;
		}
	}
</style>