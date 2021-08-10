<template>
  <div class="home-wrapper">
    <div class="tag-box">
      <div class="tag-innerBox">
        <div class="left-box">
          <div
            :style="{
              color: item.tag_type === selectedTag ? '#00c58e' : '#4e5969'
            }"
            class="tag-item"
            @click="selectTag(item.tag_type)"
            v-for="(item, index) in tagList"
            :key="index"
          >
            {{ item.tag_name }}
          </div>
        </div>
        <div class="btn">标签管理</div>
      </div>
    </div>
    <div class="content">
      <div class="inner-content-box">
        <div class="content-left">
          <div class="head">
            <div
              class="head-item"
              :style="{ color: rankingType === 'hot' ? '#00c58e' : '#4e5969' }"
              @click="selectStatus('hot')"
            >
              热门
            </div>
            <div
              class="head-item"
              :style="{ color: rankingType === 'new' ? '#00c58e' : '#4e5969' }"
              @click="selectStatus('new')"
            >
              最新
            </div>
          </div>
          <div class="content-body">
            <div class="body">
              <ul
                class="infinite-list list-wrapper"
                v-infinite-scroll="loadData"
                :infinite-scroll-delay="500"
                :infinite-scroll-distance="60"
              >
                <li
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
                >
                  <div class="item-info">
                    <div
                      @click.stop="toUserPage(item.User.id)"
                      class="author-name"
                    >
                      {{ item.User.nickname }}
                    </div>
                    <div class="time">一小时前</div>
                    <div class="tag-type">{{ item.Tag.tagName }}</div>
                  </div>
                  <div class="item-content-t">
                    <div class="content-left-t">
                      <h3 class="title">{{ item.title }}</h3>
                      <div class="desc">
                        {{ item.description }}
                      </div>
                      <div class="operate">
                        <div class="operate-item">
                          <i class="iconfont icon-yanjing"
                            >&nbsp;{{ item.blogReadNum }}</i
                          >
                        </div>
                        <div
                          class="operate-item"
                          @click.stop="likeBlog(item.id)"
                          :style="{
                            color: item.isLike ? '#2de938' : '#4e5969'
                          }"
                        >
                          <i class="iconfont icon-dianzan1"
                            >&nbsp;{{ item.blogLikeNum }}</i
                          >
                        </div>
                        <div @click.stop="comment(item.id)">
                          <i class="iconfont icon-pinglun"
                            >&nbsp;{{ item.commentNum }}</i
                          >
                        </div>
                      </div>
                    </div>
                    <div v-lazy:background-image="item.titlePic" class="content-right"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="author-list" id="author_ranking">
            <div class="author-list-item author-list-title">
              <i class="iconfont icon-xunzhang"></i>
              <span>作者榜</span>
            </div>
            <div class="author-list-item author-list-content">
              <div
                class="author-item"
                v-for="(item, index) in authorList"
                :key="index"
                @click="toUserPage(item.id)"
              >
                <img class="avatar" :src="item.avatar" />
                <div class="author-info">
                  <div class="author-name">
                    <span>{{ item.nickname }}</span>
                  </div>
                  <div class="author-desc">{{ item.signature }}</div>
                </div>
              </div>
            </div>
            <div
              @click="getAuthorList"
              class="author-list-item author-list-footer"
            >
              完整榜单 &gt;
            </div>
          </div>
          <div class="home-page-poster" id="home_poster"></div>
          <div class="qr-code-wrapper" id="home_qr_code">
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
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  layout: "default",
  data() {
    return {
      pageSize: 15, //页容量
      pageIndex: 2, // 当前页
      authorList: [],
      selectedTag: 0, //当前选中的标签
      rankingType: "hot", // 获取文章的排列顺序，最新/最热
      listData: [] // 博客列表
    };
  },

  async asyncData({ $axios }) {
    const data = await $axios.get("/tag/list");

    const authorList = await $axios.get("/author/ranking", {
      params: {
        pageIndex: 1,
        pageSize: 3
      }
    });

    if (data.error_code !== 0) {
      Message.error("作者榜数据获取失败");
    }

    if (data.error_code === 0) {
      const listData = await $axios.get("/blog/list", {
        params: {
          tag: data.data.rows[0].tag_type,
          rankingType: "hot",
          pageSize: 15,
          pageIndex: 1
        }
      });

      if (listData.error_code === 0) {
        return {
          tagList: data.data.rows,
          listData: listData.data.rows,
          authorList: authorList.data.rows,
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
    async getBlogList() {
      const listData = await this.$axios.get("/blog/list", {
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
    async selectTag(value) {
      this.selectedTag = value;

      // 重置数据
      this.listData = [];
      this.pageIndex = 1;

      this.getBlogList();
    },
    selectStatus(value) {
      this.rankingType = value;

      // 重置数据
      this.listData = [];
      this.pageIndex = 1;

      this.getBlogList();
    },
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      this.getBlogList();
    },
    // 点赞博客
    async likeBlog(blogId) {
      const data = await this.$axios.post("/blike/like", { blog: blogId });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.listData.forEach(item => {
            if (item.id === blogId) {
              item.isLike = true;
              item.blogLikeNum++;
            }
          });
        } else if (data.data === "cancel") {
          this.listData.forEach(item => {
            if (item.id === blogId) {
              item.isLike = false;
              item.blogLikeNum--;
            }
          });
        }
      } else {
        Message.error("操作失败！");
      }
    },
    toArticle(id) {
      window.open(`/article/${id}`, "_blank");
    },
    comment(id) {
      window.open(`/article/${id}#make_comments`, "_blank");
    },
    getAuthorList() {
      window.open("/author-list", "_blank");
    },
    // 跳转至用户页
    toUserPage(id) {
      window.open(`/user?id=${id}`);
    }
  }
};
</script>
