<template>
  <div>
    <el-upload
      ref="uploadpic"
      :action="uploadUrl"
      :file-list="fileList"
      :multiple="true"
      :auto-upload="false"
      list-type="picture-card"
      :limit="limitNum"
      :on-exceed="exceed"
      :headers="headers"
      :data="data"
      :on-success="uploadSuccess"
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
      <el-switch
        v-model="autoClassify"
        active-text="自动分类"
        inactive-text="不自动分类"
      >
      </el-switch>
      <el-switch v-model="isPublic" active-text="公开" inactive-text="私有">
      </el-switch>
    </el-upload>
    <div style="width: 100%; display: flex">
      <div
        v-for="item in uploadPicList"
        :key="item.picId"
        style="display: flex"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="item.url"
          fit="contain"
        ></el-image>
        <span>
          预测分类:{{ item.category }}<br />
          预测标签:{{ item.tag }}<br />
          图片名称:{{ item.name }}<br />
          图片描述:null<br />
          <el-button @click="updatePic(item)">修改</el-button>
        </span>
      </div>
    </div>

    <el-dialog
      title="编辑图片信息"
      :visible="showDialog"
      @close="closeDialog"
      width="400px"
    >
      <div class="image-container">
        <el-image
          style="width: 100px; height: 100px"
          :src="dialogPicURL"
          fit="contain"
        ></el-image>
      </div>
      <div class="form-item">
        <label>预测分类</label>
        <el-select v-model="category" placeholder="请选择预测分类">
          <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          ></el-option>
        </el-select>
      </div>
      <div class="form-item">
        <label>预测标签</label>
        <el-input
          v-model="dialogPicTag"
          placeholder="请输入预测标签"
        ></el-input>
      </div>
      <div class="form-item">
        <label>图片名称</label>
        <el-input
          v-model="dialogPicName"
          placeholder="请输入图片名称"
        ></el-input>
      </div>
      <div class="form-item">
        <label>图片描述</label>
        <el-input
          v-model="dialogDesc"
          type="textarea"
          placeholder="请输入图片描述"
        ></el-input>
      </div>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveChanges">保存</el-button>
      </div>
    </el-dialog>

    <div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import { getCategory } from "@/api/category";
export default {
  name: "picManagement",
  data() {
    return {
      limitNum: 15,
      fileList: [], // 定义 fileList 变量
      uploadPicList: [],
      uploadUrl: "http://localhost:8888/pictures",
      autoClassify: true,
      isPublic: true,

      headers: { Authorization: "" },
      data: {
        autoClassify: true,
        isPublic: true,
      },

      showDialog: false,
      dialogPicID: "",
      dialogPicURL: "",
      dialogPicName: "",
      dialogcategoryId: 0,
      dialogPicCategory: "",
      dialogPicTag: "",
      dialogDesc: "",
      categories: [],
    };
  },
  methods: {
    exceed() {
      alert("最多只允许同时上传" + this.limitNum + "个文件");
    },
    submitUpload() {
      this.$refs.uploadpic.submit();
    },
    handleChange() {
      let token = localStorage.getItem("token");
      if (token != null) {
        this.headers = {
          Authorization: token,
        };
        this.data = {
          autoClassify: this.autoClassify,
          isPublic: this.isPublic,
        };
      }
    },
    uploadSuccess(response, file, fileList) {
      if (this.autoClassify) {
        console.log(response);
        if (response.data != null) {
          this.uploadPicList.push({
            picId: response.data.picId,
            category: response.data.category,
            tag: response.data.tag,
            url: response.data.url,
            name: response.data.name,
            desc: response.data.desc,
          });
        }
      }
    },
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    saveChanges() {
      // 在这里处理保存逻辑，可以使用 this.category、this.tag、this.imageName、this.description 来获取输入框的值
      console.log("保存修改");
      this.showDialog = false;
    },
    updatePic(pic) {
      this.dialogPicID = pic.picId;
      this.dialogPicURL = pic.url;
      this.dialogPicName = pic.name;
      this.dialogPicCategory = pic.category;
      this.dialogPicTag = pic.tag;
      this.dialogDesc = pic.desc;
      this.showDialog = true;
      this.dialogcategoryId = pic.categoryId;
      console.log(pic);
    },
  },
  mounted() {
    const t = this;
    getCategory(true).then((res) => {
      if (res.data.code == 200) {
        res.data.data.systemCategory.forEach((item) => {
          let cat = {
            id: item.id,
            name: item.categoryName,
          };
          t.categories.push(cat);
        });
        res.data.data.userCategory.forEach((item) => {
          let cat = {
            id: item.id,
            name: item.categoryName,
          };
          t.categories.push(cat);
        });
        console.log(t.categories);
      } else {
        alert(res.data.message);
      }
    });
  },
};
</script>

<style>
</style>
