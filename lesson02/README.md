# 第02节课

## 数组&切片

我们这次课的前半部分主要讨论Go语言的数组（array）类型和切片（slice）类型。

这二者最重要的不同是：**数组的长度是固定的，而切片是可变长的。**

后面更细节的东西我们先按下不表，先来给大家介绍一下数组和切片基础语法

### 数组-array

- 初始化

 ```go
 // var arr [len]type 
// arr := [len]type{data1,data2}
a := [3]int{1, 2}           // 未初始化元素值为 0
b := [...]int{1, 2, 3}      // 通过初始化值确定数组长度
c := [5]int{2: 100, 4: 200} // 通过索引号初始化元素，未初始化元素值为 0
fmt.Println(a, b, c)        //[1 2 0] [1 2 3] [0 0 100 0 200]

//支持多维数组
d := [4][2]int{{10, 11}, {20, 21}, {30, 31}, {40, 41}}
e := [...][2]int{{10, 11}, {20, 21}, {30, 31}, {40, 41}} //第二维不能写"..."
f := [4][2]int{1: {20, 21}, 3: {40, 41}}
g := [4][2]int{1: {0: 20}, 3: {1: 41}}
fmt.Println(d, e, f, g)

```

>  数组长度必须是常量，且是类型的组成部分。 [2]int 和 [3]int 是不同类型。

- 操作数组

  ```go
  // 数组的每个元素可以通过索引下标来访问，索引下标的范围是从0开始到数组长度减1的位置。
      var a [10]int
      for i := 0; i < 10; i++ {
          a[i] = i + 1
          fmt.Printf("a[%d] = %d\n", i, a[i])
      }
  
      //range具有两个返回值，第一个返回值是元素的数组下标，第二个返回值是元素的值
      for i, v := range a {
          fmt.Println("a[", i, "]=", v)
      }
  
  ```

### 切片-slice

> 数组的长度在定义之后无法再次修改；数组是值类型，每次传递都将产生一份副本。显然这种数据结构无法完全满足开发者的真实需求。Go语言提供了数组切片（slice）来弥补数组的不足。

- 初始化

  ```go
      //初始化一个空的切片
      var a1 []int //就比数组少个中括号里的长度
      a2 := []int{}
  
      //或者用make函数
      //make([]T, length, capacity) //capacity省略，则和length的值相同
      var a3 []int = make([]int, 0)
      a4 := make([]int, 0, 0)
  
      a5 := []int{1, 2, 3} //创建切片并初始化值
  ```

- 操作切片

  * `s[n]` 切片s中索引位置为n的项
  * `s[:]`从切片s的索引位置0到len(s) -1处所获得的切片
  * `s[low:high:max]`从切片s的索引位置low到high处所获得的切片,该切片的len=high-low，cap=max-low
  * `len(s)`切片s的长度
  * `cap(s)`切片s的容量

- append( )

  append函数向 slice 尾部添加数据，返回新的 slice 对象：

    ```GO
      var s1 []int //创建nil切换
      //s1 := make([]int, 0)
      s1 = append(s1, 1)       //追加1个元素
      s1 = append(s1, 2, 3)    //追加2个元素
      s1 = append(s1, 4, 5, 6) //追加3个元素
      fmt.Println(s1)          //[1 2 3 4 5 6]
  
      s2 := make([]int, 5)
      s2 = append(s2, 6)
      fmt.Println(s2) //[0 0 0 0 0 6]
  
      s3 := []int{1, 2, 3}
      s3 = append(s3, 4, 5)
      fmt.Println(s3)//[1 2 3 4 5]
  
    ```

  append函数会智能地底层数组的容量增长，一旦超过原底层数组容量，通常以2倍容量重新分配底层数组，并复制原来的数据

  >“通常？”那例外是什么呢？大家自己动手去试一下吧。Ps:听说容量超过512之后会发生神秘的事情:smirk::smirk:

    ```GO
  func main() {
      var x, y []int
      for i := 0; i < 10; i++ {
          y = append(x, i)
          fmt.Printf("%d cap=%d\t%v\n", i, cap(y), y)
          x = y
      }
  }
    ```

  >  大家可以猜测一下这段代码会输出什么

- 切片和数组

  切片并不是数组或数组指针，它通过内部指针和相关属性引⽤数组⽚段，以实现变⻓⽅案。slice并不是真正意义上的动态数组，而是一个引用类型。**slice总是指向一个底层array**

```go
func main() {
	s3 := []int{1, 2, 3, 4, 5, 6, 7, 8}
	s4 := s3[3:6]        
	s5 := s4[0:cap(s4)]  
	s6 := append(s4, 9) 
	s7 := s4[0:cap(s4)]  
}
```

> 搞懂上面这段代码每个切片长什么样，大家就理解“slice总是指向一个底层array”这句话了

> 思考：上节课讲过函数是一等公民，那切片里面可以放函数吗？

## 字典-map

刚才我们讲过的集合类的高级数据类型都属于针对单一元素的容器。

它们或用连续存储，或用互存指针的方式收纳元素，这里的每个元素都代表了一个从属某一类型的独立值。

现在要讲的字典（map）却不同，它能存储的不是单一值的集合，而是键值对的集合。

* 基础用法

```go
func main() {
	// 方法 1: 使用 make 函数定义 map
	ages := make(map[string]int)

	// 方法 2: 使用字面量定义 map
	grades := map[string]string{
		"Alice": "A",
		"Bob":   "B",
	}

	// 增加元素
	ages["Alice"] = 25
	ages["Bob"] = 30
	ages["Charlie"] = 22

	// 修改元素
	ages["Alice"] = 26 // 更新 Alice 的年龄

	// 查询元素
	aliceAge, exists := ages["Alice"]
	if exists {
		fmt.Printf("Alice's age: %d\n", aliceAge)
	} else {
		fmt.Println("Alice not found.")
	}

	// 遍历 map
	fmt.Println("Ages:")
	for name, age := range ages {
		fmt.Printf("%s is %d years old.\n", name, age)
	}

	// 删除元素
	delete(ages, "Bob") // 删除 Bob 的记录

	// 遍历删除后的 map
	fmt.Println("After deletion:")
	for name, age := range ages {
		fmt.Printf("%s is %d years old.\n", name, age)
	}
}
```

基础用法到此为止，接下来我们思考，map中的键和值分别能放什么类型的值呢？

这个问题你可以在Go语言规范中找到答案，但却没那么简单。它的典型回答是：**Go语言字典的键类型不可以是函数类型、字典类型和切片类型。**

Go语言规范规定，在键类型的值之间必须可以施加操作符`==`和`!=`。换句话说，键类型的值必须要支持判等操作。由于函数类型、字典类型和切片类型的值并不支持判等操作，所以字典的键类型不能是这些类型。

> 这个大家记住就好了，有能力的同学可以去了解一下map的底层实现，Ps：和哈希有关(哈希函数，哈希和，哈希碰撞)

## 函数进阶

### 前情提要：函数是一等公民

在Go语言中，函数可是一等公民，函数类型也是一等的数据类型。这是什么意思呢？

简单来说，这意味着函数不但可以用于封装代码、分割功能、解耦逻辑，还可以化身为普通的值，在其他函数间传递、赋予变量、做类型判断和转换等等，就像切片和字典的值那样。

而更深层次的含义就是：函数值可以由此成为能够被随意传播的独立逻辑组件（或者说功能模块）。

对于函数类型来说，它是一种对一组输入、输出进行模板化的重要工具，它比接口类型更加轻巧、灵活，它的值也借此变成了可被热替换的逻辑组件

```go
type Printer func(contents string) (n int, err error)

func printToStd(contents string) (bytesNum int, err error) {
	return fmt.Println(contents)
}

func main() {
	var p Printer
	p = printToStd
	p("something")
}
```

这里先声明了一个函数类型，名叫`Printer`。

注意这里的写法，在类型声明的名称右边的是`func`关键字，我们由此就可知道这是一个函数类型的声明。

在`func`右边的就是这个函数类型的参数列表和结果列表。其中，参数列表必须由圆括号包裹，而只要结果列表中只有一个结果声明，并且没有为它命名，我们就可以省略掉外围的圆括号。

书写函数签名的方式与函数声明的是一致的。只是紧挨在参数列表左边的不是函数名称，而是关键字`func`。这里函数名称和`func`互换了一下位置而已。

> 函数的签名其实就是函数的参数列表和结果列表的统称，它定义了可用来鉴别不同函数的那些特征，同时也定义了我们与函数交互的方式。

注意，各个参数和结果的名称不能算作函数签名的一部分，甚至对于结果声明来说，没有名称都可以。

只要两个函数的参数列表和结果列表中的元素顺序及其类型是一致的，我们就可以说它们是一样的函数，或者说是实现了同一个函数类型的函数。

严格来说，函数的名称也不能算作函数签名的一部分，它只是我们在调用函数时，需要给定的标识符而已。

在下面声明的函数`printToStd`的签名与`Printer`的是一致的，因此前者是后者的一个实现，即使它们的名称以及有的结果名称是不同的。

通过`main`函数中的代码，我们就可以证实这两者的关系了，我们顺利地把`printToStd`函数赋给了`Printer`类型的变量`p`，并且成功地调用了它。

### 高阶函数

> 那么什么叫高阶函数呢？

简单地说，高阶函数可以满足下面的两个条件：

1. **接受其他的函数作为参数传入**

2. **把其他的函数作为结果返回**

只要满足了其中任意一个特点，我们就可以说这个函数是一个高阶函数。高阶函数也是函数式编程中的重要概念和特征。

首先，我们来声明一个名叫`operate`的函数类型，它有两个参数和一个结果，都是`int`类型的。

```go
type operate func(x, y int) int
```

然后，我们编写`calculate`函数的签名部分。这个函数除了需要两个`int`类型的参数之外，还应该有一个`operate`类型的参数。

该函数的结果应该有两个，一个是`int`类型的，代表真正的操作结果，另一个应该是`error`类型的，因为如果那个`operate`类型的参数值为`nil`，那么就应该直接返回一个错误。

> 顺便说一下，函数类型属于引用类型，它的值可以为`nil`，而这种类型的零值恰恰就是`nil`。

```go
func calculate(x int, y int, op operate) (int, error) {
	if op == nil {
		return 0, errors.New("invalid operation")
	}
	return op(x, y), nil
}
```

`calculate`函数实现起来就很简单了。我们需要先检查一下参数，如果检查无误，那么就调用`op`并把那两个操作数传给它，最后返回`op`返回的结果和代表没有错误发生的`nil`。

`calculate`函数就是一个高阶函数。但是我们说高阶函数的特点有两个，而该函数只展示了其中**一个特点，即：接受其他的函数作为参数传入。那另一个特点，把其他的函数作为结果返回。**

我们可以这样写

```go
type calculateFunc func(x, y int) (int, error)
func genCalculator(op operate) calculateFunc {
	return func(x int, y int) (int, error) {
		if op == nil {
			return 0, errors.New("invalid operation")
		}
		return op(x, y), nil
	}
}
```

`genCalculator`函数只做了一件事，那就是定义一个匿名的、`calculateFunc`类型的函数并把它作为结果值返回。

而这个匿名的函数就是一个**闭包函数**。它里面使用的变量`op`既不代表它的任何参数或结果也不是它自己声明的，而是定义它的`genCalculator`函数的参数，所以是一个自由变量。

这个自由变量究竟代表了什么，这一点并不是在定义这个闭包函数的时候确定的，而是在`genCalculator`函数被调用的时候确定的。

只有给定了该函数的参数`op`，我们才能知道它返回给我们的闭包函数可以用于什么运算。

当程序运行到这里的时候，`op`就是那个参数值了。如此一来，这个闭包函数的状态就由“不确定”变为了“确定”，或者说转到了“闭合”状态，至此也就真正地形成了一个闭包。

> 那么，实现闭包的意义又在哪里呢？

表面上看，我们只是延迟实现了一部分程序逻辑或功能而已，但实际上，我们是在动态地生成那部分程序逻辑。我们可以借此在程序运行的过程中，根据需要生成功能不同的函数，继而影响后续的程序行为。

> 可是，可是我还是觉得没有意义啊:dizzy_face:

这个确实很抽象，这里可以给大家举几个具体的例子，现在看有点超纲，大家可以学到后面回来再理解一下

* **中间件**

  我们在定义 web 中间件时经常会看到以下形式的代码:

  ```go
  func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
      return func(w http.ResponseWriter, r *http.Request) {
          m := validPath.FindStringSubmatch(r.URL.Path)
          if m == nil {
              http.NotFound(w, r)
              return
          }
          fn(w, r, m[2]) // 如果没问题则继续执行 fn
      }
  }
  ```

  可以看到, 我们返回了一个 `http.HandlerFunc`, 这个函数里面调用了 fn, 这样的话我们就可以实现链式操作，既执行了中间件代码，又可以继续执行函数，非常方便。

* **状态共享**

  闭包可以用来共享多次执行函数的状态， 常见的例子是迭代器

* **回调函数**

  我们也可以通过传参，实现传入回调函数

  ```go
  func GetData(data int, callback func(int)) {
      go func() {
          result := data + 2
          callback(result)
      }
  }
  ```

  上面的例子可以看到， 我们传入 `data` 后， `callback` 可以获取到 `result` 进行额外回调操作。

* **函数工厂(这个不超纲**

通过闭包我们还可以构造函数工厂，通过传入参数返回对应函数。

```
func CalculationFactory(operation string) func(int, int) int {
    switch operation {
    case "add":
       return func(a, b int) int {
          return a + b
       }
    case "subtract":
       return func(a, b int) int {
          return a - b
       }
    case "multiply":
       return func(a, b int) int {
          return a * b
       }
    case "divide":
       return func(a, b int) int {
          if b != 0 {
             return a / b
          }
          return 0
       }
    default:
       return nil
    }
}
```

我们可以传入 `add` 获取加法函数，`divide` 获取除法函数。

### 引用类型&值类型

让我们把目光再次聚焦到函数本身。我们先看一个示例。

```go
package main

import "fmt"

func main() {
	array1 := [3]string{"a", "b", "c"}
	fmt.Printf("The array: %v\n", array1)
	array2 := modifyArray(array1)
	fmt.Printf("The modified array: %v\n", array2)
	fmt.Printf("The original array: %v\n", array1)
}

func modifyArray(a [3]string) [3]string {
	a[1] = "x"
	return a
}
```

> 大家思考一下array的值会改变吗？

答案是：不会，原因是，所有传给函数的参数值都会被复制，函数在其内部使用的并不是参数值的原值，而是它的副本。

由于数组是值类型，所以每一次复制都会拷贝它，以及它的所有元素值。我在`modify`函数中修改的只是原数组的副本而已，并不会对原数组造成任何影响。

注意，对于引用类型，比如：切片、字典、通道，像上面那样复制它们的值，只会拷贝它们本身而已，并不会拷贝它们引用的底层数据。也就是说，这时只是浅表复制，而不是深层复制。

## go test

我们来说一下单元测试，它又称程序员测试。顾名思义，这就是程序员们本该做的自我检查工作之一。

Go语言的缔造者们从一开始就非常重视程序测试，并且为Go程序的开发者们提供了丰富的API和工具。利用这些API和工具，我们可以创建测试源码文件，并为命令源码文件和库源码文件中的程序实体，编写测试用例。

在Go语言中，一个测试用例往往会由一个或多个测试函数来代表，不过在大多数情况下，每个测试用例仅用一个测试函数就足够了。测试函数往往用于描述和保障某个程序实体的某方面功能，比如，该功能在正常情况下会因什么样的输入，产生什么样的输出，又比如，该功能会在什么情况下报错或表现异常，等等。

我们可以为Go程序编写三类测试，即：功能测试（test）、基准测试（benchmark，也称性能测试），以及示例测试（example）。

对于前两类测试，从名称上你就应该可以猜到它们的用途。而示例测试严格来讲也是一种功能测试，只不过它更关注程序打印出来的内容。

一般情况下，一个测试源码文件只会针对于某个命令源码文件，或库源码文件（以下简称被测源码文件）做测试，所以我们总会（并且应该）把它们放在同一个代码包内。

测试源码文件的主名称应该以被测源码文件的主名称为前导，并且必须以“_test”为后缀。例如，如果被测源码文件的名称为print.go，那么针对它的测试源码文件的名称就应该是print_test.go。

每个测试源码文件都必须至少包含一个测试函数。并且，从语法上讲，每个测试源码文件中，都可以包含用来做任何一类测试的测试函数，即使把这三类测试函数都塞进去也没有问题。

我们可以依据这些测试函数针对的不同程序实体，把它们分成不同的逻辑组，并且，利用注释以及帮助类的变量或函数来做分割。同时，我们还可以依据被测源码文件中程序实体的先后顺序，来安排测试源码文件中测试函数的顺序。

此外，不仅仅对测试源码文件的名称，对于测试函数的名称和签名，Go语言也是有明文规定的。

- 对于功能测试函数来说，其名称必须以`Test`为前缀，并且参数列表中只应有一个`*testing.T`类型的参数声明。
- 对于性能测试函数来说，其名称必须以`Benchmark`为前缀，并且唯一参数的类型必须是`*testing.B`类型的。
- 对于示例测试函数来说，其名称必须以`Example`为前缀，但对函数的参数列表没有强制规定。

## Git

相信大家在提交上一节课作业时就已经学会git了

> 这里就复制第00节课了，绝对不是我偷懒:kissing_closed_eyes:

> 我在Goland写好代码之后每次都要跑到GitHub上传文件吗？

当然不用！Git 是目前世界上最先进的分布式版本控制系统，用来团队协作很方便。就不用每次上传代码都靠手动 upload files 了

如何安装看这个👇

[Git 的安装教程（详解每个步骤）_git官网安装-CSDN博客](https://blog.csdn.net/Passerby_Wang/article/details/120767020?ops_request_misc={"request_id"%3A"169673342216800182730025"%2C"scm"%3A"20140713.130102334.."}&request_id=169673342216800182730025&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-4-120767020-null-null.142^v95^chatgptT3_1&utm_term=安装git&spm=1018.2226.3001.4187)

但是我们基本不会再git bash里敲git命令，要么是在IDE里点点点，要么是在IDE的命令行里敲

如何使用看这个👇

[Git版本控制及Goland使用Git教程_goland配置git-CSDN博客](https://blog.csdn.net/qq_42956653/article/details/121613703?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_utm_term~default-5-121613703-blog-123849753.235^v43^pc_blog_bottom_relevance_base6&spm=1001.2101.3001.4242.4&utm_relevant_index=8)

git闯关小游戏👇

[Learn Git Branching](https://learngitbranching.js.org/?demo=&locale=zh_CN)



## 作业

本节课难度较高，特别是函数部分，大家没听懂也没关系，后面学的多了自然而然的就理解了

> 学了一个月再回来重新看的你：这居然这么简单:satisfied::satisfied::satisfied:

1. 编写一个函数，接收一个整数数组，返回一个map，其中键是数组中的元素，值是该元素在数组中出现的次数。

2. 实现一个简易的计算器，完成两个数的四则运算，需要用到高阶函数/闭包

Ps：有能力者可以继续升级，比如输入任意数量的数、识别括号等等

3. 给你之前写的函数都编写一个test文件

4. 尝试完成一下git闯关小游戏（提交截图就好

5. 思考题：

- 如果有多个切片指向了同一个底层数组，那么你认为应该注意些什么？

- 怎样沿用“扩容”的思想对切片进行“缩容”？
- 了解map底层的哈希逻辑
- 函数真正拿到的参数值其实只是它们的副本，那么函数返回给调用方的结果值也会被复制吗？
- 了解container包中的其他容器，比如：`List和Element`
- 寻找`testing.T`类型和`testing.B`类型外的其他方法？它们都是做什么用的？

给大家布置这么多思考题是怕学习进度快的同学没事做,给大家一个进阶学习的方向。**0基础的同学下来能把这节课上讲的内容消化好就很不错了！！**

作业完成后将作业 `GitHub 地址`发送至 `jiangjianhua@lanshan.email` ，并备注好姓名与完成内容

## 参考

- [1] Go语言核心36讲

