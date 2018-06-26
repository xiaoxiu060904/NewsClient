const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//读取登录信息
const readUserInfo = () => {
  try {
    return wx.getStorageSync('UserInfo');
  } catch (e) {
    return null;
  }
}

function cutZero(old) {
  //拷贝一份 返回去掉零的新串  
  var newstr = old;
  //循环变量 小数部分长度  
  var leng = old.length - old.indexOf(".") - 1
  //判断是否有效数  
  if (old.indexOf(".") > -1) {
    //循环小数部分  
    for ( var i = leng; i > 0; i--) {
      //如果newstr末尾有0  
      if (newstr.lastIndexOf("0") > -1 && newstr.substr(newstr.length - 1, 1) == 0) {
        var k = newstr.lastIndexOf("0");
        //如果小数点后只有一个0 去掉小数点  
        if (newstr.charAt(k - 1) == ".") {
          return newstr.substring(0, k - 1);
        } else {
          //否则 去掉一个0  
          newstr = newstr.substring(0, k);
        }
      } else {
        //如果末尾没有0  
        return newstr;
      }
    }
  }
  return old;
}  

function WXStrTohtml5With(url){
  var html5str = url;
  if (html5str.indexOf('?') > -1) {
    if (html5str.indexOf('source=app') > -1) {
      html5str = html5str + '&platform=1'
    }else{
      html5str = html5str + '&source=app' + '&platform=1'
    }
  }else{
    html5str = html5str + '?' + '&source=app' + '&platform=1'
  }
  if (html5str.indexOf('usercode') > -1) {

  } else {
    html5str = html5str + '&usercode='+ wx.getStorageSync("customer_code")
  }
  html5str = html5str +'&code=170'
  return html5str;
}
module.exports = {
  formatTime: formatTime,
  cutZero: cutZero,
  WXStrTohtml5With: WXStrTohtml5With
}
