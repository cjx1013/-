// 将product各模块的接口统一暴露
import * as attr from '@/api/product/attr'
import * as sku from '@/api/product/sku'
import * as spu from '@/api/product/spu'
import * as tradeMark from '@/api/product/tradeMark'

// 引入权限相关的接口
import * as user from './acl/user'
import role from './acl/role'
import permission from './acl/permission'

export default {
  attr,
  sku,
  spu,
  tradeMark,
  user,
  role,
  permission
}
