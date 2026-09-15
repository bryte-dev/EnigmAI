# EnigmAI

EnigmAI is a desktop riddle game prototype that combines a React/Electron interface with a local Python generation service and SQLite persistence.

## Portfolio Snapshot

- **Type:** Desktop application prototype
- **Observed stack:** TypeScript, React, Vite, Electron, SQLite, Python
- **What is visible in code:** multi-screen desktop UI, local riddle generation flow, answer validation, hint unlock logic, local database writes
- **What still needs author input:** original project brief, target audience, final demo assets, exact Python setup requirements

## Overview

This repository contains a desktop experience centered around AI-generated riddles. The Electron shell launches a React renderer, the Python service exposes a local `/generate` endpoint for riddle creation, and the app stores generated riddles in a local SQLite database.

## Goal / Objective

The code suggests a project focused on turning local AI text generation into a simple interactive game loop:

- generate a riddle,
- let the player submit an answer,
- reveal a hint after multiple failed attempts,
- persist generated riddles locally.

> TODO: Add the original context for the project (school project, personal experiment, hackathon, portfolio prototype, etc.).

## Visuals

- **Screenshots:** TODO
- **Product GIF / walkthrough:** TODO
- **Demo video / download link:** TODO

## Stack

### Desktop app

- React 19
- TypeScript
- Vite
- Electron
- Framer Motion
- Tailwind CSS

### Local services

- `better-sqlite3` for local persistence
- Python service using FastAPI
- `llama_cpp`-based local model inference

## Key Features

- Desktop UI with dedicated **home**, **game**, **settings**, and **help** screens
- Local riddle generation triggered from the app via a Python HTTP endpoint
- Client-side answer normalization before validation
- Hint reveal after multiple incorrect attempts
- Local SQLite table for storing generated riddles
- Electron preload bridge for isolated renderer access

## Architecture Summary

- **Renderer (`/src`)**: React screens and game flow
- **Electron main (`/electron/main.ts`)**: window lifecycle, IPC handlers, database access, Python service calls
- **Preload (`/electron/preload.ts`)**: safe bridge between renderer and Electron
- **Persistence (`/src/db.ts`)**: SQLite initialization and local tables
- **Python service (`/python_service/ia_service.py`)**: FastAPI endpoint that generates riddles from a local GGUF model

## Repository Structure

```text
electron/         Electron entry points and preload bridge
python_service/   Local AI generation service
src/              React application, screens, and SQLite setup
dist-electron/    Built Electron output
```

## Running Locally

### Prerequisites

- Node.js / npm
- Python 3
- A local GGUF model file expected by `python_service/ia_service.py`

### 1) Install JavaScript dependencies

```bash
npm install
```

### 2) Prepare the Python service

The repository does not currently include a pinned `requirements.txt`, so the exact environment should be documented later.

Suggested starting point based on imports:

```bash
pip install fastapi uvicorn llama-cpp-python
```

> TODO: Replace this with the exact dependency list and version-pinned setup instructions.

### 3) Provide the local model file

The Python service currently expects a model at:

```text
python_service/models/mistral-7b-instruct-v0.2.Q4_K_M.gguf
```

> TODO: Document the intended model, download source, and any machine requirements.

### 4) Start the Python service

```bash
uvicorn python_service.ia_service:app --host 127.0.0.1 --port 8000
```

### 5) Start the desktop app

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run electron:start
```

## Notes to Fill In Later

- Final product description in one sentence
- Why the project was built
- Screenshots / GIFs
- Exact Python setup and model requirements
- Packaging / distribution steps for non-developers
- Known limitations and planned improvements

## Honest Status

This README intentionally stays close to what is directly visible in the repository. If you want to use EnigmAI in a portfolio, the next high-impact improvements are:

1. add screenshots or a short GIF,
2. document the Python environment and model setup precisely,
3. add a short project-context paragraph explaining the intended audience and use case.
