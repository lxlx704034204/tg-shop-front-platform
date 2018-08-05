import {SERVER_URL} from '../assets/config'
// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

var loginUserTmp = {
  "result": 1,
  "message": "登录成功",
  "token": "f141989bd43a4f899ab9446a73db1476"
}

// mock一组数据
const productData = function() {
  let Data = [];
  for (let i = 0; i < 100; i++) {
    let data = {
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date()  // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
    }
    Data.push(data)
  }

  return {
    Data: Data
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(SERVER_URL + '/login', 'post', loginUserTmp);
// Mock.mock('/user/query', 'post', productData);
