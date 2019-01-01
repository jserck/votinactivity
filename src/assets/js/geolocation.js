
import Http from './axios'

let d_city = '';
let one_val = '';

export function f_get_dizhi(options) {
     return new Promise((resolve, reject) => {
          let url = `/api/v3/geocode/regeo?key=1e299bf9e95f5cb9f5787eb00e4ef4e3&location=${options}`;
          let option = {
               urls: url,
               methods: 'get',
               data: {},
               des: false,
               types: ''
          };

          Http(option).then(res => {
               let re = res.data.regeocode.addressComponent;
               if (
                    re.province == "北京市" ||
                    re.province == "上海市" ||
                    re.province == "天津市" ||
                    re.province == "重庆市"
               ) {
                    d_city = re.province;
                    one_val = re.province;
               } else {
                    d_city = re.district;
                    one_val = re.district;
               }
               resolve({
                    d_city,
                    one_val
               });
          }).catch(err => {
               reject(err);
          });
     });
     // start

     // end
};

export function keyUpSearch(city) {
     // start
     return new Promise((resolve, reject) => {

          let mapObj = new AMap.Map("amapDemo", {
               center: [0, 0],
               zoom: 6
          });

          mapObj.plugin(["AMap.Geolocation"], function () {
               let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,                     //  是否使用高精度定位，默认:true
                    timeout: 10000,                    //  超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,                        // 定位结果缓存0毫秒，默认：0
                    convert: true,                     // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,                     //  显示定位按钮，默认：true
                    buttonPosition: "LB",                     // 定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),   //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,                     //  定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,                     //  定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,                     //  定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true                      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
               });
               mapObj.addControl(geolocation);
               geolocation.getCurrentPosition();
               AMap.event.addListener(geolocation, "complete", result => {
                    let op = result.position.lng + "," + result.position.lat;
                    if (!city) {
                         resolve(op);
                         // f_get_dizhi(op);
                    }
               }); //  返回定位信息
               AMap.event.addListener(geolocation, "error", result => {
                    reject(result);
               }); //  返回定位出错信息
          });

     });
     // end
}
