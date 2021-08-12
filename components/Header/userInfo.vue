<template>
  <div class="header-userinfo-wrapper" @click.stop>
    <div class="content-first-line">
      <div class="content-first-line-item" @click="writing">
        <i class="iconfont icon-pinglun1"></i>写文章
      </div>
      <div class="content-first-line-item">
        <i class="iconfont icon-zixun"></i>草稿箱
      </div>
    </div>
    <div class="content-second-line">
      <div
        @click="toUserPage(currentUserInfo.id)"
        class="content-first-line-item"
      >
        <i class="iconfont icon-wode"></i>我的主页
      </div>
      <div @click="toUserPage(currentUserInfo.id, 'likeArt')" class="content-first-line-item">
        <i class="iconfont icon-dianzan1"></i>我赞过的
      </div>
      <div @click="toUserPage(currentUserInfo.id, 'collection')" class="content-first-line-item">
        <i class="iconfont icon-xingxing"></i>我的收藏
      </div>
    </div>
    <div class="content-third-line">
      <div class="content-first-line-item" @click="logout">
        <i class="iconfont icon-shezhi"></i>退出
      </div>
    </div>
  </div>
</template>

<script>
import { removeLocalStorage } from "@/utils/store";
import { removeCookie } from "@/utils/cookie";
export default {
  computed: {
    currentUserInfo() {
      return this.$store.state.login.userinfo;
    }
  },
  methods: {
    toUserPage(id, type) {
      window.open(`/user/${id}/${type}`);

      this.$store.commit("login/toggleInfoOpen", false);
    },
    writing() {
      window.open("/writing/article", "_blank");
    },
    logout() {
      removeCookie(this, "user_token");
      removeLocalStorage("user_info");

      this.$store.commit("login/toggleInfoOpen", false);

      this.$store.commit("login/toggleOpen", false);

      this.$store.commit("login/clearUserInfo");
    }
  }
};
</script>

<style></style>
