import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['replit.app', 'feishu.cn']);

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      'zh-CN': {
        'file': '附件',
        'accessKeyId': 'accessKeyId',
        'accessKeySecret': 'accessKeySecret',
        'bucket': 'bucket',
        'region': 'region',
        'filePlaceholder': '请选择附件字段',
        'accessKeyIdPlaceholder': '请输入 accessKeyId',
        'accessKeySecretPlaceholder': '请输入 accessKeySecret',
        'bucketPlaceholder': '请填写 bucket 名称',
        'regionPlaceholder': '例如 oss-cn-beijing',
        'ossLink': 'CDN'
      },
      'en-US': {
        'shortcut': 'Short Link',
        'noteId': 'Note ID',
        'longLink': 'Long Link',
        'placeholderShortcut': 'Please select the corresponding field for Xiaohongshu Short Link',
      },
      'ja-JP': {
        'shortcut': 'ショートリンク',
        'noteId': 'ノート ID',
        'longLink': 'ロングリンク',
        'placeholderShortcut': '小红書のショートリンクに対応するフィールドを選択してください',
      },
    }
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'file',
      label: t('file'),
      component: FieldComponent.FieldSelect,
      props: {
        placeholder: t('filePlaceholder'),
        supportType: [FieldType.Attachment],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'accessKeyId',
      label: 'AccessKeyId',
      component: FieldComponent.Input,
      props: {
        placeholder: t('accessKeyIdPlaceholder'),
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'accessKeySecret',
      label: 'AccessKeySecret',
      component: FieldComponent.Input,
      props: {
        placeholder: t('accessKeySecretPlaceholder'),
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'bucket',
      label: 'Bucket',
      component: FieldComponent.Input,
      props: {
        placeholder: t('bucketPlaceholder'),
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'region',
      label: 'Region',
      component: FieldComponent.Input,
      props: {
        placeholder: t('regionPlaceholder'),
      },
      validator: {
        required: true,
      },
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Text,
  },
  execute: async (formItemParams, context) => {
    
    const { file, accessKeyId, accessKeySecret, bucket, region } = formItemParams;


  
    // 构造请求体
    const params = new URLSearchParams();
    params.append('access_key_id', accessKeyId);
    params.append('access_key_secret', accessKeySecret);
    params.append('bucket_name', bucket);
    params.append('endpoint', `https://${region}.aliyuncs.com`);

    for (let i = 0; i < file.length; i++) {
      const fileUrl = file[i].tmp_url;
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const fileObject = new File([blob], "image.jpg", { type: blob.type });
      params.append('file', fileObject);
      let res = await context.fetch(`https://util-transfer-file-2-cdn-wuyi.replit.app/upload`, { // 已经在addDomainList中添加为白名单的请求
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      }).then(res => res.json());
      
      console.log("res", res)

    }

    return {
      code: FieldCode.Success,
      data: {
        ossLink: '1'

      }
    }


    try {
      const res = await context.fetch(`https://util-transfer-file-2-cdn-wuyi.replit.app/upload`, { // 已经在addDomainList中添加为白名单的请求
        method: 'POST',
        body: formData,
      }).then(res => res.json());

      const xhsInfo = res?.data;
      console.log("xhsInfo", xhsInfo)
      return {
        code: FieldCode.Success,
        data: {
          ossLink: xhsInfo.long_url.split('?')[0]

        }
      }
    } catch (e) {
      return {
        code: FieldCode.Error,
      }
    }
  },
});
export default basekit;