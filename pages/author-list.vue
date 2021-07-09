<template>
  <div class="author-list-wrapper">
    <header-type :typeData="typeList" />
    <div class="author-list-wrapper-body">
      <div class="list-content">
        <ul class="infinite-list" v-infinite-scroll="loadData">
          <li
            v-for="(item, index) in listData"
            :key="index"
            class="infinite-list-item"
          >
            <div class="item-left">
              <img
                class="avatar"
                src="https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/9c947eb58aadae6e42bc00df6b99bc9b~300x300.image"
                alt=""
              />
              <div class="item-left-info">
                <div class="item-left-info-title">橘猫很方</div>
                <div class="item-left-info-job">前端开发工程师</div>
                <div class="item-left-info-bottomLine">
                  获得599赞&nbsp;·&nbsp;97229阅读
                </div>
              </div>
            </div>
            <el-button class="pay-attention" size="mini">关注</el-button>
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
      typeList: [
        {
          name: "推荐"
        },
        {
          name: "后端"
        },
        {
          name: "前端"
        },
        {
          name: "Android"
        },
        {
          name: "ios"
        },
        {
          name: "人工智能"
        },
        {
          name: "开发工具"
        },
        {
          name: "代码人生"
        },
        {
          name: "阅读"
        }
      ],
      listData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    };
  },
  methods: {
    loadData() {}
  }
};
</script>

<style></style>
