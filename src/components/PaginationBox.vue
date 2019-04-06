<template>
    <div class="pagination-box">
        <div class="block">
            <el-pagination
            v-if="paginations.totalCount > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
  export default {
    props:{
        paginations: Object
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('handleSize', val)
        },
        handleCurrentChange(val) {
            this.$emit('handleCurrent', val)
        }
    },
    data() {
        return {
            currentPage: 5,
        };
    }
  }
</script>
<style lang="scss" scoped>
    .pagination-box {
        width: 100% !important;
        text-align: center;
        .block {
            text-align: center;
        }
    }
    .el-pagination {
        white-space: inherit !important;
    }
</style>
