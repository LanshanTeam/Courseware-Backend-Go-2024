## 蓝山工作室——Golang第一节课
### 前言
首先欢迎大家加入我们的Go语言课程，Go 是一个开源的编程语言，它能让构造简单、可靠且高效的软件变得容易。
Go是从2007年末由 Robert Griesemer, Rob Pike, Ken Thompson 主持开发，后来还加入了Ian Lance Taylor, Russ Cox等人，并最终于2009年11月开源，在2012年早些时候发布了Go 1稳定版本。现在Go的开发已经是完全开放的，并且拥有一个活跃的社区。

> Go 语言最初由 Google 公司的 Robert Griesemer、Ken Thompson 和 Rob Pike 三个大牛于 2007 年开始设计发明，设计新语言的最初的洪荒之力来自于对超级复杂的 C++11 特性的吹捧报告的鄙视，最终的目标是设计网络和多核时代的 C 语言。到 2008 年中期，语言的大部分特性设计已经完成，并开始着手实现编译器和运行时，大约在这一年 Russ Cox 作为主力开发者加入。到了 2009 年，Go 语言已经逐步趋于稳定。同年 9 月，Go 语言正式发布并开源了代码。[<sup>1</sup>](#refer-anchor-1)

按照惯例，介绍所有编程语言的第一个程序都是“Hello, World!”，这里我也不打破这个惯例：
```go
package main

import "fmt"

func main() {
    fmt.Println("你好, 世界!")
}
```

现在，让我们简单介绍一下程序。所有的 Go 程序，都是由最基本的函数和变量构成，函数和变量被组织到一个个单独的 Go 源文件中，这些源文件再按照作者的意图组织成合适的 package，最终这些 package 再有机地组成一个完整的 Go 语言程序。其中，函数用于包含一系列的语句（指明要执行的操作序列），以及执行操作时存放数据的变量。我们这个程序中函数的名字是 main。虽然Go语言中，函数的名字没有太多的限制，但是 main 包中的 main 函数默认是每一个可执行程序的入口。

而 package 则用于包装和组织相关的函数、变量和常量。在使用一个 package 之前，我们需要使用 import 语句导入包。例如，我们这个程序中导入了 fmt 包（fmt 是 format 单词的缩写，表示格式化相关的包），然后我们才可以使用 fmt 包中的 Println 函数。

而双引号包含的“你好, 世界!”则是 Go 语言的字符串面值常量：
- 在C语言中，在 C 中，字符串是一个字符数组，以 `\0`（空字符）结尾来标识字符串的结束。因此，C 字符串本质上是字符指针 (`char *`) 或字符数组 (`char[]`)。C 字符串在内存中是可变的，即字符数组的内容可以被修改。
- 而在 Go 中字符串是不可变的，一旦创建不能修改。如果需要修改字符串，必须创建一个新的字符串。此外 Go 中字符串是以 UTF-8 编码存储的，这使得 Go 能够很好地支持多语言字符集。内置的字符串处理函数直接支持 UTF-8 字符串。
> 关于 UTF-8 的规范参考 rfc3629 ，是 Ken Thompson 和 Rob Pike 等制定的，这两位也是 Go 语言的作者。

### 语言基础

#### 数据类型
1. 布尔型

布尔型的值只可以是常量 true 或者 false

2. 数字类型

| 类型       | 描述                                                           |
| ---------- | -------------------------------------------------------------- |
| uint8      | 无符号 8 位整型 (0 到 255)                                     |
| uint16     | 无符号 16 位整型 (0 到 65535)                                  |
| uint32     | 无符号 32 位整型 (0 到 4294967295)                             |
| uint64     | 无符号 64 位整型 (0 到 18446744073709551615)                   |
| int8       | 有符号 8 位整型 (-128 到 127)                                  |
| int16      | 有符号 16 位整型 (-32768 到 32767)                             |
| int32      | 有符号 32 位整型 (-2147483648 到 2147483647)                   |
| int64      | 有符号 64 位整型 (-9223372036854775808 到 9223372036854775807) |
| float32    | IEEE-754 32位浮点型数                                          |
| float64    | IEEE-754 64位浮点型数                                          |
| complex64  | 32 位实数和虚数                                                |
| complex128 | 64 位实数和虚数                                                |
| int        | 根据你的操作系统架构，可以是32位或64位的整数                   |
| byte       | uint8的别名                                                    |
| rune       | int32的别名                                                    |
3. 字符串类型
   
   字符串的底层实现是基于一个不可变的字节数组，Go 的字符串在内存中使用 UTF-8 编码表示，每个字符串由两个部分组成：一个指向字节数组的指针和字符串的长度。
4. 派生类型
   
   Go 的派生类型是通过结构、组合或引用等方式，从基本类型派生出来的
   - (a) 指针类型（Pointer）
   - (b) 数组类型
   - (c) 结构化类型(struct)
   - (d) Channel 类型
   - (e) 函数类型
   - (f) 切片类型
   - (g) 接口类型（interface）
   - (h) Map 类型

### 变量声明
Go语言中的变量需要声明后才能使用，同一作用域内不支持重复声明。并且Go语言的变量声明后必须使用。
```go
// 第一种方式
// var 变量名 [类型] = 表达式
// example:
// 使用类型推导
var a = "first"
var b,c = 1,2
// 指定类型
var d int8 = 1
// 严格意义上讲，上述语句是两个过程：声明+赋值
var e float64 //声明
e = 1.0 //赋值

// 第二种方式
f := 114514
```
### 常量
相对于变量，常量是恒定不变的值，多用于定义程序运行期间不会改变的那些值。 常量的声明和变量声明非常类似，只是把var换成了const，常量在定义的时候必须赋值。
```go
const s string = "constant"
const h = 500000000
const i = 3e20 / h
fmt.Println(s, h, i, math.Sin(h), math.Sin(i))
```
### 循环
和C++不同，Golang 只有一个循环关键字`for`，接下来讲`for`的几种使用模式
#### 三段式
```go
// for 初始化;条件;循环表达式
for i:=0;i<1;i++{
   fmt.Println(i)
}
```
第一个位置是单次表达式，循环开始时会执行一次这里，一般用于初始化变量。

第二个位置是条件表达式，即循环条件，只要满足循环条件就会执行循环体。

第三个位置是末尾循环体，每次执行完一遍循环体之后会执行一次此位置中中的表达式。

执行末尾循环体后将再次进行条件判断，若条件还成立，则继续重复上述循环，当条件不成立时则跳出当下for循环。

并且，你可以选择性的留空，就是让三段式的任何位置为空。例如：
```go
for ;i<5;{
  // 循环体
}
```
#### 一段式
一段式那就是只写条件
例如：

```go
for i<5{
  // 循环体
}
```
##### break 关键词

break 放在循环体中，只要执行到 break，则会立马跳出所在最里循环（注意，是所在最里循环，若嵌套，则无法跳出更外层循环）

例如：

```go
for i:=1;i<4;i++{
  j := i
  for j<4{
    if j == 2{
      break
    }
  }
  fmt.Println("hello lanshan")
}
```

上面这个函数不需要去体会其中的意思，我只是举个例子。若执行到了break，则只会跳出条件是 j < 4 这个循环，依然会执行println打印

这是总的示例，可以回顾一下：

```go
package main

import "fmt"

func main() {
	i := 1
	for {
		fmt.Println("loop")
		break // 跳出循环
	}
	
	// 打印7、8
	for j := 7; j < 9; j++ {
		fmt.Println(j)
	}

	for n := 0; n < 5; n++ {
		if n%2 == 0 {
			continue
			// 当n模2为0时不打印，进到下一次的循环
		}
		fmt.Println(n)
	}
	// 直到i>3
	for i <= 3 {
		fmt.Println(i)
		i = i + 1
	}
  // for 循环嵌套
  for i := 0; i < 5; i++ {
		for j := 0; j < 5; j++ {
			fmt.Printf("i = %d, j = %d\n", i, j)
		}
	}
}
```
### if

```go
if 条件表达式 {
	//当条件表达式结果为true时，执行此处代码   
}

if 条件表达式 {
    //当条件表达式结果为true时，执行此处代码  
} else {
    //当条件表达式结果为false时，执行此处代码  
}
```

```go
package main

import "fmt"

func main() {
	// 条件表达式为false，打印出"7 是奇数"
	if 7%2 == 0 {
		fmt.Println("7 是偶数")
	} else {
		fmt.Println("7 是奇数")
	}

	// 条件表达式为ture，打印出"8 被 4 整除"
	if 8%4 == 0 {
		fmt.Println("8 被 4 整除")
	}

	// 这是一个短声明，效果等效于
	//num := 9
	//if num < 0{
	//	...
	//}
	if num := 9; num < 0 {
		fmt.Println(num, "is negative")
	} else if num < 10 {
		fmt.Println(num, "has 1 digit")
	} else {
		fmt.Println(num, "has multiple digits")
	}
}
```

### switch

当分支过多的时候，使用if-else语句会降低代码的可阅读性，这个时候，我们就可以考虑使用switch语句

- switch 语句用于基于不同条件执行不同动作，每一个 case 分支都是唯一的，从上至下逐一测试，直到匹配为止。
- switch 语句在默认情况下 case 相当于自带 break 语句，匹配一种情况成功之后就不会执行其它的case，这一点和 c/c++ 不同
- 如果我们希望在匹配一条 case 之后，继续执行后面的 case ，可以使用 fallthrough

```go
package main

import (
	"fmt"
	"time"
)

func main() {

	a := 2
	switch a {
	case 1:
		fmt.Println("one")
	case 2:
		// 在此打印"two"并跳出
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	case 4, 5:
		fmt.Println("four or five")
	default:
		fmt.Println("other")
	}

	t := time.Now()
	switch {
	// 根据现在的时间判断是上午还是下午
	case t.Hour() < 12:
		fmt.Println("It's before noon")
	default:
		fmt.Println("It's after noon")
	}
}
```

### func

函数是指一段可以直接被另一段程序或代码引用的程序或代码，一个较大的程序一般应分为若干个程序块，每一个模块用来实现一个特定的功能。

1. **函数的声明和定义**：

   在Go语言中，函数的定义以 `func` 关键字开始，然后是函数名、参数列表、返回类型和函数体。以下是一个函数的典型定义：

   ```go
   func add(x int, y int) int {
       return x + y
   }
   ```

   这个函数名为 `add`，接受两个整数参数 `x` 和 `y`，并返回一个整数。

2. **函数的参数**：

   函数可以接受零个或多个参数，参数在参数列表中定义，并且需要指定参数的类型。例如：

   ```go
   func greet(name string) {
       fmt.Println("Hello, " + name)
   }
   ```

   这个函数接受一个字符串参数 `name`。

3. **函数的返回值**：

   函数可以返回一个或多个值，返回值的类型也需要在函数定义中指定。如果函数没有返回值，可以将返回类型留空。例如：

   ```go
   func addAndMultiply(x, y int) (int, int) {
       sum := x + y
       product := x * y
       return sum, product
   }
   ```

   这个函数返回两个整数值。

4. **函数的调用**：

   要调用函数，只需使用函数名并传递参数。例如：

   ```go
   result := add(3, 5)
   fmt.Println(result)
   ```

   这里我们调用了 `add` 函数，将参数 `3` 和 `5` 传递给它，并将返回值赋给 `result` 变量。
```go
package main

import "fmt"

func add(x int, y int) int {
    return x + y
}

func main() {
	result := add(3, 5)
	fmt.Println(result)
}
```
5. **函数是一等公民**
   函数是一等公民是指函数在语言中具有与其他数据类型（如数字、字符串等）相同的地位。
   
   这意味着函数可以被赋值给变量、作为参数传递给其他函数、作为返回值返回，甚至可以嵌套在其他函数中。 函数是一等公民的语言具有更高的表达能力，因为它可以用更简单的方式来编写代码。例如，在函数是一等公民的语言中，可以使用匿名函数（lambda）来创建临时函数，而无需为其分配名称。匿名函数可以用作回调函数，或者在其他函数中作为参数传递。
   
   还意味着函数可以作为数据结构的元素。例如，可以创建一个数组，其中每个元素都是一个函数。
```go
   
// 定义一个函数类型
type mathOperation func(int, int) int

// 一个普通的加法函数
func add(a, b int) int {
    return a + b
}

// 一个函数，接受另一个函数作为参数
func calculate(op func(int, int) int, a, b int) int {
    return op(a, b)
}

// 一个函数返回另一个函数
func getMultiplier() mathOperation {
    return func(a, b int) int {
        return a * b
    }
}

func main() {
    // 将函数赋值给变量
    var operation mathOperation
    operation = add

    // 调用函数
    result := operation(3, 4)
    fmt.Println("3 + 4 =", result)

    // 将函数作为参数传递给另一个函数
    result = calculate(add, 5, 6)
    fmt.Println("5 + 6 =", result)

    // 将函数作为返回值
    multiplier := getMultiplier()
    result = multiplier(3, 7)
    fmt.Println("3 * 7 =", result)
}
```

### fmt

fmt 库函数

```go
package main

import "fmt"

type point struct {
	x, y int
}

func main() {
	s := "hello"
	n := 123
	p := point{1, 2}
	fmt.Println(s, n) // hello 123
	fmt.Println(p)    // {1 2}

	fmt.Printf("s=%v\n", s)  // s=hello
	fmt.Printf("n=%v\n", n)  // n=123
	fmt.Printf("p=%v\n", p)  // p={1 2}
	fmt.Printf("p=%+v\n", p) // p={x:1 y:2}
	fmt.Printf("p=%#v\n", p) // p=main.point{x:1, y:2}

	f := 3.141592653
	fmt.Println(f)          // 3.141592653
	fmt.Printf("%.2f\n", f) // 3.14
}
```
## 年轻人的第一个GoProject

## 作业

### LV1 

编写一个Go函数，接受两个整数作为参数，然后返回它们的和。在 `main` 函数中调用此函数并打印结果。

### LV2

编写一个Go函数，接受圆的半径作为参数，然后返回圆的面积。使用 `math` 包中的常数 Pi。在 `main` 函数中调用此函数并打印结果。

提示，引入 Pi 只需要写出`math.Pi`

### LV3

编写一个Go函数，接受一个整数作为参数，然后判断它是否为素数（质数）。在 `main` 函数中调用此函数并打印结果。提示：一个素数是只能被 1 和自身整除的正整数。

### LVX

编写一个Go函数，使用`rand`包随机选择一个1-100的数（必须每次执行的随机数都不一样），然后使用**二分法**找到这个数。
（电脑出题电脑做）

tips：rand 包的使用和二分法自行研究

作业完成后将作业 `GitHub 地址`发送至 zhouran@lanshan.email ，若对 GitHub 的使用有问题，可以先网上寻找解决方法，实在不行可以私信学长。

## 参考
<div id="refer-anchor-1"></div>

- [1] [Go语言高级编程：1.1 Go 语言创世纪](https://chai2010.cn/advanced-go-programming-book/ch1-basic/ch1-01-genesis.html)