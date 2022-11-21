import axios from "axios";
import { ElMessage  } from 'element-plus'
// import { getToken } from '@/utils/auth'
// import { getToken } from '@/utils/auth'
 
export const Axios = (url: any,method='get',params={},headers: { [x: string]: any; })=>{
    // 根据定义的环境状态，切换不同的 baseURL 开发环境使用代理, 生产环境可以直接使用域名全拼
    const BaseUrl = process.env.NODE_ENV==='development'? '' : process.env.BASEURL;
    let defaultHeaders:any = {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', // 指定提交方式为表单提交 或上传
        // 'Content-Type' :'multipart/form-data;charset=UTF-8',
        'Accept': 'application/json', // 通过头指定，获取的数据类型是JSON
        // 'Access-Control-Allow-Origin': 'true',
        // 'Access-Control-Allow-Credentials': 'true',
    }
 
    if(headers){
        for (let i in headers) {
            defaultHeaders[i] = headers[i];
        }
    }
    //在响应拦截中，如果有需要还可以对状态码提示进行处理。现在项目一般后端都会给处理好，
    //这个根据自己的项目情况进行配置,这里只做部分常见的示例
    const showResState = (state: number) => {
        let message = ''
        switch (state) {
            case 400:
                message = '请求错误(400)'
                break
            case 401:
                message = '未授权，请重新登录(401)'
                break
            case 403:
                message = '拒绝访问(403)'
                break
            case 404:
                message = '请求出错(404)'
                break
            case 500:
                message = '服务器错误(500)'
                break
            case 501:
                message = '服务未实现(501)'
                break
            case 502:
                message = '网络错误(502)'
                break
            case 503:
                message = '服务不可用(503)'
                break
            default:
                message = `连接出错(${state})!`
        }
        return `${message}，请检查网络或联系网站管理员！`
    }
 
    // 添加请求拦截器
    axios.interceptors.request.use( (config:any) =>  {
    // 在发送请求之前做些什么
 
   // header 配置 Token 判断Token是否过期 没过期则正常处理 过期则发起刷新Token的请求拿到新的Token保存
        config.headers.Authorization = null;
        // if (store.getters.token) {
     // config.headers['token'] = getToken()
    //}
       //else{
       // alert("Token已失效")
     // }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
 
    // 添加响应拦截器
    axios.interceptors.response.use((res) => {
        // 对响应数据做点什么
        const status = res.status;
        let msg = ''
        if (status < 200 || status >= 300) {
            // 处理http错误，抛到业务代码
            msg = showResState(status)
            ElMessage.error(msg)
            
            if (typeof res.data === 'string') {
               res.data = { msg }
            } else {
               res.data.msg = msg
            }
        }
        return res;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
 
    // 1. 执行异步ajax请求
    const instance = axios({
        // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
        // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
        baseURL: BaseUrl,
 
        // `url` 是用于请求的服务器
        url: url,
 
        // `method` 是创建请求时使用的方法
        method: method || 'get',
 
        // mode: 'cors',
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 
        // `headers` 是即将被发送的自定义请求头
        headers: {...defaultHeaders},
 
        // `transformRequest` 允许在向服务器发送前，修改请求数据
        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
        // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
        transformRequest: [function (data, headers:any) {
            // 对 data 进行任意转换处理
            return data;
        }],
 
        // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
        transformResponse: [function (data) {
            // 对 data 进行任意转换处理
            return data;
        }],
 
        // `params` 是即将与请求一起发送的 URL 参数
        // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
        params: method === 'get' ? params || {} : {},
 
        // // `paramsSerializer` 是一个负责 `params` 序列化的函数
        // paramsSerializer: function(params: Object) {
        //     return qs.stringify(params, {arrayFormat: 'brackets'})
        // },
 
        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream
        data: method === 'post' ? params || {} : {},
        // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
        // 如果请求话费了超过 `timeout` 的时间，请求将被中断
        timeout: 0,
 
        // `withCredentials` 表示跨域请求时是否需要使用凭证
        withCredentials: false, // default 为true则产生跨域,跨域携带cookie
 
        // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
        responseType: 'json', // default
    });
 
    return new Promise((resolve, reject) => {
        instance.then(response => {
            // 2. 如果成功了, 调用resolve(value)
            resolve(response);
        })
            .catch(error => {
                // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
                reject(error)
            }).finally(() => {
        })
    });
}
 
// GET 请求 get 下 params 为查询参数
export const Get = (url: any,params={},headers={}) => {
    return Axios(url,'get',params,headers)
}
 
// POST 请求 post 下 params 为body参数, 如果 post 下既需要传查询参数也需要传实体参数，则查询参数配置在 url 中
export const Post = (url: any,params={},headers={}) => {
    return Axios(url,'post',params,headers)
}
