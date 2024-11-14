# 并发

> 本节课均以单核cpu机器为前提，runtime.GOMAXPROCS(1)设置多核机器只使用一个cpu

### 1.概念

##### 进程

- 线程+资源：进程至少包含一个**执行流(线程)**以及它所必须的**地址空间和寄存器资源**

- 运行中的程序：程序就是一段静态存储在文件系统上的**指令代码**，进程就是cpu不断地执行这段指令代码，并拥有自己的地址空间(页表)，和自己的上下文(寄存器映像)

##### 线程

- 也称为内核级线程
- 具有能动性，独立的代码块：通过线程机制，将给代码块创造一个上下文，让代码块独立，且成为cpu的调度单元

##### 协程

- 也称为用户级线程
- 仍是具有能动性，独立的代码块：协程机制由用户进程提供，更灵活，对os不可见，无需陷入内核，开销小

##### 串行，并发，并行

- 串行就是一件事做完才能做另外的事儿
- 并发就是一件事做一会就去做另外的事儿，再做一会另外的事儿回来接着做
- 并行就是同时做多件事

##### 临界区

- 多个任务访问公共资源的指令代码(!!!注意是一段代码)

##### 竞争条件

- 多个任务同时进入临界区(同时访问相同公共资源)，最后的结果取决于各任务执行的精确时序

### 2. go并发

​	go中实现并发相较于c++或其他语言，更加容易和轻量

~~~go
package main

import (
        "fmt"
        "time"

        "github.com/petermattis/goid"
)

func goFunc() {
        fmt.Printf("another goroutine id :[%d]\n", goid.Get())
}

func main() {
        fmt.Printf("main goroutine id :[%d]\n", goid.Get())

        go goFunc()

        time.Sleep(time.Second)
}
~~~

​	通过一个简单的go关键字就能启动一个goroutine。

​	所以什么是goroutine呢？

​	是线程还是协程？

多个goroutine下产生的并发竞争问题：

~~~go

import (
        "fmt"
        "sync"
)

var n int
var wg sync.WaitGroup

func add5000() {
        for i := 0; i < 5000; i++ {
                n++
        }
        wg.Done()
}

func main() {
        wg.Add(5)
        go add5000()
        go add5000()
        go add5000()
        go add5000()
        go add5000()
        wg.Wait()
        fmt.Printf("result :[%d]\n", n)
}
~~~

(这里使用了sync包下的WaitGroup来确保子goroutine在主goroutine退出前都正常退出)

多次尝试后有什么结果？为什么会产生这样的结果？

### 3.如何避免产生数据竞争问题呢？

这里介绍操作系统层面的多种方法：

##### 最简单粗暴的方法--关中断

中断是啥？线程调度时中断起到了什么作用呢？

- 中断机制本质就是接收到一个中断信号后，调用相应的中断处理程序。
- 中断分为外部中断和内部中断，外部中断又可分为可屏蔽中断和不可屏蔽中断，这里主要是屏蔽可屏蔽中断
- 线程的简单调度实现：每个线程都有自己的时间片，每次时钟中断都会减少线程的时间片，当时间片到期就会被调度切换为其他线程

就像这样：

~~~c
//timer interrupt handler
static void intr_timer_handler(void){
	struct task_struct* cur_thread = running_thread();
	//...
	if (cur_thread->ticks == 0){
		schedule();
	}else {
		--cur_thread->ticks;
	}
}
~~~

开关中断就是用的sti和cli指令，更改flags寄存器上的中断标志。关闭中断之后就不再识别和响应外部中断，也就不会执行时钟中断函数，线程的时间片也就不会减少，直到重新开启中断

c内嵌汇编：

~~~c
asm volatile ("cli" : : : "memory");   //关中断
asm volatile ("sti");					//开中断
~~~

##### 互斥：

###### spin lock(自旋锁)

简单实现一个自旋锁：

~~~go
type spinlock struct {
        value bool
}

func (sl *spinlock) Lock() {
        for {
                if !sl.value {
                        sl.value = true
                        return
                }
        }
}

func (sl *spinlock) Unlock() {
        sl.value = false
}

func main() {
        wg := sync.WaitGroup{}
        locker := &spinlock{}
        wg.Add(2)
        go func() {
                locker.Lock()
                fmt.Printf("goroutine [%d] lock\n", goid.Get())
                time.Sleep(2 * time.Second)
                locker.Unlock()
                fmt.Printf("goroutine [%d] unlock\n", goid.Get())
                wg.Done()
        }()
        go func() {
                fmt.Printf("goroutine [%d] sleep 1 second\n", goid.Get())
                time.Sleep(1 * time.Second)
                fmt.Printf("goroutine [%d] wakeup\n", goid.Get())
                locker.Lock()
                fmt.Printf("goroutine [%d] lock\n", goid.Get())
                locker.Unlock()
                fmt.Printf("goroutine [%d] unlock\n", goid.Get())
                wg.Done()
        }()
        wg.Wait()

        fmt.Printf("all goroutine exit...\n")
}
~~~

结果：

~~~go
❯ go run main.go
goroutine [7] sleep 5 second
goroutine [6] lock
goroutine [7] wakeup
goroutine [6] unlock
goroutine [7] lock
goroutine [7] unlock
all goroutine exit...
~~~

看起来似乎确实实现了goroutine之间的互斥，但是目前这个自旋锁设计似乎好像有隐藏的bug？

有没有感受到自旋锁的明显缺陷？没有？top试试

###### mutex(互斥锁)

互斥锁也叫做互斥信号量，也就是初始值为1的信号量。所以信号量是啥🤓？

信号量就是一个零以上的整数，表示某种信号的累积量，~~有点抽象~~

来看看一个简单的mutex是如何实现的叭>v<

~~~c
//struct of semaphore
struct semaphore{
	uint8_t value;
	struct list waiters;
};

//struct of mutex
struct mutex{
	struct task_struct * holder;			//holder of mutex
	struct semaphore semaphore;				//mutex semaphore; semaphore = 1 
	uint32_t holder_repeat_nr;				//the number of holder had apply for lock
};
~~~

这个分别是信号量和mutex的简单定义，在mutex中的信号量会被初始化为1。

mutex工作过程略，上课再讲啰(~~懒~~)



如果你对锁还感兴趣，可以研究一下futex，不感兴趣就跳过。

###### 一些互斥算法

例如Peterson算法，感兴趣课下了解一下

##### 同步：

> 啥是同步呢？同步就是多个任务之间协调执行顺序，以确保它们按照预期的顺序运行，在某个时间点共同达到互相已知的状态

###### semaphore(信号量)

用一个非零整数来表示某种资源的累积量，听起来好像挺简单的😏，所以课后lab将带领你们实现一个简单的信号量机制

###### condition variable(条件变量)

go已经有封装好的条件变量了,这里展示简单使用：

~~~go
package main

import (
        "fmt"
        "sync"
        "time"
)

var done = false

func read(name string, cond *sync.Cond) {
        cond.L.Lock()
        if !done {
                cond.Wait()
        }
        fmt.Printf("%s start reading...\n", name)
        cond.L.Unlock()
}

func write(name string, cond *sync.Cond) {
        fmt.Printf("%s start writing...\n", name)
        time.Sleep(time.Second)
        cond.L.Lock()
        done = true
        cond.L.Unlock()
        fmt.Printf("%s write complete\n", name)
        cond.Broadcast()
}

func main() {
        //初始化一个条件变量，并初始化其携带的mutex
        cond := sync.NewCond(&sync.Mutex{})

        go read("reader1", cond)
        go read("reader2", cond)
        go read("reader3", cond)

        write("writer", cond)
        time.Sleep(time.Second)
}

~~~

### 4.go同步机制

###### Channel

> go并发哲学：Do not communicate by sharing memory; instead, share memory by communicating.	
>

以上都是通过共享内存实现的同步，所以不采取同步或互斥机制，必然会产生数据竞争，但是go的并发哲学就是通过Channel通信来进行goroutine之间的数据共享，有效避免了数据竞争

这里使用channel来实现goroutine之间的同步，以两个goroutine依次0～100的数，a线程打印奇数，b线程打印偶数，顺序打印：

~~~go
func main() {
        var ch1 chan int
        fmt.Printf("ch1 is [%v] without initial\n", ch1)
        ch1 = make(chan int) //无缓冲channel
        fmt.Printf("ch1 is [%v] with initial\n", ch1)

        defer func() {
                close(ch1)
        }()

        wg := sync.WaitGroup{}
        wg.Add(2)
        go func() {
                for i := 1; i < 100; i += 2 {
                        ch1 <- i
                }
                wg.Done()
        }()

        go func() {
                for i := 2; i <= 100; i += 2 {
                        n := <-ch1
                        fmt.Println(n)
                        fmt.Println(i)
                }
                wg.Done()
        }()

        wg.Wait()
}
~~~

这里以无缓冲channel为例，但是当我把第二个goroutine的循环条件改成i < 100的话，会发生什么捏？为什么捏？如何避免这种情况捏？

###### select

select类似于switch语句，包含一系列逻辑分支和默认分支，每个分支对应一个channel的读写操作

like this:

~~~go
select {
case v1 := <- ch1:
// do something ...  
case v2 := <- ch2:
// do something ...
default:
// do something ...
}
~~~

###### others...

前面的区域以后再来探索吧...

### 作业:

个人认为最好的学习方式就是learn by doing,所以我更想让你们动手实操

降低难度，课后实验暂时就只有两个,见[仓库](https://github.com/lance-e/concurrent_labs)介绍

