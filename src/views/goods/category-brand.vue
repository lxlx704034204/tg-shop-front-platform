<template>
    <div>
        <div class="row"><h2>类目品牌设置</h2></div>
        <div class="row">
            <Cascader :data="categoryData" v-model="selectCategory" placeholder="请选择类目" filterable change-on-select class="row" style="width: 250px;"></Cascader>
            <Select placeholder="请选择品牌" style="width: 250px" class="row"></Select>
            <Button>添加</Button>
        </div>
        <div>
            <Card>
                <p slot="title">类目品牌</p>
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
    name: 'CategoryBrand',
    data () {
      return {
        categoryData: [], // 选择类目下拉框
        selectCategory: [], // 选择的类目路径
        categoryBrandData: [], // 类目属性表格数据
        categoryBrandColumns: [
          {
            title: '排序',
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: '品牌名称',
            key: 'attrName'
          },
          {
            title: '英文名称',
            key: 'lev'
          },
          {
            title: '图片',
            key: 'hasLeaf'
          },
          {
            title: '背景图片',
            key: 'require'
          },
          {
            title: '二级类目',
            key: 'selectType'
          },
          {
            title: '三级类目',
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