<template>
  <div>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center; /* 将子元素水平居中 */
      "
    >
      <el-image
        style="width: 750px"
        :src="$store.state.nowPicture.url"
        fit="contain"
      ></el-image>
    </div>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center; /* 将子元素水平居中 */
      "
    >
      <div style="width: 750px; border: 1px solid rgb(141, 135, 135)">
        观看量<i class="el-icon-view">{{
          $store.state.nowPicture.viewCount
        }}</i>
        点赞量<i class="el-icon-thumb">{{
          $store.state.nowPicture.likeCount
        }}</i>
        评论量<i class="el-icon-chat-dot-round">{{
          $store.state.nowPicture.commentCount
        }}</i>
        下载量<i class="el-icon-download">{{
          $store.state.nowPicture.downloadCount
        }}</i>
        <br />
        名字:{{ $store.state.nowPicture.pictureName }} <br />
        描述:{{ $store.state.nowPicture.description }}
      </div>
    </div>

    <div style="display: flex; width: 100%; justify-content: center">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="Comment"
        style="width: 520px"
      >
      </el-input>
      <el-button type="info" @click="clearComment">清空</el-button>
      <el-button type="success" @click="addComment(0)">评论</el-button>
      <el-button :type="liketype" :disabled="isLike" @click="like"
        >点赞</el-button
      >
    </div>
    <br />
    <br />
    <div style="display: flex; width: 100%; justify-content: center">
      <el-card style="width: 750px">
        <div slot="header" class="card-header">评论信息</div>
        <div class="comment-list">
          <div
            v-for="(comment, index) in comments"
            :key="comment.comment.id"
            class="comment-item"
          >
            <div class="comment">
              <div class="comment-avatar">
                <img :src="comment.comment.avatar" alt="Avatar" />
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{
                    comment.comment.userName
                  }}</span>
                  <span class="comment-date">{{
                    comment.comment.createDate
                  }}</span>
                </div>
                <div class="comment-text">
                  {{ comment.comment.content }}
                </div>
                <div class="comment-actions">
                  <button class="comment-reply-btn" @click="showReply(index)">
                    回复
                  </button>
                  <div
                    v-if="comment.showReplyInput"
                    class="comment-reply-input"
                  >
                    <el-input
                      placeholder="请输入评论内容"
                      v-model="comment.comment.replyComment"
                      type="textarea"
                      :rows="2"
                    ></el-input>
                    <el-button
                      type="primary"
                      size="small"
                      @click="
                        reply(
                          comment.comment.replyComment,
                          comment.comment.id,
                          index
                        )
                      "
                      >提交</el-button
                    >
                    <el-button
                      type="primary"
                      size="small"
                      @click="showReply(index)"
                      >取消</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="comment.comment.childComment.length > 0"
              class="child-comments"
            >
              <div
                v-for="childComment in comment.comment.childComment"
                :key="childComment.id"
                class="comment-item"
              >
                <div class="comment">
                  <div class="comment-avatar">
                    <img :src="childComment.avatar" alt="Avatar" />
                  </div>
                  <div class="comment-content">
                    <div class="comment-header">
                      <span class="comment-author">{{
                        childComment.userName
                      }}</span>
                      <span class="comment-date">{{
                        childComment.createDate
                      }}</span>
                    </div>
                    <div class="comment-text">
                      {{ childComment.content }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { addComment, getComments } from "@/api/comment";
import { updateViewCount } from "@/api/picture";
import { addLikeComment } from "@/api/like";
export default {
  name: "PictureDetail",
  data() {
    return {
      liketype: "",
      isLike: false,
      Comment: "",
      comments: [],
    };
  },
  methods: {
    clearComment() {
      this.Comment = "";
    },

    addComment(fatherId) {
      if (this.Comment == "") {
        alert("请输入内容再评论");
      } else {
        let comment = {
          content: this.Comment,
          picId: this.$store.state.nowPicture.id,
          fatherId: fatherId,
        };
        const t = this;
        addComment(comment).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            t.$store.state.nowPicture.commentCount++;
          }
        });
        this.Comment = "";
      }
    },

    showReply(index) {
      this.comments[index].showReplyInput =
        !this.comments[index].showReplyInput;
    },

    reply(content, toUserId, index) {
      if (content == "") {
        alert("请输入内容再评论");
      } else {
        let comment = {
          content: content,
          picId: this.$store.state.nowPicture.id,
          fatherId: toUserId,
        };
        const t = this;
        addComment(comment).then((res) => {
          if (res.data.code == 200) {
            t.$store.state.nowPicture.commentCount++;
          }
        });
        this.comments[index].replyComment = "";
        this.comments[index].showReplyInput = false;
      }
    },

    like() {
      let t = this;
      addLikeComment(this.$store.state.nowPicture.id).then((res) => {
        if (res.data.code == 200) {
          t.isLike = true;
          t.liketype = "danger";
          t.$store.state.nowPicture.likeCount++;
        }
      });
    },
  },
  mounted() {
    getComments(this.$store.state.nowPicture.id).then((res) => {
      for (const item of res.data.data) {
        this.comments.push({
          comment: item,
          showReplyInput: false,
          replyComment: "",
        });
      }
    });
    updateViewCount(this.$store.state.nowPicture.id).then((res) => {});
  },
};
</script>

<style>
.card-header {
  font-size: 18px;
  font-weight: bold;
  padding: 15px;
}

.comment-list {
  margin: 15px;
}

.comment-item {
  margin-bottom: 15px;
}

.comment {
  display: flex;
}

.comment-avatar {
  margin-right: 10px;
}

.comment-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.comment-author {
  font-weight: bold;
}

.comment-date {
  color: #999;
}

.comment-text {
  margin-top: 5px;
  line-height: 1.4;
}

.comment-actions {
  margin-top: 10px;
}

.comment-reply-btn {
  background-color: transparent;
  border: none;
  color: #999;
  cursor: pointer;
}

.comment-reply-input {
  margin-top: 10px;
}

.child-comments {
  margin-left: 20px;
  border-left: 2px solid #ccc;
  padding-left: 10px;
}
</style>
