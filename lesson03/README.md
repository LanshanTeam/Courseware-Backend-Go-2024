

[TOC]

## 第三节课

### 包

- ##### 包的基本介绍

我们不会把所有的代码都写在同一个文件下面，那么怎么调用其他模块下的内容呢？我们引入了包

包的引入使得我们可以去调用自己或者别人的模块代码，方便了我们的开发

> 我们第一次在电脑上打印出hello world的时候，就引入了一个fmt包

```go
package main

import "fmt"  //引入fmt包

func main(){
  fmt.Println("Hello world!")  //Println是fmt包里面的一个函数
}
```

- ##### 定义包

我们可以根据自己的需要创建自定义包。一个包可以简单理解为一个存放`.go`文件的文件夹。

该文件夹下面的所有`.go`文件都要在非注释的第一行添加如下声明，声明该文件归属的包。

```
package packagename
```

另外需要注意一个文件夹下面直接包含的文件只能归属一个包，同一个包的文件不能在多个文件夹下。

包名为`main`的包是应用程序的入口包

- ##### 包的可见性

在同一个包内部声明的标识符都位于同一个命名空间下，在不同的包内部声明的标识符就属于不同的命名空间。想要在包的外部使用包内部的标识符就需要添加包名前缀，例如`fmt.Println("Hello world!")`。

如果想让一个包中的标识符（如变量、常量、类型、函数等）能被外部的包使用，那么标识符必须是对外可见的（public）。在Go语言中是通过标识符的首字母大/小写来控制标识符的对外可见（public）/不可见（private）的。在一个包内部只有首字母大写的标识符才是对外可见的。

例如我们定义一个名为`demo`的包，在其中定义了若干标识符。在另外一个包中并不是所有的标识符都能通过`demo.`前缀访问到，因为只有那些首字母是大写的标识符才是对外可见的。

```
var	Name  string // 可在包外访问的方法
var	class string // 仅限包内访问的字段
```

- ##### 包的引入

要在当前包中使用另外一个包的内容就需要使用`import`关键字引入这个包，并且import语句通常放在文件的开头，`package`声明语句的下方。完整的引入声明语句格式如下:

```
import importname "path/to/package"
```

其中：

- importname：引入的包名，通常都省略。默认值为引入包的包名。
- path/to/package：引入包的路径名称，必须使用双引号包裹起来。
- Go语言中禁止多个包相互导入

一个Go源码文件中可以同时引入多个包，例如：

```
import "fmt"
import "net/http"
import "os"
```

当然可以使用批量引入的方式。

```
import (
    "fmt"
  	"net/http"
    "os"
)
```

如果引入一个包的时候为其设置了一个特殊`_`作为包名，那么这个包的引入方式就称为匿名引入。

一个包被匿名引入的目的主要是为了加载这个包，从而使得这个包中的资源得以初始化。 被匿名引入的包中的`init`函数将被执行并且仅执行一遍。

```
import _ "github.com/go-sql-driver/mysql"
```

init函数不用显示调用就可以自己执行，比如

```go
package main

import "fmt"

func init() {
	fmt.Println("第一遍执行init")
}
func main() {

	fmt.Println("这是main函数")
}
func init() {
	fmt.Println("第二遍执行init")
}
//这个的执行顺序是什么?
```

### 指针

------

任何程序数据载入内存后，在内存都有他们的地址，这就是指针。而为了保存一个数据在内存中的地址，我们就需要指针变量。

`*Go语言中的指针不能进行偏移和运算*`，因此Go语言中的指针操作不像C语言中的那么复杂，我们只需要记住两个符号：`&`（取地址）和`*`（取值）。

- ##### 指针地址和指针类型

每个变量在运行时都拥有一个地址，这个地址代表变量在内存中的位置。Go语言中使用`&`字符放在变量前面对变量进行“取地址”操作。 Go语言中的类型如（int、float、bool、string、array、struct）都有对应的指针类型，如：`*int`、`*int64`、`*string`等。

取变量指针的语法如下：

```
ptr := &v    // v的类型为T
```

其中：

- v:代表被取地址的变量，类型为`T`
- ptr:用于接收地址的变量，ptr的类型就为`*T`，称做T的指针类型。*代表指针。

举个例子：

```go
func main() {
	a := 10
	b := &a
	fmt.Printf("a:%d ptr:%p\n", a, &a) // a:10 ptr:0xc00001a078
	fmt.Printf("b:%p type:%T\n", b, b) // b:0xc00001a078 type:*int
	fmt.Println(&b)                    // 0xc00000e018
}
```

![img](https://camo.githubusercontent.com/5920f54c36a7bcf807c6a5e87354b5610f828449bc179933f040f40037418c59/68747470733a2f2f7777772e6c6977656e7a686f752e636f6d2f696d616765732f476f2f706f696e7465722f7074722e706e67)



- ##### 指针取值


在对普通变量使用&操作符取地址后会获得这个变量的指针，然后可以对指针使用*操作，也就是指针取值，代码如下。

```GO
func main() {
	//指针取值
	a := 10
	b := &a // 取变量a的地址，将指针保存到b中
	fmt.Printf("type of b:%T\n", b)
	c := *b // 指针取值（根据指针去内存取值）
	fmt.Printf("type of c:%T\n", c)
	fmt.Printf("value of c:%v\n", c)
}
```

输出如下：

```GO
type of b:*int
type of c:int
value of c:10
```

**总结：** 取地址操作符`&`和取值操作符`*`是一对互补操作符，`&`取出地址，`*`根据地址取出地址指向的值。

变量、指针地址、指针变量、取地址、取值的相互关系和特性如下：

- 对变量进行取地址（&）操作，可以获得这个变量的指针变量。
- 指针变量的值是指针地址。
- `*对指针变量进行取值（\*）操作，可以获得指针变量指向的原变量的值*。`

**指针传值示例：**

```go
func modify1(x int) {
	x = 100
}

func modify2(x *int) {
	*x = 100
}

func main() {
	a := 10
	modify1(a)
	fmt.Println(a) // 10
	modify2(&a)
	fmt.Printl
    n(a) // 100
}
```

- ##### 避免空指针

尝试通过空指针访问其指向的值将导致运行时错误（panic），因此在使用空指针之前，通常需要检查它是否为nil，否则会出现空指针异常，比如

```go
package main

import "fmt"

func main() {
    var p *int = nil // 声明一个指向int类型的空指针

    // 尝试通过空指针p访问其指向的值，这将导致运行时panic
    // 因为p是空指针，没有指向任何有效的内存地址
    fmt.Println(*p) // 这里会发生空指针异常
}
```

### 结构体

------

介绍结构体之前我们需要先说一些与其相关的基础知识

- ##### 自定义类型

Go语言中可以使用`type`关键字来定义自定义如`string`、`int`、`bool`等的数据类型。

自定义类型是定义了一个***全新***的类型。我们可以基于内置的基本类型定义，也可以通过struct定义。例如：

```
//将MyInt定义为int类型
type MyInt int
```

通过`type`关键字的定义，`MyInt`就是一种新的类型，它具有`int`的特性。

- ##### 类型别名

类型别名规定：本质上是同一个类型。就像一个孩子小时候有小名，这和他的名字都指向同一个人。

```
type 类型的别名 = 类型名
```

- ##### 类型定义和类型别名的区别

类型别名 和原类型是同一种类型。自定义类型是一种全新的类型。

类型别名的类型只会在代码中存在，编译完成时并不会存在。

> 类型别名 和 自定义类型 的意义

**自定义类型** ： 举个例子，我们想给 int 类型定义一个方法，但是又不想改变int本身的性质。可以基于内置的`int`类型使用type关键字可以定义新的自定义类型，然后为我们的自定义类型添加方法。

**类型别名**： 如果有一个非常长的类型名字，比如`map[int]string`，如果在代码中反复使用这个类型，那将会变得很啰嗦。

但是如果你使用类型别名来代替它，比如`data`，那么你只需使用`Data`这个简短的名字就可以代替长长的类型名字了，比如

```go
// 定义一个类型别名Data，它等同于map[int]string
type Data map[int]string
```

- ##### 结构体

Go语言中的基础数据类型可以表示一些事物的基本属性，但是当我们想表达一个事物的全部或部分属性时，这时候再用单一的基本数据类型明显就无法满足需求了，比如我想要描述一个学生信息，包括姓名，年龄，成绩，我们就需要用到结构体（struct）

使用`type`和`struct`关键字来定义结构体，具体代码格式如下：

```go
type 类型名 struct {
    字段名 字段类型
    字段名 字段类型
    …
}
```

其中：

- 类型名：标识自定义结构体的名称，在同一个包内不能重复。
- 字段名：表示结构体字段名。结构体中的字段名必须唯一。
- 字段类型：表示结构体字段的具体类型。

举个例子，我们定义一个刚刚的Student（学生）结构体，代码如下：

```go
type Student struct {
	name string
	age  int
	Grade float64
}
```

- ##### 结构体的初始化

对于没有初始化的结构体，它的字段值都是对于类型的零值，比如

```go
package main

import "fmt"

type Student struct {
	name  string
	age   int
	Grade float64
}
func main() {
	var Stu Student
	fmt.Println(Stu)  //{ 0 0}
}
```

**使用字段名初始化结构体**

```go
 Stu := Student{
        name:  "Alice",
        age:   20,
        Grade: 3.5,
 }
```

**忽略字段名初始化结构体**

```go
 // 这里要注意的是初始化字段的顺序必须是声明结构体时的字段顺序
    Stu2 := Student{
        "Bob",
        22,
        3.8,
    }
```

- ##### 访问结构体变量

我们可以在结构体名字和字段之前用`.`来连接，以此访问结构体的字段，比如

```go
var Stu Student
Stu.name = "小明"
Stu.age = 18
```

- ##### 嵌套结构体

```go
//Address 地址结构体
type Address struct {
	Province string
	City     string
}

//User 用户结构体
type User struct {
	Name    string
	Gender  string
	Address Address
}

func main() {
	user1 := User{
		Name:   "小王子",
		Gender: "男",
		Address: Address{
			Province: "山东",
			City:     "威海",
		},
	}
	fmt.Printf(user1)//{小王子 男 {山东 威海}}
}
```

- ##### 结构体指针省略*号

当你声明一个指向结构体的指针变量并访问其字段时，你可以直接使用点 `.` 操作符来访问字段，而不需要显式地解引用指针（也就是使用*号）。这是 Go 语言为了简化编码过程而提供的便利，比如

```go
type Person struct {
    Name string
    Age  int
}

func main() {
    // 创建一个Person类型的指针
    p := &Person{Name: "John", Age: 30}

    // 通过指针访问结构体的字段
    fmt.Println((*p).Name) // 输出: John
    fmt.Println((*p).Age)  // 输出: 30
    fmt.Println(p.Name)
    fmt.Println(p.Age)
}
```

### 方法

------

Go语言中的`方法（Method）`是一种作用于特定类型变量的函数。这种特定类型变量叫做`接收者（Receiver）`。

只有特定的接收者变量才可以调用对应的方法。

方法的定义格式如下：

```go
func (接收者变量 接收者类型) 方法名(参数列表) (返回参数) {
    函数体
}
```

其中

- 接收者变量：接收者中的参数变量名在命名时，官方建议使用接收者类型名称首字母的小写。例如，`Person`类型的接收者变量应该命名为 `p`。
- 接收者类型：接收者类型和参数类似，可以是`指针类型`和`非指针类型`。
- 方法名、参数列表、返回参数：具体格式与函数定义相同。

比如

```go
package main

import "fmt"

type Student struct {
	Name  string
	Age   int
	Grade float64
}
func NewStudent(name string, age int, grade float64) *Student {
	return &Student{
		Name:  name,
		Age:   age,
		Grade: grade,
	}
}
func (s Student) study() {
	fmt.Printf("我是%s我正在卷", s.Name)
}
func main() {
	stu := NewStudent("小明", 18, 4.0)
	stu.study()
}

```

- ##### 指针类型和值类型的接收者

指针类型的接收者由一个结构体的指针组成，由于指针的特性，调用方法时修改接收者指针的任意成员变量，在方法结束后，修改都是有效的。 例如我们为`Student`添加一个`SetAge`方法，来修改实例变量的年龄。

```GO
func (s *Student)SetAge(age int) {
	s.Age = age
}
```

```go
func main() {
	stu := NewStudent("小明", 18, 4.0)
	fmt.Println("修改前age=", stu.Age) //18
	stu.SetAge(17)
	fmt.Println("修改后age=", stu.Age) //17
}
```

当方法作用于值类型接收者时，Go语言会在代码运行时将接收者的值复制一份。在值类型接收者的方法中可以获取接收者的成员值，但修改操作只是针对副本，无法修改接收者变量本身。

```
func (s Student)SetAge(age int) {
	s.Age = age
}
```

```go
func main() {
	stu := NewStudent("小明", 18, 4.0)
	fmt.Println("修改前age=", stu.Age) //18
	stu.SetAge(17)
	fmt.Println("修改后age=", stu.Age) //18
}
```

当我们同时有指针类型和值类型的接收者时，编译器会提示`结构体 student 在值接收器和指针接收器上都有方法。Go 文档不推荐使用此类用法`

### 接口

------

接口是一种由程序员来定义的类型，一个接口类型就是一组方法的集合，它规定了需要实现的所有方法。相较于使用结构体类型，当我们使用接口类型说明相比于它是什么更关心**它能做什么**，而不是它是什么。

我们日常会一般会听到几种接口，比如usb接口（硬件接口），应用程序接口（api），以及我们这里所说的接口类型。

- ##### 接口的定义


每个接口类型由任意个方法签名组成，接口的定义格式如下：

```
type 接口类型名 interface{
    方法名1( 参数列表1 ) 返回值列表1
    方法名2( 参数列表2 ) 返回值列表2
    …
}
```

其中：

- 接口类型名：Go语言的接口在命名时，一般会在单词后面添加`er`，如有写操作的接口叫`Writer`，有关闭操作的接口叫`closer`等。接口名最好要能突出该接口的类型含义。
- 方法名：当方法名首字母是大写且这个接口类型名首字母也是大写时，这个方法可以被接口所在的包（package）之外的代码访问。
- 参数列表、返回值列表：参数列表和返回值列表中的参数变量名可以省略。

举个例子，定义一个包含`Write`方法的`Writer`接口。

```go
type Writer interface{
    Write([]byte) error
}
```

- ##### 实现接口

实现接口是什么意思呢，比如要实现上方的Writer接口，我们就要实现这个接口中所定义的方法，实现了接口定义的所有方法，我们就实现了这个接口，下面我们举一个简单的例子

假设有两款音乐播放器，它们都可以播放水声，那么我们可以顶一个Sounder接口，Music1和Music2都实现了这个接口

```go
package main

import "fmt"

type Sounder interface {
	water()
}
type Music1 struct{}
type Music2 struct{}

func (m1 Music1) water() {
	fmt.Println("这是music1的水声")
}
func (m2 Music2) water() {
	fmt.Println("这是music2的水声")
}
func Play(s Sounder) {
	s.water()
}
func main() {
	var m2 Music2
	var m1 Music1
	Play(m1) //这是music1的水声
	Play(m2) //这是music2的水声
}

```

因为这里Sounder里面只有一个water()方法，所以只需要给`Music1`和`Music2`结构体添加一个`water`方法就可以满足`Sounder`接口的要求，实现了方法就实现了这个接口，所有我们可以将两个结构体作为参数传给Play(s Sounder)函数

- ##### 接口断言

在 Go 语言中，接口断言是一种检查接口变量是否具有特定具体类型的方法。接口断言的基本语法如下：

```golang
value, ok := interfaceVariable.(Type)
```

其中：

-  `interfaceVariable` 是一个接口类型的变量
-  `Type` 是你想要断言的具体类型
- 如果 `interfaceVariable` 实际上是一个 `Type` 类型的值，那么 `value` 将会被赋值为该值，并且 `ok` 将会是 `true`。如果 `interfaceVariable` 不是 `Type` 类型，那么 `value` 将会是 `Type` 类型的零值，而 `ok` 将会是 `false`
- 对于空接口 `interface{}`，任何类型的值都可以被赋值给它，因此对接口断言的需求更加常见

假设我们有一个接口类型的变量 `var i interface{}`，并且我们不确定它到底是什么类型，但我们想检查它是否是一个 `int` 类型

```golang
package main

import "fmt"

func main() {
    var i interface{} = 42

    // 尝试断言为int类型
    if v, ok := i.(int); ok {
        fmt.Println("i是一个int类型的值:", v)
    } else {
        fmt.Println("i不是int类型的值")
    }

    // 尝试断言为 string
    if _, ok := i.(string); !ok {
        fmt.Println("i不是string类型的值")
    }
}
```

其实这里的接口类型和硬件接口是非常相似的，我们的鼠标，键盘，u盘的接口都是一种形状，就是方便节约空间，如果每个外设的接口都不一样，那么电脑所提供空间肯定是不够的，而这种做成这种”形状“，类比到我们今天的接口类型，就可以理解为实现了接口。

### 作业

等级不代表难度

可以选择LV1到LV3或者单独完成LVX

**LV1:  温度转换器**

实现一个温度转换器系统，支持摄氏度和华氏度之间的相互转换

自定义结构体，实现以下方法：

- `ToFahrenheit()`：将摄氏温度转换为华氏温度，并更新 `Fahrenheit` 字段。
- `ToCelsius()`：将华氏温度转换为摄氏温度，并更新 `Celsius` 字段

**LV2:  字符串工具包**

创建一个名为 `utils` 的包。

在包内实现以下函数：

- `Reverse(s string) string`：将字符串反转。
- `IsPalindrome(s string) bool`：判断字符串是否为回文(如`aba`，`abcba`，`abba`)

编写主程序，导入 `utils` 包并测试这些函数

**LV3：计算几何图片面积**

定义一个接口 `Shape`，包含一个方法 `Area() float64`。

定义两个结构体 `Circle` 和 `Rectangle（矩形）`，或自定义几何图形，并分别实现 `Area` 方法，并计算面积

**LVX：实现一个电子商务系统**（学有余力可完成）

设计一个电子商务平台，该平台有多种类型的商品，例如电子产品、家居用品和服装等。你需要设计以下结构体和功能：

1. **实现商品结构体**：包含商品的名称、价格和库存数量等信息。
2. **实现接口**：定义商品的库存管理功能，包括检查库存数量、更新库存数量和打印库存信息，出售，进货等等。
3. **实现电子产品结构体**：继承自商品结构体，同时具有电子产品特有的属性，例如品牌和型号。
4. **实现接口**：定义电子产品结构体的库存管理功能（同上），以及打印品牌型号信息的功能

（不一定要完全按照要求的逻辑，有自己的想法即可，可以做了多少交多少，半成品也没关系）

完成后提交到邮箱[lihaoyu@lanshan.email]()

​	
