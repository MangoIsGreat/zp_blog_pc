<template>
  <div class="author-list-wrapper">
    <div class="author-list-wrapper-body">
      <div class="list-content">
        <ul class="infinite-list" v-infinite-scroll="loadData">
          <li
            v-for="(item, index) in listData"
            :key="index"
            class="infinite-list-item"
            @click="toUserPage(item.id)"
          >
            <div class="item-left">
              <img class="avatar" :src="item.avatar" alt="" />
              <div class="item-left-info">
                <div class="item-left-info-title">{{ item.nickname }}</div>
                <div class="item-left-info-job">{{ item.profession }}</div>
                <div class="item-left-info-bottomLine">
                  {{ item.blogReadNum }}阅读&nbsp;·&nbsp;获得{{
                    item.blogLikeNum
                  }}赞
                </div>
              </div>
            </div>
            <el-button
              @click.stop="follow(item.id)"
              v-if="!item.isSelf"
              class="pay-attention"
              size="mini"
              ><span v-if="!item.isAttention">关注</span
              ><span class="not-attention" v-else>已关注</span></el-button
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      listData: [],
      pageIndex: 2,
      pageSize: 20
    };
  },
  async asyncData({ $axios }) {
    // 获取"动态"列表数据
    const data = await $axios.get("/author/ranking", {
      params: {
        pageIndex: 1,
        pageSize: 20
      }
    });

    if (data.error_code !== 0) {
      Message.error("数据获取失败");
    }

    return {
      listData: data.data.rows, // 列表数据
      countNum: data.data.count // 总数据长度
    };
  },
  methods: {
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      this.getAuthorList();
    },
    // 获取作者列表数据
    async getAuthorList() {
      const listData = await this.$axios.get("/author/ranking", {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });

      if (listData.error_code === 0) {
        this.listData.push(...listData.data.rows);

        // 当前页数+1
        this.pageIndex += 1;
      } else {
        Message.error("更多文章获取失败！");
      }
    },
    // 关注作者
    async follow(id) {
      const data = await this.$axios.post("/fans/follow", { leader: id });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.listData.forEach(item => {
            if (item.id === id) {
              item.isAttention = true;
            }
          });
        } else if (data.data === "cancel") {
          this.listData.forEach(item => {
            if (item.id === id) {
              item.isAttention = false;
            }
          });
        }
      } else {
        Message.error("关注失败！");
      }
    },
    // 跳转至用户页
    toUserPage(id) {
      window.open(`/user?id=${id}`);
    }
  }
};
</script>

<style></style>
