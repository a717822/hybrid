/**
 * Created by yangzilong on 2017/6/2.
 * 用于混合IOS开发模块调用的方法
 * 1.webView调用JS事件 ;
 * 2.js调用webview事件
 */

/***      IOS  webView调用JS事件         ***/
// eg: this.hybrid.registerHandler('methodName',function (data,responseCallback) {
//          alert('指定接收收到来自原生数据： ' + data);
//          var responseData = '指定接收收到来自原生的数据，回传数据给你';
//          responseCallback(responseData);
// });

/***    js调用IOS webview事件     ***/
// eg: var data = {};
// this.hybrid.callHandler('methodName',data,function(response){
//      console.log(response);  //处理原生过来的回调
// });

var hybrid = {
    init:(callback) => {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    },

    /**
     * webView调用JS事件
     * @param method  方法名
     * @param callback  回调函数
     */
    registerHandler: (method, callback) => {
        var _this = this;
        _this.init(function(bridge) {
            bridge.registerHandler(method, callback);
        })
    },

    /**
     * js调用webview事件
     * @param method  方法名
     * @param data  参数
     * @param callback  回调函数
     */
    callHandler: (method, data, callback) => {
        var _this = this;
        _this.init(function(bridge) {
            bridge.callHandler(method, data, callback);
        })
    },

    /*
     * 智能机浏览器版本信息:
     * 调用该方法前，如有必要请先将您APP的userAgent修改为myapp，或者其他。
     */
    versions: () => {
        var u = navigator.userAgent;
        return {
            //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1,                                  //IE内核
            presto: u.indexOf('Presto') > -1,                                    //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,                              //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,        //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),                        //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                  //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1,                              //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,                                  //是否iPad
            webApp: u.indexOf('Safari') == -1,                           //是否
            qq: u.match(/\sQQ/i) == "qq",                                 //是否QQ
            is_weixin:u.match(/MicroMessenger/i) == "micromessenger",     //判断是不是微信端

            // APP
            myapp:- 1 != u.indexOf("myapp"),                              
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase(),
};

// 模块暴露
export {
    hybrid
}
