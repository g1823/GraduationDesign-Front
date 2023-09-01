<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      "
    >
      <h2>已添加的好友</h2>
      <el-button type="primary" @click="showAddFriendDialog"
        >添加好友</el-button
      >
      <el-button type="primary" @click="showFriendRequests"
        >查看好友申请</el-button
      >
    </div>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :total="existingFriends.length"
      layout="sizes, prev, pager, next, jumper"
      @current-change="handlePageChange"
      style="margin-bottom: 20px"
    >
    </el-pagination>
    <el-input
      v-model="searchKeyword"
      placeholder="搜索已添加好友"
      style="margin-bottom: 20px"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchFriends"
      ></el-button>
    </el-input>

    <el-table :data="displayFriends" border>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="{ row }">
          {{ formatDate(row.createdTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="{ row }">
          <img :src="row.avatarUrl" alt="头像" width="50" height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="bio" label="个人简介"></el-table-column>
      <el-table-column prop="createTime" label="删除">
        <template slot-scope="{ row }">
          <el-button slot="append" @click="deleteFriend(row.id)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="好友申请"
      :visible="drawerVisible"
      :size="500"
      direction="rtl"
      @close="closeDrawer"
    >
      <!-- 在这里展示好友申请信息 -->
      <el-table :data="applyFriend" border>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="{ row }">
            <img :src="row.avatar" alt="头像" width="50" height="50" />
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="接受">
          <template slot-scope="{ row }">
            <el-button slot="append" @click="receive(row.id)">同意</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-dialog
      title="添加好友"
      :visible="dialogVisible"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <el-input
        v-model="searchFriendKeyword"
        placeholder="请输入关键字"
        style="margin-bottom: 20px"
      ></el-input>

      <el-button type="primary" @click="searchFriendByNickname"
        >按昵称搜索</el-button
      >
      <el-button type="primary" @click="searchFriendByUsername"
        >按用户名搜索</el-button
      >

      <el-table :data="searchFriend" border>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="createdTime" label="创建时间">
          <template slot-scope="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="{ row }">
            <img :src="row.avatar" alt="头像" width="50" height="50" />
          </template>
        </el-table-column>
        <el-table-column prop="bio" label="个人简介"></el-table-column>
        <el-table-column prop="bio" label="添加">
          <template slot-scope="{ row }">
            <el-button type="primary" @click="addFriend(row.id)"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div v-if="existingFriends.length < 5">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { findFriend } from "@/api/user";
import {
  addFriend,
  getApply,
  receiveApply,
  getFriends,
  deleteFriends,
} from "@/api/friend";
export default {
  name: "Friend",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      existingFriends: [
        // 已添加的好友数据
      ],
      searchFriend: [],
      applyFriend: [],
      displayFriends: [],
      searchKeyword: "",
      dialogVisible: false,
      searchFriendKeyword: "",
      drawerVisible: false,
      friendRequests: [
        // 好友申请数据
      ],
    };
  },
  computed: {
    filteredFriends() {
      return this.existingFriends.filter((friend) =>
        friend.nickname.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    },
  },
  methods: {
    showFriendRequests() {
      this.drawerVisible = true;
    },
    closeDrawer() {
      this.drawerVisible = false;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.updateDisplayFriends();
    },
    updateDisplayFriends() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.displayFriends = this.filteredFriends.slice(start, end);
    },
    searchFriends() {
      this.currentPage = 1;
      this.updateDisplayFriends();
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },

    showAddFriendDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.searchFriendKeyword = "";
    },

    searchFriendByNickname() {
      let finduser = {
        keyWord: this.searchFriendKeyword,
        byUsername: false,
      };
      const t = this;
      findFriend(finduser).then((res) => {
        t.searchFriend = res.data.data;
      });
    },
    searchFriendByUsername() {
      let finduser = {
        keyWord: this.searchFriendKeyword,
        byUsername: true,
      };
      const t = this;
      findFriend(finduser).then((res) => {
        t.searchFriend = res.data.data;
      });
    },

    addFriend(id) {
      console.log(id);
      addFriend(id).then((res) => {
        alert(res.data.data);
      });
      this.searchFriendKeyword = "";
      this.searchFriend = [];
    },
    showFriendRequests() {
      this.drawerVisible = true;
    },
    closeDrawer() {
      this.drawerVisible = false;
    },
    receive(id) {
      const t = this;
      receiveApply(id).then((res) => {
        if (res.data.code == 200) {
          t.applyFriend = [];
          getApply().then((res) => {
            t.applyFriend = res.data.data;
            console.log(t.applyFriend);
          });
        }
      });
      this.existingFriends = [];
      getFriends().then((res) => {
        t.existingFriends = res.data.data;
        t.updateDisplayFriends();
      });
    },
    deleteFriend(id) {
      const t = this;
      deleteFriends(id).then((res) => {
        if (res.data.code == 200) {
          t.existingFriends = [];
          getFriends().then((res) => {
            t.existingFriends = res.data.data;
            t.updateDisplayFriends();
          });
        }
      });
    },
  },
  mounted() {
    const t = this;
    getFriends().then((res) => {
      t.existingFriends = res.data.data;
      t.updateDisplayFriends();
    });
    getApply().then((res) => {
      t.applyFriend = res.data.data;
    });
  },
};
</script>

<style>
</style>