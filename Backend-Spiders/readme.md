初始化：
生成package.json文件： ` npm init -y `
生成tsconfig.json文件：`tsc --init`
安装ts-node: `npm install -D ts-node`
安装typescrpit: `sudo npm install -D typescript`
这是使用-D指的是安装在开发环境devDependencies

想要获取到页面的html，需要安装一个包superagent
安装superagent：npm install superagent --save

项目代码写完之后，由于不能外部使用不能直接用ts，所以需要编译
可以在package.json文件设置script下有个build命令，其实就是执行tsc
tsc默认会把目录下的所有ts文件，编译成js文件，但是会在同级目录下，因此需要设置tsconfig.json文件，把编译好的js文件放入build目录下
`tsc -w` 相当于watch文件，每次文件有改动，就自动编译成js文件
`nodemon` 包也是用来监听文件变化的，进行热更新的
`currently` 能过支持并行多种命令