<template>
  <div class="publish-panel-wrapper" @click.stop>
    <div class="publish-panel-wrapper-header">发布文章</div>
    <div class="publish-panel-wrapper-body">
      <div class="panel-wrapper-body-item tags-type">
        <div class="panel-wrapper-body-item-left">
          <span class="body-item-left-required">*</span>&nbsp;分类：
        </div>
        <div class="panel-wrapper-body-item-right">
          <div
            @click="selectTag(item.tag_type)"
            class="body-item-right-tag"
            v-for="(item, index) in tagList"
            :style="{
              backgroundColor:
                item.tag_type === selectedTagType ? '#e6f9f4' : '#f4f5f5',
              color: item.tag_type === selectedTagType ? '#00c58e' : '#86909c'
            }"
            :key="index"
          >
            {{ item.tag_name }}
          </div>
        </div>
      </div>
      <div class="panel-wrapper-body-item article-covers">
        <div class="panel-wrapper-body-item-left">
          文章封面：
        </div>
        <div class="panel-wrapper-body-item-right">
          <el-upload
            :data="{ type: uploadType }"
            :action="uploadURL"
            list-type="picture-card"
            :auto-upload="true"
            :limit="1"
            :headers="{ Authorization: token }"
            :on-exceed="limit"
            :on-success="uploadSuccess"
            :on-error="uploadError"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
      </div>
      <div class="panel-wrapper-body-item edit-the">
        <div class="panel-wrapper-body-item-left">
          编辑摘要：
        </div>
        <div class="panel-wrapper-body-item-right">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="输入摘要..."
            v-model="textarea"
            show-word-limit
            maxlength="100"
            resize="none"
          >
          </el-input>
        </div>
      </div>
    </div>
    <div class="publish-panel-wrapper-footer">
      <el-button size="mini" type="primary" @click="cancel" plain
        >取消</el-button
      >
      <el-button
        size="mini"
        @click="publish"
        class="footer-publish"
        type="primary"
        >确定发布</el-button
      >
    </div>
  </div>
</template>

<script>
import dev from "@/env";
import { getCookie } from "@/utils/cookie";
import { encode } from "@/utils/encode";
import { Message } from "element-ui";

export default {
  props: ["type"],
  data() {
    return {
      editType: null, // 编辑的内容类型
      uploadType: "", // 上传图片类型
      tagList: [], // 分类标签
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      textarea: "",
      selectedTagType: -1, // 当前选中的标签类型
      uploadURL: dev[process.env.NODE_ENV].ENV_API + "/upload", // 图片上传地址
      token: "", // token
      picURL: "" // 封面图片地址
    };
  },
  created() {
    // 获取标签类型
    this.getTagList();

    // 获取token
    this.getToken();

    // 设置上传文件类型
    this.setUploadType();
  },
  methods: {
    setUploadType() {
      if (this.type === "article") {
        this.uploadType = "article";
      } else if (this.type === "news") {
        this.uploadType = "news";
      }
    },
    publish() {
      if (this.selectedTagType < 0) {
        Message.warning("必须选择一个文章标签类型！");
        return;
      }

      const data = {
        tag: this.selectedTagType,
        description: this.textarea,
        cover_url: this.picURL
      };

      this.$emit("publish", data);
    },
    cancel() {
      this.$emit("cancel");
    },
    selectTag(value) {
      this.selectedTagType = value;
    },
    getToken() {
      const token = getCookie(this, "user_token");
      // 将获取到token加入到请求头中
      if (!token) return;
      this.token = encode(token);
    },
    async getTagList() {
      let path = "/tag/list";
      if (this.type === "news") {
        path = "/newstype/list";
      }

      const data = await this.$axios.get(path);

      if (data.error_code === 0) {
        this.tagList = data.data.rows;
      }
    },
    limit() {
      Message.warning("只允许上传一张图片作为封面！");
    },
    uploadSuccess(response, file, fileList) {
      this.picURL = response.url;
    },
    uploadError(err, file, fileList) {
      Message.error("文件上传失败");
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      console.log(file);
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>

<style></style>
