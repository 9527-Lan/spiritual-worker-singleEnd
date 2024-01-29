<template>
	<view class="pages-order-confirm">
		<view class="body">
			<view class="title">请确认您的下单信息</view>
			<view class="form">
				<u-form label-width="145rpx" :label-style="{ fontSize: '28rpx', fontWeight: 'bold', color: '#333333' }">
					<u-form-item v-for="(item, index) in formList" :key="index" :label="item.label"
						:required="item.required" border-bottom>
						<view v-if="item.fieldType == 'textarea'" class="input-container">
							<u-textarea v-model="dataForm[item.field]" autoHeight :placeholder="item.value"
								:border="item.border"></u-textarea>
							<view class="click-over"></view>
						</view>
						<view v-else-if="item.fieldType == 'tags'" class="tags">
							<view class="tag-item" v-for="(tagItem, tagIndex) in dataForm[item.field].split(',')" :key="tagIndex">
								{{ tagItem }}</view>
						</view>
						<view v-else-if="item.fieldType == 'text'" class="input-container">
							<u-icon :label="dataForm[item.field]" :label-color="item.color"
								:label-size="item.size"></u-icon>
						</view>
						<view v-else-if="item.fieldType == 'rich'" class="input-container">
							<rich-text style="width: 100%;" :nodes="dataForm[item.field]"></rich-text>
						</view>
						<view v-else class="input-container">
							<u-input v-model="dataForm[item.field]" readonly :type="item.type" :placeholder="item.value"
								:border="item.border"></u-input>
						</view>
					</u-form-item>
				</u-form>
			</view>
		</view>
		<view class="footer">
			<u-button text="编辑" color="#3A84F0" @tap="Detail"></u-button>
			<u-button text="确认下单" color="#3A84F0" @tap="onSave"></u-button>
		</view>
	</view>
</template>

<script>
import {
	surePre
} from '@/api/sub.js'
export default {
	data() {
		return {
			addressPopVisible: false,
			addressForm: {
				address: '',
				doorNumber: '',
			},
			datas: {},
			status: '',
			orderId: '',
			dataForm: {
				1: '大厦安保',
				2: '保安',
				3: ['退伍军人', '1米8以上'],
				4: '长沙市雨花区幸福大厦B座12楼',
				5: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述',
				6: '5 人',
				7: '300.00 元/日',
				8: '2023.09.17 - 2023.09.20',
				9: '￥3,325.00',

			},
			formList: [{
				field: '1',
				label: '用工标题',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '2',
				label: '用工类型',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '3',
				label: '用工标签',
				fieldType: 'tags',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '4',
				label: '用工地址',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '12',
				label: '详细地址',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '5',
				label: '工作内容、用工要求',
				fieldType: 'rich',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '15',
				label: '联系电话',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '6',
				label: '用工数量',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '11',
				label: '报名人数',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '13',
				label: '年龄区间',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '7',
				label: '单人服务费用',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '8',
				label: '用工天数',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '9',
				label: '用工时间',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '14',
				label: '报名截止时间',
				required: false,
				value: '',
				border: 'none'
			},
			{
				field: '10',
				label: '合计金额',
				fieldType: 'text',
				required: false,
				value: '',
				border: 'none',
				size: '48rpx',
				color: '#3A84F0'
			},
			],
		}
	},
	onLoad(options) {
		this.datas = JSON.parse(options.datas)
		console.log(options.status,'status1');
		this.status = options.status
		console.log(this.status,'status');
		
		console.log(options.orderId, '1111111');
		this.orderId = options.orderId;
		this.dataForm['1'] = this.datas.workTitile;
		this.dataForm['2'] = this.datas.workType;
		this.dataForm['3'] = this.datas.workLabel;
		this.dataForm['4'] = this.datas.workAddress;
		this.dataForm['5'] = this.datas.workPlace;
		this.dataForm['6'] = this.datas.workNum;
		this.dataForm['7'] = this.datas.singleMoney;
		this.dataForm['8'] = this.datas.employmentDay;
		this.dataForm['9'] = this.datas.startTime + '-' + this.datas.endTime;
		this.dataForm['10'] = (this.datas.singleMoney * this.datas.workNum * this.datas.employmentDay).toFixed(2);
		this.dataForm['11'] = this.datas.qdQuantity
		this.dataForm['12'] = this.datas.addressItem
		this.dataForm['13'] = this.datas.startAge + '-' + this.datas.endAge + '岁'
		this.dataForm['14'] = this.datas.orderClose
		this.dataForm['15'] = this.datas.phone
		console.log(this.dataForm);

	},
	methods: {
		onSave() {
			surePre({
				order_id: this.orderId,
			}).then(res => {
				if (res.code == '00000') {
					let id = res.data
					uni.showToast({
						title: "下单成功",
						duration: 2000,
						success: (res) => {
							setTimeout(() => {
								if (this.status === '1') {
									this.$toRoute('/pages/order/index?state=grab')
								} else {
									uni.navigateTo({
										url: '/pages/order/addSuccess?id=' + id,
									})
								}

							}, 2000)
						},
					})
				}
			})
		},
		Detail() {
			this.datas.id = this.orderId
			console.log(this.datas, 'datas');
			uni.navigateTo({
				url: '/pages/order/orderDetail?data=' + JSON.stringify(this.datas),
			})
		}
	},
}
</script>

<style lang="scss">
page {
	background-color: #f2f6ff;
}

.pages-order-confirm {
	padding-bottom: 170rpx;

	.tags {
		padding: 15rpx 0;
		display: flex;
		align-items: center;

		.tag-item {
			border-radius: 5rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #333333;
			background-color: #eaeff4;
			padding: 0 11rpx;
			height: 43rpx;
			line-height: 43rpx;

			&+.tag-item {
				margin-left: 10rpx;
			}
		}
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.flex-center-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flex-center {
		display: flex;
		align-items: center;
	}

	.body {
		padding: 53rpx 36rpx 45rpx 36rpx;
		box-sizing: border-box;
		margin: 38rpx 32rpx;
		border-radius: 15rpx;
		background-color: #fff;
		// position: relative;

		.title {
			margin-bottom: 50rpx;
		}

		.input-container {
			padding: 15rpx 0;
			width: 100%;
			height: 100%;
			position: relative;

			.click-over {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 10;
			}
		}

		.number-container {
			width: 100%;
			height: 100%;

			/deep/.u-number-box__input {
				width: 100% !important;
				background-color: #fff !important;
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

		.form {
			width: 100%;
			margin-top: 46rpx;
			margin-bottom: 60rpx;
			height: auto;
		}

		.footer-tip {
			// position: absolute;
			// left: 0;
			// right: 0;
			// bottom: 43rpx;
			text-align: center;
			font-size: 24rpx;
			font-weight: 500;
			color: #999999;
		}
	}

	.footer {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 3;
		background-color: #fff;
		height: 173rpx;
		padding: 0 42rpx;
		padding-top: 19rpx;
	}
}
</style>