# AWS Certified Cloud Practitioner (CLF-C02)
## High-Yield Reviewer & Cheat Sheet

> Organized around the four official CLF-C02 exam domains and the in-scope AWS services listed in `Cloud-Practitioner-Exam-Content.txt`.
>
> Goal: recognize exam keywords, distinguish similar AWS services, identify responsibility boundaries, and eliminate distractors in scenario-based questions.

---

# Domain 1 — Cloud Concepts

## 1. Core Concept & Exam Keywords Summary

### What is cloud computing?

Cloud computing is the on-demand delivery of IT resources over the internet, with pay-as-you-go pricing and no need to own and maintain physical infrastructure.

| Concept | Simple explanation | Exam trigger words |
|---|---|---|
| On-demand self-service | Provision resources whenever needed | Provision instantly, no human interaction |
| Broad network access | Services accessible over a network | Access from anywhere, internet-connected devices |
| Resource pooling | Shared AWS infrastructure serves multiple customers | Multi-tenant, shared resources |
| Rapid elasticity | Scale up or down quickly | Automatically adjust, changing demand |
| Measured service | Usage is monitored and billed | Pay for what you use, consumption-based |

### Value proposition of AWS Cloud

| Benefit | Meaning | Exam keywords |
|---|---|---|
| Trade CapEx for OpEx | Avoid large upfront infrastructure purchases | No upfront investment |
| Economies of scale | AWS purchases infrastructure at massive scale | Lower variable costs |
| Stop guessing capacity | Provision what you need | Right-sized resources |
| Increase speed and agility | Deploy in minutes | Rapid provisioning |
| Go global in minutes | Deploy worldwide | Global reach, low latency |
| Benefit from massive economies | Focus on business instead of data centers | Reduced operational overhead |

**CapEx vs. OpEx**
- **CapEx (Capital Expenditure):** Purchasing physical servers, hardware, and data center infrastructure.
- **OpEx (Operational Expenditure):** Paying for resources as you consume them.

### AWS Well-Architected Framework

Remember the **6 pillars**:

| Pillar | Core idea | Exam trigger |
|---|---|---|
| **1. Operational Excellence** | Run and monitor systems, continuously improve processes, automate changes | Operational processes, automation |
| **2. Security** | Protect data, systems, and assets; manage access and detect threats | Access control, protection |
| **3. Reliability** | Recover from failures, maintain availability, handle changing demand | Resilience, fault recovery |
| **4. Performance Efficiency** | Use computing resources efficiently and adopt suitable technologies | Resource selection, performance |
| **5. Cost Optimization** | Avoid unnecessary costs, choose appropriate pricing models | Cost-effective resources, eliminate waste |
| **6. Sustainability** | Minimize environmental impact and resource waste | Energy efficiency, sustainability |

**Exam trap:** Sustainability is the sixth pillar. It is not Reliability or Performance Efficiency.

### Cloud adoption & migration

| Term | What it means |
|---|---|
| AWS Cloud Adoption Framework (CAF) | Guidance for organizations to plan cloud adoption across business and technical capabilities |
| AWS Professional Services | AWS experts help customers accelerate cloud adoption |
| AWS Partners / APN | Third-party consulting, technology, and implementation partners |
| AWS Migration Hub | Central place to track migration progress |
| AWS Application Discovery Service | Collects information about on-premises servers |
| AWS Application Migration Service (MGN) | Lift-and-shift server migration |
| AWS Database Migration Service (DMS) | Migrates databases with minimal downtime |
| AWS Schema Conversion Tool (SCT) | Converts database schemas between database engines |
| Migration Evaluator | Helps assess costs and plan migration |

### The 6 Rs of migration

| Strategy | Description |
|---|---|
| **Rehost** | Lift and shift; move without major changes |
| **Replatform** | Make limited optimizations during migration |
| **Refactor / Re-architect** | Redesign to use cloud-native capabilities |
| **Repurchase** | Move to a different product (e.g., SaaS) |
| **Retire** | Remove applications no longer needed |
| **Retain** | Keep applications on-premises for now |

**Trigger words:** Lift-and-shift → Rehost. Cloud-native redesign → Refactor. Move to SaaS → Repurchase.

### Cloud economics

- AWS reduces the need to maintain physical data centers.
- Customers pay for usage instead of purchasing excess capacity.
- AWS offers flexible capacity and pricing.
- Managed services can reduce operational workload.
- Cloud benefits include lower total cost of ownership (TCO), agility, and faster innovation.

## 2. Comparison & Distinctions

### Cloud deployment models

| Model | Description | Exam clue |
|---|---|---|
| Cloud | Entirely in the cloud | All infrastructure on AWS |
| Hybrid | Cloud + on-premises | Keep some systems locally |
| On-premises / Private cloud | Infrastructure dedicated to an organization | Local data center, full control |

### AWS global infrastructure

| Component | Purpose | Exam clue |
|---|---|---|
| **Region** | Separate geographic area with multiple AZs | Data residency, geographic separation |
| **Availability Zone (AZ)** | Isolated location(s) within a Region | Fault isolation, high availability |
| **Edge Location** | Caches content close to end users | Low latency, content delivery |
| **Local Zone** | AWS infrastructure closer to major cities | Low-latency applications requiring proximity |
| **Wavelength** | AWS infrastructure embedded in telecom 5G networks | Ultra-low latency mobile applications |

**Remember:** A Region contains multiple Availability Zones. An AZ consists of one or more discrete data centers. Edge locations are not AZs.

### High availability vs. fault tolerance vs. disaster recovery

| Concept | Meaning |
|---|---|
| High availability (HA) | Minimize downtime through redundancy |
| Fault tolerance | Continue operating even when a component fails |
| Disaster recovery (DR) | Recover systems and data after a major disruption |
| Scalability | Increase or decrease capacity to handle demand |
| Elasticity | Automatically match capacity to changing demand |

**Multi-AZ** = high availability within a Region.  
**Multi-Region** = geographic resilience, disaster recovery, and regional independence.

## 3. AWS Shared Responsibility Model & Security Alignment

Cloud Concepts primarily cover AWS architecture and cloud benefits, but the shared responsibility model is a fundamental concept across all domains.

- AWS is responsible for **Security OF the Cloud**: physical facilities, hardware, networking infrastructure, and underlying managed infrastructure.
- Customers are responsible for **Security IN the Cloud**: data, identities, permissions, configurations, and workload security according to the service used.

## 4. Billing, Pricing & Support Impact

### Compute purchasing models — memorize these

| Model | Best for | Cost characteristic |
|---|---|---|
| On-Demand | Unpredictable workloads | Pay for usage, no long-term commitment |
| Reserved Instances | Predictable EC2 usage | Commitment-based discount |
| Savings Plans | Flexible compute usage | Lower price for committed hourly spend |
| Spot Instances | Fault-tolerant, flexible workloads | Deep discounts, can be interrupted |
| Dedicated Hosts | Licensing and physical server control | Dedicated physical server |
| Dedicated Instances | Hardware isolation | Hardware dedicated to one customer |
| Capacity Reservations | Need guaranteed EC2 capacity | Reserve capacity; not automatically a discount |

**Key distinction:** A Capacity Reservation guarantees capacity in a specified AZ; it does not automatically provide a lower price.

### Cost management services

| Service | Purpose |
|---|---|
| AWS Pricing Calculator | Estimate expected costs before deployment |
| AWS Cost Explorer | Analyze historical spending and usage |
| AWS Budgets | Set thresholds and alerts for spending, usage, or coverage |
| AWS Cost and Usage Reports (CUR) | Detailed billing and usage data |
| Cost allocation tags | Categorize costs by project, team, or department |
| AWS Organizations | Consolidated billing across accounts; volume discount benefits may apply |

---

## 5. Common Exam Traps & Scenario Breakdown

### Scenario 1: A company wants to deploy globally without building data centers.

**Correct:** AWS Cloud

**Why?** AWS provides global infrastructure and on-demand services.

**Distractors:**
- On-premises: requires the company to maintain its own infrastructure.
- Hybrid: implies a combination of on-premises and cloud infrastructure.

### Scenario 2: An application must remain available if one data center fails.

**Correct:** Deploy across multiple Availability Zones.

**Why?** AZs provide fault isolation within the same Region.

**Distractors:**
- Edge locations: designed primarily for content delivery and low latency.
- Multiple Regions: may be appropriate for disaster recovery, but not necessarily required for a single AZ failure.

### Scenario 3: A workload can tolerate interruptions and the company wants the lowest EC2 cost.

**Correct:** Spot Instances.

**Why?** Spot uses spare AWS capacity at significant discounts but can be interrupted.

**Distractors:**
- On-Demand: flexible but usually more expensive.
- Reserved Instances: intended for committed, predictable usage.

---

# Domain 2 — Security & Compliance

## 1. Core Concept & Exam Keywords Summary

### AWS Shared Responsibility Model

| AWS responsibility — Security OF the Cloud | Customer responsibility — Security IN the Cloud |
|---|---|
| Physical data centers | Customer data |
| Hardware and host infrastructure | IAM users, roles, permissions |
| AWS global infrastructure | Operating system updates on EC2 |
| Underlying networking | Application security |
| Virtualization infrastructure | Firewall configuration |
| Managed service infrastructure | Encryption and data classification |

### Responsibility varies by service

| Service type | Customer responsibility |
|---|---|
| **EC2 (IaaS)** | OS, patches, applications, security groups, data |
| **RDS (managed database)** | Data, access, configuration; AWS manages underlying OS and infrastructure |
| **Lambda (serverless)** | Code, permissions, data; AWS manages infrastructure and runtime platform |

**Exam trigger:** “Who patches the operating system?”
- EC2 → Customer.
- RDS → AWS manages the underlying infrastructure and OS.
- Lambda → AWS manages the server infrastructure and runtime environment.

### Identity and Access Management (IAM)

IAM controls **who can access AWS and what they can do**.

| IAM component | Function |
|---|---|
| IAM User | Identity for an individual or application; credentials can be long-term |
| IAM Group | Collection of users; permissions can be assigned collectively |
| IAM Role | Assumable identity with temporary credentials |
| IAM Policy | JSON document defining allowed or denied actions |
| MFA | Additional authentication factor |
| IAM Identity Center | Centralized workforce access to multiple AWS accounts and applications |

### Principle of Least Privilege

Grant only the minimum permissions required to complete a task.

**Exam keywords:** Minimum access, restricted permissions, least privilege, temporary credentials.

### Protecting the AWS root user

The root user has unrestricted access to the account. AWS recommends:
- Enable MFA.
- Do not use root for routine operations.
- Do not create root access keys.
- Use IAM identities or roles for daily administration.
- Protect root credentials carefully.

**Exam trap:** Root is not the same as an IAM administrator. An IAM administrator can have broad permissions but is not inherently the root user.

### AWS security services — exam keyword map

| Service | Main function | Trigger words |
|---|---|---|
| **IAM** | Access and permissions | Who can access what |
| **IAM Identity Center** | Workforce SSO across accounts | Centralized access, single sign-on |
| **GuardDuty** | Threat detection | Suspicious activity, malicious IPs |
| **Security Hub** | Central security posture | Consolidated security findings |
| **Inspector** | Vulnerability management | Software vulnerabilities, EC2/ECR/Lambda |
| **Macie** | Sensitive data discovery | PII, sensitive data in S3 |
| **AWS Shield** | DDoS protection | Distributed denial-of-service |
| **AWS WAF** | Web application firewall | SQL injection, cross-site scripting, HTTP filtering |
| **AWS KMS** | Encryption key management | Create and manage encryption keys |
| **Secrets Manager** | Protect and rotate secrets | Database credentials, API keys |
| **ACM** | SSL/TLS certificates | HTTPS certificates |
| **CloudHSM** | Dedicated hardware security module | Customer-controlled cryptographic hardware |
| **Firewall Manager** | Centrally manage firewall rules | Security policies across accounts |
| **AWS Artifact** | Compliance reports and agreements | Audit documentation, SOC reports |
| **AWS RAM** | Share resources between accounts | Share VPC subnets, resources across accounts |
| **Amazon Cognito** | Application user authentication | Sign-up, sign-in for web/mobile apps |
| **AWS Directory Service** | Managed directory services | Microsoft Active Directory integration |

### Security logging & monitoring

| Service | What it records or monitors |
|---|---|
| **AWS CloudTrail** | API activity and account actions |
| **Amazon CloudWatch** | Metrics, logs, alarms, dashboards |
| **AWS Config** | Resource configurations and configuration changes |
| **VPC Flow Logs** | Network traffic metadata for VPC interfaces |
| **Amazon Detective** | Investigates security findings and relationships |

**Remember:**
- CloudTrail = **Who did what?**
- CloudWatch = **How is the system performing?**
- Config = **What changed in the resource configuration?**
- Flow Logs = **What network traffic was observed?**
- GuardDuty = **Is there suspicious activity?**

### AWS compliance & governance

AWS maintains compliance certifications and provides evidence of compliance. Customers remain responsible for compliance of their own workloads and data.

Useful resources:
- **AWS Artifact:** Access compliance reports and agreements.
- **AWS Compliance:** Learn about certifications and regulatory programs.
- **AWS Prescriptive Guidance:** Best practices and implementation guidance.
- **AWS Knowledge Center:** Technical questions and answers.
- **AWS re:Post:** Community knowledge and technical discussions.
- **AWS Security Blog:** Security guidance, updates, and best practices.

## 2. Comparison & Distinctions

### Security services frequently confused

| If the question asks… | Think of… |
|---|---|
| Detect suspicious API calls or unusual behavior | GuardDuty |
| Central dashboard of security findings | Security Hub |
| Find software vulnerabilities | Inspector |
| Discover sensitive information in S3 | Macie |
| Protect from DDoS attacks | Shield |
| Filter malicious web requests | WAF |
| Encrypt data and manage encryption keys | KMS |
| Store and rotate credentials | Secrets Manager |
| Record API calls | CloudTrail |
| Monitor performance and alarms | CloudWatch |
| Audit configuration compliance | AWS Config |

### CloudTrail vs. CloudWatch vs. AWS Config

| Feature | CloudTrail | CloudWatch | AWS Config |
|---|---|---|---|
| Primary focus | API activity | Monitoring | Configuration history |
| Tracks | Who did what | Metrics and logs | Resource configuration |
| Example | Who deleted an S3 bucket? | Why is CPU usage high? | Was public access enabled? |
| Exam trigger | API audit trail | Alarm, metrics | Compliance, configuration changes |

### Shield vs. WAF

| AWS Shield | AWS WAF |
|---|---|
| DDoS protection | Web application traffic filtering |
| Protects against volumetric and network attacks | Blocks malicious HTTP/HTTPS requests |
| Standard protection included automatically for AWS customers | Customizable rules and web ACLs |

### KMS vs. Secrets Manager vs. ACM

| Service | Use |
|---|---|
| KMS | Manage cryptographic keys |
| Secrets Manager | Store, retrieve, and rotate secrets |
| ACM | Provision and manage SSL/TLS certificates |

## 3. AWS Shared Responsibility Model & Security Alignment

### Security OF the Cloud
AWS manages:
- Physical security of facilities.
- Hardware, storage, and physical networking.
- Hypervisor and virtualization layer.
- Managed infrastructure supporting AWS services.

### Security IN the Cloud
Customers manage:
- User access and permissions.
- Data protection and encryption choices.
- Network access rules and configurations.
- Application security.
- Guest OS patches for EC2.
- Compliance of customer workloads.

**Exam rule:** The more managed the service, the less infrastructure the customer manages — but customer data and access permissions remain their responsibility.

## 4. Billing, Pricing & Support Impact

- AWS security services can have service-specific usage charges.
- CloudTrail has management event logging features included at a basic level; additional event types and copies can incur charges.
- CloudWatch charges depend on metrics, log ingestion, storage, and alarms.
- GuardDuty, Macie, Inspector, and Security Hub pricing can depend on analyzed data, resources, or usage.
- AWS Artifact provides compliance documentation; it is not a paid third-party auditing service that customers must hire just to access AWS reports.
- AWS Shield Standard provides baseline DDoS protection at no additional charge; Shield Advanced is a paid offering with additional protection and support.

## 5. Common Exam Traps & Scenario Breakdown

### Scenario 1: An employee accidentally deleted an AWS resource. The company wants to identify who performed the action.

**Correct:** AWS CloudTrail

**Why?** CloudTrail records API activity, including the identity and action associated with events.

**Distractors:**
- CloudWatch: monitors metrics and logs; not the primary API audit trail.
- AWS Config: tracks resource configurations and changes, not the primary source of identity-based API event history.

### Scenario 2: A company wants to automatically detect sensitive information such as credit card numbers in S3.

**Correct:** Amazon Macie

**Why?** Macie discovers and helps protect sensitive data in Amazon S3.

**Distractors:**
- GuardDuty: detects threats and suspicious activity.
- Inspector: identifies software vulnerabilities.

### Scenario 3: A company needs employees to sign in once and access multiple AWS accounts.

**Correct:** AWS IAM Identity Center

**Why?** It provides centralized workforce access and single sign-on.

**Distractors:**
- IAM users: individual AWS identities, not the best centralized workforce SSO solution.
- Amazon Cognito: designed primarily for customer-facing application authentication.

---

# Domain 3 — Cloud Technology & Services

This is the **largest domain** in the provided outline. Focus on service identification: AWS often describes a business requirement, and you need to identify the service that best matches it.

## 1. Core Concept & Exam Keywords Summary

### Ways to provision and operate AWS

| Method | Description | Trigger words |
|---|---|---|
| AWS Management Console | Browser-based graphical interface | GUI, point-and-click |
| AWS CLI | Command-line management | Terminal, scripts, automation |
| AWS SDKs | Programmatic access through code | Python, JavaScript, application integration |
| AWS CloudFormation | Infrastructure as code | Templates, repeatable deployment |
| AWS Elastic Beanstalk | Deploy and manage applications | Upload code, managed deployment |
| AWS Systems Manager | Central operational management | Manage fleets, patch, automate |
| AWS Service Catalog | Approved products and configurations | Standardized self-service provisioning |

### Compute services

| Service | What it does | Exam trigger |
|---|---|---|
| **Amazon EC2** | Virtual servers in AWS | Full OS control, virtual machines |
| **AWS Lambda** | Serverless code execution | Run code without managing servers, event-driven |
| **AWS Elastic Beanstalk** | Managed application deployment | Deploy code without managing infrastructure directly |
| **Amazon Lightsail** | Simplified VPS and application hosting | Predictable pricing, easy setup |
| **AWS Batch** | Batch job scheduling | Batch processing, queued jobs |
| **AWS Outposts** | AWS infrastructure on-premises | AWS services in local data center |
| **AWS Fargate** | Serverless compute for containers | Run containers without managing servers |
| **Amazon ECS** | AWS container orchestration | Manage Docker containers |
| **Amazon EKS** | Managed Kubernetes | Kubernetes clusters |
| **Amazon ECR** | Container image registry | Store container images |

### EC2 instance families

| Family | Optimized for | Keywords |
|---|---|---|
| General purpose (T, M) | Balanced resources | Web servers, development |
| Compute optimized (C) | CPU-intensive tasks | High-performance computing |
| Memory optimized (R, X) | Large memory workloads | In-memory databases |
| Storage optimized (I, D) | High disk throughput / IOPS | Data-intensive applications |
| Accelerated computing (P, G) | GPUs and specialized accelerators | ML, graphics, video processing |

### AWS database services

| Service | Type / purpose | Exam trigger |
|---|---|---|
| **Amazon RDS** | Managed relational database | SQL, managed database |
| **Amazon Aurora** | AWS relational database compatible with MySQL/PostgreSQL | High performance, cloud-native relational |
| **Amazon DynamoDB** | Serverless NoSQL key-value/document database | Millisecond latency, massive scale |
| **Amazon ElastiCache** | In-memory caching | Redis/Valkey, reduce database load |
| **Amazon DocumentDB** | Managed document database compatible with MongoDB APIs | JSON-like documents |
| **Amazon Neptune** | Graph database | Relationships, social networks |
| **Amazon Redshift** | Data warehouse | Analytics, SQL over large datasets |

### Storage services

| Service | Storage type | Exam trigger |
|---|---|---|
| **Amazon S3** | Object storage | Files, backups, static website hosting |
| **Amazon EBS** | Block storage | Persistent disk for EC2 |
| **Amazon EFS** | Managed elastic file storage | Shared file system for multiple Linux EC2 instances |
| **Amazon FSx** | Managed file systems | Windows File Server, Lustre, NetApp, OpenZFS |
| **S3 Glacier** | Archival object storage classes | Long-term archives, infrequent retrieval |
| **AWS Storage Gateway** | Hybrid storage integration | Connect on-premises environments to AWS storage |
| **AWS Backup** | Centralized backup management | Manage backups across AWS services |
| **AWS Elastic Disaster Recovery** | Disaster recovery | Recover on-premises or cloud workloads |

### Networking & content delivery

| Service | Purpose | Trigger words |
|---|---|---|
| **Amazon VPC** | Isolated virtual network | Private network, IP ranges, subnets |
| **Amazon Route 53** | DNS and domain registration | Domain name resolution, routing policies |
| **Amazon CloudFront** | Content delivery network (CDN) | Cache content, reduce latency globally |
| **AWS Direct Connect** | Dedicated private connection to AWS | Consistent network performance, dedicated connectivity |
| **AWS VPN** | Encrypted connection over internet | Secure tunnel |
| **AWS Site-to-Site VPN** | Connect on-premises network to VPC | Corporate network connectivity |
| **AWS Client VPN** | Connect individual users to AWS/on-premises networks | Remote employee access |
| **AWS Transit Gateway** | Connect multiple VPCs and networks | Centralized network hub |
| **AWS PrivateLink** | Private access to supported services | Access without public internet |
| **AWS Global Accelerator** | Improve global application availability/performance | Static anycast IPs, optimize network routing |
| **Amazon API Gateway** | Create, publish, secure, and monitor APIs | REST/HTTP APIs, API endpoints |

### Analytics services

| Service | Purpose | Exam trigger |
|---|---|---|
| **Amazon Athena** | Query data in S3 using SQL | Serverless SQL, no infrastructure |
| **Amazon EMR** | Managed big-data processing | Hadoop, Spark |
| **AWS Glue** | Serverless data integration and ETL | Discover, prepare, transform data |
| **Amazon Kinesis** | Streaming data ingestion and processing | Real-time streaming |
| **Amazon OpenSearch Service** | Search, log analytics, dashboards | Search engine, log analysis |
| **Amazon Quick** | Business intelligence and visualization | Interactive dashboards, BI |
| **Amazon Redshift** | Cloud data warehouse | Structured analytics, SQL |

### AI / Machine Learning services

| Service | Function | Exam trigger |
|---|---|---|
| **Amazon SageMaker AI** | Build, train, and deploy ML models | Custom ML development |
| **Amazon Rekognition** | Image and video analysis | Detect objects, faces, content |
| **Amazon Textract** | Extract text and structured data from documents | OCR, scanned forms |
| **Amazon Transcribe** | Speech-to-text | Audio transcription |
| **Amazon Polly** | Text-to-speech | Convert text into natural speech |
| **Amazon Translate** | Machine translation | Translate languages |
| **Amazon Comprehend** | Natural language processing | Sentiment, entities, key phrases |
| **Amazon Lex** | Conversational bots | Chatbots, voice assistants |
| **Amazon Q** | AI-powered assistant for work and development | Generative AI assistance |

### Application integration

| Service | Purpose | Trigger words |
|---|---|---|
| **Amazon SQS** | Message queue | Decouple components, buffer messages |
| **Amazon SNS** | Pub/sub notifications | Push notifications, fan-out |
| **Amazon EventBridge** | Event bus and event routing | Event-driven architecture, react to events |
| **AWS Step Functions** | Workflow orchestration | Coordinate multiple steps/services |

### Business applications

| Service | Purpose |
|---|---|
| **Amazon Connect** | Cloud contact center |
| **Amazon SES** | Scalable email sending service |

### Developer tools

| Service | Purpose | Trigger |
|---|---|---|
| **AWS CodeBuild** | Build and test source code | Continuous integration |
| **AWS CodePipeline** | Automate software release pipelines | Continuous delivery |
| **AWS X-Ray** | Trace requests through distributed applications | Troubleshoot latency, distributed tracing |

### End-user computing

| Service | Purpose | Trigger |
|---|---|---|
| **Amazon WorkSpaces** | Managed virtual desktops | Cloud desktop, persistent desktop |
| **Amazon AppStream 2.0** | Stream desktop applications | Application streaming, browser access |
| **Amazon WorkSpaces Secure Browser** | Secure browser-based access | Isolated web browsing |

### Frontend & IoT

| Service | Purpose | Trigger |
|---|---|---|
| **AWS Amplify** | Build and deploy web/mobile apps | Frontend hosting, full-stack development |
| **AWS IoT Core** | Connect and manage IoT devices | Device messaging, MQTT, connected sensors |

## 2. Comparison & Distinctions

### S3 vs. EBS vs. EFS vs. FSx

| Feature | S3 | EBS | EFS | FSx |
|---|---|---|---|---|
| Storage type | Object | Block | File | File |
| Access | API / HTTP | Attached to EC2 | Shared file system | Managed specialized file systems |
| Sharing | Many clients | Usually attached to one EC2 at a time (except specific configurations) | Multiple instances | Depends on file system |
| Use case | Backups, media, static content | OS disks, databases | Shared Linux file storage | Windows, HPC, enterprise workloads |
| Exam clue | Store objects | EC2 disk | Shared scalable file storage | Specialized file system |

### RDS vs. DynamoDB vs. Redshift

| Feature | RDS / Aurora | DynamoDB | Redshift |
|---|---|---|---|
| Type | Relational SQL | NoSQL | Data warehouse |
| Data structure | Tables, rows | Key-value/document | Analytical tables |
| Use | Transactional apps | High-scale low-latency applications | Business intelligence |
| Exam clue | SQL database | Flexible NoSQL, massive scale | OLAP analytics |

### EC2 vs. Lambda vs. Fargate vs. Elastic Beanstalk

| Service | What you manage | Best for |
|---|---|---|
| EC2 | OS, instance, applications | Full control |
| Lambda | Code and configuration | Event-driven serverless |
| Fargate | Container image and configuration | Serverless containers |
| Elastic Beanstalk | Application code | Simplified app deployment |

### ECS vs. EKS

| ECS | EKS |
|---|---|
| AWS-native container orchestration | Managed Kubernetes |
| Simpler AWS ecosystem integration | Kubernetes ecosystem and compatibility |
| AWS-specific orchestration | Kubernetes-based architecture |

### SQS vs. SNS vs. EventBridge vs. Step Functions

| Service | Pattern | Think… |
|---|---|---|
| **SQS** | Queue | A message waits for a consumer |
| **SNS** | Pub/sub | One message is delivered to multiple subscribers |
| **EventBridge** | Event bus | Events trigger actions based on rules |
| **Step Functions** | Workflow | Orchestrate sequential or branching tasks |

**Memory trick:** SQS = queue; SNS = notify; EventBridge = route events; Step Functions = coordinate workflows.

### CloudFront vs. Global Accelerator

| CloudFront | Global Accelerator |
|---|---|
| CDN | Network traffic accelerator |
| Caches content at edge locations | Routes traffic over AWS global network |
| Best for static/dynamic content delivery | Best for non-cacheable TCP/UDP applications |
| Exam clue: cache near users | Exam clue: improve network performance and availability |

### AWS Glue vs. Athena vs. EMR vs. Redshift

| Service | Main job |
|---|---|
| Glue | Prepare and transform data (ETL) |
| Athena | Query data in S3 with SQL |
| EMR | Run big-data frameworks such as Spark/Hadoop |
| Redshift | Store and analyze data in a warehouse |

### Machine learning: which service?

| Question describes… | Correct service |
|---|---|
| Identify objects/faces in images | Rekognition |
| Read scanned documents | Textract |
| Convert audio to text | Transcribe |
| Convert text to speech | Polly |
| Translate languages | Translate |
| Detect sentiment or entities in text | Comprehend |
| Build a conversational chatbot | Lex |
| Build custom ML models | SageMaker AI |

## 3. AWS Shared Responsibility Model & Security Alignment

### Infrastructure services

| Service | AWS responsibility | Customer responsibility |
|---|---|---|
| EC2 | Hardware, hypervisor, physical infrastructure | OS, patches, software, data, firewall rules |
| EBS | Physical storage infrastructure | Data, encryption settings, access |
| VPC | Physical networking infrastructure | Subnets, route tables, security groups, NACLs |
| S3 | Storage infrastructure, durability of underlying service | Data classification, permissions, configuration |
| RDS | Infrastructure, underlying OS maintenance | Data, users, access, application configuration |
| Lambda | Server infrastructure and runtime platform | Code, IAM permissions, data, application security |
| Fargate | Container infrastructure | Container image, application, permissions |

**Important distinction:** AWS is responsible for the security *of* the infrastructure, but customers still configure their cloud environments securely.

## 4. Billing, Pricing & Support Impact

### Storage pricing

Amazon S3 pricing generally depends on:
- Storage amount.
- Storage class.
- Requests and retrievals.
- Data transfer.
- Features such as replication and management.

| S3 storage class | Best for |
|---|---|
| S3 Standard | Frequently accessed data |
| S3 Intelligent-Tiering | Unknown or changing access patterns |
| S3 Standard-IA | Infrequently accessed, rapid retrieval |
| S3 One Zone-IA | Infrequently accessed, recreatable data in one AZ |
| S3 Glacier Instant Retrieval | Archive data requiring milliseconds retrieval |
| S3 Glacier Flexible Retrieval | Archive with minutes-to-hours retrieval |
| S3 Glacier Deep Archive | Lowest-cost long-term archive; hours retrieval |

**Exam trap:** Glacier Deep Archive is not designed for instant retrieval.

### AWS pricing principles

- Pay for what you use.
- Pay less when you commit to usage.
- Pay less with AWS economies of scale.
- Stop paying for unused capacity when resources are stopped or deleted, subject to service-specific charges.

**Important:** Stopping an EC2 instance does not necessarily stop charges for EBS volumes or Elastic IPs.

### Support & customer enablement

| Support resource | Purpose |
|---|---|
| AWS Support Center | Create and manage support cases |
| AWS Trusted Advisor | Best-practice checks for cost, security, performance, fault tolerance, service limits |
| AWS Health Dashboard | AWS service health and account-specific events |
| AWS re:Post | Community technical Q&A |
| AWS Knowledge Center | Common AWS technical questions |
| AWS Professional Services | Help customers design and implement AWS solutions |
| AWS Partner Network (APN) | AWS partners offering consulting and technical solutions |

---

## 5. Common Exam Traps & Scenario Breakdown

### Scenario 1: A company wants to run code in response to an S3 upload without managing servers.

**Correct:** AWS Lambda

**Why?** Lambda runs code in response to events and automatically manages the underlying infrastructure.

**Distractors:**
- EC2: requires managing virtual servers.
- Elastic Beanstalk: simplifies application deployment but is not the primary service for event-driven serverless code.

### Scenario 2: A company needs to store millions of files and make them available globally with low latency.

**Correct:** Amazon S3 + Amazon CloudFront

**Why?**
- S3 stores objects.
- CloudFront caches content at edge locations closer to users.

**Distractors:**
- EBS: block storage intended for EC2.
- EFS: shared file storage, not a global CDN.
- Route 53: DNS routing, not content caching.

### Scenario 3: A company wants to decouple its application components so one component can process messages independently.

**Correct:** Amazon SQS

**Why?** SQS provides a queue that buffers messages and decouples producers from consumers.

**Distractors:**
- SNS: pushes notifications to subscribers.
- EventBridge: routes events based on rules.
- Step Functions: coordinates workflows.

### Scenario 4: A company wants to analyze petabytes of structured data using SQL for business intelligence.

**Correct:** Amazon Redshift

**Why?** Redshift is a cloud data warehouse optimized for analytics.

**Distractors:**
- RDS: transactional relational database.
- DynamoDB: NoSQL database.
- Athena: SQL query service for data in S3, not a dedicated data warehouse.

---

# Domain 4 — Billing, Pricing & Support

## 1. Core Concept & Exam Keywords Summary

### AWS cost management tools

| Service | What it does | Exam trigger |
|---|---|---|
| **AWS Pricing Calculator** | Estimate future AWS costs | Before deployment, cost estimation |
| **AWS Cost Explorer** | Visualize and analyze spending | Historical costs, usage trends |
| **AWS Budgets** | Monitor costs and usage against thresholds | Alerts, forecasted spending |
| **AWS Cost and Usage Reports** | Detailed billing and usage records | Granular cost data |
| **AWS Organizations** | Manage multiple accounts centrally | Consolidated billing, governance |
| **Cost allocation tags** | Categorize expenses | Department, project, application |
| **AWS Marketplace** | Find and purchase third-party software/services | Vendor products, software licensing |

### Billing concepts

| Term | Meaning |
|---|---|
| Consolidated billing | Combine billing across AWS accounts under an organization |
| Cost allocation | Attribute spending to teams, projects, or business units |
| Free Tier | Free usage allowances subject to limits and eligibility |
| Data transfer | Often charged depending on direction, service, and destination |
| Usage-based pricing | Charges based on actual consumption |
| Commitment-based pricing | Discounts in exchange for a commitment |

## 2. Comparison & Distinctions

### Cost tools — know which to choose

| Scenario | Service |
|---|---|
| Estimate monthly bill before creating resources | Pricing Calculator |
| Visualize past spending by service | Cost Explorer |
| Receive an alert when spending exceeds a threshold | AWS Budgets |
| Download granular usage and billing records | Cost and Usage Reports |
| Group costs by team or environment | Cost allocation tags |
| Combine billing across multiple AWS accounts | AWS Organizations |

### AWS Organizations vs. IAM Identity Center

| AWS Organizations | IAM Identity Center |
|---|---|
| Organizes and governs AWS accounts | Manages workforce user access |
| Consolidated billing | Centralized SSO |
| Service Control Policies (SCPs) | Permission sets |
| Account management | Access to accounts and applications |

**Exam trap:** SCPs define the maximum available permissions in member accounts. They do not grant permissions by themselves.

## 3. AWS Shared Responsibility Model & Security Alignment

Billing and cost management are primarily customer-operated activities.

- **AWS:** Provides billing records, pricing models, billing infrastructure, and cost-management tools.
- **Customer:** Chooses services, configures usage, sets budgets, manages accounts, and monitors spending.

**Exam clue:** Unexpected AWS charges → Customer should review Cost Explorer, AWS Budgets, Cost and Usage Reports, and resource configurations.

## 4. Billing, Pricing & Support Impact

### Support plan comparison

| Plan | Key characteristics |
|---|---|
| **Basic** | Free; account and billing support, documentation, Trusted Advisor core checks |
| **Developer** | Business-hours support; general guidance for development/testing |
| **Business** | 24/7 support for production workloads; broader technical support and Trusted Advisor checks |
| **Enterprise On-Ramp** | Enhanced support for business-critical workloads |
| **Enterprise** | Highest level of support; designated Technical Account Manager (TAM) and strategic guidance |

**Exam trap:** AWS Support plans are different from AWS Professional Services. Support helps resolve technical issues; Professional Services assists with implementation and transformation.

### Trusted Advisor categories

Remember the five traditional categories:
1. Cost Optimization
2. Performance
3. Security
4. Fault Tolerance
5. Service Limits

**Trigger words:** Best practices, cost-saving recommendations, checks for underutilized resources, service quotas, and security recommendations.

### AWS Health Dashboard

| Dashboard | What it shows |
|---|---|
| Service health (public) | Status of AWS services across Regions |
| Your account health | Events and issues that may affect your specific AWS resources |

**Exam trap:** For an AWS service outage, check the AWS Health Dashboard, not Cost Explorer.

---

## 5. Common Exam Traps & Scenario Breakdown

### Scenario 1: A company wants to estimate the monthly cost of its planned AWS architecture before deploying it.

**Correct:** AWS Pricing Calculator

**Why?** It estimates costs based on planned services and configurations.

**Distractors:**
- Cost Explorer: primarily analyzes existing historical and current usage.
- AWS Budgets: monitors spending against thresholds.

### Scenario 2: A finance team wants to receive an alert when monthly AWS spending is forecast to exceed $10,000.

**Correct:** AWS Budgets

**Why?** Budgets can monitor actual and forecasted spending and notify users when thresholds are crossed.

**Distractors:**
- Cost Explorer: analyzes trends but is not the primary budget alerting tool.
- Pricing Calculator: estimates future costs before deployment.

### Scenario 3: An organization has multiple AWS accounts and wants one consolidated bill.

**Correct:** AWS Organizations with consolidated billing.

**Why?** Organizations centrally manages accounts and combines billing for eligible accounts under the management account.

**Distractors:**
- IAM: manages access permissions, not consolidated billing.
- Cost allocation tags: categorize costs but do not consolidate account billing.

---

# Final High-Yield Memorization Sheet

## 1. Service keyword lightning round

| Keyword in question | Answer |
|---|---|
| Virtual server | EC2 |
| Event-driven serverless compute | Lambda |
| Serverless containers | Fargate |
| Managed Kubernetes | EKS |
| Simple container orchestration | ECS |
| Deploy code without managing infrastructure | Elastic Beanstalk |
| Object storage | S3 |
| Block storage for EC2 | EBS |
| Shared file storage | EFS |
| Archival storage | S3 Glacier |
| Relational database | RDS |
| AWS cloud-native relational database | Aurora |
| NoSQL database | DynamoDB |
| Data warehouse | Redshift |
| In-memory cache | ElastiCache |
| DNS | Route 53 |
| CDN | CloudFront |
| Dedicated private connection | Direct Connect |
| Private virtual network | VPC |
| Central network hub | Transit Gateway |
| Private connectivity to AWS services | PrivateLink |
| Queue / decoupling | SQS |
| Notifications / fan-out | SNS |
| Event routing | EventBridge |
| Workflow orchestration | Step Functions |
| API creation and management | API Gateway |
| SQL queries directly on S3 | Athena |
| ETL / data integration | Glue |
| Streaming data | Kinesis |
| Big data frameworks | EMR |
| Image/video recognition | Rekognition |
| OCR / document extraction | Textract |
| Speech to text | Transcribe |
| Text to speech | Polly |
| NLP / sentiment analysis | Comprehend |
| Chatbot | Lex |
| Custom machine learning | SageMaker AI |
| API audit logs | CloudTrail |
| Metrics, alarms, logs | CloudWatch |
| Configuration history | AWS Config |
| Threat detection | GuardDuty |
| Central security findings | Security Hub |
| Vulnerability assessment | Inspector |
| Sensitive data in S3 | Macie |
| DDoS protection | Shield |
| Web request filtering | WAF |
| Encryption key management | KMS |
| Secret storage and rotation | Secrets Manager |
| Compliance reports | AWS Artifact |
| Workforce SSO | IAM Identity Center |
| Customer application sign-in | Cognito |
| Cost analysis | Cost Explorer |
| Cost alerts | AWS Budgets |
| Cost estimation | Pricing Calculator |
| Best-practice checks | Trusted Advisor |
| AWS service/account events | AWS Health Dashboard |
| Infrastructure as code | CloudFormation |
| Build and test code | CodeBuild |
| CI/CD pipeline | CodePipeline |
| Distributed tracing | X-Ray |
| Cloud contact center | Amazon Connect |
| Email sending | Amazon SES |
| Web/mobile full-stack development | Amplify |
| IoT device connectivity | IoT Core |

## 2. Numbers and facts worth remembering

| Fact | Remember |
|---|---|
| AWS Well-Architected Framework | 6 pillars |
| AWS global infrastructure | Regions, AZs, edge locations |
| Availability Zones | Isolated locations within a Region |
| AWS responsibility | Security OF the Cloud |
| Customer responsibility | Security IN the Cloud |
| IAM best practice | Least privilege |
| Root account | Protect with MFA; avoid daily use |
| Spot Instances | Interruptible spare capacity |
| On-Demand | No long-term commitment |
| Savings Plans | Commit to hourly spend for discounted rates |
| Cost Explorer | Analyze spending |
| AWS Budgets | Set thresholds and alerts |
| Pricing Calculator | Estimate before deployment |
| AWS Organizations | Multi-account management and consolidated billing |

---

# Exam Strategy: How to Answer Scenario Questions

When reading a CLF-C02 question, use this three-step approach:

**Step 1: Identify the requirement.**

Is it asking for:
- Lowest cost?
- Highest availability?
- Least operational effort?
- Security or compliance?
- Data storage?
- Analytics?
- Monitoring?
- Migration?
- Global delivery?

**Step 2: Identify the trigger words.**

For example:
- “Without managing servers” → Serverless
- “Relational database” → RDS
- “Unpredictable workload” → On-Demand
- “Spare capacity, can be interrupted” → Spot
- “Globally cache content” → CloudFront
- “API activity” → CloudTrail

**Step 3: Eliminate solutions that do more than necessary.**

AWS exam questions often favor the solution that meets the requirements with the **least operational overhead, appropriate cost, and managed service**.
