/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
// 判断协议头是否符合正则规则，返回 boolean 值
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// 如果传入的 str 在 valid_map 白名单内 返回 boolean 值
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}


// 校验手机号
export function validMobile(str){

  if(str.trim() === ''){

    return false
  }

  return /^1[3-9]\d{9}$/.test(str)

}

// 校验密码
export function validPassword(str){

  if(str.trim() === ""){

    return false
  }

  

}
