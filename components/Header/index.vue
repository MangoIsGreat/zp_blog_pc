<template>
  <div class="header-wrapper">
    <div class="header-wrapper-top">
      <div class="header-wrapper-top-box">
        <div class="left-wrapper">
          <h1 @click="$router.push('/')" class="logo">得到</h1>
          <div
            @click="selectPath = item.route"
            v-for="(item, index) in titleList"
            :key="index"
            class="item"
          >
            <nuxt-link
              :style="{
                color: selectPath === item.route ? '#00c58e' : '#4e5969'
              }"
              class="item-link"
              :to="item.route"
              >{{ item.name }}</nuxt-link
            >
          </div>
        </div>
        <div class="right-wrapper">
          <el-input
            class="item"
            size="small"
            v-model="input"
            suffix-icon="el-icon-search"
            placeholder="探索得到"
          ></el-input>
          <el-button
            class="item"
            @click="openPage('/writing')"
            type="primary"
            size="small"
            >写文章</el-button
          >
          <el-badge :value="3" class="item">
            <i class="el-icon-bell"></i>
          </el-badge>
          <div @click.stop="login">
            <el-avatar
              class="avatar item"
              :src="currentUserInfo ? currentUserInfo.avatar : ''"
            ></el-avatar>
          </div>
          <!-- 用户面板 -->
          <UserInfo v-if="isShowInfo" />
        </div>
      </div>
    </div>
    <div class="header-wrapper-bottom"></div>
  </div>
</template>

<script>
import { getLocalStorage } from "@/utils/store";
import { getCookie } from "@/utils/cookie";
import UserInfo from "./userInfo.vue";

export default {
  components: { UserInfo },
  data() {
    return {
      selectPath: this.$route.path, // 选中的路径
      input: "",
      circleUrl: "",
      titleList: [
        {
          name: "首页",
          route: "/"
        },
        {
          name: "互动",
          route: "/circle"
        },
        {
          name: "资讯",
          route: "/news"
        }
      ]
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin;
    },
    isShowInfo() {
      return this.$store.state.login.isShowInfo;
    },
    currentUserInfo() {
      return this.$store.state.login.userinfo;
    }
  },
  methods: {
    openPage(path) {
      window.open(`${path}/article`, "_blank");
    },
    login() {
      const isLogin =
        getLocalStorage("user_info") && getCookie(this, "user_token")
          ? true
          : false;

      if (!isLogin) {
        return this.$store.commit("login/toggleOpen", true);
      }

      this.$store.commit("login/toggleInfoOpen", true);
    }
  }
};
</script>

<style></style>
