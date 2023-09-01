<template>
  <div class="container">
    <img
      src="@/assets/logo.png"
      alt="相册管理"
      style="height: 60px; cursor: pointer"
      @click="skip('1')"
    />
    <el-menu
      :default-active="activeIndex"
      class="menu-wrapper"
      mode="horizontal"
      @select="skip"
      :collapse="false"
      style="margin-right: 50px"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">分类</el-menu-item>
      <el-menu-item index="3">共享相册</el-menu-item>
      <el-menu-item index="5">图片管理</el-menu-item>
      <el-menu-item index="6">系统公告</el-menu-item>
    </el-menu>
    <el-input
      v-model="searchText"
      placeholder="请输入搜索内容"
      clearable
    ></el-input>
    <el-button type="primary" style="margin-left: -10px" @click="search"
      >搜索</el-button
    >

    <el-badge :value="like" class="item" :hidden="like == 0">
      <el-button size="small" style="margin-left: 20px">点赞</el-button>
    </el-badge>
    <el-badge :value="comment" class="item" :hidden="comment == 0">
      <el-button size="small" style="margin-left: 15px">评论</el-button>
    </el-badge>

    <div v-if="$store.state.logged">
      <el-dropdown @command="personalCenter">
        <span class="el-dropdown-link">
          <el-avatar :size="50" :src="$store.state.user.avatar"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="1">个人信息</el-dropdown-item>
          <el-dropdown-item :command="2">我的好友</el-dropdown-item>
          <el-dropdown-item :command="3">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="!$store.state.logged">
      <el-button circle style="margin-left: 10px" @click="login"
        >登录</el-button
      >
      <el-button circle @click="register">注册</el-button>
    </div>
  </div>
</template>

<script>
import { isLogin } from "@/api/user";
import { formatTime } from "@/util/DateTimeUtil";
export default {
  name: "Header",
  data() {
    return {
      comment: 0,
      like: 0,
      logged: false,
      searchText: "",
      activeIndex: "1",
    };
  },
  methods: {
    skip(path) {
      switch (path) {
        case "1":
          this.$bus.$emit("skip", "homepage");
          break;
        case "2":
          this.$bus.$emit("skip", "Classification");
          break;
        case "3":
          this.$bus.$emit("skip", "ShareAlbum");
          break;
        case "5":
          this.$bus.$emit("skip", "picManagement");
          break;
        case "6":
          this.$bus.$emit("skip", "Notice");
          break;
      }
      this.activeIndex = path;
    },
    search() {
      this.$store.commit("SetSearchCOntent", this.searchText);
      this.$bus.$emit("skip", "Search");
    },
    personalCenter(command) {
      if (command == 1) {
        this.$router.push({
          name: "UserMessage",
        });
      }
      if (command == 2) {
        this.$router.push({
          name: "Friend",
        });
      }
      //退出登录
      if (command == 3) {
        localStorage.removeItem("token");
        this.$store.dispatch("setLogged", false);
      }
    },
    login() {
      this.$router.push({
        name: "Login",
      });
    },
    register() {
      this.$router.push({
        name: "Register",
      });
    },
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token == null) {
      this.logged = false;
    } else {
      const t = this;
      isLogin(token).then((res) => {
        if (res.data.code == 20001) {
          this.logged = false;
          localStorage.removeItem("token");
        } else {
          t.$store.dispatch("setLogged", true);
          let user = res.data.data;
          t.$store.dispatch("setUserMessage", user);

          // 格式化时间字符串
          const formattedTime = formatTime(new Date(t.$store.state.user.date));

          this.$message({
            dangerouslyUseHTMLString: true,
            duration: 3000,
            message:
              "欢迎回来 " +
              t.$store.state.user.nickname +
              " <br> <br>" +
              "上次登陆时间： " +
              formattedTime,
            type: "success",
          });
        }
      });
    }
  },
};
</script>

<style scoped>
.container {
  display: flex; /* 将容器设置为弹性布局 */
  flex-wrap: nowrap; /* 禁止元素换行 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center; /* 文字居中 */
}
.container > * {
  /* 设置子元素在一行内显示 */
  white-space: nowrap;
}

.el-menu {
  margin-left: 100px;
}
.el-input {
  margin-right: 10px;
  width: 270px;
  margin-left: 80px;
}

.el-dropdown {
  margin-left: 25px;
}
</style>