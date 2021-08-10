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
                <div class="line-time">9小时前</div>
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
        <div class="footer">
          <div class="line-item">
            <a target="_blank" href="#">关于</a> ·
            <a target="_blank" href="https://juejin.cn/">友情链接</a> ·
            <a target="_blank" href="https://juejin.cn/">更多文章</a>
          </div>
          <div class="line-item">
            版权所有: 橘猫很方
          </div>
          <div class="line-item">
            联系地址: 深圳市宝安区西乡街道福中福社区
          </div>
          <div class="line-item">
            联系电话: 15179742801
          </div>
          <div class="line-item">
            联系邮箱: zp_web@126.com
          </div>
          <div class="line-item">
            <a target="_blank" href="#">&copy;2021 得到</a>
          </div>
        </div>
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
      pageIndex: 2, // 当前页
      listData: [], // 博客列表
      rankingType: "new" // 获取文章的排列顺序，最新/最热
    };
  },
  async asyncData({ $axios }) {
    const data = await $axios.get("/newstype/list");

    if (data.error_code === 0) {
      const listData = await $axios.get("/news/list", {
        params: {
          tag: data.data.rows[0].tag_type,
          rankingType: "new",
          pageSize: 15,
          pageIndex: 1
        }
      });

      if (listData.error_code === 0) {
        return {
          tagList: data.data.rows,
          listData: listData.data.rows,
          countNum: listData.data.count
        };
      } else {
        Message.error("数据获取失败");
      }
    } else {
      Message.error("标签类型获取失败");
    }
  },
  created() {
    // 设置默认选中标签类型：
    this.selectedTag = this.tagList[0].tag_type;
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
        listData.data.rows.forEach(item => {
          this.listData.push(item);
        });

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
      window.open("/writing?type=news", "_blank");
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
