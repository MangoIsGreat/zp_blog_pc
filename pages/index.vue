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
