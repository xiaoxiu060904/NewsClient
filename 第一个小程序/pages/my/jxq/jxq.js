var util = require('../../../utils/util.js');
var network = require('../../../utils/network.js')
var Parser = require("../../../utils/xml/dom-parser");
var pageindex = 1;
var IntID = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnArr: [{ name: '未使用', IntID: '0', }, { name: '已失效', IntID: '2', }, { name: '已使用', IntID: '1', }],
    jxqData: [],
    name: '未使用'
  },
  btnClick: function (event) {
    console.log(event.currentTarget.dataset.item);
    var that = this
    IntID = event.currentTarget.dataset.item.IntID;
    pageindex = 1;
    that.setData({
      name: event.currentTarget.dataset.item.name,
      jxqData: [],
    });
    that.getDataList('');
  },
  getDataList:function(message){
    var that = this
    var data = {
      PageIndex: pageindex,
      IntID: IntID,
    };
    network.requestLoading("https://m.hepandai.com/base/InvokeWS", "GetCustJXQList", JSON.stringify(data), message, function (res) {
      console.log(res)
      for (var i = 0; i < res.Items.length; i++) {
        console.log(res.Items[i].amount);
        console.log(parseFloat(res.Items[i].amount) * 100);
        var instrest = (parseFloat(res.Items[i].amount) * 100).toFixed(2);
        var instrest = util.cutZero(instrest);
        res.Items[i].amount = instrest+'%';
      }
      that.setData({
        Products: res.Items
      });

      var arr1 = that.data.jxqData;
      that.setData({
        jxqData: arr1.concat(res.Items),
      }); 
 
    }, function (res) {
      console.log('请求失败!')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getDataList('');
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
    pageindex = 1;
    var that = this
    that.setData({
      jxqData: [],
    });
    that.getDataList('');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})