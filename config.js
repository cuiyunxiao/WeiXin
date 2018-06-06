/**
 * Created by cuiyunxiao on 2017-12-24 14:59:47
 * 小程序配置文件
 */
var app = getApp();
// 提交用户信息
var weixin_host = "https://weixinapp.3dyida.com"//正式
//  var weixin_host = "https://3dyida.com" //开发用
// 登录
var sso_host = "https://sso.3dyida.com"
// 上传
var attach_host = "https://attach.3dyida.com"
var config = {
  // 下面的地址配合云端 Server 工作
  sso_host,
  weixin_host,
  attach_host,
  //登录接口
  loginUrl: `${sso_host}/app/login`,
  //短信验证码接口
  sendMsgCode: `${sso_host}/sendMsgCode`,
  //注册接口
  register: `${sso_host}/register`,
  //是否注册用户名接口
  vrifyName: `${sso_host}/vrifyName`,
  //是否注册手机号接口
  vrifyTel: `${sso_host}/vrifyTel`,
  // 找回密码
  reset: `${sso_host}/reset`,
  // 用户个人信息
  personal: `${weixin_host}/account/info`,
  //重新绑定手机号  
  Newphone: `${weixin_host}/account/updateTel`,
  //修改资料
  edit: `${weixin_host}/account/edit`,
  //获取会员所有地址信息
  showAddress: `${weixin_host}/account/address/show`,
  //根据会员编号获取地址信息
  listAddress: `${weixin_host}/account/address/list`,
  //保存地址信息
  saveAddress: `${weixin_host}/account/address/save`,
  //删除地址信息
  deleteAddress: `${weixin_host}/account/address/delete`,
  //修改地址信息
  editAddress: `${weixin_host}/account/address/edit`,
  //设置默认地址
  addressMr: `${weixin_host}/account/address/addressMr`,
//获取默认地址
  findMrAddress: `${weixin_host}/account/address/findMrAddress`,
//上传图片
  uploadImage: `${weixin_host}/attach/batch/upload`,
//初始化需求编号
  initnum: `${weixin_host}/require/init`,
//提交实物扫描需求
  submit:`${weixin_host}/entity/req/submit`,
//提交照片建模需求
  phoscan: `${weixin_host}/photo/req/submit`,
//提交人像扫描需求
  person: `${weixin_host}/person/req/submit`,
//提交工业设计需求
  industry: `${weixin_host}/industry/req/submit`,
//查看需求详情
  query: `${weixin_host}/require/query`,
// 查看一条需求详情
  getOne: `${weixin_host}/require/getOne`,
//撤回需求
  recalldemand: `${weixin_host}/require/recall`,
//删除需求
  deldemand: `${weixin_host}/require/del`,
  //实物提交需求
  confirmentity: `${weixin_host}/entity/req/confirm`,
  //人像提交需求
  confirmperson: `${weixin_host}/person/req/confirm`,
//照片建模需求
  confirmphoto: `${weixin_host}/photo/req/confirm`,
  //工业设计需求
  confirmindustry: `${weixin_host}/industry/req/confirm`,
  //模具制造需求
  confirmmudle: `${weixin_host}/mudle/req/confirm`,
  //3D打印需求
  confirmprint: `${weixin_host}/print/req/confirm`,
//渲染订单信息
  reqtopay: `${weixin_host}/order/reqtopay`,
  //订单提交
  ordersave: `${weixin_host}/order/save`,
//获取全部订单
  orderquery: `${weixin_host}/order/query`,
  //获取订单详情
  orderone: `${weixin_host}/order/getDetail`,
  //发现精选
  bestChapter: `${weixin_host}/bestChapter/list`,
  //发现优惠
  discount: `${weixin_host}/discount/list`,
  //发现易知
  easyKnow: `${weixin_host}/easyKnow/list`,
//精选获取详情
  bestDetail: `${weixin_host}/bestChapter/findByArticleNo`,
  //优惠获取详情
  discountDetail: `${weixin_host}/discount/findByArticleNo`,
  //易知获取详情
  easyKnowDetail: `${weixin_host}/easyKnow/findByArticleNo`,
//获取系统消息
  message: `${weixin_host}/message/query`,
  //删除系统消息
  delnotice: `${weixin_host}/message/del`,
  //获取系统公告
  notice: `${weixin_host}/notice/list`,
  //获取公告详情
  noticedetail: `${weixin_host}/notice/getNotice`,
  //对公转账
  publicpay: `${weixin_host}/order/publicpay`,

  geturl: function geturl(url) {
    var token = app.appData.sessionid;
    url = url + '?jsessionid=' + token;
    return url
  }
};
module.exports = config;
