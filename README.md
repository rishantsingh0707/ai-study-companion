# LearnIQ

> AI-powered study workspace for chatting with documents, generating quizzes, summaries, flashcards, interview questions, and more.

---

## Overview

LearnIQ is an AI-powered study platform that transforms your notes, PDFs, DOCX files, and text documents into an interactive learning workspace.

Instead of reading static notes, users can upload multiple documents into a workspace and interact with them using natural language.

---

## Features

- AI Chat with uploaded documents
- Multi-document workspaces
- AI-generated summaries
- Quiz generation
- Flashcard generation
- Interview question generation
- Explain complex topics in simple language
- Smart notes generation
- Google Authentication
- JWT Authentication
- Chat history
- Semantic search using vector embeddings
- Redis caching
- Responsive modern UI

---

## Tech Stack

### Frontend

- React 
- TypeScript
- Vite
- Tailwind CSS
- DaisyUI
- TanStack Query
- React Router
- Framer Motion
- React Markdown
- Three.js

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT
- Google OAuth

### AI

- Groq API
- Google Gemini Embeddings
- ChromaDB Cloud

---

## Architecture

```
User

↓

Create Workspace

↓

Upload Documents

↓

Extract Text

↓

Store Extracted Text (MongoDB)

↓

Generate Embeddings (Gemini)

↓

Store Vectors (Chroma)

↓

Semantic Search

↓

Groq LLM

↓

AI Response
```

---

## Project Structure

```
frontend/

backend/
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/rishantsingh0707/ai-study-companion
```

### Backend

```bash
cd backend

npm install

npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Backend

```env
PORT=

MONGODB_URI=

JWT_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GROQ_API_KEY=

GEMINI_API_KEY=

REDIS_URL=

CHROMA_API_KEY=

CHROMA_TENANT=

CHROMA_DATABASE=
```

Frontend

```env
VITE_API_URL=

VITE_GOOGLE_CLIENT_ID=
```

---

## Screenshots

Coming Soon

---

## Roadmap

- Streaming AI responses
- Workspace management
- Multiple document uploads
- Chat title generation
- Notes export
- Citation support
- Mobile optimization
- Dark / Light themes

---

## Future Improvements

- OCR support
- Audio transcription
- PDF annotations
- Mind maps
- Collaborative workspaces
- AI-generated study plans

---

## License

MIT License