// Utility to dynamically parse AWS_CLF-C02_High-Yield_Reviewer.md

export const DOMAIN_META = {
  1: {
    id: 'domain-1',
    number: 1,
    title: 'Domain 1 — Cloud Concepts',
    shortTitle: 'Cloud Concepts',
    weight: '24%',
    icon: 'Cloud',
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
    description: 'Cloud value proposition, economics, Well-Architected Framework 6 pillars, 6 Rs of migration, deployment models, and global infrastructure.',
    keyFocus: ['6 Well-Architected Pillars', '6 Rs of Cloud Migration', 'CapEx vs OpEx', 'Global Infrastructure (Regions, AZs, Edge)']
  },
  2: {
    id: 'domain-2',
    number: 2,
    title: 'Domain 2 — Security & Compliance',
    shortTitle: 'Security & Compliance',
    weight: '30%',
    icon: 'ShieldCheck',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
    description: 'Shared Responsibility Model, IAM & least privilege, root account safety, logging (CloudTrail vs CloudWatch vs Config), encryption, and compliance tools.',
    keyFocus: ['Security OF vs IN the Cloud', 'IAM Least Privilege & MFA', 'Shield vs WAF', 'KMS vs Secrets Manager']
  },
  3: {
    id: 'domain-3',
    number: 3,
    title: 'Domain 3 — Cloud Technology & Services',
    shortTitle: 'Cloud Technology & Services',
    weight: '34%',
    icon: 'Cpu',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    description: 'Core compute (EC2, Lambda, Fargate), storage (S3, EBS, EFS), databases (RDS, DynamoDB, Redshift), networking (VPC, Route 53, CloudFront), and AI/ML services.',
    keyFocus: ['S3 vs EBS vs EFS vs FSx', 'EC2 vs Lambda vs Fargate', 'RDS vs DynamoDB vs Redshift', 'SQS vs SNS vs EventBridge']
  },
  4: {
    id: 'domain-4',
    number: 4,
    title: 'Domain 4 — Billing, Pricing & Support',
    shortTitle: 'Billing, Pricing & Support',
    weight: '12%',
    icon: 'CreditCard',
    color: 'from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-900/50 text-purple-600 dark:text-purple-400',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
    description: 'EC2 purchasing options, Cost Explorer, AWS Budgets, Pricing Calculator, AWS Organizations consolidated billing, Support tiers, and Trusted Advisor.',
    keyFocus: ['On-Demand vs Spot vs Savings Plans', 'Cost Explorer vs Budgets', 'Support Plan Response SLA', 'Trusted Advisor 5 Categories']
  }
};

/**
 * Service categorization for cheat sheet filtering
 */
export const SERVICE_CATEGORIES = {
  Compute: ['EC2', 'Lambda', 'Fargate', 'EKS', 'ECS', 'Elastic Beanstalk'],
  Storage: ['S3', 'EBS', 'EFS', 'S3 Glacier'],
  Database: ['RDS', 'Aurora', 'DynamoDB', 'Redshift', 'ElastiCache'],
  Networking: ['Route 53', 'CloudFront', 'Direct Connect', 'VPC', 'Transit Gateway', 'PrivateLink'],
  Integration: ['SQS', 'SNS', 'EventBridge', 'Step Functions', 'API Gateway'],
  'Analytics & Big Data': ['Athena', 'Glue', 'Kinesis', 'EMR'],
  'AI & Machine Learning': ['Rekognition', 'Textract', 'Transcribe', 'Polly', 'Comprehend', 'Lex', 'SageMaker AI'],
  'Security & Governance': ['CloudTrail', 'CloudWatch', 'AWS Config', 'GuardDuty', 'Security Hub', 'Inspector', 'Macie', 'Shield', 'WAF', 'KMS', 'Secrets Manager', 'AWS Artifact', 'IAM Identity Center', 'Cognito'],
  'Cost & Management': ['Cost Explorer', 'AWS Budgets', 'Pricing Calculator', 'Trusted Advisor', 'AWS Health Dashboard', 'AWS Organizations'],
  'Developer & Other': ['CloudFormation', 'CodeBuild', 'CodePipeline', 'X-Ray', 'Amazon Connect', 'Amazon SES', 'Amplify', 'IoT Core']
};

export function getServiceCategory(serviceName) {
  for (const [category, services] of Object.entries(SERVICE_CATEGORIES)) {
    if (services.includes(serviceName)) return category;
  }
  return 'Other';
}

/**
 * Parses the raw reviewer markdown content into structured domains and sections
 */
export function parseReviewerMarkdown(rawMarkdown) {
  if (!rawMarkdown) return null;

  // Split content by major sections starting with "# "
  // Regex to split by `# ` at the beginning of a line
  const lines = rawMarkdown.split(/\r?\n/);
  
  let headerContent = '';
  const domainSections = [];
  let cheatSheetContent = '';
  let examStrategyContent = '';

  let currentSection = null;
  let currentBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('# ')) {
      const headingText = line.replace('# ', '').trim();
      
      // Save previous section buffer
      if (currentSection) {
        saveSection(currentSection, currentBuffer.join('\n'));
      } else {
        headerContent = currentBuffer.join('\n');
      }

      currentBuffer = [line];
      currentSection = headingText;
    } else {
      currentBuffer.push(line);
    }
  }

  // Save the last section
  if (currentSection) {
    saveSection(currentSection, currentBuffer.join('\n'));
  }

  function saveSection(title, content) {
    if (title.startsWith('Domain 1')) {
      domainSections.push(buildDomainObject(1, title, content));
    } else if (title.startsWith('Domain 2')) {
      domainSections.push(buildDomainObject(2, title, content));
    } else if (title.startsWith('Domain 3')) {
      domainSections.push(buildDomainObject(3, title, content));
    } else if (title.startsWith('Domain 4')) {
      domainSections.push(buildDomainObject(4, title, content));
    } else if (title.includes('Final High-Yield Memorization Sheet')) {
      cheatSheetContent = content;
    } else if (title.includes('Exam Strategy')) {
      examStrategyContent = content;
    }
  }

  // Parse Lightning Round from cheat sheet
  const lightningRoundItems = parseLightningRound(cheatSheetContent);
  const factsToRemember = parseFactsToRemember(cheatSheetContent);

  // Parse Scenarios from all domains
  const allScenarios = parseAllScenarios(domainSections);

  return {
    headerContent,
    domains: domainSections,
    cheatSheet: {
      rawMarkdown: cheatSheetContent,
      lightningRound: lightningRoundItems,
      facts: factsToRemember,
    },
    examStrategy: examStrategyContent,
    allScenarios
  };
}

/**
 * Deconstructs a Domain markdown into subsections (##) and topics (###)
 */
function buildDomainObject(num, title, content) {
  const meta = DOMAIN_META[num];
  const lines = content.split(/\r?\n/);
  const subsections = [];

  let currentSub = null;
  let subBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      if (currentSub) {
        currentSub.content = subBuffer.join('\n');
        currentSub.topics = extractH3s(currentSub.content);
        subsections.push(currentSub);
      }
      const subTitle = line.replace('## ', '').trim();
      currentSub = {
        id: `domain-${num}-sub-${subsections.length + 1}`,
        rawTitle: line,
        title: subTitle,
        content: '',
        topics: []
      };
      subBuffer = [line];
    } else {
      if (currentSub) {
        subBuffer.push(line);
      }
    }
  }

  if (currentSub) {
    currentSub.content = subBuffer.join('\n');
    currentSub.topics = extractH3s(currentSub.content);
    subsections.push(currentSub);
  }

  return {
    ...meta,
    title,
    rawMarkdown: content,
    subsections
  };
}

function extractH3s(markdown) {
  const matches = [];
  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith('### ')) {
      matches.push(line.replace('### ', '').trim());
    }
  }
  return matches;
}

/**
 * Parses the Markdown table under `## 1. Service keyword lightning round`
 */
function parseLightningRound(cheatSheetMd) {
  if (!cheatSheetMd) return [];
  const items = [];
  const lines = cheatSheetMd.split(/\r?\n/);
  let inLightningTable = false;

  for (const line of lines) {
    if (line.includes('1. Service keyword lightning round')) {
      inLightningTable = true;
      continue;
    }
    if (inLightningTable && line.startsWith('## ')) {
      break; // reached next section
    }

    if (inLightningTable && line.startsWith('|') && !line.includes('Keyword in question') && !line.includes('---')) {
      const parts = line.split('|').map(p => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        const keyword = parts[0];
        const service = parts[1];
        items.push({
          id: `lr-${items.length}`,
          keyword,
          service,
          category: getServiceCategory(service)
        });
      }
    }
  }

  return items;
}

/**
 * Parses the Markdown table under `## 2. Numbers and facts worth remembering`
 */
function parseFactsToRemember(cheatSheetMd) {
  if (!cheatSheetMd) return [];
  const items = [];
  const lines = cheatSheetMd.split(/\r?\n/);
  let inFactsTable = false;

  for (const line of lines) {
    if (line.includes('2. Numbers and facts worth remembering')) {
      inFactsTable = true;
      continue;
    }
    if (inFactsTable && line.startsWith('#')) {
      break;
    }

    if (inFactsTable && line.startsWith('|') && !line.includes('Fact') && !line.includes('---')) {
      const parts = line.split('|').map(p => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        items.push({
          fact: parts[0],
          remember: parts[1]
        });
      }
    }
  }

  return items;
}

/**
 * Collects scenarios from each domain's `## 5. Common Exam Traps & Scenario Breakdown`
 */
function parseAllScenarios(domains) {
  const scenarios = [];

  domains.forEach(domain => {
    const sub5 = domain.subsections.find(s => s.title.toLowerCase().includes('scenario') || s.title.includes('5.'));
    if (!sub5) return;

    const lines = sub5.content.split(/\r?\n/);
    let currentScenario = null;
    let scenarioBuffer = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('### Scenario')) {
        if (currentScenario) {
          currentScenario.body = scenarioBuffer.join('\n');
          scenarios.push(currentScenario);
        }
        currentScenario = {
          id: `scenario-${domain.number}-${scenarios.length + 1}`,
          domainNumber: domain.number,
          domainTitle: domain.shortTitle,
          title: line.replace('### ', '').trim(),
          body: ''
        };
        scenarioBuffer = [];
      } else if (currentScenario) {
        scenarioBuffer.push(line);
      }
    }

    if (currentScenario) {
      currentScenario.body = scenarioBuffer.join('\n');
      scenarios.push(currentScenario);
    }
  });

  return scenarios;
}

