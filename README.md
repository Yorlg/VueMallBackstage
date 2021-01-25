
vue-cli2.0没有可视化图形界面的，所以整个下载和创建项目的过程，我们都是在cmd里面进行。

（据说cli3.0出了图形操作界面）

这里采用官网上面推荐的npm方式：

需要下载和安装的：

node.js：自带npm
vue-cli：脚手架构建工具，可以帮助我们创建项目
vue-router：vue跳转页面的路由，在创建项目时候可选择安装
依赖：安装项目所必须的依赖文件
VScode：最好用来写vue代码的IDE
# 1.安装node.js

官方网址：https://nodejs.org/en/

安装完成后：

打开命令行检测版本信息：分别输入node-v    npm-v
出现 V8.x.x 就说明安装成功了

# 2.安装国内淘宝镜像cnpm

用cnpm来替代npm，加速我们接下来依赖环境的下载速度

输入命令：npm install -g cnpm --registry=http://registry.npm.taobao.org 
出现 `updated 2 packages in xx.xxxs`

# 3.安装vue-cli脚手架工具

输入命令：npm install -g vue-cli 
在本地电脑创建一个目录来保存vue项目
并进入到该目录下：cd  NodeTest


创建一个项目：

输入命令：vue init webpack firstApp

firstApp为项目名，你可以自己随便起名，但要注意命名规则

运行初始化命令的时候会让用户输入几个基本的配置选项，如项目名称、项目描述、作者信息等等，

对于有些不明白或者不想填的信息可以一直按回车去填写。

Install  vue-router?  这里选yes，没选也没事，后面可以在IDE里手动安装。

接着去看项目是否创建成功：


# 4.项目创建成功，但还缺少依赖文件

进入到项目中，安装项目的依赖

输入命令：cd       firstApp

输入命令：cnpm    install


如果安装过程无反应或者意外中断，可以关闭cmd重新打开，重复这一步命令。

安装完成：进入项目目录下可以看到多出一个node_modules文件夹


# 7.介绍一下各个目录文件的作用

介绍一下目录及其作用：

     build：最终发布的代码的存放位置。

     config：配置路径、端口号等一些信息，我们刚开始学习的时候选择默认配置。

     node_modules：npm 加载的项目依赖模块。

     src：这里是我们开发的主要目录，基本上要做的事情都在这个目录里面，里面包含了几个目录及文件：

             assets:放置一些图片，如logo等

             components:目录里放的是一个组件文件，放置我们书写的vue页面。

             App.vue：项目入口文件，我们也可以将组件写这里，而不使用components目录。

            main.js ：项目的核心文件

     static：静态资源目录，如图片、字体等。

     test：初始测试目录，可删除

      .XXXX文件：配置文件。

     index.html：首页入口文件，可以添加一些meta信息或者其他的信息。

     package.json：项目配置文件。

     README.md：项目的说明文件。

  

    这就是整个项目的目录结构，其中，我们主要在src目录中做修改。
