<template>
  <div id="main" >
    <el-container >
      <!-- 顶部导航栏 -->
      <el-header>
        <el-container >
          <el-header style="position: fixed; width: 100%; z-index: 100;min-width:750px">
            <span style="margin-left: 23px;">UNI-ADMIN</span>
            <span style="float: right;">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">商品</el-menu-item>
                <el-menu-item index="3">订单</el-menu-item>
                <el-menu-item index="4">会员</el-menu-item>
                <el-menu-item index="5">设置</el-menu-item>
                <el-submenu index="2-4">
                  <template slot="title" >
                      <el-avatar src="https://www.whhost.net/tu/202101/TX6437_15.jpg"></el-avatar> {{ hqname }}
                  </template>
                  <el-menu-item index="6">修改</el-menu-item>
                  <el-menu-item index="7" @click="close">退出</el-menu-item>
                </el-submenu>
              </el-menu>
            </span>
          </el-header>
        </el-container>
      </el-header>
      <!-- 左边导航栏 -->
      <el-container>
        <el-aside width="130px" style="min-width:600;border-right: 1px solid #e6e6e6;">
          <el-row style="position: fixed;">
            <el-menu default-active="8-3" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" >
              <router-link to='/Home/Basicsettings'>
                  <el-menu-item index="8-1">
                    <i class="el-icon-s-help"></i>
                    <span slot="title" style="font-size: 0.7rem">基础设置</span>
                  </el-menu-item>
              </router-link>
                <router-link to='/Home/Logisticssetup'>
                  <el-menu-item index="8-2">
                    <i class="el-icon-s-help"></i>
                    <span slot="title" style="font-size: 0.7rem">物流管理</span>
                  </el-menu-item>
                </router-link>

                <router-link to='/Home/Administrator'>
                  <el-menu-item index="8-3">
                    <i class="el-icon-s-help"></i>
                    <span slot="title" style="font-size: 0.7rem">管理员管理</span>
                  </el-menu-item>
                </router-link>
                <router-link to='/Home/Transaction'>
                  <el-menu-item index="8-4">
                    <i class="el-icon-s-help"></i>
                    <span slot="title" style="font-size: 0.7rem">交易设置</span>
                  </el-menu-item>
                </router-link>
            </el-menu>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "5",
      hqname: "",
      to:'',
    };
  },
  created() {
    this.verification();
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //获取token 和name 值
    verification() {
      this.hqname = sessionStorage.getItem("uname"); //把临时存储的用户名称赋值给指定的容器
      this.to = sessionStorage.getItem("token")
    },
    //退出登入
    close(){
      this.axios.post(`/admin/logout`,{
          token:this.to
      }).then((response) => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("Url")
        this.$router.replace('/Login');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出失败'
        });          
      });
    }
  },
};
</script>

<style lang="scss" scoped>
#main {
  width: 100%;
  height: 100%;
  .el-container{
  height: 100%;
  overflow: hidden;
  }
}
::v-deep .el-header{
    padding: 0 0px;
    box-sizing: border-box;
    flex-shrink: 0;
}
.el-header,
.el-footer {
  background-color: #545c64;
  color: #fff;
  line-height: 61px;
  min-width: 600px;
}

::v-deep .el-menu{
  border-right: none;
}
// .el-menu-demo .el-menu-item:nth-child(5) {
//   border-bottom-color: #ffd04b !important;
//   font-size: 16px;
//   color: rgb(255, 208, 75) !important;
// }
// .el-menu-demo .el-menu-item:nth-child(1) {
//   border-bottom-color: #545c64 !important;
//   color: #fff !important;
// }
</style>