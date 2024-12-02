# 第7节课

### 什么是数据库？

顾名思义，数据库（Database）就是存放数据的仓库。数据库是按照数据结构来组织、存储和管理数据的仓库。
数据库的种类很多，比如关系型数据库、非关系型数据库、图形数据库等。

### 数据库的分类

1. **关系型数据库（RDBMS）**：

    - 数据以表格（关系）的形式存储，表与表之间通过**外键**关联。
    - 采用 **SQL**（Structured Query Language 简称 SQL）进行数据操作。

    - **常见数据库管理系统**：**MySQL**
    - 适用于具有明确结构的、以表格方式组织的数据。

2. **非关系型数据库（NoSQL）**：

    - 数据存储不依赖于表格和关系模型，支持多种数据结构，如键值对、文档、列族或图。
    - 适用于数据结构灵活、海量数据或需要高并发的场景。
    - **常见数据库管理系统**：**MongoDB**、**Redis**

3. **图数据库**：
    - 专门用于存储和查询图结构数据（如社交网络中的节点和边）。
    - **常见数据库管理系统**：Neo4j

4. **时序数据库（Time Series Database）**：

    - 专为存储时序数据（如传感器数据、金融市场数据等）设计的数据库。
    - **常见数据库管理系统**：InfluxDB

5. **对象数据库**：

    - 以对象的形式存储数据，通常与面向对象编程语言结合使用。
    - **常见数据库管理系统**：ObjectDB

### MySQL

MySQL是一种**关系型数据库**，关系型数据库的数据都是以**数据表**的形式进行存储的

> 看起来和excel差不多

```sql
+--------------+-----------------+------+-----+---------+----------------+
| Field        | Type            | Null | Key | Default | Extra          |
+--------------+-----------------+------+-----+---------+----------------+
| id           | bigint unsigned | NO   | PRI | NULL    | auto_increment |
| created_at   | datetime(3)     | YES  |     | NULL    |                |
| updated_at   | datetime(3)     | YES  |     | NULL    |                |
| nick_name    | varchar(42)     | YES  |     | NULL    |                |
| gender       | varchar(12)     | YES  |     | NULL    |                |
| password     | varchar(258)    | YES  |     | NULL    |                |
| avatar       | varchar(256)    | YES  |     | NULL    |                |
| introduction | longtext        | YES  |     | NULL    |                |
| email        | varchar(128)    | YES  |     | NULL    |                |
| qq           | bigint          | YES  |     | NULL    |                |
| tel          | varchar(18)     | YES  |     | NULL    |                |
| birthday     | varchar(128)    | YES  |     | NULL    |                |
| role         | tinyint         | YES  |     | 1       |                |
| user_name    | varchar(42)     | YES  |     | NULL    |                |
+--------------+-----------------+------+-----+---------+----------------+
```

上图就是一个user表，接下来我们简单来解析一下

1. **Field**（字段名）

- **含义**：表示表中列的名称，也就是数据表中每一列的名字。

2. **Type**（数据类型）

- **含义**：表示该字段的数据类型及其长度或精度。MySQL支持各种数据类型，如整数（INT）、浮动小数（FLOAT）、字符串（VARCHAR）、日期时间（DATETIME）等。详细内容可参考下表。

| **类别**         | **数据类型**          | **说明**                             | **范围/长度**                                                |
| ---------------- | --------------------- | ------------------------------------ | ------------------------------------------------------------ |
| **数字类型**     | `TINYINT`             | 存储小范围的整数                     | 有符号：-128 到 127；无符号：0 到 255                        |
|                  | `SMALLINT`            | 存储较小范围的整数                   | 有符号：-32,768 到 32,767；无符号：0 到 65,535               |
|                  | `MEDIUMINT`           | 存储中等范围的整数                   | 有符号：-8,388,608 到 8,388,607；无符号：0 到 16,777,215     |
|                  | `INT` / `INTEGER`     | 存储普通范围的整数                   | 有符号：-2,147,483,648 到 2,147,483,647；无符号：0 到 4,294,967,295 |
|                  | `BIGINT`              | 存储大范围的整数                     | 有符号：-9,223,372,036,854,775,808 到 9,223,372,036,854,775,807；无符号：0 到 18,446,744,073,709,551,615 |
|                  | `FLOAT`               | 存储单精度浮点数                     | 4 字节，精度通常为 7 位数字                                  |
|                  | `DOUBLE`              | 存储双精度浮点数                     | 8 字节，精度通常为 15 位数字                                 |
|                  | `DECIMAL` / `NUMERIC` | 存储定点数（高精度）                 | 定义时指定精度和小数位数，例如 `DECIMAL(10,2)`，表示最多 10 位，2 位小数 |
| **字符串类型**   | `CHAR`                | 固定长度字符串                       | 1 到 255 字符                                                |
|                  | `VARCHAR`             | 可变长度字符串                       | 1 到 65,535 字符                                             |
|                  | `TEXT`                | 变长文本数据                         | 最多 65,535 字符                                             |
|                  | `TINYTEXT`            | 变长文本数据                         | 最多 255 字符                                                |
|                  | `MEDIUMTEXT`          | 变长文本数据                         | 最多 16,777,215 字符                                         |
|                  | `LONGTEXT`            | 变长文本数据                         | 最多 4,294,967,295 字符                                      |
| **日期时间类型** | `DATE`                | 存储日期                             | `YYYY-MM-DD`，范围：1000-01-01 到 9999-12-31                 |
|                  | `DATETIME`            | 存储日期和时间                       | `YYYY-MM-DD HH:MM:SS`，范围：1000-01-01 00:00:00 到 9999-12-31 23:59:59 |
|                  | `TIMESTAMP`           | 存储时间戳                           | `YYYY-MM-DD HH:MM:SS`，范围：1970-01-01 00:00:01 到 2038-01-19 03:14:07 (UTC) |
|                  | `TIME`                | 存储时间                             | `HH:MM:SS`，范围：`-838:59:59` 到 `838:59:59`                |
|                  | `YEAR`                | 存储年份                             | `YYYY`，范围：1901 到 2155                                   |
| **布尔类型**     | `BOOLEAN` / `BOOL`    | 布尔值                               | 0（`FALSE`）或 1（`TRUE`）                                   |
| **二进制类型**   | `BINARY`              | 固定长度的二进制数据                 | 1 到 255 字节                                                |
|                  | `VARBINARY`           | 可变长度的二进制数据                 | 1 到 65,535 字节                                             |
|                  | `BLOB`                | 二进制大对象                         | 最多 65,535 字节                                             |
|                  | `TINYBLOB`            | 小型二进制大对象                     | 最多 255 字节                                                |
|                  | `MEDIUMBLOB`          | 中型二进制大对象                     | 最多 16,777,215 字节                                         |
|                  | `LONGBLOB`            | 大型二进制大对象                     | 最多 4,294,967,295 字节                                      |
| **JSON 类型**    | `JSON`                | 存储 JSON 格式数据                   | 最多 4GB 数据                                                |
| **集合类型**     | `ENUM`                | 枚举类型（限制为一组预定义值之一）   | 1 到 65,535 个预定义值                                       |
|                  | `SET`                 | 集合类型（可存储多个预定义值的组合） | 1 到 64 个预定义值的组合                                     |

3. **Null**（是否允许为NULL）

- **含义**：表示该字段是否允许存储 `NULL` 值，`NULL` 表示缺失或未知的数据。
- 值：

    - `YES`：字段允许为 `NULL`，即可以没有值。
- `NO`：字段不允许为 `NULL`，即该列必须有值。

4. **Key**（索引类型）

- **含义**：表示该字段是否作为索引的一部分，并指示索引的类型。MySQL支持多种类型的索引。
- **值**：
    - `PRI`：主键索引（Primary Key）。这是一个唯一且非空的索引，表中每个记录的主键值**必须唯一**。
    - `UNI`：唯一索引（Unique Key）。该字段的值**必须唯一**，但允许 `NULL` 值。
    - `MUL`：多重索引（Multiple）。表示该字段是普通索引的一部分，允许有重复值。
    - 如果该列没有任何索引，则该列显示为空。

5. **Default**（默认值）

- **含义**：表示该字段在没有指定值时使用的默认值。默认值可以是常量，也可以是 `NULL`。

- 示例：

    - 如果你在创建表时定义 `age INT DEFAULT 18`，当插入数据时，如果没有给 `age` 字段指定值，它会自动使用默认值 `18`。
- 如果一个字段没有默认值，`Default` 会显示为 `NULL`，表示没有默认值。

6. **Extra**（附加信息）

- **含义**：提供与字段相关的额外信息，例如是否自动递增（AUTO_INCREMENT）等。
- **值**：
    - `auto_increment`：字段是自动递增的，通常用于主键字段（如自增ID）。
    - `on update CURRENT_TIMESTAMP`：表示当记录被更新时，字段会自动更新为当前时间，通常用于记录最后更新时间的字段。
    - 如果没有额外信息，则该列为空。

### SQL

SQL也是一种语言，只不过它是用来操作数据库的

> 希望大家能成为SQL高手，不要像学长一样只会用go来操作数据库了:sob::sob:

大家下好MySQL后打开终端，输入 `mysql -u root -p`后再输入密码就可以开始sql之旅啦

#### **SQL 语句的基本结构**

SQL 语句通常由以下几个组成部分构成：

- **关键字（Keywords）**：如 `SELECT`、`INSERT`、`UPDATE`、`DELETE`、`FROM`、`WHERE` 等。
- **表名或列名**：指定操作的目标表或列。
- **操作符（Operators）**：如 `=`, `>`, `<`, `AND`, `OR`, `BETWEEN`, `IN` 等。
- **常量值**：如数字、字符串（字符串需要用单引号包围）。
- **括号（Parentheses）**：用于组织逻辑结构，例如子查询、函数参数等。

#### **SQL 语句书写规则**

- **区分大小写**：SQL 中的关键字通常不区分大小写，大写小写都随你（如 `SELECT` 和 `select` 是等效的），但某些数据库管理系统（如 PostgreSQL）区分表名和列名的大小写。
- **语句结束符**：SQL 语句需要以分号（`;`）结尾，特别是在多条语句执行时。
- **空格和缩进**：为了提高代码的可读性，SQL 语句中的关键词、表名、列名、条件等之间应使用空格分隔。通常推荐将每个关键字大写，且在复杂查询中使用缩进来提高可读性。

#### **DDL（数据定义语言）** 语句常见规则

**CREATE** 语句

`CREATE` 语句用于创建新的数据库对象（如数据库、表、视图、索引等）。创建对象时需要定义其结构和属性。

- **创建数据库**：用于创建一个新的数据库。

  ```sql
  CREATE DATABASE database_name;
  ```

- **创建表**：用于创建一张新的表，并定义表中的列和数据类型。

  ```sql
  CREATE TABLE employees (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      salary DECIMAL(10, 2)
  );
  ```

- **创建索引**：用于创建索引以提高查询效率。

  ```sql
  CREATE INDEX idx_salary ON employees(salary);
  ```

- **创建视图**：用于创建视图，视图是一个虚拟表，它基于一个或多个表的查询结果。

  ```sql
  CREATE VIEW high_salary_employees AS
  SELECT name, salary FROM employees WHERE salary > 50000;
  ```

**规则**：

- 创建对象时，需要明确指定对象的各项属性（如列名、数据类型、约束条件等）。
- `CREATE` 语句通常是不可逆的，删除对象时需要使用 `DROP` 语句。

**ALTER** 语句

`ALTER` 语句用于修改已存在的数据库对象。例如，修改表的结构，添加、删除、修改列，添加约束等。

- **修改表**：用于修改现有表的结构，如添加、删除、修改列。

    - 添加列：

      ```sql
      ALTER TABLE employees ADD hire_date DATE;
      ```

    - 修改列的数据类型：

      ```sql
      ALTER TABLE employees MODIFY salary DECIMAL(12, 2);
      ```

    - 删除列：

      ```sql
      ALTER TABLE employees DROP COLUMN hire_date;
      ```

- **添加约束**：可以使用 `ALTER` 语句向表中添加新的约束条件，如外键、唯一键等。

  ```sql
  ALTER TABLE employees ADD CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id);
  ```

**规则**：

- `ALTER` 语句能够动态修改现有数据库对象，灵活性较强。
- 修改对象时，需要小心处理已有的数据和结构变化，以避免对现有数据造成影响。

**DROP** 语句

`DROP` 语句用于删除数据库对象，如表、视图、索引等。执行 `DROP` 语句后，数据和对象的定义都会被永久删除。

- **删除表**：

  ```sql
  DROP TABLE employees;
  ```

- **删除视图**：

  ```sql
  DROP VIEW high_salary_employees;
  ```

- **删除索引**：

  ```sql
  DROP INDEX idx_salary;
  ```

**规则**：

- `DROP` 语句会永久删除对象及其内容，操作不可逆。
- 使用 `DROP` 删除表时，表中所有的数据、结构以及相关的约束都会被删除。

**TRUNCATE** 语句

`TRUNCATE` 语句用于删除表中的所有数据，但保留表的结构。与 `DELETE` 语句不同，`TRUNCATE` 语句执行时不逐行删除数据，因此速度更快，但不能在事务中回滚（具体行为视数据库管理系统而定）。

- 删除所有数据：

  ```sql
  truncate table_name
  ```

**规则**：

- `TRUNCATE` 语句仅清空数据，不会删除表的结构和约束。
- 不能像 `DELETE` 语句那样逐行删除数据，因此在删除大量数据时执行效率更高。

**RENAME** 语句

`RENAME` 语句用于重命名数据库对象，通常用于修改表名或列名。

- **重命名表**：

  ```sql
  RENAME TABLE employees TO staff;
  ```

- **重命名列**（某些数据库系统支持）：

  ```sql
  ALTER TABLE employees RENAME COLUMN salary TO salary_amount;
  ```

**规则**：

- `RENAME` 语句通常用于修改对象的名称，而不影响其数据和结构。

**COMMENT** 语句

`COMMENT` 语句用于为数据库对象（如表、列、索引等）添加注释，以便于开发人员或数据库管理员理解和使用这些对象。

- 为列添加注释：

  ```sql
  COMMENT ON COLUMN employees.salary IS 'Employee salary, in USD';
  ```

**规则**：

- `COMMENT` 语句不会影响数据的存储，仅为对象添加描述性信息。
- 注释对于文档化数据库结构和提高可维护性非常重要。

#### DML（ 数据处理语言）语句常见规则

1. **SELECT **

- `SELECT` 后面列出查询的列名，如果查询所有列，使用 `*`。

- `FROM` 后指定查询的数据表。

- `WHERE` 用于指定过滤条件。

- 例子：

  ```sql
  SELECT * FROM employees WHERE department = 'HR';
  SELECT name, salary FROM employees WHERE department = 'HR';
  ```

2. **INSERT**

- `INSERT INTO` 用来将数据插入到表中，后面跟表名和列名，`VALUES` 后跟插入的值。

- 插入时，值的顺序和列的顺序必须一致。

- 例子：

  ```sql
  INSERT INTO employees (name, department, salary) VALUES ('John Doe', 'HR', 50000);
  ```

3. **UPDATE**

- `UPDATE` 后指定要更新的表，`SET` 后列出需要更新的列和新值。

- `WHERE` 子句是必须的，否则会更新所有行。

- 例子：

  ```sql
  UPDATE employees SET salary = 55000 WHERE name = 'John Doe';
  ```

4. **DELETE**

- `DELETE FROM` 后指定要删除记录的表。

- `WHERE` 子句用于指定删除的条件。若没有 `WHERE`，则会删除所有记录。

- 例子：

  ```
  DELETE FROM employees WHERE id = 101;
  ```

#### **SQL 语句的逻辑顺序**

尽管 SQL 语句的书写顺序是固定的，但执行时的逻辑顺序遵循一定的流程：

1. **FROM**：确定数据来源（表或视图）
2. **WHERE**：根据条件筛选数据
3. **GROUP BY**：对数据进行分组（如按部门分组统计薪资）
4. **HAVING**：过滤分组后的数据（如仅选择薪水大于 50000 的部门）
5. **SELECT**：选择需要显示的列
6. **ORDER BY**：对查询结果进行排序

**例子**：

```
SELECT department, AVG(salary)
FROM employees
WHERE salary > 40000
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY department;
```

#### **常见的约定**

- 字符串与日期：字符串使用单引号`' '`包围；日期常用`YYYY-MM-DD`格式，且也用单引号包围

```
SELECT * FROM employees WHERE hire_date = '2024-01-01';
  ```

- 注释：SQL 支持单行和多行注释：

    - 单行注释：`-- 注释内容`
- 多行注释：`/* 注释内容 */`

#### **SQL 中的 NULL 值**

- `NULL` 表示缺失或未知的数据。在 SQL 中，`NULL` 不等于任何值，包括零（0）或空字符串（""）。用`IS NULL`或`IS NOT NULL`来检查NULL值

  ```
  SELECT * FROM employees WHERE salary IS NULL;
  ```

#### **常用的操作符**

- **比较操作符**：`=`, `>`, `<`, `>=`, `<=`, `<>`（不等于）

- **逻辑操作符**：`AND`, `OR`, `NOT`

- 范围操作符：`BETWEEN`和`IN`

  ```
  SELECT * FROM employees WHERE salary BETWEEN 40000 AND 60000;
  ```

- 模糊匹配：LIKE，通常用于字符串匹配

  ```
  SELECT * FROM employees WHERE name LIKE 'J%';  -- 姓名以 J 开头
  ```

#### **数据排序**

- 使用`ORDER BY`对查询结果进行排序，可以指定升序（ASC）或降序（DESC）

  ```
  SELECT * FROM employees ORDER BY salary DESC;
  ```

### Go操作MySQL

上面的内容是直接用SQL语句来操作MySQL，但是我们平时在写代码的时候怎么使用MySQL呢？

下面会给大家介绍GORM，一个用于操作数据库的库。不用在代码里写SQL，对于~~我这种懒狗十分友好~~

:point_down:这是GORM的文档，讲的非常详细，推荐多看，推荐多看，推荐多看！

[GORM 指南 ](https://gorm.io/zh_CN/docs/index.html)

#### 安装GORM

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

#### 连接到数据库

> GORM 官方支持的数据库类型有： MySQL, PostgreSQL, SQlite, SQL Server

GORM 通过数据库驱动连接到数据库。以 MySQL 为例：

```go
package main

import (
	"fmt"
	"log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// 使用GORM连接到MySQL数据库
	dsn := "root:[password]@tcp(127.0.0.1:3306)/[database]?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	fmt.Println("Database connected successfully")
}

func main() {
	ConnectDatabase()
}
```

#### 定义模型

GORM 中的模型结构体定义方式与数据库表结构紧密关联。结构体中的字段将映射到数据库的列。

```go
type User struct {
	ID       uint   `gorm:"primaryKey"`
	Name     string `gorm:"size:255;not null"`
	Email    string `gorm:"uniqueIndex;size:100;not null"`
	Password string `gorm:"size:255;not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
```

GORM自带了一个model结构体

```go
type Model struct {
    ID        uint `gorm:"primarykey"`
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt DeletedAt `gorm:"index"`
}
```

上面的User结构体也可以写成

```go
type User struct {
	gorm.Model
	Name     string `gorm:"size:255;not null"`
	Email    string `gorm:"uniqueIndex;size:100;not null"`
	Password string `gorm:"size:255;not null"`
}
```

#### 自动迁移（Migrate）

GORM 支持自动迁移数据库表结构，以保持数据库和模型的一致性。通过 `AutoMigrate` 方法可以自动创建表、更新字段等。非常方便！

```go
func Migrate() {
	err := DB.AutoMigrate(&User{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}
	fmt.Println("Database migrated successfully")
}
```

#### 基本的增删改查

```go
	//基本的CRUD操作
	var user models.UserModel
	//下面的global.DB就是一个*gorm.DB类型的实体

	//增
	user = models.UserModel{
		Name:     "zr",
		Password: "123321",
		Email:    "test@test.com",
	}
	//插入数据
	global.DB.Table("user_models").Create(&user) // Insert into user_models values(...)
	//指定插入的字段
	global.DB.Select("Name", "Password").Create(&user) //Insert into user_models (name, Password) values(...)
	//排除指定字段
	global.DB.Omit("Name", "Password").Create(&user) //Insert into user_models (email) values(...)
	//批量插入数据
	var users = []models.UserModel{
		{
			Name: "lx",
		},
		{
			Name: "hqm",
		},
	}
	global.DB.Create(&users) //Insert into user_models values(...),(...)


	//删
	global.DB.Where("id = ?", 1).Delete(&user)            //DELETE from user_models where id = 1
	global.DB.Where("id = ?", 1).Unscoped().Delete(&user) //软删除


	//改
	global.DB.Model(&user).Where("id = ?", 1).Update("name", "ysqd")                                        //UPDATE user_models SET name = 'ysqd' WHERE id = 1
	global.DB.Model(&user).Where("id = ?", 1).Updates(models.UserModel{Name: "ysqd", Email: "111@111.com"}) //UPDATE user_models SET name = 'ysqd', age = 18 WHERE id = 1

	global.DB.First(&user) //先查后改
	user.Name = "ysqd"
	global.DB.Save(&user) //更新数据


	//查
	global.DB.First(&user) //查询第一条数据
	//如果主键是数字类型，可以使用内联条件检索
	global.DB.First(&user, 10)                                                                             // SELECT * FROM student WHERE id = 10;
	global.DB.Find(&user, []int{1, 2, 3})                                                                  // SELECT * FROM student WHERE id IN (1,2,3);
	global.DB.Find(&user, "id IN (?)", []int{1, 2, 3})                                                     // SELECT * FROM student WHERE id IN (1,2,3);
	global.DB.Where("create_at between ? and ?", "2024-11-28 00:00:00", "2024-11-29 00:00:00").Find(&user) //SELECT * FROM student WHERE create_at between '2024-11-28 00:00:00' and '2024-11-29 00:00:00';
	//当然，也可以使用原生sql进行扫描
	global.DB.Raw("select * from user_models where id = ?", 1).Scan(&user) //SELECT * FROM user_models WHERE id = 1;
```

## 作业

本节课内容并不深，MySQL的索引、事务、锁、函数等高阶知识均未涉及，这些东西可以下来慢慢掌握

#### Lv1

练习SQL语句，以下是 `employees` 表结构

| 字段名       | 数据类型                               | 约束           | 说明                                      |
| ------------ | -------------------------------------- | -------------- | ----------------------------------------- |
| `id`         | INT                                    | 主键，自动递增 | 员工的唯一标识                            |
| `name`       | VARCHAR(100)                           | NOT NULL       | 员工的名字                                |
| `email`      | VARCHAR(150)                           | 唯一，NOT NULL | 员工的邮箱（唯一性）                      |
| `phone`      | VARCHAR(20)                            | NULL           | 员工的电话号码                            |
| `hire_date`  | DATE                                   | NOT NULL       | 员工的入职日期                            |
| `salary`     | DECIMAL(10, 2)                         | NULL           | 员工的薪资                                |
| `department` | VARCHAR(100)                           | NULL           | 员工的部门                                |
| `manager_id` | INT                                    | 外键，NULL     | 上级经理的员工 `id` (指向 `employees.id`) |
| `status`     | ENUM('active', 'inactive', 'on_leave') | 默认 'active'  | 员工状态                                  |
| `created_at` | TIMESTAMP                              | 默认当前时间   | 记录创建时间                              |
| `updated_at` | TIMESTAMP                              | 默认当前时间   | 记录更新时间                              |

请写出以下十个问题的SQL语句

1. 查询在过去一年内入职的员工数量
2. 查询每个部门的平均工资
3. 查询有超过10年工龄且工资高于某个值的员工
4. 减少所有 "on_leave" 状态员工百分之10的薪资
5. 查询部门里工资最高的员工
6. 查找曾经有两个不同部门工作的员工
7. 删除所有离职员工的记录
8.  查找至少有一个直接下属的经理
9. 查询在过去 30 天内有变动的员工信息
10. 查询某个员工的经理和下属信息

部分问题可能需要用到函数、多表查询，**大家尽量做，做多少交多少**，有不懂的随时来问，也可以找我来对答案

#### Lv2

利用gin和MySQL，自行设计表结构，完成一个简单的抽奖系统

可能涉及的功能：

* ~~库存相关的增删改查~~
* 新建/删除/参与抽奖
* ~~显示抽奖结果~~
* ~~等等~~

大家尽量完成，也是**做多少交多少**，遇到困难都可以来问

把仓库地址发送到邮箱`jiangjianhua@lanshan.email`即可



