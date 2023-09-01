<template>
  <div class="picture">
    <el-image
      style="width: 300px; height: 230px"
      :src="url"
      fit="cover"
    ></el-image>
    &nbsp;{{ viewCount }} <i class="el-icon-view"></i> &nbsp;
    {{ commentCount }} <i class="el-icon-chat-dot-round"></i> &nbsp;
    {{ downloadCount }} <i class="el-icon-download"></i>&nbsp; {{ likeCount }}
    <i class="el-icon-thumb"></i>&nbsp;
    <el-button
      @click="goToPictureDetail"
      round
      size="small"
      style="float: right; margin-right: 20px"
      >查看详情</el-button
    >
  </div>
</template>

<script>
import picManagementVue from "@/views/picture_management/picManagement.vue";
export default {
  name: "Picture",
  props: {
    id: String,
    url: String,
    viewCount: Number,
    likeCount: Number,
    commentCount: Number,
    downloadCount: Number,
    pictureName: String,
    description: String,
  },
  data() {
    return {};
  },
  methods: {
    goToPictureDetail() {
      let picture = {
        id: this.id,
        url: this.url,
        viewCount: this.viewCount,
        likeCount: this.likeCount,
        commentCount: this.commentCount,
        downloadCount: this.downloadCount,
        pictureName: this.pictureName,
        description: this.description,
      };
      this.$store.commit("SetNowPicture", picture);
      this.$bus.$emit("skip", "PictureDetail");
    },
  },
};
</script>

<style>
.picture {
  line-height: 28px;
  height: 270px;
  width: 300px;
  background-color: rgb(222, 241, 245);
  margin: 20px;
  float: left;
}
</style>