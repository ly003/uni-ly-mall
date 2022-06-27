<script setup lang="ts">
import { onLaunch, onShow, onHide, onPageNotFound } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
// 全局页面不存在时触发
onPageNotFound(() => {
  console.log('App Page Not Found');
});
</script>
<style lang="scss">
// iconfont 项目地址：https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=2685048
@font-face {
  font-family: 'iconfont';
  /* Project id 2685048 */
  src: url('https://at.alicdn.com/t/font_2685048_zf7mwer6mqt.woff2?t=1650351310575') format('woff2'),
    url('https://at.alicdn.com/t/font_2685048_zf7mwer6mqt.woff?t=1650351310575') format('woff'),
    url('https://at.alicdn.com/t/font_2685048_zf7mwer6mqt.ttf?t=1650351310575') format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 36rpx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
