# sp-editor

## props参数

```
props: {
	placeholder: {
		type: String,
		default: '写点什么吧 ~'
	},
	// 是否只读
	readOnly: {
		type: Boolean,
		default: false
	},
	// 最大字数限制，-1不限
	maxlength: {
		type: Number,
		default: -1
	},
	// 初始模板
	templates: {
		type: String,
		default: ''
	}
}
```

## 使用方式

```
<template>
  <view class="home">
    <view class="editor-box">
      <sp-editor 
        @init="initEditor"
        @input="inputOver" 
        @upinImage="upinImage" 
        @overMax="overMax">
      </sp-editor>
    </view>
  </view>
</template>

<script setup>
/**
 * 获取输入内容
 * @param {Object} e {html,text} 内容的html文本，和text文本
 */
function inputOver(e) {
  console.log('==== inputOver :', e)
}

/**
 * 超出最大内容限制
 * @param {Object} e {html,text} 内容的html文本，和text文本
 */
function overMax(e) {
  console.log('==== overMax :', e)
}

/**
 * 编辑器就绪
 * @param {Object} editor 编辑器实例，你可以自定义调用editor实例的方法
 * @tutorial editor组件 https://uniapp.dcloud.net.cn/component/editor.html#editor-%E7%BB%84%E4%BB%B6
 * @tutorial 相关api https://uniapp.dcloud.net.cn/api/media/editor-context.html
 */
function initEditor(editor) {
  // 初始化编辑器内容
  editor.setContents({
    html: '<div>猫猫<img src="https://img.yzcdn.cn/vant/cat.jpeg"/>yaho giao</div>'
  })
  setTimeout(() => {
    // 光标默认在第一个，所以默认会在最前面插入内容
    editor.insertText({ text: 'Hello！' })
  }, 1000)
}

/**
 * 直接运行示例工程插入图片无法正常显示的看这里
 * 因为插件默认采用云端存储图片的方式
 * 以$emit('upinImage', tempFiles, this.editorCtx)的方式回调
 * @param {Object} tempFiles
 * @param {Object} editorCtx
 */
function upinImage(tempFiles, editorCtx) {
  /**
   * 本地临时插入图片预览
   * 注意：这里仅是示例本地图片预览，因为需要将图片先上传到云端，再将图片插入到编辑器中
   * 正式开发时，还请将此处注释，并解开下面 使用 uniCloud.uploadFile 上传图片的示例方法 的注释
   * @tutorial https://uniapp.dcloud.net.cn/api/media/editor-context.html#editorcontext-insertimage
   */
  // #ifdef MP-WEIXIN
  // 注意微信小程序的图片路径是在tempFilePath字段中
  editorCtx.insertImage({
    src: tempFiles[0].tempFilePath,
    width: '80%', // 默认不建议铺满宽度100%，预留一点空隙以便用户编辑
    success: function() {}
  })
  // #endif

  // #ifndef MP-WEIXIN
  editorCtx.insertImage({
    src: tempFiles[0].path,
    width: '80%', // 默认不建议铺满宽度100%，预留一点空隙以便用户编辑
    success: function() {}
  })
  // #endif

  /**
   * 使用 uniCloud.uploadFile 上传图片的示例方法（可适用多选上传）
   * 正式开发环境中，请将上面 本地临时插入图片预览 注释后，模仿以下写法
   */
  /* tempFiles.forEach(async (item) => {
  	uni.showLoading({
  		title: '上传中请稍后',
  		mask: true
  	})
  	let upfile = await uniCloud.uploadFile({
  		filePath: item.path,
  		// 同名会导致报错 policy_does_not_allow_file_overwrite
  		// cloudPath可由 想要存储的文件夹/文件名 拼接，若不拼文件夹名则默认存储在cloudstorage文件夹中
  		cloudPath: `cloudstorage/${item.name}`,
  		cloudPathAsRealPath: true
  	})
  	editorCtx.insertImage({
  		src: upfile.fileID,
  		width: '80%', // 默认不建议铺满宽度100%，预留一点空隙以便用户编辑
  		success: function () {
  			uni.hideLoading()
  		}
  	})
  }) */
}
</script>

```

## 注意事项
	1. 该组件在使用过程中推荐在外层套上个父盒子，并给父盒子高度，组件在封装时进行了高度计算，会自动撑满父盒子
	2. 如遇到在内置浏览器中发生无法拖动调节颜色板的问题，只需调出开发者调试面板，点击重置左上角选择dom的箭头后，便能调出模拟器手势光标，便可正常拖动了
  3. 有插入视频的需求，暂时可能无法实现，官方给予的回复是：目前各端的eidtor组件都不能直接插入视频，编辑时可以采用视频封面占位，并在图片中保存视频信息，在预览时再还原为视频。