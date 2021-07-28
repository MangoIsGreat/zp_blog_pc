<template>
  <div class="login-com-wrapper">
    <el-form ref="form" :model="form" :rules="rules" class="login-form">
      <div class="form-item-header">
        <div class="title">{{ title }}</div>
        <div class="cancel" @click="cancel">
          *
        </div>
      </div>
      <el-form-item v-if="isRegister" prop="nickname" key="nickname">
        <el-input placeholder="请输入昵称" v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="username" key="username">
        <el-input
          :placeholder="placeUserName"
          v-model="form.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password1" key="password1">
        <el-input
          placeholder="请填写密码"
          type="password"
          v-model="form.password1"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isRegister" prop="password2" key="password2">
        <el-input
          placeholder="再次输入密码"
          type="password"
          v-model="form.password2"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-form-btn">
        <el-button type="primary" v-if="!isRegister" @click="login"
          >登录</el-button
        >
        <el-button type="primary" v-else @click="register">注册</el-button>
      </el-form-item>
      <div class="login-form-text">
        <div class="item" v-if="isRegister" @click="toLogin">登录</div>
        <div class="item" v-else @click="toRegister">注册</div>
        <div class="item">忘记密码</div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { setLocalStorage } from "@/utils/store";
import { setCookie } from "@/utils/cookie";
import { Message } from "element-ui";

export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空！"));
      } else {
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("不是正确的Email格式!"));
        }
      }
    };

    // 验证密码1
    const checkPassword1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空！"));
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("密码长度为6到32,且包含字符、数字或_"));
        }
      }
    };

    // 验证密码2
    const checkPassword2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空！"));
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/;
        if (reg.test(value) == true) {
          if (value === this.form.password1) {
            callback();
          } else {
            callback(new Error("两次输入的密码不同!"));
          }
        } else {
          callback(new Error("密码长度为6到32,且包含字符、数字或_"));
        }
      }
    };

    return {
      title: "用户登录",
      placeUserName: "请输入账号",
      isRegister: false, // 是否注册账号
      form: {
        username: "",
        password1: "",
        password2: "",
        nickname: ""
      },
      rules: {
        username: [{ required: true, validator: checkEmail, trigger: "blur" }],
        password1: [
          {
            required: true,
            validator: checkPassword1,
            trigger: "blur"
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为6到32,且包含字符、数字或_",
            trigger: "change"
          }
        ],
        password2: [
          {
            required: true,
            validator: checkPassword2,
            trigger: "blur"
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为6到32,且包含字符、数字或_",
            trigger: "change"
          }
        ],
        nickname: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 32,
            message: "密码长度为4到32个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const params = {
            account: this.form.username,
            secret: this.form.password1,
            type: 101 // email账号类型登录
          };

          const data = await this.$axios.post("/user/login", params);

          if (data.error_code === 0) {
            this.$store.commit("login/toggleOpen", false);

            setCookie(this, "user_token", data.token);
            setLocalStorage("user_info", data.data);
          }
        } else {
          // 验证失败
          Message.error("请输入正确的账号和密码！");
        }
      });
    },
    register() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const params = {
            email: this.form.username,
            password: this.form.password2,
            nickname: this.form.nickname
          };

          const data = await this.$axios.post("/user/register", params);

          if (data.error_code === 0) {
            Message.success("恭喜您，注册成功！");

            // 登录账号
            this.login();
          }
        } else {
          // 验证失败
          Message.error("注册失败！");
        }
      });
    },
    cancel() {
      this.$store.commit("login/toggleOpen", false);
    },
    toRegister() {
      this.isRegister = true;
      this.title = "注册账号";
      this.placeUserName = "请填写正确的Email";
      this.username = "";
      this.password1 = "";
    },
    toLogin() {
      this.isRegister = false;
      this.title = "用户登录";
      this.placeUserName = "请输入账号";
      this.username = "";
      this.password1 = "";
      this.password2 = "";
      this.nickname = "";
    }
  }
};
</script>

<style></style>
