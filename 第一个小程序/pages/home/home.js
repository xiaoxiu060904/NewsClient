var util = require('../../utils/util.js');
var network = require('../../utils/network.js')
var MD5 = require('../../utils/md5.js')  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    NewsList: [],
    ProductList: [],
    Platform:{
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("首页")
    
  },

  getMainList: function (message) {
    var that = this
    network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetHomeBannerList", null, message, function (res) {
      console.log(res)
      if (res.banner0.length > 0) {
        that.setData({
          banners: res.banner0
        });
      }
    }, function (res) {
      console.log('请求失败!')
    }),

      network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetHomeAction", null, message, function (res) {
        console.log(res)
        if (res.NewsList.length > 0) {
          that.setData({
            NewsList: res.NewsList
          });
        }
      }, function (res) {
        console.log('请求失败!')
      }),

      network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetHomeOrderList", null, message, function (res) {
        console.log(res)
        if (res.length > 0) {

          var arr = res;
          for (var i = 0; i < res.length; i++) {

            var instrest = util.cutZero(res[i].Interest + res[i].RewardRate);
            res[i].allinstrest = instrest;
          }
          that.setData({
            ProductList: res
          });
        }
      }, function (res) {
        console.log('请求失败!')
      }),
      network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetHomePlatformData", null, message, function (res) {
        console.log(res)
        that.setData({
          Platform: res
        });
      }, function (res) {
        console.log('请求失败!')
      })
  },
  onBannerItemClick: function (event) {
    console.log(event.currentTarget.dataset.item)
    var itemstr = event.currentTarget.dataset.item.website;
    console.log(itemstr)
    itemstr = itemstr.replace('?','!_')
    itemstr = itemstr.replace('=', '_-')
    // if (event.currentTarget.dataset.item.islogin === 1){
      if (itemstr.length > 0) {
        wx.navigateTo({ url: '../wxWebView/wxWebView?OpenUrl=' + itemstr })
      }
    // } else {
    //   wx.navigateTo({ url: '../../pages/login/login' })
    // }
  },
  onActiveItemClick: function(event) {
    var title = event.currentTarget.dataset.item;
    var that = this
    if (title == "每日签到") {
      that.OpenWXWebView("https://weixin.hepandai.com/Activity/Sign");
    } else if (title == "信息披露") {
      that.OpenWXWebView("https://weixin.hepandai.com/About/Information");
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
  onproductClick: function (event) {
    var that = this
    that.OpenWXWebView('https://weixin.hepandai.com/Products/Details/' + event.currentTarget.dataset.item.product_id);
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
    var that = this
    that.getMainList('')
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