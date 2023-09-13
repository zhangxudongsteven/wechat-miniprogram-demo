// common JS
var index_test_js = require('../common/scripts/index_test.js')
var request_js = require('../common/scripts/request.js')

// page variable 
var hasClick = false;

Page({
  data: {
    title: '「data」变量绑定',
    message: 'WeUI 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。',
    desc: 'desc',
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4]
  },
  onLoad(options) {
    // 页面初次加载的时候，微信客户端就会给Page实例派发onLoad事件，Page构造器参数所定义的onLoad方法会被调用，onLoad在页面没被销毁之前只会触发1次
  
    // 我们只需要实现一个商品详情页的pages/detail/detail.(代表WXML/WXSS/JS/JSON文件)即可，在列表页打开商品详情页时把商品的id传递过来，详情页通过刚刚说的onLoad回调的参数option就可以拿到商品id，从而绘制出对应的商品。
    // - pages/list/list.js
    // 列表页使用navigateTo跳转到详情页
    // wx.navigateTo({ url: 'pages/detail/detail?id=1&other=abc' })

    // - pages/detail/detail.js
    // Page({
    //   onLoad: function(option) {
    //         console.log(option.id)
    //         console.log(option.other)
    //   }
    // })
    console.log("onLoad" + options)

    // 此外需要注意以下3点：
    // 1. 直接修改 Page实例的this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
    // 2. 由于setData是需要两个线程的一些通信消耗，为了提高性能，每次设置的数据不应超过1024kB。
    // 3. 不要把data中的任意一项的value设为undefined，否则可能会有引起一些不可预料的bug。
    this.setData({
      tempText: 'change data'
    }, function(){
      // 在这次setData对界面渲染完毕后触发
    })
  },
  // 更新后的 Page 文档：https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onRouteDone
  onShow() {
    // 页面显示之后，Page构造器参数所定义的onShow方法会被调用，一般从别的页面返回到当前页面时，当前页的onShow方法都会被调用。
    console.log("onShow")
  },
  onReady: function() {
    // 在页面初次渲染完成时，Page构造器参数所定义的onReady方法会被调用，onReady在页面没被销毁前只会触发1次，onReady触发时，表示页面已经准备妥当，在逻辑层就可以和视图层进行交互了。
    console.log("onReady")
  },
  onHide: function() {
    // 页面不可见时，Page构造器参数所定义的onHide方法会被调用，这种情况会在使用wx.navigateTo切换到其他页面、底部tab切换时触发。
    console.log("onHide")
  },
  onUnload() {
    // 当前页面使用wx.redirectTo或wx.navigateBack返回到其他页时，当前页面会被微信客户端销毁回收，此时Page构造器参数所定义的onUnload方法会被调用。
    console.log("onUnload")
  },
  onPullDownRefresh: function() {
    // 监听用户下拉刷新事件，需要在app.json的window选项中或页面配置page.json中设置enablePullDownRefresh为true。当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
    console.log("onPullDownRefresh")
  },
  onReachBottom() {
    // 监听用户上拉触底事件。可以在app.json的window选项中或页面配置page.json中设置触发距离onReachBottomDistance。在触发距离内滑动期间，本事件只会被触发一次。
    console.log("onReachBottom")
  },
  onShareAppMessage: function () {
    // 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮，在用户点击转发按钮的时候会调用，此事件需要return一个Object，包含title和path两个字段，用于自定义转发内容。
    console.log("onShareAppMessage")
    return {
      title: '自定义转发标题',
      path: '/page/d/index?id=123'
    }
  },
  onPageScroll() {
    // 监听用户滑动页面事件，参数为 Object，包含 scrollTop 字段，表示页面在垂直方向已滚动的距离（单位px）。
    console.log("onPageScroll")
  },
  changeTheme() {
    console.log("pages/index/index - loaded")
    console.log(this.data);
    getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
    console.log(this.data);
  },
  switch: function(e) {
    this.setData({
      objectArray: index_test_js.switchArray(this.data.objectArray)
    })
    // 显示Toast
    wx.showToast({
      title: '已乱序',
      icon: 'success',
      duration: 1500
    })
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length
    // 增加一个元素到列表最前
    this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
    // 弹出确认框
    wx.showModal({
      title: '标题',
      content: '告知当前状态，信息和解决方法',
      confirmText: '主操作',
      cancelText: '次要操作',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击主操作')
          wx.showToast({
            title: '主操作',
            icon: 'success',
            duration: 1500
          })
        } else if (res.cancel) {
          console.log('用户点击次要操作')
          wx.showToast({
            title: '次要操作',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },
  addNumberToFront: function(e){
    // 增加一个元素到列表最前
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },
  // 我们采用这样的方式进行描述页面栈：[ pageA, pageB, pageC ]，其中pageA在最底下，pageC在最顶上。
  // 使用 wx.navigateTo({ url: 'pageD' }) 可以往当前页面栈多推入一个 pageD，此时页面栈变成 [ pageA, pageB, pageC, pageD ]。
  // 使用 wx.navigateBack() 可以退出当前页面栈的最顶上页面，此时页面栈变成 [ pageA, pageB, pageC ]。
  // 使用wx.redirectTo({ url: 'pageE' }) 是替换当前页变成pageE，此时页面栈变成 [ pageA, pageB, pageE ]，当页面栈到达10层没法再新增的时候，往往就是使用redirectTo这个API进行页面跳转。
  // 补充一下，wx.navigateTo和wx.redirectTo只能打开非TabBar页面，wx.switchTab只能打开Tabbar页面。
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  async handleRequest(url, method, header, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        header,
        data,
        success: resolve,
        fail: reject,
      });
    });
  },
  // 如果 hasClick 的检查不起作用，那可能是因为 this.hasClick 在 tapRequest 函数中没有被正确地引用。当你在一个对象的方法中使用 this 关键字时，this 通常指向调用该方法的对象。然而，在 JavaScript 中，this 的值可以在运行时改变，取决于函数的调用方式。
  // 例如，如果你是在一个事件处理器中调用 tapRequest 方法，那么 this 可能会指向不同的对象，而不是你期待的对象。为了解决这个问题，你可以在创建对象时将 tapRequest 方法绑定到对象，以确保 this 总是指向正确的对象。
  async tapRequest() {
    if (this.hasClick) {
      console.log("频繁访问")
      return
    } else {
      console.log("正常访问")
      hasClick = true
      wx.showLoading({
        title: '请求中',
      })
    }

    // 休眠1s
    await this.sleep(1000);

    wx.hideLoading()
    
    try {
      const resp = await this.handleRequest(
        'https://mobvoi-middle-feishu-prod.ticwear.com/status',
        'GET',
        { 'content-type':'application/json' },
        {}
      );

      if (resp.statusCode === 200) {
        console.log(resp.data);
        wx.showToast({ 
          title: JSON.stringify(resp.data),
          icon: 'success',
          duration: 1500
        });
      }
    } catch (error) {
      console.log(error);
      wx.showToast({ 
        title: '系统错误',
        icon: 'loading',
        duration: 1500
      });
    } finally {
      this.hasClick = false;
    }
  },
  // 在这个修改后的版本中，我将 tapRequest 方法改为了一个返回异步匿名函数的函数，这样就可以确保 this 在 tapRequest 方法内部总是指向正确的对象。
  tapRequest1: function() {
    return (async () => {
      if (this.hasClick) {
        console.log("频繁访问")
        return;
      } else {
        console.log("正常访问")
        this.hasClick = true;
        wx.showLoading({
          title: '请求中',
        });
      }

      // Sleep for 1s
      await this.sleep(1000);
      wx.hideLoading();

      try {
        const resp = await this.handleRequest(
          'https://mobvoi-middle-feishu-prod.ticwear.com/status',
          'GET',
          { 'content-type':'application/json' },
          {}
        );

        if (resp.statusCode === 200) {
          console.log(resp.data);
          wx.showToast({ 
            title: JSON.stringify(resp.data),
            icon: 'success',
            duration: 1500
          });
        }
      } catch (error) {
        console.log(error);
        wx.showToast({ 
          title: '系统错误',
          icon: 'loading',
          duration: 1500
        });
      } finally {
        this.hasClick = false;
      }
    })();
  }
})