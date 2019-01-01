/**
 * Created by lenovo on 2018/3/21.
 */
export default {
     is_iph() {
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
               return true;
          }
     },
     is_az() {
          if (navigator.userAgent.match(/android/i)) {
               return true;
          }
     },
     is_Weixin() {
          var ua = navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
               return true;
          } else {
               return false;
          }
     },
     isQq() {
          var ua = navigator.userAgent.toLowerCase();
          if (ua.indexOf(' qq/') > -1) {
               return true;
          } else {
               return false;
          }
     },
     is_WeiBo() {
          var ua = navigator.userAgent.toLowerCase();
          if (ua.match(/WeiBo/i) == "weibo") {
               return true;
          } else {
               return false;
          }
     },
     localPut(key, data, tme) {
          try {
               var time;
               if (!localStorage) {
                    return false;
               }
               if (!time || isNaN(time)) {
                    time = tme;
               }
               var cacheExpireDate = (new Date() - 1) + time * 1000;
               var cacheVal = {
                    val: data,
                    exp: cacheExpireDate
               };

               localStorage.setItem(key, JSON.stringify(cacheVal)); //存入缓存
          } catch (e) {
               localStorage.removeItem(key);
               return false;
          }
     },
     locaGet(key) {
          try {
               if (!localStorage) {
                    return false;
               }
               var cacheVal = localStorage.getItem(key);
               var result = JSON.parse(cacheVal);
               var now = new Date() - 1;
               if (!result) {
                    return false;
               } else {
                    if (now > result.exp) { //缓存过期
                         localStorage.removeItem(key);
                         return false;
                    } else {
                         return true;
                    }
               }
          } catch (e) {
               localStorage.removeItem(key);
               return false;
          }
     },
     //手机验证
     checkMobile(str) {
          var re = /^1\d{10}$/;

          if (!re.test(str)) {
               return false;
          } else {
               return true;
          }
     },
};
