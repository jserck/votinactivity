<template>
    <section class="m-voting-template">
        <Dialog
            v-if="isShowDialog"
            :dialogType="dialogType"
            :dialogOpations="dialogOpations"
            @isCloase="dialogClose"
            @dialogListenEvent="dialogListenEvent"
            @voteNumChange3="voteNumChange3"
        ></Dialog>
        <section class="u-vote-count" v-if="userTicketCount>0">
            <section class="u-vote-count-box" v-scroll="'scroll'">
                <span>{{userTicketCount}}</span>
                <p>点击去充能</p>
            </section>
        </section>
        <section class="u-rule" @click="ruleHandler"></section>
        <section class="u-myVoteCon-link" @click="myVoteCon"></section>
        <header class="clearfix">
            <section class="u-vote-counts" v-if="userTicketCount<=0">
                <section class="u-vote-count-box" v-scroll="'rule'">
                    <span>{{userTicketCount}}</span>
                    <p>点击去做任务</p>
                </section>
            </section>
            <section class="g-video-container">
                <section class="g-titleImg">
                    <img src="@/assets/img/title.png" alt>
                </section>
                <section class="g-video">
                    <span class="u-left" @click="bannerChange(0)"></span>
                    <span class="u-right" @click="bannerChange(1)"></span>
                    <div class="u-name">
                        <i>领读官</i>
                        <i>{{starName}}</i>
                    </div>
                    <section class="g-video-banner" v-scroll="'star'">
                        <img :src="bannerSrc" alt>
                    </section>
                </section>
                <section class="g-vote-msg">
                    <span>
                        已有
                        <i style="font-size:0.3rem">{{personCount}}</i>人参与加能量，共计领到
                        <i style="font-size:0.3rem">{{bookCount}}</i>本书
                    </span>
                </section>
            </section>
        </header>

        <!-- 投票记录 -->
        <section class="g-myVoteCon" id="scroll">
            <section class="g-vote-list">
                <ul class="displayFlex flexWrap flexJustifybetween">
                    <li v-for="(item,index) in starSoltData2" :key="index">
                        <section class="g-vote-li" @click="addstar(item.starId)">
                            <span
                                v-preload="item.starPicUrl"
                                class="u-img"
                                :style="`background:url(${item.starPicUrl});
                                            backgroundRepeat:no-repeat;
                                            backgroundSize:cover`"
                            ></span>
                            <section>
                                <span class="u-vote-num">领读官&nbsp;&nbsp;{{item.starName}}</span>
                                <span class="u-nums">
                                    <i>{{ticketCountSlice(item.ticketCount)}}</i>&nbsp;阅读能量
                                </span>
                            </section>
                        </section>
                        <section class="g-btn" @click="doVotingHandler(item['starId'])"></section>
                    </li>
                </ul>
            </section>
        </section>
        <!-- 我的选票 -->
        <section class="g-myVote" id="rule">
            <section class="u-myVote-tit diaplayFlex">
                <span></span>
            </section>
            <section class="g-vote-context">
                <section class="g-vote-list">
                    <ul class="displayFlex flexJustifybetween flexAlignItemsCenter flexWrap">
                        <li :class="isFollow!=1?'link-li':'active-li'">
                            <span
                                v-if="isFollow!=1"
                                @click="voteClick(1)"
                                class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                            >
                                <span class="u-icon1"></span>
                                <span class="u-text">关注小程序能量+10</span>
                            </span>
                            <span
                                v-else
                                class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                            >
                                <span class="u-icon1"></span>
                                <span class="u-text">关注小程序能量+10</span>
                            </span>
                        </li>
                        <li :class="isSignIn!=1?'link-li':'active-li'">
                            <span
                                v-if="isSignIn!=1"
                                @click="voteClick(2)"
                                class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                            >
                                <span class="u-icon2"></span>
                                <span class="u-text">每日签到能量+10</span>
                            </span>
                            <span
                                v-else
                                class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                            >
                                <span class="u-icon2"></span>
                                <span class="u-text">每日签到能量+10</span>
                            </span>
                        </li>
                        <li class="link-li">
                            <span
                                class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                @click="voteClick(4)"
                            >
                                <span class="u-icon3"></span>
                                <span class="u-text">阅读1本书能量+10</span>
                            </span>
                        </li>
                        <li class="link-li">
                            <span
                                class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                @click="voteClick(3)"
                            >
                                <span class="u-icon4"></span>
                                <span class="u-text">分享活动能量+10</span>
                            </span>
                        </li>
                    </ul>
                </section>
            </section>
        </section>
        <!-- 明星书单 -->
        <section class="g-star-bookList" id="star">
            <StarBook ref="star_book" @votingStarChange="votingStarChange" @videoPlay="videoPlay"></StarBook>
        </section>
        <footer>
            <section class="g-footer"></section>
        </footer>
    </section>
</template>
<script>
import StarBook from '../common/starbook.vue'
import '../../assets/js/href.js'
import '../../assets/js/ImgPrvLoad.js'
import { setTimeout } from 'timers'

export default {
    components: {
        StarBook: () => import('../common/starbook.vue'),
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
            isFollow: this.$route.query.followed || '2',//是否关注
            isclosefollow: false,
            isSignIn: this.$route.query.isSignIn || '2',//是否签到
            isCanVote: false,//是否可以投票
            isAutoSignIn: false,//是否自动签到
            invitorId: this.$route.query.invitorId || '',//邀请人id
            starId: 0,//记录当前投票明星ID
            nums: 1,//监听投票数
            isFirst: false,//当天是否首次进入
            personCount: 0,
            bookCount: 0,
            isHttp: true,
            timer: null,
            bannerlist: [
                {
                    src: require('@/assets/img/star/wl.png'),
                    bid: '10002',
                    name: '吴磊'
                },
                {
                    src: require('@/assets/img/star/gxs.png'),
                    name: '高晓松',
                    bid: '10000'
                },
                {
                    src: require('@/assets/img/star/sy.png'),
                    bid: '10005',
                    name: '沈月'
                },
                {
                    src: require('@/assets/img/star/wff.png'),
                    bid: '10003',
                    name: '王霏霏'
                },
                {
                    src: require('@/assets/img/star/yyw.png'),
                    bid: '10004',
                    name: '袁娅维'
                },
                {
                    src: require('@/assets/img/star/zxx.png'),
                    bid: '10001',
                    name: '张小娴'
                },
            ],
            bannerNum: 0
        }
    },
    created() {
        this.shareInfoChange()
        this.postTitle()
        this.voteInit()
        // this.timerHandler()
    },
    beforeDestroy() {
        clearInterval(this.timer);
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
        },
        bannerSrc() {
            return this.bannerlist[this.bannerNum].src
        },
        starName() {
            return this.bannerlist[this.bannerNum].name
        }
    },
    methods: {
        ticketCountSlice(ticket) {
            /**
             * @name 能量数过万处理
             * @param ticket 要处理的能量数
            */
            let count = 0;
            let index = 100000;
            if (typeof ticket != 'number' || !ticket) {
                return 0
            }
            if (ticket < index) {
                return ticket
            } else {
                count = (ticket / 10000).toFixed(1);
                return `${count}万`
            }
        },
        votingStarChange(index) {
            this.bannerNum = index;
        },
        bannerChange(type) {
            /**
             * @name 头部明星切换
             * @param 0:left,1:right
            */
            if (type == 0) {
                if (this.bannerNum == 0) {
                    this.bannerNum = 5;
                    return;
                }
                this.bannerNum--
            } else {
                if (this.bannerNum == 5) {
                    this.bannerNum = 0;
                    return;
                }
                this.bannerNum++
            }
            this.$refs.star_book.starChange(this.bannerNum, this.bannerlist[this.bannerNum].bid)
        },
        shareInfoChange() {
            // 适配小程序分享的兼容方法
            try {
                my.postMessage({
                    event: 'shareInfoChange',
                    data: {
                        title: '投票活动',
                        desc: '投票活动',
                        content: '投票活动',
                        imageUrl: 'https://img.dz19.net/forum/201901/04/132545icn959e8xnqxebjn.jpg',
                        bgImgUrl: ''
                    }
                })
            } catch (error) {

            }
        },
        addstar(starId) {
            console.log(starId);
        },
        postTitle() {
            /**
            * @name 传递title到客户端
            */
            try {
                my.postMessage({
                    event: 'setNavigationBar',
                    data: {
                        title: '投票活动页',
                        backgroundColor: ''
                    }
                })
            } catch (error) {
                // this.$toast('title获取失败!')
            }
        },
        timerHandler() {
            /**
             * @name 实时刷新排名列表
            */
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.getStarSolt()
            }, 5000);
        },
        voteInit() {
            /**
             * 数据初始化
            */
            this.getStarSolt()//明星排序
            this.getMyVote()//我的选票
        },
        dialogClose() {
            /**
             * @name 弹窗关闭
            */
            this.nums = 0;
            this.isShowDialog = false
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
                    this.personCount = res.data.data.personCount
                    this.bookCount = res.data.data.bookCount
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
            if (!this.isHttp) return
            let options = {
                urls: '/user/myInfo/' + this.userId + '/' + this.isFollow,
                data: {
                    userId: this.userId,
                    isFollow: this.isFollow,
                    // isSignIn: this.isSignIn
                },
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
                this.isHttp = true
                if (res.data.code === 200) {
                    this.myVoteData = res.data.data
                    this.isCanVote = res.data.data.userTicketCount > 0
                    this.isFirst = res.data.data.isFirst
                    // this.isFollow = (res.data.data.isFollow == 1)
                    this.isSignIn = res.data.data.isSignIn
                    this.isAutoSignIn = res.data.data.isAutoSignIn
                    if (this.isFirst == 1) {
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
                urls: '/user/getBook/' + this.userId + '/' + type,
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
                        if (!res.data.data.id) return
                        this.dialogShow(1, true, {
                            type,
                            bookId: res.data.data.id,
                            bookPicUrl: res.data.data.img,
                            bookName: res.data.data.name,
                            bookWebUrl: res.data.data.bookWebUrl,
                            isSignIn: this.isAutoSignIn
                        });
                    } else {
                        this.dialogShow(1, true, {
                            type,
                            bookId: res.data.data.id,
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
        getTicket(type, bid) {
            /**
             * @name 签到/分享/关注
             * @method post
             * @param userId 用户ID
             * @param type 操作类型(1:关注；2：签到；3：分享)
             */
            let options = {
                urls: '/user/getTicket/' + this.userId + '/' + type,
                data: {
                    userId: this.userId,
                    type
                },
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
                if (res.data.code == 200) {
                    this.userTicketCountChange(1)
                    if (type === 1) {
                        this.isFollow = 1
                        this.dialogShow(4, true)
                    }
                    if (type === 2) {
                        this.isSignIn = true
                        this.dialogShow(7, true)
                    }
                } else if (res.data.code == 17) {
                    if (this.isFollow == 1) return
                    this.isFollow = 1
                    //  this.$toast('已关注')
                } else if (res.data.code == 18) {
                    if (this.isSignIn) return
                    this.isSignIn = true
                    this.$toast('今日已签到')
                } else if (res.data.code == 19) {
                    this.$toast('今日已达上限')
                }
                if (bid) {
                    this.navigatorTocover(obj.bid)
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
                if (res.data.code == 200) {
                    this.userTicketCountChange(0);
                    this.isShowDialog = false
                    this.saveBooks(2)
                    this.dialogShow(8, true, { nums: this.nums })
                    this.getStarSolt()
                } else if (res.data.code == 1003) {
                    this.$toast('当前投票人数过多!')
                }
                // else if (res.data.code == 1002) {
                //     this.$toast('投票未成功!')
                // }
            }).catch((err) => { })
        },
        userTicketCountChange(type) {
            /**
             * @name 当前用户拥有选票的数量变更
             * @param type(1：票数自增，0：票数自减)
            */
            if (type) {
                this.myVoteData['userTicketCount'] += 10
            } else {
                this.myVoteData['userTicketCount'] -= this.nums;
            }
        },
        attentionHandler(bid) {
            /**
             * @name 关注
            */
            try {
                my.postMessage({
                    event: 'followApp',
                    data: {}
                })
            } catch (error) {
                // this.$toast('关注未成功!')
                return;
            }
            this.getTicket(1, bid)
        },
        obshareHandler() {
            /**
             * @name 分享
            */
            try {
                my.postMessage({
                    event: 'shareApp',
                    data: {
                        title: '投票活动',
                        desc: '投票活动',
                        content: '投票活动',
                        imageUrl: 'https://img.dz19.net/forum/201901/04/132545icn959e8xnqxebjn.jpg',
                        bgImgUrl: ''
                    }
                })
            } catch (error) {
                // this.$toast('分享未成功!')
                return;
            }
            this.getTicket(3)
        },
        sugnInHandler() {
            /**
             * @name 签到
            */
            this.getTicket(2)
        },
        navigatorTocover(bid) {
            // 跳转至封面页
            try {
                console.log(`bid=${bid}`);
                console.log(`path:/cover/${bid}`);
                my.postMessage({
                    event: 'navigatorTo',
                    data: { path: `/cover/${bid}`, query: {} }
                });
            } catch (error) {
                // this.$toast('跳转失败!')
            }
        },
        readHandler() {
            /**
             * @name 阅读
            */
            try {
                console.log('booklist');
                // 阅读按钮
                my.postMessage({
                    event: 'navigatorTo',
                    data: { path: 'mw://shelf', query: {} }
                });
            } catch (error) {
                // this.$toast('没有书单!')
            }
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
                    if (obj.eventType == 'fllowReadBtn') {
                        this.isShowDialog = false
                        this.attentionHandler(obj.bid)
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
            this.isCanVote = this.userTicketCount > 0;
            this.starId = starId;
            this.dialogShow(5, true, {
                isCanVote: this.isCanVote,
                nums: this.userTicketCount
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
            this.dialogShow(6, true, { src });
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
    position: relative;
    // padding-bottom: 1.62rem /* 162/100 */;
    // width: 7.5rem;
    height: 32.97rem;
    margin: auto;
    @include background("~@/assets/img/bg.jpeg");
    .u-vote-count,
    .u-vote-counts {
        z-index: 1999;
        //   padding-top: 0.82rem;
        position: fixed;
        left: 0.19rem;
        top: 2.31rem;
        width: 2.25rem;
        height: 1.09rem;
        @include background("~@/assets/img/havevote@2x.png");
        .u-vote-count-box {
            position: absolute;
            top: 0.13rem;
            left: 0.97rem;
            // width: 100px;
            span {
                display: block;
                text-align: center;
                font-style: italic;
                @include setFont(
                    0.4rem,
                    "FZLTZCHJW--GB1-0",
                    900,
                    0.47rem,
                    #9b7351,
                    center
                );
            }
            p {
                @include setFont(
                    0.16rem,
                    "FZLTZCHJW--GB1-0",
                    400,
                    0.16rem,
                    #9b7351,
                    center
                );
            }
        }
    }
    .u-rule {
        position: absolute;
        width: 0.81rem /* 76/100 */;
        height: 0.54rem /* 75/100 */;
        display: inline-block;
        top: 1.29rem;
        right: 0rem;
        z-index: 999;
        @include background("~@/assets/img/rule@2x.png");
    }
    .u-myVoteCon-link {
        position: absolute;
        width: 0.81rem /* 76/100 */;
        height: 0.54rem /* 75/100 */;
        display: inline-block;
        top: 2.01rem;
        right: 0rem;
        z-index: 999;
        @include background("~@/assets/img/history@2x.png");
    }
    header {
        .g-video-container {
            position: relative;
            float: left;
            text-align: center;
            width: 100%;
            .g-titleImg {
                width: 4.1rem /* 410/100 */;
                margin: 0.48rem auto 0;
            }
            .g-vote-msg {
                position: absolute;
                bottom: -0.61rem;
                left: 50%;
                margin-left: -3.065rem;
                // margin: 0.29rem auto 0.43rem;
                width: 6.13rem;
                height: 0.67rem;
                @include setFont(
                    0.22rem,
                    "FZLTZCHJW--GB1-0",
                    normal,
                    0.67rem,
                    #ffd8a1,
                    center
                );
                @include background("~@/assets/img/tit@2x.png");
            }

            .g-video {
                position: relative;
                width: 100%;
                .u-left,
                .u-right {
                    position: absolute;
                    top: 50%;
                    margin-top: -0.38rem;
                    display: inline-block;
                    width: 0.41rem;
                    height: 0.76rem;
                    @include background("~@/assets/img/r.png");
                }
                .u-left {
                    left: 0.41rem;
                    transform: rotate(180deg);
                    -ms-transform: rotate(180deg); /* IE 9 */
                    -moz-transform: rotate(180deg); /* Firefox */
                    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
                    -o-transform: rotate(180deg);
                }
                .u-right {
                    right: 0.41rem;
                }
                .u-name {
                    position: absolute;
                    display: inline-block;
                    width: 0.2rem;
                    right: 1.65rem;
                    top: 1.48rem;
                    @include setFont(
                        0.2rem,
                        "NotoSerifCJKsc-Medium",
                        500,
                        0.22rem,
                        #fff0c2,
                        center
                    );
                    & i:nth-child(2) {
                        display: inline-block;
                        margin-top: 0.1rem;
                    }
                }
                .g-video-banner {
                    overflow: hidden;
                    position: relative;
                    margin: 0.22rem auto 0;
                    width: 3.75rem;
                    height: 4.03rem;
                    border-radius: 0.07rem;
                    color: #fff;
                }
            }
        }
    }
    .g-myVoteCon {
        margin: 0.82rem auto 0;
        .g-vote-list {
            ul {
                padding: 0 0.34rem;
                li {
                    .g-vote-li {
                        overflow: hidden;
                        width: 2.26rem;
                        height: 3.98rem;
                        @include background("~@/assets/img/starvote@2x.png");
                    }
                    span {
                        display: block;
                    }
                    .u-img {
                        margin: 0.2rem auto 0;
                        width: 1.73rem /* 165/100 */;
                        height: 2.71rem /* 191/100 */;
                        background-size: cover !important;
                        background-repeat: no-repeat !important;
                    }
                    .u-vote-num {
                        display: block;
                        margin-top: 0.1rem /* 4/100 */;
                        font-style: italic;
                        @include setFont(
                            0.19rem,
                            "NotoSerifCJKsc-Black",
                            900,
                            auto,
                            #935022,
                            center
                        );
                    }
                    .u-nums {
                        text-align: center;
                        i {
                            font-style: italic;
                            @include setFont(
                                0.24rem,
                                "SourceHanSansCN-Heavy",
                                800,
                                0.23rem,
                                #6b2f05,
                                center
                            );
                        }
                        @include setFont(
                            0.15rem,
                            "SourceHanSansCN-Medium",
                            500,
                            0.36rem,
                            #6b2f05,
                            normal
                        );
                    }
                }
            }
            .g-btn {
                margin: 0 auto 0.28rem;
                width: 2.02rem;
                height: 0.75rem;
                @include setFont(
                    0.14rem,
                    "PingFang SC",
                    normal,
                    0.3rem,
                    #000,
                    center
                );
                @include background("~@/assets/img/addvote@2x.png");
            }
        }
    }
    .g-myVote {
        position: relative;
        margin: 0.42rem auto 0;
        .u-myVote-tit {
            span {
                margin: auto;
                display: block;
                width: 4.15rem;
                height: 0.7rem;
                @include background("~@/assets/img/myvotenum@2x.png");
            }
        }
        .g-vote-context {
            margin: 0 auto 0;
            overflow: hidden;
            border-radius: 0.1rem;
            .g-vote-list {
                padding: 0 0.37rem /* 37/100 */;
                ul {
                    // height: 1.51rem /* 151/100 */;
                    .link-li,
                    .active-li {
                        position: relative;
                        margin-top: 0.33rem;
                        width: 3.15rem;
                        height: 0.75rem /* 62/100 */;
                        @include background("~@/assets/img/nengliangbtn.png");
                        .u-text {
                            // margin-right: 0.36rem;
                            @include setFont(
                                0.23rem,
                                "FZLTCHJW--GB1-0",
                                400,
                                auto,
                                #8c5b35,
                                normal
                            );
                        }
                        .u-ticketbtn {
                            margin: 0.17rem auto 0;
                        }
                        .u-icon1 {
                            margin-right: 0.12rem;
                            display: inline-block;
                            width: 0.25rem;
                            height: 0.25rem;
                            @include background("~@/assets/img/people@2x.png");
                        }
                        .u-icon2 {
                            margin-right: 0.12rem;
                            display: inline-block;
                            width: 0.25rem;
                            height: 0.25rem;
                            @include background("~@/assets/img/duigou@2x.png");
                        }
                        .u-icon3 {
                            margin-right: 0.12rem;
                            display: inline-block;
                            width: 0.25rem;
                            height: 0.25rem;
                            @include background("~@/assets/img/book@2x.png");
                        }
                        .u-icon4 {
                            margin-right: 0.12rem;
                            display: inline-block;
                            width: 0.25rem;
                            height: 0.25rem;
                            @include background("~@/assets/img/fanhui@2x.png");
                        }
                    }
                    .active-li {
                        position: relative;
                        margin-top: 0.33rem;
                        width: 3.05rem;
                        height: 0.6rem /* 62/100 */;
                        @include background("~@/assets/img/activebtn.png");
                        .u-text {
                            color: #fff;
                        }
                        .u-ticketbtn {
                            margin: 0.17rem auto 0;
                        }
                        .u-icon1 {
                            @include background(
                                "~@/assets/img/a_people@2x.png"
                            );
                        }
                        .u-icon2 {
                            @include background(
                                "~@/assets/img/a_duigou@2x.png"
                            );
                        }
                        .u-icon3 {
                            @include background("~@/assets/img/a_book@2x.png");
                        }
                        .u-icon4 {
                            @include background(
                                "~@/assets/img/a_fanhui@2x.png"
                            );
                        }
                    }
                }
            }
        }
    }
    .g-star-bookList {
        margin-top: 0.8rem;
    }
    .g-footer {
        margin: auto;
        width: 3.77rem;
        height: 0.51rem;
        @include background("~@/assets/img/logo.png");
    }
}
</style>
