Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '标题',
    barBg: '#f8f8f8',//#ff6600
    color: '#000000'//#ffffff
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  shareEnter(){
    wx.reLaunch({url:'/example/child?title=从分享进入'})
  }
});
