# liu-signature适用于uni-app项目的签名板、手写签名、签字组件
### 本组件目前兼容微信小程序、H5
### 本组件是简单好用的签名板、手写签名、签字组件，可设置签名板宽度、签名板高度、签名板背景色、画笔大小、画笔颜色、生成的格式等
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

### 使用示例
``` 
<template>
	<view class="tab-box">
		<liu-signature @change="change"></liu-signature>
		<image class="success-img" :src="url" @click="previewImg(url)"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			};
		},
		methods: {
			change(e) {
				console.log('生成的图片:', e)
				this.url = e
			},
			//预览图片
			previewImg(url) {
				if (!url) return
				let list = [url]
				uni.previewImage({
					urls: list
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tab-box {
		width: 100%;
		height: 100vh;
		background-color: #f0f0f0;

		.success-img {
			width: 100%;
			height: 500rpx;
		}
	}
</style>
```

### 属性说明
| 名称                         | 类型            | 默认值                 | 描述             |
| ----------------------------|--------------- | ---------------------- | ---------------|
| width                       | Number         | 750                    | 签名板宽度(rpx)
| height                      | Number         | 500                    | 签名板高度(rpx)
| bgColor                     | String         | #000000                | 签名板背景色
| lineWidth                   | Number         | 6                      | 画笔大小(rpx)
| lineColor                   | String         | #FFFFFF                | 画笔颜色
| fileType                    | String         | png                    | 生成的图片格式(jpg或png)
| @change                     | Function       |                        | 签名完成回调事件

