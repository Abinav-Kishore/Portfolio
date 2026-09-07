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
      title: 'VALUE (VALUATION ENGINE)',
      category: 'Financial Analytics & Market NLP Web App',
      tags: ['Python', 'JavaScript', 'APIs', 'NLP', 'React'],
      date: '2025',
      description:
        'Developed a platform integrating real-time financial market data with live sentiment analysis for portfolio optimization and adaptive market signal analytics.',
    },
    {
      id: 'ai-email-response-agent',
      number: '03',
      title: 'AI EMAIL RESPONSE AGENT',
      category: 'Agentic Email Automation Platform',
      tags: ['Python', 'Node.js', 'Express.js', 'LLMs', 'RAG', 'Email APIs'],
      date: '2026',
      description:
        'Context-aware agentic email platform synthesizing intelligent replies via thread retrieval and LLM reasoning with backend RAG pipelines.',
    },
    {
      id: 'plexus',
      number: '04',
      title: 'PLEXUS',
      category: 'Student Dashboard Web & Mobile Platform',
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'RBAC'],
      date: '2024',
      description:
        'Built a centralized platform to manage academic resources, announcements, and administrative workflows with role-based access control for students and administrators.',
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
      title: 'DEEPFAKE DETECTION FORENSICS',
      category: 'Computer Vision & Forensics',
      tags: ['PyTorch', 'OpenCV', 'FFT', 'CNN'],
      date: '2026.03',
      description:
        'Multi-model deepfake detection pipeline using spatial artifacts and frequency-domain analysis.',
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
