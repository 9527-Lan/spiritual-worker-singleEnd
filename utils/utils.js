export function toChineseBig(num) {
	// 将接收到的num转换为字符串
	var strNum = String(num)
	// 定义单位
	// var unit = ['拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟']
	var unit = ['十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
	// 结果中放一个符号，用来解决最后的零去不掉的问题
	var result = ['@']
	// 单位下标
	var unitNo = 0
	// 从后往前遍历接收到的数据，省略结束条件
	for (let i = strNum.length - 1;; i--) {
		// 调用转大写函数，将每一个数字转换成中文大写，一次放入一个到结果数组中
		result.unshift(numToChinese(strNum[i]))
		// 如果不大于0
		if (i <= 0) {
			// 结束循环
			break
		}
		// 放入一个数字，放入一个单位
		result.unshift(unit[unitNo])
		// 单位下标加1
		unitNo++
	}
	// 将结果数组转换成字符串，并使用正则替换一些关键位置，让结果符合语法
	// return result.join('').replace(/(零[仟佰拾]){1,3}/g, '零').replace(/零{2,}/g, '零').replace(/零([万亿])/g, '$1').replace(/亿万/g, '亿').replace(/零*@/g, '')
	return result.join('').replace(/(零[千百十]){1,3}/g, '零').replace(/零{2,}/g, '零').replace(/零([万亿])/g, '$1').replace(
		/亿万/g, '亿').replace(/零*@/g, '')

	function numToChinese(n) {
		// var chineseBigNum = '零壹贰叁肆伍陆柒捌玖'
		var chineseBigNum = '零一二三四五六七八九'
		return chineseBigNum[n]
	}
}
export function formattedTime (){
	// 获取当前时间
	const currentTime = new Date();
	 
	// 格式化时间为年-月-日 时:分:秒
	const formattedTime = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate();
	 
	return currentTime
}