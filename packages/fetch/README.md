# @prequest/fetch

基于 fetch API 的请求库

## 安装

```bash
npm install @prequest/fetch
```

## 使用

由于在不同平台上使用基本一致，所以基本使用文档，请查阅 [这里](https://pre-quest.vercel.app/#/usage)

## 参数

| Option Name        | Type                                       | Default | Required | Meaning                            | Example                 |
| ------------------ | ------------------------------------------ | ------- | -------- | ---------------------------------- | ----------------------- |
| path               | string                                     | none    | Y        | 接口路径                           | /api                    |
| method             | string                                     | GET     | N        | 请求方式                           | post                    |
| baseURL            | string                                     | none    | N        | 服务器地址                         | 'http://localhost:3000' |
| cancelToken        | CancelToken                                | none    | N        | 取消请求                           |                         |
| params             | object                                     | none    | N        | url 参数                           | { id: 10}               |
| data               | object                                     | none    | N        | 请求头传输数据                     | { id: 10}               |
| responseType       | json \| text \| arraybuffer \|...          | none    | N        | 响应的数据类型                     | json                    |
| requestType        | json \| text \| arraybuffer \|...          | none    | N        | 请求的数据类型，用以自动设置请求头 | json                    |
| header             | object                                     | none    | N        | 请求头                             | { token: 'aaaaa'}       |
| onDownloadProgress | ({ loaded: number, total: number}) => void | none    | N        | 下载进度                           |                         |

其他 fetch 原生支持的参数也支持传入

!> 参数中提供了 `CancelToken` 来取消请求。不建议自己使用 abortController 来取消请求，因为当你调用 AbortController.abort() 时，不确定内部是否执行到 fetch 中间件。

!> responseType 进行配置后，程序会自动解析 response, 输出的直接是 data 数据。若要得到相应头，HTTP 响应状态码等信息，需要手动解析 response
