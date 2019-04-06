<template>
    <el-table :data="contributeData" :cell-style="cellStyle" :header-cell-style="cellStyle"  style="width: 100%;margin-bottom:50px;" v-if="isOk" border highlight-current-row>
        <el-table-column label="投稿标题" width="600" :cell-style="leftStyle">
            <template slot-scope="scope" >
                <span style="cursor:pointer;" @click="goArticleInfo(scope.row.isRelease,scope.row.id)">{{ scope.row.title }}</span>
            </template>
        </el-table-column>

        <el-table-column label="投稿时间" width="250">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.contributeTime | dateFormat }}</span>
            </template>
        </el-table-column>

        <el-table-column label="投稿状态" width="180">
            <template slot-scope="scope">
                <span>{{ scope.row.isRelease == 1 ? '已发布' : '审核中' }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" style="text-align: center">
        <template slot-scope="scope" style="text-align: center">
            <el-button
            size="mini"
            type="primary"
            class="btn"
            @click="goArticleInfo(scope.row.isRelease,scope.row.id)" v-if="scope.row.isRelease==0?false:true">
            <span>查看</span></el-button>

            <el-button
            size="mini"
            type="danger"
            class="btn"
            @click="handleDelete(scope.row.id)">
            <span>删除</span></el-button>

        </template>
        </el-table-column>
    </el-table>
</template>

<script>

import moment from 'moment'

    export default {
        props: {
            contributeData: Array,
            isOk: Boolean
        },
        mounted() {
            console.log(document.getElementsByTagName('th')) 
            const arr = Array.prototype.slice.call(document.getElementsByTagName('th'))
            console.log(arr)
        },
        data() {
            return {
                
            }
        },
        methods: {
            goArticleInfo(isRelease, id) {
                if( parseInt(isRelease) == 0) {
                    this.$notify({
                        type: 'warning',
                        title: '待审核状态无法查看投稿文章'
                    })
                    return
                }
                // this.$router.push({path: `/articleInfo/${id}`})
                const {href} = this.$router.resolve({
                    name: 'ArticleInfo',params: {id: id}
                })
                window.open(href, '_blank')
            },
            center() {
                return 'text-align: center'
            },

            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(id) {
                this.$axios.post('/api/contribution/delete',{id: id})
                    .then(result => {
                        const { code, msg, data } = result.data
                        if( code === 0 ) {
                            this.$message.error(msg)
                            return
                        }

                        if( code === 1 ) {
                            this.$message({
                                type: 'success',
                                message: msg
                            })
                            this.$emit('getContribute')
                            return
                        }
                    })
            },
            cellStyle() {
                return 'text-align:center'
            },
            leftStyle() {
                return 'text-align:left !important'
            }
        },
        filters: {
            dateFormat: dataStr => {
                dataStr = parseInt(dataStr)
                moment.locale('zh-cn') //设置中文显示
                return moment(dataStr).format('YYYY-MM-DD HH:mm:ss');
            },
        }
    }
</script>

<style lang="scss" scoped>

.btn {
    padding: 0;
    padding: 8px 10px;
    span {
        color: #fff;
    }
}

tr:first-child {
    text-align: left !important;
    td {
    text-align: left !important;

    }
}
.center {
    text-align: center !important;
}
</style>
