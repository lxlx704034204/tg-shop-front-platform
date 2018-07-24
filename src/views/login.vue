<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="captcha" v-if="requireCaptcha!=0">
                            <Input type="text" v-model="form.captcha" >
                                <span slot="append">
                                        <img :src="captImgData" class="captImg" title="点击更换" @click="changeCaptcha"/>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
//import Cookies from 'js-cookie';
import { SERVER_URL } from '../assets/config'
// import {SERVER_URL} from '../../assets/config.js';
export default {
    data () {
        const validateCaptChar = (rule, value, callback) => {
              if (!this.requireCaptcha) {
                return callback();
              }
              if(!value){
                return callback(new Error('验证码不能为空'));
              }
//              let url = SERVER_URL+'/validateCaptchar?captchar='+value;
//              this.$http.get(url).then(res=>{
//
//              },(res)=>{
//
//              });
        };
        return {
            requireCaptcha:false,
            captImgData: '#',
            form: {
                userName: 'iview_admin',
                password: '',
                captcha: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
              captcha: [{validator:validateCaptChar,trigger:'blur'}]
            }
        };
    },
    methods: {
        changeCaptcha (){
          console.log('changeCaptchar');
            // t='+Math.random() 防止浏览器缓存
            this.captImgData = SERVER_URL + '/generateImage?t='+Math.random();
        },
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if(!valid){
                  return;
                }
                let url = SERVER_URL + '/login';
                this.$http.post(url,this.form)
                  .then(res=>{
                    if(res.ok){
                      if(res.data.status==1){
//                        Cookies.set('user', this.form.userName);
//                        Cookies.set('password', this.form.password);
                        // 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                        this.$store.commit('setAvator', '');
//                        if (this.form.userName === 'iview_admin') {
//                          Cookies.set('access', 0);
//                        } else {
//                          Cookies.set('access', 1);
//                        }
                        this.$router.push({
                          name: 'home_index'
                        });
                      }else{
                        let data = res.data;
                        this.requireCaptcha = data.requireCaptcha;
                        this.$Message.error(data.message);
                        this.changeCaptcha();
                      }
                    }
                  },res=>{
                    this.$Message.error('Error.');
                  });
                if (valid) {

                }
            });
        },
      requireCaptchar (){
        let url = SERVER_URL + '/captcha';
        this.$http.get(url).then(res=>{
          if(res.ok){
            this.requireCaptcha=res.data.requireCaptcha;
            if(this.requireCaptcha){
              this.changeCaptcha();
            }
          }
        });
      }
    },
      mounted () {
          this.requireCaptchar();
      }
};
</script>

<style>
    .captImg{
        width: 80px;
        height: 29px;
        padding: 0px 0px;
        margin: 0px 0px;
    }
    .ivu-input-group-append{
        padding: 0px 0px;
        margin: 0px 0px;
    }
</style>
