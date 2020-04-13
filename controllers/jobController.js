const jobs = require('../model/jobs')
const response = require('../utils/response')

exports.jobs = async (ctx) => {
  const { current, limit } = ctx.request.query
  const total = await jobs.countDocuments()
  const list = await jobs.find(
    null,
    'jobName address jobSequence demand department jobStatus',
    {
      skip: current ? (Number(current) - 1) * 10 : 0,
      limit: limit ? Number(limit) : 10,
    },
  )
  return (ctx.body = response({
    total,
    list,
  }))
}

exports.create = async (ctx, next) => {
  const jobInfo = ctx.request.body
  const job = new jobs(jobInfo)
  job.save((err) => {
    if (err) {
      return next(err)
    }
  })
  return (ctx.body = response({ message: '创建成功' }))
}

exports.jobDetail = async (ctx) => {
  const { _id } = ctx.request.query
  const list = await jobs.findById(_id, {
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  })
  return (ctx.body = response(list))
}

exports.deleteJob = async (ctx) => {
  const { _id } = ctx.request.body
  await jobs.findByIdAndRemove(_id)
  return (ctx.body = response({ message: '删除成功' }))
}
