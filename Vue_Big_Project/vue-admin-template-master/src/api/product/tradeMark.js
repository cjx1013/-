// 这个模块主要获取的是品牌管理的数据的模块

// 引入二次封装后的axios
import request from '@/utils/request'

// 获取品牌列表接口
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 添加或修改品牌
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 如果提交的数据带有id，则是修改
  if (tradeMark.id) {
    return request({ url: `/admin/product/baseTrademark/update`, method: 'put', data: tradeMark })
  } else {
    // 否则是添加
    return request({ url: `/admin/product/baseTrademark/save`, method: 'post', data: tradeMark })
  }
}

// 删除品牌
export const reqDeleteTradeMark = (tradeMark) => request({ url: `/admin/product/baseTrademark/remove/${tradeMark.id}`, method: 'delete' })
