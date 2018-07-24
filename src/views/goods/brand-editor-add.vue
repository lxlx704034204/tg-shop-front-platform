<template>
    <div>
        <h3>新增品牌</h3>
        <Form ref="formBrand" :model="formBrandItem" :label-width="100" :rules="ruleValidate" :action="form_action">
            <FormItem label="品牌名称" prop="brandName">
                <Input v-model="formBrandItem.brandName" placeholder="品牌名称" />
            </FormItem>
            <FormItem label="品牌英文名称">
                <Input v-model="formBrandItem.brandNameEn" placeholder="品牌英文名称" />
            </FormItem>
            <FormItem label="LOGO" prop="brandLogoUrl">
                <Upload ref="uploadLogo" :action="uploadLogo_action"
                        :format="['jpg','jpeg','png']"
                        :multiple="false"
                        :max-size="1024"
                        :on-success="handleUploadLogoSuccess"
                        :on-remove="handleUploadLogoRemove">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
                <input type="hidden" id="brandLogoUrl" name="brandLogoUrl" :value="formBrandItem.brandLogoUrl" />
                <div v-if="formBrandItem.brandLogoUrl!=null || formBrandItem.brandLogoUrl!='' ">
                    <img :src="formBrandItem.brandLogoUrl" />
                </div>
            </FormItem>
            <FormItem label="背景图">
                <Upload ref="uploadBrandBackgroundImg" :action="uploadBrandBackgroundImg_action"
                        :format="['jpg','jpeg','png']"
                        :multiple="false"
                        :max-size="1024"
                        :on-success="handleUploadBackgroundImgSuccess"
                        :on-remove="handleUploadBackgroundImgRemove">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
                <input type="hidden" name="backgroundUrl" :value="formBrandItem.backgroundUrl" />
                <div v-if="formBrandItem.backgroundUrl!=null || formBrandItem.backgroundUrl!='' ">
                    <img :src="formBrandItem.backgroundUrl" />
                </div>
            </FormItem>
            <FormItem label="备注">
                <Input type="textarea" v-model="formBrandItem.desc" :rows="3" />
            </FormItem>
            <FormItem>
                <Button type="primary"  @click="handleSubmit('formBrand')">提交</Button>
                <Button type="ghost" style="margin-left: 8px"  @click="handleCancel">取消</Button>
            </FormItem>
        </Form>


    </div>
</template>

<script>
  import {SERVER_URL} from '../../assets/config.js';
//  import $ from 'jquery';
    export default {
        name: 'brand-editor-add',
        data () {
          const validateBrandName = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('品牌不能为空'));
            }
            // 模拟异步验证效果
            setTimeout(() => {
              if (value=='1') {
                callback(new Error('品牌已存在'));
              } else {
                callback();
              }
            }, 1000);
          };
            return {
              SERVER_URL:SERVER_URL,
              form_action:SERVER_URL + '/brand/add',
              uploadLogo_action:SERVER_URL + '/upload/brandImg',
              uploadBrandBackgroundImg_action:SERVER_URL + '/upload/brandBackgroundImg',
              formBrandItem:{
                brandId:'',
                brandName:'',
                brandNameEn:'',
                brandLogoUrl:'',
                backgroundUrl:'',
                desc:''
              },

              ruleValidate:{
                brandName: [
                  { validator: validateBrandName, trigger: 'blur' }
                ],
                brandLogoUrl: [
                  { required: true, message: 'LOGO不能为空', trigger: 'change' }
                ]
              }
            };
        },
      methods: {
        handleUploadLogoSuccess (data){
          if(data.success){
            this.formBrandItem.brandLogoUrl = data.url;
          }
        },
        handleUploadBackgroundImgSuccess (data){
          if(data.success){
            this.formBrandItem.backgroundUrl = data.url;
          }
        },
        handleUploadLogoRemove (data) {
          this.formBrandItem.brandLogoUrl = '';
        },
        handleUploadBackgroundImgRemove (data) {
          this.formBrandItem.backgroundUrl = '';
        },
        handleSubmit (name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$http.post(this.form_action,this.formBrandItem)
                .then((res)=>{
                    console.log(res);
                    this.$Message.success('操作成功!');
                    this.$refs[name].resetFields();
                },(res)=>{
                    console.log(res);
                    this.$Message.error('操作失败!');
                });
            } else {
              this.$Message.error('验证失败!');
            }
          });
        },
        handleCancel () {
          this.$refs['formBrand'].resetFields();
        }
      }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    image{
        width:100px;
        height: 80px;
    }
</style>