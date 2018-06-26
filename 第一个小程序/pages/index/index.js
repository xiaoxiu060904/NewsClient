//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  loadData:function(){
    wx.request({
      url: "https://m.hepandai.com/webservice/API.asmx/InvokeWS", //仅为示例，并非真实的接口地址
      
      dataType: 'STRING',
      data: {
        str: {
          "deviceId": "FD69AC16-7EF9-4A3D-A208-1899C76DF210",
          "clienTime": "2018-03-20 17:40:52",
          "singnStr": "",
          "code": "GetSuspensionButton",
          "platform": "1",
          "isEncrypt": "true",
          "isCompress": "true",
          "paramStr": "",
          "version": "4.0.8_156",
          "clientDataMD5": "FA6DA032329822FCDF4489AE8E3FC52F"
        }
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log("111")
        console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //事件处理函数
  bindViewTap: function(event) {
    console.log(event)
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function(){
    app.globalData.userInfo = "wxopen"
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
