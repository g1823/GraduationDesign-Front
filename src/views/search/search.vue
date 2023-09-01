<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    "
  >
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 75%;
      "
    >
      <h1>搜索({{ $store.state.searchContent }})结果</h1>
      <div style="width: 100%">
        <h3 style="float: left">按分类搜索</h3>
      </div>
      <el-divider></el-divider>
      <div v-for="item in categoryPicList" :key="item.id">
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
      <div style="width: 100%">
        <h3 style="float: left">按标签搜索</h3>
      </div>
      <el-divider></el-divider>
      <div v-for="item in tagPicList" :key="item.id">
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
      <div style="width: 100%">
        <h3 style="float: left">按名称搜索</h3>
      </div>
      <el-divider></el-divider>
      未搜索到
    </div>
  </div>
</template>

<script>
import Picture from "@/components/Picture.vue";
import { queryPics } from "@/api/picture";
export default {
  name: "Search",
  data() {
    return {
      categoryPicList: [
        {
          id: "1654838766558298113",
          url: "http://ru89hsc47.hb-bkt.clouddn.com/6c4dd6c2-7f25-41e5-be39-527a7ab55789.jpg",
          viewCount: 30,
          likeCount: 14,
          commentCount: 6,
          downloadCount: 0,
          pictureName: "6c4dd6c2-7f25-41e5-be39-527a7ab55789.jpg",
          description: "0",
        },
        {
          id: "1657787297480871937",
          url: "http://ru89hsc47.hb-bkt.clouddn.com/8c8dc3f9-650d-407f-a765-2f14a649b38d.jpg",
          viewCount: 10,
          likeCount: 0,
          commentCount: 0,
          downloadCount: 0,
          pictureName: "8c8dc3f9-650d-407f-a765-2f14a649b38d.jpg",
          description: "0",
        },
        {
          id: "1654849399152472066",
          url: "http://ru89hsc47.hb-bkt.clouddn.com/19699293-8487-4219-8244-16e1c2facc6b.jpg",
          viewCount: 6,
          likeCount: 0,
          commentCount: 0,
          downloadCount: 0,
          pictureName: "19699293-8487-4219-8244-16e1c2facc6b.jpg",
          description: "0",
        },
        {
          id: "1657787300416884738",
          url: "http://ru89hsc47.hb-bkt.clouddn.com/b91348cc-c14f-481d-a963-272c236b37ad.jpg",
          viewCount: 6,
          likeCount: 0,
          commentCount: 0,
          downloadCount: 0,
          pictureName: "b91348cc-c14f-481d-a963-272c236b37ad.jpg",
          description: "0",
        },
        {
          id: "1657787323066126338",
          url: "http://ru89hsc47.hb-bkt.clouddn.com/e54fe062-c52f-4cc6-bfbc-72ea7da37277.jpg",
          viewCount: 6,
          likeCount: 0,
          commentCount: 0,
          downloadCount: 0,
          pictureName: "e54fe062-c52f-4cc6-bfbc-72ea7da37277.jpg",
          description: "0",
        },
        {
          id: "1654840393658843138",
          url: "http://ru89hsc47.hb-bkt.clouddn.com/21ff639d-d92f-429b-82e2-37557ee973d9.jpg",
          viewCount: 5,
          likeCount: 0,
          commentCount: 1,
          downloadCount: 0,
          pictureName: "21ff639d-d92f-429b-82e2-37557ee973d9.jpg",
          description: "0",
        },
      ],
      categoryNameList: ["动物", "动物1"],
      tagPicList: [
        {
          id: "1654838766558298113",
          url: "http://ru89hsc47.hb-bkt.clouddn.com/6c4dd6c2-7f25-41e5-be39-527a7ab55789.jpg",
          viewCount: 30,
          likeCount: 14,
          commentCount: 6,
          downloadCount: 0,
          pictureName: "6c4dd6c2-7f25-41e5-be39-527a7ab55789.jpg",
          description: "0",
        },
      ],
      namePicList: [],
    };
  },
  components: {
    Picture,
  },
  methods: {},
  mounted() {
    queryPics(this.$store.state.searchContent).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>