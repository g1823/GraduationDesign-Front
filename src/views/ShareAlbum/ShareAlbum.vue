<template>
  <div>
    <!-- 左侧导航栏 -->
    <div style="float: left; height: 100%">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="3"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        @select="handlerSelect"
      >
        <el-submenu index="createAlbum">
          <template slot="title">
            <i class="el-icon-circle-plus-outline"></i>
            <span slot="title">创建相册</span>
          </template>
          <el-menu-item index="createAlbum">创建私有相册</el-menu-item>
          <el-menu-item index="createPubAlbum">创建共享相册</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span slot="title">我的相册</span>
          </template>
          <el-menu-item index="myAlbum">我创建的相册</el-menu-item>
          <el-menu-item index="otherAlbum">我加入的相册</el-menu-item>
        </el-submenu>
        <el-menu-item index="manaAlbum">
          <i class="el-icon-setting"></i>
          <span slot="title">管理相册</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 内容展示 -->
    <div style="float: left; margin-left: 100px">
      <div v-show="index == 'createAlbum'">
        <h1>创建私人相册</h1>
        <el-divider></el-divider>
        <el-form ref="album" :model="album" label-width="80px">
          <el-form-item label="相册名称">
            <el-input v-model="album.name"></el-input>
          </el-form-item>
          <el-form-item label="所属用户">
            <el-input v-model="album.username" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="album.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否共享">
            <el-switch v-model="album.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="相册功能">
            <el-checkbox-group v-model="album.type">
              <el-checkbox label="记录生活" name="type"></el-checkbox>
              <el-checkbox label="风景" name="type"></el-checkbox>
              <el-checkbox label="游戏" name="type"></el-checkbox>
              <el-checkbox label="其他" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="相册封面">
            <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="contain"
            ></el-image>
            <el-button>修改</el-button>
          </el-form-item>
          <el-form-item label="相册描述">
            <el-input type="textarea" v-model="album.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="index == 'createPubAlbum'">
        <h1>创建共享相册</h1>
        <el-divider></el-divider>
        <el-form ref="albumpub" :model="albumpub" label-width="80px">
          <el-form-item label="相册名称">
            <el-input v-model="albumpub.name"></el-input>
          </el-form-item>
          <el-form-item label="所属用户">
            <el-input v-model="albumpub.username" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="albumpub.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否共享">
            <el-switch v-model="albumpub.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="相册功能">
            <el-checkbox-group v-model="albumpub.type">
              <el-checkbox label="记录生活" name="type"></el-checkbox>
              <el-checkbox label="风景" name="type"></el-checkbox>
              <el-checkbox label="游戏" name="type"></el-checkbox>
              <el-checkbox label="其他" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="相册封面">
            <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="contain"
            ></el-image>
            <el-button>修改</el-button>
          </el-form-item>
          <el-form-item label="相册描述">
            <el-input type="textarea" v-model="albumpub.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-show="index == 'myAlbum'"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 1150px;
        "
      >
        <h1>我创建的相册</h1>
        <el-divider></el-divider>
        <div v-for="item in myAlbum" :key="item">
          <album :album="item" />
        </div>
      </div>
      <div
        v-show="index == 'otherAlbum'"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 1150px;
        "
      >
        <h1>我加入的相册</h1>
        <el-divider></el-divider>
        <div v-for="item in otherAlbum" :key="item">
          <album :album="item" />
        </div>
      </div>
      <div v-show="index == 'manaAlbum'">
        <h1>管理相册</h1>
        <el-divider></el-divider>
        <!-- 选择器 -->
        <el-select v-model="selectedAlbum" placeholder="选择相册">
          <el-option
            v-for="album in albums"
            :key="album.name"
            :label="album.name"
            :value="album"
          ></el-option>
        </el-select>

        <!-- 相册信息展示 -->
        <div v-if="selectedAlbum" class="album-info">
          <img
            :src="selectedAlbum.avatar"
            alt="相册封面"
            style="width: 100px"
          />
          <div class="info-details">
            <h3>{{ selectedAlbum.name }}</h3>
            <p>{{ selectedAlbum.desc }}</p>
            <div class="details">
              <div class="detail-item">
                <span class="label">图片数量:</span>
                <span>{{ selectedAlbum.picnum }}</span>
              </div>
              <div class="detail-item">
                <span class="label">是否公开:</span>
                <span>{{ selectedAlbum.isPublic ? "是" : "否" }}</span>
              </div>
              <div class="detail-item">
                <span class="label">创建者:</span>
                <span>{{ selectedAlbum.user }}</span>
              </div>
              <div class="detail-item">
                <span class="label">参与人数:</span>
                <span>{{ selectedAlbum.usernum }}</span>
              </div>
              <div class="detail-item">
                <span class="label">创建时间:</span>
                <span>{{ selectedAlbum.createTime }}</span>
              </div>

              <div class="detail-item">
                <el-button type="primary">添加图片</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 相册图片展示 -->
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 1050px;
          "
        >
          <div v-for="item in myAlbum[0].images" :key="item.id">
            <el-image
              style="width: 300px; height: 300px; margin: 20px"
              :src="item.url"
              :fit="fit"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
  <script>
import album from "@/views/ShareAlbum/album.vue";
import Picture from "@/components/Picture.vue";
export default {
  components: {
    Picture,
  },
  data() {
    return {
      isCollapse: true,
      index: "createAlbum",
      selectedAlbum: null,
      album: {
        name: "",
        delivery: false,
        date: new Date(),
        type: [],
        desc: "",
        username: "小明",
      },
      albumpub: {
        name: "",
        delivery: true,
        date: new Date(),
        type: [],
        desc: "",
        username: "小明",
      },
      myAlbum: [
        {
          name: "测试相册1",
          desc: "这是测试相册，这是测试相册，这是测试相册，这是测试相册",
          avatar:
            "http://ru89hsc47.hb-bkt.clouddn.com/8c8dc3f9-650d-407f-a765-2f14a649b38d.jpg",
          picnum: 5,
          isPublic: false,
          user: "小明",
          usernum: 2,
          createTime: "2025年05月04日",
          images: [
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
          ],
        },
        {
          name: "测试相册2",
          desc: "这是测试相册，这是测试相册，这是测试相册，这是测试相册",
          avatar:
            "http://ru89hsc47.hb-bkt.clouddn.com/19699293-8487-4219-8244-16e1c2facc6b.jpg",
          picnum: 0,
          isPublic: true,
          user: "小明",
          usernum: 1,
          createTime: "2025年05月04日",
          images: [],
        },
      ],
      otherAlbum: [
        {
          name: "测试相册3",
          desc: "这是测试相册，这是测试相册，这是测试相册，这是测试相册",
          avatar:
            "http://ru89hsc47.hb-bkt.clouddn.com/19699293-8487-4219-8244-16e1c2facc6b.jpg",
          picnum: 0,
          isPublic: false,
          user: "test1",
          usernum: 0,
          createTime: "2025年05月04日",
        },
        {
          name: "测试相册4",
          desc: "这是测试相册，这是测试相册，这是测试相册，这是测试相册",
          avatar:
            "http://ru89hsc47.hb-bkt.clouddn.com/19699293-8487-4219-8244-16e1c2facc6b.jpg",
          picnum: 5,
          isPublic: false,
          user: "test1",
          usernum: 1,
          createTime: "2025年05月04日",
        },
      ],
      albums: [],
    };
  },
  components: {
    album,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handlerSelect(index) {
      this.index = index;
    },
  },
  mounted() {
    this.albums = this.myAlbum.concat(this.otherAlbum);
    console.log(this.albums);
    console.log(this.myAlbum[0].images);
  },
};
</script>
    
  <style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.album-info {
  display: flex;
  align-items: flex-start;
}

.info-details {
  margin-left: 10px;
}

.details {
  display: flex;
  flex-wrap: wrap;
}

.detail-item {
  margin-right: 20px;
  white-space: nowrap;
}

.label {
  margin-right: 5px;
}
</style>
  