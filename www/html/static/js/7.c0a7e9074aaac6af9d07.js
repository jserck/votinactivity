webpackJsonp([7],{"6ssZ":function(t,s,e){"use strict";var n={render:function(){var t=this.$createElement;return(this._self._c||t)("section",{staticClass:"g-scroll-container",style:"height:"+this.height},[this._t("default")],2)},staticRenderFns:[]};var a=e("VU/8")({props:["height"],data:function(){return{}}},n,!1,function(t){e("wBTH")},"data-v-5287cf9e",null);s.a=a.exports},oEGT:function(t,s){},wBTH:function(t,s){},ysFV:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n={components:{Scroller:e("6ssZ").a},data:function(){return{scrollTop:0,userId:this.$route.query.userId||1,starList:[]}},created:function(){this.getData()},methods:{getData:function(){var t=this,s={urls:"/user/myVoteInfo/"+this.userId,data:{userId:this.userId},methods:"post",types:1,des:!1};this.$http(s).then(function(s){200===s.data.code&&(t.starList=s.data.data.starList)}).catch(function(t){})},hideHandler:function(){},onScroll:function(t){this.scrollTop=t.top}}},a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",[e("section",{staticClass:"g-ViteList"},[e("p",{staticClass:"g-ViteList-tit"},[t._v("我的点赞记录")]),t._v(" "),e("scroller",{attrs:{height:"400px"}},[e("ul",t._l(t.starList,function(s,n){return e("li",{key:n,staticClass:"displayFlex flexAlignItemsCenter flexJustifybetween"},[e("span",{staticClass:"u-img",style:"background:url("+s.starPicUrl+");\n                                    backgroundRepeat:no-repeat;\n                                    backgroundSize:cover"}),t._v(" "),e("span",{staticClass:"u-name"},[t._v(t._s(s.starName))]),t._v(" "),e("span",{staticClass:"u-count"},[t._v(t._s(s.ticketCount))])])}),0)])],1)])},staticRenderFns:[]};var i=e("VU/8")(n,a,!1,function(t){e("oEGT")},"data-v-6b366642",null);s.default=i.exports}});