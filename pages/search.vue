<template>
  <div class="search-wrapper">
    <div class="content">
      <div class="inner-content-box">
        <div class="content-left">
          <div class="content-body">
            <div class="body">
              <ul
                class="infinite-list list-wrapper"
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
                    <div class="time">{{ item.created_at | relativeTime }}</div>
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
                        >
                          <i
                            :style="{
                              color: item.isLike ? '#2de938' : '#b2bac2'
                            }"
                            class="iconfont icon-dianzan1"
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
                    <div
                      v-if="item.titlePic"
                      v-lazy:background-image="item.titlePic"
                      class="content-right"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  layout: "default",
  computed: {
    listData() {
      return this.$store.state.search.searchValue;
    }
  },
  methods: {
    // 点赞博客
    async likeBlog(blogId) {
      const copyList = JSON.parse(JSON.stringify(this.listData));

      const data = await this.$axios.post("/blike/like", { blog: blogId });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          copyList.forEach(item => {
            if (item.id === blogId) {
              item.isLike = true;
              item.blogLikeNum++;
            }
          });
        } else if (data.data === "cancel") {
          copyList.forEach(item => {
            if (item.id === blogId) {
              item.isLike = false;
              item.blogLikeNum--;
            }
          });
        }

        this.$store.commit("search/setSearchValue", copyList);
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
      window.open(`/user/${id}`);
    }
  }
};
</script>
