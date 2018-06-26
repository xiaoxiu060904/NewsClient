var util = require('../../utils/util.js');
var network = require('../../utils/network.js')
var MD5 = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    Products:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("产品");
    
  },

  getMainList: function (message) {
    var that = this
    network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetProductBannerList", null, message, function (res) {
      console.log(res)
      if (res.length > 0) {
        that.setData({
          banners: res
        });
      }
    }, function (res) {
      console.log('请求失败!')
    }),
      network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetProductCenterAll", null, message, function (res) {
      console.log(res)
      if (res.Items.length > 0) {
       
        for (var i = 0; i < res.Items.length;i++){
          var arr1 = [];
          var instrest = util.cutZero(res.Items[i].Interest + res.Items[i].RewardRate);

          if (parseInt(res.Items[i].isNewUserProject) === 1) {
            arr1.push('新手专享')
          }
          if (!(parseInt(res.Items[i].can_invest) === 1) && !(parseInt(res.Items[i].Pro) === 100)) {
            arr1.push('预售');
          }
          if (parseInt(res.Items[i].IsTransfer) === 1) {
            arr1.push('可转让')
          }
          res.Items[i].tagArr = ['可转让'];
          res.Items[i].allinstrest = instrest;
        }
        that.setData({
          Products: res.Items
        });
      }
    }, function (res) {
      console.log('请求失败!')
    })
  }, 
  onBannerItemClick: function (event) {
    console.log(event.currentTarget.dataset.item)
    var itemstr = event.currentTarget.dataset.item.website;
    console.log(itemstr)
    itemstr = itemstr.replace('?', '!_')
    itemstr = itemstr.replace('=', '_-')
    // if (event.currentTarget.dataset.item.islogin === 1){
    if (itemstr.length > 0) {
      wx.navigateTo({ url: '../wxWebView/wxWebView?OpenUrl=' + itemstr })
    }
    // } else {
    //   wx.navigateTo({ url: '../../pages/login/login' })
    // }
  },
  onProductClick: function (event) {
    console.log(event.currentTarget.dataset.item);
    var that = this
    that.OpenWXWebView('https://weixin.hepandai.com/Products/Details/' + event.currentTarget.dataset.item.product_id);
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