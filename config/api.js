// const API_BASE_URL = 'http://192.168.1.178:8082/api/';
const API_BASE_URL = 'https://api.xyck.com/api/';
module.exports = {

  AuthLoginByWeixin: API_BASE_URL + 'user/login',//用户登录
  MessageSubmit: API_BASE_URL + 'user/userRealUpload', // 提交用户信息
  VideoSubmit: API_BASE_URL + 'user/checkUserReal', // 提交用户认证视频
  HomeMessage: API_BASE_URL + 'user/getUserHomeCount', // 获取首页用户动态数据
  GrossMoneyMessage: API_BASE_URL + 'commission/getUserCommissionCount', // 获取用户佣金统计信息
  SmsCode: API_BASE_URL + 'sendSms', // 获取手机验证码
  BindMobile: API_BASE_URL + 'user/bindMobile', // 绑定手机
  GetReceiptMessage: API_BASE_URL + 'commission/getUserCommissionList', // 获取用户佣金信息
  SignContract: API_BASE_URL + 'contract/userSignContract', // 用户签署合同
  PactMessage: API_BASE_URL + 'contract/getUserContractList', // 用户合同信息
  GetUserAccountList: API_BASE_URL + 'user/getUserAccountList', // 获取用户账号信息
  GetUserMessage: API_BASE_URL + 'user/getUserRealDetail', // 获取用户实名认证信息
  AddUserSuggest: API_BASE_URL + 'user/addUserSuggest', // 提交投诉建议
  AddUserSuggestFile: API_BASE_URL + 'user/addUserSuggestFile', // 提交投诉建议
  GetIDCardOCR: API_BASE_URL + 'user/getIDCardOCR', // ocr信息识别
  UserRealAgree: API_BASE_URL + 'user/userRealAgree', // ocr信息识别
  

};
