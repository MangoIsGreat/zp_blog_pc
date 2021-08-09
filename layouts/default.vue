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
      throttle(this.listenerScroll, 150, {
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
      const pathname = location.pathname; // 路径名
      const scrollTop = document.documentElement.scrollTop; // 滚动出去的距离

      // 首页
      const author_ranking = document.getElementById("author_ranking");
      const home_poster = document.getElementById("home_poster");
      const home_qr_code = document.getElementById("home_qr_code");

      // 互动页
      const circle_info_great = document.getElementById("circle_info_great");
      const circle_poster = document.getElementById("circle_poster");

      // 资讯页
      const news_send_news = document.getElementById("news_send_news");
      const news_qr_code = document.getElementById("news_qr_code");

      // 博客详情页
      const article_author_info = document.getElementById(
        "article_author_info"
      );
      const article_more_art = document.getElementById("article_more_art");

      // 互动详情页
      const circle_detail_greate = document.getElementById(
        "circle_detail_greate"
      );

      // 资讯详情页
      const news_detail_send_news = document.getElementById(
        "news_detail_send_news"
      );
      const news_detail_new = document.getElementById("news_detail_new");

      // 用户详情页
      const user_aside_userinfo = document.getElementById(
        "user_aside_userinfo"
      );
      const user_aside_attention = document.getElementById(
        "user_aside_attention"
      );
      const user_aside_footer = document.getElementById("user_aside_footer");

      if (scrollTop > 750) {
        document.getElementById("to_top").style.opacity = 1;

        // 首页
        if (pathname === "/") {
          author_ranking.style.position = "fixed";
          author_ranking.style.right = "278px";
          author_ranking.style.top = "85px";

          home_poster.style.position = "fixed";
          home_poster.style.right = "278px";
          home_poster.style.top = "395px";

          home_qr_code.style.position = "fixed";
          home_qr_code.style.right = "278px";
          home_qr_code.style.top = "605px";
        }

        // 互动页
        if (pathname === "/circle") {
          circle_info_great.style.position = "fixed";
          circle_info_great.style.right = "280px";
          circle_info_great.style.top = "85px";

          circle_poster.style.position = "fixed";
          circle_poster.style.right = "280px";
          circle_poster.style.top = "375px";
        }

        // 资讯页
        if (pathname === "/news") {
          news_send_news.style.position = "fixed";
          news_send_news.style.right = "285px";
          news_send_news.style.top = "85px";

          news_qr_code.style.position = "fixed";
          news_qr_code.style.right = "285px";
          news_qr_code.style.top = "203px";
        }

        // 文章页
        if (pathname.indexOf("/article") > -1) {
          article_author_info.style.position = "fixed";
          article_author_info.style.right = "285px";
          article_author_info.style.top = "85px";

          article_more_art.style.position = "fixed";
          article_more_art.style.right = "285px";
          article_more_art.style.top = "290px";
        }

        // 互动详情页
        if (pathname.indexOf("/circle-detail") > -1) {
          circle_detail_greate.style.position = "fixed";
          circle_detail_greate.style.right = "285px";
          circle_detail_greate.style.top = "85px";
        }

        // 资讯详情页
        if (pathname.indexOf("/news-detail") > -1) {
          news_detail_send_news.style.position = "fixed";
          news_detail_send_news.style.right = "275px";
          news_detail_send_news.style.top = "85px";

          news_detail_new.style.position = "fixed";
          news_detail_new.style.right = "275px";
          news_detail_new.style.top = "205px";
        }

        // 用户详情页
        if (pathname.indexOf("/user") > -1) {
          user_aside_userinfo.style.position = "fixed";
          user_aside_userinfo.style.right = "275px";
          user_aside_userinfo.style.top = "85px";

          user_aside_attention.style.position = "fixed";
          user_aside_attention.style.right = "275px";
          user_aside_attention.style.top = "235px";

          user_aside_footer.style.position = "fixed";
          user_aside_footer.style.right = "275px";
          user_aside_footer.style.top = "320px";
        }
      } else {
        document.getElementById("to_top").style.opacity = 0;

        // 首页
        if (pathname === "/") {
          author_ranking.style = null;
          home_poster.style = null;
          home_qr_code.style = null;
        }

        // 互动页
        if (pathname === "/circle") {
          circle_info_great.style = null;
          circle_poster.style = null;
        }

        // 资讯页
        if (pathname === "/news") {
          news_send_news.style.position = null;

          news_qr_code.style.position = null;
        }

        // 文章页
        if (pathname.indexOf("/article") > -1) {
          article_author_info.style.position = null;

          article_more_art.style.position = null;
        }

        // 互动详情页
        if (pathname.indexOf("/circle-detail") > -1) {
          circle_detail_greate.style.position = null;
        }

        // 资讯详情页
        if (pathname.indexOf("/news-detail") > -1) {
          news_detail_send_news.style.position = null;

          news_detail_new.style.position = null;
        }

        // 用户详情页
        if (pathname.indexOf("/user") > -1) {
          user_aside_userinfo.style.position = null;

          user_aside_attention.style.position = null;

          user_aside_footer.style.position = null;
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenerScroll);
  }
};
</script>

<style></style>
