const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const options = require("./schemaOptions");

const talentSchema = new Schema(
  {
    name: String, // 姓名
    principal: String, // 负责人
    phoneNumber: Number, // 手机号码
    email: String, // 电子邮箱
    wechart: String, // 微信
    company: String, // 公司
    address: String, // 居住地址
    education: String, // 最高学历
    matchingPositions: String, // 匹配岗位
    major: String, // 所学专业
    sourceChannel: String, // 来源渠道
    followAnalysis: String, // 可跟进性分析
    talentLevel: String, // 人才级别
    funnelAnalysis: String, // 人才漏斗分析
    description: String, // 简历描述
    resume: String, // 人员简历
    interviewDate: Date, // 面试时间
    interviewPerson: String, // 面试人员
    interviewForm: String, // 面试形式
    interviewResult: String, // 面试结果
    interviewRecord: String, // 面试记录
    colleague: String, // 介绍同事的姓名
    otherSource: String, // 其他来源渠道
    favorite: Boolean, // 是否关注
    recentContactTime: Date, // 最近联系时间
    contactContent: String, // 联系内容
  },
  options
);

const talents = mongoose.model("talent", talentSchema);

module.exports = talents;
