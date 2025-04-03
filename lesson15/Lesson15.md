# 微服务框架介绍及使用

[go-zero官网](https://go-zero.dev/)

## 框架概述

## go-zero[](https://go-zero.dev/docs/concepts/overview#go-zero)

> ***缩短从需求到上线的距离\***

go-zero 是一个集成了各种工程实践的 web 和 rpc 框架。通过弹性设计保障了大并发服务端的稳定性，经受了充分的实战检验。

go-zero 包含极简的 API 定义和生成工具 goctl，可以根据定义的 api 文件一键生成 Go, iOS, Android, Kotlin, Dart, TypeScript, JavaScript 代码，并可直接运行。

## 使用 go-zero 的好处[](https://go-zero.dev/docs/concepts/overview#使用-go-zero-的好处)

- 轻松获得支撑千万日活服务的稳定性
- 内建级联超时控制、限流、自适应熔断、自适应降载等微服务治理能力，无需配置和额外代码
- 微服务治理中间件可无缝集成到其它现有框架使用
- 极简的 API 描述，一键生成各端代码
- 自动校验客户端请求参数合法性
- 大量微服务治理和并发工具包

### 下载

在正式开始使用go-zero框架之前，你需要先安装对应的组件。

[goctl 安装 | go-zero Documentation](https://go-zero.dev/docs/tasks/installation/goctl)（goctl 是 go-zero 的内置脚手架，是提升开发效率的一大利器，可以一键生成代码、文档、部署 k8s yaml、dockerfile 等。）

[protoc 安装 | go-zero Documentation](https://go-zero.dev/docs/tasks/installation/protoc)（[protoc](https://protobuf.dev/) 是一个用于生成代码的工具，它可以根据 proto 文件生成C++、Java、Python、Go、PHP 等多重语言的代码，而 gRPC 的代码生成还依赖 [protoc-gen-go](https://github.com/golang/protobuf/tree/master/protoc-gen-go)，[protoc-gen-go-grpc](https://pkg.go.dev/google.golang.org/grpc/cmd/protoc-gen-go-grpc) 插件来配合生成 Go 语言的 gRPC 代码。）

[go-zero 安装 | go-zero Documentation](https://go-zero.dev/docs/tasks/installation/go-zero)

[goctl-intellij 安装 | go-zero Documentation](https://go-zero.dev/docs/tasks/installation/goctl-intellij)（goctl-intellij 是 go-zero api 描述语言的 intellij 编辑器插件，支持 api 描述语言高亮、语法检测、快速提示、创建模板特性。）

### 教程（这里教大家最基本的一些使用方法，进阶用法还得下来花时间学习成熟的项目才行）

以用户注册接口为例：

这里以user服务为例，首先我们先定义user服务的api文件：

```
syntax = "v1"

type (
    // 定义注册接口的请求体
    RegisterReq {
       Username string `json:"username"`
       Password string `json:"password"`
    }
    // 定义登录接口的响应体
    RegisterResp {
       Code int64  `json:"code"`
       Msg  string `json:"msg"`
    }
)

// 定义 HTTP 服务
// 微服务名称为 user，生成的代码目录和配置文件将和 user 值相关
service user {
    // 定义 http.HandleFunc 转换的 go 文件名称及方法
    @handler Register
    // 定义接口
    // 请求方法为 post
    // 路由为 /user/login
    // 请求体为 RegisterReq
    // 响应体为 RegisterResp，响应体必须有 returns 关键字修饰
    post /user/register (RegisterReq) returns (RegisterResp)
}
```

定义好user服务的api文件后，我们再来定义user服务rpc对应的proto文件：

```
syntax = "proto3";

package user;

option go_package = "./pb";

message RegisterReq{
    string Username =1;
    string Password =2;
}

message RegisterResp{
}

service User{
  rpc Register(RegisterReq) returns(RegisterResp);
}
```

定义完成后，我们使用goctl工具生成api和rpc的代码：

在api文件的父目录desc下打开终端执行：

`goctl api go -api user.api -dir ../  --style=goZero`

(user.api替换成你的api文件)(../表示生成的代码在desc的父目录下)

在proto文件的父目录desc下打开终端执行：

`goctl rpc protoc user.proto --go_out=../ --go-grpc_out=../  --zrpc_out=../ --style=goZero`

(user.proto替换成你的proto文件)(../表示生成的代码在desc的父目录下)

随后刷新一下项目，你会发现多了很多东西：

example
├── etc
│   └── example.yaml
├── main.go
└── internal
    ├── config
    │   └── config.go
    ├── handler
    │   ├── xxxhandler.go
    │   └── xxxhandler.go
    ├── logic
    │   └── xxxlogic.go
    ├── svc
    │   └── servicecontext.go
    └── types
        └── types.go

- example：单个服务目录，一般是某微服务名称
- etc：静态配置文件目录
- main.go：程序启动入口文件
- internal：单个服务内部文件，其可见范围仅限当前服务
- config：静态配置文件对应的结构体声明目录
- handler：handler 目录，可选，一般 http 服务会有这一层做路由管理，`handler` 为固定后缀
- logic：业务目录，所有业务编码文件都存放在这个目录下面，`logic` 为固定后缀
- svc：依赖注入目录，所有 logic 层需要用到的依赖都要在这里进行显式注入
- types：结构体存放目录

我们以rpc的配置文件user.yml为例：

```yaml
Name: user.rpc
ListenOn: 0.0.0.0:8081 #监听在8081端口上，默认为8080
Etcd: #go-zero自动帮我们把服务注册到etcd上，这也是框架的一大好处。
  Hosts:
  - 127.0.0.1:2379
  Key: user.rpc #服务的key
```

在正式开始写业务逻辑之前的一些工作：

docker-compose.yml用来启动一些组件（这里考虑到当前学习进度，我只使用mysql、redis、etcd来演示，实际到后面学习后还有很多组件供你使用。。）

```yaml
version: '3.8'

networks:
  demo:
    driver: bridge

services:
  mysql:
    image: mysql:latest
    container_name: mysql-1
    ports:
      - "3306:3306"
    environment:
      - TZ=${TZ}
      - MYSQL_PASSWORD=123456              # 设置 Mysql 用户密码
      - MYSQL_ROOT_PASSWORD=123456    # 设置 Mysql root 用户密码
    restart: always
    volumes:
      - ${DATA_PATH_HOST}/mysql:/var/lib/mysql
    networks:
      - demo

  redis:
    image: redis:latest
    ports:
      - "6379:6379"
    container_name: redis-1
    restart: always
    volumes:
      - ${DATA_PATH_HOST}/redis:/data
    networks:
      - demo

  etcd:
    image: bitnami/etcd:latest
    container_name: etcd-1
    environment:
      - TZ=${TZ}
      - ALLOW_NONE_AUTHENTICATION=yes
      #- ETCD_ADVERTISE_CLIENT_URLS=http://etcd:2379
      - ETCD_ADVERTISE_CLIENT_URLS=http://127.0.0.1:2379
    ports: # 设置端口映射 Etcd 服务映射宿主机端口号，可在宿主机127.0.0.1:2379访问
      - "2379:2379"
      #networks:
      #- backend
    restart: always
    networks:
      - demo
```

接下来就是如果我们需要使用gorm和redis的话，如何在go-zero框架中使用：

gorm:

```go
package gorm

import (
    "context"
    "github.com/zeromicro/go-zero/core/logx"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
    "gozerodemo/server/user/model"
    "log"
    "os"
    "time"
)

const UserDSN = "root:123456@tcp(127.0.0.1:3306)/原神启动?charset=utf8mb4&parseTime=True&loc=Local"

var UserDB *gorm.DB

func init() {
    newLogger := logger.New(log.New(os.Stdout, "", log.LstdFlags),
       logger.Config{
          SlowThreshold:             time.Second,
          Colorful:                  true,
          IgnoreRecordNotFoundError: true,
          LogLevel:                  logger.Error,
       })
    db, err := gorm.Open(mysql.Open(UserDSN),
       &gorm.Config{
          Logger: newLogger,
       })
    if err != nil {
       logx.WithContext(context.Background()).Errorf("GORM connect UserDB Error: %+v", err)
    }

    err = db.AutoMigrate(&model.User{})//这里的model需要你提前声明（例如你可以在api和rpc目录下新建model目录，然后在model目录中去定义）
    if err != nil {
       logx.WithContext(context.Background()).Errorf("GORM AutoMigrate user ERROR:%+v", err)
    }
    UserDB = db
}
```

redis:

```go
package goredis

import (
    "context"
    "github.com/redis/go-redis/v9"
    "github.com/zeromicro/go-zero/core/logx"
    "time"
)

var Rdb *redis.Client

func init() {
    option := redis.Options{
       Addr:     "localhost:6379",
       DB:       1,
       PoolSize: 100,
    }
    rdb := redis.NewClient(&option)
    _, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
    defer cancel()

    _, err := rdb.Ping(context.Background()).Result()
    if err != nil {
       logx.WithContext(context.Background()).Error("Redis connect ERROR: %+v", err)
    }
    Rdb = rdb
}
```

当我们这里初始化时连接了mysql和redis后，我们之后就可以使用这里的全局对象（*gorm.DB类型）（ *redis.Client类型）

在哪使用？怎么用？

这时，我们使用goctl生成后的代码就有用了。

> example
> ├── etc
> │   └── example.yaml
> ├── main.go
> └── internal
>     ├── config
>     │   └── config.go
>     ├── handler
>     │   ├── xxxhandler.go
>     │   └── xxxhandler.go
>     ├── logic
>     │   └── xxxlogic.go
>     ├── svc
>     │   └── servicecontext.go
>     └── types
>         └── types.go
>
> - example：单个服务目录，一般是某微服务名称
> - etc：静态配置文件目录
> - main.go：程序启动入口文件
> - internal：单个服务内部文件，其可见范围仅限当前服务
> - config：静态配置文件对应的结构体声明目录
> - handler：handler 目录，可选，一般 http 服务会有这一层做路由管理，`handler` 为固定后缀
> - logic：业务目录，所有业务编码文件都存放在这个目录下面，`logic` 为固定后缀
> - svc：依赖注入目录，所有 logic 层需要用到的依赖都要在这里进行显式注入
> - types：结构体存放目录

在svc中，我们需要添加上gorm和redis的全局对象，正如官方文档所说：所有 logic 层需要用到的依赖都要在这里进行显式注入。



```go
package svc

import (
    "github.com/redis/go-redis/v9"
    "gorm.io/gorm"
    gorm2 "gozerodemo/common/gorm"
    goredis "gozerodemo/common/redis"
    "gozerodemo/server/user/rpc/internal/config"
)

type ServiceContext struct {
    Config  config.Config
    MysqlDB *gorm.DB//这个需要你加上去
    RedisDB *redis.Client//这个需要你加上去
}

func NewServiceContext(c config.Config) *ServiceContext {
    return &ServiceContext{
       Config:  c,
       MysqlDB: gorm2.UserDB,//这个需要你加上去
       RedisDB: goredis.Rdb,//这个需要你加上去
    }
}
```

在svc中引入依赖后，我们就可以在logic中正式写业务逻辑了。

```go
package logic

import (
    "context"
    "gozerodemo/server/user/model"
    "gozerodemo/server/user/rpc/internal/svc"
    "gozerodemo/server/user/rpc/pb"

    "github.com/zeromicro/go-zero/core/logx"
)

type RegisterLogic struct {
    ctx    context.Context
    svcCtx *svc.ServiceContext
    logx.Logger
}

func NewRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterLogic {
    return &RegisterLogic{
       ctx:    ctx,
       svcCtx: svcCtx,
       Logger: logx.WithContext(ctx),
    }
}

func (l *RegisterLogic) Register(in *pb.RegisterReq) (*pb.RegisterResp, error) {
    // todo: add your logic here and delete this line
    l.svcCtx.MysqlDB.Create(model.User{})//主要是这里看怎么使用到mysqldb的，我们通过l.svcCtx拿到mysqldb。
    return &pb.RegisterResp{}, nil
}
```

那rpc写完了，如何在api层的logic中调用rpc呢？

user.yaml

```yaml
Name: user
Host: 0.0.0.0
Port: 8888
#api中的配置文件中新添user rpc
UserRpcConf:
  Etcd:
    Hosts:
      - 127.0.0.1:2379
    key: user.rpc
```

然后在config中定义一下UserRpcConf

```go
package config

import (
    "github.com/zeromicro/go-zero/rest"
    "github.com/zeromicro/go-zero/zrpc"
)

type Config struct {
    rest.RestConf
    UserRpcConf zrpc.RpcClientConf//加入UserRpcConf，后续会将yml配置文件解析到该结构体中。
}
```

然后在svc中声明依赖：

```go
package svc

import (
    "github.com/zeromicro/go-zero/zrpc"
    "gozerodemo/server/user/api/internal/config"
    "gozerodemo/server/user/rpc/user"
)

type ServiceContext struct {
    Config  config.Config
    UserRPC user.User//userrpc客户端
}

func NewServiceContext(c config.Config) *ServiceContext {
    return &ServiceContext{
       Config:  c,
       UserRPC: user.NewUser(zrpc.MustNewClient(c.UserRpcConf)),//创建user服务rpc客户端
    }
}
```

registerLogic.go

```go
package logic

import (
    "context"

    "gozerodemo/server/user/api/internal/svc"
    "gozerodemo/server/user/api/internal/types"

    "github.com/zeromicro/go-zero/core/logx"
)

type RegisterLogic struct {
    logx.Logger
    ctx    context.Context
    svcCtx *svc.ServiceContext
}

func NewRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterLogic {
    return &RegisterLogic{
       Logger: logx.WithContext(ctx),
       ctx:    ctx,
       svcCtx: svcCtx,
    }
}

func (l *RegisterLogic) Register(req *types.RegisterReq) (resp *types.RegisterResp, err error) {
    // todo: add your logic here and delete this line
    l.svcCtx.UserRPC.Register()//看到了吗，我们一样是通过l.svcCtx来得到userRpc服务的接口并使用。
    return
}
```

至此，一个简单的go-zero微服务流程就走完了。

### 后记

上面是一些基础的go-zero框架教程，但实际开发中还有很多技术可以学习。

在这里推荐两个项目：

go-zero-looklook（**技术栈**和**go-zero开发规范**）

> 项目地址：[Mikaelemmmm/go-zero-looklook: 🔥基于go-zero(go zero) 微服务全技术栈开发最佳实践项目。Develop best practice projects based on the full technology stack of go zero (go zero) microservices.](https://github.com/Mikaelemmmm/go-zero-looklook)
>
> 项目教程文档：[go-zero-looklook/doc/chinese/01-开发环境搭建.md at main · Mikaelemmmm/go-zero-looklook](https://github.com/Mikaelemmmm/go-zero-looklook/blob/main/doc/chinese/01-开发环境搭建.md)

lebron（同样使用go-zero框架，但更侧重业务上的设计，能学到很多**业务上的技术**）

> 项目地址：[zhoushuguang/lebron: Highly concurrent mall system built on go-zero](https://github.com/zhoushuguang/lebron)
>
> 项目教程文档：[go-zero 微服务实战系列（一、开篇）](https://mp.weixin.qq.com/s?__biz=Mzg2ODU1MTI0OA==&mid=2247485597&idx=1&sn=7e85894b7847cc50df51d66092792453&chksm=ceabd7a2f9dc5eb40ace3dc87dda90479403f2ed778c3bf1375e98841712f05392cc92ccb058&cur_album_id=2085775054620917763&scene=190#rd)

go-zero-looklook作者的go-zero框架视频教程：[一、go-zero简介及如何学go-zero_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1LS4y1U72n/?spm_id_from=333.1387.upload.video_card.click&vd_source=efb2c7d5cee1018e00a007912051cabb)

作业：

lv1:用go-zero写个demo跑起来用postman之类的请求看看。

lv2:可以学习一下推荐的项目。

无需提交
