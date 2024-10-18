"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['replit.app', 'feishu.cn']);
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
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('filePlaceholder'),
                supportType: [block_basekit_server_api_1.FieldType.Attachment],
            },
            validator: {
                required: true,
            }
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
        // 构造请求体
        const formData = new FormData();
        formData.append('access_key_id', accessKeyId);
        formData.append('access_key_secret', accessKeySecret);
        formData.append('bucket_name', bucket);
        formData.append('endpoint', `https://${region}.aliyuncs.com`);
        for (let i = 0; i < file.length; i++) {
            const fileUrl = file[i].tmp_url;
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const fileObject = new File([blob], "image.jpg", { type: blob.type });
            formData.append('file', fileObject); // 请替换为实际的文件路径
            let res = await context.fetch(`https://util-transfer-file-2-cdn-wuyi.replit.app/upload`, {
                method: 'POST',
                body: formData,
            }).then(res => res.json());
            console.log("res", res);
        }
        try {
            const res = await context.fetch(`https://util-transfer-file-2-cdn-wuyi.replit.app/upload`, {
                method: 'POST',
                body: formData,
            }).then(res => res.json());
            const xhsInfo = res?.data;
            console.log("xhsInfo", xhsInfo);
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    ossLink: xhsInfo.long_url.split('?')[0]
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFFbkQsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxJQUFJO2dCQUNaLGFBQWEsRUFBRSxhQUFhO2dCQUM1QixpQkFBaUIsRUFBRSxpQkFBaUI7Z0JBQ3BDLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsaUJBQWlCLEVBQUUsU0FBUztnQkFDNUIsd0JBQXdCLEVBQUUsaUJBQWlCO2dCQUMzQyw0QkFBNEIsRUFBRSxxQkFBcUI7Z0JBQ25ELG1CQUFtQixFQUFFLGVBQWU7Z0JBQ3BDLG1CQUFtQixFQUFFLG1CQUFtQjtnQkFDeEMsU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixVQUFVLEVBQUUsV0FBVztnQkFDdkIscUJBQXFCLEVBQUUsa0VBQWtFO2FBQzFGO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLHFCQUFxQixFQUFFLGdDQUFnQzthQUN4RDtTQUNGO0tBQ0Y7SUFDRCxVQUFVO0lBQ1YsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxHQUFHLEVBQUUsTUFBTTtZQUNYLEtBQUssRUFBRSxDQUFDLENBQUMsTUFB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