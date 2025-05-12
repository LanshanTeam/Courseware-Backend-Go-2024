# 前言

## 什么是AI、AI Agent？

相信大家对AI不陌生了。AI 就是人工智能（Artificial Intelligence）的简称，它其实就是让计算机或者机器具备像人一样的智能。

比如说，大家都很熟悉的语音助手，像苹果的 Siri、小米的小爱同学。当你对它们说话，问“今天天气怎么样”，它们能理解你说的话，然后通过网络去获取天气信息，再把结果告诉你。这背后就是人工智能技术在起作用，机器通过一系列的算法和模型，理解人类的语言，处理信息，最后给出合适的回应。
再举个例子，图像识别技术。很多安防系统里会用到图像识别，通过摄像头拍摄的画面，机器能够识别出画面里的人是谁，是不是可疑人员。这也是人工智能的一种应用，机器通过学习大量的人脸图像数据，掌握不同人脸的特征，然后在实际场景中进行识别。
简单来说，AI 就是让机器模拟人类的智能行为，让它们能感知环境、理解信息、做出决策和采取行动。

那什么是 AI Agent 呢？AI Agent 可以理解成是一种特殊的 AI 程序或者实体。它就像是一个有自己“个性”和“任务”的小机器人，能够在特定的环境里自主地完成一些任务。
给你举个实际场景的例子，假如你有一个智能家居系统，里面有一个 AI Agent 负责管理家里的电器。这个 AI Agent 就可以根据你设定的规则，自主地控制电器的开关。比如说，到了晚上睡觉的时间，它会自动关闭客厅的灯和电视；早上起床的时候，它会自动打开窗帘和咖啡机。这个 AI Agent 会感知家里的时间、环境等信息，然后根据这些信息做出相应的决策，执行相应的动作。
再比如，在一些电商平台上，会有客服 AI Agent。当你向客服咨询商品信息的时候，这个 AI Agent 就会根据你提出的问题，从数据库里查找相关的答案，然后给你回复。它能和你进行交流，解答你的疑问，就像是一个真正的客服人员一样。

AI 和 AI Agent 有什么联系和区别呢？

AI 是一个更宽泛的概念，它包含了各种让机器具备智能的技术和方法。而 AI Agent 是基于 AI 技术构建的一个具体的程序或者实体，它有自己明确的任务和目标，能够在特定的环境里自主地行动。可以说，AI Agent 是 AI 技术的一种具体应用形式。
> 所以大家不要有误区。认为AI都是那些搞算法的博士、研究生才能搞的东西。咱们臭开发的做做AI Agent应用还是没问题的/doge

---
## 为啥要学这个？

> 有大四学长已经all in AI 了🐶🐶

就业竞争力提升

如今的互联网行业，对复合型人才的需求越来越大。企业都希望招聘到的员工能掌握多种技能，能应对不同类型的业务需求。你本身掌握了Golang后端开发技术，这已经是很厉害的一项技能了，但如果再加上AI Agent开发能力，那你的竞争力会大幅提升。
想象一下，在求职的时候，面对一个需要结合后端开发和AI技术的项目，其他只懂传统后端开发的同学可能就没办法胜任，而你因为掌握了AI Agent开发，就有很大的优势，能从众多求职者中脱颖而出，获得更好的工作机会和更高的薪资待遇。

技术发展趋势

技术的发展是日新月异的，传统后端开发和AI技术正在不断融合。现在很多后端系统都开始引入AI元素，以提升系统的性能和智能化程度。
比如说，在电商后端系统中，利用AI Agent可以实现智能的库存管理。AI Agent可以根据历史销售数据、当前库存情况以及市场趋势等信息，自动预测商品的需求，然后调整库存水平，避免库存积压或缺货的情况发生。如果你不懂AI Agent开发，在面对这样的技术变革时，就可能会落后于时代。

拓展业务边界

掌握AI Agent开发能让你开发出更具创新性的后端应用。传统后端开发主要关注系统的稳定性、性能和数据处理等方面，而引入AI Agent后，你可以让系统具备智能决策和自主交互的能力。
例如，在一个在线教育后端系统中，你可以开发一个AI Agent作为智能学习助手。这个AI Agent可以根据学生的学习进度、学习习惯和测试成绩等信息，为学生提供个性化的学习建议和辅导。这样的创新应用能为产品带来更多的用户和市场竞争力，也为你的职业发展打开了更广阔的空间。

解决复杂问题

在实际的后端开发中，会遇到很多复杂的问题，传统的开发方法可能无法很好地解决。而AI Agent开发提供了一种新的思路和方法。
比如，在处理大量的用户请求和数据时，AI Agent可以通过学习和分析用户行为模式，自动优化系统的资源分配，提高系统的响应速度和处理效率。又或者在进行安全防护时，AI Agent可以实时监测系统的异常行为，自动识别和抵御潜在的安全威胁。

---
# RAG

## 什么是RAG？

检索增强生成（Retrieval Augmented Generation）。简单来讲，RAG就是通过检索获取相关的知识并将其融入Prompt，让大模型能够参考相应的知识从而给出合理回答。因此，可以将RAG的核心理解为“检索+生成”，前者主要是利用向量数据库的高效存储和检索能力，召回目标知识；后者则是利用大模型和Prompt工程，将召回的知识合理利用，生成目标答案。


## 为什么要RAG，RAG能解决什么问题
- 知识的局限性：模型自身的知识完全源于它的训练数据，而现有的主流大模型的训练集基本都是构建于网络公开的数据，对于一些实时性的、非公开的或离线的数据是无法获取到的，这部分知识也就无从具备。
- 幻觉问题：所有的AI模型的底层原理都是基于数学概率，其模型输出实质上是一系列数值运算，大模型也不例外，所以它有时候会一本正经地胡说八道，尤其是在大模型自身不具备某一方面的知识或不擅长的场景。而这种幻觉问题的区分是比较困难的，因为它要求使用者自身具备相应领域的知识。
- 数据安全性：对于企业来说，数据安全至关重要，没有企业愿意承担数据泄露的风险，将自身的私域数据上传第三方平台进行训练。这也导致完全依赖通用大模型自身能力的应用方案不得不在数据安全和效果方面进行取舍。
  而RAG是解决上述问题的一套有效方案。
  完整的RAG应用流程主要包含两个阶段： 
- 数据准备阶段：数据提取——>文本分割——>向量化（embedding）——>数据入库
- 应用阶段：用户提问——>数据检索（召回）——>注入Prompt——>LLM生成答案
  具体步骤
### 数据提取
- 数据加载：包括多格式数据加载、不同数据源获取等，根据数据自身情况，将数据处理为同一个范式。
- 数据处理：包括数据过滤、压缩、格式化等。
- 元数据获取：提取数据中关键信息，例如文件名、Title、时间等 。
### 文本分割
  文本分割主要考虑两个因素 :embedding模型的Tokens限制情况；语义完整性对整体的检索效果的影响。一些常见的文本分割方式如下：
    
- 句分割：以”句”的粒度进行切分，保留一个句子的完整语义。常见切分符包括：句号、感叹号、问号、换行符等。
- 固定长度分割：根据embedding模型的token长度限制，将文本分割为固定长度（例如256/512个tokens），这种切分方式会损失很多语义信息，一般通过在头尾增加一定冗余量来缓解。
###    向量化（embedding）：
 向量化是一个将文本数据转化为向量矩阵的过程，该过程会直接影响到后续检索的效果。目前常见的embedding模型如表中所示，这些embedding模型基本能满足大部分需求，但对于特殊场景（例如涉及一些罕见专有词或字等）或者想进一步优化效果，则可以选择开源Embedding模型微调或直接训练适合自己场景的Embedding模型。
### 数据入库
数据向量化后构建索引，并写入数据库的过程可以概述为数据入库过程，适用于RAG场景的数据库包括：Vikingdb、Chromadb、ES等。一般可以根据业务场景、硬件、性能需求等多因素综合考虑，选择合适的数据库。
      
### 数据检索
常见的数据检索方法包括：相似性检索、全文检索等，根据检索效果，一般可以选择多种检索方式融合，提升召回率。
- 相似性检索：即计算查询向量与所有存储向量的相似性得分，返回得分高的记录。常见的相似性计算方法包括：余弦相似性、欧氏距离、曼哈顿距离等。
- 全文检索：全文检索是一种比较经典的检索方式，在数据存入时，通过关键词构建倒排索引；在检索时，通过关键词进行全文检索，找到对应的记录。
### 注入Prompt
  Prompt作为大模型的直接输入，是影响模型输出准确率的关键因素之一。在RAG场景中，Prompt一般包括任务描述、背景知识（检索得到）、任务指令（一般是用户提问）等，根据任务场景和大模型性能，也可以在Prompt中适当加入其他指令优化大模型的输出。一个简单知识问答场景的Prompt如下所示：
  ```
  【任务描述】
  假如你是一个专业的客服机器人，请参考【背景知识】，回
  【背景知识】
  {content} // 数据检索得到的相关文本
  【问题】
  石头扫地机器人P10的续航时间是多久？
  ```
  Prompt的设计只有方法、没有语法，比较依赖于个人经验，在实际应用过程中，往往需要根据大模型的实际输出进行针对性的Prompt调优。
  
# MCP
## 什么是MCP？
  MCP是一种开放的技术协议，旨在标准化大型语言模型（LLM）与外部工具和服务的交互方式。你可以把MCP理解成像是一个AI世界的通用翻译官，让AI模型能够与各种各样的外部工具"对话"。
  想深入了解概念可以看一文读懂MCP[https://cloud.tencent.com/developer/article/2505540?policyId=1003]
  > 概念非常抽象，本质上MCP就是一种协议。但是咱知道怎么用就行，它最直接的用处就是让你可以直接使用别人已经写好的东西

##  使用MCP
  你只需要拿到一串神秘json，比如说：
  ```
  {
  "mcpServers": {
  "searxng": {
  "command": "npx",
  "args": [
  "-y",
  "@kevinwatt/mcp-server-searxng"
  ]
  }
  }
  }
  ```
  然后用mcp-go(github.com/mark3labs/mcp-go)去起一个client，然后你就可以直接用别人在里面写好的工具了
### Example
```
import (
"context"
"encoding/json"
"fmt"
"github.com/cloudwego/eino/components/tool"
"meetingagent/service/mcp"
"os"
"strconv"
)

// MCPTool 表示一个MCP工具的信息
type MCPTool struct {
Name    string   // 工具名称
Command string   // 命令字符串 (如果是command模式)
Args    []string // 命令参数 (如果是command模式)
Env     []string // 环境变量，格式为KEY=VALUE
URL     string   // SSE服务URL (如果是SSE模式)
Type    string   // 工具类型："command" 或 "sse"
}

// MCPServerConfig 表示MCP服务器配置的不同可能格式
type MCPServerConfig struct {
// Command模式字段
Command string            `json:"command,omitempty"`
Args    []string          `json:"args,omitempty"`
Env     map[string]string `json:"env,omitempty"`

    // SSE模式字段
    URL string `json:"url,omitempty"`
}

// MCPConfig 表示整个MCP配置
type MCPConfig struct {
MCPServers map[string]MCPServerConfig `json:"mcpServers"`
}

var AllEinoTools []tool.BaseTool

func GetEinoTools() []tool.BaseTool {
return AllEinoTools
}

func LoadMCPJson() {
path := "mcp.json"
ctx := context.Background()
_, err := os.Stat(path)
if os.IsNotExist(err) {
fmt.Println("mcp文件不存在或路径不正确")
return // 文件不存在
}
toolsInfo, err := ParseMCPJSON(path)
if err != nil {
fmt.Println("加载mcp配置失败")
}
for i, k := range toolsInfo {
fmt.Println(strconv.Itoa(i) + " 正在加载工具 " + k.Name)
if k.Type == "studio" {
tools := mcp.GetStudioTool(ctx, k.Command, k.Env, k.Args)
AllEinoTools = append(AllEinoTools, tools...)
}
if k.Type == "sse" {
tools := mcp.GetSSETool(ctx, k.URL)
AllEinoTools = append(AllEinoTools, tools...)
}
}

}

// ParseMCPJSON 从文件路径解析MCP JSON，返回工具信息切片
func ParseMCPJSON(path string) ([]MCPTool, error) {
// 读取JSON文件
data, err := os.ReadFile(path)
if err != nil {
return nil, err
}

    // 解析JSON
    var config MCPConfig
    err = json.Unmarshal(data, &config)
    if err != nil {
       return nil, err
    }

    // 创建工具信息切片
    tools := make([]MCPTool, 0, len(config.MCPServers))

    // 填充工具信息
    for name, serverInfo := range config.MCPServers {
       tool := MCPTool{
          Name: name,
       }

       // 确定工具类型并设置相应字段
       if serverInfo.URL != "" {
          // 这是SSE类型
          tool.Type = "sse"
          tool.URL = serverInfo.URL
       } else if serverInfo.Command != "" {
          // 这是studio类型
          tool.Type = "studio"
          tool.Command = serverInfo.Command
          tool.Args = serverInfo.Args
          tool.Env = make([]string, 0, len(serverInfo.Env))

          // 将环境变量映射转换为字符串切片，格式为 "KEY=VALUE"
          for key, value := range serverInfo.Env {
             tool.Env = append(tool.Env, key+"="+value)
          }
       }

       tools = append(tools, tool)
    }

    return tools, nil
}
```
```
package mcp

import (
"context"
"fmt"
mcpp "github.com/cloudwego/eino-ext/components/tool/mcp"
"github.com/cloudwego/eino/components/tool"
"github.com/mark3labs/mcp-go/client"
"github.com/mark3labs/mcp-go/mcp"
)

func GetStudioTool(ctx context.Context, command string, env []string, args []string) []tool.BaseTool {
cli, err := client.NewStdioMCPClient(command, env, args...)
if err != nil {
fmt.Println("mcp加载出错")
return nil
}

    initRequest := mcp.InitializeRequest{}
    initRequest.Params.ProtocolVersion = mcp.LATEST_PROTOCOL_VERSION
    initRequest.Params.ClientInfo = mcp.Implementation{
       Name:    "example-client",
       Version: "1.0.0",
    }

    _, err = cli.Initialize(ctx, initRequest)
    if err != nil {
       fmt.Println("mcp初始化出错")
       return nil
    }
    //res, err := cli.ListTools(ctx, mcp.ListToolsRequest{})

    tools, err := mcpp.GetTools(ctx, &mcpp.Config{Cli: cli})
    if err != nil {
       fmt.Println("eino转换mcp出错")
       return nil
    }
    return tools
}
```
### MCP合集网址
https://github.com/punkpeye/awesome-mcp-servers GitHub上的mcp服务精选列表

https://glama.ai/mcp/servers 精选mcp服务集合

https://www.pulsemcp.com/ 专注数据分析的mcp服务

https://www.pulsemcp.com/ 开发者有好的mcp工具箱

https://mcp.composio.dev/ 可组合的mcp服务平台

# Eino
> 在Windows上用会有一些小Bug

## Eino 框架的基本组成
Eino: Components 组件[https://www.cloudwego.io/zh/docs/eino/core_modules/components/]

---
## Eino 框架的具体使用示例
### LLM
大型语言模型(Large Language Model, LLM)是基于海量文本数据训练的深度学习模型，核心能力是理解和生成自然语言文本。LLM如GPT-4、Claude等擅长文本生成、问答、翻译等任务，但本质上是被动的"静态"模型
应用场景：包括聊天机器人、自动写作、机器翻译、内容生成等自然语言处理任务。
```
package main

import (
"context"
"github.com/cloudwego/eino/components/prompt"
"io"
"log"

    "github.com/cloudwego/eino-ext/components/model/ollama"
    "github.com/cloudwego/eino/components/model"
    "github.com/cloudwego/eino/schema"
)

func main() {
ctx := context.Background()

    // 使用模版创建messages
    log.Printf("===create messages===\n")
    messages := createMessagesFromTemplate()
    log.Printf("messages: %+v\n\n", messages)

    // 创建llm
    log.Printf("===create llm===\n")
    //cm := createOpenAIChatModel(ctx)
    cm := createOllamaChatModel(ctx)
    log.Printf("create llm success\n\n")

    log.Printf("===llm generate===\n")
    result := generate(ctx, cm, messages)
    log.Printf("result: %+v\n\n", result)

    log.Printf("===llm stream generate===\n")
    streamResult := stream(ctx, cm, messages)
    reportStream(streamResult)
}

func generate(ctx context.Context, llm model.ChatModel, in []*schema.Message) *schema.Message {
result, err := llm.Generate(ctx, in)
if err != nil {
log.Fatalf("llm generate failed: %v", err)
}
return result
}

func stream(ctx context.Context, llm model.ChatModel, in []*schema.Message) *schema.StreamReader[*schema.Message] {
result, err := llm.Stream(ctx, in)
if err != nil {
log.Fatalf("llm generate failed: %v", err)
}
return result
}

func createOllamaChatModel(ctx context.Context) model.ChatModel {
chatModel, err := ollama.NewChatModel(ctx, &ollama.ChatModelConfig{
BaseURL: "http://localhost:11434", // Ollama 服务地址
Model:   "deepseek-r1:8b",         // 模型名称
})
if err != nil {
log.Fatalf("create ollama chat model failed: %v", err)
}
return chatModel
}
func reportStream(sr *schema.StreamReader[*schema.Message]) {
defer sr.Close()

    i := 0
    for {
       message, err := sr.Recv()
       if err == io.EOF {
          return
       }
       if err != nil {
          log.Fatalf("recv failed: %v", err)
       }
       log.Printf("message[%d]: %+v\n", i, message)
       i++
    }
}

func createTemplate() prompt.ChatTemplate {
// 创建模板，使用 FString 格式
return prompt.FromMessages(schema.FString,
// 系统消息模板
schema.SystemMessage("你是一个{role}。你需要用{style}的语气回答问题。你的目标是帮助程序员保持积极乐观的心态，提供技术建议的同时也要关注他们的心理健康。"),

       // 插入需要的对话历史（新对话的话这里不填）
       schema.MessagesPlaceholder("chat_history", true),

       // 用户消息模板
       schema.UserMessage("问题: {question}"),
    )
}

func createMessagesFromTemplate() []*schema.Message {
template := createTemplate()

    // 使用模板生成消息
    messages, err := template.Format(context.Background(), map[string]any{
       "role":     "程序员鼓励师",
       "style":    "积极、温暖且专业",
       "question": "我的代码一直报错，感觉好沮丧，该怎么办？",
       // 对话历史（这个例子里模拟两轮对话历史）
       "chat_history": []*schema.Message{
          schema.UserMessage("你好"),
          schema.AssistantMessage("嘿！我是你的程序员鼓励师！记住，每个优秀的程序员都是从 Debug 中成长起来的。有什么我可以帮你的吗？", nil),
          schema.UserMessage("我觉得自己写的代码太烂了"),
          schema.AssistantMessage("每个程序员都经历过这个阶段！重要的是你在不断学习和进步。让我们一起看看代码，我相信通过重构和优化，它会变得更好。记住，Rome wasn't built in a day，代码质量是通过持续改进来提升的。", nil),
       },
    })
    if err != nil {
       log.Fatalf("format template failed: %v\n", err)
    }
    return messages
}
```

### Agent
本质上是给LLM加上双手(tool)
```
func main() {


    ctx := context.Background()

    updateTool, err := utils.InferTool("update_todo", "Update a todo item, eg: content,deadline...", UpdateTodoFunc)
    if err != nil {
       logs.Errorf("InferTool failed, err=%v", err)
       return
    }

    // 创建 Google Search 工具
    searchTool, err := duckduckgo.NewTool(ctx, &duckduckgo.Config{
       MaxResults: 3,
       Region:     ddgsearch.RegionCN,
       DDGConfig: &ddgsearch.Config{
          Timeout:    10 * time.Second,
          Cache:      true,
          MaxRetries: 5,
       },
    })

    if err != nil {
       logs.Errorf("NewDuckDuckGoTool failed, err=%v", err)
       return
    }

    // 初始化 tools
    todoTools := []tool.BaseTool{
       getAddTodoTool(), // 使用 NewTool 方式
       updateTool,       // 使用 InferTool 方式
       &ListTodoTool{},  // 使用结构体实现方式, 此处未实现底层逻辑
       searchTool,
    }


    chatModel, err := ark.NewChatModel(ctx, &ark.ChatModelConfig{


    })
    if err != nil {
       logs.Errorf("NewChatModel failed, err=%v", err)
       return
    }

    // 获取工具信息, 用于绑定到 ChatModel
    toolInfos := make([]*schema.ToolInfo, 0, len(todoTools))
    var info *schema.ToolInfo
    for _, todoTool := range todoTools {
       info, err = todoTool.Info(ctx)
       if err != nil {
          logs.Infof("get ToolInfo failed, err=%v", err)
          return
       }
       toolInfos = append(toolInfos, info)
    }
    // 将 tools 绑定到 ChatModel
    err = chatModel.BindTools(toolInfos)
    if err != nil {
       logs.Errorf("BindTools failed, err=%v", err)
       return
    }

    // 创建 tools 节点
    todoToolsNode, err := compose.NewToolNode(ctx, &compose.ToolsNodeConfig{
       Tools: todoTools,
    })
    if err != nil {
       logs.Errorf("NewToolNode failed, err=%v", err)
       return
    }

    // 构建完整的处理链
    chain := compose.NewChain[[]*schema.Message, []*schema.Message]()
    chain.
       AppendChatModel(chatModel, compose.WithNodeName("chat_model")).
       AppendToolsNode(todoToolsNode, compose.WithNodeName("tools"))

    // 编译并运行 chain
    agent, err := chain.Compile(ctx)
    if err != nil {
       logs.Errorf("chain.Compile failed, err=%v", err)
       return
    }

    // 运行示例
    resp, err := agent.Invoke(ctx, []*schema.Message{
       {
          Role:    schema.User,
          Content: "搜索cloudwego的信息",
       },
    })
    if err != nil {
       logs.Errorf("agent.Invoke failed, err=%v", err)
       return
    }

    // 输出结果
    for idx, msg := range resp {
       logs.Infof("\n")
       logs.Infof("message %d: %s: %s", idx, msg.Role, msg.Content)
    }
}

// 获取添加 todo 工具
// 使用 utils.NewTool 创建工具
func getAddTodoTool() tool.InvokableTool {
info := &schema.ToolInfo{
Name: "add_todo",
Desc: "Add a todo item",
ParamsOneOf: schema.NewParamsOneOfByParams(map[string]*schema.ParameterInfo{
"content": {
Desc:     "The content of the todo item",
Type:     schema.String,
Required: true,
},
"started_at": {
Desc: "The started time of the todo item, in unix timestamp",
Type: schema.Integer,
},
"deadline": {
Desc: "The deadline of the todo item, in unix timestamp",
Type: schema.Integer,
},
}),
}

    return utils.NewTool(info, AddTodoFunc)
}

// ListTodoTool
// 获取列出 todo 工具
// 自行实现 InvokableTool 接口
type ListTodoTool struct{}

func (lt *ListTodoTool) Info(_ context.Context) (*schema.ToolInfo, error) {
return &schema.ToolInfo{
Name: "list_todo",
Desc: "List all todo items",
ParamsOneOf: schema.NewParamsOneOfByParams(map[string]*schema.ParameterInfo{
"finished": {
Desc: "filter todo items if finished",
Type: schema.Boolean,
Required: false,
},
}),
}, nil
}

type TodoUpdateParams struct {
ID        string  `json:"id" jsonschema:"description=id of the todo"`
Content   *string `json:"content,omitempty" jsonschema:"description=content of the todo"`
StartedAt *int64  `json:"started_at,omitempty" jsonschema:"description=start time in unix timestamp"`
Deadline  *int64  `json:"deadline,omitempty" jsonschema:"description=deadline of the todo in unix timestamp"`
Done      *bool   `json:"done,omitempty" jsonschema:"description=done status"`
}

type TodoAddParams struct {
Content  string `json:"content"`
StartAt  *int64 `json:"started_at,omitempty"` // 开始时间
Deadline *int64 `json:"deadline,omitempty"`
}

func (lt *ListTodoTool) InvokableRun(_ context.Context, argumentsInJSON string, _ ...tool.Option) (string, error) {
logs.Infof("invoke tool list_todo: %s", argumentsInJSON)

        // Tool处理代码
        // ...

        return `{"todos": [{"id": "1", "content": "在2024年12月10日之前完成Eino项目演示文稿的准备工作", "started_at": 1717401600, "deadline": 1717488000, "done": false}]}`, nil
}

func AddTodoFunc(_ context.Context, params *TodoAddParams) (string, error) {
logs.Infof("invoke tool add_todo: %+v", params)

    // Tool处理代码
    // ...

    return `{"msg": "add todo success"}`, nil
}

func UpdateTodoFunc(_ context.Context, params *TodoUpdateParams) (string, error) {
logs.Infof("invoke tool update_todo: %+v", params)

    // Tool处理代码
    // ...

    return `{"msg": "update todo success"}`, nil
}
```

### React Agent
Agent + 循环推理迭代
```
func main() {// 先初始化所需的 chatModel
toolableChatModel, err := openai.NewChatModel(...)// 初始化所需的 tools
tools := compose.ToolsNodeConfig{
Tools: []tool.BaseTool{
mytool,...},}// 创建 agent
agent, err := react.NewAgent(ctx, &react.AgentConfig{
ToolCallingModel: toolableChatModel,
ToolsConfig: tools,...
}
}
```
# 作业
- 把上面的两个example改成web服务
- 想深入学习的多看看文档