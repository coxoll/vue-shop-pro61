<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div id="logo-box">
        <!-- 图片、文字 -->
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <!-- 退出按钮 -->
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside :width="menushow ? '65px':'200px'">
        <!-- letter-spacing:"文字间隔";悬停小手图标cursor:pointer;不允许选中user-select:none; -->
        <div
          style="height:25px;color:white;text-align:center;line-height:25px;background-color:rgb(74, 80, 100);font-size:12px;letter-spacing:0.1em;cursor:pointer;user-select:none;"
          @click="menushow=!menushow"
        >|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :style="menushow?'width:65px;':'width:200px;'"
          :collapse="menushow"
          :collapse-transition="false"
          :collapse-opened="true"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="(item,k) in menuList" :key="item.id">
            <template slot="title">
              <i :class="'iconfont icon-' + menuicon[k]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="item2.path"
              v-for="item2 in item.children"
              :key="item2.id"
            >
            <i class="el-icon-menu"></i>
            {{item2.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 生命周期函数获取列表数据
  created() {
    this.getMenuList()
  },
  data() {
    return {
      // 设定左侧菜单 收起、展开
      menushow: false,
      // 接收左侧列表按钮数据
      menuList: [],
      // 左侧列表图标
      menuicon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    // 获取左侧列表数据
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      // 把获取到的数据赋予给menuList
      this.menuList = res.data
    },
    // 退出系统
    logout() {
      this.$confirm('确认要退出系统么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: rgb(55, 61, 65);
    padding: 0;
    // 弹性盒子
    display: flex;
    align-items: center;
    justify-content: space-between;
    #logo-box {
      font-size: 22px;
      color: #fff;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
