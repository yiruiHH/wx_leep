//index.js
//获取应用实例
const app = getApp()

Page({
  clickMe: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var y = date.getFullYear();
    var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var min = date.getMinutes()<10 ? ('0'+date.getMinutes()) : date.getMinutes();
    var s = date.getSeconds()<10 ? ('0'+date.getSeconds()) : date.getSeconds();
    this.setData({ msg: ("打卡时间：" + y +"年" + m +"月"+ d+"日 " + h + ":" + min + ":" + s)});
    this.committime(date) 
  },
  data: {
    motto: '爱你，顾薇雯！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  committime: function(date){
    wx.cloud.init({
      env: 'gwwsleep-14aa36'
    })
    const db = wx.cloud.database()
    db.collection('sleep_time').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        description: "sleep_time",
        time: new Date(date),
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  history:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  }
})
