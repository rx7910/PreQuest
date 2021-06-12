import { createDownload } from '@prequest/miniprogram-addon'

interface WxDownloadResponse {
  tempFilePath: string
}

export const wxDownload = createDownload<any, WxDownloadResponse>(wx.downloadFile)

wxDownload.use(async (ctx, next) => {
  await next()
  const { data, statusCode, tempFilePath } = ctx.response
  if (statusCode !== 200) throw new Error(data as string || '响应数据有误')
  ctx.response = tempFilePath as any
})
