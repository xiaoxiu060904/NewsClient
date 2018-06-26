var util = require('../../utils/util.js');
var network = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      // { "title": "豆豆商城", "text": "豆豆商城", "image": "../../images/find/shopping.svg" },
      { "title": "活动中心", "text": "活动中心", "image": "../../images/find/gift.svg" },
      { "title": "常见问题", "text": "常见问题", "image": "../../images/find/question.svg" },
      // { "title": "社区活动", "text": "社区活动", "image": "../../images/find/community.svg" },
      { "title": "我的足迹", "text": "我的足迹", "image": "../../images/find/my step.svg" },
      { "title": "关于合盘", "text": "关于合盘", "image": "../../images/find/about hp.svg" },
      // { "title": "合盘月报", "text": "合盘月报", "image": "../../images/find/hp report.svg" },
      { "title": "风险测试", "text": "风险测试", "image": "../../images/find/risk test.svg" },
      { "title": "用户调研", "text": "用户调研", "image": "../../images/find/user research .svg" }
    ],
    defaultDict:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("发现")
    var that = this
    that.getMainList('');
  },
  getMainList: function (message) {
    var that = this
    var data = {
      lastID: '0',
    };
    network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetFindRedCount", JSON.stringify(data), message, function (res) {
      console.log(res) 
      that.setData({
        defaultDict: res
      }); 
    }, function (res) {
      console.log('请求失败!')
    })
  },
  onTableClick: function (event) {
    var title = event.currentTarget.dataset.item.title;
    var that = this
    if (title == "我的足迹") {
      that.OpenWXWebView(that.data.defaultDict.myfooturl);
    } else if (title == "活动中心") {
      that.OpenWXWebView("https://weixin.hepandai.com/ad/ActivityCenter?source=app");
    } else if (title == "社区活动") {
      that.OpenWXWebView(that.data.defaultDict.urlDefault);
    } else if (title == "常见问题") {
      that.OpenWXWebView(that.data.defaultDict.urlFAQ);
    } else if (title == "关于合盘") {
      that.OpenWXWebView("https://weixin.hepandai.com/ad/about");
    } else if (title == "合盘月报") {
      that.OpenWXWebView(that.data.defaultDict.urlMonthly_Report);
    } else if (title == "风险测试") {
      that.OpenWXWebView(that.data.defaultDict.urlTest);
    } else if (title == "用户调研") {
      that.OpenWXWebView(that.data.defaultDict.urlSurvey);
    } else if (title == "豆豆商城") {
      that.OpenWXWebView('');
    }
 
  },
  OpenWXWebView: function (url){
    var itemstr = url
    console.log(itemstr)
    itemstr = itemstr.replace('?', '!_')
    itemstr = itemstr.replace('=', '_-')
    if (itemstr.length > 0) {
      wx.navigateTo({ url: '../wxWebView/wxWebView?OpenUrl=' + itemstr })
    }
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