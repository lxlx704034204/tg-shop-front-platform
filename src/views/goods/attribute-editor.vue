<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
    <div>
        <div>
            <div>
                <!--<Icon type="ios-keypad"></Icon>-->
                <div><span style="font-size: 16px">属性</span> <Button size="small" class="margin-left-10" @click="toggleAddNewAttr">新建</Button></div>
            </div>
            <div>
                <div v-if="isAddNewAttr" class="form-row">
                    <Card>
                    <Form ref="formAttr" :model="formAttr" :label-width="80"  inline >
                        <FormItem label="属性名" >
                            <Input v-model="formAttr.attrName" placeholder="属性名..." />
                        </FormItem>
                        <FormItem label="显示名" >
                            <Input v-model="formAttr.showName" placeholder="默认同属性名..." />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="saveAttr">保存</Button>
                            <Button type="ghost" style="margin-left: 8px" @click="cancelAttr" >Cancel</Button>
                        </FormItem>
                    </Form>
                    </Card>
                </div>
            </div>
            <div class="margin-top-8">
                <div class="row"><Input  v-model="searchTxt" icon="search" @on-click="handleSearch" @on-enter="handleSearch" placeholder="请输入名称搜索..." style="width: 200px" /></div>
                <Table border :columns="attrColumns" :data="attrTableData" :highlight-row="true" @on-current-change="attrRowSelectChange"></Table>
                <Page :total="totalNum" :current="pageNum" :page-size="pageSize" show-total class="paging" @on-change="changePage"></Page>
            </div>
        </div>
        <div class="attrValue">
            <h2 v-if="currentRow!=null">{{currentRow.attrName}}--属性值</h2>
            <h2 v-else>属性值</h2>
            <div class="row">
                <Input v-model="attrValueName" icon="plus-round" :disabled="attrValueDisable"  class="margin-bottom-8" @on-click="handleAddAttrValue" @on-enter="handleAddAttrValue" placeholder="属性值名称..." style="width: 200px" />
            </div>
            <div>
                <!--<Table border :columns="attrValueColumn" :data="attrValueData" :highlight-row="true" @on-current-change="valueRowSelectChange"></Table>-->
                <DragableTable
                        v-model="attrValueData"
                        :columns-list="attrValueColumn"
                        @on-start="handleOnStart"
                        @on-end="handleOnEnd"
                ></DragableTable>
            </div>
        </div>

    </div>
</template>

<script>
    import DragableTable from '@/views/tables/components/dragableTable.vue';
    import Card from '../../../node_modules/iview/src/components/card/card.vue';
    import $ from 'jquery';
    import {SERVER_URL} from '../../assets/config.js';
    // import iView from 'iview';

  export default {
      name: 'attribute-editor',
    components: {
      Card,
      DragableTable
    },
      data () {
        return {
          // attr表单对象
          formAttr: {
            attrName: '',
            showName:''
          },
          isAddNewAttr: true,
          // 搜索框
          searchTxt: '',
          attrNewName: '',
          attrValueName: '',
          attrValueDisable: true,
          totalNum: 0,
          pageSize: 10,
          pageNum: 1,
          attrColumns: [
            {
              title: '属性名称',
              key: 'attrName'
            },
            {
                title: '显示名称',
                key: 'showName'
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
          ],
          // 属性表Data
          attrTableData: [],
          attrValueColumn: [
            {
              title: '序号',
              type: 'index',
              width: 80,
              align: 'center'
            },
            {
              title: '属性值名称',
              key: 'valueName'
            },
            {
              title: '创建时间',
              key: 'createTime'
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
                      this.attrValueRemove(params);
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
          ],
          // 属性值表data
          attrValueData: [],
          // 属性当前选中的行
          currentRow: null
        };
    },
      methods: {
        // 新建属性Button
        toggleAddNewAttr () {
          this.isAddNewAttr = !this.isAddNewAttr;
          this.$http.post(SERVER_URL + '/goods/test',{id:'1234567890'})
            .then((res)=>{
                console.log(res);
            },(err)=>{
                console.log(err);
            });
        },
        // 保存属性
        saveAttr () {
          if (this.formAttr.attrName === '') {
            return false;
          }
          // iView.LoadingBar.start();
          let url = SERVER_URL + '/api/goods/attribute/save';
          let param = {attrName: this.formAttr.attrName,showName:this.formAttr.showName};
          $.post(url, param, (result) => {
            if (result) {
              this.$Message.success('Success!');
              this.searchByPage(this.pageNum);
            } else {
              this.$Message.success('Fail! ' + result.msg);
            }
          });

          // this.isAddNewAttr = false;
          this.formAttr.attrName = '';
          // iView.LoadingBar.finish();
        },
        cancelAttr () {
          this.formAttr.attrName = '';
          this.isAddNewAttr = false;
        },
        // #End 新建属性
        // 条件搜索
        handleSearch () {
          this.searchByPage();
        },
        handleAddAttr () {},
        // 保存属性值
        handleAddAttrValue () {
          if(this.attrValueName && this.currentRow){
            let url = SERVER_URL + '/api/goods/attributeValue/save';
            let param = {attrId:this.currentRow.attrId,valueName:this.attrValueName};
            $.post(url,param,(data)=>{
              if(data.result){
                 this.attrRowSelectChange(this.currentRow);
              }
              this.attrValueName = '';
            });
          }
        },
        // 删除属性
        attrRemove (params) {
          console.log('params',params);
          let url = SERVER_URL + '/api/goods/attr/del/' + params.row.attrId;
          this.$http.get(url).then((res)=>{
            console.log(res);
            if(res.ok && res.body.result == 1) {
              this.attrTableData.splice(params.index, 1);
              this.attrValueDisable = true;
              this.$Message.success('操作成功.');
            }else{
              this.$Message.error('操作失败.');
            }
          },(res)=>{
            this.$Message.error('操作失败.');
          });

        },
        // 属性--属性值关联关系 删除
        attrValueRemove (param) {
          let attributeValueId = param.row.attributeValueId;
          let url = SERVER_URL + '/api/goods/attrValuePub/del/' + attributeValueId;
          $.post(url,(res)=>{
            if(res.result === 1){
              let index = param.index;
              this.attrValueData.splice(index, 1);
            }
          });
        },
        // 分页查询 pageNum 当前页码
        searchByPage () {
          let url = SERVER_URL + '/api/goods/attr/findByPage';
          let dataParam = {'attrName':this.searchTxt,'pageNum':this.pageNum,'pageSize':this.pageSize};
          $.post(url,dataParam,(response) => {
            let resultData = response;
            this.attrTableData = resultData.data;
            this.totalNum = resultData.total;
            this.pageSize = resultData.pageSize;
          });
        },
        // 分页
        changePage (index) {
          this.searchByPage();
        },
        // 选择属性行 事件
        attrRowSelectChange (currentRow, oldCurrentRow) {
          this.attrValueDisable = false;
          this.currentRow = currentRow;
          let attrId = currentRow['attrId'];
          let url = SERVER_URL + '/api/goods/getPubAttrValue/' + attrId;
          $.get(url,(response)=>{
            if(response.result === 1){
              this.attrValueData = response.data;
            }
          });
        },
        // 选择属性值行
        valueRowSelectChange (currentRow, oldCurrentRow) {
//          this.attrValueDisable = false;
          // console.log(currentRow, oldCurrentRow);
        },
        handleOnStart (from) {
          // console.log('table drag from: ' + from);
        },
        handleOnEnd (e) {
          let ids = '';
          this.attrValueData.forEach((item)=>{
            ids += item.attributeValueId + ',';
          });
          let url = SERVER_URL + '/api/goods/updatePubSort';
          $.post(url,{ids:ids},(data)=>{
            // console.log(data);
          });
        }
      },
    mounted () {
        // 加载属性
      this.searchByPage(1);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .paging{
        float:right;
        margin-top:10px;
        /*position: absolute;*/
    }
    .attrValue{
        margin-top: 50px;
    }
    .tab-title{
        font-size: 16px;
        margin-left: 10px;
    }
</style>