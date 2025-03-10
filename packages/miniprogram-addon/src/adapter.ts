import { createError, createRequestUrl, ErrorCode } from '@prequest/helper'
import { CommonRequest, RequestCore } from './types'

export function adapter<T, N>(request: RequestCore) {
  return (opt: T): Promise<N & any> => {
    return new Promise((resolve, reject) => {
      const finalOption = (opt || {}) as Required<CommonRequest>
      const url = createRequestUrl(finalOption)
      const { getNativeRequestInstance, cancelToken, ...rest } = finalOption

      let resolvePromise: any
      getNativeRequestInstance?.(new Promise(resolve => (resolvePromise = resolve)))

      let instance = request({
        ...rest,
        url,
        success(res: any) {
          resolve(res)
        },
        fail(e: any) {
          reject(e)
          instance = null
        },
      })

      if (cancelToken) {
        cancelToken.promise.then(() => {
          if (!instance) return

          // 如果支持取消方法
          if (instance.abort) return instance.abort()

          // 如果不支持，则直接抛出错误
          reject(createError(ErrorCode.abort, 'aborted', opt))
        })
      }

      resolvePromise?.(instance)
    })
  }
}
