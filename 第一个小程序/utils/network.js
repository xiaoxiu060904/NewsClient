var util = require('./util.js')
var MD5 = require('./md5.js')

function request(url, method, params, success, fail) {
  this.requestLoading(url, method, params, "", success, fail)
}
function requestLoading(url, method, params, message, success, fail) {
  console.log(method)
  console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  } 
  var dict = {
    str: JSON.stringify({
      code: method,
      clienTime: util.formatTime(new Date()),
      singnStr: MD5.hexMD5(params + "HPD"),
      platform: "1",
      isEncrypt: false,
      isCompress: false,
      paramStr: params,
      version: "4.2.0_170",
    }) 
  };
  console.log(MD5.hexMD5(params + "HPD"));
  //var info = util.readUserInfo();
  
  wx.request({
    url: url,
    data: dict,

    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      'Cookie': wx.getStorageSync("sessionid")
      //'token': info.token,
    },
    method: 'POST',
    success: function (res) {
      //console.log(res.data)
      let cookie = wx.getStorageSync("sessionid");
      if (!cookie && (method == 'Unify_User_Login')){
        if (res.header["Set-Cookie"]){
          wx.setStorageSync("sessionid", res.header["Set-Cookie"])
          console.log(res.header["Set-Cookie"])
        } else if (res.header["set-cookie"]){
          wx.setStorageSync("sessionid", res.header["set-cookie"])
          console.log(res.header["set-cookie"])
        }
        
      }
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {

        if (res.data.doStatu == 1) {
            var doObject = JSON.parse(res.data.doObject);
            if (method == 'GetCustCGState'){
              wx.setStorageSync("CustCGInfo", doObject)
            }
            success(doObject)
        }else{
            console.log('1111');
        }
   
        // success(res.data)
        // success(doObject)
      } else {
        fail()
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}
module.exports = {
  request: request,
  requestLoading: requestLoading,
}