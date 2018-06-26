// pages/set/setting.js
var util = require('../../utils/util.js');
var network = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SettingData: [
      { "title": "修改登录密码" },
      // { "title": "银行卡管理" },
      // { "title": "交易密码" },
      // { "title": "授权免密" }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onTableClick: function (event) {
    var title = event.currentTarget.dataset.item.title;
    var that = this
    if (title == "修改登录密码") {
      that.OpenWXWebView('https://weixin.hepandai.com/account/loginPassword?tourl=');
    } else if (title == "银行卡管理") {
      that.OpenWXWebView('https://weixin.hepandai.com/account/bankcard');
    } else if (title == "交易密码") {

    } else if (title == "授权免密") {

    }
  },
  OpenWXWebView: function (url) {
    var itemstr = url
    console.log(itemstr)
    itemstr = itemstr.replace('?', '!_')
    itemstr = itemstr.replace('=', '_-')
    if (itemstr.length > 0) {
      wx.navigateTo({ url: '../wxWebView/wxWebView?OpenUrl=' + itemstr })
    }
  },
  loginOut: function (event) {
    var that = this
    wx.removeStorageSync('sessionid')
    wx.removeStorageSync('customer_code')
    wx.removeStorageSync('CustCGInfo')
    wx.navigateBack() 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})