Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '子页面',
    barBg: '#ff6600',
    fixed: true,
    color: '#ffffff',
    touchStartY: 0,//触摸开始的Y坐标
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
  touchstart(e) {
    // this.data.touchStartY = e.changedTouches[0].clientY;
    this.setData({ touchStartY: e.changedTouches[0].clientY });
  },
  touchend(e) {
    // if(this.isRoomLimited){
    // 	return;
    // }
    if ((e.changedTouches[0].clientY - this.data.touchStartY) > 0 && (e.changedTouches[0].clientY - this.data.touchStartY) > 30) {
      this.selectComponent("#navigationBar").toggleShow();
    }
    if ((e.changedTouches[0].clientY - this.data.touchStartY) < 0 && (this.data.touchStartY - e.changedTouches[0].clientY) > 30) {
      this.selectComponent("#navigationBar").toggleHide();
    }
  },
  onPageScroll(e){
    // console.log(Math.abs(e.scrollTop - this.data.touchStartY), this.selectComponent("#navigationBar"));
    // if (e.scrollTop > this.data.touchStartY && Math.abs(e.scrollTop - this.data.touchStartY) > 20){//判断向下滚动20像素距离
    //   this.setData({touchStartY: e.scrollTop});
    //   this.selectComponent("#navigationBar").toggleHide();
    // } else if ((e.scrollTop < this.data.touchStartY && Math.abs(e.scrollTop - this.data.touchStartY) > 20) || e.scrollTop === 0) {//判断向上滚动20像素距离
    //   this.setData({ touchStartY: e.scrollTop });
    //   this.selectComponent("#navigationBar").toggleShow();
    // }

  },
  onShareAppMessage(res){
    return {
      title: '分享标题',
      path: '/exmaple/child?title=来自分享页'
    }
  }
});
