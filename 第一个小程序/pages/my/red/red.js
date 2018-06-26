var util = require('../../../utils/util.js');
var network = require('../../../utils/network.js')
var Parser = require("../../../utils/xml/dom-parser");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:['到期时间','到期金额'],
    redData: {},
  },
  getMainList: function (message) {
    var that = this
    var data = {
      pageindex: '0',
    };
    wx.request({
      url: "https://m.hepandai.com/WebService/WebService.asmx/MyRedBagM",
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Cookie': wx.getStorageSync("sessionid")
        //'token': info.token,
      },
      success: function (res) {
        console.log(res.data)
        var xmlParser = new Parser.DOMParser();
        var doc = xmlParser.parseFromString(res.data);
        var prepay_id = doc.getElementsByTagName("string")[0].firstChild.nodeValue;//获取节点名字为prepay_id的值
        console.log(prepay_id);
        var dict = JSON.parse(prepay_id);
        if (dict.doStatu) {
          that.setData({
            redData: dict.doObject,
          });
        }
      },
      fail: function (err) {
        console.log(err)
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getMainList('');
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