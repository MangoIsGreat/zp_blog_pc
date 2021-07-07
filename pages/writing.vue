<template>
  <div class="writing-wrapper">
    <no-ssr>
      <div class="header-wrapper">
        <el-input
          class="tit-input"
          v-model="articleTitle"
          placeholder="输入文章标题..."
        ></el-input>
        <div class="header-wrapper-right">
          <el-button class="draft" size="small">草稿箱</el-button>
          <el-button size="small" type="primary">发布</el-button>
          <el-avatar class="avatar" size="medium" :src="avatarUrl"></el-avatar>
        </div>
      </div>
      <div class="writing-wrapper-body">
        <mavon-editor
          :boxShadow="false"
          @change="input"
          class="writing-wrapper-body-editor"
          :ishljs="true"
          v-model="handbook"
        />
      </div>
    </no-ssr>
  </div>
</template>

<script>
export default {
  layout: "fullpage",
  data() {
    return {
      handbook: "",
      articleTitle: "",
      avatarUrl: ""
    };
  },
  methods: {
    input(value,render) {
      console.log(value);
      console.log("------------------");
      console.log(this.handbook);
      console.log("====####")
      console.log(render)
    }
  }
};
</script>

<style></style>
