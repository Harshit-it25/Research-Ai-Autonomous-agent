<div align="center">

# 🔬 ResearchAI — Autonomous Research Agent

**Generate comprehensive, AI-powered research reports in seconds.**  
Powered by Gemini 2.0 Flash with real-time web grounding.

![Version](https://img.shields.io/badge/version-1.0.0-indigo)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-6.2-purple)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## ✨ Features

- **AI-Powered Research** — Uses Gemini 2.0 Flash with Google Search grounding to generate factual, up-to-date reports
- **Multi-Step Pipeline** — Visual progress tracker showing each stage: intent analysis → search → extraction → synthesis
- **Rich Report Output** — Full Markdown rendering with tables, headers, and citations via `react-markdown`
- **Copy & Download** — Export any report as a `.md` file or copy to clipboard instantly
- **Search History** — Saves your last 5 queries locally for quick re-access
- **Polished Dark UI** — Bento grid layout with smooth Framer Motion animations

---

## 🖥️ Demo

> Enter any research query — from *"Impact of solid-state batteries on EV range 2025"* to *"Competitive landscape of AI coding assistants"* — and get a structured report in seconds.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (motion/react) |
| AI | Google Gemini 2.0 Flash (`@google/genai`) |
| Markdown | react-markdown + remark-gfm |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- A [Google AI Studio](https://aistudio.google.com/) API key (free)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/researchai-autonomous-agent.git
cd researchai-autonomous-agent

# 2. Install dependencies
npm install

# 3. Set up your environment
cp .env.example .env.local
```

### Configuration

Open `.env.local` and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

> **Get a free API key** at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
researchai/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── SearchInput.tsx     # Query input with keyboard shortcuts
│   │   ├── ProgressStepper.tsx # Animated pipeline progress tracker
│   │   └── ReportDisplay.tsx   # Markdown report renderer with actions
│   ├── services/
│   │   └── gemini.ts           # Gemini API integration + research logic
│   ├── lib/
│   │   └── utils.ts            # Utility helpers (cn, etc.)
│   ├── App.tsx                 # Root component + state management
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🧠 How It Works

ResearchAI runs a 6-stage research pipeline on every query:

1. **Intent Analysis** — Parses and expands the research query
2. **Global Search** — Uses Gemini's Google Search grounding to pull live web data
3. **Extraction** — Pulls key findings from relevant sources
4. **Summarization** — Condenses statistical data and unique insights
5. **Deduplication** — Removes redundant or conflicting information
6. **Synthesis** — Assembles a final structured Markdown report

All stages are orchestrated through a single Gemini 2.0 Flash call with web grounding enabled, ensuring reports are grounded in real, current data.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove the `dist/` folder |

---

## ⚠️ Important Notes

- **API Key Security** — Never commit your `.env.local` file. It is already listed in `.gitignore`.
- **Rate Limits** — The free Gemini API tier has usage limits. If you hit a 429 error, check your [quota settings](https://aistudio.google.com/).
- **Report Quality** — Output quality depends on Gemini's web grounding availability for your query topic.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨💻 Author

<div align="center">

**Harshit Ranbhare**  
B.Tech Information Technology

[![GitHub](https://img.shields.io/badge/GitHub-HarshitRanbhare-181717?logo=github)](https://github.com/HarshitRanbhare)

</div>

---

<div align="center">

Built with ❤️ by **Harshit Ranbhare** — B.Tech IT

</div>
