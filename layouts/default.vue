<template>
  <div class="wrapper" @click="hidden">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <nuxt id="main" />
      </el-main>
    </el-container>
    <div id="to_top" class="to-top" @click="toTop">
      <i class="iconfont icon-toTop"></i>
    </div>
    <div class="to-comment" @click="toComment">
      <i class="iconfont icon-pinglun"></i>
    </div>
    <!-- 登录组件 -->
    <login v-if="isLogin" />
  </div>
</template>

<script>
import throttle from "lodash/throttle";

export default {
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin;
    }
  },
  mounted() {
    // 监听scroll事件
    window.addEventListener(
      "scroll",
      throttle(this.listenerScroll, 200, {
        leading: true,
        trailing: false
      })
    );
  },
  methods: {
    hidden() {
      // 隐藏用户登录信息浮窗面板
      if (!this.$store.state.login.isShowInfo) return;

      this.$store.commit("login/toggleInfoOpen", false);
    },
    toTop() {
      document.documentElement.scrollTop = 0;
    },
    toComment() {
      window.open("/circle", "_blank");
    },
    // 监听scroll事件
    listenerScroll() {
      const scrollTop = document.documentElement.scrollTop;

      console.log(888, scrollTop);

      if (scrollTop > 800) {
        return (document.getElementById("to_top").style.opacity = 1);
      }

      document.getElementById("to_top").style.opacity = 0;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenerScroll);
  }
};
</script>

<style></style>
