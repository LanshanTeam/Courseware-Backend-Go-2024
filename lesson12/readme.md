# 你管这玩意叫网络？

### 计算机网络体系浅尝辄止

> 摘自《计算机网络自顶向下》

##### 1.internet概述

###### 什么是internet？

​	因特网是一个世界范围的计算机网络,即它是一个互联了遍及全世界数十亿计算设备的网络。在不久前,这些计算设备多数是传统的桌面 PC、Linux 工作站以及所谓的服务器(它们用于存储和传输 Web页面和电子邮件报文等信息)。然而,越来越多的非传统的因特网“物品”(如便携机、智能手机、平板电脑、电视、游戏机、温度调节装置、家用安 全系统、家用电器、手表、眼镜、汽车、运输控制系统等)正在与因特网相连。的确,在许多非传统设备连接到因特网的情况下,计算机网络(computer network)这个术语开始听 起来有些过时了。用因特网术语来说,所有这些设备都称为**主机(host)或端系统(end system)**。

###### 端系统在internet中如何相连？	

>  端系统通过通信链路(communication link)和分组交换机(packet switch)连接到一起。

​	通信链路由不同类型的物理媒体组成。这 些物理媒体包括同轴电缆、铜线、光纤和无线电频谱。不同的链路能够以不同的速率传输 数据,链路的传输速率(transmission rate)以比特/秒(bit/s,或bps)度量。当一台端系 统要向另一台端系统发送数据时,发送端系统将数据分段,并为每段加上首部字节。由此 形成的信息包用计算机网络的术语来说称为**分组(packet)**。这些分组通过网络发送到目的端系统,在那里被装配成初始数据。

​	分组交换机从它的一条入通信链路接收到达的分组,并从它的一条出通信链路转发该 分组。市面上流行着各种类型、各具特色的分组交换机,但在当今的因特网中,两种最著 名的类型是**路由器(router)和链路层交换机(link-layer switch)**。这两种类型的交换机朝 着最终目的地转发分组。链路层交换机通常用于接入网中,而路由器通常用于网络核心 中。从发送端系统到接收端系统,一个分组所经历的一系列通信链路和分组交换机称为通 过该网络的路径(route或path)

​	端系统通过**因特网服务提供商(Internet Service Provider, ISP)**接入因特网,ISP就是我们熟知的电信移动等网络运营商

​	端系统、分组交换机和其他因特网部件都要运行一系列**协议(protocol)**,这些协议控 制因特网中信息的接收和发送。TCP (Transmission Control Protocol,传输控制协议)和IP (Internet Protocol,网际协议)是因特网中两个最为重要的协议。IP协议定义了在路由器 和端系统之间发送和接收的分组格式。因特网的主要协议统称为TCP/IP。

###### 什么是协议呢？

​	**协议(protocol)定义了在两个或多个通信实体之间交换的报文的格式和顺序,以及报文发送和/或接收一条报文或其他事件所采取的动作。**

​	关键词：报文格式，报文顺序，动作

##### 2.网络分层：

- 应用层：应用层是网络应用程序及它们的应用层协议存留的地方。(信息分组：报文message)
- 传输层：因特网的运输层在应用程序端点之间传送应用层报文。(信息分组：报文段segment)
- 网络层：因特网的网络层负责将称为数据报(datagram)的网络层分组从一台主机移动到另一 台主机。(信息分组：数据报datagram)
- 数据链路层：链路层沿着路径将数据报传递给下一个 节点。在该下一个节点,链路层将数据报上传给网络层。(信息分组：帧frame)
- 物理层：物理层的任务 是将该帧中的一个个比特从一个节点移动到下一个节点。

数据包封装：

![](./image/封装)

### 网络协议小试牛刀

#### 1.应用层协议

(提一嘴应用程序结构)

应用层协议主要有HTTP,SMTP,DNS等，主要讲解一下HTTP和SMTP

##### HTTP

​	http全称**超文本传输协议(Hyper Text Transfer Protocol, HTTP**)。HTTP 由两个程序实现:一个客户程序和一个服务器程序。客户程序和服务器程序运行在不同的端系统中,通过交换 HTTP 报文进行会话。HTTP 定义了这些报文的结构以及客户和服务器进行报文交换的方式。

​	HTTP 使用 TCP 作为它的支撑运输协议(而不是在 UDP 上运行)。HTTP客户首先发起一个与服务器的TCP连接。一旦连接建立,该浏览器和服务器进程就可以通过**套接字接口**访问TCP。客户端的套接字接口是客户进程与TC 连接之间的门,在服务器端的套接字接口则是服务器进程与TCP连接之间的门。 TCP为HTTP 提供可靠数据传输服务，这意味着,一个客户进程发出的每个 HTTP 请求报文最终能完整地到达服务器;类似地,服务器进程发出的每个 HTTP 响应报文最终能完整地到达客户。这里我们看到了分层体系结构最大的优点,即 HTTP 协议不用担心数据丢失,也不关注 TCP 从网络的数据丢失和乱序故障中恢复的细节。那是TCP 以及协议栈较 低层协议的工作。

请求报文格式：

~~~
GET /somedir/page.html HTTP/1.1
Host: www.Someschool.edu
Connection: close
User-agent: Mozilla/5.0
Accept-language: fr

~~~

响应报文格式：

~~~
HTTP/1.1 200 ОK
Connection: close
Date: Tue, 18 Aug 2015 15:44:04 GMT
Server: Apache/2.2.3 (CentOS)
Last-Modified: Tue, 18 Aug 2015 15:11:03 GMT
Content-Length: 6821
Content-Type: text/html
(data data data data data...)
~~~

实操一下http协议

##### SMTP

​	简单邮件传输协议（SMTP）是一种通过网络传输电子邮件的技术标准。与其他网络协议一样，SMTP 允许计算机和服务器交换数据，无论其底层硬件或软件是什么。正如使用信封地址书写的标准化格式允许邮政服务得以运作一样，SMTP 标准化电子邮件从发件人到收件人的传输方式，使广泛的电子邮件传递成为可能。

​	SMTP 是一种邮件**传递**协议，而非邮件**检索**协议。邮政服务将邮件传递到邮箱，但收件人仍然必须从邮箱中提取邮件。同样，SMTP 将电子邮件传递到某个电子邮件提供商的邮件服务器，但需要使用其他协议(POP3, IMAP, HTTP)来从邮件服务器检索该电子邮件，以便收件人读取邮件

​	SMTP使用推协议，HTTP是一种拉协议

![](./image/smtp)

实操一下smtp协议,注意鉴权时的base64编码


~~~
220 163.com Anti-spam GT for Coremail System (163com[20141201])
HELO smtp.163.com
250 OK
AUTH LOGIN
334 dXNlcm5hbWU6
(base64后的用户名)
334 UGFzc3dvcmQ6
(base64后的密码)
235 Authentication successful
MAIL FROM <源>
250 Mail OK
RCPT TO <目标>
250 Mail OK
DATA
354 End data with <CR><LF>.<CR><LF>
From:这里填源邮箱地址
TO: 这里填目标邮箱地址
Subject: test               

lalalallalalalalalal886
.
250 Mail OK queued as gzga-smtp-mtada-g0-3,_____wD3b9A5wdVnlc1XSA--.23112S2 1742062057

~~~

#### 2.传输层协议

##### UDP

​	由 [RFC 768] 定义的UDP(用户数据报协议)只是做了运输协议能够做的最少工作。除了**复用/分解功能**及**少量的差错检测**外,它几乎没有对IP增加别的东西。实际上,如果应用程序开发人员选择 UDP 而不是 TCP,则该应用程序差不多就是直接与IP 打交道。UDP 从应用进程得到数据,附加上用于多路复用/分解服务的**源和目的端口号字段**,以及两个其他的小字段, 然后将形成的报文段交给网络层。网络层将该运输层报文段封装到一个IP 数据报中,然后**尽力而为**地尝试将此报文段交付给接收主机。如果该报文段到达接收主机,UDP 使用目 的端口号将报文段中的数据交付给正确的应用进程。值得注意的是,使用UDP时,在发 送报文段之前,发送方和接收方的运输层实体之间没有握手。正因为如此,UDP 被称为是 **无连接的**。

![](./image/udp报文)

​	UDP相对TCP的优势：

- 无连接，立即发送数据，无重传(低时延)
- 首部少(开销小)
- 无拥塞控制(吞吐高)
- 广播/多播(1toN场景)
- ...

​	这就是为什么弱网环境，时延敏感场景，高频数据传输等场景会使用到UDP

​	(课后感兴趣可扩展QUIC等基于udp实现的可靠传输协议)

##### TCP

>  如果让你来设计一个可靠数据传输，你会怎么做捏？
>
> - 信道完全可靠的可靠传输：理想环境下，不丢包，数据包完好传输，只用简单的收发
> - 信道具有bit差错的可靠传输：传输过程中bit可能受损，但不会丢包，仍顺序传输。引入差错校验，接收方反馈，重传机制
>   - 问题：若ack/nak受损？
>   - 解决办法：1.引入新分组类型；2.引入差错恢复机制；3.直接重传
>     - 问题：如何区分是重传还是新分组？
>     - 解决办法：引入序列号
> - 信道具有bit差错且会丢包的可靠传输：如何区分是延迟还是丢包，就需要引入一个合适的定时器
>
> 至此，一个简单的可靠数据传输的**停等协议**就实现了
>
> 后续可优化为流水线可靠数据传输+回退N步(滑动窗口)/选择重传+流量控制+拥塞控制等，那么TCP就诞生了

​	TCP即**传输控制协议（Transmission Control Protocol）**是一种面向连接的、可靠的、基于字节流的传输层通讯协议。TCP是为了在不可靠的互联网上提供可靠的端到端字节流而专门设计的一个传输协议。TCP 被称为是**面向连接的(connection- oriented)**,这是因为在一个应用进程可以开始 向另一个应用进程发送数据之前,这两个进程必须先相互“握手”,即它们必须相互发送 某些预备报文段,以建立确保数据传输的参数。作为TCP 连接建立的一部分,连接的双方 都将初始化与TCP 连接相关的许多 TCP 状态变量

​	TCP粘包拆包问题：报文段中可传输数据数量受限于**最大报文段大小(max segement size)**，数据包过大会产生拆包问题，过小会产生粘包问题

​	问题1：TCP为什么建立，关闭连接要三次握手，四次挥手，而不是其他次数？

​	(课后感兴趣的同学去更深入了解一下tcp)

### Socket编程大展身手

#### 什么是socket？

​	多数应用程序是由通信进程对组成,每对中的两个进程互相发送报文。从 一个进程向另一个进程发送的报文必须通过下面的网络。进程通过一个称为**套接字 (socket)**的软件接口向网络发送报文和从网络接收报文。我们考虑一个类比来帮助我们理解进程和套接字。进程可类比于一座房子,而它的套接字可以类比于它的门。当一个进程想向位于另外一台主机上的另一个进程发送报文时,它把报文推出该门(套接字)。该发送进 程假定该门到另外一侧之间有运输的基础设施,该设施将把报文传送到目的进程的门口。 一旦该报文抵达目的主机,它通过接收进程的门(套接字)传递,然后接收进程对该报文进行处理。

![](./image/socket)

#### i/o模型

> 摘自《unp》

- 阻塞I/O 
  - ​			![](./image/阻塞io)
  - socket在创建时**默认是阻塞**的。我们可以给 socket 系统调用的第2个 参数传递 SOCK_NONBLOCK 标志,或者通过 fcntl 系统调用的F_SETFL 命令,将其设置为 非阻塞的。阻塞和非阻塞的概念能应用于所有**文件描述符**,而不仅仅是 socket。我们称阻塞的**文件描述符**为阻塞I/O,称非阻塞的**文件描述符**为非阻塞I/O。
  - 针对阻塞 1/O 执行的系统调用可能因为无法立即完成而被操作系统挂起,直到等待的事件发生为止。比如,客户端通过 connect 向服务器发起连接时, connect 将首先发送SYN给服务器,然后等待服务器返回ACK。如果服务器的确认报文段没有立即到达客户端,则 connect 调用将被挂起,直到客户端收到确认报文段并唤醒 connect 调用。socket 的基础 API 中,可能被阻塞的系统调用包括 accept、send、recv 和 connect。
- 非阻塞I/O 
  - ![](./image/非阻塞io)
  - 前三次调用recvfrom时没有数据可返回,因此内核转而立即返回一个EWOULDBLOCK错误。 第四次调用recvfrom时已有一个数据报准备好,它被复制到应用进程缓冲区,于是recvfrom 成功返回。我们接着处理数据。 当一个应用进程像这样对一个非阻塞描述符循环调用recvfrom时,我们称之为**轮询** (polling)。应用进程持续轮询内核,以查看某个操作是否就绪。这么做往往耗费大量CPU时间, 不过这种模型偶尔也会遇到,通常是在专门提供某一种功能的系统中才有。
  - 针对非阻塞 I/O 执行的系统调用则总是立即返回,而不管事件是否已经发生。如果事件 没有立即发生,这些系统调用就返回 –1,和出错的情况一样。此时我们必须根据errno 来区 分这两种情况。对 accept、send 和 recv 而言,事件未发生时errno 通常被设置成EAGAIN(意为“再来一次”)或者EWOULDBLOCK(意为“期望阻塞”);对 connect 而言, errno 则被 设置成 EINPROGRESS(意为“在处理中”)。
  - 非阻塞I/O总是立即返回，为了提高程序的效率，我们应该仅在事件发生时才操作非阻塞I/O,那么就需要和其他I/O通知机制一起使用，比如I/O多路复用或者信号机制
- I/O复用(select,poll,epoll)
  - ![](./image/io复用)
  - 问题：i/o多路复用与多线程阻塞i/o这两种相似模型区别？
  - IO 复用是最常使用的I/O 通知机制。它指的是,应用程序通过I/O复用函数向内核注册一组事件,内核通过I/O复用函数把其中就绪的事件通知给应用程序。Linux 上常用的I/O复 用函数是 select、poll 和epoll_wait，通过让程序阻塞这三个I/O复用函数，而不需要阻塞在真正的I/O系统调用上。**需要指出的是I/O复用函数本身是阻塞的,它们能提高程序效率的原因在于它们具有同时监听多个IO 事件的能力**。
- 信号驱动I/O(sigio)
  - ![](./image/信号驱动io)
  - 首先开启套接字的信号驱动式I/O功能,并通过 sigaction系统调用安装一个信号处理函数。该系统调用将立即返回,我们的进程继续工作, 也就是说它没有被阻塞。当数据报准备好读取时,内核就为该进程产生一个SIGIO信号。我们随后既可以在信号处理函数中调用recvfrom读取数据报,并通知主循环数据已准备好待处理 ,也可以立即通知主循环,让它读取数据报。
  -  无论如何处理SIGIO信号,这种模型的优势在于等待数据报到达期间进程不被阻塞。主循 环可以继续执行,只要等待来自信号处理函数的通知:既可以是数据已准备好被处理,也可以 是数据报已准备好被读取。
- 异步I/O
  - ![](./image/异步io)

五种I/O对比：

- 前四种都是同步I/O
- 第五种是异步I/O

​	同步I/O模型要求用户代码自行执行 I/O 操作(将数据从内核缓冲区读 入用户缓冲区,或将数据从用户缓冲区写入内核缓冲区),而异步 I/O机制则由内核来执行I/O操作(数据在内核缓冲区和用户缓冲区之间的移动是由内核在“后台”完成的)。你可以 这样认为,同步I/O 向应用程序通知的是I/O就绪事件,而异步IO 向应用程序通知的是I/O完成事件。

![](./image/io对比)	

#### 服务器程序：

##### 简单的socket使用

仅使用阻塞I/O,如何呢？

​	server:

~~~go
func main() {
        socketfd, err := syscall.Socket(syscall.AF_INET, syscall.SOCK_STREAM, 0)
        if err != nil {
                panic(err)
        }
        defer func() {
                syscall.Close(socketfd) //关闭了也不会立即释放，可以使用reuseaddr参数
        }()
        err = syscall.Bind(socketfd, &syscall.SockaddrInet4{
                Port: 8000,
                Addr: [4]byte{127, 0, 0, 1},
        })
        if err != nil {
                fmt.Printf("socketaddr wrong\n")
                panic(err)
        }

        err = syscall.Listen(socketfd, syscall.SOMAXCONN) //backlog
        if err != nil {
                panic(err)
        }
        for {
                fd, addr, err := syscall.Accept4(socketfd, 0) //flags
                if err != nil {
                        panic(err)
                }
                fmt.Printf("client's address: addr-[%v.%v.%v.%v] , port-[%d]\n", addr.(*syscall.SockaddrInet4).Addr[0], addr.(*syscall.SockaddrInet4).Addr[1], addr.(*syscall.SockaddrInet4).Addr[2], addr.(*syscall.SockaddrInet4).Addr[3], addr.(*syscall.SockaddrInet4).Port)

                _, err = syscall.Write(fd, []byte("welcome to server"))
                if err != nil {
                        panic(err)
                }
                syscall.Close(fd)
        }
}
~~~

client:

~~~go
func main() {
        socketfd, err := syscall.Socket(syscall.AF_INET, syscall.SOCK_STREAM, 0)
        if err != nil {
                panic(err)
        }

        err = syscall.Connect(socketfd, &syscall.SockaddrInet4{
                Addr: [4]byte{127, 0, 0, 1},
                Port: 8000,
        })
        if err != nil {
                panic(err)
        }
        buf := make([]byte, 128)
        n, err := syscall.Read(socketfd, buf)
        if n < 0 {
                panic("recvfrom bytes < 0 ")
        }

        fmt.Printf("get message from server: %s\n", string(buf))

        syscall.Close(socketfd)
}
~~~

##### 引入i/o多路复用

问题：为什么i/o多路复用一般与非阻塞i/o组合使用？

server:

~~~go
func AddFd(epfd int, newfd int, enableET bool) {
        syscall.EpollCtl(epfd, syscall.EPOLL_CTL_ADD, newfd, &syscall.EpollEvent{
                Events: syscall.EPOLLIN, //default LT //| syscall.EPOLLOUT | syscall.EPOLLRDHUP
                Fd:     int32(newfd),
        })
        syscall.SetNonblock(newfd, true)
}

func main() {
        socketfd, err := syscall.Socket(syscall.AF_INET, syscall.SOCK_STREAM|syscall.SOCK_NONBLOCK, 0)
        if err != nil {
                panic(err)
        }
        defer syscall.Close(socketfd) //关闭了也不会立即释放，可以使用reuseaddr参数
        err = syscall.Bind(socketfd, &syscall.SockaddrInet4{
                Port: 8000,
                Addr: [4]byte{127, 0, 0, 1},
        })
        if err != nil {
                fmt.Printf("socketaddr wrong\n")
                panic(err)
        }

        err = syscall.Listen(socketfd, syscall.SOMAXCONN) //backlog
        if err != nil {
                panic(err)
        }
        epollfd, err := syscall.EpollCreate1(0)
        if err != nil {
                panic(err)
        }
        AddFd(epollfd, socketfd, false)
        events := make([]syscall.EpollEvent, 1024)
        for {
                n, err := syscall.EpollWait(epollfd, events, -1) //-1 = wait all the time
                if err != nil {
                        fmt.Printf("epoll wait failed\n")
                }
                for i := 0; i < n; i++ {
                        fd := events[i].Fd
                        //新连接
                        if fd == int32(socketfd) {
                                //新连接
                                fmt.Printf("new connection\n")
                                acfd, _, err := syscall.Accept4(socketfd, syscall.SOCK_NONBLOCK)
                                if err != nil {
                                        fmt.Printf("accept4 failed\n")
                                }
                                AddFd(epollfd, acfd, false)
                                continue
                        }
                        //关闭连接(EPOLLRDHUP是对端关闭,EPOLLHUP是整个关闭)
                        if (events[i].Events & (syscall.EPOLLRDHUP | syscall.EPOLLHUP)) != 0 {
                                fmt.Printf("close conn\n")
                                syscall.Close(int(fd))
                                continue
                        }
                        //读
                        if (events[i].Events & syscall.EPOLLIN) != 0 {
                                fmt.Printf("readable\n")
                                buf := make([]byte, 128)
                                n, err := syscall.Read(int(fd), buf)
                                if n < 0 || err != nil {
                                        fmt.Printf("read failed\n")
                                        continue
                                }
                                if n == 0 {
                                        //关闭连接
                                        fmt.Printf("read 0\n")
                                        syscall.Close(int(fd))
                                        continue
                                }
                                fmt.Printf("get message :%s\n", string(buf))
                                continue
                        }
                        //写
                        if (events[i].Events & syscall.EPOLLOUT) != 0 {
                                fmt.Printf("writable\n")
                                continue
                        }
                        fmt.Printf("something else happend\n")
                }
        }
}


~~~

##### 服务器程序：多线程

目前是一个单线程reactor模型，后续可以用多线程提高框架性能，小登们感兴趣自己扩展

### 课后作业：

- level-1:思考课件中的问题，理解课件内容。
- level-2:实现一个可靠数据传输(参考自顶向下3.4)

### 参考：

《计算机网络自顶向下》

《unix环境高级编程》

《unix网络编程》

《linux高性能服务器编程》
