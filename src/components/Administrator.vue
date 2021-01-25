<template>
      <div style="height:100%;">
        <el-scrollbar style="height:100%;min-width:600px">
            <div style="width:99%;height:100%;" >
                <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size:15px;width:100%;line-height:30px;border-bottom:1px solid #DEE2E6">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
              </el-breadcrumb>
              <el-tabs v-model="activeName" @tab-click="handleLoad" style="text-align:left;">
                  <el-tab-pane label="管理员列表" name="first">
                    <Mana :key="timer1"></Mana>
                  </el-tab-pane>
                  <el-tab-pane label="角色列表" name="second">
                    <Role :key="timer2"></Role>
                  </el-tab-pane>
                  <el-tab-pane :key="timer3" label="权限列表" name="third">
                    <Prem></Prem>
                  </el-tab-pane>
              </el-tabs>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import Prem from '@/components/Permissionlist';
import Role from '@/components/Rolelist';
import Mana from '@/components/Managers';
export default {
    data() {
        return {
            activeName: 'first',
            timer1: '',
            timer2: '',
            timer3: '',
        };
    },
    mounted() {
        
    },
    components: {
      Prem,
      Role,
      Mana
    },

    methods: {
        handleLoad(data) {
          let name = data.name
          if (name == 'first') {
            this.timer1 = new Date().getTime()
          } else if (name == 'second') {
            this.timer2 = new Date().getTime()
          } else if (name == 'third') {
            this.timer3 = new Date().getTime()
          }
			},
    },
};
</script>

<style lang="scss" scoped>
body {
    margin: 0;
}
::v-deep .el-scrollbar__wrap{
  overflow-x: hidden;
}
	::v-deep .el-scrollbar__bar .is-vertical {
				width: 0.3rem;
				border-radius: 0rem;
				// opacity: 1;//改为0不显示滚动条
			}
  //滚动条的宽度
  ::v-deep .el-scrollbar__bar .el-scrollbar__thumb {
    // width: 0.3rem;
    border-radius: 1rem;
    background-color: #999;
  }

</style>