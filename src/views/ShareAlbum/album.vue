<template>
  <div class="album">
    <div class="avatar">
      <img :src="album.avatar" alt="相册封面" />
    </div>
    <div class="info">
      <h3>{{ album.name }}</h3>
      <p>{{ album.desc }}</p>
      <div class="details">
        <div class="detail-item">
          <span class="label">图片数量:</span>
          <span>{{ album.picnum }}</span>
        </div>
        <div class="detail-item">
          <span class="label">是否公开:</span>
          <span>{{ album.isPublic ? "是" : "否" }}</span>
        </div>
        <div class="detail-item">
          <span class="label">创建者:</span>
          <span>{{ album.user }}</span>
        </div>
        <div class="detail-item">
          <span class="label">参与人数:</span>
          <span>{{ album.usernum }}</span>
        </div>
        <div class="detail-item">
          <span class="label">创建时间:</span>
          <span>{{ album.createTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    album: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log(this.album);
  },
};
</script>
  
  <style scoped>
.album {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.avatar img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.info {
  margin-left: 20px;
}

h3 {
  margin: 0;
}

.details {
  margin-top: 10px;
}

.detail-item {
  margin-bottom: 5px;
}

.label {
  font-weight: bold;
}
</style>