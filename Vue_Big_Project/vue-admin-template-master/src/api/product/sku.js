// sku管理模块请求文件
import request from '@/utils/request'

// sku列表的接口
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// 下架接口
export const reqCancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

// 上架接口
export const reqOnSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })

// 获取sku详情信息
export const reqGetSkuInfo = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })
