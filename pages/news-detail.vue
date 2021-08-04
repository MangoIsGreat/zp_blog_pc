<template>
  <div class="news-detail-page-wrapper">
    <div class="article-wrapper-content">
      <div class="content-innerBox">
        <h1 class="main-title-name">
          三星正在利用版权索赔来警告泄密者
        </h1>
        <div class="news-article-desc">
          <div class="news-article-desc-item">科技热点</div>
          <div class="news-article-desc-item">行业动态</div>
          <div class="news-article-desc-item">18小时前</div>
          <div class="news-article-desc-item">阅读&nbsp;55</div>
        </div>
        <img
          class="theme-pic"
          src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1d2fe1184be4deaae589cc683144613~tplv-k3u1fbpfcp-watermark.image"
          alt=""
        />
        <div class="markdown-body" v-html="mdContent"></div>
      </div>
      <div class="more-article-list">
        <div class="more-article-list-header">
          相关资讯
        </div>
        <ul class="infinite-list list-wrapper" v-infinite-scroll="loadData">
          <li
            v-for="(item, index) in moreList"
            :key="index"
            class="infinite-list-item list-item"
            @click="toNewsPage"
          >
            <div class="item-content">
              <div class="content-left">
                <h3 class="title">手写Vue2系列之初始渲染</h3>
                <div class="bottom-line">
                  <div class="name bottom-line-item">掘金小电台</div>
                  <div class="time bottom-line-item">20小时前</div>
                  <div class="like bottom-line-item">
                    1点赞&nbsp;·&nbsp;0评论
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="article-wrapper-aside">
      <div class="send-news">
        <div class="sen-news-t">
          <div class="send-news-title">资讯投递</div>
          <el-button type="primary" class="send-news-btn" size="mini"
            >立即投递</el-button
          >
        </div>
        <div class="send-news-desc">
          欢迎投递行业动态、软件更新、编程语言相关资讯线索
        </div>
      </div>
      <div class="new-news">
        <div class="more-article-header">最新资讯</div>
        <div class="more-article-content">
          <div
            class="more-article-content-item"
            v-for="(item, index) in hotList"
            :key="index"
          >
            <div class="content-item-title">
              没内鬼，来点干货！SQL优化和诊断
            </div>
            <div class="content-item-line">
              <i class="iconfont icon-dianzan">&nbsp;273</i>
              <i class="iconfont icon-liaotian">&nbsp;27</i>
            </div>
          </div>
        </div>
      </div>
      <div class="hot-news">
        <div class="more-article-header">最热资讯</div>
        <div class="more-article-content">
          <div
            class="more-article-content-item"
            v-for="(item, index) in hotList"
            :key="index"
          >
            <div class="content-item-title">
              没内鬼，来点干货！SQL优化和诊断
            </div>
            <div class="content-item-line">
              <i class="iconfont icon-dianzan">&nbsp;273</i>
              <i class="iconfont icon-liaotian">&nbsp;27</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-left-box">
      <i class="iconfont icon-dianzan"></i>
      <i class="iconfont icon-liaotian"></i>
      <i class="iconfont icon-liaotian"></i>
      <i class="iconfont icon-liaotian"></i>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import { Message } from "element-ui";

export default {
  layout: "default",
  data() {
    return {
      hotList: [], // 热门文章推荐
      moreList: [], // 相关文章推荐
    };
  },
  async asyncData({ query, $axios }) {
    console.log(111, query)
    // 获取文章详情
    const data = await $axios.get("/news/article", {
      params: { id: query.id }
    });

    if (data.error_code !== 0) {
      Message.error("获取文章失败！");
    }

    const mdContent = marked(data.data.content || "");

    // 获取热门文章推荐
    const hotList = await $axios.get("/news/hot", { params: { id: query.id } });

    if (hotList.error_code !== 0) {
      Message.error("获取热门文章推荐失败！");
    }

    // 获取相关文章推荐
    const moreList = await $axios.get("/news/more", {
      params: { id: query.id, pageIndex: 1, pageSize: 10 }
    });

    if (moreList.error_code !== 0) {
      Message.error("获取相关文章推荐失败！");
    }

    return {
      mdContent, // 博客内容
      articleInfo: data.data, // 作者信息
      hotList: hotList.data.rows, // 热门文章推荐
      moreList: moreList.data.rows // 更多相关文章推荐
    };
  },
  methods: {
    loadData() {},
    toNewsPage() {
      window.open("/news-detail", "_blank");
    }
  }
};
</script>

<style></style>
