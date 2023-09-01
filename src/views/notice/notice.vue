<template>
  <div>
    <h1>系统公告</h1>
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="announcement in announcements"
        :key="announcement.id"
        :title="announcement.title"
        :name="announcement.id"
      >
        <div>
          <p>时间：{{ announcement.time }}</p>
          <p>内容：{{ announcement.content }}</p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      activeNames: [1, 2, 3], // 存储当前展开的折叠面板的名称
      announcements: [
        {
          id: 0,
          title: "测试公告1号",
          time: "2023-05-01",
          content:
            "这是测试公告的内容，这是测试公告的内容，这是测试公告的内容，这是测试公告的内容",
        },
        {
          id: 1,
          title: "测试公告2号",
          time: "2023-05-01",
          content:
            "这是测试公告的内容，这是测试公告的内容，这是测试公告的内容，这是测试公告的内容",
        },
        {
          id: 2,
          title: "测试公告3号",
          time: "2023-05-01",
          content:
            "这是测试公告的内容，这是测试公告的内容，这是测试公告的内容，这是测试公告的内容",
        },
        {
          id: 3,
          title: "测试公告4号",
          time: "2023-05-01",
          content:
            "这是测试公告的内容，这是测试公告的内容，这是测试公告的内容，这是测试公告的内容",
        },
        {
          id: 4,
          title: "测试公告5号",
          time: "2023-05-01",
          content:
            "这是测试公告的内容，这是测试公告的内容，这是测试公告的内容，这是测试公告的内容",
        },
        {
          id: 5,
          title: "测试公告6号",
          time: "2023-05-01",
          content:
            "这是测试公告的内容，这是测试公告的内容，这是测试公告的内容，这是测试公告的内容",
        },
      ],
    };
  },
};
</script>

<style>
</style>