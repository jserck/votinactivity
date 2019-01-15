<template>
     <section>
          <Dialog
               v-if="isShowDialog"
               :dialogType="dialogType"
               :dialogOpations="dialogOpations"
               @isCloase="dialogClose"
               @dialogListenEvent="dialogListenEvent"
          ></Dialog>
          <!-- 明星书单 -->
          <section class="g-star-bookList" id="star">
               <StarBook
                    ref="star_book"
                    :isShowTit="`voted`"
                    @votingStarChange="votingStarChange"
                    @videoPlay="videoPlay"
               ></StarBook>
          </section>
     </section>
</template>
<script>
export default {
     components: {
          StarBook: () => import('../common/starbook.vue'),
          Dialog: () => import('../common/dialog.vue'),
     },
     data() {
          return {
               isShowDialog: false,
               dialogOpations: {},
               dialogType: 0
          }
     },
     methods: {
          dialogShow(type, isShow, obj = {}) {
               /**
                * 呼起弹窗并传递数据给dialog
                */
               this.dialogOpations = obj;
               this.isShowDialog = isShow;
               this.dialogType = type;
          },
          videoPlay(src) {
               /**
                * 视频播放
               */
               this.dialogShow(6, true, { src });
          },
          dialogListenEvent(obj) {
               /**
                * dialog关闭事件处理
                */
               switch (obj.type) {
                    case 2:

                         break;

                    case 3:

                         break;

                    case 4:
                         if (obj.eventType == 'dialogComponentEvent') {
                              this.isShowDialog = false
                         }
                         break;
                    case 6:

                         break;
                    case 7:
                         if (obj.eventType == 'dialogComponentEvent') {
                              this.isShowDialog = false
                         }
                         break;
                    case 8:
                         if (obj.eventType == 'dialogComponentEvent') {
                              this.isShowDialog = false
                         }
                         break;

                    default:
                         break;
               }
          },
     }
}
</script>
