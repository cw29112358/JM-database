const options = {
  autoIndex: false, // 默认值null，是否启用索引
  timestamps: true, // 在 schema 自动添加 createdAt 和 updatedAt 字段， 其类型为 Date。
  capped: false, // 设置该表的最大容量
  bufferCommands: true, // 是否开启缓存
  _id: true, // 是否需要显示_id字段
  minimize: false, // 设置可否保存空对象，true为不可保存空对象
  strict: true, // 默认为 true，这意味着你不能 save schema 里没有声明的属性
  useNestedStrict: false, // 忽略嵌套的 strict 设定
  typeKey: 'type', // 默认为type，可以自定义
  id: true, // 是否需要显示id字段
  shardKey: null, // 分片相关
  validateBeforeSave: true, // 保存前验证
  collation: null,
  // read: 'primary', // 设置别名
  // collection: 'name', // 手动设置该collection的名称
  // toJSON:
  // toObject:
  // skipVersioning:
  // versionKey: '__v', // 默认为__v，可自定义
}

module.exports = options
