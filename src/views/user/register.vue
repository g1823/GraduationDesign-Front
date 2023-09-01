<template>
  <div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title">注册</h3>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.username"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          type="text"
          placeholder="请输入昵称"
          v-model="form.nickname"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入注册信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import { register } from "@/api/user";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname: "",
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: "用户名不可为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "昵称不可为空", trigger: "blur" },
        ],
      },
      // 对话框显示和隐藏
      dialogVisible: false,
    };
  },
  methods: {
    onSubmit(registerForm) {
      // 为表单绑定验证功能
      const t = this;
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          register(
            this.form.username,
            this.form.password,
            this.form.nickname
          ).then((res) => {
            let data = res.data;
            if (data.code == 200) {
              let user = data.data;
              t.$store.dispatch(
                "setUserMessage",
                user
              );
              localStorage.setItem("token", data.data.token);
              t.$store.dispatch('setLogged',true)
              t.$router.push({
                name: "homepage",
              });
            } else if (data.code == 10001) {
              alert(data.message);
            } else if (data.code == 50001) {
              alert(data.message);
            }
          });
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
  },
};
</script>
  
<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>