<template>
    <section class="m-voting-template">
        <Dialog
            v-if="isShowDialog"
            :dialogType="dialogType"
            :dialogOpations="dialogOpations"
            @isCloase="isShowDialog=false"
            @dialogListenEvent="dialogListenEvent"
            @voteNumChange3="voteNumChange3"
        ></Dialog>
        <header>
            <section class="g-video-container">
                <i class="u-rule" @click="ruleHandler">规则</i>
                <h3>活动标题</h3>
                <span>2019.01.18—2019.02.10</span>
                <section class="g-video-banner" @click="videoPlay">
                    <span class="u-video-icon"></span>
                </section>
            </section>
        </header>
        <!-- 投票记录 -->
        <section class="g-myVoteCon" id="scroll">
            <section class="u-myVoteCon-link clearfix" @click="myVoteCon">
                <span class="u-myVoteCon-text">我的投票记录 ></span>
            </section>
            <section class="g-vote-list">
                <ul class="displayFlex flexWrap flexJustifybetween">
                    <li v-for="(item,index) in starSoltData2" :key="index">
                        <span
                            class="u-img"
                            :style="`background:url(${item.starPicUrl});
                                            backgroundRepeat:no-repeat;
                                            backgroundSize:cover`"
                        ></span>
                        <span class="u-vote-num">{{item.ticketCount}}票</span>
                        <section class="g-btn">
                            <span class="u-btn" @click="doVotingHandler(item['starId'])">投票</span>
                        </section>
                    </li>
                </ul>
            </section>
        </section>
        <!-- 我的选票 -->
        <section class="g-myVote" id="rule">
            <section class="u-myVote-tit">
                <span>我的选票</span>
            </section>
            <section class="g-vote-context">
                <p class="u-vote-count">当前拥有{{userTicketCount}}张选票</p>
                <span class="u-vote-btn" v-scroll="'scroll'">立即投票</span>
                <section class="g-vote-list">
                    <ul>
                        <li v-if="!isFollow" class="displayFlex flexJustifybetween flexAlignItemsCenter">
                            <span>关注小程序可得 1 张选票</span>
                            <section class="u-myVote-btn">
                                <span v-if="!isFollow" class="g-btn" @click="voteClick(1)">去关注</span>
                                <span v-else class="g-btn" style="background:#e7e7e7">已关注</span>
                            </section>
                        </li>
                        <li class="displayFlex flexJustifybetween flexAlignItemsCenter">
                            <span>每日签到获得 1 张选票</span>
                            <section class="u-myVote-btn">
                                <span v-if="!isSignIn" class="g-btn" @click="voteClick(2)">去签到</span>
                                <span v-else class="g-btn" style="background:#e7e7e7">已签到</span>
                            </section>
                        </li>
                        <li class="displayFlex flexJustifybetween flexAlignItemsCenter">
                            <span>分享获得选票 今日还有{{shareCount}}次机会</span>
                            <section class="u-myVote-btn">
                                <span class="g-btn" @click="voteClick(3)">去分享</span>
                            </section>
                        </li>
                        <li class="displayFlex flexJustifybetween flexAlignItemsCenter">
                            <span>阅读已购电子书得 1 张选票</span>
                            <section class="u-myVote-btn">
                                <span class="g-btn" @click="voteClick(4)">去阅读</span>
                            </section>
                        </li>
                    </ul>
                </section>
            </section>
        </section>
        <!-- 明星书单 -->
        <section class="g-star-bookList">
            <StarBook @videoPlay="videoPlay">
                <template slot-scope="{ indexNum,starBookData }">
                    <section class="g-scroll-book">
                        <scroller lock-y :scrollbar-x="false">
                            <section class="g-scroll-book-box displayFlex">
                                <section
                                    class="g-box-item"
                                    v-for="(item,index) in starBookData"
                                    :key="index"
                                >
                                    <BookItem :indexNum="indexNum" :obj="item"></BookItem>
                                </section>
                            </section>
                        </scroller>
                    </section>
                </template>
            </StarBook>
        </section>
        <footer>
            <section class="u-look-book">查看详细的书单</section>
        </footer>
    </section>
</template>
<script>
import { Scroller } from 'vux'
import StarBook from '../common/starbook.vue'
import scroll from '../../assets/js/href.js'
import { setTimeout } from 'timers'

export default {
    components: {
        Scroller,
        StarBook: () => import('../common/starbook.vue'),
        BookItem: () => import('../common/bookitem.vue'),
        Dialog: () => import('../common/dialog.vue'),
    },
    data() {
        return {

            myVoteData: {
                userTicketCount: null
            },//我的投票纪录
            userId: this.$route.query.userId || 1,
            starSoltData: [],//明星排序数据
            dialogOpations: {},//传递给dialog的数据
            dialogType: 0,//dialog内容类型
            isShowDialog: false,//dialog显示隐藏
            isFollow: this.$route.query.isFollow || false,//是否关注
            isclosefollow: false,
            isSignIn: this.$route.query.isSignIn || false,//是否签到
            isCanVote: false,//是否可以投票
            starId: 0,//记录当前投票明星ID
            nums: 0,//监听投票数
            isFirst: false,//当天是否首次进入
            myvotelist: [
                {
                    name: '关注小程序可得 1 张选票',
                    btn: '去关注'
                },
                {
                    name: '每日签到获得 1 张选票',
                    btn: '去签到'
                }, {
                    name: '分享获得选票 今日还有10 次机会',
                    btn: '去分享'
                }, {
                    name: '阅读已购电子书得 1 张选票',
                    btn: '去阅读'
                }
            ]
        }
    },
    created() {
        this.voteInit()
    },
    computed: {
        userTicketCount() {
            return this.myVoteData['userTicketCount'] || 0
        },
        shareCount() {
            return this.myVoteData['shareCount'] || 0
        },
        starSoltData2() {
            return this.starSoltData
        }
    },
    methods: {
        voteInit() {
            this.getStarSolt()//明星排序
            this.getMyVote()//我的选票
        },
        voteNumChange3(val) {
            /**
             * @name 监听投票数
            */
            this.nums = val
        },

        getStarSolt() {
            /**
             * @name 获取明星排名列表接口
             * @method post
             * @param null
             */
            let options = {
                urls: '/starRankingInfo',
                data: {},
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
                if (res.data.code === 200) {
                    this.starSoltData = res.data.data.starList
                }
            }).catch((err) => { })
        },
        getMyVote() {
            /**
             * @name 获取我的选票接口
             * @method post
             * @param userId 用户ID
             * @param isFollow 当前用户是否关注
             */
            let options = {
                urls: '/user/myInfo/1/1',
                data: {
                    userId: this.userId,
                    isFollow: this.isFollow
                },
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
                if (res.data.code === 200) {
                    this.myVoteData = res.data.data
                    this.isCanVote = res.data.data.userTicketCount > 0
                    this.isFirst = res.data.data.isFirst
                    this.isFollow = (res.data.data.isFollow == 1)
                    this.isSignIn = (res.data.data.isSignIn == 1)
                    if (this.isFirst) {
                        this.saveBooks(1)
                    }
                }
            }).catch((err) => { })

        },
        saveBooks(type) {
            /**
             * @name 发书
             * @method post
             * @param userId 用户ID
             * @param type 操作类型(1:第一次登陆，2，投票)
            */
            let options = {
                urls: '/user/getBook/1/1',
                data: {
                    userId: this.userId,
                    type
                },
                methods: 'post',
                types: 1,
                des: false,
            }
            this.$http(options).then((res) => {
                if (res.data.code === 200) {
                    if (type === 1) {
                        this.dialogShow(1, true, {
                            type,
                            bookId: res.data.data.bookId,
                            bookPicUrl: res.data.data.img,
                            bookName: res.data.data.name,
                            bookWebUrl: res.data.data.bookWebUrl,
                            isSignIn: this.isSignIn
                        });
                    } else {
                        this.dialogShow(1, true, {
                            type,
                            bookId: res.data.data.bookId,
                            bookPicUrl: res.data.data.img,
                            bookName: res.data.data.name,
                            bookWebUrl: res.data.data.bookWebUrl,
                            nums: this.nums,
                            userTicketCount: this.userTicketCount
                        });
                    }
                }
            }).catch((err) => { })
        },
        getTicket(type) {
            /**
             * @name 签到/分享/关注
             * @method post
             * @param userId 用户ID
             * @param type 操作类型(1:关注；2：签到；3：分享)
             */
            let options = {
                urls: '/user/getTicket/1/1',
                data: {
                    userId: this.userId,
                    type
                },
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
                if (res.data.code === 200) {
                    this.userTicketCountChange(1)
                    if (type === 1) {
                        this.isFollow = true
                    }
                    if (type === 2) {
                        this.isSignIn = true
                    }
                }
            }).catch((err) => { })

        },
        setVote() {
            /**
             * @name 投票
             * @method post
             * @param userId 用户ID
             * @param starId 明星ID
             * @param nums   投票数量
             */
            let options = {
                urls: '/user/vote',
                data: {
                    userId: this.userId,
                    starId: this.starId,
                    nums: this.nums
                },
                methods: 'post',
                types: 1,
                des: false,
                responseType: 1
            }
            this.$http(options).then((res) => {
                this.userTicketCountChange(0)
                if (res.data.code === 200) {
                    this.isShowDialog = false
                    this.saveBooks()
                } else {
                    this.dialogShow(8, true, { nums: this.nums })
                }
            }).catch((err) => { })

        },
        // this.myVoteData['userTicketCount']
        userTicketCountChange(type) {
            /**
             * @name 当前用户拥有选票的数量变更
             * @param type(1：票数自增，0：票数自减)
            */
            let num = this.myVoteData['userTicketCount'];
            if (type) {
                num + this.nums
            } else {
                num - this.nums
            }
        },
        attentionHandler() {
            /**
             * @name 关注
            */
            // this.getTicket(1)
            // this.dialogShow(4, true)
            // isf = this.attentionHandler ? 'unfollow' : 'follow'
            my.postMessage({
                action: 'follow',
                data: {}
            })
        },
        obshareHandler() {
            /**
             * @name 分享
            */
            my.postMessage({
                action: 'share',
                data: {
                    title: '示例',
                    desc: '官方示例Demo',
                    content: '官方示例Demo，展示已支持的接口能力及组件。',
                    path: '/voting',
                    query: {
                        a: 1
                    },
                    imageUrl: 'https://img.dz19.net/forum/201901/04/132545icn959e8xnqxebjn.jpg'
                }
            })
            // this.getTicket(3)
        },
        sugnInHandler() {
            /**
             * @name 签到
            */
            this.getTicket(2)
        },
        readHandler() {
            /**
             * @name 阅读
            */
            my.navigateTo({
                url: '',
                //跳转成功
                success() { },
                //跳转失败
                fail() { },
                //调用完成（无论成功失败）
                complete() { }
            })
        },
        voteClick(type) {
            if (type === 1) {
                this.attentionHandler()
            } else if (type === 2) {
                // 签到
                this.sugnInHandler()
            } else if (type === 3) {
                // 分享
                this.obshareHandler()
            } else {
                // 阅读
                this.readHandler()
            }
        },
        dialogListenEvent(obj) {
            /**
             * dialog关闭事件处理
             */
            switch (obj.type) {
                case 1:
                    if (obj.eventType == 'dialogComponentEvent') {
                        this.isShowDialog = false
                    }
                    break;

                case 2:

                    break;

                case 3:

                    break;

                case 4:
                    if (obj.eventType == 'dialogComponentEvent') {
                        this.isShowDialog = false
                    }
                    break;
                case 5:
                    if (obj.eventType == 'dialogComponentEvent') {
                        //投票
                        this.setVote()
                    }
                    if (obj.eventType == 'goRule') {
                        //做任务
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
        doVotingHandler(starId) {
            /**
            * 投票
            */
            this.starId = starId;
            this.dialogShow(5, true, {
                isCanVote: this.isCanVote
            });
        },

        ruleHandler() {
            /**
             * 查看规则
             */
            this.dialogShow(2, true);
        },
        myVoteCon() {
            /**
            * 查看投票纪录
            */
            this.dialogShow(3, true);
        },
        videoPlay(src) {
            /**
             * 视频播放
            */
            this.$vux.loading.show()
            setTimeout(() => {
                this.$vux.loading.hide()
                this.dialogShow(6, true);
            }, 1000)
        },
        dialogShow(type, isShow, obj = {}) {
            /**
             * 呼起弹窗并传递数据给dialog
             */
            this.dialogOpations = obj;
            this.isShowDialog = isShow;
            this.dialogType = type;
        }
    }
}
</script>
<style scoped lang="scss">
.m-voting-template {
    header {
        .g-video-container {
            overflow: hidden;
            position: relative;
            text-align: center;
            h3 {
                margin-top: 0.533333rem; /* 20/37.5 */
                @include setFontSize(16px);
                display: block;
                font-weight: normal;
                font-family: "PingFangSC-regular";
                color: #101010;
            }
            span {
                display: inline-block;
                margin-top: 0.266667rem; /* 10/37.5 */
                @include setFontSize(14px);
                font-weight: normal;
                font-family: "PingFangSC-regular";
                color: #101010;
            }
            .u-rule {
                position: absolute;
                padding: 0.08rem 0.48rem /* 18/37.5 */;
                display: inline-block;
                top: 1.52rem /* 57/37.5 */;
                right: 0;
                background: #f6f6f6;
                color: #1f2028;
                @include setFontSize(14px);
                text-align: center;
            }
            .g-video-banner {
                position: relative;
                margin: 0.8rem /* 30/37.5 */ auto;
                width: 8.48rem; /* 318/75 */
                height: 4.533333rem /* 170/37.5 */;
                background: #101010;
                border-radius: 0.186667rem /* 7/37.5 */;
                .u-video-icon {
                    position: absolute;
                    left: 50%;
                    margin-left: -0.373333rem /* 14/37.5 */;
                    top: 50%;
                    margin-top: -0.373333rem /* 14/37.5 */;
                    width: 0.746667rem /* 28/37.5 */;
                    height: 0.746667rem /* 28/37.5 */;
                    background: #fff;
                    border-radius: 0.373333rem /* 14/37.5 */;
                }
            }
        }
    }
    .g-myVoteCon {
        .u-myVoteCon-link {
            position: relative;
            .u-myVoteCon-text {
                margin-right: 0.346667rem /* 13/37.5 */;
                display: inline-block;
                float: right;
                @include setFontSize(14px);
                font-family: "PingFangSC-regular";
                color: #101010;
            }
        }
        .g-vote-list {
            ul {
                padding: 0 0.213333rem /* 8/37.5 */;
                li {
                    margin-top: 0.8rem /* 30/37.5 */;
                    span {
                        display: block;
                    }
                    .u-img {
                        width: 2.8rem /* 105/37.5 */;
                        height: 2.96rem /* 111/37.5 */;
                        background: #101010;
                        border-radius: 0.213333rem /* 8/37.5 */;
                    }
                    .u-vote-num {
                        margin-top: 0.266667rem /* 10/37.5 */;
                        @include setFontSize(14px);
                        text-align: center;
                    }
                }
            }
            .g-btn {
                margin: 0.373333rem /* 14/37.5 */ auto 0;
                @include setFontSize(14px);
                width: 2.4rem /* 90/37.5 */;
                height: 0.8rem /* 30/37.5 */;
                text-align: center;
                font-family: PingFang SC;
                border-radius: 0.106667rem /* 4/37.5 */;
                line-height: 0.8rem /* 30/37.5 */;
                background: yellow;
            }
        }
    }
    .g-myVote {
        margin: 0.586667rem /* 22/37.5 */ auto;
        .u-myVote-tit {
            padding-left: 0.453333rem /* 17/37.5 */;
            color: rgba(16, 16, 16, 1);
            @include setFontSize(18px);
            font-family: PingFangSC-regular;
            line-height: 0.666667rem /* 25/37.5 */;
        }
        .g-vote-context {
            margin: 0.213333rem /* 8/37.5 */ auto 0;
            overflow: hidden;
            width: 9.333333rem /* 350/37.5 */;
            background: #f7f7f7;
            border-radius: 0.266667rem /* 10/37.5 */;
            .u-vote-count {
                margin-top: 0.986667rem /* 37/37.5 */;
                text-align: center;
                color: rgba(16, 16, 16, 1);
                @include setFontSize(14px);
                font-family: PingFangSC-regular;
            }
            .u-vote-btn {
                display: block;
                margin: 0.72rem /* 27/37.5 */ auto;
                width: 5.52rem /* 207/37.5 */;
                height: 0.8rem /* 30/37.5 */;
                border-radius: 0.106667rem /* 4/37.5 */;
                color: rgba(16, 16, 16, 1);
                @include setFontSize(12px);
                text-align: center;
                font-family: PingFang SC;
                border: 1px solid rgba(187, 187, 187, 1);
                line-height: 0.8rem /* 30/37.5 */;
            }
            .g-vote-list {
                ul {
                    li {
                        padding: 0.293333rem /* 11/37.5 */ 0.346667rem
                            /* 13/37.5 */;
                        .u-myVote-btn {
                            .g-btn {
                                display: inline-block;
                                @include setFontSize(14px);
                                width: 2.4rem /* 90/37.5 */;
                                height: 0.8rem /* 30/37.5 */;
                                text-align: center;
                                font-family: PingFang SC;
                                border-radius: 0.106667rem /* 4/37.5 */;
                                line-height: 0.8rem /* 30/37.5 */;
                                background: yellow;
                            }
                        }
                    }
                }
                .g-star-video {
                    width: 7.2rem /* 270/37.5 */;
                    height: 3.04rem /* 114/37.5 */;
                }
            }
        }
    }
    .g-star-bookList {
        .u-star-tit {
            padding-left: 0.453333rem /* 17/37.5 */;
            color: rgba(16, 16, 16, 1);
            @include setFontSize(18px);
            font-family: PingFangSC-regular;
            line-height: 0.666667rem /* 25/37.5 */;
        }
        .g-scroll-star {
            margin-top: 0.266667rem /* 10/37.5 */;
            .g-scroll-star-box {
                padding: 0.133333rem /* 5/37.5 */ 0.32rem /* 12/37.5 */;
                width: 13.44rem /* 504/37.5 */;
                .u-box-item {
                    margin-left: 0.48rem /* 18/37.5 */;
                    width: 1.76rem /* 66/37.5 */;
                    text-align: center;
                    .u-box-item-img {
                        display: block;
                        width: 1.76rem /* 66/37.5 */;
                        height: 1.76rem /* 66/37.5 */;
                        border-radius: 0.88rem /* 33/37.5 */;
                        background: #101010;
                    }
                    .u-box-item-name {
                        color: rgba(31, 32, 40, 1);
                        @include setFontSize(12px);
                        font-family: PingFangSC-bold;
                    }
                }
            }
        }
        .g-scroll-book {
            .g-scroll-book-box {
                padding: 0.133333rem /* 5/37.5 */ 0.32rem /* 12/37.5 */;
                width: 26.08rem /* 978/37.5 */;
            }
            .g-box-item {
                margin-right: 0.693333rem /* 26/37.5 */;
            }
        }
        .g-star-video {
            position: relative;
            margin: 0.8rem /* 30/37.5 */ auto;
            width: 7.2rem /* 270/37.5 */;
            height: 3.04rem /* 114/37.5 */;
            background: #101010;
            border-radius: 0.186667rem /* 7/37.5 */;
            .u-video-icon {
                position: absolute;
                left: 50%;
                margin-left: -0.373333rem /* 14/37.5 */;
                top: 50%;
                margin-top: -0.373333rem /* 14/37.5 */;
                width: 0.746667rem /* 28/37.5 */;
                height: 0.746667rem /* 28/37.5 */;
                background: #fff;
                border-radius: 0.373333rem /* 14/37.5 */;
            }
        }
        .g-star-recommend {
            position: relative;
            margin: 0.8rem /* 30/37.5 */ auto;
            width: 7.2rem /* 270/37.5 */;
            height: 3.04rem /* 114/37.5 */;
            background: #101010;
            border-radius: 0.186667rem /* 7/37.5 */;
        }
    }
    footer {
        margin: 1.333333rem /* 50/37.5 */ 0 0.693333rem /* 26/37.5 */ 0;
        .u-look-book {
            margin: auto;
            width: 5.973333rem /* 224/37.5 */;
            height: 0.8rem /* 30/37.5 */;
            border-radius: 0.106667rem /* 4/37.5 */;
            color: rgba(16, 16, 16, 1);
            @include setFontSize(14px);
            text-align: center;
            font-family: PingFang SC;
            border: 1px solid rgba(187, 187, 187, 1);
            line-height: 0.8rem /* 30/37.5 */;
        }
    }
}
</style>

<style lang="scss">
.g-btn {
    .vux-number-input {
        @include setFontSize(14px);
        line-height: 0.533333rem /* 20/37.5 */;
    }
}
</style>
