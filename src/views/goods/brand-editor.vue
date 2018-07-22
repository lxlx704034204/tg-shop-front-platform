<template>
    <div>
        <Tabs value="name1" :value="brandTab">
            <TabPane label="品牌" name="brand">
                <h3>品牌管理</h3>
                <div class="row"><Input  v-model="searchTxt" icon="search" @on-click="handleSearchBrand" @on-enter="handleSearchBrand" placeholder="请输入名称搜索..." style="width: 200px" /></div>
                <div>
                    <Table border :columns="brandColumns" :data="brandTableData" :highlight-row="true" ></Table>
                </div>
            </TabPane>
            <TabPane label="新增" name="addBrand">
                <BrandEditorAdd></BrandEditorAdd>
            </TabPane>
            <TabPane label="编辑" :disabled="isEditDisabled" name="editBrand">编辑品牌</TabPane>
        </Tabs>

    </div>
</template>

<script>
    import Button from '../../../node_modules/iview/src/components/button/button.vue';
    import BrandEditorAdd from './brand-editor-add.vue';

    export default {
      components: {
          Button,
          BrandEditorAdd},
      name: 'brand-editor',
        data () {
            return {
              // 是否编辑
              isEditDisabled:true,
              // 当前Tab
              brandTab:'brand',
              // 搜索文本
              searchTxt:'',
              // 表格数据
              brandTableData:[],
              // 表格列
              brandColumns: [
                {
                  title: '品牌名称',
                  key: 'brandName'
                },
                {
                  title: '英文名称',
                  key: 'brandNameEn'
                },
                {
                  title: 'logo',
                  key: 'brandLogoUrl',
                  render: (h, params) => {
                    return h('img', {});
                  }
                },
                {
                  title: '背景图',
                  key: 'backgroundUrl'
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 150,
                  align: 'center',
                  render: (h, params) => {
                    return h('Poptip', {
                      props: {
                        confirm: true,
                        title: '您确定要删除这条数据吗?',
                        transfer: true
                      },
                      on: {
                        'on-ok': () => {
                          this.attrRemove(params);
                        }
                      }
                    }, [
                      h('Button', {
                        style: {
                          margin: '0 5px'
                        },
                        props: {
                          type: 'error',
                          placement: 'top'
                        }
                      }, '删除')
                    ]);
                  }
                }
              ]
            };
        },
      methods:{
        // 新增品牌
        addBrand (){

        },
        // 搜索
        handleSearchBrand (){

        }
      }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>