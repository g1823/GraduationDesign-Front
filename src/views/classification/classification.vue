<template>
  <div>
    <h1>分类界面</h1>
    系统分类：
    <span v-for="item in systemCategory" :key="item.id">
      <el-button
        round
        @click="
          getCategoryPics(item.id, item.categoryName, true, item.description)
        "
        >{{ item.categoryName }}</el-button
      >
    </span>
    <br />
    用户分类：
    <span v-for="item in userCategory" :key="item.id">
      <el-button
        round
        @click="
          getCategoryPics(item.id, item.categoryName, false, item.description)
        "
        >{{ item.categoryName }}</el-button
      >
    </span>
    <el-button plain @click="addCategory">新建分类</el-button>
    <el-dialog
      title="添加分类"
      :visible.sync="formDialogVisible"
      width="30%"
      center
    >
      <el-form ref="newCategory" :model="newCategory" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="newCategory.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="newCategory.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createCategory">立即创建</el-button>
          <el-button @click="cancelCreateCategory">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div v-if="!showPics" style="height: 700px; width: 100%"></div>
    <div v-show="showPics">
      <h1>{{ nowCategoryName }}</h1>
      <el-button round @click="addPictureToCategory()">添加图片</el-button>
      <el-button v-if="!isSystemCategory" round @click="deleteCategory()"
        >删除分类</el-button
      >
      <el-divider></el-divider>
      <div>分类描述：{{ description }}</div>
      <el-divider></el-divider>
      <div v-for="item in picList" :key="item.id">
        <Picture
          :id="item.id"
          :url="item.url"
          :viewCount="item.viewCount"
          :likeCount="item.likeCount"
          :commentCount="item.commentCount"
          :downloadCount="item.downloadCount"
          :pictureName="item.pictureName"
          :description="item.description"
        ></Picture>
      </div>
      <el-dialog
        title="添加图片"
        :visible.sync="showAddDialog"
        width="35%"
        center
      >
        <el-upload
          ref="uploadpic"
          :action="uploadUrl"
          :file-list="fileList"
          :multiple="true"
          :auto-upload="false"
          list-type="picture-card"
          :limit="10"
          :on-exceed="exceed"
          :headers="headers"
          :data="data"
          :on-change="handleChange"
        >
          <!-- :http-request="uploadImage" -->
          <i slot="trigger" class="el-icon-plus"></i>
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传</el-button
          >
        </el-upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCategory, creatCategory, deleteCategory } from "@/api/category";
import { getCategoryPics } from "@/api/picture";
import Picture from "@/components/Picture.vue";
export default {
  name: "Classification",
  data() {
    return {
      headers: { Authorization: "" },
      data: {
        categoryId: "",
      },
      description: "",
      uploadUrl: "",
      isSystemCategory: false,
      fileList: [],
      systemCategory: [],
      userCategory: [],
      picList: [],
      showPics: false,
      nowCategoryName: "",
      nowCategoryId: "",
      formDialogVisible: false,
      showAddDialog: false,
      newCategory: {
        name: "",
        description: "",
      },
    };
  },
  components: {
    Picture,
  },
  methods: {
    exceed() {
      alert("最多只允许同时上传10个文件");
    },
    addCategory() {
      this.formDialogVisible = true;
    },
    cancelCreateCategory() {
      this.formDialogVisible = false;
    },
    createCategory() {
      const t = this;
      creatCategory(t.newCategory).then((res) => {
        t.cancelCreateCategory();
      });
    },
    getCategoryPics(categoryId, name, isSystemCategory, description) {
      this.showPics = true;
      this.nowCategoryName = name;
      this.nowCategoryId = categoryId;
      this.isSystemCategory = isSystemCategory;
      this.description = description;
      let t = this;
      getCategoryPics(categoryId).then(
        (response) => {
          if (response.data.data == "null") {
            alert("此分类没有图片");
          } else {
            t.picList = response.data.data.pics;
          }
        },
        (error) => {
          alert("服务器错误");
        }
      );
    },
    deleteCategory() {
      const t = this;
      deleteCategory(this.nowCategoryId).then((res) => {
        if (res.data.code == 200) {
          t.userCategory = res.data.data;
        } else {
          alert(res.data.message);
        }
      });
      this.showPics = false;
    },
    addPictureToCategory() {
      this.showAddDialog = true;
    },
    submitUpload() {
      console.log(this.nowCategoryId);
      //this.$refs.uploadpic.submit();
    },
    handleChange() {
      let token = localStorage.getItem("token");
      if (token != null) {
        this.headers = {
          Authorization: token,
        };
        this.data = {
          categoryId: this.nowCategoryId,
        };
      }
    },
  },
  mounted() {
    const t = this;
    getCategory(true).then((res) => {
      if (res.data.code == 200) {
        t.systemCategory = res.data.data.systemCategory;
        t.userCategory = res.data.data.userCategory;
      } else {
        alert(res.data.message);
      }
    });
  },
};
</script>

<style>
</style>