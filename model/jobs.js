const mongoose = require('mongoose')
const Schema = mongoose.Schema
const options = require('./schemaOptions')

const jobSchema = new Schema(
  {
    title: String, // 标题
    applicant: String, // 申请人
    code: Number, // 编号
    department: String, // 申请部门
    date: String, // 申请日期
    jobName: String, // 增补岗位名称
    jobSequence: String, // 岗位序列
    demand: Number, // 需求人数
    reasons: String, // 增补理由
    source: String, // 用工来源
    jobNature: String, // 工作性质
    jobResponsibilities: String, // 岗位职责
    education: String, // 学历
    experience: String, // 工作经验
    address: String, // 工作地点
    minimumAge: Number, // 年龄下限
    maximumAge: Number, // 年龄上限
    minimumSalary: Number, // 薪资下限
    maximumSalary: Number, // 薪资上限
    profession: String, // 专业
    englishLevel: String, // 英语等级
    jobStatus: {
      type: String,
      default: 'unpublished',
    }, // 岗位状态
    other: String, // 其他
  },
  options,
)

const jobs = mongoose.model('job', jobSchema)

module.exports = jobs
