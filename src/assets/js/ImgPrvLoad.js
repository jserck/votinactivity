/**
 * Created by lenovo on 2018/6/1.
 */


//封装简单的图片预加载

export default function (arrImg) {
     return new Promise(resolve => {
          if (!arrImg) {
               throw 'arrImg不存在';
          }
          let len = arrImg.length;
          let count = 0;
          for (let i = 0; i < len; i++) {
               let img = new Image();
               img.onload = function () {
                    count++;
                    if (count == len) {
                         console.log('图片加载完成...');
                         resolve();
                    }
               };
               img.src = arrImg[i];
          }
     });
}
