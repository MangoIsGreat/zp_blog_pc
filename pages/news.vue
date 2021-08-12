<template>
  <div class="news-wrapper">
    <div class="news-type-line">
      <div class="news-type-line-box">
        <div
          class="type-item"
          @click="selectTag(item.tag_type)"
          v-for="(item, index) in tagList"
          :key="index"
          :style="{
            color: item.tag_type === selectedTag ? '#00c58e' : '#4e5969'
          }"
        >
          {{ item.tag_name }}
        </div>
      </div>
    </div>
    <div class="news-content-box">
      <div class="list-box">
        <div class="list-box-header">
          <div
            class="list-box-header-item"
            :style="{ color: rankingType === 'new' ? '#00c58e' : '#4e5969' }"
            @click="selectStatus('new')"
          >
            最新
          </div>
          <div
            class="list-box-header-item"
            :style="{ color: rankingType === 'hot' ? '#00c58e' : '#4e5969' }"
            @click="selectStatus('hot')"
          >
            热榜
          </div>
        </div>
        <ul class="infinite-list" v-infinite-scroll="loadData">
          <li
            v-for="(item, index) in listData"
            :key="index"
            class="infinite-list-item"
            @click="toNewsPage(item.id)"
          >
            <div class="list-item-content">
              <h3 class="item-content-title">
                {{ item.title }}
              </h3>
              <div class="item-content-desc">
                {{ item.description }}
              </div>
              <div class="item-content-line">
                <div class="line-author">{{ item.User.nickname }}</div>
                <div class="line-time">
                  {{ item.created_at | relativeTime }}
                </div>
                <div class="like">
                  {{ item.newsLikeNum }}点赞&nbsp;·&nbsp;{{
                    item.newsReadNum
                  }}阅读
                </div>
              </div>
            </div>
            <div
              v-lazy:background-image="item.titlePic"
              v-if="item.titlePic"
              class="list-item-pic"
            ></div>
          </li>
        </ul>
      </div>
      <div class="aside-box">
        <div class="send-news" id="news_send_news">
          <div class="sen-news-t">
            <div class="send-news-title">资讯投递</div>
            <el-button
              @click="publishNews"
              type="primary"
              class="send-news-btn"
              size="mini"
              >立即投递</el-button
            >
          </div>
          <div class="send-news-desc">
            欢迎投递行业动态、软件更新、编程语言相关资讯线索
          </div>
        </div>
        <div class="qr-code-wrapper" id="news_qr_code">
          <div class="qr-code"></div>
          <div class="qr-code-desc">
            <div class="qr-code-desc-title">下载得到客户端</div>
            <div class="qr-code-desc-word">一个旨在分享技术的社区</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      selectedTag: 0, //当前选中的标签
      pageSize: 15, //页容量
      pageIndex: 1, // 当前页
      countNum: 0, // 总"资讯"数量
      listData: [], // 博客列表
      rankingType: "new" // 获取文章的排列顺序，最新/最热
    };
  },
  async asyncData({ $axios }) {
    const data = await $axios.get("/newstype/list");

    if (data.error_code === 0) {
      return {
        tagList: data.data.rows
      };
    } else {
      Message.error("标签类型获取失败");
    }
  },
  created() {
    // 设置默认选中标签类型：
    this.selectedTag = this.tagList[0].tag_type;

    // 获取资讯列表数据
    this.getNewsList();
  },
  methods: {
    // 获取博客列表
    async getNewsList() {
      const listData = await this.$axios.get("/news/list", {
        params: {
          tag: this.selectedTag,
          rankingType: this.rankingType,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      });

      if (listData.error_code === 0) {
        this.listData.push(...listData.data.rows);

        this.countNum = listData.data.count;

        // 当前页数+1
        this.pageIndex += 1;
      } else {
        Message.error("更多文章获取失败！");
      }
    },
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      this.getNewsList();
    },
    toNewsPage(id) {
      window.open(`/news-detail/${id}`, "_blank");
    },
    // 打开投递“资讯”页
    publishNews() {
      window.open("/writing/news", "_blank");
    },
    async selectTag(value) {
      this.selectedTag = value;

      // 重置数据
      this.listData = [];
      this.pageIndex = 1;

      this.getNewsList();
    },
    selectStatus(value) {
      this.rankingType = value;

      // 重置数据
      this.listData = [];
      this.pageIndex = 1;

      this.getNewsList();
    }
  }
};
</script>

<style></style>
