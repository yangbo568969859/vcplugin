# vscode插件开发

## 开发环境准备

- Visual Studio Code
- Node.js
- Npm/Yarn
- vscode推荐的脚手架 Yeoman和Generator-code
- 插件打包和发布工具vsce

## 初始化项目

```bash
# 工具安装
npm install --global yo generator-code
# 创建插件项目
yo code
```

```bash
# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? npm

# ? Do you want to open the new folder with Visual Studio Code? Open with `code`
```

## 启动项目

打开 src/extension.ts 文件，并按下 F5即可运行项目

这里默认采用的就是Debug模式进行运行

我们也可以通过 vscode Debug窗口中的按钮点击运行位置如下

## 开发人员调试窗口

可以使用 Ctrl/cmd+Shift+P 打开一个命令调用窗口，并输入 Developer: Toggle Developer Tools，回车后即可打开一个和浏览器开发者调试工具一样的窗口

vscode 是基于electron框架开发的，所以必然也是拥有开发者调试工具的。这个相信开发过electron的小伙伴都懂。

## 插件打包 VSCE

### 安装

```bash
npm install -g @vscode/vsce

npm install -g vsce
```

或者不安装

```bash
npx vsce [命令参数]
```

```bash
vsce package
```

### 打包

打包成 VSIX

在项目根目录下执行

```bash
vsce package
```

这里需要注意，vsce打包时如果项目的依赖是采用了pnpm 进行下载的，vsce会打包失败的，需要删除node_modules 然后使用npm 重新下载，再执行 vsce package

### 发布

- 先去 [azure](https://dev.azure.com/) 创建账号，登录完点击以下链接，或者再次访问 azure
- 进去后，创建组织：（组织命名随便命，不一定要跟项目一致）
- 获取 Personal Access Token（右上角头像左边的用户按钮，下拉后有个菜单Personal Access Token，点击进入 ）
- 点击 New Token
- 创建好后复制保存好这个 Personal Access Token（PS：一定要记得保存下来）
- 创建发布者，访问[创建发布者页面publisher](https://marketplace.visualstudio.com/manage) （Name 最好跟上一步一样，好记一点）
- 执行命令登录 vsce login xxx，会要求输入Personal Access Token
- 在 package.json 中添加 publisher 字段
- 发布 vsce publish
- 查看插件发布情况，访问 [插件管理](https://marketplace.visualstudio.com/manage) 页面，点击查看发布历史

```bash
vsce publish
```

## 其他

### 右侧菜单图标显示
