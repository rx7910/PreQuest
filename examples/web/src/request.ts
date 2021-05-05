import axios from 'axios'
import request from 'umi-request'
import { createPreQuest } from '@prequest/xhr'
import * as fetchAdapter from '@prequest/fetch'
import { graphql } from '@prequest/graphql'

export function createAxios() {
  const instance = axios.create({
    baseURL: 'http://localhost:10000',
    timeout: 1000,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
  return instance.post('/api', { a: 1, b: 2 }).then(res => { console.log('----axios', res) }).catch(e => console.log('----axios---error', e))
}

export function createUmiRequest() {
  return request
    .post('http://localhost:10000/api', {
      data: {
        name: 'Mike',
      },
      requestType: 'json',
      responseType: 'json',
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function createXMLPreQuest() {
  const adapter = createPreQuest({})
  let request: XMLHttpRequest
  const xxx = adapter.post('/api', {
    data: { a: '1' },
    requestType: 'json',
    getRequestInstance(instance) {
      request = instance
    }
  })
  console.log('查看响应值')
  setTimeout(() => request.abort())
  return xxx
}

export function createFetchPreQuest() {
  const adapter = fetchAdapter.createPreQuest()

  adapter.use(async (ctx, next) => {
    console.log('fetch 实例中间件-请求', ctx.request)
    await next()
    console.log('fetch 实例中间件-响应', ctx.response)
  })

  return adapter.post('/api', { data: { a: 1 } })
}

export function createGraphqlPreQuest() {
  const query = `
    {
      me {
        name
      }
    }
  `
  const instance = createPreQuest({})
  const request = graphql(instance as any)
  return request(query, { name: 'ha' }, { path: '/api' })
}
