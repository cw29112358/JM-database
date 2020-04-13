const moment = require('moment')
const talents = require('../model/talents')
const response = require('../utils/response')

exports.poolList = async (ctx) => {
  const { current, limit, favorite } = ctx.request.query
  const total = await talents.countDocuments()
  const list = await talents.find(
    favorite ? { favorite: true } : null,
    'company name phoneNumber recentContactTime principal sourceChannel favorite',
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
  const talentInfo = ctx.request.body
  const talent = new talents(talentInfo)
  talent.save((err) => {
    if (err) {
      return next(err)
    }
  })
  return (ctx.body = response({ message: '创建成功' }))
}

exports.toggleFavorite = async (ctx, next) => {
  const data = ctx.request.body
  await talents.findByIdAndUpdate(
    data.id,
    {
      favorite: !data.favorite,
    },
    { new: true },
    (err) => {
      if (err) {
        next(err)
      }
    },
  )
  return (ctx.body = response({
    message: data.favorite ? '取消关注' : '关注成功',
  }))
}

exports.contactList = async (ctx) => {
  const data = ctx.request.body
  const list = await talents.find(
    null,
    'name contactContent phoneNumber recentContactTime principal',
  )
  let contactTalents, total

  if (data.contact === 'overDue') {
    total = list.filter((item) => {
      return (
        item.recentContactTime &&
        moment().unix() > moment(item.recentContactTime).unix()
      )
    })
    contactTalents = total.slice(
      data.current ? (Number(data.current) - 1) * 10 : 0,
      data.current ? (Number(data.current) - 1) * 10 + data.limit : 10,
    )
  } else if (data.contact === 'tomorrow') {
    total = list.filter((item) => {
      return (
        item.recentContactTime &&
        moment(item.recentContactTime).unix() >= moment().unix() &&
        moment(item.recentContactTime).unix() <= moment().add(1, 'd').unix()
      )
    })
    contactTalents = total.slice(
      data.current ? (Number(data.current) - 1) * 10 : 0,
      data.current ? (Number(data.current) - 1) * 10 + data.limit : 10,
    )
  } else if (data.contact === 'soon') {
    total = list.filter((item) => {
      return (
        item.recentContactTime &&
        moment(item.recentContactTime).unix() >= moment().unix() &&
        moment(item.recentContactTime).unix() <= moment().add(7, 'd').unix()
      )
    })
    contactTalents = total.slice(
      data.current ? (Number(data.current) - 1) * 10 : 0,
      data.current ? (Number(data.current) - 1) * 10 + data.limit : 10,
    )
  } else if (data.contact === 'futuer') {
    total = list.filter((item) => {
      return (
        !item.recentContactTime ||
        (item.recentContactTime &&
          moment(item.recentContactTime).unix() >= moment().unix())
      )
    })
    contactTalents = total.slice(
      data.current ? (Number(data.current) - 1) * 10 : 0,
      data.current ? (Number(data.current) - 1) * 10 + data.limit : 10,
    )
  }

  return (ctx.body = response({
    total: total.length,
    list: contactTalents,
  }))
}
