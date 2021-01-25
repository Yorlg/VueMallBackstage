<template>
    <div style="height:100%;z-index:999">
    <el-scrollbar style="height: 100%;">
        <div style="width:99%;height:100%;">
        <div>
            <el-button type="primary" style=" font-size: 12px; width: 92px; height: 28px; float: left; padding: 0; background-color:#008080;border:1px solid #008080;" @click="inseup(1)">添加规则</el-button >
            <div style="height: 40px;"></div>
            <div class="custom-tree-container">
                <div class="block">
                        <el-tree :data="data" v-loading="loading" node-key="id" default-expand-all :expand-on-click-node="false" ref='tree' check-strictly :props="defaultProps" >
                        <span class="custom-tree-node" slot-scope="{ node, data }" >
                            <span>
                                <i :class="data.icon==null?'el-icon-star-off':data.icon"></i>
                                <span v-html="data.icon==''?data.method:''" style="font-size: 1px;font-weight: lighter;" ></span>
                                <font style="font-size: 1px;margin-left: 10px;" >{{ node.label }}</font>
                                <font style="font-size: 1px;margin-left: 10px;">{{data.frontpath}}</font>
                                <span :style="data.condition=='' || data.condition==null?'padding:0% 0%':'padding:0% 5%;background-color:#6C757D;color:white;font-size:1px;border-radius:5px;'" >{{data.condition}}</span>
                            </span>
                            <span>
                                <el-button @click="() => switchs(data)" size="mini" :type="data.status==1?'success':'danger'" v-text="data.status==1?'启用':'禁用'" plain>启用</el-button>
                                <el-button type="text" size="mini" style="color:#008080" @click="() => inseup(2,data)"> 增加 </el-button>
                                <el-button type="text" size="mini" style="color:#008080" @click="() => inseup(node, data)"> 修改 </el-button>
                                <el-button type="text" size="mini" style="color:#008080" @click="() => remove(node, data)"> 删除 </el-button>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
      </div>
      <!-- 弹窗 -->
          <el-dialog title="提示" :visible.sync="dialogFormVisible" width="70%">
			<el-form :model="form">
				<el-form-item label="上级规则" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="请选择规则" size="mini" style="float:left">
						<el-option label="顶级规则" value="0"></el-option>
						<el-option v-for="(item,index) in options" :key='index' :label="lab(item.level,item.name)" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="form.req1" :label-width="formLabelWidth">
					<el-radio v-model="radio" label="1" border size="mini"  style="float:left">菜单</el-radio>
					<el-radio v-model="radio" label="0" border size="mini"  style="float:left">规则</el-radio>
				</el-form-item>
				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" placeholder="名称" autocomplete="off" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="图标" :label-width="formLabelWidth" v-if="!bool">
					<el-input v-model="form.name1" placeholder="图标" autocomplete="off" size="mini"></el-input>
				</el-form-item>
        	    <el-form-item label="前端路由路径" :label-width="formLabelWidth"  v-if="bool1">
					<el-input v-model="form.frontpath" placeholder="前端路由路径" autocomplete="off" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="前台路由别名" :label-width="formLabelWidth"  v-if="!bool">
					<el-input v-model="form.name2" placeholder="前台路由别名" autocomplete="off" size="mini"></el-input>
				</el-form-item>
				<!-- 菜单/规则切换 -->
				<el-form-item label="后端规则" :label-width="formLabelWidth"  v-if="bool">
					<el-input v-model="form.name3" placeholder="后端规则" autocomplete="off" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="请求方式" :label-width="formLabelWidth"  v-if="bool" >
					<el-select v-model="form.region1" placeholder="请选择请求方式" size="mini">
						<el-option v-for="(item,index) in qqoptions" :key='index' :label="item.labels" :value="item.labels"></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item :label="form.req" :label-width="formLabelWidth">
					<el-radio v-model="radio2" label="1" border size="mini" style="float:left">启用</el-radio>
					<el-radio v-model="radio2" label="0" border size="mini" style="float:left">禁用</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="fqx(radio)">取 消</el-button>
				<el-button type="primary" @click="qd(form,radio,radio2)">确 定</el-button>
			</div>
		</el-dialog>
        <el-backtop target=".el-scrollbar__wrap" :bottom="100">
            <div style="{ height: 100%; width: 100%; background-color: #f2f5f6; box-shadow: 0 0 6px rgba(0,0,0, .12); text-align: center; line-height: 40px; color: #1989fa; }" >
            UP
            </div>
        </el-backtop>
        </div>
    </el-scrollbar>
  </div>
</template>

<script>
let id = 1000;

  export default {
    data() {
      return {
        data: [],
        defaultProps: {
            label: 'name',
            children: "child",
        },
        loading:true,
        dialogFormVisible: false,
        options:[],//顶级规则
        qqoptions:[ //请求方式
            { labels: "GET" },
            { labels: "POST" },
            { labels: "PUT" },
            { labels: "DELETE" },
        ],
        //弹窗框内的内容
        form: {
            name: "",
            region: "false",
            date1: "",
            date2: "",
            delivery: false,
            type: [],
            resource: "",
            desc: "",
            req: "",
            req1: "",
            name1: "",
            name2: "",
            name3: "",
            region1: "GET",
            frontpath: "",
        },
        formLabelWidth: '100px',
        radio: '0',
        radio2:'1',
        bool:true,
        bool1:false,
      }
    },

    methods: {
        //判断顶级规则前面那个符号
        lab(ind, names) {
				let name = "|";
				for (let i = 0; i < ind; i++) {
					name += '--'
				}
				if (ind > 0) {
					return name + names
				} else {
					return names
				}
			},
        handleNodeClick(data) {},
        //状态
        switchs(data){
            this.axios.post(`/admin/rule/${data.id}/update_status`,{
                status:(data.status==1?0:1)
            }).then((res) => {
                if (data.status == 1) {
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
                this.jurisdiction();
                this.loading=true
            }).catch((err) => {
                this.$message.error('演示数据，禁止操作!');
            });
        },
        //修改
        inseup(node,data){
            if(node == 1){//添加规则
                this.radio = '0'
                this.form.id='false'
                this.daname = '1'
                this.dialogFormVisible=true
            }else if(node == 2){//增加
                this.dialogFormVisible=true
                this.daname = '2'
                this.form.id='false'
                this.form.region = data.id
            }else{//修改
                this.dialogFormVisible=true
                this.daname = node
                this.radio = '1'
                this.id = data.id
                this.form.radio = data.menu
                if( data.rule_id == 0){
                    this.form.region = '0'
                }else{
                    this.form.region = data.rule_id
                }
                this.form.name = data.name
                this.radio2 = data.status+''
                this.order = ''
                this.form.frontpath = data.frontpath
                this.form.name2 = data.desc
                this.form.name1 = data.icon
                this.form.region1 = data.method
            }
        },
        //删除
        remove(node, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post(`/admin/rule/${data.id}/delete`,{})
                 .then((res) => {
                    if (res.statusText=="OK") {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.loading=true
                        this.jurisdiction();
                    }
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '演示数据，禁止操作'
                    });
                    this.loading=true
                    this.jurisdiction();
                });
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //获取数据
        jurisdiction() {
            this.axios.get("/admin/rule/1").then((res) => {
                this.data = res.data.data.list;
                this.loading=false
                this.options =res.data.data.rules
            });
        },

        //重置
        cz(){
            this.form.region="false"
            this.form.region1= "GET"
            this.form.frontpath=''
            this.form.name=''
            this.form.name1=''
            this.form.name2=''
            this.form.name3=''
        },
        //关闭弹出框
        fqx(rd) {
            this.dialogFormVisible = false;
            this.radio = "0";
            this.form.region="false"
            this.form.region1= "GET"
            this.form.frontpath=''
            this.form.name=''
            this.form.name1=''
            this.form.name2=''
            this.form.name3=''
        },
        //点击确定得时候
        qd(formes,r1,r2){
            if(this.daname == 1){
                if(this.form.name != '' ){//添加
                    this.axios.post(`/admin/rule`,{
                        menu: r1,
                        rule_id: formes.region,
                        name: formes.name,
                        status: r2,
                        frontpath: formes.frontpath,
                        desc: formes.name2,
                        condition: formes.name3,
                        icon: formes.name1,
                        method: formes.region1,
                        order: 50,
                    }).then((res) => {
                        if (res.statusText=="OK") {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.dialogFormVisible = false
                            this.cz()
                        }
                        this.jurisdiction();
                        this.loading=true
                    }).catch(() => {
                        this.warning("演示数据，禁止操作!")
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: 'rule_id必须是整数'
                    });
                    this.dialogFormVisible = false
                }
            }else if(this.daname == 2){//增加
                if(this.form.name != '' ){
                    this.axios.post(`/admin/rule`,{
                        menu: Number(r1),
                        rule_id: formes.region,
                        name: formes.name,
                        status: Number(r2),
                        frontpath: formes.frontpath,
                        desc: formes.name2,
                        condition: formes.name3,
                        icon: formes.name1,
                        method: formes.region1,
                        order: 50,
                    }).then((res) => {

                        if (res.statusText=="OK") {
                            this.$message({
                                type: 'success',
                                message: '增加成功!'
                            });
                            this.dialogFormVisible = false
                            this.cz()
                        }
                        this.jurisdiction();
                        this.loading=true
                    }).catch(() => {
                        this.warning("演示数据，禁止操作!")
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: 'name不能为空'
                    });
                    this.dialogFormVisible = false
                }
            }else{//修改
                if(this.form.name != '' ){
                    this.axios.post(`/admin/rule/${this.id}`,{
                        menu: r1,
                        rule_id: formes.region,
                        name: formes.name,
                        status: r2,
                        frontpath: formes.frontpath,
                        desc: formes.name2,
                        condition: formes.region,
                        icon: formes.name1,
                        method: formes.region1,
                        order: 50,
                    }).then((res) => {
                        if (res.statusText=="OK") {
                            this.$message({
                                type: 'success',
                                message: '增加成功!'
                            });
                            this.dialogFormVisible = false
                            this.cz()
                        }
                        this.jurisdiction();
                        this.loading=true
                    }).catch(() => {
                        this.warning("演示数据，禁止操作！")
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: 'name不能为空'
                    });
                    this.dialogFormVisible = false
                }
            }
        },


        //全局关闭的弹出框
          handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要退出吗？')
                .then(_ => {
                this.loading = true;
                this.timer = setTimeout(() => {
                    done();
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                        this.loading = false;
                        this.form.region="false"
                    }, 400);
                }, 200);
            })
            .catch(_ => {
            });
        },
    },
    //监听切换除了顶级规则，菜单就要多出来的一个框
    watch:{
        //监听菜单，规则的却换
        form:{
            handler(newval,oldval){
                if(this.radio == 1 && this.form.region!=0 && this.form.region!='false'){
                    this.bool1=true
                }else{
                    this.bool1=false
                }
            },
            deep:true,
        },
        //监听按钮 的却换
        radio(newval,oldval){
            if(this.radio == 1){
                this.bool = false
                if(this.radio == 1 && this.form.region!=0 && this.form.region!='false'){
                    this.bool1=true
                }else{
                    this.bool1=false
                }
            }else {
                this.bool = true
                this.bool1=false
            }
      },
      deep:true
    },
    created() {
        this.jurisdiction();
            
    },
  };
</script>

<style scoped="scoped">
html,
body,
div {
  overflow-y: hidden;
  overflow-x: hidden;
}
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding-right: 8px;
  }
.block{
    width:99%;
    height: 90%;
    padding-bottom: 5%;
}
::v-deep .el-tree-node__content {
  height: 37px;
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


</style>