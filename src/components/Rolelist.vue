<template>
    <div>
        <div style="width:100%;">
          <div style="width:280px;float:left" >
              <el-button type="primary" style="background-color:#008080;border:1px solid #008080;" size='mini' @click="insert(1)">添加角色</el-button>
          </div>
       </div>
        <el-table :data="tableData" v-loading="loading" style="width: 99%;" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }"  :row-style="{height:'auto'}">
            <el-table-column label="角色名称">
                <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column prop="role.name" label="角色描述">
                <template slot-scope="scope">{{scope.row.desc}}</template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-button @click="switchs(scope.row.id,scope.row.status)" size="small" :type="scope.row.status==1?'success':'danger'" v-text="scope.row.status==1?'启用':'禁用'" plain></el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="insert(scope.row)" type="text" size="small" style="color:#008080;">修改</el-button>
                    <el-button type="text" size="small" style="color:#008080;" @click="jurisdiction(scope.row)">配置权限</el-button>
                    <el-button type="text" size="small" style="color:#008080;" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="blocks">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
        <!-- 弹出框 -->
        <el-dialog :title="items" :visible.sync="dialogFormVisible" width="80%">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth" class="juese">
                    <el-input v-model="form.name" autocomplete="off" placeholder="角色昵称" size="mini" style="width:28%;float:left"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth">
                   <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea"> </el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-radio v-model="radio1" label="1" border style="float:left">启用</el-radio>
                    <el-radio v-model="radio1" label="0" border style="float:left">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="qx">取 消</el-button>
                <el-button type="primary" @click="submitForm()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 配置权限 -->
        <el-drawer title="配置权限" :before-close="handleClose" :visible.sync="dialog" direction="rtl" custom-class="demo-drawer" ref="drawer"  size='40%'>
            <div class="demo-drawer__content"  style="height:800px;">
                <el-scrollbar style="height:100%">
                    <div style="width:750px;height:auto;" >
                        <el-tree :data="data" show-checkbox check-strictly default-expand-all node-key="id" :default-checked-keys="power" ref="tree" highlight-current :props="defaultProps"> </el-tree>
                    </div>
                </el-scrollbar>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary"  @click="closeDrawer()">确定</el-button>
            </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            currentPage1: 1,
            page: 1,
            ount: 10,
            total: 10,
            items: "提示",
            radio1:'1',
            textarea: '',
            power:'',
            dialogFormVisible: false,
            form: {
                name: '',
                textarea: '',
            },
            formLabelWidth: '120px',
            //配置权限
            dialog: false,//按钮点击事件
            table: false,
            dialog: false,
            loading: false,
            gridData: [],
            data: [],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            loading: true//加载圈
        };
    },
    created() {
        this.select();
        this.Perlist();
        this.axios.get("/admin/role/1?limit=1000000")
        .then((res) => {
            this.total = res.data.data.list.length
        })
    },
    methods: {
        //查询
        select() {
            this.axios.get("/admin/role/" + this.page + "?limit=" + this.ount + "")
            .then((res) => {
                this.tableData = res.data.data.list,
                this.form.name = '';
                this.form.textarea = '';
                this.form.radio1 = 1;
                this.loading = false
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.ount = val
            this.select()

        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val
            this.select()
        },
        handleEdit(index, row) {

        },
        handleDelete(index, row) {

        },
        handleClick(row) {

        },
        //启用和禁用
        switchs(id,sta){
            this.axios.post(`/admin/role/${id}/update_status`,{
                status:(sta==0?1:0)
            }).then((res) => {
                if (sta == 1) {
                    this.$message({
                        type: 'success',
                        message: '启用成功!'
                    });
                }else{
                    this.$message({
                        type: 'success',
                        message: '禁用成功!'
                    });
                }
                this.select()
                this.loading = true
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: '演示数据，禁止操作!'
                });
            });

        },

        //权限列表
        Perlist() {
            this.axios.get(`/admin/rule/1`).then((res) => {
                this.data = res.data.data.list

                /*
                for(let i=0;i<res.data.data.list.length;i++){
                    let qx1 = {
                        id:res.data.data.list[i].id,
                        label:res.data.data.list[i].name,
                        children: [

                        ]
                    }
                    for (let j = 0; j < res.data.data.list[i].child.length; j++) {
                        let qx2 = {
                            id:res.data.data.list[i].child[j].id,
                            label:res.data.data.list[i].child[j].name,
                            children: [

                            ]
                        }
                        
                        for (let k = 0; k < res.data.data.list[i].child[j].child.length; k++) {
                            let qx3 = {
                                id:res.data.data.list[i].child[j].child[k].id,
                                label:res.data.data.list[i].child[j].child[k].name,
                                children: [

                                ]
                            }
                            qx2.children.push(qx3);
                        }
                        qx1.children.push(qx2);
                    }
                    this.data.push(qx1);
                }
                */
            })
        },

        //全屏关闭弹出框的提示
        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要退出吗？')
                .then(_ => {
                this.loading = true;
                this.timer = setTimeout(() => {
                    done();
                    this.$refs.tree.setCheckedKeys([])
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                        this.loading = false;
                    }, 400);
                }, 200);
            })
            .catch(_ => {
                this.$refs.tree.setCheckedKeys([])
            });
        },

        //取消配置权限
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
            this.$refs.tree.setCheckedKeys([])
        },

        jurisdiction(row){
            this.dialog = true
            this.form.id = row.id
            let arr = []
            for(var i=0;i<row.rules.length;i++){
                arr.push(row.rules[i].id)
            }
            this.power = arr
        },
        //给角色配置权限
        closeDrawer(){
            this.loading = true
            this.axios.post(`/admin/role/set_rules`,{
                id:this.form.id,
                rule_ids:this.$refs.tree.getCheckedKeys(),
            }).then((res) => {
            this.$message({
                    message: '配置成功',
                    type: 'success'
                });
                this.select();
                this.dialog = false;
                this.loading = true
                this.$refs.tree.setCheckedKeys([])
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '演示数据，禁止配置'
                });
                this.select();
                this.$refs.tree.setCheckedKeys([])
            });
            
        },
        //弹窗  判断添加还是修改
        insert(row) {
            if (row == 1) { //添加
                this.rowname=""
                this.form.name = '';
                this.form.textarea = '';
                this.radio1 = '1'
            }else { //修改
                this.rowname = row
                this.userid=row.id
                this.form.name = row.name;
                this.form.textarea = row.desc;
                this.radio1 = row.status+""
            }
            this.dialogFormVisible = true
        },
        submitForm() { //添加
            if (this.rowname=="") {
                if(this.form.name!=""){
                    this.$confirm('是否添加该用户进列表?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // for (let i = 0; i < 10; i++) {
                            this.axios.post(`/admin/role`,{
                                name:this.form.name+(i+1),
                                desc:this.form.textarea+(i+1),
                                status:this.radio1,
                            }).then((res) => {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                            this.loading = true
                            this.select();
                            })
                        // }
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消添加'
                        });          
                    });
                }
           }else {//修改
                if(this.form.name!=""){
                    this.axios.post(`/admin/role/${this.userid}`, {
                        name: this.form.name,
                        desc:this.form.textarea,
                        status: this.radio1,
                    }).then((res) => {
                        if(res.data.msg=="ok"){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                            this.loading = true
                            this.select();
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });          
                    });
                }
            }
        },
        //点击取消的时候
        qx(){
          this.dialogFormVisible = false
          this.$message({
              type: 'info',
              message: '已取消添加'
            });
        },
        //删除
        del(id){
            this.$confirm('是否删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post(`/admin/role/${id}/delete`,{
                        
                }).then((res) => {
                this.$message({
                        message: '删除成功',
                        type: 'success'
                });
                    this.select();
                    this.loading = true
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '演示数据，禁止操作！'
                    });          
                });
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: '演示数据，禁止操作!'
                });
            });
        },
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__bar.is-vertical {
    opacity: 1;//改为0不显示滚动条
}
::v-deep :focus {
    outline: 0;
}
.blocks{
    width:100%;
    height: 200px;
    position: fixed;
    top:93%;
    left: 129px;
    z-index: 100;
    padding-top: 17px;
    background-color: white;
    border-top: 1px solid #DEE2E6;
}
.demo-drawer__footer{
    width:100%;
    height: 200px;
    position: fixed;
    top: 93%;
    z-index: 100;
    line-height: 68px;
    text-indent: 24px;
    background-color: white;
    border-top: 1px solid #DEE2E6;
}
::v-deep .el-input__inner{
  height: 30px;
}

  .el-button--primary{
    color: #fff;
    background-color: #008080;
    border-color: #008080;
  }
  .el-button--primary:hover{
    background-color: rgb(11, 129, 112,0.8);
    border-color: #008080; 
  }
  .el-button--primary:focus{
    background-color: #008080;
    border-color: #008080;  
  }

::v-deep .el-scrollbar__wrap{
    overflow-x: hidden;
    }
</style>