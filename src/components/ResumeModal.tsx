import React, { useState } from 'react';
import { PERSONAL_INFO, INITIAL_PROJECTS, EXPERIENCES, EDUCATION_LIST, SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';
import { PersonalInfo } from '../types';
import { X, Printer, Copy, Check, Download, Mail, Phone, Linkedin, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo?: PersonalInfo;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, personalInfo = PERSONAL_INFO }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const plainTextResume = `
${personalInfo.name.toUpperCase()}
Phone: ${personalInfo.phones.join(' | ')}
LinkedIn: ${personalInfo.linkedIn}
GitHub: ${personalInfo.github}
E-mail: ${personalInfo.email}

CAREER OBJECTIVES
${personalInfo.bio}

EDUCATION
${EDUCATION_LIST.map((e) => `${e.institution} - ${e.location}\n${e.degree} - ${e.period} - ${e.score || ''}`).join('\n\n')}

PROJECTS
${INITIAL_PROJECTS.map((p, i) => `${i + 1}. ${p.title}\n${p.bulletPoints.map((b) => `● ${b}`).join('\n')}`).join('\n\n')}

INTERNSHIP & EXPERIENCE
${EXPERIENCES.map((e) => `Company: ${e.company}, ${e.location}\nRole: ${e.role}\nDate: ${e.period}\nResponsibilities:\n${e.responsibilities.map((r) => `● ${r}`).join('\n')}`).join('\n\n')}

TECHNICAL SKILLS
${SKILL_CATEGORIES.map((c) => `● ${c.title}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n')}

CERTIFICATIONS
${CERTIFICATIONS.map((c) => `● ${c.name} - ${c.issuer}`).join('\n')}
  `.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-4 sm:p-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">Barathraj B - Verified Resume Document</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
              title="Copy plain-text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto pr-2 mt-4 bg-white text-slate-900 rounded-lg p-6 sm:p-10 shadow-inner font-sans text-xs leading-relaxed selection:bg-cyan-200 selection:text-slate-900">
          {/* Header */}
          <div className="text-center pb-4 border-b border-slate-300">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 uppercase">
              {personalInfo.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-700 text-xs font-medium">
              <span>Phone: {personalInfo.phones.join(' | ')}</span>
              <span>·</span>
              <a href={personalInfo.linkedIn} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                LinkedIn: {personalInfo.linkedIn.replace('https://www.linkedin.com/in/', '')}
              </a>
              <span>·</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold">
                GitHub: {personalInfo.github.replace('https://github.com/', '')}
              </a>
              <span>·</span>
              <a href={`mailto:${personalInfo.email}`} className="text-blue-700 underline">
                E-mail: {personalInfo.email}
              </a>
            </div>
          </div>

          {/* CAREER OBJECTIVES */}
          <div className="mt-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-400 mb-2">
              Career Objectives
            </h2>
            <p className="text-slate-700 leading-normal text-justify">
              Motivated postgraduate student pursuing M.Tech in AI and Data Science, currently gaining hands-on industry experience as an AI Engineer Intern. Seeking to leverage practical experience in building RAG/KAG/CAG-based AI systems, deep learning models, and end-to-end AI application development to contribute to impactful AI engineering roles while continuously growing technical expertise in machine learning, LLMs, and applied AI.
            </p>
          </div>

          {/* EDUCATION */}
          <div className="mt-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-400 mb-2">
              Education
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>SRM Institute of Science and Technology - Chennai</span>
                  <span>July 2025 to April 2027</span>
                </div>
                <div className="text-slate-700 italic">
                  M.Tech in Data Science & Artificial Intelligence - Currently in 3rd Semester
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Arasu Engineering College - Kumbakonam</span>
                  <span>July 2018 to April 2022</span>
                </div>
                <div className="text-slate-700 italic">
                  B.E in Mechanical Engineering - 76%
                </div>
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="mt-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-400 mb-2">
              Projects
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900">
                  1. FAQ Chatbot (Hybrid RAG + KAG + CAG Architecture)
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 mt-1">
                  <li>Built a full-stack FAQ chatbot combining Retrieval-Augmented Generation (RAG), Knowledge-Augmented Generation (KAG), and Cache-Augmented Generation (CAG) for accurate, low-latency responses.</li>
                  <li>Implemented web page scraping and bulk scraping features to automatically ingest and index large volumes of documentation into the knowledge base.</li>
                  <li>Used Pinecone for vector search, Neo4j for knowledge graph relationships, and Redis for caching frequent queries.</li>
                  <li>Integrated Groq and Gemini LLM APIs with a multi-key rotation pool (cooldown/backoff) for reliable, high-availability inference.</li>
                  <li>Backend built with FastAPI and PostgreSQL; frontend built with React/Vite.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  2. Deep Learning Project - Brain Cancer Detection from MRI Scans
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 mt-1">
                  <li>Developed a deep learning model to classify/detect brain cancer from MRI scan images to assist in early diagnosis.</li>
                  <li>Applied image preprocessing and data augmentation techniques to improve model generalization on medical imaging data.</li>
                  <li>Trained and evaluated a convolutional neural network (CNN)-based architecture for classification of MRI scans.</li>
                  <li>Assessed model performance using standard evaluation metrics to validate reliability of predictions.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* INTERNSHIP */}
          <div className="mt-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-400 mb-2">
              Internship & Experience
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Company Name: CodeWork, Chennai</span>
                  <span>25th May 2026 to Current</span>
                </div>
                <div className="text-slate-800 font-semibold mb-1">Role: AI Engineer Intern</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>Designed and developed AI-powered applications including RAG/KAG/CAG-based chatbot systems.</li>
                  <li>Built and optimized backend services using FastAPI, integrating vector databases (Pinecone) and knowledge graphs (Neo4j).</li>
                  <li>Implemented LLM integration with multi-provider API key pooling (Groq, Gemini) for rate-limit handling and high availability.</li>
                  <li>Developed web scraping and bulk scraping pipelines to automate large-scale data ingestion for knowledge bases.</li>
                  <li>Performed token-budget-aware text processing and prompt optimization to improve response quality and reduce latency.</li>
                  <li>Worked on deep learning model development and evaluation for medical image classification tasks.</li>
                  <li>Collaborated on end-to-end AI application development, from data pipeline design to deployment-ready backend architecture.</li>
                  <li>Documented technical workflows and maintained version control using Git/GitHub.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Necurity Solutions Network Security Pvt Ltd</span>
                  <span>25th Aug 2025 to 9th Dec 2025</span>
                </div>
                <div className="text-slate-800 font-semibold">Role: Networking Operations & IT Support - Intern</div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>City Union Bank, Melavalampettai</span>
                  <span>Jan 2023 to July 2024</span>
                </div>
                <div className="text-slate-800 font-semibold">Relationship Manager - 1 (Customer Support)</div>
              </div>
            </div>
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="mt-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-400 mb-2">
              Technical Skills
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>AI/ML Concepts:</strong> Machine Learning, Deep Learning, Neural Networks (CNN), Model Evaluation & Optimization</li>
              <li><strong>Generative AI:</strong> RAG, KAG, CAG hybrid architectures, LLM integration & prompt engineering</li>
              <li><strong>LLM Providers:</strong> Groq, Gemini API, multi-key pooling & rate-limit handling</li>
              <li><strong>Vector & Graph Databases:</strong> Pinecone (vector search), Neo4j (knowledge graphs)</li>
              <li><strong>Backend Development:</strong> FastAPI, Python, RESTful API design</li>
              <li><strong>Frontend Development:</strong> React, Vite (basic)</li>
              <li><strong>Databases:</strong> PostgreSQL, Redis</li>
              <li><strong>Data Pipelines:</strong> Web scraping, bulk scraping, data ingestion & indexing pipelines</li>
              <li><strong>Programming Languages:</strong> Python (Intermediate)</li>
              <li><strong>Version Control:</strong> Git, GitHub</li>
              <li><strong>Cloud & DevOps:</strong> AWS EC2, S3, IAM (Basic), Docker, Jenkins, Terraform (Basic)</li>
              <li><strong>Database Querying:</strong> SQL (Basic queries)</li>
            </ul>
          </div>

          {/* CERTIFICATION */}
          <div className="mt-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-400 mb-2">
              Certification
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>AWS & DevOps - Greens Training Institute, Chennai</li>
              <li>SQL Basics - Great Learnings</li>
              <li>Python Fundamentals - Log2base2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
