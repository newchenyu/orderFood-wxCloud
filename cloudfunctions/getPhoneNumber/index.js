const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { code } = event

  if (!code) {
    return { success: false, errCode: -1, message: '缺少 code 参数' }
  }

  try {
    const result = await cloud.openapi.phonenumber.getPhoneNumber({ code })

    if (result && result.phoneInfo) {
      return {
        success: true,
        phoneNumber: result.phoneInfo.purePhoneNumber || result.phoneInfo.phoneNumber
      }
    }

    return {
      success: false,
      errCode: result.errCode || -1,
      message: result.errMsg || '获取手机号失败，返回数据异常'
    }
  } catch (err) {
    console.error('获取手机号失败', JSON.stringify({
      errCode: err.errCode,
      errMsg: err.errMsg,
      message: err.message
    }))
    return {
      success: false,
      errCode: err.errCode || -1,
      message: err.errMsg || err.message || '获取手机号失败'
    }
  }
}

