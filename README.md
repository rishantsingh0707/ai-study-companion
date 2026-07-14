# AI Study Companion

An AI-powered study assistant that lets you upload your own documents and turns them into an interactive, RAG-powered learning experience — chat with your notes, generate summaries, quizzes, flashcards, and interview questions on demand.

## ✨ Features

- **Context-aware document chat** — ask questions about your uploaded material and get answers grounded in the actual content, powered by a Retrieval-Augmented Generation (RAG) pipeline.
- **Multi-format document support** — upload **PDF, DOCX, PPTX, and TXT** files with automated text extraction and chunking.
- **AI study tools**, including:
  - Conversational chat over your documents
  - Auto-generated summaries
  - Quizzes for self-testing
  - Flashcards for spaced repetition
  - Practice interview questions
- **Fast, responsive UI** built with React, TypeScript, and Tailwind CSS.
- **Efficient data fetching & caching** via React Query for a smooth, seamless experience.

## 🧠 How It Works

1. Documents are uploaded and processed through a secure pipeline that extracts and chunks text.
2. Text chunks are embedded using **Gemini embeddings** and stored in **ChromaDB Cloud** as a vector store.
3. When a user asks a question, relevant chunks are retrieved via similarity search and passed as context to **Groq's Llama 3.3 70B** model.
4. The model generates grounded, context-aware responses — chat answers, summaries, quizzes, flashcards, or interview questions.

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, React Query
**Backend:** Node.js, Express
**Database / Storage:** MongoDB, ChromaDB Cloud, Redis
**AI / ML:** Gemini Embeddings, Groq (Llama 3.3 70B)
**Deployment:** Vercel (frontend), Render (backend)

## 📂 Project Structure

```
ai-study-companion/
├── backend/          # Express API, RAG pipeline, document processing
├── frontend/         # React + TypeScript client
├── docker-compose.yml
└── docker-compose.dev.yml
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- ChromaDB Cloud account & API key
- Groq API key
- Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/rishantsingh0707/ai-study-companion.git
cd ai-study-companion

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory with the following:

```

REDIS_URL=your_redis_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET= your_client_secret
JWT_SECRET= your_jwt_secret
CHROMA_API_KEY = your_croma_key
CHROMA_TENANT = your_croma_tenant
CHROMA_DATABASE = your_database_name
PORT="5000"
FRONTEND_URL= "your_frontend_url"

```
Create a `.env` file in the `backend` directory with the following:

```
VITE_GOOGLE_CLIENT_ID= your_google_clientid

VITE_API_URL= your_backend_url

```

### Running Locally

```bash
# Using Docker Compose (recommended)
docker-compose -f docker-compose.dev.yml up

# Or run manually
cd backend && npm run dev
cd frontend && npm run dev
```

## 🌐 Live Demo

[Demo](https://learniq-steel.vercel.app)

## 👤 Author

**Rishant Singh**
[GitHub](https://github.com/rishantsingh0707) · [LinkedIn](https://www.linkedin.com/in/rishant-singh1408)