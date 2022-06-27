### 本项目使用`vue-cli`初始化

```bash
npx degit dcloudio/uni-preset-vue#vite-ts uni-ly-mall
```

### 安装`uni-ui`

```bash
npm i sass -D
npm i sass-loader@10.1.1 -D
npm i @dcloudio/uni-ui
```

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      // uni-ui 规则如下配置
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  },

  // 其他内容
  "pages": [
    // ...
  ]
}
```

### 安装 vuex 4.x

文档地址：https://vuex.vuejs.org/zh/index.html

### 大淘客 API 文档

https://www.dataoke.com/kfpt/open-gz.html?cid=31

### 坑点

```
//无效
import { computed, ref } from 'vue/runtime-core';
//可行
import { computed, ref } from 'vue';
```
