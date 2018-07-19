<template>
    <div>
        <div class="row"><h2>类目属性设置</h2></div>
        <div class="row">
            <Cascader :data="categoryData" v-model="selectCategory" placeholder="请选择类目" filterable change-on-select style="width: 250px;"></Cascader>
        </div>
        <div>
            <div>
                <Card>
                    <p slot="title">父类目属性</p>
                    <Table :data="parentCategoryAttrData" :columns="parentCategoryAttrColumns"></Table>
                    <div class="row">
                        <Button>全选</Button>
                        <Button>添加父类目属性</Button>
                    </div>
                </Card>

            </div>
            <div>
                <Card>
                    <p slot="title"> 添加属性</p>
                    <div >
                        <Form ref="categoryAttrForm" :label-width="80" :model="formItems"  :rules="ruleValidate">
                            <FormItem label="属性名称" prop="attrName">
                                <!--<Input v-model="formItems.attrName" placeholder="属性名称"/>-->
                                <Select placeholder="属性名"></Select>
                            </FormItem>
                            <FormItem label="属性值">
                                <div>
                                    <checkbox>1</checkbox>
                                    <checkbox>2</checkbox>
                                    <checkbox>3</checkbox>
                                </div>
                            </FormItem>
                            <FormItem label="销售属性">
                                <i-switch >
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </FormItem>
                            <FormItem label="包含图片">
                                <i-switch >
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </FormItem>
                            <FormItem label="是否必选">
                                <i-switch >
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </FormItem>
                            <FormItem label="是否多选">
                                <i-switch >
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </FormItem>
                            <FormItem label="分组名称">
                                <Input placeholder="" />
                            </FormItem>
                            <FormItem label="排序号">
                                <Input placeholder="" />
                            </FormItem>

                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formCategory')">保存</Button>
                                <Button type="ghost" @click="handleReset('formCategory')" style="margin-left: 8px">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
            <Card>

                <p slot="title">类目属性</p>
                <DragableTable
                        v-model="categoryBrandData"
                        :columns-list="categoryBrandColumns"
                        @on-start="handleOnStartCategoryAttr"
                        @on-end="handleOnEndCategoryAttr"
                ></DragableTable>
            </Card>



        </div>
    </div>
</template>

<script>
  import DragableTable from '@/views/tables/components/dragableTable.vue';
    export default {
      components: {DragableTable},
        name: 'CategoryAttr',
        data () {
            return {
              categoryData: [], // 选择类目下拉框
              selectCategory: [], // 选择的类目路径
              parentCategoryAttrColumns: [
//                {
//                  title: '排序',
//                  type: 'index',
//                  width: 80,
//                  align: 'center'
//                },
                {
                  title: '选择',
                  key: 'action',
                  width: 150,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('CheckBox', {
                        props: {
                          type: 'ghost',
                          size: 'small'
                        },
                        on: {
                          click: () => {
//                            this.attrRemove(params.index);
                          }
                        }
                      }, '选 择')
                    ]);
                  }
                },
                {
                  title: '属性名称',
                  key: 'attrName'
                },
                {
                  title: '销售属性',
                  key: 'lev'
                },
                {
                  title: '有图片',
                  key: 'hasLeaf'
                },
                {
                  title: '必选',
                  key: 'require'
                },
                {
                  title: '选择类型',
                  key: 'selectType'
                },
                {
                  title: '创建日期',
                  key: 'createTime'
                }
              ], // 父类目列表
              parentCategoryAttrData: [],
              categoryBrandData: [], // 类目属性表格数据
              categoryBrandColumns: [
                {
                  title: '排序',
                  type: 'index',
                  width: 80,
                  align: 'center'
                },
                {
                  title: '属性名称',
                  key: 'attrName'
                },
                {
                  title: '销售属性',
                  key: 'lev'
                },
                {
                  title: '有图片',
                  key: 'hasLeaf'
                },
                {
                  title: '必选',
                  key: 'require'
                },
                {
                  title: '选择类型',
                  key: 'selectType'
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
                      }, '删除')
                    ]);
                  }
                }
              ], // 表格列
              formItems: {
                attrName: null
              },
              ruleValidate: {
                attrName: [
                  { required: true, message: '名字不能为空', trigger: 'blur' }
                ]
              } // 表单验证
            };
        },
      methods: {
        // 表格拖拽开始
        handleOnStartCategoryAttr (f) {
          // TODO
        },
        // 表格拖拽结束
        handleOnEndCategoryAttr (e) {
          // TODO
        },
        // 提交表单
        handleSubmit () {
            // TODO
        },
        // 重置表单
        handleReset () {}
      }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>