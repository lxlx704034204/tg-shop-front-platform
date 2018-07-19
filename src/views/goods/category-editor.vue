<template>
    <div>
        <div>
            <Card>
            <p slot="title">新增类目</p>
            <Form ref="formCategory" :model="formCategory" :label-width="80" :rules="ruleValidate">
                <FormItem label="上级类目">
                    <Cascader :data="categoryData" v-model="formCategory.parent" filterable change-on-select></Cascader>
                </FormItem>
                <FormItem label="类目名称" prop="categoryName">
                    <Input v-model="formCategory.categoryName" placeholder="类目名称..." />
                </FormItem>
                <!--
                <FormItem label="叶子节点">
                    <i-switch v-model="formCategory.isLeaf" size="large">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </FormItem>
                -->
                <FormItem label="排序">
                    <Input v-model="formCategory.sortNum" placeholder="排序" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmitCat('formCategory')">保存</Button>
                    <Button type="ghost" @click="handleResetCat('formCategory')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Card>
        </div>
        <div>
            <h2 class="row">类目列表</h2>
            <div class="row">
                <Cascader :data="categoryData" v-model="parentCategory" filterable change-on-select style="width: 200px;" placeholder="请选择父类目"></Cascader>
            </div>
            <div>
                <DragableTable
                        v-model="categoryTableData"
                        :columns-list="categoryTableColumn"
                        @on-start="handleOnStartCategory"
                        @on-end="handleOnEndCategory"
                ></DragableTable>
            </div>
        </div>
    </div>
</template>

<script>
  import Card from '../../../node_modules/iview/src/components/card/card.vue';
  import DragableTable from '@/views/tables/components/dragableTable.vue';
  import {SERVER_URL} from '@/assets/config.js';
  export default {
    components: {Card, DragableTable},
    name: 'category-editor',
    data () {
      return {
        categoryData: [],
        parentCategory: [],
        formCategory: {
          categoryName: '',
          parent: [],
          isLeaf: true,
          sortNum: 0
        },
        ruleValidate: {
          categoryName: [
            { required: true, message: '名字不能为空', trigger: 'blur' }
          ]
        },
        categoryTableColumn: [
          {
              title: '序号',
              type: 'index',
              width: 80,
              align: 'center'
          },
          {
            title: '类目名称',
            key: 'categoryName'
          },
          {
            title: '类目级别',
            key: 'lev'
          },
          {
            title: '叶节点',
            key: 'hasLeaf'
          },
          {
            title: '创建日期',
            key: 'createTime'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.attrRemove(params.index);
                    }
                  }
                }, '删 除')
              ]);
            }
          }
        ], // 类目属性列表
        categoryTableData: [],
        tableData: [],
        data2: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }]
      };
    },
    methods: {
      loadData (item, callback) {
        item.loading = true;
        setTimeout(() => {
          if (item.value === 'beijing') {
            item.children = [
              {
                value: 'talkingdata',
                label: 'TalkingData'
              },
              {
                value: 'baidu',
                label: '百度'
              },
              {
                value: 'sina',
                label: '新浪'
              }
            ];
          } else if (item.value === 'hangzhou') {
            item.children = [
              {
                value: 'ali',
                label: '阿里巴巴'
              },
              {
                value: '163',
                label: '网易'
              }
            ];
          }
          item.loading = false;
          callback();
        }, 1000);
      },
      handleSubmitCat (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let url = SERVER_URL + '/category/save';
            let data = this.formCategory;
            this.$http.post(url, data).then((response) => {
              // 1
              console.log(response.data);
              this.$Message.success('Success!');
            }, (response) => {
              // 2
              console.log(response);
              this.$Message.error('Fail!');
            });
            // this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        });
      },
      handleResetCat (name) {
        this.$refs[name].resetFields();
        this.formCategory.parent = [];
      },
      handleOnStartCategory (from) {},
      handleOnEndCategory (e) {
        console.log('table drag from: ' + e.from + 'to: ' + e.to);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>