<template>
    <div>
        <Form :model="formBrandItem" :label-width="80">
            <FormItem label="品牌名称">
                <Input v-model="formBrandItem.brandName" placeholder="品牌名称" />
            </FormItem>
            <FormItem label="品牌英文名称">
                <Input v-model="formBrandItem.brandNameEn" placeholder="品牌英文名称" />
            </FormItem>

        </Form>


    </div>
</template>

<script>
    export default {
        name: 'brand-editor',
        data () {
            return {
              formBrandItem:{
                brandId:null,
                brandName:null,
                brandNameEn:null,
                brandLogoUrl:null,
                backgroundUrl:null
              }
            };
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>