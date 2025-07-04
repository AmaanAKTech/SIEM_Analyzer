# SIEM Analyzer

🔗 Project Link: https://siem-analyzer.netlify.app

🔏 SIEM Analyzer - Enterprise-Grade SIEM Dashboard for Real-Time Log Analysis & Threat Monitoring

SIEM Analyzer is a 100% in-browser React + Vite app (Tailwind CSS) that drag-and-drops CEF, LEEF, JSON, syslog or .log/.txt logs into a client-side parser, applying YARA scans, MITRE ATT&CK TTP tagging and STIX/TAXII IOC enrichment before indexing into a lightweight time-series store. Interactive Chart.js (pie, bar, line) widgets display Sysmon Event IDs, Suricata alerts, Zeek/OSQuery or Windows Event Log distributions by severity, timestamp and source, while React Context drives a real-time alert panel with React Toastify notifications. One-click filtered CSV exports meet NIST 800-61 and PCI-DSS standards, and responsive layouts guide analysts through threat hunting playbooks, VirusTotal lookups, MISP correlations, Sigma rule templates and SOAR style dashboards complete with Elastic, QRadar and Splunk data mapping layers for rapid triage and forensic investigation.

🛡️ Security-Centric Features:-
📁 Secure File Uploads with drag-and-drop and file type validation
🔒 Client-side Parsing Only — no data leaves your browser
📊 Visualize Event Distribution by log level, time, and component
🔔 Alert Panel with persistent, dismissible, and real-time notifications
📤 Filtered CSV Export for offline investigations or evidence sharing
🧠 Designed for Analysts to triage and explore raw logs intuitively
🔍 Supported Log Formats: .log, .txt, .cef, .leef (commonly used in SIEM platforms like ArcSight, QRadar, and Splunk)

🛠️ Tech Stack:-
Frontend Framework: React + Vite
Styling: Tailwind CSS
Charts: Chart.js (Pie, Bar, Line)
State Management: React Context API
UX Enhancements: React Toastify, Animations, Responsive Design

Security Tools Experience:-
Log parsing modeled on formats from SIEM tools like Splunk, QRadar, and Elastic SIEM
Focused on threat intelligence workflows and incident alerting patterns
