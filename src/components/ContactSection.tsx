import React, { useState } from 'react';
import { PersonalInfo, ThemeType } from '../types';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface ContactSectionProps {
  currentTheme: ThemeType;
  personalInfo: PersonalInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentTheme, personalInfo }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [subjectTemplate, setSubjectTemplate] = useState('Interview Invitation for AI Engineer Role');
  const [customSubject, setCustomSubject] = useState('');
  const [message, setMessage] = useState(
    `Hi Barathraj,\n\nWe came across your portfolio and your impressive work on Hybrid RAG/KAG/CAG architectures and Deep Learning at CodeWork. We would love to discuss an AI Engineer opportunity with our team.`
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const templates = [
    {
      title: 'Interview Invitation',
      subject: 'Interview Invitation for AI Engineer Role',
      defaultMsg: `Hi Barathraj,\n\nWe came across your portfolio and your impressive work on Hybrid RAG/KAG/CAG architectures and Deep Learning at CodeWork. We would love to discuss an AI Engineer opportunity with our engineering team.\n\nCould you please let us know your availability for an initial technical conversation?`,
    },
    {
      title: 'GenAI / RAG Discussion',
      subject: 'Technical Discussion regarding RAG/KAG/CAG Architecture',
      defaultMsg: `Hi Barathraj,\n\nI reviewed your Hybrid FAQ Chatbot architecture (Pinecone + Neo4j + Redis) and multi-key pooling implementation. We have an exciting project and would love to consult or discuss technical approaches with you.`,
    },
    {
      title: 'Freelance / Consulting',
      subject: 'Consulting / Contract Opportunity in Generative AI',
      defaultMsg: `Hi Barathraj,\n\nWe are looking for an experienced AI Engineer to assist us with building a retrieval-augmented generation pipeline. Let us know if you have bandwidth for consulting or freelance projects.`,
    },
  ];

  const handleSelectTemplate = (tpl: typeof templates[0]) => {
    setSubjectTemplate(tpl.subject);
    setCustomSubject(tpl.subject);
    setMessage(tpl.defaultMsg);
  };

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => {
      setCopiedKey(null);
      setToastMessage(null);
    }, 2500);
  };

  const fullEmailDraft = `Subject: ${customSubject || subjectTemplate}\nTo: ${personalInfo.email}\nFrom: ${name || 'Recruiter'} (${recruiterEmail || 'Not specified'})${company ? ` at ${company}` : ''}\n\n${message}\n\n---\nSent via ${personalInfo.name} AI Portfolio`;

  const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    customSubject || subjectTemplate
  )}&body=${encodeURIComponent(
    `${message}\n\nBest regards,\n${name || 'Recruiter'}${company ? `\n${company}` : ''}${recruiterEmail ? `\n${recruiterEmail}` : ''}`
  )}`;

  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  const accentBorder =
    currentTheme === 'cyberpunk'
      ? 'border-cyan-500/30'
      : currentTheme === 'midnight'
      ? 'border-amber-500/30'
      : 'border-sky-500/30';

  const accentButton =
    currentTheme === 'cyberpunk'
      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
      : currentTheme === 'midnight'
      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
      : 'bg-sky-500 text-slate-950 hover:bg-sky-400';

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-code uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2">
            <Mail className={`w-3.5 h-3.5 ${accentColor}`} />
            <span>Recruiter & Collaborative Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Direct Inquiries & Communication
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Compose a direct message, copy a drafted inquiry to your clipboard, or reach out instantly via email or phone.
          </p>
        </div>

        {/* Instant Notification Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-slate-900 border border-emerald-500/50 text-white text-xs font-medium flex items-center gap-2.5 shadow-2xl animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Email Composer */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-slate-900/70 border border-slate-800/90 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className={`w-4 h-4 ${accentColor}`} />
                <h3 className="text-base font-bold text-white tracking-tight">Direct Recruiter Composer</h3>
              </div>
              <span className="text-[11px] font-code text-slate-400">Target: {personalInfo.email}</span>
            </div>

            {/* Template Selector Quick Buttons */}
            <div>
              <div className="text-xs font-medium text-slate-300 mb-2">Choose Inquiry Preset:</div>
              <div className="flex flex-wrap gap-2">
                {templates.map((tpl) => {
                  const isSelected = subjectTemplate === tpl.subject;
                  return (
                    <button
                      key={tpl.title}
                      type="button"
                      onClick={() => handleSelectTemplate(tpl)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-slate-800 text-white border border-slate-600 shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {tpl.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Row: Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe (Talent Partner)"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme AI Labs"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
                />
              </div>
            </div>

            {/* Work Email */}
            <div className="text-xs">
              <label className="block text-slate-300 font-medium mb-1">Your Work Email</label>
              <input
                type="email"
                value={recruiterEmail}
                onChange={(e) => setRecruiterEmail(e.target.value)}
                placeholder="e.g. recruiter@company.com"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
              />
            </div>

            {/* Subject Line */}
            <div className="text-xs">
              <label className="block text-slate-300 font-medium mb-1">Email Subject Line</label>
              <input
                type="text"
                value={customSubject || subjectTemplate}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-slate-600 font-medium"
              />
            </div>

            {/* Message Body */}
            <div className="text-xs">
              <label className="block text-slate-300 font-medium mb-1">Message Content</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-slate-600 leading-relaxed font-sans"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => copyToClipboard(fullEmailDraft, 'composer', 'Complete Email Draft')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                {copiedKey === 'composer' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedKey === 'composer' ? 'Draft Copied to Clipboard!' : 'Copy Draft to Clipboard'}</span>
              </button>

              <a
                href={mailtoLink}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md ${accentButton}`}
              >
                <Send className="w-4 h-4" />
                <span>Open in Email Client</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Cards & Direct Access */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Email Card */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  <Mail className={`w-5 h-5 ${accentColor}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-code text-slate-400">Primary Email</div>
                  <div className="text-sm font-semibold text-white truncate font-code mt-0.5">{personalInfo.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email_card', 'Email Address')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedKey === 'email_card' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Send email directly"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Primary Phone Card */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-code text-slate-400">Primary Contact (India)</div>
                  <div className="text-sm font-semibold text-white truncate font-code mt-0.5">{personalInfo.phones[0]}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => copyToClipboard(personalInfo.phones[0], 'phone_primary', 'Phone Number')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Copy phone number"
                >
                  {copiedKey === 'phone_primary' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`tel:${personalInfo.phones[0]}`}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Call via phone"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Secondary Phone Card */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-code text-slate-400">Alternate Contact</div>
                  <div className="text-sm font-semibold text-white truncate font-code mt-0.5">{personalInfo.phones[1] || 'None'}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {personalInfo.phones[1] && (
                  <>
                    <button
                      onClick={() => copyToClipboard(personalInfo.phones[1], 'phone_alt', 'Alternate Phone')}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Copy alternate phone"
                    >
                      {copiedKey === 'phone_alt' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`tel:${personalInfo.phones[1]}`}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Call via phone"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* LinkedIn Profile Card */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  <Linkedin className="w-5 h-5 text-sky-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-code text-slate-400">Professional Network</div>
                  <div className="text-sm font-semibold text-white truncate font-code mt-0.5">linkedin.com/in/barathraj-b-5203b7384</div>
                </div>
              </div>

              <a
                href={personalInfo.linkedIn.startsWith('http') ? personalInfo.linkedIn : `https://${personalInfo.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-white hover:bg-sky-500 hover:text-slate-950 transition-colors"
                title="Connect on LinkedIn (barathraj-b-5203b7384)"
              >
                <span>Connect</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* GitHub Profile Card */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-code text-slate-400">Open-Source & Code Repositories</div>
                  <div className="text-sm font-semibold text-white truncate font-code mt-0.5">github.com/barath2708</div>
                </div>
              </div>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors"
              >
                <span>View Repos</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Availability Notice */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Notice Period & Location</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Currently based in Chennai, India. Flexible for on-site, hybrid, or remote positions across global engineering teams.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
