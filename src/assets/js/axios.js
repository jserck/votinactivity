import axios from 'axios'
import qs from 'qs'
// import {
//         getDAesString,
//         desc
// } from './des'
import {
        url
} from './urlLocation'

export default function ({
        urls = '',
        data = {},
        params = {},
        headers = {},
        methods = 'get',
        responseType = '',
        des = false,
        types = 0,
        token = window.sessionStorage.getItem('token')
}) {

        let baseURL = types == 1 ? url.baseUrl : types == 2 ? url.httpRequests : types == 3 ? url.httpRequestse : types == 4 ? url.consult_url : '';
        let keys = "yhgt!d%sd*aw%dSDSFSsa#mng~dsq";
        let s = {
                token: token,
                body: data
        };
        // axios.defaults.baseURL = url.httpRequestse;
        axios.defaults.headers['Content-Type'] = !responseType ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json;charset=UTF-8'; //此处是增加的代码，设置请求头的类型
        // data.user_token = token || '';
        // params.user_token = token || '';
        // data.requestTime = new Date().getTime();
        // params.requestTime = new Date().getTime();

        switch (methods) {
                case 'get':
                        params = {
                                d: params
                        } || {}
                        break;
                case 'post':
                        if (!responseType) {
                                if (des) {
                                        // data = qs.stringify({
                                        //         d: desc(JSON.stringify(s), keys)
                                        // }) || {}
                                } else {
                                        data = qs.stringify({
                                                d: JSON.stringify(s)
                                        }) || {}
                                }
                        };
                        break;
                default:
                        break;
        }
        let myInterceptor = axios.interceptors.request.use(config => {
                config.timeout = 5 * 1000;
                return config;
        });

        let resq = axios.interceptors.response.use(res => {
                try {
                        if (typeof res.data.data == 'string' && des) {
                                // return JSON.parse(getDAesString(res, keys));
                        } else {
                                return res;
                        }
                } catch (error) {
                        console.log(error);
                }
        }, err => {
                if (err && err.response) {
                        switch (err.response.status) {
                                case 400:
                                        err.message = '请求错误'
                                        break

                                case 401:
                                        err.message = '未授权，请登录'
                                        break

                                case 403:
                                        err.message = '拒绝访问'
                                        break

                                case 404:
                                        err.message = `请求地址出错: ${err.response.config.url}`
                                        break

                                case 408:
                                        err.message = '请求超时'
                                        break

                                case 500:
                                        err.message = '服务器内部错误'
                                        break

                                case 501:
                                        err.message = '服务未实现'
                                        break

                                case 502:
                                        err.message = '网关错误'
                                        break

                                case 503:
                                        err.message = '服务不可用'
                                        break

                                case 504:
                                        err.message = '网关超时'
                                        break

                                case 505:
                                        err.message = 'HTTP版本不受支持'
                                        break

                                default:
                        }
                        console.log(err.message);
                }
        });

        //移除拦截器
        axios.interceptors.request.eject(myInterceptor);
        axios.interceptors.request.eject(resq);

        return axios({
                url: urls,
                baseURL: baseURL,
                //    responseType: responseType,
                data: data,
                params: params,
                headers: headers,
                method: methods,
                withCredentials: true
        })
}