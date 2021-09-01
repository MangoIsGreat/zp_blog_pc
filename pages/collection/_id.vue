<template>
  <div class="collection-wrapper" @click="hidden">
    <div class="content">
      <div class="inner-content-box">
        <div class="content-left">
          <div class="content-body">
            <div class="body">
              <div class="content-body-header">
                <input
                  ref="edit"
                  class="content-body-header-tit content-body-header-edit"
                  type="text"
                  v-model="collectionName"
                  v-if="showEdit"
                  @blur="confirmEdit"
                />
                <div class="content-body-header-tit" v-else>
                  {{ infoData && infoData.type }}
                  <i
                    v-if="infoData && infoData.isSelf"
                    @click.stop="editName"
                    class="iconfont icon-edit"
                  ></i>
                </div>
                <div class="content-body-header-info">
                  {{ infoData && infoData.number }}篇&nbsp;·&nbsp;{{
                    infoData && infoData.User && infoData.User.nickname
                  }}
                </div>
              </div>
              <div class="content-body-operate">
                <div class="content-body-operate-back" @click="$router.go(-1)">
                  <i class="iconfont icon-xiangzuo1"></i>
                  <img
                    :src="infoData && infoData.User.avatar"
                    class="content-body-operate-back-avatar"
                  />
                  更多&nbsp;{{
                    infoData && infoData.User && infoData.User.nickname
                  }}&nbsp;的收藏
                </div>
                <div
                  @click="deleteCollection"
                  class="content-body-operate-delete"
                  v-if="listData.length !== 0 && infoData && infoData.isSelf"
                >
                  删除
                </div>
              </div>
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
                  @click="toArticle(item.Blog.id)"
                >
                  <div class="item-info">
                    <div
                      @click.stop="toUserPage(item.Blog.User.id)"
                      class="author-name"
                    >
                      {{ item.Blog && item.Blog.User.nickname }}
                    </div>
                    <div class="time">
                      {{ item.Blog.created_at | relativeTime }}
                    </div>
                    <div class="tag-type">
                      {{ item.Blog && item.Blog.Tag.tagName }}
                    </div>
                  </div>
                  <div class="item-content-t">
                    <div class="content-left-t">
                      <h3 class="title">{{ item.Blog && item.Blog.title }}</h3>
                      <div class="desc">
                        {{ item.Blog && item.Blog.description }}
                      </div>
                      <div class="operate">
                        {{
                          item.Blog && item.Blog.blogReadNum
                        }}阅读&nbsp;·&nbsp;{{
                          item.Blog && item.Blog.blogLikeNum
                        }}点赞&nbsp;·&nbsp;{{
                          item.Blog && item.Blog.commentNum
                        }}评论
                      </div>
                    </div>
                    <div
                      v-if="item.Blog && item.Blog.titlePic"
                      v-lazy:background-image="item.Blog && item.Blog.titlePic"
                      class="content-right"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
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
      collectionName: "", // 编辑框默认的收藏夹名
      pageSize: 15, //页容量
      pageIndex: 1, // 当前页
      countNum: 0, // 总博客条数
      listData: [], // 博客列表
      infoData: null, // 作者&博客信息等
      showEdit: false // 是否编辑
    };
  },
  created() {
    // 获取博客列表数据
    this.getBlogList();
  },
  methods: {
    // 获取博客列表
    async getBlogList() {
      const listData = await this.$axios.get("/collect/blog/list", {
        params: {
          collectionId: this.$route.params.id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      });

      if (listData.error_code === 0) {
        this.listData.push(...listData.data);

        this.countNum = listData.count;

        this.infoData = listData.info;

        // 设置“编辑收藏夹”名弹框默认名字
        this.collectionName = listData.info.type;

        // 隐藏“收藏夹”名编辑框
        this.showEdit = false;

        // 当前页数+1
        this.pageIndex += 1;
      } else {
        Message.error("文章列表获取失败！");
      }
    },
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      this.getBlogList();
    },
    toArticle(id) {
      window.open(`/article/${id}`, "_blank");
    },
    // 跳转至用户页
    toUserPage(id) {
      window.open(`/user/${id}`);
    },
    // 修改收藏夹名
    editName() {
      this.showEdit = true;

      this.$nextTick(() => {
        this.$refs.edit.focus();
      });
    },
    hidden() {
      this.showEdit = false;
    },
    // 确认是否编辑“收藏夹”名
    confirmEdit() {
      if (confirm("您确定要修改收藏夹名？")) {
        this.editCollectionName();
      } else {
        this.showEdit = false;
      }
    },
    // 修改文件夹名
    async editCollectionName() {
      const data = await this.$axios.post("/collect/edit", {
        collectionId: this.$route.params.id,
        name: this.collectionName
      });

      if (data.error_code !== 0) {
        return Message.error("修改失败！");
      }

      // 重新请求数据
      this.getBlogList();
    },
    // 删除收藏夹
    async deleteCollection() {
      if (!confirm("您确定要删除吗？")) {
        return;
      }

      const data = await this.$axios.post("/collect/delete", {
        collectionId: this.$route.params.id
      });

      if (data.error_code !== 0) {
        return Message.error("删除失败！");
      }

      this.$router.go(-1);
    }
  }
};
</script>
