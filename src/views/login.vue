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
                        <!--<FormItem prop="captcha" v-if="requireCaptcha!=0">-->
                            <!--<Input type="text" v-model="form.captcha" >-->
                                <!--<span slot="append">-->
                                        <!--<img :src="captImgData" class="captImg" title="点击更换" @click="changeCaptcha"/>-->
                                <!--</span>-->
                            <!--</Input>-->
                        <!--</FormItem>-->
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
import Cookies from 'js-cookie';
import {SERVER_URL} from '../assets/config.js';
import axios from 'axios';
import qs from 'qs';
// import $ from 'jquery';

export default {
    data () {
        const validateCaptChar = (rule, value, callback) => {
              if (!this.requireCaptcha) {
                return callback();
              }
              if(!value){
                return callback(new Error('验证码不能为空'));
              }
              return callback();
//              let url = SERVER_URL+'/validateCaptchar?captchar='+value;

        };
        return {
            requireCaptcha:false,
            captImgData: '#',
            form: {
                userName: 'admin',
                password: '123',
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
                this.$axios.post(url,qs.stringify(this.form))
                  .then(res=>{
                    let data = res.data;
                      if(res.data.result==1){
                       Cookies.set('user', this.form.userName);
                       Cookies.set('password', this.form.password);
                        // 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                        this.$store.commit('setAvator', '');
                       if (this.form.userName === 'admin') {
                         Cookies.set('access', 0);
                       } else {
                         Cookies.set('access', 1);
                       }
                        axios.defaults.headers.common['Access-Token']=data.token;
                       console.log('Access-Token:'+axios.defaults.headers.common['Access-Token']);
                       this.$axios = axios.create();
                        this.$router.push({
                          name: 'home_index'
                        });
                      }else{
                        this.requireCaptcha = data.requireCaptcha;
                        this.$Message.error(data.message);
                        this.changeCaptcha();
                      }
                  });
                if (valid) {

                }
            });
        },
      requireCaptchar (){
        let url = SERVER_URL + '/captcha';
        this.$axios.get(url)
          .then(res=>{
            this.requireCaptcha=res.data.requireCaptcha;
            if(this.requireCaptcha){
              this.changeCaptcha();
            }
        }).catch(err=>{
          console.log(err);
        });
      }
    },
      mounted () {
          // this.requireCaptchar();
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
