//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady: function () {
    console.log("Ready")
    // Do something when page ready.
  },
  onShow: function () {
    console.log(app.globalData.userInfo)
   
    // Do something when page show.
  },
  onHide: function () {
    console.log("Hide")
    // Do something when page hide.
  },
  onUnload: function () {
    console.log("Unload")
    // Do something when page close.
  },
  onPullDownRefresh: function () {
    console.log("PullDownRefresh")
    // Do something when pull down.
  },
  onReachBottom: function () {
    console.log("ReachBottom")
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    console.log("ready")
    // return custom share data when user share.
  },
  onPageScroll: function () {
    console.log("PageScroll")
    // Do something when page scroll
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  }
})
