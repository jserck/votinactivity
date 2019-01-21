# -*- coding: utf-8 -*-
# flake8: noqa
from qiniu import Auth
from qiniu import BucketManager
access_key = 'TDy_iPK3PRfxdcY_AI42GBYDvY1kqQhPs92vO6oh'
secret_key = 'FWA4OkCzqKNmaGSTgmmS7TpO1kV0B596AlzZf1Q4'
#初始化Auth状态
q = Auth(access_key, secret_key)
#初始化BucketManager
bucket = BucketManager(q)
#你要测试的空间， 并且这个key在你空间中存在
bucket_name = 'webjs'
key = 'index.html'
#删除bucket_name 中的文件 key
ret, info = bucket.delete(bucket_name, key)
print(info)
assert ret == {}