<template>
    <section v-if="isVoteStatus">
        <section v-if="isVoting" class="m-voting-template" v-timeoutLazy="bg_min_src">
            <Dialog
                v-if="isShowDialog"
                :dialogType="dialogType"
                :dialogOpations="dialogOpations"
                :userId="userId"
                @isCloase="dialogClose"
                @dialogListenEvent="dialogListenEvent"
                @voteNumChange3="voteNumChange3"
            ></Dialog>
            <section class="u-vote-count" v-scroll="'rule'" @click="census(3)">
                <section class="u-vote-count-box">
                    <span>{{userTicketCount}}</span>
                    <p>点击获得能量</p>
                </section>
            </section>
            <section class="u-rule" @click="ruleHandler"></section>
            <section class="u-myVoteCon-link" @click="myVoteCon"></section>
            <header>
                <section class="g-video-container">
                    <section class="g-titleImg">
                        <img src="@/assets/img/title.png" alt>
                    </section>
                    <section class="g-video">
                        <span class="u-left" @click="bannerChange(0)">
                            <span class="u-left-icon"></span>
                        </span>
                        <span class="u-right" @click="bannerChange(1)">
                            <span class="u-right-icon"></span>
                        </span>
                        <div class="u-name">
                            <i>领读官</i>
                            <i>{{starName_header}}</i>
                        </div>
                        <section class="g-video-banner" v-scroll="'star'">
                            <section class="g-video-box">
                                <img
                                    :src="bannerSrc"
                                    @click="census(1,bannerlist[bannerNum].bid)"
                                    alt
                                >
                            </section>
                        </section>
                    </section>
                    <section class="g-vote-msg">
                        <span>
                            已有
                            <i>{{personCount}}</i>人参与加能量，共计领到
                            <i>{{bookCount}}</i>本书
                        </span>
                    </section>
                </section>
            </header>

            <!-- 投票记录 -->
            <section class="g-myVoteCon" id="scroll">
                <section class="g-vote-list">
                    <ul class="displayFlex flexWrap flexJustifybetween">
                        <li v-for="(item,index) in starSoltData2" :key="index">
                            <section class="g-vote-li">
                                <span
                                    class="u-img"
                                    :style="`background:url(${item.starPicUrl});
                                            backgroundRepeat:no-repeat;
                                            backgroundSize:cover`"
                                ></span>
                                <section>
                                    <span
                                        :id="index == 4 ? 'rule':''"
                                        class="u-vote-num"
                                    >领读官&nbsp;&nbsp;{{item.starName}}</span>
                                    <span class="u-nums">
                                        <i>{{item.ticketCount}}</i>&nbsp;阅读能量
                                    </span>
                                </section>
                            </section>
                            <section
                                :class="index<3?'g-btn':'g-btn2'"
                                @click="doVotingHandler(item['starId'],item['starName'])"
                            >
                                <span>
                                    <i class="u-icon">
                                        <img src="@/assets/img/sd.png" alt>
                                    </i>&nbsp;加能量&nbsp;&nbsp;领好书
                                </span>
                            </section>
                        </li>
                    </ul>
                </section>
            </section>
            <!-- 我的选票 -->
            <section class="g-myVote">
                <section class="u-myVote-tit diaplayFlex">
                    <span></span>
                </section>
                <section class="g-vote-context">
                    <section class="g-vote-list">
                        <ul class="displayFlex flexJustifybetween flexAlignItemsCenter flexWrap">
                            <li
                                :class="isFollow!=1?touch1:'active-li'"
                                @touchend="mousedownHandler($event,0,1)"
                                @touchstart="mousedownHandler($event,1,1)"
                            >
                                <span
                                    v-if="isFollow!=1"
                                    @click="voteClick(1)"
                                    class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                >
                                    <span class="u-icon1"></span>
                                    <span
                                        class="u-text displayFlex flexJustifybetween flexAlignItemsCenter"
                                    >
                                        <span>关注小程序能量+</span>
                                        <i>10</i>
                                    </span>
                                </span>
                                <span
                                    v-else
                                    class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                >
                                    <span class="u-icon1"></span>
                                    <span
                                        class="u-text displayFlex flexJustifybetween flexAlignItemsCenter"
                                    >
                                        关注小程序能量+
                                        <i>10</i>
                                    </span>
                                </span>
                            </li>
                            <li
                                :class="isSignIn!=1?touch2:'active-li'"
                                @touchend="mousedownHandler($event,0,2)"
                                @touchstart="mousedownHandler($event,1,2)"
                            >
                                <span
                                    v-if="isSignIn!=1"
                                    @click="voteClick(2)"
                                    class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                >
                                    <span class="u-icon2"></span>
                                    <span
                                        class="u-text displayFlex flexJustifybetween flexAlignItemsCenter"
                                    >
                                        每日签到能量+
                                        <i>10</i>
                                    </span>
                                </span>
                                <span
                                    v-else
                                    class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                >
                                    <span class="u-icon2"></span>
                                    <span
                                        class="u-text displayFlex flexJustifybetween flexAlignItemsCenter"
                                    >
                                        每日签到能量+
                                        <i>10</i>
                                    </span>
                                </span>
                            </li>
                            <li
                                :class="touch4"
                                @touchend="mousedownHandler($event,0,4)"
                                @touchstart="mousedownHandler($event,1,4)"
                            >
                                <span
                                    class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                    @click="voteClick(4)"
                                >
                                    <span class="u-icon3"></span>
                                    <span
                                        class="u-text displayFlex flexJustifybetween flexAlignItemsCenter"
                                    >
                                        读书架上的1本书能量+
                                        <i>10</i>
                                    </span>
                                </span>
                            </li>
                            <li
                                :class="touch3"
                                @touchend="mousedownHandler($event,0,3)"
                                @touchstart="mousedownHandler($event,1,3)"
                            >
                                <span
                                    class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                    @click="voteClick(3)"
                                >
                                    <span class="u-icon4"></span>
                                    <span
                                        class="u-text displayFlex flexJustifybetween flexAlignItemsCenter"
                                    >
                                        分享活动能量+
                                        <i>10</i>
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </section>
                </section>
            </section>
            <!-- 明星书单 -->
            <section class="g-star-bookList" id="star">
                <StarBook
                    ref="star_book"
                    :userId="userId"
                    @votingStarChange="votingStarChange"
                    @videoPlay="videoPlay"
                ></StarBook>
            </section>
            <footer>
                <section class="g-footer"></section>
            </footer>
        </section>
        <section v-else>
            <Voted></Voted>
        </section>
    </section>
</template>
<script>

import '../../assets/js/timeoutLazy'
import '../../assets/js/href.js'
import { setTimeout } from 'timers'
import Cookies from 'js-cookie'

export default {
    components: {
        Voted: () => import('../voted/voted.vue'),
        StarBook: () => import('../common/starbook.vue'),
        Dialog: () => import('../common/dialog.vue'),
    },
    data() {
        return {
            touch3: 'link-li',
            touch4: 'link-li',
            touch2: 'link-li',
            touch1: 'link-li',
            readVal: 0,
            isVoting: true,
            isVoteStatus: false,
            myVoteData: {
                userTicketCount: null
            },//我的投票纪录
            bg_min_src: require('@/assets/img/bg.jpeg'),
            userId: this.$route.query.userId || null,
            starSoltData: [
                {}, {}, {}, {}, {}, {}
            ],//明星排序数据
            dialogOpations: {},//传递给dialog的数据
            dialogType: 0,//dialog内容类型
            isShowDialog: false,//dialog显示隐藏
            isFollow: this.$route.query.followed || '2',//是否关注
            tsid: this.$route.query.tsid || '',
            isclosefollow: false,
            isSignIn: this.$route.query.isSignIn || '2',//是否签到
            isCanVote: false,//是否可以投票
            isAutoSignIn: false,//是否自动签到
            invitorId: this.$route.query.invitorId || '',//邀请人id
            starId: 0,//记录当前投票明星ID
            starName: '',
            nums: 1,//监听投票数
            isFirst: false,//当天是否首次进入
            personCount: 0,
            bookCount: 0,
            isHttp: true,
            timer: null,
            isInter: true,
            isReadHandler: true,
            votingTime: '2019/01/06 00:00',
            votedTime: '2019/02/06 00:00',
            bannerlist: [
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
                {
                    src: require('@/assets/img/star/wl.png'),
                    bid: '10002',
                    name: '吴磊'
                },
                {
                    src: require('@/assets/img/star/sy.png'),
                    bid: '10005',
                    name: '沈月'
                },
                {
                    src: require('@/assets/img/star/mby.png'),
                    name: '马伯庸',
                    bid: '10000'
                },
            ],
            bannerNum: 3
        }
    },
    created() {
        this.getStarSolt(1, 'voted')
        this.preLoad()
        this.setCookie()
        this.voteInit()
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
        starName_header() {
            return this.bannerlist[this.bannerNum].name
        }
    },
    methods: {
        preLoad() {
            let count = 0;
            let len = this.bannerlist.length;
            for (let i = 0; i < len; i++) {
                let img = document.createElement('img');
                img.onload = function () {
                    if (count == len - 1) {
                        console.log('头图加载完成');
                        return;
                    };
                    count++;
                }
                img.src = this.bannerlist[i].src;
            }
        },
        isVoted(newDa) {
            if (newDa == 3) {// 判断是否结束
                this.isVoting = false;
            }
        },
        setCookie() {
            if (!this.userId && this.isVoting) {
                this.userId = Cookies.get('userId');
                this.tsid = Cookies.get('tsid');
                this.isFollow = Cookies.get('isFollow');
            } else {
                Cookies.set('userId', this.userId);
                Cookies.set('tsid', this.tsid);
                Cookies.set('isFollow', this.isFollow);
            }
        },
        mousedownHandler(e, type, num) {
            if (type) {
                this[`touch${num}`] = 'active-li'
            } else {
                this[`touch${num}`] = 'link-li'
            }
        },
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
                    this.$refs.star_book.starChange(this.bannerNum, this.bannerlist[this.bannerNum].bid)
                    return;
                }
                this.bannerNum--;
            } else {
                if (this.bannerNum == 5) {
                    this.bannerNum = 0;
                    this.$refs.star_book.starChange(this.bannerNum, this.bannerlist[this.bannerNum].bid)
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
                        desc: '为爱豆集能量，百万好书免费读',
                        content: '投票活动',
                        imageUrl: 'http://activity.cun-tu.cn/wl_share.png',
                        bgImgUrl: ''
                    }
                })
            } catch (error) {

            }
        },
        census(type, starId = 0) {
            /**
            * @name 打点
            * @method post
            * @param userId 用户ID
            * @param type 类型
            * @param starId 明星id
            */
            let options = {
                urls: 'user/point/' + this.userId + '/' + type + '/' + starId,
                data: {
                    userId: this.userId,
                    type,
                    starId
                },
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
            }).catch((err) => { })
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
                this.getStarSolt(2)
            }, 5000);
        },
        voteInit() {
            /**
             * 数据初始化
            */
            this.postTitle()
            this.shareInfoChange()
            this.getMyVote()//我的选票
            this.getStarSolt(1)//明星排序
            this.timerHandler()
        },
        dialogClose(val) {
            /**
             * @name 弹窗关闭
            */
            this.nums = 0;
            this.isShowDialog = false;
            switch (val) {
                case 1:
                    this.isReadBook();
                    break;
                case 9:
                    // if (this.isFirst == 1) {
                    //     this.saveBooks(1)
                    // }
                    break;
                default:
                    break;
            }
        },
        voteNumChange3(val) {
            /**
             * @name 监听投票数
            */
            this.nums = val
        },
        isReadBook() {
            let itmer = setTimeout(() => {
                if (this.readVal != 0 && this.isShowDialog == false) {
                    this.dialogShow(9, true, {
                        //阅读
                        bookNum: this.readVal
                    });
                    this.readVal = 0;
                }
                clearTimeout(itmer);
            }, 500)
        },
        getStarSolt(type, isVoted) {
            /**
             * @name 获取明星排名列表接口
             * @method post
             * @param null
             */
            let options = {
                urls: '/starRankingInfo/' + this.userId + '/' + type,
                data: {},
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
                if (res.data.code === 200) {
                    this.isVoted(res.data.data.activityStatus);
                    if (isVoted == 'voted') {
                        if (!this.isVoteStatus) {
                            this.isVoteStatus = true;
                        }
                        return;
                    }
                    this.starSoltData = res.data.data.starList
                    this.personCount = res.data.data.personCount
                    this.bookCount = res.data.data.bookCount
                    this.readVal = res.data.data.readVal || 0
                    this.myVoteData['userTicketCount'] = res.data.data.userTicketCount
                    if (this.isFirst == 1) return;
                    this.isReadBook();
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
            if (!this.isHttp) return;
            let options = {
                urls: '/user/myInfo/' + this.userId + '/' + this.isFollow + '/' + this.tsid,
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
                this.isInter = true
                if (res.data.code === 200) {
                    this.myVoteData = res.data.data
                    this.isCanVote = res.data.data.userTicketCount > 0
                    this.isFirst = res.data.data.isFirst
                    this.isSignIn = res.data.data.isSignIn
                    this.isAutoSignIn = res.data.data.isAutoSignIn
                    if (this.isFirst == 1) {
                        this.saveBooks(1)
                    }
                }
            }).catch((err) => { })

        },
        saveBooks(type, starId) {
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
                        try {
                            this.dialogShow(1, true, {
                                type,
                                bookId: res.data.data.id,
                                bookPicUrl: res.data.data.img,
                                bookName: res.data.data.name,
                                bookWebUrl: res.data.data.bookWebUrl,
                                isSignIn: this.isAutoSignIn
                            });
                            this.isFirst = 2;
                        } catch (error) {
                            console.log(error);
                            return;
                        }
                    } else {
                        console.log(res);
                        try {
                            this.dialogShow(1, true, {
                                type,
                                bookId: res.data.data.id,
                                bookPicUrl: res.data.data.img,
                                bookName: res.data.data.name,
                                bookWebUrl: res.data.data.bookWebUrl,
                                nums: this.nums,
                                starId: this.starId,
                                userTicketCount: this.userTicketCount,
                                starName: this.starName
                            });
                        } catch (error) {
                            this.dialogShow(8, true, { nums: this.nums, starName: this.starName })
                        }
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
                urls: '/user/getTicket/' + this.userId + '/' + type + '/' + this.tsid,
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
                    if (type === 1) {
                        this.userTicketCountChange(1)
                        this.isFollow = 1
                        this.dialogShow(4, true)
                    }
                    if (type === 2) {
                        this.userTicketCountChange(1)
                        this.isSignIn = true
                        this.dialogShow(7, true)
                    }
                    if (type == 3) {
                        this.obshareHandler();
                        //     setTimeout(() => {
                        //         this.userTicketCountChange(1);
                        //     }, 3000);
                        //     return;
                    }
                } else if (res.data.code == 17) {
                    if (this.isFollow == 1) return
                    this.isFollow = 1
                    //  this.$toast('已关注')
                } else if (res.data.code == 18) {
                    if (this.isSignIn) return
                    this.isSignIn = true
                    // this.$toast('今日已签到')
                } else if (res.data.code == 19) {
                    this.$toast('今日已达上限')
                    let timer = setTimeout(() => {
                        this.obshareHandler();
                        clearTimeout(timer);
                    }, 1100);
                }
                this.followedRead(bid)
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
                    nums: this.nums,
                    tsid: this.tsid
                },
                methods: 'post',
                types: 1,
                des: false,
                responseType: 1
            }
            this.$http(options).then((res) => {
                if (res && res.message == '网络错误') {
                    this.$toast('网络已断开');
                    return;
                }
                if (res.data.code == 200) {
                    this.userTicketCountChange(0);
                    this.isShowDialog = false;
                    this.saveBooks(2, this.starId)
                    this.getStarSolt(1)
                } else if (res.data.code == 1003) {
                    this.$toast('当前投票人数过多!')
                } else if (res.data.code == 20) {
                    this.$toast('活动未开始!')
                } else if (res.data.code == 23) {
                    this.getStarSolt(1)
                    this.$toast('能量不足!')
                }
                // else if (res.data.code == 1002) {
                //     this.$toast('投票未成功!')
                // }
            }).catch((err) => {
                console.log(err);
            })
        },
        userTicketCountChange(type) {
            /**
             * @name 当前用户拥有选票的数量变更
             * @param type(1：票数自增，0：票数自减)
            */
            if (type) {
                this.myVoteData['userTicketCount'] += 10
            } else {
                if (this.myVoteData['userTicketCount'] - this.nums < 0) {
                    this.myVoteData['userTicketCount'] = 0;
                }
                this.myVoteData['userTicketCount'] -= this.nums;
            }
        },
        attentionHandler(bid) {
            /**
             * @name 关注
            */
            try {
                console.log('关注');
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
                console.log('shareApp');
                my.postMessage({
                    event: 'shareApp',
                    data: {
                        title: '投票活动',
                        desc: '为爱豆集能量，百万好书免费读',
                        content: '投票活动',
                        imageUrl: 'http://activity.cun-tu.cn/wl_share.png',
                        bgImgUrl: ''
                    }
                })
            } catch (error) {
                // this.$toast('分享未成功!')
                return;
            }
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
                    data: { path: `/shelf`, query: {} }
                });
            } catch (error) {
                // this.$toast('没有书单!')
            }
        },
        voteClick(type) {
            this.census(13)
            if (this.isReadHandler) {
                this.isReadHandler = false;
                let timer = setTimeout(() => {
                    this.isReadHandler = true;
                    clearTimeout(timer);
                }, 1000);
            } else {
                return;
            }
            if (type === 1) {
                this.attentionHandler()
            } else if (type === 2) {
                // 签到
                this.sugnInHandler()
            } else if (type === 3) {
                // 分享
                this.getTicket(3)
            } else {
                // 阅读
                this.readHandler()
            }
        },

        followedRead(bid) {
            if (!bid) return;
            let itmer = setTimeout(() => {
                this.isShowDialog = false;
                this.navigatorTocover(bid);
            }, 700)
        },
        dialogListenEvent(obj) {
            /**
             * dialog关闭事件处理
             */
            switch (obj.type) {
                case 1:

                    if (obj.eventType == 'dialogComponentEvent') {
                        //关闭
                        this.isShowDialog = false
                    }
                    if (obj.eventType == 'fllowReadBtn') {
                        //关注阅读
                        if (this.userTicketCount <= 0) {
                            this.census(10)
                        } else {
                            this.census(12)
                        }
                        this.isShowDialog = false;
                        if (this.isFollow != 1) {
                            this.attentionHandler(obj.bid)
                            return;
                        }
                        this.followedRead(obj.bid);
                    }
                    this.isReadBook();
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
                case 9:
                    if (obj.eventType == 'dialogComponentEvent') {
                        this.isShowDialog = false
                        // if (this.isFirst == 1) {
                        //     this.saveBooks(1)
                        //     return;
                        // }
                    }
                    break;
                default:
                    break;
            }
        },
        doVotingHandler(starId, starName) {
            /**
            * 投票
            */
            this.isCanVote = this.userTicketCount > 0;
            this.starId = starId;
            this.starName = starName;
            this.dialogShow(5, true, {
                isCanVote: this.isCanVote,
                nums: this.userTicketCount
            });
            this.census(4, starId)
            if (!this.isCanVote) {
                this.census(7, starId)
            }
        },

        ruleHandler() {
            /**
             * 查看规则
             */
            this.census(2)
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
            if (this.isShowDialog) {
                this.isShowDialog = false
            }
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
    @include background("~@/assets/img/bg_min.jpg");
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
        width: 1.07rem /* 76/100 */;
        height: 0.75rem /* 75/100 */;
        display: inline-block;
        top: 1.06rem;
        right: 0rem;
        z-index: 999;
        @include background("~@/assets/img/rule@2x.png");
        @media screen and (max-width: 320px) {
            width: 1.3rem /* 76/100 */;
            height: 0.85rem /* 75/100 */;
        }
    }
    .u-myVoteCon-link {
        position: absolute;
        width: 1.07rem /* 76/100 */;
        height: 0.75rem /* 75/100 */;
        display: inline-block;
        top: 2.19rem;
        right: 0rem;
        z-index: 999;
        @include background("~@/assets/img/history@2x.png");
        @media screen and (max-width: 320px) {
            width: 1.3rem /* 76/100 */;
            height: 0.85rem /* 75/100 */;
        }
    }
    header {
        .g-video-container {
            position: relative;

            text-align: center;
            width: 100%;
            .g-titleImg {
                width: 4.1rem /* 410/100 */;
                margin: auto;
                padding-top: 0.48rem;
            }
            .g-vote-msg {
                position: absolute;
                bottom: -0.04rem;
                left: 50%;
                margin-left: -3.25rem;
                //margin-left: -3.065rem;
                // margin: 0.29rem auto 0.43rem;
                width: 6.5rem;
                height: 0.67rem;
                @include setFont(
                    0.22rem,
                    "FZLTZCHJW--GB1-0",
                    normal,
                    0.67rem,
                    #ffffff,
                    center
                );
                @include background("~@/assets/img/tit@2x.png");
                i {
                    padding: 0 0.08rem 0 0;
                    @include setFont(
                        0.32rem,
                        "FZLTZCHJW--GB1-0",
                        bold,
                        0.67rem,
                        #ffd8a1,
                        center
                    );
                    font-style: italic;
                }
            }

            .g-video {
                position: relative;
                width: 100%;
                .u-left,
                .u-right {
                    position: absolute;
                    bottom: 1.59rem;
                }
                .u-left-icon,
                .u-right-icon {
                    display: inline-block;
                    margin: 0.3rem;
                    width: 0.46rem;
                    height: 0.86rem;
                    @include background("~@/assets/img/r.png");
                }
                .u-left {
                    left: 0.3rem;
                    transform: rotate(180deg);
                    -ms-transform: rotate(180deg); /* IE 9 */
                    -moz-transform: rotate(180deg); /* Firefox */
                    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
                    -o-transform: rotate(180deg);
                }
                .u-right {
                    right: 0.2rem;
                }
                .u-name {
                    position: absolute;
                    display: inline-block;
                    width: 0.2rem;
                    right: 1.45rem;
                    top: 1.81rem;
                    @include setFont(
                        0.2rem,
                        "NotoSerifCJKsc-Medium",
                        500,
                        0.24rem,
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
                    margin: auto;
                    width: 4.45rem;
                    height: 4.84rem;
                    border-radius: 0.07rem;
                    .g-video-box {
                        position: absolute;
                        top: 0;
                        img {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
    .g-myVoteCon {
        margin: 0.4rem auto 0;
        .g-vote-list {
            ul {
                padding: 0 0.45rem;
                li {
                    .g-vote-li {
                        // overflow: hidden;
                        padding-top: 0.14rem;
                        margin-bottom: 0.21rem;
                        width: 1.96rem;
                        height: 3.5rem;
                        box-shadow: 0 0.1rem 0.2rem 0 rgba(146, 0, 0, 0.3);
                        -webkit-box-shadow: 0 0.1rem 0.2rem 0
                            rgba(146, 0, 0, 0.3);
                        @include background("~@/assets/img/starvote@2x.png");
                    }
                    span {
                        display: block;
                    }
                    .u-img {
                        margin: auto;
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
                                bold,
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
            .g-btn,
            .g-btn2 {
                margin: 0 auto 0.28rem;
                width: 2.02rem;
                height: 0.75rem;
                @include setFont(
                    0.2rem,
                    "SourceHanSansCN-Medium",
                    500,
                    0.7rem,
                    #8c5b35,
                    center
                );
                @include background("~@/assets/img/addvote@2x.png");
                i {
                    display: inline-block;
                    width: 0.12rem;
                    img {
                        width: 100%;
                        vertical-align: middle;
                    }
                }
            }
            .g-btn2 {
                @include background("~@/assets/img/addvote_2.png");
            }
        }
    }
    .g-myVote {
        position: relative;
        margin: 0.55rem auto 0;
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
                                0.21rem,
                                "FZLTCHJW--GB1-0",
                                400,
                                auto,
                                #8c5b35,
                                normal
                            );
                            i {
                                font-size: 0.28rem;
                                font-weight: 500;
                                color: #8c5b35;
                            }
                        }
                        .u-ticketbtn {
                            height: 0.4rem;
                            line-height: 0.4rem;
                            margin: 0.14rem auto 0;
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
                            i {
                                color: #fff;
                            }
                        }
                        .u-ticketbtn {
                            margin: 0.14rem auto 0;
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
