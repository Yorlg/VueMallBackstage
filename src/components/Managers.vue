<template>
    <div>
        <div style="width:100%;min-width: 600px;">
          <div style="width:93px;float:left;">
              <el-button type="primary" style="background-color:#008080;border:1px solid #008080;" size='mini' @click="insert(1)">添加管理员</el-button>
          </div>
          <div style="width:300px;float:right;margin-right:10px">
            <el-input style="width:220px;float:left;margin-right:10px" v-model="input" placeholder="请输入用户名"></el-input>
            <el-button type="primary" style="float:left;background-color:#909399;border:1px solid #909399;" size='mini' @click="skoe()">搜索</el-button>
          </div>
       </div>
        <el-table :data="tableData"  v-loading="loading" style="width: 99%;height:80%;padding-bottom: 40px;" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }" :border="true">
            <el-table-column prop="" label="用户头像">
              <!-- <div style="border-radius: 30px;width:50px;height:50px;background-color:#C0C4CC;margin:auto;"></div> -->
              <el-avatar src="https://babyimage.cdn.bcebos.com/common/a42d5d92d845ac8764809174f3575e57000200000200.jpg"></el-avatar>
            </el-table-column>
            <el-table-column prop='username' label="用户名"></el-table-column>
            <el-table-column prop='role.name' label="所属管理员"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-button @click="switchs(scope.row.id,scope.row.status)" size="small" :type="scope.row.status==1?'success':'danger'" v-text="scope.row.status==1?'启用':'禁用'" plain></el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="insert(scope.row)" type="text" size="small" style="color:#008080;">修改</el-button>
                    <el-button type="text" size="small" style="color:#008080;" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="blocks">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div> 
         <!--弹窗  -->
        <el-dialog :title="items" :visible.sync="dialogFormVisible" width="75%">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth" class="juese">
                    <el-input v-model="form.uname" autocomplete="off" placeholder="用户名" size="mini" style="width:28%;float:left"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.pass" autocomplete="off" placeholder="密码" size="mini" style="width:28%;float:left"></el-input>
                </el-form-item>
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <el-avatar style="float:left"> user </el-avatar>
                </el-form-item>
                <el-form-item label="所属角色" :label-width="formLabelWidth" style="width: 100%;">
                    <el-select v-model="form.id" placeholder="请选择所属角色">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-radio v-model="radio1" label="1" border style="float:left">启用</el-radio>
                    <el-radio v-model="radio1" label="0" border style="float:left">禁用</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="qx">取 消</el-button>
                <el-button type="primary" @click="submitForm()" :plain='true'>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 1,//分页
            input: '',//搜索输入框
            tableData: [],//所有管理员的数组
            page: 1,//页
            ount: 10,//一页多少个
            total: 10,//共有XX人
            items: "提示",//增加修改弹出框的title
            radio1:'1',//状态的颜色
            options:[],//所属管理员
            dialogFormVisible: false,
            
            form: {
                uname: '',
                pass: '',
                id:''
            },
            formLabelWidth: '120px',
            loading: true//加载圈
        };
    },
    created(){
        this.datainit();
    },
    methods: {
        //查询
        datainit(){
            this.axios.get(`/admin/manager/1?limit=1000000`)
            .then((res) => {
                this.total = res.data.data.list.length
            })

            this.axios.get(`/admin/manager/${this.page}?limit=${this.ount}&keyword=${this.input}`)
            .then((response) => {
                //获取管理员
                this.options = response.data.data.role
                this.tableData = response.data.data.list
                this.loading=false
                if(this.input != ''){
                    this.total = response.data.data.list.length
                }
            })
            
        },
        //搜索框
        skoe(){
             this.datainit()
        },
        handleSizeChange(val) {
            this.loading=true
            console.log(`每页 ${val} 条`);
            this.ount = val
            this.tableData = []
            this.datainit()
        },
        handleCurrentChange(val) {
            this.loading=true
            console.log(`当前页: ${val}`);
            this.page = val
            this.tableData = []
            this.datainit()
        },
        handleClick(row) {
            
        },

        //弹窗
        insert(row) {
            if (row == 1) { //添加
                this.rowname = ""
                this.form.uname = ""
                this.form.pass = ""
                this.form.id = ""
                this.radio1 = "1"
            }else { //修改
                this.rowname = row
                this.userid=row.id
                this.form.uname = row.username
                this.form.id = row.role.id
                this.radio1 = row.status+""
            }
            this.dialogFormVisible = true
        },
        submitForm() { //添加
        this.loading=true
            if (this.rowname=="") {
                if(this.form.uname!=""){
                    this.axios.post(`/admin/manager`, {
                        username: this.form.uname,
                        password: this.form.pass,
                        avatar:'',
                        role_id: this.form.id,
                        status: this.radio1,
                    }).then((res) => {
                        if(res.data.msg=="ok"){
                            this.$message({
                                type: 'success' ,
                                message: '添加成功'
                            });
                            this.dialogFormVisible = false
                            this.loading=false
                            this.datainit()
                        }
                    }).catch(() => {
                        this.$message.error('用户已存在');
                    })
                }else{
                    this.$message({
                        type: 'error',
                        message: '添加失败'
                    });
                }
            }else {//修改
                if(this.form.uname!=""){
                    this.axios.post(`/admin/manager/${this.userid}`, {
                        username: this.form.uname,
                        password: this.form.pass,
                        avatar: "",
                        role_id: this.form.id,
                        status: this.radio1,
                    }).then((res) => {
                        if(res.data.msg=="ok"){
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                            this.dialogFormVisible = false
                            this.datainit()
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '数据没有改变'
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
              message: '已取消事件'
            });    
        },
        //状态
        switchs(id,sta){
            this.axios.post(`/admin/manager/${id}/update_status`,{
                status:(sta==1?0:1)
            }).then((res) => {
                if (sta == 1) {
                    this.$message({
                        type: 'success',
                        message: '禁用成功!'
                    });
                }else{
                    this.$message({
                        type: 'success',
                        message: '启用成功!'
                    });
                }
                this.datainit();
                this.loading=true
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: '演示数据，禁止操作!'
                });
            });
        },
        //删除
        del(id){
            this.$confirm('是否删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post(`/admin/manager/${id}/delete`,{
                        
                }).then((res) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.datainit();
                    this.loading=true
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '演示数据，禁止操作！'
                    });          
                });
            }).catch(() => {
                this.$message({
                type: 'info',
                    message: '已取消删除'
                });     
            });
        },
    }
}
</script>

<style lang="scss" scoped>
body {
    margin: 0;
}
::v-deep .el-scrollbar__bar.is-vertical {
    opacity: 1;//改为0不显示滚动条
}
.blocks{
    width:100%;
    height: 50px;
    position: fixed;
    top:93%;
    left: 129px;
    z-index: 100;
    padding-top: 17px;
    background-color: white;
    border-top: 1px solid #DEE2E6;
}
::v-deep .el-input__inner{
  height: 30px;
}
::v-deep .el-table td{
  padding: 9px 0;
}
.el-button--primary.is-plain {
        color: #fff;
        background-color: teal;
        border-color: teal;
    }

    .el-input {
        width: 200px;
    }
</style>