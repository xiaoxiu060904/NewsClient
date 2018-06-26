// pages/login/login.js
var util = require('../../utils/util.js');
var network = require('../../utils/network.js')
var MD5 = require('../../utils/md5.js')  

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Username:'',
    Password:'',
  },
  inputUsername: function (e) {
    this.setData({
      Username: e.detail.value
    });
  },
  inputPassword: function (e) {
    this.setData({
      Password: e.detail.value
    });
  },
  login: function (e) {
    if (this.data.Username.length == 0 || this.data.Password.length == 0) {
      wx.showToast({
        title: '用户名或密码不能为空',
      })
      } else {
      wx.showToast({
        title: '正在登录',
      })
      var data = {
          Login_Name: this.data.Username,
          Login_Pwd: MD5.hexMD5(this.data.Password),
      };
    
      
      console.log(JSON.stringify(data));
      wx.removeStorageSync('sessionid')
      wx.removeStorageSync('customer_code')
      wx.removeStorageSync('CustCGInfo')
      network.request("https://m.hepandai.com/base/InvokeWS", "Unify_User_Login", JSON.stringify(data), function (res) {
        wx.setStorageSync("customer_code", res.customer_code)
        console.log(res.customer_code)
        wx.switchTab({
          url: '../home/home'
        });
        console.log(res)
      }, function (res) {
        console.log('请求失败!')
      })
    }
  },
  //事件处理函数
  bindViewTap: function (event) {
    console.log(event)
    wx.switchTab({
      url: '../home/home'
    });
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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