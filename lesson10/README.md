# Docker 入门教程：从基础到实战

欢迎来到 Docker 入门教程！这次课程的目的是，通过一些小实验，逐步掌握 Docker 的基本概念和实战技能。

------

## 引言

**Q：我们为什么要学习Docker？**

A: 随着云计算和微服务架构的普及，容器化技术已成为现代软件开发的重要组成部分。Docker 作为最流行的**容器化**平台，提供了**轻量级**、**可移植**且**易于管理**的解决方案。

**容器化**符合了云原生应用通常采用微服务架构，将复杂的应用拆分为多个独立的服务。Docker容器为每个微服务提供独立的运行环境，确保服务之间的隔离性和独立性，便于开发、部署和维护。

**可移植**符合了应用在不同环境中的一致性，由于容器的启动部署的自动化和标准化，可以实现应用的快速部署和扩展

------

## Docker 与虚拟机的区别

### 虚拟机（Virtual Machines）

- **架构**：虚拟机通过虚拟化整个硬件环境，运行在宿主操作系统（Host OS）之上。每个虚拟机包含一个完整的操作系统实例。
- **资源开销**：由于每个虚拟机需要独立的操作系统，资源开销较大，启动速度较慢。
- **隔离性**：提供强隔离性，每个虚拟机之间相互独立，适合运行不同操作系统的应用。

### Docker 容器

- **架构**：Docker 利用宿主操作系统的内核，通过容器技术隔离应用运行环境。容器共享宿主操作系统，但在用户空间中相互隔离。
- **资源开销**：由于共享操作系统，资源开销小，启动速度快。
- **隔离性**：隔离性较虚拟机弱，但对于大多数应用场景已足够。

### 对比总结

| 特性       | 虚拟机                           | Docker 容器            |
| ---------- | -------------------------------- | ---------------------- |
| 虚拟化层级 | 硬件虚拟化                       | 操作系统级别虚拟化     |
| 启动时间   | 数分钟                           | 秒级                   |
| 资源开销   | 高（每个虚拟机有独立的操作系统） | 低（共享宿主操作系统） |
| 隔离性     | 强                               | 较弱，但足够大多数场景 |
| 部署灵活性 | 较低                             | 高，易于移植和扩展     |

理解 Docker 与虚拟机的区别，有助于更好地选择适合的技术栈，并有效利用 Docker 的优势。

------

## Docker 原理概述

Docker 的强大之处在于其高效、轻量级的容器化技术，能够实现应用的快速部署、扩展和管理。Docker 的核心原理依赖于 Linux 内核的多项特性，如命名空间（Namespaces）和控制组（Cgroups），以及其独特的架构设计。以下将对 Docker 的原理进行更为详细的介绍，涵盖其核心组件、底层技术以及工作机制。

### 核心技术

#### 1. Linux 命名空间（Namespaces）

命名空间是 Linux 内核提供的一种资源隔离机制，用于将系统资源划分为多个独立的环境。Docker 利用命名空间为每个容器创建一个独立的运行环境，使得容器内的进程与宿主系统及其他容器中的进程相互隔离。主要涉及的命名空间类型包括：

- **PID Namespace（进程 ID 命名空间）**：隔离进程编号，使得容器内的进程具有独立的进程树。
- **NET Namespace（网络命名空间）**：隔离网络设备、IP 地址、路由表等网络资源，确保容器拥有独立的网络栈。
- **MNT Namespace（挂载命名空间）**：隔离文件系统挂载点，允许容器内拥有独立的文件系统视图。
- **UTS Namespace（UNIX 时间共享命名空间）**：隔离主机名和域名，容器可以拥有独立的主机标识。
- **IPC Namespace（进程间通信命名空间）**：隔离 System V IPC 和 POSIX 消息队列，确保容器间的进程间通信独立。
- **USER Namespace（用户命名空间）**：隔离用户和组 ID，增强安全性，使容器内的用户与宿主系统的用户对应关系不同。

#### 2. 控制组（Cgroups）

控制组是 Linux 内核提供的一种资源管理机制，用于限制、计量和隔离进程组使用的物理资源（如 CPU、内存、磁盘 I/O、网络带宽等）。Docker 利用 Cgroups 为每个容器分配资源配额，防止某个容器过度消耗系统资源，从而确保宿主机的稳定性和其他容器的正常运行。主要功能包括：

- **资源限制**：设定 CPU 使用率、内存上限等，防止资源滥用。
- **资源优先级**：分配不同的资源权重，确保关键容器获得足够资源。
- **资源监控**：实时监控容器的资源使用情况，便于管理和优化。

### Docker 的工作流程

Docker 的工作流程涵盖了从镜像构建到容器运行的各个环节，确保应用能够高效、稳定地部署和运行。主要步骤包括：

1. **编写 Dockerfile**：开发者根据应用需求编写 Dockerfile，定义镜像的基础环境、依赖和配置。
2. **构建镜像**：使用 `docker build` 命令，根据 Dockerfile 构建镜像，生成多层文件系统。
3. **推送镜像**：将构建好的镜像推送到 Docker Registry，便于分发和共享。
4. **拉取镜像**：在目标主机上使用 `docker pull` 命令从 Registry 拉取所需镜像。
5. **运行容器**：使用 `docker run` 命令启动容器，Docker 守护进程根据镜像创建独立的运行环境。
6. **管理容器**：通过 Docker 命令或 Docker Compose 管理容器的生命周期，包括启动、停止、重启和删除等操作。
7. **监控与维护**：监控容器的运行状态和资源使用情况，进行必要的优化和维护，确保应用的稳定性和性能。

### Docker 的网络与存储

#### 1. 网络（Networking）

Docker 提供多种网络模式，确保容器之间以及容器与外部世界的通信：

- **桥接网络（Bridge Network）**：默认网络模式，容器通过桥接网络进行通信，适用于单主机环境。
- **主机网络（Host Network）**：容器共享宿主机的网络栈，适用于对网络性能要求较高的场景。
- **覆盖网络（Overlay Network）**：跨主机的网络模式，适用于集群环境，通过 Docker Swarm 或 Kubernetes 实现容器间通信。
- **无网络（None Network）**：容器不连接任何网络，适用于高度隔离的场景。
- **自定义网络（Custom Network）**：根据需求创建自定义网络，支持 DNS 服务发现和网络隔离。

#### 2. 存储（Storage）

Docker 提供多种数据持久化和共享机制，确保容器数据的安全和可靠：

- **数据卷（Volumes）**：宿主机上的目录或文件，挂载到容器中，适用于持久化数据和跨容器共享。
- **绑定挂载（Bind Mounts）**：将宿主机的文件或目录直接挂载到容器，适用于开发环境中的实时代码更新。
- **tmpfs 挂载**：将数据存储在内存中，适用于需要高性能和短期存储的场景。
- **存储驱动（Storage Drivers）**：管理镜像和容器文件系统，支持多种存储后端，如 AUFS、OverlayFS、Btrfs、ZFS 等。

------

## 安装 Docker

1. **安装**

参考 [Docker 官方文档](https://docs.docker.com/get-docker/) 

2. **验证安装**

```bash
sudo docker run hello-world
```

如果看到 “Hello from Docker!” 的消息，说明 Docker 安装成功。

------

## 基础概念与命令

### 主要概念

- **镜像（Image）**：用于创建容器的只读模板。可以从 Docker Hub 拉取现有镜像或通过 Dockerfile 自行构建。
- **容器（Container）**：镜像的运行实例，具有独立的文件系统、网络和进程空间。
- **仓库（Repository）**：存储镜像的地方，可以是本地仓库或远程仓库（如 Docker Hub）。

### 常用命令

1. **拉取镜像**

   ```bash
   docker pull <image_name>
   ```

   示例：

   ```bash
   docker pull alpine:3.18
   ```

   **说明**：选择 `alpine` 镜像，因为它体积小，适合实验使用。

2. **列出本地镜像**

   ```bash
   docker images
   ```

3. **运行容器**

   ```bash
   docker run -it --name <container_name> <image_name> /bin/sh
   ```

   示例：

   ```bash
   docker run -it --name my_alpine alpine:3.18 /bin/sh
   ```

4. **列出运行中的容器**

   ```bash
   docker ps
   ```

5. **列出所有容器（包括停止的）**

   ```bash
   docker ps -a
   ```

6. **停止容器**

   ```bash
   docker stop <container_id>
   ```

7. **删除容器**

   ```bash
   docker rm <container_id>
   ```

8. **删除镜像**

   ```bash
   docker rmi <image_name>
   ```

9. **查看容器日志**

   ```bash
   docker logs <container_id>
   ```

10. **进入运行中的容器**

    ```bash
    docker exec -it <container_id> /bin/sh
    ```

------

## 深入 Dockerfile(lab2)

### 什么是 Dockerfile？

Dockerfile 是一个文本文件，包含了一系列指令，用于自动化构建 Docker 镜像。通过编写 Dockerfile，可以定义应用的运行环境、安装依赖、配置参数等。

### Dockerfile 基本语法

常用指令：

- **FROM**：指定基础镜像。
- **RUN**：在镜像内执行命令。
- **COPY**：将文件从主机复制到镜像。
- **ADD**：类似于 COPY，但支持从 URL 下载文件和解压缩。
- **CMD**：指定容器启动时执行的命令。
- **EXPOSE**：声明容器监听的端口。
- **ENV**：设置环境变量。
- **WORKDIR**：设置工作目录。

### 示例 Dockerfile

以下是一个简单的 Node.js 应用的 Dockerfile 示例，使用轻量级的 `node:18-alpine` 作为基础镜像：

```dockerfile
# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "app.js"]
```

### 构建镜像

使用 Dockerfile 构建镜像的命令：

```bash
docker build -t <image_name>:<tag> .
```

示例：

```bash
docker build -t my_node_app:1.0 .
```

### 优化 Dockerfile

- **减少层数**：尽量将多个命令合并为一个 `RUN` 指令，减少镜像层数。
- **利用缓存**：将不常变化的指令（如安装依赖）放在前面，常变化的指令放在后面，充分利用 Docker 缓存加速构建。
- **清理缓存**：在 `RUN` 指令中清理临时文件，减小镜像体积。

------

## 掌握 Docker Compose(lab3)

### 什么是 Docker Compose？

Docker Compose 是一个用于定义和管理多容器 Docker 应用的工具。通过一个 YAML 文件（通常命名为 `docker-compose.yml`），可以配置应用的服务、网络、卷等，并使用简单的命令进行部署和管理。

### Docker Compose 的作用和场景

- **多容器应用**：如 Web 应用后端数据库、缓存等多服务组合。
- **开发环境**：快速启动和关闭开发环境，方便调试和测试。
- **持续集成/持续部署（CI/CD）**：在自动化流程中管理应用的多个服务。

### Docker Compose 基本语法

一个典型的 `docker-compose.yml` 文件结构如下：

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/code
    depends_on:
      - db
  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
```

**说明**：使用 `postgres:13-alpine` 镜像，体积更小，适合实验。

### 常用命令

1. **启动服务**

   ```bash
   docker-compose up
   ```

   添加 `-d` 参数可在后台运行：

   ```bash
   docker-compose up -d
   ```

2. **停止服务**

   ```bash
   docker-compose down
   ```

3. **查看服务状态**

   ```bash
   docker-compose ps
   ```

4. **重启服务**

   ```bash
   docker-compose restart
   ```

5. **构建服务**

   ```bash
   docker-compose build
   ```

------

## 实战实验（Labs）

通过以下几个实验，逐步掌握 Docker 的使用与实战技能。实验中选用了体积较小的镜像，如 `alpine` 系列镜像，以确保下载和运行更加高效。

### Lab 1：创建第一个 Docker 容器

**目标**：使用官方 Alpine 镜像创建并运行一个容器，探索容器内部。

**步骤**：

1. **拉取 Alpine 镜像**

   ```bash
   docker pull alpine:3.18
   ```

   **说明**：`alpine` 镜像体积仅约 5MB，非常轻量，适合实验使用。

2. **运行 Alpine 容器**

   ```bash
   docker run -it --name my_alpine alpine:3.18 /bin/sh
   ```

   **说明**：使用 `/bin/sh` 作为默认 shell，因 Alpine 默认不包含 `/bin/bash`。

3. **在容器内执行命令**

   - 更新包列表（Alpine 使用 `apk` 包管理器）：

     ```sh
     apk update
     ```

   - 安装 `curl`：

     ```sh
     apk add curl
     ```

   - 测试 `curl` 安装：

     ```sh
     curl --version
     ```

4. **退出容器**

   ```sh
   exit
   ```

5. **查看容器状态**

   ```bash
   docker ps -a
   ```

**预期结果**：容器 `my_alpine` 已停止运行，可以看到其状态。

### Lab 2：编写 Dockerfile 构建自定义镜像

**目标**：编写 Dockerfile，构建一个包含 Node.js 应用的自定义镜像，使用轻量级的 `node:14-alpine` 作为基础镜像。

**步骤**：

1. **创建项目目录**

   ```bash
   mkdir my_node_app
   cd my_node_app
   ```

2. **初始化 Node.js 项目**

   ```bash
   npm init -y
   ```

3. **安装 Express**

   ```bash
   npm install express
   ```

4. **创建 `app.js`**

   在项目目录下创建 `app.js` 文件，内容如下：

   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;
   
   app.get('/', (req, res) => {
     res.send('Hello from Docker!');
   });
   
   app.listen(port, () => {
     console.log(`App listening at http://localhost:${port}`);
   });
   ```

5. **编写 Dockerfile**

   在项目目录下创建 `Dockerfile` 文件，内容如下：

   ```dockerfile
   # 使用官方 Node.js Alpine 镜像作为基础镜像
   FROM node:18-alpine
   
   # 设置工作目录
   WORKDIR /app
   
   # 复制 package.json 和 package-lock.json
   COPY package*.json ./
   
   # 安装依赖
   RUN npm install
   
   # 复制应用代码
   COPY . .
   
   # 暴露端口
   EXPOSE 3000
   
   # 启动应用
   CMD ["node", "app.js"]
   ```

6. **构建镜像**

   ```bash
   docker build -t my_node_app:1.0 .
   ```

   **说明**：构建过程将下载 `node:18-alpine` 镜像，并基于该镜像创建自定义镜像 `my_node_app:1.0`。

7. **运行容器**

   ```bash
   docker run -d -p 3000:3000 --name my_node_container my_node_app:1.0
   ```

   **说明**：`-d` 参数表示后台运行，`-p 3000:3000` 将宿主机的 3000 端口映射到容器的 3000 端口。

8. **测试应用**

   在浏览器中访问 `http://localhost:3000`，应看到 “Hello from Docker!” 的消息。

   **或者**，使用 `curl` 命令测试：

   ```bash
   curl http://localhost:3000
   ```

   **预期输出**：

   ```
   Hello from Docker!
   ```

### Lab 3：使用 Docker Compose 部署多容器应用

**目标**：使用 Docker Compose 部署包含 Node.js 应用和 PostgreSQL 数据库的多容器应用，选用轻量级的 `postgres:13-alpine` 镜像。

**步骤**：

1. **修改后的 `app.js`**

```js
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// 从环境变量中获取数据库连接参数
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',
  port: process.env.DB_PORT || 5432,
});

// 测试数据库连接
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// 定义根路由，执行一个简单的数据库查询
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Hello from Docker! Current Time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database query failed');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
```

2. **更新 `Dockerfile`**

```dockerfile
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖，包括 pg
RUN npm install

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "app.js"]

```

3. **创建 `docker-compose.yml`**

在项目目录下创建 `docker-compose.yml` 文件，内容如下：

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_USER: user
      DB_PASSWORD: password
      DB_NAME: mydb
  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_USER: user	
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:
```

**说明**：

- `web` 服务基于当前目录的 Dockerfile 构建。
- `db` 服务使用 `postgres:13-alpine` 镜像，体积更小。
- 使用卷 `db_data` 持久化数据库数据。

4. **启动服务**

```bash
docker-compose up -d
```

**说明**：`-d` 参数表示后台运行。

5. **查看服务状态**

```bash
docker-compose ps
```

6. **访问应用**

在浏览器中访问 `http://localhost:3000`，确认服务正常运行，显示 “Hello from Docker!” 的消息。

7. **查看数据库容器日志**

```bash
docker-compose logs db
```

**说明**：确认 PostgreSQL 数据库已正确启动。

8. **停止服务**

```bash
docker-compose down
```

**说明**：停止并移除所有由 `docker-compose up` 创建的容器。
