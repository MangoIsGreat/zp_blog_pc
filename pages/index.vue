<template>
  <div class="home-wrapper">
    <div class="tag-box">
      <div class="tag-innerBox">
        <div class="left-box">
          <div class="tag-item" v-for="(item, index) in tagList" :key="index">
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
            <div class="head-item">热门</div>
            <div class="head-item">最新</div>
          </div>
          <div class="content-body">
            <div class="body">
              
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="inner-box"></div>
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
      tagList: [
        {
          tag_name: "推荐"
        },
        {
          tag_name: "关注"
        },
        {
          tag_name: "后端"
        },
        {
          tag_name: "前端"
        },
        {
          tag_name: "测试"
        }
      ]
    };
  }
};
</script>
