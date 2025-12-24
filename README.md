BeyondChats – Full Stack Engineering Assignment

This repository contains my submission for the BeyondChats Full-Time Remote Engineering Assignment.
The project is implemented as a single monolithic repository and covers all three phases described in the assignment, with clear trade-offs made under time constraints.

The focus of this submission is on system design, data flow correctness, and engineering judgement, rather than perfect infrastructure setup.

🧩 Project Overview

The system consists of three major components:

Laravel Backend

Scrapes articles from BeyondChats blogs

Stores articles in a database

Exposes CRUD APIs

Node.js LLM Pipeline

Enhances articles using competitor content and AI-assisted rewriting

React Frontend

Displays original and generated articles in a clean, responsive UI

🗂️ Repository Structure
/
├── backend/          # Laravel API (articles, scraping, CRUD)
├── llm-script-node/  # Node.js pipeline for article enhancement
├── frontend/         # React + Vite frontend
└── README.md

⚙️ Phase 1 – Laravel Backend (Completed)
Features

Scrapes 5 oldest articles from
https://beyondchats.com/blogs/

Stores articles in the database

CRUD APIs for managing articles

Supports original and generated article versions

API Endpoints
Method	Endpoint	Description
GET	/api/articles	Fetch all articles
POST	/api/articles	Create new article
GET	/api/articles/{id}	Fetch article by ID
PUT	/api/articles/{id}	Update article
DELETE	/api/articles/{id}	Delete article
Local Setup – Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve


Backend runs at:

http://127.0.0.1:8000

📸 Backend Output Screenshot
<img width="1678" height="871" alt="Screenshot 2025-12-24 at 1 10 41 PM" src="https://github.com/user-attachments/assets/2b04c8d0-aa3f-4e12-a922-ef2e4b65b039" />
<img width="1706" height="868" alt="Screenshot 2025-12-24 at 1 11 22 PM" src="https://github.com/user-attachments/assets/c326dadf-b49c-4b41-8068-b5c09cb83b96" />




🤖 Phase 2 – Node.js LLM Pipeline (Completed)

Phase 2 is implemented as a Node.js-based processing pipeline that enhances existing articles using external references and AI-assisted rewriting.

Implemented Flow

Fetches the latest article from the Laravel API

Searches Google for competing articles

Implemented using a mocked Google search module returning high-ranking, relevant blog links

This avoids captchas, rate limits, and unreliable scraping

Scrapes the main content from the top two competitor articles

Rewrites the original article using an LLM abstraction

For local execution, the LLM step is intentionally mocked

This avoids paid API dependencies while preserving full logic

Publishes the newly generated article back to the Laravel API

Links the generated article to the original via parent_article_id

Stores reference URLs for citation

Why Mocking Was Used

Google Search: mocked to focus on pipeline design rather than anti-bot handling

LLM Calls: mocked to avoid external API cost and ensure reproducibility

Both components are implemented behind clean interfaces and can be swapped with real services easily.

Local Setup – Phase 2
cd llm-script-node
npm install
node index.js

📸 Phase 2 Execution Screenshot
<img width="1430" height="697" alt="Screenshot 2025-12-24 at 1 12 37 PM" src="https://github.com/user-attachments/assets/8481bf85-5dd2-4b39-9136-7f6bceefb39b" />



🎨 Phase 3 – React Frontend (Completed)
Features

Fetches articles from backend APIs

Displays original and generated articles

Responsive, minimal UI

Clean separation of concerns

Local Setup – Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🌍 Live Frontend Link

🔗 https://beyond-chats-murex.vercel.app

The frontend is deployed successfully.
Full functionality is available in local setup where the backend is accessible.

📸 Frontend UI Screenshot
<img width="1060" height="491" alt="Screenshot 2025-12-24 at 1 15 17 PM" src="https://github.com/user-attachments/assets/514b9a41-8f53-41b8-bc17-a4aacd571d26" />

## 🌐 Deployment & Live Access

For this assignment, both the **frontend and backend are configured to run locally**.

- **Frontend**: React application running locally using `npm run dev`
- **Backend**: Laravel API running locally using `php artisan serve`
- **LLM Pipeline**: Node.js script executed locally

This local setup allows the full end-to-end pipeline (scraping → LLM processing → API persistence → UI rendering) to be demonstrated reliably without external deployment dependencies. The components can be deployed to cloud platforms with minimal configuration if required.

### Live Links (Local)

- Frontend: http://localhost:5173
- Frontend (Live): https://beyond-chats-murex.vercel.app/
- Backend API: http://127.0.0.1:8000


🏗️ Architecture & Data Flow
┌───────────────────────────┐
│   BeyondChats Blog Site   │
│  https://beyondchats.com  │
└─────────────┬─────────────┘
              │
              │ (Phase 1: Scraping)
              ▼
┌───────────────────────────┐
│     Laravel Backend       │
│  - Article CRUD APIs      │
│  - Database               │
└─────────────┬─────────────┘
              │
              │ (Fetch latest article)
              ▼
┌───────────────────────────┐
│   Node.js LLM Pipeline    │
│                           │
│  1. Fetch article         │
│  2. Google Search (mock)  │
│  3. Scrape competitors    │
│  4. LLM rewrite (mock)    │
│  5. Publish article       │
└─────────────┬─────────────┘
              │
              │ (Generated article)
              ▼
┌───────────────────────────┐
│     Laravel Backend       │
│  - Stores versions        │
│  - Links references       │
└─────────────┬─────────────┘
              │
              │ (Phase 3: Fetch articles)
              ▼
┌───────────────────────────┐
│     React Frontend        │
│  - Displays articles      │
│  - Responsive UI          │
└───────────────────────────┘

📌 Engineering Decisions & Trade-offs

Prioritised correctness and data flow over production deployment

Mocked unstable external dependencies (Google search, LLM APIs)

Avoided over-engineering under a strict 6–8 hour time constraint

Documented all assumptions and limitations transparently

👤 Author

Tannishtha Ghosh
Full Stack Engineer
GitHub: https://github.com/Tannishtha-Ghosh

📎 Final Notes

This submission reflects how I approach real-world engineering problems under constraints — focusing on clarity, maintainability, and conscious trade-offs rather than superficial completeness.
