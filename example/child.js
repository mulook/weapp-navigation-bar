Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '子页面',
    barBg: '#ff6600',
    fixed: true,
    color: '#ffffff'
  },
  onLoad: function (options) {
    console.log(options);
    var obj = {};
    console.log(obj);
    if(options.title){
      obj.title = options.title
    }
    if(options.nofixed){
      obj.fixed = false
    }
    this.setData(obj);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onShareAppMessage(res){
    return {
      title: '分享标题',
      path: '/exmaple/child?title=来自分享页'
    }
  }
});
