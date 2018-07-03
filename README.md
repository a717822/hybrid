# hybrid
用于Vue或其他模块化混合开发的代码

app 需要引入WebViewJavascriptBridge 第三库。

## 如何使用
# 1、在vue中使用 
``` bash
import hybird from "./hybrid"
Vue.prototype.hybrid = hybrid;
```

# 2、在React中使用
``` bash
import {hybird} from "./hybrid"
React.hybrid = hybrid;
```
