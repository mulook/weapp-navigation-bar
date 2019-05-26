Component({
  properties: {
    // 这里定义属性，属性值可以在组件使用时指定
    back: {//是否显示返回
      type: Boolean,
      value: false,
    },
    background: {//导航栏背景色
      type: String,
      value: '#ffffff',//默认
      observer: function(newVal,oldVal,changedPath){
        if(!newVal){
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    placeholderBg: {//导航栏占位栏背景色
      type: String,
      value: 'transparent',//默认
      observer: function(newVal,oldVal,changedPath){
        if(!newVal){
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    color: {//导航栏字体色
      type: String,
      value: '#000000',//默认
      observer: function(newVal,oldVal,changedPath){
        if(!newVal){
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    fontSize: {//导航栏字大小
      type: String,
      value: '16px',//默认
      observer: function(newVal,oldVal,changedPath){
        if(!newVal){
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    title: {//导航栏标题
      type: String,
      value: 'none', //默认
      observer: function(newVal,oldVal,changedPath){
        // console.log(newVal,oldVal,changedPath);
        if(!newVal){
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    fixed: {//导航栏是否fixed定位
      type: Boolean,
      value: true, //默认
      observer: function(newVal,oldVal,changedPath){
        // console.log(newVal,oldVal,changedPath);
        if(newVal !== false && newVal !== true){
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    backStyle: {//导航栏返回按钮的风格
      type: String,
      value: 'normal', //默认值 可赋值simple或者normal
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal,oldVal,changedPath);
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    backConfirm: {//返回是否需要确认
      type: Boolean,
      value: false, //默认
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal,oldVal,changedPath);
        if (newVal !== false && newVal !== true) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    backConfirmTitle: {//提示弹窗的标题
      type: String,
      value: '提示', //默认值
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal,oldVal,changedPath);
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    backConfirmContent: {//提示弹窗的内容
      type: String,
      value: '确定要退出当前页面吗？', //默认值
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal,oldVal,changedPath);
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
  },
  data: {
    // 这里是一些组件内部数据
    height: 44,//导航栏高度,
    paddingTop: 20,//导航栏上内边距对应状态栏高度
    showHomeButton: false,//是否显示返回首页
    show: true,//是否显示导航栏
    navigationBarTextStyle: 'black'
  },
  attached: function(option){
    //检测首页是否在当前页面栈中
    let pages = getCurrentPages();
    let showHomeButton = false;
    if(pages.length < 2 && pages[0].route != __wxConfig.pages[0]){
      showHomeButton = true;
    }
    //导航栏自适应
    let systemInfo = wx.getSystemInfoSync();
    let reg = /ios/i;
    let pt = 20;//导航状态栏上内边距
    let h = 44;//导航状态栏高度
    if(reg.test(systemInfo.system)){
        pt = systemInfo.statusBarHeight;
        h = 44;
    }else{
        pt = systemInfo.statusBarHeight;
        h = 48;
    }
    var navigationBarTextStyle = __wxConfig.global.window.navigationBarTextStyle;//获取当前项目导航栏文本风格
    this.setData({
      height: h,
      paddingTop: pt,
      showHomeButton: showHomeButton,
      navigationBarTextStyle: navigationBarTextStyle
    })
    console.log(this);
  },
  methods: {
    // 这里是一个自定义方法
    /**
     * 返回上一页
     */
    navigateBack(){
      let self = this;
      if (!self.properties.backConfirm){
        self.runBack();
        return;
      }
      wx.showModal({
        title: self.properties.backConfirmTitle,
        content: self.properties.backConfirmContent,
        success(res) {
          res.confirm && self.runBack()
        }
      })
    },
    runBack(){
      let pages = getCurrentPages();
      if (pages.length < 2 && pages[0].route != __wxConfig.pages[0]) {
        wx.reLaunch({ url: '/' + __wxConfig.pages[0] })
      } else {
        wx.navigateBack({ delta: 1 });
      }
    },
    /**
     * 返回首页
     */
    navigateBackHome(){
      let self = this;
      if (!self.properties.backConfirm) {
        self.runBackHome();
        return;
      }
      wx.showModal({
        title: self.properties.backConfirmTitle,
        content: self.properties.backConfirmContent,
        success(res) {
          res.confirm && self.runBackHome()
        }
      })
    },
    runBackHome() {
      let pages = getCurrentPages();
      if (pages[0].route === __wxConfig.pages[0]) {
        wx.navigateBack({ delta: 10 });
      } else {
        wx.reLaunch({ url: '/' + __wxConfig.pages[0] })
      }
    },
    /**
     * 切换导航栏显示
      */
    toggleShow(){
      if(!this.data.show){
        this.setData({ show: true });
      }
    },
    /**
     * 切换导航栏隐藏
      */
    toggleHide() {
      if (this.data.show) {
        this.setData({ show: false });
      }
    }
  }
})