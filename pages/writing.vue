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
          <el-button size="small" type="primary" @click="publish"
            >发布</el-button
          >
          <el-avatar class="avatar" size="medium" :src="avatarUrl"></el-avatar>
        </div>
      </div>
      <div class="writing-wrapper-body">
        <mavon-editor
          ref="md"
          @imgAdd="$imgAdd"
          :boxShadow="false"
          @change="input"
          @save="input"
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
      articleTitle: "", // 文章标题
      avatarUrl: "",
      mdValue: "" // mavon-editor输入的内容
    };
  },
  methods: {
    async publish() {
      const params = {
        title: "测试文章",
        content: this.mdValue,
        description: "测试",
        tag: 10002
      };

      const data = await this.$axios.$post("v1/blog/create", params);

      console.log(data);
    },
    input(value, render) {
      this.mdValue = value;
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      axios({
        url: "server url",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        $vm.$img2Url(pos, url);
      });
    }
  }
};
</script>

<style></style>
