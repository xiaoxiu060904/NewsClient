// pages/my/my.js
var util = require('../../utils/util.js');
var network = require('../../utils/network.js')
var MD5 = require('../../utils/md5.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CenterData: [
      { "title": "下期回款", "text": "下期回款", "image": "../../images/me/payment date.svg" },
      // { "title": "我的投资", "text": "我的投资", "image": "../../images/me/invest.svg" },
      { "title": "交易记录", "text": "交易记录", "image": "../../images/me/trade history.svg" },
      { "title": "理财设置", "text": "理财设置", "image": "../../images/me/set.svg" },
    ],
    BottomData: [
      { "title": "加息券", "text": "加息券", "image": "../../images/me/coupon.svg" },
      { "title": "合盘豆", "text": "合盘豆", "image": "../../images/me/beans.svg" },
      { "title": "红包", "text": "红包", "image": "../../images/me/red packet.svg" },
      { "title": "联系客服", "text": "400-881-8158", "image": "../../images/me/helpphones.svg" },
      // { "title": "意见反馈", "text": "反馈送合盘豆", "image": "../../images/me/chat.svg" },
      { "title": "我要借款", "text": "", "image": "../../images/me/coupon.svg" },
    ],
    MyHPD:{
    },
    netAsset:'',
    balance:'',
    freez_fund:'',
    unGet_InteFund:'',
    eyeStatus:true,
    showStatus: false,
  },
  onTableClick: function (event) {
    var title = event.currentTarget.dataset.item.title;
    var that = this
    if (title == "加息券") {
      wx.navigateTo({ url: '../../pages/my/jxq/jxq' })
      // that.OpenWXWebView('https://weixin.hepandai.com/Account/myrate');
    } else if (title == "合盘豆") {
      wx.navigateTo({ url: '../../pages/my/hpd/hpd' })
      // that.OpenWXWebView('https://weixin.hepandai.com/Account/mybeans');
    } else if (title == "红包") {
      wx.navigateTo({ url: '../../pages/my/red/red' })
      // that.OpenWXWebView('https://weixin.hepandai.com/account/myred');
    } else if (title == "我要借款") {
      that.OpenWXWebView(that.data.MyHPD.borrow_money_url);
    } else if (title == "联系客服") {
       wx.makePhoneCall({
         phoneNumber: '400-881-8158',
       })
    } else if (title == "下期回款") {
      wx.navigateTo({ url: '../../pages/my/nextBack/nextBack' })
      // that.OpenWXWebView('https://weixin.hepandai.com/account/MyPending');
    } else if (title == "交易记录") {
      
      wx.navigateTo({ url: '../../pages/my/record/record' })
      // that.OpenWXWebView('https://weixin.hepandai.com/account/Transaction');
    } else if (title == "理财设置") {
      wx.navigateTo({ url: '../../pages/set/setting'})
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
  onEyeClick: function (event) {
    var that = this
    if (that.data.eyeStatus == true){
      that.setData({
        eyeStatus: false,
        netAsset: '******',
        balance: '******',
        freez_fund: '******',
        unGet_InteFund: '******',
      });
    }else{
      that.setData({
        eyeStatus: true,
        netAsset: that.data.MyHPD.netAsset,
        balance: that.data.MyHPD.balance,
        freez_fund: that.data.MyHPD.freez_fund,
        unGet_InteFund: that.data.MyHPD.unGet_InteFund,
      });
    }
  },
  alertClick:function(event){
    var that = this
    that.setData({
      showStatus: false,
    })
  },
  btnClick: function (event) {
    var that = this
    that.setData({
      showStatus: false,
    })
    that.AccountOpenUrl('','','')
  },
  onTixianClick: function (event) {
    var that = this
    that.OpenWXWebView('https://weixin.hepandai.com/Depository/useraccountdraw');
  },
  onChongzhiClick: function (event) {
    var that = this
    that.OpenWXWebView('https://weixin.hepandai.com/Depository/UsereCharge');
  },
  AccountOpenUrl: function (Cust_Idcard, Real_Name, message) {
    var data = {
      Cust_Idcard: Cust_Idcard,
      Real_Name: Real_Name,
    };
    var that = this
    network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetAccountOpenUrl", JSON.stringify(data), message, function (res) {
      console.log(res)
      if (res.state === 1){
        that.OpenWXNoCodeWeb(res.url);
      }
    }, function (res) {
      console.log('请求失败!')
    })

  },
  OpenWXNoCodeWeb: function (url) {
    var itemstr = url
    console.log(itemstr)
    itemstr = itemstr.replace('?', '!_')
    itemstr = itemstr.replace('=', '_-')
    if (itemstr.length > 0) {
      wx.navigateTo({ url: '../wxWebView/NoCodeWeb?OpenUrl=' + itemstr })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("我的");

  },
  getMainList: function (message) {
    var that = this
    var data = {
      lastID: '0',
    };
    network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetMyHPD", JSON.stringify(data), message, function (res) {
      console.log(res)
      that.setData({
        MyHPD: res,
        netAsset: res.netAsset,
        balance: res.balance,
        freez_fund: res.freez_fund,
        unGet_InteFund: res.unGet_InteFund,
      });
      var bottomarr = that.data.BottomData
      if (res.RateCount){
        bottomarr[0].text = res.RateCount + '张';
      }else{
        bottomarr[0].text = '0张';
      }
      if (res.pea_balance) {
        bottomarr[1].text = res.pea_balance + '豆';
      } else {
        bottomarr[1].text = '0豆';
      }
      if (res.RedEnvelopes) {
        bottomarr[2].text = res.RedEnvelopes + '元';
      } else {
        bottomarr[2].text = '0元';
      }
      that.setData({
        BottomData: bottomarr
      });
    }, function (res) {
      console.log('请求失败!')
    })
      network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetCustCGState", null, message, function (res) {
      console.log(res)
        if (res.card_no.length <= 0){
          that.setData({
            showStatus: true,
          });
        }
      }, function (res) {
        console.log('请求失败!')
      })
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
    var that = this;
    if (wx.getStorageSync("sessionid")){
      that.getMainList('');
    }else{
      wx.navigateTo({ url: '../../pages/login/login' })
    }
    
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