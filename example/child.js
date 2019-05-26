Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '子页面',
    barBg: '#f8f8f8',//#ff6600
    fixed: true,
    color: '#000000',//#ffffff
    touchStartY: 0,//触摸开始的Y坐标
    toggleBarShow: false,
    backConfirm: false,
    backStyle: 'normal'
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
    if(options.toggleBarShow){
      obj.toggleBarShow = true;
    }
    if (options.backConfirm) {
      obj.backConfirm = true;
    }
    if (options.backStyle) {
      obj.backStyle = options.backStyle;
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
  touchmove(e) {
    if(!this.data.toggleBarShow){
    	return;
    }
    console.log(this.data.touchStartY - e.changedTouches[0].clientY, e.changedTouches[0].clientY);
    if ((e.changedTouches[0].clientY - this.data.touchStartY) > 0 && (e.changedTouches[0].clientY - this.data.touchStartY) > 3) {//向上滚动
      this.selectComponent("#navigationBar").toggleShow();
    }
    if ((e.changedTouches[0].clientY - this.data.touchStartY) < 0 && (this.data.touchStartY - e.changedTouches[0].clientY) > 30) {//向下滚动
      this.selectComponent("#navigationBar").toggleHide();
    }
  },
  onPageScroll(e){
    // console.log(e.scrollTop, e.scrollTop - this.data.touchStartY);
   if (e.scrollTop < 10) {//判断向上滚动顶部
      // this.setData({ touchStartY: e.scrollTop });
      this.selectComponent("#navigationBar").toggleShow();
    }

  },
  onShareAppMessage(res){
    return {
      title: '分享标题',
      path: '/exmaple/child?title=来自分享页'
    }
  }
});
