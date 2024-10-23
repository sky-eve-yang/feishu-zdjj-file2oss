"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['replit.app', 'feishu.cn', 'replit.dev']);
block_basekit_server_api_1.basekit.addField({
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
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('filePlaceholder'),
                supportType: [block_basekit_server_api_1.FieldType.Attachment],
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
            component: block_basekit_server_api_1.FieldComponent.Input,
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
            component: block_basekit_server_api_1.FieldComponent.Input,
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
            component: block_basekit_server_api_1.FieldComponent.Input,
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
            component: block_basekit_server_api_1.FieldComponent.Input,
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
        type: block_basekit_server_api_1.FieldType.Text,
    },
    execute: async (formItemParams, context) => {
        const { file, accessKeyId, accessKeySecret, bucket, region } = formItemParams;
        try {
            // 构造请求体
            const params = new URLSearchParams();
            params.append('access_key_id', accessKeyId);
            params.append('access_key_secret', accessKeySecret);
            params.append('bucket_name', bucket);
            params.append('endpoint', `https://${region}.aliyuncs.com`);
            console.log(accessKeyId, accessKeySecret, bucket, region);
            let cdnLinks = '';
            for (let i = 0; i < file.length; i++) {
                const fileUrl = file[i].tmp_url;
                params.append('file_url', fileUrl);
                let res = await context.fetch(`https://util-transfer-file-2-cdn-wuyi.replit.app/upload-by-url`, {
                    method: 'POST',
                    body: params,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => res.json());
                cdnLinks += res.url + ';';
            }
            cdnLinks = cdnLinks.slice(0, -1);
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: cdnLinks
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBRWpFLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsSUFBSTtnQkFDWixhQUFhLEVBQUUsYUFBYTtnQkFDNUIsaUJBQWlCLEVBQUUsaUJBQWlCO2dCQUNwQyxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGlCQUFpQixFQUFFLFNBQVM7Z0JBQzVCLHdCQUF3QixFQUFFLGlCQUFpQjtnQkFDM0MsNEJBQTRCLEVBQUUscUJBQXFCO2dCQUNuRCxtQkFBbUIsRUFBRSxlQUFlO2dCQUNwQyxtQkFBbUIsRUFBRSxtQkFBbUI7Z0JBQ3hDLFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixhQUFhLEVBQUUsZUFBZTtnQkFDOUIsaUJBQWlCLEVBQUUsbUJBQW1CO2dCQUN0QyxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGlCQUFpQixFQUFFLG1DQUFtQztnQkFDdEQsd0JBQXdCLEVBQUUsNEJBQTRCO2dCQUN0RCw0QkFBNEIsRUFBRSxnQ0FBZ0M7Z0JBQzlELG1CQUFtQixFQUFFLGdDQUFnQztnQkFDckQsbUJBQW1CLEVBQUUsNkJBQTZCO2dCQUNsRCxTQUFTLEVBQUUsS0FBSzthQUNqQjtZQUNELE9BQU8sRUFBRTtn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