<template>
  <div class="wrapper" @click="hidden">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
    <div class="to-top">
      <i class="iconfont icon-zhcc_xiangshangjiantou"></i>
    </div>
    <div class="to-comment">
      <i class="iconfont icon-huabanfuben"></i>
    </div>
    <!-- 登录组件 -->
    <login v-if="isLogin" />
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin;
    }
  },
  methods: {
    hidden() {
      // 隐藏用户登录信息浮窗面板
      if (!this.$store.state.login.isShowInfo) return;

      this.$store.commit("login/toggleInfoOpen", false);
    }
  }
};
</script>

<style></style>
