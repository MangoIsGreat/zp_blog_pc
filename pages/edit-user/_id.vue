<template>
  <div class="edit-user-wrapper">
    <div class="edit-user-wrapper-back">
      <div class="edit-user-wrapper-back-icon" @click="$router.go(-1)">
        <i class="iconfont icon-xiangzuo"></i>&nbsp;返回个人主页
      </div>
      <div></div>
    </div>
    <div class="edit-user-wrapper-content">
      <div class="edit-user-wrapper-content-tit">个人资料</div>
      <div class="edit-user-wrapper-content-body">
        <el-form
          class="edit-user-wrapper-content-body-form"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="用户名">
            <el-input
              v-model="form.nickname"
              maxlength="20"
              show-word-limit
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input
              v-model="form.profession"
              maxlength="50"
              show-word-limit
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input
              type="textarea"
              v-model="form.signature"
              maxlength="100"
              show-word-limit
              rows="4"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit"
              >保存修改</el-button
            >
          </el-form-item>
        </el-form>
        <label
          class="upload-avatar"
          for="id_avatar"
          @mouseenter="showAvatar = true"
          @mouseleave="showAvatar = false"
        >
          <img :src="avatar" alt="头像加载失败" />
          <div v-if="showAvatar" class="masking">
            <i class="iconfont icon-22"></i>
            <div>更换头像</div>
          </div>
          <div class="avatar_name">我的头像</div>
          <div class="avatar_desc">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </div>
        </label>
        <input
          accept="image/jpeg,image/png,image/jpg"
          type="file"
          id="id_avatar"
          name="file"
          style="display:none"
          ref="avatar"
          @change="uploadAvatar"
        />
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
      form: {
        nickname: "", // 昵称
        profession: "", // 职业
        signature: "" // 签名
      },
      avatar: "", // 头像
      showAvatar: false // 是否展示头像蒙版
    };
  },
  async asyncData({ $axios, params }) {
    const data = await $axios.get("/author/userinfo", {
      params: { uid: params.id }
    });

    if (data.error_code === 0) {
      return {
        form: {
          nickname: data.data.nickname,
          profession: data.data.profession,
          signature: data.data.signature
        },
        avatar: data.data.avatar
      };
    } else {
      Message.error("用户信息获取失败");
    }
  },
  methods: {
    // 获取用户信息数据
    async getUserInfo() {
      const data = await this.$axios.get("/author/userinfo", {
        params: { uid: this.$route.params.id }
      });

      if (data.error_code === 0) {
        this.form = data.data;
        this.avatar = data.data.avatar;
      } else {
        Message.error("用户信息获取失败");
      }
    },
    async onSubmit() {
      const { nickname, profession, signature } = this.form;

      const result = await this.$axios.post("/author/updateUserInfo", {
        nickname,
        profession,
        signature,
        avatar: this.avatar,
        uid: this.$route.params.id
      });

      if (result.error_code === 0) {
        Message.success("用户信息更新成功");
      } else {
        Message.error("用户信息更新失败");
      }
    },
    // 上传头像
    async uploadAvatar() {
      const formData = new FormData();
      formData.append("file", this.$refs.avatar.files[0]);
      formData.append("type", "avatar");

      const data = await this.$axios.post("/upload", formData, {
        headers: { contentType: false, processData: false }
      });

      if (data.error_code === 0) {
        this.avatar = data.url;
      } else {
        Message.error("上传失败");
      }
    }
  }
};
</script>

<style></style>
