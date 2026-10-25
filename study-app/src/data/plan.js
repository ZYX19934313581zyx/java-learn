// 上岸宝典 · 学习计划数据(唯一事实源,改计划只改这里)
export const PLAN = {
  updatedAt: '2026-10-25',
  milestones: [
    { d: '2027-01-31', t: '寒假检查点:能从零手写 Spring Boot CRUD' },
    { d: '2027-03-15', t: '简历v1完成 + smart-diagnose-web 吃透' },
    { d: '2027-04-15', t: 'RAG 项目上 GitHub' },
    { d: '2027-04-20', t: '开始海投暑期实习' },
    { d: '2027-06-15', t: '暑期实习上岗(目标)' }
  ],
  phases: [
    {
      id: 'p1', name: '阶段1 · JavaSE 重学', short: 'JavaSE', span: '2026.10下 - 12月中 · 约7周',
      goal: '离开视频能手写基础代码',
      gates: [
        '不看资料手写 Animal 抽象类 + Dog/Cat 多态例子',
        '手写简化版 HashMap(数组+链表,put/get/resize)',
        '用 Stream 写"过滤18岁→提取名字→收集List"',
        '讲清 @Service 为什么能让 Spring 创建对象',
        '在 pom.xml 加一个依赖并写代码跑通'
      ],
      kps: [
        {
          id: 'p1-k1', name: '环境与第一个程序', lv: '手搓',
          std: '不看教程:IDEA 新建 Maven 项目 → 写类 → 右键运行成功',
          intro: 'JDK=开发工具包(写代码),JRE=运行环境(跑代码),JVM=虚拟机(真正执行字节码),三者是包含关系:JDK ⊃ JRE ⊃ JVM。你写的 .java 文件由编译器(javac)编译成 .class 字节码,再由 JVM 执行——这就是"一次编写,到处运行"的原因。IDEA 只是编辑器,Maven 只是帮你管 jar 包和构建,真正干活的是 JDK。',
          code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, offer!");\n    }\n}\n// main 方法是 JVM 程序入口:public static void main(String[] args) 一个字都不能错'
        },
        {
          id: 'p1-k2', name: '基础语法:类型/流程/数组/方法', lv: '手搓',
          std: '关视频手写九九乘法表 + 冒泡排序',
          intro: '8种基本类型要记住占几个字节(int=4字节,long=8字节,double=8字节,boolean约1位语义),小转大自动、大转小要强转且可能丢精度。流程控制 if/switch/for/while 是所有逻辑的地基。方法重载=同名不同参,编译器按参数列表区分。数组是定长对象,越界抛 ArrayIndexOutOfBoundsException。',
          code: '// 冒泡排序:每轮把最大值"冒"到末尾\nint[] a = {5, 2, 9, 1, 7};\nfor (int i = 0; i < a.length - 1; i++) {\n    for (int j = 0; j < a.length - 1 - i; j++) {\n        if (a[j] > a[j + 1]) {\n            int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;\n        }\n    }\n}'
        },
        {
          id: 'p1-k3', name: '面向对象:封装/继承/多态', lv: '手搓',
          std: 'Animal 抽象类 + Dog/Cat + makeAnimalSpeak 写到肌肉记忆',
          intro: '封装=private 字段 + getter/setter,保护内部数据;继承=extends 复用并扩展父类;多态=父类引用指向子类对象,调用方法时执行的是子类的实现——这是 Spring 里"面向接口编程"的根基。抽象类是"半成品模板"(可以有构造器和成员变量),接口是"行为契约"(单继承多实现)。重写 Override=子类改父类方法(签名相同,加@Override),重载 Overload=同类同名不同参。',
          code: 'abstract class Animal {\n    abstract void speak();          // 抽象方法:只有声明,没有实现\n}\nclass Dog extends Animal {\n    @Override void speak() { System.out.println("汪汪"); }\n}\nclass Cat extends Animal {\n    @Override void speak() { System.out.println("喵"); }\n}\npublic class Demo {\n    static void makeAnimalSpeak(Animal a) { a.speak(); } // 多态:运行时看实际类型\n    public static void main(String[] args) {\n        makeAnimalSpeak(new Dog()); // 汪汪\n        makeAnimalSpeak(new Cat()); // 喵\n    }\n}'
        },
        {
          id: 'p1-k4', name: 'String 与异常处理', lv: '手搓',
          std: '手写自定义异常 DivideByZeroException,调用方 try-catch 住',
          intro: 'String 不可变——每次"修改"其实产生了新对象,所以循环拼接要用 StringBuilder(可变,线程不安全,快)。比较内容永远用 equals,== 比的是引用地址(包装类还有 -128~127 缓存池的坑)。异常分两层:受检异常(Exception 子类,编译器强制处理)和运行时异常(RuntimeException,如空指针/越界,不强制)。finally 无论如何都执行(除非 System.exit),适合放资源关闭。',
          code: 'class DivideByZeroException extends RuntimeException {\n    public DivideByZeroException(String msg) { super(msg); }\n}\nstatic int divide(int a, int b) {\n    if (b == 0) throw new DivideByZeroException("除数不能为0");\n    return a / b;\n}\n// 调用方:\ntry {\n    System.out.println(divide(6, 0));\n} catch (DivideByZeroException e) {\n    System.out.println("捕获:" + e.getMessage());\n}'
        },
        {
          id: 'p1-k5', name: '集合框架:ArrayList 与 HashMap', lv: '手搓',
          std: '手写简化版 HashMap(put/get/resize);讲清容量2的幂/0.75/树化',
          intro: 'ArrayList 底层是数组,查询快、中间增删慢,默认容量10,满了扩容1.5倍;LinkedList 是双向链表,头尾增删快、查询慢。HashMap 底层是数组+链表+红黑树:put 时对 key 的 hashCode 做扰动后按"容量-1与运算"定位桶(容量是2的幂才能用位运算代替取模),冲突挂链表,链表长度≥8且数组≥64才树化;默认容量16、负载因子0.75,元素超过"容量×0.75"就扩容翻倍。重写 equals 必须重写 hashCode,否则两个"相等"对象会落进不同的桶——这是面试最爱问的契约。HashMap 线程不安全,并发场景用 ConcurrentHashMap(Java 8 用 CAS+synchronized 锁单个桶)。',
          code: '// 简化版 HashMap 骨架(阶段1考核要能默写)\nclass MyMap<K, V> {\n    Node<K, V>[] table = new Node[16];\n    static class Node<K, V> { K key; V val; Node<K, V> next; }\n    void put(K key, V val) {\n        int i = index(key);\n        Node<K, V> cur = table[i];\n        while (cur != null) {                 // 遍历链表\n            if (cur.key.equals(key)) { cur.val = val; return; }\n            cur = cur.next;\n        }\n        Node<K, V> n = new Node<>(); n.key = key; n.val = val;\n        n.next = table[i]; table[i] = n;      // 头插\n    }\n    int index(K key) { return key.hashCode() & 15; } // 容量16-1\n}'
        },
        {
          id: 'p1-k6', name: '泛型 / Lambda / Stream', lv: '手搓',
          std: 'Stream 写"过滤18岁→提取名字→收集List",不查资料',
          intro: '泛型是编译期的类型检查(运行时被擦除,List<String> 和 List<Integer> 是同一个类)。Lambda 是函数式接口(只有一个抽象方法)的简写。Stream 把"集合怎么处理"声明出来:filter 过滤 → map 转换 → sorted 排序 → collect 收集,中间操作是惰性的,遇到终结操作才真正执行。Optional 是防空指针的容器,ofNullable + orElse 最常用。',
          code: 'List<String> names = users.stream()\n        .filter(u -> u.getAge() > 18)   // 过滤\n        .map(User::getName)             // 提取名字(方法引用)\n        .sorted()                       // 排序\n        .collect(Collectors.toList());  // 终结:收集成List\n// 一行 = 匿名内部类几十行,这就是 Java 8 的意义'
        },
        {
          id: 'p1-k7', name: '多线程基础', lv: '手搓',
          std: '手写卖票超卖例子,并用 synchronized 修复',
          intro: '线程是进程里的执行单元。三种创建方式:继承 Thread、实现 Runnable(推荐,不占继承位)、实现 Callable + FutureTask(有返回值)。线程安全问题源于"多个线程同时读写共享数据且 i++ 这类操作不是原子的"(读-改-写三步会被插队)。synchronized 保证同一时刻只有一个线程进同步块;线程池七大参数(核心数/最大数/空闲时间/单位/队列/工厂/拒绝策略)要能背出概念——阿里规范禁止用 Executors 快捷方法,因为无界队列会 OOM。volatile 只保证可见性不保证原子性,不能当计数器用。',
          code: 'class TicketWindow {\n    static int tickets = 100;\n    static synchronized void sell() {   // 锁的是 TicketWindow.class\n        if (tickets > 0) System.out.println(\n            Thread.currentThread().getName() + " 卖出第 " + tickets-- + " 张");\n    }\n}\n// 多个线程循环调 sell(),不加 synchronized 会卖出重复票号(超卖)'
        },
        {
          id: 'p1-k8', name: '反射与注解原理', lv: '看懂',
          std: '讲清 @Service 为什么能让 Spring 创建对象(扫描→反射new→放容器)',
          intro: '反射=程序运行时拿到类的信息并操作它:Class 对象三种获取方式(类名.class / 对象.getClass() / Class.forName),再由它拿到 Constructor/Field/Method 并调用。注解本身只是个"标记",自己不干活,靠别人在运行时读取它再决定干什么(元注解 @Target 定贴哪、@Retention 定留多久)。Spring 启动时扫描包路径,发现 @Service 标记的类,就用反射调用构造方法 new 出实例放进容器——理解这一条,Spring 就不再是魔法。',
          code: 'Class<?> c = Class.forName("com.xiao.Dog");\nObject obj = c.getDeclaredConstructor().newInstance(); // 反射 new 对象\njava.lang.reflect.Method m = c.getMethod("speak");\nm.invoke(obj);   // 等价于 ((Dog)obj).speak(),但类名是运行时才知道的\n// Spring 的 @Service 就是:扫描到标记 → 反射 new → 放进一个 Map 容器'
        },
        {
          id: 'p1-k9', name: 'Maven 依赖管理', lv: '手搓',
          std: 'pom.xml 加 Hutool 依赖并写一行代码跑通',
          intro: 'Maven 解决两个痛点:自动下载 jar 包(含依赖的依赖,即依赖传递)和标准化构建(compile/package)。每个依赖用 groupId+artifactId+version 三坐标定位,下载到本地仓库(默认 C:\\Users\\你\\.m2\\repository),删了会自动重新下。常用命令:mvn clean 清空、compile 编译、package 打 jar。scope 控制依赖范围:compile 默认(参与编译运行)、test 只测试用、provided 编译要运行不要(如 Lombok)。',
          code: '<dependency>\n    <groupId>cn.hutool</groupId>\n    <artifactId>hutool-all</artifactId>\n    <version>5.8.25</version>\n</dependency>\n// Java 代码里:\nSystem.out.println(cn.hutool.core.util.StrUtil.isBlank("  ")); // true'
        }
      ]
    },
    {
      id: 'p2', name: '阶段2 · 数据库 MySQL', short: 'MySQL', span: '2026.12中 - 2027.1初 · 2-3周',
      goal: '能写业务查询SQL,读懂项目的库表',
      gates: [
        '10分钟写出10个常用SQL(含JOIN/分页/聚合)',
        '讲清 smart_diagnose_init.sql 里每张表和表间关系'
      ],
      kps: [
        {
          id: 'p2-k1', name: '安装与连接', lv: '手搓',
          std: '独立安装 MySQL8,用 Navicat/DataGrip 连上本地库',
          intro: 'MySQL 默认端口 3306。装完记得把 bin 目录加进 PATH。图形工具(Navicat/DataGrip/免费的 DBeaver)连本地库,别用命令行自虐。一个 MySQL 服务里有多个数据库(database),每个库里有多张表(table),表由列(字段)组成——这就是三层结构。',
          code: 'mysql -uroot -p          # 命令行登录(仅安装时用)\nSHOW DATABASES;          # 看有哪些库\nUSE smart_diagnose;      # 切库'
        },
        {
          id: 'p2-k2', name: 'DDL 建表 / DML 增删改', lv: '手搓',
          std: '不查文档写 CREATE TABLE:主键自增、注释、常用类型',
          intro: 'DDL 管"表结构"(CREATE/ALTER/DROP),DML 管"数据"(INSERT/UPDATE/DELETE)。常用类型:int、varchar(n)(变长字符串)、datetime、text(长文本)、decimal(钱用这个,别用float)。每张表必须有主键,业务表习惯用 id bigint auto_increment 自增主键 + comment 注释。UPDATE/DELETE 一定带 WHERE——不带就是全表灾难。',
          code: 'CREATE TABLE t_user (\n    id       BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT \'主键\',\n    username VARCHAR(50) NOT NULL UNIQUE COMMENT \'用户名\',\n    score    DECIMAL(5,1) DEFAULT 0 COMMENT \'分数\',\n    created  DATETIME DEFAULT CURRENT_TIMESTAMP\n) COMMENT \'用户表\';\nINSERT INTO t_user (username) VALUES (\'xiaoxiao\');\nUPDATE t_user SET score = 95 WHERE id = 1;'
        },
        {
          id: 'p2-k3', name: '单表查询', lv: '手搓',
          std: 'SELECT/WHERE/ORDER BY/LIMIT 全能手写',
          intro: '查询五件套:SELECT 列 FROM 表 WHERE 条件 ORDER BY 排序 LIMIT 分页。WHERE 支持 =、>、IN、BETWEEN、LIKE(LIKE \'a%\' 前缀匹配能走索引,\'%a\' 不能)。分页公式:LIMIT 每页条数 OFFSET (页码-1)×条数。执行顺序不是书写顺序:FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT,理解这个才能解释"为什么 WHERE 里不能用 SELECT 的别名"。',
          code: 'SELECT id, username, score\nFROM t_user\nWHERE score >= 60 AND username LIKE \'x%\'\nORDER BY score DESC\nLIMIT 10 OFFSET 0;   -- 第一页,每页10条'
        },
        {
          id: 'p2-k4', name: '多表 JOIN 与聚合', lv: '手搓',
          std: '手写"查询每个用户的订单总数"',
          intro: '业务数据从来不在一张表。INNER JOIN 只要两边都匹配的行,LEFT JOIN 保留左表全部(右表没匹配填NULL)——"查所有用户及其订单数,没下单的也要出现"就必须 LEFT JOIN。聚合函数 COUNT/SUM/AVG/MAX/MIN 配合 GROUP BY 按组统计,统计前的条件写 WHERE,统计后的过滤写 HAVING(COUNT>2 这种)。',
          code: 'SELECT u.username, COUNT(o.id) AS order_count\nFROM t_user u\nLEFT JOIN t_order o ON o.user_id = u.id\nGROUP BY u.id, u.username\nHAVING COUNT(o.id) > 2\nORDER BY order_count DESC;'
        },
        {
          id: 'p2-k5', name: '子查询', lv: '看懂',
          std: '能看懂 WHERE id IN (SELECT ...) 的嵌套',
          intro: '子查询=查询里套查询:WHERE 里的 IN 子查询、FROM 里的派生表、SELECT 里的标量子查询。能看懂、能改就行,业务里子查询太多层会难读难优化,通常改写成 JOIN。',
          code: 'SELECT * FROM t_user\nWHERE id IN (SELECT user_id FROM t_order WHERE amount > 100);\n-- "下过100元以上订单的用户"'
        },
        {
          id: 'p2-k6', name: '索引与事务', lv: '看懂',
          std: '讲清索引为什么快、什么时候失效;ACID 和四种隔离级别',
          intro: '索引像书的目录,底层是 B+ 树(矮胖多叉,三次IO就能在亿级数据里定位),让查询从全表扫描变成树查找。代价:占空间、拖慢写入。失效场景要背:对索引列用函数/运算、前导模糊 LIKE \'%x\'、不满足最左前缀(联合索引 a,b 只用 b 查)、隐式类型转换。事务保证一组 SQL 要么全成功要么全回滚,四个特性 ACID:原子性/一致性/隔离性/持久性;隔离级别从低到高:读未提交→读已提交→可重复读(MySQL默认)→串行化,分别对应脏读/不可重复读/幻读问题。',
          code: 'CREATE INDEX idx_user_score ON t_user(score);  -- 建索引\nBEGIN;\nUPDATE t_account SET balance = balance - 100 WHERE id = 1;\nUPDATE t_account SET balance = balance + 100 WHERE id = 2;\nCOMMIT;   -- 转账必须是一个事务,中途断电要么都成要么都没发生'
        },
        {
          id: 'p2-k7', name: '库表设计常识', lv: '看懂',
          std: '能看懂项目 SQL 的表关系(一对多/多对多中间表)',
          intro: '一对多:多方存一方的外键(订单表存 user_id);多对多:中间表存两个外键(学生-课程表)。设计三板斧:主键自增id、每列写comment、状态用 tinyint 配注释别用中文varchar。三范式一句话:每列不可再分、每个字段完全依赖主键、没有传递依赖——业务里为了性能偶尔故意冗余,知道即可。',
          code: '-- 多对多:学生选课\nCREATE TABLE t_student_course (\n    student_id BIGINT,\n    course_id  BIGINT,\n    PRIMARY KEY (student_id, course_id)  -- 联合主键防重复选课\n);'
        }
      ]
    },
    {
      id: 'p3', name: '阶段3 · Web 基础', short: 'Web基础', span: '2027.1上 · 约1.5周',
      goal: '讲清"浏览器输入URL到页面显示"全过程',
      gates: [
        '不看资料讲清 URL→DNS→TCP→HTTP→渲染 全过程',
        '打开F12,指着任一请求说清每个字段是什么'
      ],
      kps: [
        {
          id: 'p3-k1', name: 'HTTP 协议', lv: '看懂',
          std: '说出常用方法/状态码/GET与POST区别',
          intro: 'HTTP 是无状态的请求-响应协议。方法语义:GET 查、POST 增、PUT 改、DELETE 删;GET 参数在 URL 上有长度限制,POST 在请求体里,两者都明文,安全性靠 HTTPS。状态码必背:200成功、301/302重定向、400参数错、401未登录、403没权限、404找不到、500服务器内部错误。幂等性=重复执行结果相同(GET/PUT/DELETE 幂等,POST 不幂等)。',
          code: 'GET /api/users/1 HTTP/1.1\nHost: localhost:8080\nContent-Type: application/json\n\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{"code":200,"data":{"id":1}}'
        },
        {
          id: 'p3-k2', name: 'F12 Network 抓包', lv: '手搓',
          std: '指着任一请求说清 Headers/Payload/Preview',
          intro: 'F12 是前后端联调的第一工具:Network 面板看每个请求的 Request Headers(带了什么Cookie/Token)、Payload(发了什么参数)、Response(返回了什么)、Preview(格式化预览)。接口报错先看这里:状态码是多少、参数发对没有、响应说了什么——90%的联调问题不用问人。',
          code: ''
        },
        {
          id: 'p3-k3', name: 'JSON', lv: '手搓',
          std: '手写一个学生的JSON(含数组嵌套)',
          intro: 'JSON 是前后端交换数据的通用语言:键必须双引号,值只能是 字符串/数字/布尔/null/数组/对象。前端不认识 Java 对象,只认识 JSON——后端把对象序列化成 JSON 字符串发出去,前端解析。Spring 里 @RequestBody 收 JSON、@RestController 返回 JSON,背后是 Jackson 在自动转换。',
          code: '{\n  "name": "小肖",\n  "age": 20,\n  "hobbies": ["打代码", "打球"],\n  "school": { "name": "成都东软学院", "city": "成都" }\n}'
        },
        {
          id: 'p3-k4', name: 'RESTful 风格', lv: '看懂',
          std: '看到 GET /users/{id} 秒懂含义',
          intro: 'RESTful 用 URL 表示资源、HTTP 方法表示操作:GET /users 列表、GET /users/1 详情、POST /users 新建、PUT /users/1 修改、DELETE /users/1 删除。URL 里是名词不是动词(别写 /getUserById),操作语义由方法表达。这是行业通用约定,照着做,接口文档都可读性翻倍。',
          code: 'GET    /api/users       # 列表\nPOST   /api/users       # 新建\nPUT    /api/users/1     # 改1号\nDELETE /api/users/1     # 删1号'
        },
        {
          id: 'p3-k5', name: 'Cookie 与 Session', lv: '看懂',
          std: '讲清两者区别和 JSESSIONID 的作用',
          intro: 'HTTP 无状态,登录态需要记忆:Cookie 存在浏览器,每次请求自动带上;Session 存在服务端,靠 Cookie 里的 JSESSIONID 找到"你是谁"。缺点:Session 占服务端内存,集群时要共享(粘性会话或存Redis),所以现在前后端分离项目多用 Token(JWT)——服务端不存,把签名后的用户信息直接发给客户端,见阶段5。',
          code: ''
        },
        {
          id: 'p3-k6', name: 'URL 到页面的全过程', lv: '看懂',
          std: '完整讲一遍 DNS→TCP→HTTP→服务器处理→渲染',
          intro: '标准答案要能脱口而出:浏览器查缓存→DNS 把域名解析成 IP→TCP 三次握手建连接→发 HTTP 请求→服务器(负载均衡→应用)处理→返回 HTTP 响应→浏览器解析 HTML 构建 DOM、加载 CSS/JS、渲染页面。面试问这个问题考的是"你对Web有没有整体图景",照这条链讲就有分。',
          code: ''
        }
      ]
    },
    {
      id: 'p4', name: '阶段4 · Spring Boot + MyBatis-Plus', short: 'SpringBoot', span: '2027.1中 - 2月中 · 寒假4-5周',
      goal: '从零手写一个带登录的CRUD项目',
      gates: [
        '从零创建 Spring Boot 项目(不抄旧项目)',
        '注册+登录+列表三接口,Postman 全部测通',
        '画出一次登录请求从Controller到MySQL的完整链路'
      ],
      kps: [
        {
          id: 'p4-k1', name: 'IoC 控制反转与 DI 依赖注入', lv: '手搓',
          std: '新建 @Service 类并在 Controller 里注入使用',
          intro: '以前对象自己 new,现在对象的创建权交给 Spring 容器(控制反转);要用谁,声明一下就行,容器自动塞进来(依赖注入)。@Component 及其三个语义化马甲 @Service/@Repository/@Controller 标记"这个类归容器管",@Autowired/@Resource 按类型/名字注入。默认单例——整个应用一个实例,所以别在单例 Bean 里存可共享的可变状态。@Resource 是 JDK 的,@Autowired 是 Spring 的,按名字注入时用 @Resource。',
          code: '@Service\npublic class UserService {\n    public String greet(String name) { return "你好," + name; }\n}\n\n@RestController\npublic class UserController {\n    @Autowired               // 容器把 UserService 实例注入进来\n    private UserService userService;\n}'
        },
        {
          id: 'p4-k2', name: 'SpringMVC 与参数接收', lv: '手搓',
          std: '三个参数注解用对:@RequestBody/@RequestParam/@PathVariable',
          intro: 'DispatcherServlet 是总调度:所有请求先到它,再按路由分发给对应方法。@RestController=@Controller+@ResponseBody,返回值自动转JSON。参数三件套必须分清:@RequestBody 接 JSON 请求体(POST对象),@RequestParam 接 URL 问号参数(?page=1),@PathVariable 接路径段(/users/1)。统一返回 Result{code,message,data} 是团队规范,全局异常处理 @RestControllerAdvice 兜底所有报错。',
          code: '@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    @GetMapping("/{id}")                       // GET /api/users/1\n    public Result getById(@PathVariable Long id) { ... }\n\n    @GetMapping                                // GET /api/users?page=1\n    public Result list(@RequestParam(defaultValue = "1") Integer page) { ... }\n\n    @PostMapping                               // POST JSON体\n    public Result add(@RequestBody UserAddDTO dto) { ... }\n}'
        },
        {
          id: 'p4-k3', name: 'MyBatis-Plus 速通CRUD', lv: '手搓',
          std: '10分钟给新表配好完整CRUD接口',
          intro: 'MyBatis 把 SQL 和 Java 方法映射起来;MyBatis-Plus 更进一步:继承 BaseMapper 就自带单表增删改查,一行 SQL 不用写。LambdaQueryWrapper 用方法引用拼条件(类型安全不怕拼错),分页插件配一个拦截器就能用 Page 对象。注意 #{} 预编译占位(防SQL注入)和 ${} 字符串拼接(有注入风险)的区别——面试常问。复杂SQL仍写在 XML 里。',
          code: '@Mapper\npublic interface UserMapper extends BaseMapper<User> {}\n\n// Service 里:\nPage<User> page = userMapper.selectPage(\n    new Page<>(1, 10),\n    new LambdaQueryWrapper<User>()\n        .like(User::getUsername, "xiao")\n        .ge(User::getScore, 60)\n        .orderByDesc(User::getCreated));'
        },
        {
          id: 'p4-k4', name: '三层架构与 DTO/VO', lv: '手搓',
          std: '按三层规范实现一个新接口,不把实体类直接返回给前端',
          intro: 'Controller 只做"接收参数→调Service→包Result",不写业务;Service 写业务逻辑、加事务;Mapper 只碰数据库。对象分三套:Entity 对应表结构,DTO 接收前端参数,VO 返回给前端展示——不把 Entity 直接返回,防止泄露密码字段、防止前端改动牵连表结构。这是所有Java后端项目的通用骨架,必须练到不用想。',
          code: '// 请求流向:JSON → DTO → Service(业务) → Mapper(SQL) → Entity → 转VO → JSON\n@PostMapping("/register")\npublic Result register(@RequestBody RegisterDTO dto) {\n    userService.register(dto);            // Controller 只管转发\n    return Result.ok();\n}\n// Service:判用户名重复→加密密码→插入;Mapper:insert'
        },
        {
          id: 'p4-k5', name: '配置、打包与运行', lv: '手搓',
          std: '改端口连库配置;mvn package 打 jar 并 java -jar 跑起来',
          intro: 'application.yml 是应用的配置中枢:端口、数据库连接、日志级别都在这,格式是"缩进两格的键值对"。多环境用 profile:application-dev.yml 本地开发、application-prod.yml 生产,启动时 --spring.profiles.active=prod 切换。打包:mvn package 产出可执行 jar(内嵌Tomcat),java -jar xxx.jar 就能跑——这就是"部署"的最小形态。',
          code: 'server:\n  port: 8080\nspring:\n  datasource:\n    url: jdbc:mysql://localhost:3306/smart_diagnose\n    username: root\n    password: "你的密码"\n# 启动:java -jar app.jar --spring.profiles.active=prod'
        },
        {
          id: 'p4-k6', name: 'AOP 与声明式事务', lv: '看懂',
          std: '写一个日志切面;说清 @Transactional 什么时候失效',
          intro: 'AOP 把"日志、耗时统计、权限"这类横切逻辑从业务代码里抽出来,通过动态代理在方法前后插入。@Transactional 加在 Service 方法上=声明式事务:方法抛运行时异常自动回滚。失效场景是高频面试题:同类内部自调用(没走代理)、方法非 public、异常被 try-catch 吃掉了——面试官问"事务为什么不生效"就是在问代理原理。',
          code: '@Aspect\n@Component\npublic class LogAspect {\n    @Around("execution(* com.xiao.service..*(..))")\n    public Object time(ProceedingJoinPoint pjp) throws Throwable {\n        long t = System.currentTimeMillis();\n        Object r = pjp.proceed();\n        System.out.println(pjp.getSignature() + " 耗时 " + (System.currentTimeMillis() - t) + "ms");\n        return r;\n    }\n}\n@Transactional\npublic void transfer() { ... }   // 抛RuntimeException自动回滚'
        },
        {
          id: 'p4-k7', name: '前后端联调与跨域', lv: '看懂',
          std: '前端项目跑起来调通自己写的接口,数据上屏',
          intro: '跨域=浏览器阻止"不同源(协议/域名/端口任一不同)"的 AJAX 请求,是浏览器安全策略不是 bug。开发期最常用解法:Vite 配 proxy 代理,让请求"看起来同源"。联调流程:前端 axios 发请求 → 代理转发到后端端口 → 返回 JSON → 页面渲染。你会看 F12 的 Network,联调就死不了。',
          code: '// vite.config.js 里:\nserver: {\n  proxy: {\n    \'/api\': { target: \'http://localhost:8080\', changeOrigin: true }\n  }\n}\n// 前端请求 /api/users → 实际到 http://localhost:8080/api/users'
        }
      ]
    },
    {
      id: 'p5', name: '阶段5 · 吃透 smart-diagnose-web', short: '项目实战', span: '2027.2中 - 3月中 · 3-4周',
      goal: '简历第一个能讲清楚的项目',
      gates: [
        '不看代码画出项目架构图',
        '自己加"对话历史入库+历史记录页"功能且无bug',
        '每个技术选型都能对面试官讲5分钟'
      ],
      kps: [
        {
          id: 'p5-k1', name: '架构图与请求链路', lv: '手搓',
          std: '不看代码画出:前端→Controller→Service→AI→返回 的全链路',
          intro: '把这个 AI 诊断项目当作教材:它是"前端Vue + 后端Spring Boot + 大模型API"的标准前后端分离架构。你要做的是从登录接口开始,一个接口一个接口打断点走通:请求进来进了哪个方法、调了哪个Service、SQL长什么样、AI怎么被调用、响应怎么拼回去。能画出来+能讲出来=简历上这个项目从"AI代写"变成"我的项目"。',
          code: ''
        },
        {
          id: 'p5-k2', name: 'JWT 登录', lv: '看懂',
          std: '讲清 JWT 三段结构、校验流程、和Session的取舍',
          intro: 'JWT=Header.Payload.Signature 三段 Base64:头部写算法,载荷放 userId/过期时间(明文可解,别放敏感信息),签名用服务端密钥防篡改。流程:登录成功→服务端签发token→前端存 localStorage→之后每次请求带 Authorization: Bearer xxx→后端拦截器验签+查过期。优点:服务端无状态、适合集群;缺点:签发后无法主动作废(只能等过期或维护黑名单)。这就是 smart-diagnose-web 的登录方案。',
          code: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImV4cCI6MTc...}\n// 三段:头部.载荷.签名  |  拦截器里:验签→取userId→放行'
        },
        {
          id: 'p5-k3', name: 'Vue3 读改能力', lv: '看懂',
          std: '看懂组件结构,自己加一个页面并调通后端',
          intro: '每个 .vue 文件=模板(template,HTML+指令)+逻辑(script setup)+样式(style)。必认指令:双大括号插值、v-for 循环、v-model 双向绑定、@click 事件;axios 发请求、Element Plus 拼界面。你不需要会写复杂前端,要能看懂 AI 写的页面结构、能照葫芦加一个新页面、能在 F12 里定位"这个按钮调了哪个接口"。',
          code: '<template>\n  <input v-model="keyword" placeholder="输入症状" />\n  <button @click="ask">问AI</button>\n  <p>{{ answer }}</p>\n</template>\n<script setup>\nimport { ref } from \'vue\'\nconst keyword = ref(\'\'), answer = ref(\'\')\nasync function ask() {\n  const res = await axios.post(\'/api/diagnose\', { q: keyword.value })\n  answer.value = res.data.data\n}\n</script>'
        },
        {
          id: 'p5-k4', name: 'AI 接口设计与 SSE 流式', lv: '看懂',
          std: '讲清"后端怎么接大模型、怎么把字一个一个吐给前端"',
          intro: '项目接大模型的标准姿势:后端封装一个 AiService,用 HTTP 客户端调豆包/通义的 OpenAI 风格接口(messages 数组+model+stream参数),拿到响应再转给前端。流式输出用 SSE(Server-Sent Events):后端一边收大模型的token一边往浏览器推,前端 EventSource/Axios 逐段渲染——这就是"打字机效果"的原理。要能讲清楚:为什么不在前端直接调大模型(API Key 会泄露,所以必须经过自己的后端)。',
          code: 'POST /api/chat/stream      (前端)\n  → AiService.call(messages)      (后端,组装系统提示词+历史)\n    → 豆包API stream=true          (大模型)\n  ← SSE: data: {"content":"你"} data: {"content":"好"} ...逐token推回'
        },
        {
          id: 'p5-k5', name: '面试表达:项目怎么讲', lv: '手搓',
          std: 'STAR结构讲项目:背景→职责→技术难点→结果,每个点5分钟',
          intro: '面试官对项目的三连问:这个项目解决什么问题(背景)、你具体做了什么(职责,别说是AI写的)、遇到什么难点怎么解决(深度)。提前准备3个技术点:为什么用JWT不用Session、流式输出怎么实现的、AI提示词怎么设计的;再准备1个"如果重做会改进什么"(比如加RAG减少幻觉)——最后这条最能体现思考深度。',
          code: ''
        }
      ]
    },
    {
      id: 'p6', name: '阶段6 · Python + RAG + Agent', short: 'AI应用', span: '2027.3中 - 4月中 · 3-4周',
      goal: '简历第二个项目:RAG知识库机器人上GitHub',
      gates: [
        '命令行AI聊天机器人跑通(多轮+流式)',
        'RAG机器人:喂5篇PDF答得对,越界问题会说不知道',
        'GitHub仓库README齐全,别人照着能跑'
      ],
      kps: [
        {
          id: 'p6-k1', name: 'Python 基础速成', lv: '手搓',
          std: '列表/字典/切片/函数/类全会用,能写100行脚本',
          intro: '有Java底子学Python极快:没有类型声明、用缩进代替大括号、列表 list 和字典 dict 是两大神器、pip 装 库、函数用 def。别陷进语法细节——你的目标是"能读懂AI生成的Python代码+能写脚本调API",不是考Python证书。爬虫/数据分析跳过。',
          code: 'users = [{"name": "小肖", "age": 20}, {"name": "老王", "age": 17}]\nadults = [u["name"] for u in users if u["age"] >= 18]  # 列表推导式\nprint(adults)   # [\'小肖\']\n\ndef add(a, b=1):        # 默认参数\n    return a + b'
        },
        {
          id: 'p6-k2', name: '调大模型 API', lv: '手搓',
          std: '命令行机器人:多轮对话、流式输出、/clear清空历史',
          intro: '主流大模型都用 OpenAI 风格接口:发一个 messages 数组(role: system=人设/指令, user=用户, assistant=AI回复),模型返回 assistant 消息——多轮对话就是把历史 messages 全部带上再发。temperature 控制随机性(0严谨/1奔放),token 是计费和长度单位(约0.75个汉字)。stream=True 时响应按块到达,逐块打印就是打字机效果。',
          code: 'from openai import OpenAI\nclient = OpenAI(api_key="你的Key", base_url="https://ark.cn-beijing.volces.com/api/v3")\nmessages = [{"role": "system", "content": "你是一个严谨的Java助教"}]\nwhile True:\n    q = input("你: ")\n    if q == "/clear": messages = messages[:1]; continue\n    messages.append({"role": "user", "content": q})\n    r = client.chat.completions.create(model="doubao-seed-1-6", messages=messages)\n    reply = r.choices[0].message.content\n    print("AI:", reply)\n    messages.append({"role": "assistant", "content": reply})  # 记入历史→多轮'
        },
        {
          id: 'p6-k3', name: 'Embedding 与向量库', lv: '看懂',
          std: '讲清:文本怎么变成向量、为什么相似语义距离近',
          intro: 'Embedding 模型把一段文字变成一个几百维的数字向量,语义相近的文本向量距离就近("怎么重学Java"和"Java入门路线"会靠在一起)。向量库(Chroma/Milvus)存这些向量并支持"找最近邻"——这就是语义搜索,关键词搜索搜"重启"找不到"重新启动",向量搜索可以。理解了这对概念,RAG 就只剩流程拼装。',
          code: 'emb1 = client.embeddings.create(model="embedding-v3", input=["如何重学Java"])\nemb2 = client.embeddings.create(model="embedding-v3", input=["Java入门学习路线"])\n# 两个向量余弦相似度很高 → 检索时能互相命中'
        },
        {
          id: 'p6-k4', name: 'RAG 全流程', lv: '手搓',
          std: '亲手走一遍:切分→向量化→入库→检索→拼Prompt→生成',
          intro: 'RAG=检索增强生成,治大模型"不知道你的私有资料就瞎编(幻觉)"。五步:①文档切分(按段落/500字块)②每块算 Embedding 存向量库 ③用户提问时把问题也向量化,取最相似的 top-k 块 ④把检索到的块塞进 Prompt("根据以下资料回答...")⑤大模型基于资料作答。检索不准就调:块大小、top-k数量、加元数据过滤。项目标配:LangChain 或裸写+FastAPI 包接口。',
          code: '# RAG 核心伪代码(10行看懂本质)\nchunks = split(pdf_text, size=500)\nstore.add([embed(c) for c in chunks])          # 入库(一次性)\nq = embed(user_question)\nhits = store.search(q, top_k=3)                # 检索最相关的3块\nprompt = f"根据以下资料回答,没有依据就说不知道:\\n" + "\\n".join(hits)\nanswer = llm.chat(prompt + user_question)      # 有据可依,幻觉大减'
        },
        {
          id: 'p6-k5', name: 'Agent 与工具调用', lv: '手搓',
          std: '做一个会调工具的bot(查库/算数),讲清调用循环',
          intro: 'Agent=让大模型"会用工具":你告诉模型有哪些工具(名字+参数说明),模型决定"我需要调哪个工具、参数是什么",你的代码真正执行工具把结果喂回去,模型基于结果继续回答或再调下一个工具——这个"模型→工具→结果→模型"的循环就是 Agent 的本质,ReAct 是它的经典模式(思考→行动→观察)。MCP 是标准化的工具接入协议,知道概念即可。多Agent框架(LangGraph/AutoGen)实习前不用深学。',
          code: 'tools = [{"type": "function", "function": {\n    "name": "query_score",\n    "description": "查询某学生的成绩",\n    "parameters": {"type": "object", "properties": {"name": {"type": "string"}}}\n}}]\n# 模型返回 tool_calls → 你执行 query_score("小肖") → 把结果作为 role=tool 消息发回 → 模型给出最终回答'
        }
      ]
    },
    {
      id: 'p7', name: '阶段7 · 面试冲刺与海投', short: '面试冲刺', span: '2027.4 - 6月',
      goal: '八股脱稿、简历定稿、拿到暑期实习offer',
      gates: [
        '简历v2定稿(每条=做了什么+用了什么+结果)',
        '连续3周每周投出50+',
        '每场面试后记录3个答不上的点并补掉'
      ],
      kps: [
        {
          id: 'p7-k1', name: 'JVM 八股', lv: '看懂',
          std: '讲清内存区域划分、GC大致过程、类加载时机',
          intro: '面试必考三件套:①运行时内存区域=堆(对象,GC主战场)+虚拟机栈(方法栈帧)+方法区(类信息/常量)+程序计数器;②GC=标记垃圾(可达性分析)再回收,分代:新生代(复制算法,Eden+Survivor)老年代(标记整理),能讲出"对象优先在Eden出生,熬过15次GC进老年代"就超过大部分人;③类加载=加载→验证→准备→解析→初始化,双亲委派一句话:先问爹要不要加载,防止核心类被篡改。知道这些概念即可,实习岗不会让你背调优参数。',
          code: ''
        },
        {
          id: 'p7-k2', name: '并发深化', lv: '看懂',
          std: '背出线程池七参数+四种拒绝策略;synchronized vs Lock 三条区别',
          intro: '线程池参数顺序必背:corePoolSize、maximumPoolSize、keepAliveTime、unit、workQueue、threadFactory、handler;提交任务流程:核心线程→队列→非核心线程→拒绝策略(AbortPolicy抛异常/CallerRunsPolicy调用者执行/Discard丢弃/DiscardOldest丢最旧)。synchronized 是JVM关键字自动释放,Lock 是API手动 lock/unlock(可中断、可超时、可公平)。CAS=比较并交换的乐观锁思路,AtomicInteger 底层就是它。',
          code: 'new ThreadPoolExecutor(2, 5, 60, TimeUnit.SECONDS,\n    new ArrayBlockingQueue<>(10),\n    new ThreadPoolExecutor.CallerRunsPolicy());  // 手动new,不用Executors'
        },
        {
          id: 'p7-k3', name: 'MySQL 深化', lv: '看懂',
          std: '会用 EXPLAIN 看执行计划;说出三种索引失效场景',
          intro: '慢SQL排查套路:EXPLAIN 看执行计划——type 列(ALL全表扫描最差/range/ref/const较好)、key 列(实际用了哪个索引)、rows(预估扫描行数)。三种经典失效:索引列上用函数或运算、LIKE \'%xx\' 前导模糊、联合索引不满足最左前缀。另外知道:连接池(HikariCP)是为了复用连接避免每次握手;大表分页 LIMIT 100000,10 很慢(要扫过前10万条),用"where id > 上次最大id"代替。',
          code: 'EXPLAIN SELECT * FROM t_user WHERE score > 60;\n-- type=ALL → 全表扫描;给 score 建索引后变 range'
        },
        {
          id: 'p7-k4', name: 'Redis', lv: '看懂',
          std: '说出五种类型的使用场景;缓存穿透/击穿/雪崩各一句话',
          intro: 'Redis 是内存键值数据库,单线程+内存操作所以快,用来做缓存(先查Redis没有再查MySQL并回填)、分布式锁、排行榜。五种类型对场景:string 缓存对象/计数器、list 消息队列、hash 对象字段、set 去重/共同好友、zset 排行榜。三连背:穿透=查不存在的key打穿到库(缓存空值/布隆过滤器);击穿=热点key过期瞬间大量请求压库(互斥锁/逻辑过期);雪崩=大量key同时过期(过期时间加随机)。项目里给AI对话历史加个Redis缓存,面试就有得聊。',
          code: 'ValueOperations<String, String> ops = redisTemplate.opsForValue();\nString cache = ops.get("user:1");\nif (cache == null) {\n    cache = userMapper.selectById(1).toString();\n    ops.set("user:1", cache, 30, TimeUnit.MINUTES);  // 回填+过期\n}'
        },
        {
          id: 'p7-k5', name: '算法:LeetCode 简单题', lv: '手搓',
          std: '数组/字符串/哈希类简单题,每天1题,累计100题',
          intro: '目标岗位是成都中小厂,算法考的是简单题+思路表达,不是竞赛。三类吃透:哈希表(两数之和——用空间换时间的思路)、双指针(反转数组/判断回文)、栈与队列(括号匹配)。每题流程:先说暴力解→再说优化思路→再写代码,面试时这个表达顺序本身就是加分项。从2027年1月起每天1题,4月海投前累计约100题足够。',
          code: '// 两数之和(哈希表一遍过)\npublic int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> seen = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        if (seen.containsKey(target - nums[i]))\n            return new int[]{seen.get(target - nums[i]), i};\n        seen.put(nums[i], i);\n    }\n    return new int[]{};\n}'
        },
        {
          id: 'p7-k6', name: '简历与投递', lv: '手搓',
          std: '简历v2:每条经历=做了什么+用了什么+量化结果,无"精通"',
          intro: '简历每一条都按"动词开头+技术手段+结果"写:如"基于Spring Boot+Vue3实现多轮对话AI诊断应用,对接豆包API实现SSE流式输出,首字延迟控制在1s内"。不写精通(最多"熟悉"),写了的每条都要能展开讲5分钟。投递:BOSS直聘(主)+实习僧+牛客;话术模板备好;每周固定复盘:投了多少、回复多少、面试挂在哪,数据会让你不焦虑。背调话别编,民办本科+真实项目+能讲清楚,就是你的最优解。',
          code: ''
        }
      ]
    }
  ]
}
