<template>
  <div>
    <h3 align="center">个人信息</h3>
    <div>
      <el-avatar :src="avatar" :size="80"></el-avatar>
      <el-upload
        class="upload-btn"
        action="http://localhost:8888/user/changeAvatar"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :headers="headers"
      >
        <el-button size="small" style="margin-left: 30px">修改头像</el-button>
      </el-upload>
    </div>

    <el-form ref="userInfo" :model="userInfo" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="userInfo.password"
          :readonly="true"
          type="password"
        ></el-input
        ><el-button type="primary" @click="showDialog">修改密码</el-button>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input v-model="userInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="userInfo.createTime" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="上次登录">
        <el-input v-model="userInfo.updateTime" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userInfo.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="0">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="userInfo.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUserMeg">修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="修改密码"
      :visible.sync="updatePasswordDialogVisible"
      width="30%"
      center
    >
      <el-form ref="newCategory" :model="newPassword" label-width="80px">
        <el-form-item label="旧密码">
          <el-input v-model="newPassword.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPassword.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPassword.newPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePassword">修改密码</el-button>
          <el-button @click="cancelupdatePassword">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
<script>
import { formatTime } from "@/util/DateTimeUtil";
import { getUserDetail, updatePassword, updateUserMessage } from "@/api/user";
export default {
  name: "UserMessage",
  data() {
    return {
      headers: { Authorization: "" },
      avatar: "",
      updatePasswordDialogVisible: false,
      newPassword: {
        oldPassword: "",
        newPassword: "",
      },
      userInfo: {
        age: 0,
        createTime: "",
        introduction: "",
        nickname: "",
        password: "",
        sex: "",
        updateTime: "",
        username: "",
      },
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token != null) {
      this.headers = {
        Authorization: token,
      };
    } else {
      alert("请先登录");
    }
    const t = this;
    getUserDetail().then((res) => {
      if (res.data.code == 200) {
        const user = res.data.data;
        t.userInfo.age = user.age;
        t.avatar = user.avatar;
        t.userInfo.createTime = formatTime(new Date(user.createTime));
        t.userInfo.introduction = user.introduction;
        t.userInfo.nickname = user.nickname;
        t.userInfo.password = user.password;
        t.userInfo.sex = user.sex;
        t.userInfo.updateTime = formatTime(new Date(user.updateTime));
        t.userInfo.username = user.username;
      }
    });
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      // 处理上传成功后的操作
      // 更新用户头像链接
      if (response.code == 200) {
        this.avatar = response.data;
        this.$store.commit("UpdateAvatar", response.data);
      }
    },
    updatePassword() {
      updatePassword(this.newPassword).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.updatePasswordDialogVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    showDialog() {
      this.updatePasswordDialogVisible = true;
    },
    cancelupdatePassword() {
      this.updatePasswordDialogVisible = false;
    },
    updateUserMeg() {
      updateUserMessage(this.userInfo).then((res) => {
        if (response.code == 200) {
          this.$store.commit("UpdateNickname", this.userInfo.nickname);
        }
      });
    },
  },
};
</script>
  
<style scoped>
</style>
  