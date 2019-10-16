/**
 * Created by Hou on 2018/7/24.
 */
export default {
  /**
   * 根据参数名截取地址栏中的参数值
   * @param queryParamName
   * @returns {*}
   * @private
   */
  getCodeByQueryString (queryParamName) {
    const reg = new RegExp(`(^|&)${queryParamName}=([^&]*)(&|$)`)
    const matchArr = window.location.search.substr(1).match(reg)
    if (matchArr != null) {
      return matchArr[2]
    }
    return null
  }
}
