# -*- coding: utf-8 -*-
from qiniu import Auth, put_file
import qiniu.config
import glob2
import os
#需要填写你的 Access Key 和 Secret Key
access_key = "47_vA3y-Nf8CUg_Q3c5wTdJcSSm4SGObRoWnY-pl"
secret_key = "xM9p2KnljwaGsthjhCKjjM5n9k4u4M6HvHwOWqFA"
#构建鉴权对象
q = Auth(access_key, secret_key)
#要上传的空间
bucket_name = "activity"

resources = glob2.glob('dist/static/**')
def upload(path):
    file_name = path.replace('dist/', '')
    key = file_name.replace('\\', '/')
    print(key)
    token = q.upload_token(bucket_name, key, 3600)
    localfile = './' + path
    put_file(token, key, localfile)

for r in resources:
    if os.path.isfile(r):
      upload(r)