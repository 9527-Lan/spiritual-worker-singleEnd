<template>
	<view class="canvas-main">
		<canvas :style="'width:'+width+'rpx;height:'+height+'rpx;'" class="canvas-item" disable-scroll="true"
			canvas-id="canvasId" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
			@error="error"></canvas>
		<view class="btn-list">
			<view class="reload-container"><u-icon name="reload" color="#333" size="40rpx" @click.stop="reset"></u-icon></view>
			<u-button color="#3A84F0" text="提交" @click.stop="save"></u-button>
			<!-- <view class="btn-reset" @click.stop="reset">重置</view>
			<view class="btn-complete" @click.stop="save">完成</view> -->
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			//签名板宽度(rpx)
			width: {
				type: Number,
				default: 750
			},
			//签名板高度(rpx)
			height: {
				type: Number,
				default: 500
			},
			//签名板背景色
			bgColor: {
				type: String,
				default: '#000000'
			},
			//画笔大小(rpx)
			lineWidth: {
				type: Number,
				default: 6
			},
			//画笔颜色
			lineColor: {
				type: String,
				default: '#FFFFFF'
			},
			//生成的图片格式(jpg或png)
			fileType: {
				type: String,
				default: 'png'
			},
		},
		data() {
			return {
				windowWidth: 0,
				pixelRatio: 0,
				context: null,
				points: [],
				oldPoints: []
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.start()
			})
		},
		methods: {
			start() {
				const systemInfo = uni.getSystemInfoSync()
				this.windowWidth = systemInfo.windowWidth
				this.pixelRatio = systemInfo.pixelRatio
				this.context = uni.createCanvasContext('canvasId', this)
				this.context.fillStyle = this.bgColor
				const width = this.width / 750 * this.windowWidth
				const height = this.height / 750 * this.windowWidth
				const lineWidth = this.lineWidth / 750 * this.windowWidth
				this.context.fillRect(0, 0, width, height)
				this.context.lineWidth = lineWidth
				this.context.strokeStyle = this.lineColor
				this.context.lineCap = 'round'
				this.context.lineJoin = 'round'
				this.context.stroke()
				this.context.draw(true)
			},
			touchstart(e) {
				this.points.push({
					x: e.changedTouches[0].x,
					y: e.changedTouches[0].y
				})
				this.context.beginPath()
			},
			touchmove(e) {
				this.points.push({
					x: e.changedTouches[0].x,
					y: e.changedTouches[0].y
				})
				this.oldPoints = JSON.parse(JSON.stringify(this.points))
				if (this.points.length > 1) {
					this.context.moveTo(this.points[0].x, this.points[0].y)
					this.context.lineTo(this.points[1].x, this.points[1].y)
					this.points.splice(0, 1)
					this.context.stroke()
					this.context.draw(true)
				}
			},
			touchend(e) {
				this.points = []
			},
			reset() {
				this.context = null
				this.points = []
				this.oldPoints = []
				this.start()
			},
			save() {
				if (this.oldPoints.length == 0) {
					uni.showToast({
						title: '请进行签名!',
						icon: 'none'
					})
					return
				}
				let self = this
				uni.canvasToTempFilePath({
					canvasId: 'canvasId',
					fileType: self.fileType,
					quality: 1,
					width: self.width,
					height: self.height,
					destWidth: self.width * self.pixelRatio,
					destHeight: self.height * self.pixelRatio,
					success: (res) => {
						self.$emit('change', res.tempFilePath)
					},
					fail: (err) => {
						console.log('生成图片失败:', err)
					}
				}, self)
			},
			error(e) {
				console.log('错误信息：', e)
			}
		}
	}
</script>
</script>
<style lang="scss" scoped>
	.canvas-main {
		width: 100%;
		height: auto;
		.canvas-item{
			margin: 42rpx 0;
			border-radius: 8rpx;
		}
		.btn-list {
			width: 100%;
			height: 102rpx;
			// background: #FEFFFE;
			// box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			justify-content: space-around;
			.reload-container {
				padding: 0 30rpx;
			}

			.btn-reset {
				width: 320rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 40rpx;
				border: 2rpx solid #E6E6E6;
				font-size: 30rpx;
				color: #3E3E3E;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.btn-complete {
				width: 320rpx;
				height: 76rpx;
				border-radius: 40rpx;
				font-size: 30rpx;
				color: #FFFFFF;
				background-color: #FD430E;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>