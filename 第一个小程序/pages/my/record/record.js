var util = require('../../../utils/util.js');
var network = require('../../../utils/network.js')
var Parser = require("../../../utils/xml/dom-parser");
var pageindex = 1;
var code = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnArr: [{name: "全部", code: ""}],
    dataArr:[],
    name:'全部'
  },
  getMainList: function (message) {
    var that = this
    // var data = {
    //   time_type: '0',
    // };
    wx.request({
      url: "https://m.hepandai.com/WebService/WebService.asmx/Get_Transaction_Type",
      data: null,
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
        var arr1 = dict.doObject;
        arr1.splice(0,1, that.data.btnArr[0]);
      
        if (dict.doStatu) {
          that.setData({
            btnArr: arr1,
          });
        }
      },
      fail: function (err) {
        console.log(err)
      }

    })
  },
  getDataList: function (message) {
    var that = this
    var data = {
      pageindex: pageindex,
      code: code,
    };
    wx.request({
      url: "https://m.hepandai.com/WebService/WebService.asmx/Get_Transaction_Log",
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
        var arr1 = that.data.dataArr;
        if (dict.doStatu) {
          that.setData({
            dataArr: arr1.concat(dict.doObject.data_list),
          });
        }
      },
      fail: function (err) {
        console.log(err)
      }

    })
  },
  btnClick:function(event){
    console.log(event.currentTarget.dataset.item);
    var that = this
    code = event.currentTarget.dataset.item.code;
    pageindex = 1;
    that.setData({
      name: event.currentTarget.dataset.item.name,
      dataArr: [],
    });
    that.getDataList('');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getMainList('');
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
    pageindex = 1;
    var that = this
    that.setData({
      dataArr: [],
    });
    that.getDataList('');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pageindex = pageindex + 1;
    var that = this
    that.getDataList('', code);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})