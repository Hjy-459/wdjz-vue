[comment]: <> (# tmp)

[comment]: <> (## Project setup)

[comment]: <> (```)

[comment]: <> (npm install)

[comment]: <> (```)

[comment]: <> (### Compiles and hot-reloads for development)

[comment]: <> (```)

[comment]: <> (npm run serve)

[comment]: <> (```)

[comment]: <> (### Compiles and minifies for production)

[comment]: <> (```)

[comment]: <> (npm run build)

[comment]: <> (```)

[comment]: <> (### Lints and fixes files)

[comment]: <> (```)

[comment]: <> (npm run lint)

[comment]: <> (```)

[comment]: <> (### Customize configuration)

[comment]: <> (See [Configuration Reference]&#40;https://cli.vuejs.org/config/&#41;.)

#数据库部分
###所有活动-->demo-apply
```angular2html
id 活动名称（分成讲座、活动两种选项） 地点 人数xx/xx 
```
###对应活动的参加人员信息-->demo-applyInfo(主要获取到姓名 用于签名墙)
```angular2html
学工号 姓名 头像 角色
```
###校历DB-->calender(联动云存储)

#云存储
全局变量 校历数据【{}】
然后在数据库页面选择校历替换模块，调用两个组件，上传校历（云存储），后进行修改

#云函数
********
```angular2html

```
<template>
  <el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="top">
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click.native="handleFullScreen"
    />
  </el-tooltip>
</template>

<script>
export default {
  name: "Screenfull",
  props: {
    // 需要全屏展示的div元素id
    full_id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    window.onresize = () => {
      if (!this.checkFull()) {
        this.isFullscreen = false;
      }
    };
    //监听按键事件
    window.addEventListener("keydown", this.KeyDown, true);
  },
  methods: {
    //监听解决F11打开后无法esc退出同时退出全屏的按钮也失效问题。
    KeyDown(event) {
      if (event.keyCode === 122) {
        event.returnValue = false;
        this.handleFullScreen(); //这里是触发全屏的方法
      }
    },
    // 判断是否全屏模式
    checkFull() {
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      let isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        //谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
    // 全屏 退出全屏
    handleFullScreen() {
      let element = document.getElementById(this.full_id);
      // 判断是否已经是全屏
      // 如果是全屏，退出
      if (this.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.isFullscreen = !this.isFullscreen;
    }
  }
};
</script>
