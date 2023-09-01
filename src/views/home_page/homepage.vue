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
      <div v-if="picList.length == 0" style="height: 700px; width: 100%"></div>

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
      <el-pagination
        background
        layout="total, prev, pager, next,jumper"
        :total="total"
        :center="true"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="getPage"
        @prev-click="getPage"
        @next-click="getPage"
      ></el-pagination>
    </div>

    <div
      style="
        width: 25%;
        float: right;
        height: 100%;
        background-color: rgb(224, 234, 246);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      "
    >
      <div style="width: 100%; margin-left: 20px">
        <h2>
          {{ paixu }}排行榜
          <el-radio-group
            v-model="paixu"
            @change="handleOptionChange"
            size="mini"
          >
            <el-radio-button label="点赞"></el-radio-button>
            <el-radio-button label="评论"></el-radio-button>
            <el-radio-button label="观看"></el-radio-button>
          </el-radio-group>
        </h2>
        <table style="border-spacing: 10px">
          <thead>
            <tr>
              <th>排名</th>
              <th>图片</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(image, index) in paihangbang"
              :key="image.id"
              @click="goToPictureDetail(image)"
              style="cursor: pointer"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="image.url" alt="图片" width="100" height="100" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Picture from "@/components/Picture.vue";
import {
  getPublicPicturePage,
  getHotLike,
  getHotComment,
  getHotView,
} from "@/api/picture";
export default {
  name: "HomePage",
  data() {
    return {
      picList: [],
      page: {
        pageSize: 6,
        currentPage: 1,
      },
      total: 0,
      paihangbang: [],
      hotList: [],
      commnetList: [],
      viewList: [],
      paixu: "点赞",
    };
  },
  components: {
    Picture,
  },
  methods: {
    getPage(val) {
      this.page.currentPage = val;
      let t = this;
      getPublicPicturePage(t.page).then(
        (response) => {
          t.picList = response.data.data.list;
          t.total = response.data.data.total;
        },
        (error) => {
          alert("服务器错误");
        }
      );
    },
    handleOptionChange(value) {
      if (value == "点赞") {
        this.paihangbang = this.hotList;
      }
      if (value == "评论") {
        this.paihangbang = this.commnetList;
      }
      if (value == "观看") {
        this.paihangbang = this.viewList;
      }
    },
    goToPictureDetail(image) {
      let picture = {
        id: image.id,
        url: image.url,
        viewCount: image.viewCount,
        likeCount: image.likeCount,
        commentCount: image.commentCount,
        downloadCount: image.downloadCount,
        pictureName: image.pictureName,
        description: image.description,
      };
      this.$store.commit("SetNowPicture", picture);
      this.$bus.$emit("skip", "PictureDetail");
    },
  },
  mounted() {
    let t = this;
    getPublicPicturePage(t.page).then(
      (response) => {
        t.picList = response.data.data.list;
        t.total = response.data.data.total;
      },
      (error) => {
        alert("服务器错误");
      }
    );
    getHotLike().then((res) => {
      t.hotList = res.data.data;
      t.paihangbang = t.hotList;
    });
    getHotComment().then((res) => {
      t.commnetList = res.data.data;
    });
    getHotView().then((res) => {
      t.viewList = res.data.data;
    });
  },
};
</script>

<style>
</style>