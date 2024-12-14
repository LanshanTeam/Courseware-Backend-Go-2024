# linux

# 1.linux的使用

### why？

很多同学不理解为什么做后端还需要使用linux呢🧐？我的看法是可以不用，但是做服务端开发是不可避免会与linux打交道，所以得会用。

- 大部分服务器都是以linux作为服务器的操作系统，我觉得主要一个是linux本身性能和稳定性优秀，另外一个就是开源内核不需要额外的许可证费用。
- 你不一定非要在linux上开发，可能仅仅只有在部署项目的时候你才能接触到linux。但是了解linux的使用，当你项目突然出错，例如cpu占用率飙升，内存被吃满等等，能更好地让你找出问题

### where?

这里提供一些使用linux的常用途径：

- 云服务器(recommend)
- 子系统(wsl)(recommend)
- 虚拟机
- 实体系统

### how?

​	我们接触到的终端实际上是一个叫做shell的软件，我们输入的这些命令实际上是对应着linux原生提供的系统调用或者二进制可执行文件，shell会将输入的命令解析，然后执行命令。

​	这里列举并演示一些常用命令😈:

man,ls,cd,pwd,mkdir,touch,rm,rmdir,mv,cp,cat,which,whereis,find,tar,gzip,chmod,chown,top,free,lsof,ifconfig,ping,traceroute,netstat,telnet,ln,grep,ps,mount...

​	列举一些学习途径：

- [黑马(我以前看的这个，有点啰嗦)](https://www.bilibili.com/video/BV1n84y1i7td/?spm_id_from=333.337.search-card.all.click&vd_source=0d49ad174eccd1b38796855d72541fba)
- [韩顺平](https://www.bilibili.com/video/BV1Sv411r7vd)
- [狂神](https://www.bilibili.com/video/BV187411y7hF)
- [命令查询网站](https://wangchujiang.com/linux-command/)
- [linux档案(可能你需要？)](https://www.kernel.org/)
- 《鸟哥的linux私房菜》(我没看过)
- 其他优秀的学习资料等待优秀的你去发现吧

### 2.linux的原理

​	这里指的也就是操作系统(OS)课程,作为计算机基础之一，我认为是四大件中的重中之重，不管你是做网络编程还是底层基础架构，你想要更高的上限，都必须要熟悉操作系统原理，所以请不要忽视操作系统基础😜

​	这节课课上不会来讲os,仅仅只是提供一些学习os的途径：

 - 网课(⭐代表难度)：
   - [哈工大⭐⭐⭐](https://www.bilibili.com/video/BV19r4y1b7Aw/?spm_id_from=333.337.search-card.all.click)
   - [麻省理工⭐⭐⭐⭐](https://pdos.csail.mit.edu/6.828/2021/schedule.html)
   - [南京大学⭐⭐⭐⭐⭐](https://www.bilibili.com/video/BV1Xm411f7CM/?spm_id_from=333.337.search-card.all.click&vd_source=0d49ad174eccd1b38796855d72541fba)