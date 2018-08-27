exports.install = function (Vue, options) {
	// 判断设备类型
	Vue.prototype.phoneType = function() {
		let ua = navigator.userAgent.toLowerCase();
		let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
		let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){	//IOS
			return 1
		}else if (/(Android)/i.test(navigator.userAgent)) {				//Android
			return 2
		}
	}

	// 判断是否为空
	Vue.prototype.isNull = function(str) {
		if(str != null && str != undefined && str != ''){
		  return true;
		}
		return false;
	}


};
