import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['replit.app', 'feishu.cn', 'replit.dev']);

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
        "file": "Attachment",
        "accessKeyId": "Access Key ID",
        "accessKeySecret": "Access Key Secret",
        "bucket": "Bucket",
        "region": "Region",
        "filePlaceholder": "Please select an attachment field",
        "accessKeyIdPlaceholder": "Please enter Access Key ID",
        "accessKeySecretPlaceholder": "Please enter Access Key Secret",
        "bucketPlaceholder": "Please fill in the bucket name",
        "regionPlaceholder": "For example, oss-cn-beijing",
        "ossLink": "CDN"
      },
      'ja-JP': {
        "file": "添付ファイル",
        "accessKeyId": "アクセスキーID",
        "accessKeySecret": "アクセスキーシークレット",
        "bucket": "バケット",
        "region": "リージョン",
        "filePlaceholder": "添付ファイルフィールドを選択してください",
        "accessKeyIdPlaceholder": "アクセスキーIDを入力してください",
        "accessKeySecretPlaceholder": "アクセスキーシークレットを入力してください",
        "bucketPlaceholder": "バケット名を入力してください",
        "regionPlaceholder": "例: oss-cn-beijing",
        "ossLink": "CDN"
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
      },
      tooltips: [
        {
          type: 'link',
          text: '目前仅支持阿里云 OSS，点击查看说明文档',
          'link': 'https://jfsq6znqku.feishu.cn/wiki/EyUvw23pBiMoekkoQFycTuRanrd?fromScene=spaceOverview&table=tblV0R5XjA7MdHZB&view=vewjp62yxa'
        }
      ],
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

    try {
      // 构造请求体
      const params  = new URLSearchParams();
      params.append('access_key_id', accessKeyId);
      params.append('access_key_secret', accessKeySecret);
      params.append('bucket_name', bucket);
      params.append('endpoint', `https://${region}.aliyuncs.com`);
      console.log(accessKeyId, accessKeySecret, bucket, region)
      let cdnLinks = '';
      for (let i = 0; i < file.length; i++) {
        const fileUrl = file[i].tmp_url;
        params.append('file_url', fileUrl);

        let res = await context.fetch(`https://util-transfer-file-2-cdn-wuyi.replit.app/upload-by-url`, { // 已经在addDomainList中添加为白名单的请求
          method: 'POST',
          body: params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(res => res.json());

        cdnLinks += res.url + ';';
      }
      cdnLinks = cdnLinks.slice(0, -1)

      return {
        code: FieldCode.Success,
        data: cdnLinks
      }
    } catch (e) {
      return {
        code: FieldCode.Error,
      }
    }

  },
});
export default basekit;