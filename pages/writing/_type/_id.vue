<template>
  <div class="writing-wrapper" @click="cancelShowPanel">
    <no-ssr>
      <div class="header-wrapper">
        <el-input
          class="tit-input"
          v-model="articleTitle"
          placeholder="输入文章标题..."
          :maxlength="30"
        ></el-input>
        <div class="header-wrapper-right">
          <el-button class="draft" size="small">草稿箱</el-button>
          <el-button
            size="small"
            type="primary"
            @click.stop="isShowPanel = true"
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
      <!-- 弹窗 -->
      <PublishPanel
        @publish="publish"
        @cancel="cancelShowPanel"
        v-if="isShowPanel"
        :type="uploadType"
      />
    </no-ssr>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  layout: "fullpage",
  data() {
    return {
      editType: null, // 编辑的内容类型
      uploadType: "", // 上传图片类型
      handbook: "",
      articleTitle: "", // 文章标题
      avatarUrl: "",
      mdValue: "", // mavon-editor输入的内容
      rMdValue: "", // mavon-editor输入的内容解析后
      isShowPanel: false, // 是否展示弹框
      writeContent: "" // 使用正则过滤掉标签之后的文本
    };
  },
  created() {
    if (this.$route.params.type) {
      this.editType = this.$route.params.type;
    } else {
      Message.error("编辑的文章类型是必填参数！");
    }

    // 获取发布文章类型
    this.getPublishType();

    // 编辑博客
    if (this.$route.params.type === "edit") {
      this.getBlogInfo();
    }
  },
  methods: {
    getPublishType() {
      if (["article", "edit"].includes(this.$route.params.type)) {
        this.uploadType = "article";
      } else if (this.$route.params.type === "news") {
        this.uploadType = "news";
      }
    },
    cancelShowPanel() {
      // 关闭弹框
      if (!this.isShowPanel) return;
      this.isShowPanel = false;
    },
    async getBlogInfo() {
      const data = await this.$axios.get("/blog/findBlog", {
        params: { id: this.$route.params.id }
      });

      if (data.error_code !== 0) {
        return Message.error("获取文章失败！");
      }

      this.handbook = data.data.content;
      this.articleTitle = data.data.title;
    },
    async publish(value) {
      let description = value.description; // 文章描述

      if (!this.articleTitle) {
        Message.warning("标题不能为空！");
        return;
      }

      if (!this.mdValue) {
        Message.warning("内容不能为空！");
        return;
      }

      if (!description) {
        description = this.writeContent;
      }

      const params = {
        title: this.articleTitle,
        content: this.mdValue,
        description,
        tag: value.tag,
        titlePic: value.cover_url
      };

      let path = "/blog/create";
      if (this.editType === "news") {
        path = "/news/create";
      }

      const data = await this.$axios.post(path, params);

      if (data.error_code === 0) {
        Message.success("文章发表成功！");

        this.articleTitle = "";
        this.mdValue = "";
        this.handbook = "";

        this.isShowPanel = false;
      } else {
        Message.success("文章发布失败！");
      }
    },
    input(value, render) {
      this.mdValue = value;
      this.rMdValue = render;

      // 过滤解析字符串中的标签
      const reg = /<\/?.+?\/?>/g; // 过滤的正则
      const content = render.replace(reg, ""); // 使用正则替换
      this.writeContent = content.substr(0, 100);
    },
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formData = new FormData();
      formData.append("file", $file);
      formData.append("type", "content");

      const data = await this.$axios.post("/upload", formData, {
        headers: { contentType: false, processData: false }
      });

      if (data.error_code === 0) {
        this.$refs.md.$imglst2Url([[pos, data.url]]);
      } else {
        Message.error("上传失败");
      }
    }
  }
};
</script>

<style></style>
