import { ProjectData } from './types';

export interface ExperimentItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tags: string[];
  date: string;
  description: string;
}

export interface ExperienceRecord {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface EducationRecord {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  coursework: string[];
}

export const PORTFOLIO_DATA = {
  identity: {
    name: 'Abinav Kishore',
    fullName: 'Abinav Kishore R S',
    coordinates: '13.0827° N, 80.2707° E',
    location: 'Chennai, India',
    year: '2026',
    cgpa: 'CGPA: 8.27',
    positioning: 'Computer Science Engineer · Full-Stack Developer · AI Builder',
    coreStatement:
      'I architect intelligent systems, distributed full-stack platforms, and deep learning pipelines.',
    heroSubstatement: 'FULL-STACK × AGENTIC AI × DISTRIBUTED SYSTEMS',
    availability: 'Open for full-time engineering roles & research projects',
    email: 'abinav.kishore.r.s@gmail.com',
    phone: '+91 94808 56830',
    socials: {
      github: 'https://github.com/Abinav-Kishore',
      linkedin: 'https://linkedin.com/in/abinav-kishore-r-s',
      x: 'https://x.com/Abinav-Kishore',
    },
  },

  hero: {
    titleLines: ['PROJECTS,', 'EXPERIMENTS', '& EVERYTHING IN BETWEEN.'],
    metadata: {
      dept: 'COMPUTER SCIENCE',
      field: 'FULL-STACK & AI SYSTEMS',
      location: 'CHENNAI / INDIA',
      year: '2026',
      tags: 'PROJECTS, EXPERIMENTS & EVERYTHING IN BETWEEN',
    },
  },

  projects: [
    {
      id: 'viora',
      number: '01',
      title: 'VIORA // INTELLIGENT THREAT GUARD',
      subtitle: 'Mobile security assistant providing real-time AI heuristics for adversarial inputs',
      category: 'AI × MOBILE × SECURITY',
      year: '2026',
      role: 'Founder / Lead Developer',
      client: 'INDEPENDENT BUILD // STATUS: ACTIVE',
      stack: ['Android', 'AI', 'OCR', 'Accessibility APIs'],
      description:
        'An intelligent mobile security assistant that warns users about suspicious QR codes, links, messages and potentially malicious content using Android accessibility capabilities, OCR and AI-based threat analysis.',
      metrics: [
        { label: 'THREAT ENGINE', value: 'HEURISTIC' },
        { label: 'OCR LATENCY', value: '<45ms' },
        { label: 'RISK ANALYSIS', value: 'REAL-TIME' },
      ],
      pipeline: [
        {
          stage: 'CAPTURE',
          detail:
            'An Android accessibility service streams on-screen content while an OCR pass extracts text from QR frames, links and messages.',
          status: 'REAL-TIME',
        },
        {
          stage: 'DETECT',
          detail:
            'The heuristic engine scores QR payloads, URLs and message patterns for adversarial intent before the user interacts with them.',
          status: 'ON-DEVICE',
        },
        {
          stage: 'ALERT',
          detail:
            'Risk verdicts surface as non-intrusive warnings; suspicious content is flagged before it can be opened or scanned.',
          status: '<45MS',
        },
      ],
      notes: [
        'Runs entirely on-device — no screen content ever leaves the handset.',
        'OCR latency budget held under 45ms per frame on mid-range hardware.',
        'Active build; currently iterating on link-reputation heuristics.',
      ],
      dark: false,
    },
    {
      id: 'saro',
      number: '02',
      title: 'SARO // HANDS-FREE EDGE CONTROL',
      subtitle: 'Local multimodal edge intelligence combining real-time computer vision and voice commands',
      category: 'LOCAL AI × VISION × HARDWARE',
      year: '2025',
      role: 'Founder / Lead Developer',
      client: 'HACKATHON WINNER // STATUS: AWARDED',
      stack: ['Local LLM', 'Computer Vision', 'Voice AI', 'Hardware'],
      description:
        'A local AI-based hands-free device-control system combining voice and visual input to control physical devices. Designed with accessibility in mind while enabling broader hands-free interaction.',
      metrics: [
        { label: 'LOCAL MODEL', value: 'EDGE EMBED' },
        { label: 'VISION ENGINE', value: 'ZERO-CLOUD' },
        { label: 'DEVICE CONTROL', value: 'HARDWARE BUS' },
      ],
      pipeline: [
        {
          stage: 'SENSE',
          detail:
            'Voice stream and camera feed are captured locally from onboard sensors — dual-modality input with no network round-trip.',
          status: 'DUAL-STREAM',
        },
        {
          stage: 'REASON',
          detail:
            'A local LLM resolves spoken intent while on-device CV models ground it in what the camera sees — all inference at the edge.',
          status: 'ZERO-CLOUD',
        },
        {
          stage: 'ACTUATE',
          detail:
            'Resolved commands are mapped onto the hardware bus; device state updates hands-free with no touch interaction required.',
          status: 'HARDWARE BUS',
        },
      ],
      notes: [
        'Best Fresher Team at Nexathon25 (VIT).',
        'All inference executes on-device; zero data egress by design.',
        'Accessibility-first: built for hands-free operation.',
      ],
      dark: true,
    },
    {
      id: 'obliq',
      number: '03',
      title: 'OBLIQ // CONTRACT DOCUMENT INTELLIGENCE',
      subtitle: 'Deep semantic contract parsing, clause segmentation, and automated risk scoring',
      category: 'AI × DOCUMENT INTELLIGENCE',
      year: '2025',
      role: 'Founder / Lead Architect',
      client: 'HACKATHON PROJECT // STATUS: BUILT',
      stack: ['Python', 'FastAPI', 'Gemini', 'PostgreSQL', 'Redis', 'Qdrant'],
      description:
        'An AI-powered contract analysis system that extracts, segments, analyzes and scores contracts to surface important clauses, risks and obligations.',
      metrics: [
        { label: 'EXTRACTION & PARSE', value: 'MULTI-MODAL' },
        { label: 'VECTOR RETRIEVAL', value: 'QDRANT' },
        { label: 'RISK SCORING', value: 'AUTOMATED' },
      ],
      pipeline: [
        {
          stage: 'INGEST',
          detail:
            'Contracts parsed multi-modally; a hierarchical segmenter splits the document into a graph of clauses and obligations.',
          status: 'FASTAPI',
        },
        {
          stage: 'RETRIEVE',
          detail:
            'Clause embeddings are indexed in Qdrant for semantic retrieval; Redis caches hot analyses; PostgreSQL persists the record.',
          status: 'QDRANT + REDIS',
        },
        {
          stage: 'REASON',
          detail:
            'Gemini scores obligations, surfaces hidden liabilities and drafts the executive audit with clause-level citations.',
          status: '1M CONTEXT',
        },
      ],
      notes: [
        'Qdrant vector retrieval over a 12,400-token-per-contract corpus.',
        'Whole-contract reasoning via the 1M-token context window.',
        'Automated risk scoring with citations back to the source clause.',
      ],
      dark: false,
    },
  ] as ProjectData[],

  experiments: [
    {
      id: 'surveillance-integrity-ai',
      number: '01',
      title: 'SURVEILLANCE INTEGRITY AI',
      category: 'Deep Learning Video Forensics System',
      tags: ['Python', 'TensorFlow', 'OpenCV', 'CNNs', 'NumPy'],
      date: '2024',
      description:
        'Designed a deep learning pipeline to detect manipulation and tampering in public surveillance footage using frame-level analysis and temporal feature extraction.',
    },
    {
      id: 'value',
      number: '02',
      title: 'VANTIQ // EXPLAINABLE STOCK INTELLIGENCE',
      category: 'Multi-Agent Financial Intelligence Platform',
      tags: ['TypeScript', 'React', 'Yahoo Finance', 'Finnhub', 'RAG', 'Multi-Agent LLMs'],
      date: '2026',
      description:
        'Explainable stock research platform: three specialist agents (TECH-SPIDER technicals, FUND-SPIDER RAG fundamentals, SENTI-SPIDER news sentiment) run in parallel on real market data, converge through a NEXUS synthesis layer, and adapt to the investor risk profile — with the full reasoning trace exposed.',
    },
    {
      id: 'ai-email-response-agent',
      number: '03',
      title: 'AI EMAIL REPLY DRAFTER',
      category: 'Agentic Gmail Automation',
      tags: ['Node.js', 'Gmail API', 'OAuth 2.0', 'Hugging Face', 'Llama 3.3 8B'],
      date: '2026',
      description:
        'AI agent that drafts replies for unread Gmail threads using an open LLM (Llama-3.3-8B-Instruct via Hugging Face), with Google OAuth integration, Gmail draft creation or auto-send, and a CLI that drafts from raw email files with selectable tone.',
    },
    {
      id: 'plexus',
      number: '04',
      title: 'PLEXUS',
      category: 'Cross-Platform Student Dashboard',
      tags: ['React Native', 'Expo', 'TypeScript', 'REST APIs', 'RBAC'],
      date: '2024',
      description:
        'Centralized student platform for academic resources, announcements and administrative workflows with role-based access control, built cross-platform with React Native (Expo).',
    },
    {
      id: 'leetcode-engine',
      number: '05',
      title: 'ALGORITHMIC ENGINE // LEETCODE 2000+ CONTEST RATING',
      category: 'Data Structures & Algorithms',
      tags: ['Python', 'C++', 'Trees & Graphs', 'Dynamic Programming', '650+ Solved'],
      date: '2023 – 2026',
      description:
        'Solved 650+ problems on LeetCode with a contest rating of 2000+ (top tier). Deep mastery in advanced graphs, trees, dynamic programming, and high-performance algorithms.',
    },
    {
      id: 'deepfake-detection',
      number: '06',
      title: 'DEEPTRACE // DEEPFAKE DETECTION',
      category: 'Computer Vision & Forensics',
      tags: ['Python', 'PyTorch', 'OpenCV', 'DFDC Dataset', 'Colab'],
      date: '2026.02',
      description:
        'Deep learning pipeline for detecting deepfake videos: Deepfake Detection Challenge (DFDC) sample dataset, OpenCV frame extraction, and PyTorch CNN training/evaluation — implemented as a reproducible Colab notebook.',
    },
    {
      id: 'smart-ppe-detection',
      number: '07',
      title: 'SMART PPE DETECTION',
      category: 'Edge Safety AI & Computer Vision',
      tags: ['YOLO', 'Edge AI', 'Safety Systems', 'Computer Vision'],
      date: '2025.03',
      description:
        'Real-time safety compliance monitoring using computer vision at the edge for industrial safety protocols.',
    },
    {
      id: 'unifeed',
      number: '08',
      title: 'UNIFEED',
      category: 'Information Architecture & Systems',
      tags: ['RSS', 'NLP', 'Systems', 'Python'],
      date: '2024.12',
      description:
        'Content aggregator and filter system designed to counter algorithmic feed fatigue with custom filtering heuristics.',
    },
    {
      id: 'chronos',
      number: '09',
      title: 'CHRONOS',
      category: 'UX Research & Interaction',
      tags: ['React', 'TypeScript', 'UX Research', 'Tailwind'],
      date: '2025.11',
      description:
        'A minimalist time-tracking concept exploring intentionality and frictionless logging.',
    },
  ] as ExperimentItem[],

  about: {
    intro:
      'I am a Computer Science Engineering student at Chennai Institute of Technology (CGPA: 8.27) building intelligent systems, full-stack web platforms, and machine learning software.',
    philosophy:
      'My technical work bridges rigorous algorithm design, robust full-stack architecture, and practical machine learning. Whether building agentic automation pipelines, optimizing high-concurrency Node/Express backends, or training deep learning models for video forensics, I build software that is fast, resilient, and architecturally sound.',
    conviction:
      'I care about software that is robust under load, intuitive at the glass, and technically honest in its execution.',
  },

  skills: {
    programmingLanguages: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'C', 'SQL'],
    dsa: [
      'Arrays & Hashing',
      'Trees & Graphs',
      'Dynamic Programming',
      'Recursion & Backtracking',
      'LeetCode 2000+ Rating',
    ],
    backend: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'GraphQL',
      'Authentication & Authorization (JWT)',
      'Scalable APIs',
    ],
    databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
    frontend: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'React Native',
      'HTML5 / CSS3',
      'Three.js / WebGL',
      'GSAP',
    ],
    machineLearningAI: [
      'LLMs & Agentic Systems',
      'Retrieval-Augmented Generation (RAG)',
      'TensorFlow',
      'OpenCV',
      'CNNs',
      'NLP',
      'Computer Vision',
      'NumPy',
    ],
    systemDesign: [
      'Object-Oriented Programming (OOP)',
      'MVC Architecture',
      'Scalable Microservices & APIs',
      'Database Modeling & Normalization',
    ],
    tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Linux', 'Docker (basic)', 'AWS (basic)'],
  },

  education: {
    institution: 'Chennai Institute of Technology',
    degree: 'Bachelor of Engineering in Computer Science',
    location: 'Chennai, India',
    period: '2022 – 2026',
    cgpa: 'CGPA: 8.27 / 10.0',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
      'Object-Oriented Programming & MVC',
      'Machine Learning & Deep Learning',
      'Software Engineering & Deployment',
      'Computer Hardware & Architecture',
    ],
  },

  experience: [
    {
      year: 'Jan 2026',
      role: 'JavaScript Full-Stack Developer Intern',
      company: 'GENCUE Technologies and Services (Onsite)',
      description:
        'Worked on full-stack web application development using JavaScript technologies across frontend and backend layers. Integrated REST APIs with database systems and implemented application features following standard development workflows, Git version control, and application debugging practices.',
    },
    {
      year: 'Oct 2024 – Present',
      role: 'Vice President (Leadership & Technical Role)',
      company: 'Club Asymmetric (Onsite)',
      description:
        'Leading technical and engineering initiatives, spearheading hackathon preparations, organizing collaborative engineering sprints, and mentoring students across full-stack and systems engineering.',
    },
    {
      year: '2024',
      role: 'MERN Stack Development Intern',
      company: 'Codec Technologies (AICTE & ICAC Approved)',
      description:
        'Completed comprehensive MERN stack internship developing scalable full-stack applications with React, Express.js, Node.js, and MongoDB, implementing secure authentication and RESTful services.',
    },
    {
      year: '2023 – 2026',
      role: 'Competitive Programmer & Hackathon Winner',
      company: 'LeetCode (2000+ Rating) · Nexathon25 (VIT)',
      description:
        'Solved 650+ problems on LeetCode with a contest rating of 2000+. Awarded Best Fresher Team at Nexathon25 hackathon hosted at Vellore Institute of Technology (VIT).',
    },
  ] as ExperienceRecord[],

  certifications: [
    {
      issuer: 'NPTEL',
      name: 'Internet of Things (IoT) · Data Analytics with Python',
    },
    {
      issuer: 'Cisco',
      name: 'Networking · Cybersecurity · Data Science',
    },
    {
      issuer: 'MongoDB',
      name: 'MongoDB Basics for Students',
    },
    {
      issuer: 'Python Institute / Coursera',
      name: 'Python: Basics, Data Structures, Essentials',
    },
    {
      issuer: 'Web Technologies',
      name: 'JavaScript · CSS · Modern Responsive Web Architecture',
    },
    {
      issuer: 'Computer Science Core',
      name: 'Operating Systems · Computer Hardware Architecture',
    },
  ],

  achievements: [
    {
      title: 'LeetCode 2000+ Contest Rating (650+ Solved)',
      desc: 'Top-tier contest ranking demonstrating algorithmic excellence in graphs, dynamic programming, and system optimization.',
    },
    {
      title: 'Awarded Best Fresher Team at Nexathon25 (VIT)',
      desc: 'Won premier hackathon award for rapid prototyping and deployment of an innovative technical solution.',
    },
    {
      title: 'AICTE & ICAC Approved MERN Stack Internship',
      desc: 'Officially certified full-stack engineering internship completed with distinction at Codec Technologies.',
    },
    {
      title: 'Vice President of Club Asymmetric',
      desc: 'Elected technical and organizational leader at Chennai Institute of Technology.',
    },
  ],
};
