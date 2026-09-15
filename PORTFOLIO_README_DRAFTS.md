# Portfolio README Drafts for Other Repositories

This file contains recruiter-friendly README drafts for the other repositories listed in the issue.

## Scope note

- **EnigmAI** was updated directly in this repository.
- The repositories below are **not checked out locally in this session**, so they could not be edited in place from here.
- Each draft below is based only on visible GitHub metadata, public file structure, package/project files, and existing README content when available.
- Where information was missing or unclear, explicit **TODO** placeholders were added instead of guessing.

---

## SmartJam — suggested `README.md`

# SmartJam

SmartJam is a C# desktop project built as a **TPI project for note analysis and musical accompaniment generation**.

## Overview

This repository presents a music-focused desktop application centered on real-time note detection and related audio tooling. Based on the codebase, SmartJam includes signal analysis, a graphical desktop interface, and supporting services around pitch detection and accompaniment generation.

## Goal / Objective

The project appears to explore how a desktop application can:

- capture or simulate an audio signal,
- detect the played note in real time,
- expose music-oriented feedback in a usable UI,
- experiment with accompaniment-related logic.

> TODO: Add the original TPI brief, evaluation context, and what problem SmartJam was meant to solve for musicians.

## Visuals

- **App screenshots:** TODO
- **Pitch detection demo GIF:** TODO
- **Short demo video:** TODO

## Stack

- C#
- .NET 10
- Avalonia UI
- NAudio
- NWaves
- CommunityToolkit.Mvvm

## Key Features

- Real-time note / pitch analysis
- Desktop UI built with Avalonia
- Internal sine-wave test source visible in the services layer
- Dedicated pitch detection service
- Accompaniment generator service present in the codebase
- Separate views and settings workflow

## Architecture Summary

- `src/SmartJam/Views/`: desktop views and windows
- `src/SmartJam/ViewModels/`: UI state and settings logic
- `src/SmartJam/Services/PitchDetectorService.cs`: pitch detection logic
- `src/SmartJam/Services/SineAudioSource.cs`: internal signal source for testing
- `src/SmartJam/Services/AccompanimentGeneratorService.cs`: accompaniment-related logic

## Run Locally

### Prerequisites

- .NET 10 SDK
- Windows-compatible audio setup if testing with live input

### Start the app

```bash
dotnet run --project src/SmartJam/SmartJam.csproj
```

## Notes to Fill In Later

- What kind of accompaniment generation is implemented today vs. planned
- Supported input hardware / audio interfaces
- Performance notes and detection accuracy expectations
- Screenshots and demo assets
- Whether this was presented, graded, or used in a real context

---

## CityPulse — suggested `README.md`

# CityPulse

CityPulse is an **event finder for your city** built as a modern web application for discovering, creating, and managing local events.

## Overview

This project is positioned like a product-oriented event platform: users can browse events, manage participation, and interact with event-related content. The codebase shows a full-stack web application with authentication, persistence, media uploads, and payment-related integrations.

## Goal / Objective

CityPulse appears to be designed to make local event discovery and participation more accessible through a polished web experience.

> TODO: Add the original project context, target city/market, and whether this was a product concept, school project, or startup-style prototype.

## Visuals

- **Landing page screenshot:** TODO
- **Event feed / event details GIF:** TODO
- **Live demo link:** TODO

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Firebase / Firestore
- Better Auth
- Cloudinary
- Stripe

## Key Features

- Authentication flow
- Event creation and editing
- Event discovery with filtering/search
- Registration / participation workflow
- Comments and rating system
- User profile and organizer dashboard
- Responsive UI and dark mode

## Architecture Summary

- `app/`: App Router pages and API routes
- `components/`: UI building blocks and feature components
- `lib/`: auth, Firebase, and utility modules
- `types/`: shared TypeScript types

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

> TODO: Add a concise “minimum required environment variables” section for quick setup if you want recruiters or clients to run it easily.

## Notes to Fill In Later

- Screenshots and demo URL
- Which features are production-ready vs. prototype-level
- Any seeded demo account
- Hosting / deployment link

---

## FlixMatch — suggested `README.md`

# FlixMatch

FlixMatch is a **“Tinder for Movies”** concept: a movie discovery application with account features, watchlist management, and media exploration workflows.

## Overview

The repository combines a React/Vite front end with a Node/Express backend and Prisma-managed persistence. Public code and metadata show account flows, movie detail pages, search results, and multiple personal library views.

## Goal / Objective

FlixMatch appears to focus on making movie discovery and personal curation more engaging through a swipe-friendly or recommendation-oriented product concept.

> TODO: Clarify how the “Tinder for Movies” interaction works in the current version (swipe UI, recommendation logic, matching metaphor, or branding only).

## Visuals

- **Home screen screenshot:** TODO
- **Discovery / recommendation GIF:** TODO
- **Live demo link:** TODO

## Stack

- JavaScript
- React
- Vite
- Express
- Prisma
- PostgreSQL
- Material UI
- TMDB API

## Key Features

- Movie and series discovery
- Authentication and account management
- Watchlist and favorites
- “Seen” and “Junk” library views
- Search results and advanced search
- Movie detail pages

## Architecture Summary

- `flixmatch/src/pages/`: front-end pages such as Home, SearchResults, Watchlist, Favorites, Account, and MovieDetail
- `prisma/`: database schema and migrations
- server layer present through `npm start`

## Run Locally

```bash
cd flixmatch
npm install
npm run dev
```

> TODO: Document the exact backend start command, required environment variables, database setup, and TMDB API configuration.

## Notes to Fill In Later

- Exact user journey for the “match” concept
- Demo credentials
- Environment variables
- Deployment link
- Screenshots / GIFs

---

## JamLogFrontEnd — suggested `README.md`

# JamLogFrontEnd

JamLogFrontEnd is the **front-end client for JamLog**, built as a TypeScript-based Expo / React Native application.

## Overview

This repository contains the mobile-facing interface for the JamLog ecosystem. The visible structure shows authentication routes plus app routes related to projects and profile management.

## Goal / Objective

The app appears to support musicians in accessing JamLog on mobile, with flows around authentication, project navigation, and user profile access.

> TODO: Add a short product sentence that explains the core mobile use case in plain language.

## Visuals

- **Login/register screenshots:** TODO
- **Projects screen screenshot:** TODO
- **Short mobile demo GIF:** TODO
- **Expo demo / TestFlight / APK link:** TODO

## Stack

- TypeScript
- Expo
- React Native
- Expo Router
- React Navigation
- Axios
- Expo Secure Store

## Key Features

- Authentication flow (login/register)
- App routing with Expo Router
- Project-related screen(s)
- Profile screen
- Mobile-first client for the JamLog platform

## Architecture Summary

- `JamLog-frontend/app/auth/`: authentication screens
- `JamLog-frontend/app/(app)/`: authenticated application routes
- `JamLog-frontend/app/index.tsx`: auth-aware redirect entry point

## Run Locally

```bash
cd JamLog-frontend
npm install
npm start
```

You can then launch the project in Expo Go, a simulator, or a device from the Expo CLI.

## Notes to Fill In Later

- API base URL / environment variable setup
- Screenshots and demo assets
- Whether the app targets iOS, Android, or both
- What actions a musician can complete from mobile today

---

## AUDIOBLOCKS — suggested `README.md`

# AUDIOBLOCKS

AUDIOBLOCKS is a C# desktop audio project built around a **live audio FX engine**.

## Overview

Based on the project structure and application metadata, AUDIOBLOCKS is a desktop application for real-time audio processing. The repository includes a dedicated audio engine, effects library, preset management, and audio settings workflows.

## Goal / Objective

The code suggests a project aimed at giving musicians or audio users a desktop environment for experimenting with live effects and signal routing.

> TODO: Add the original project context, target users, and whether the app was built for performance, experimentation, or production use.

## Visuals

- **Main interface screenshot:** TODO
- **Effects chain / preset workflow GIF:** TODO
- **Demo video:** TODO

## Stack

- C#
- .NET 8
- Avalonia UI
- NAudio

## Key Features

- Live audio processing engine
- Built-in effects library
- Preset management
- Audio settings window
- Device enumeration and routing controls
- Support for multiple driver modes visible in code, including WASAPI and ASIO

## Effects Visible in the Repository

- Chorus
- Compressor
- Delay
- Distortion
- EQ / Graphic EQ
- Fuzz
- Gain
- Noise Gate
- Reverb

## Architecture Summary

- `AudioBlocks.App/Audio/`: core audio engine logic
- `AudioBlocks.App/Effects/`: individual effect implementations
- `AudioBlocks.App/PresetManager.cs`: preset persistence/management
- `AudioBlocks.App/AudioSettingsWindow.axaml.cs`: device, routing, and driver configuration
- `AudioBlocks.App/EffectsLibraryWindow.axaml(.cs)`: effect browsing / management UI

## Run Locally

```bash
dotnet run --project AudioBlocks.App/AudioBlocks.App.csproj
```

> TODO: Add OS requirements, supported audio hardware details, and any ASIO-specific setup steps.

## Notes to Fill In Later

- Screenshots and demo footage
- Typical use case (guitar, vocals, live routing, experimentation, etc.)
- Latency/performance expectations
- Packaging / installer instructions

---

## JamLog — suggested `README.md`

# JamLog

JamLog is an app made to help musicians organize their work, projects, and related resources.

## Overview

The visible backend structure suggests a music-oriented organization platform with authentication and data models for users, projects, project members, events, songs, and files.

## Goal / Objective

JamLog appears to focus on helping musicians keep collaborative work structured: managing projects, planning events, tracking songs, and storing related files in one system.

> TODO: Add the original product vision and explain whether JamLog is intended for solo musicians, bands, or broader creative teams.

## Visuals

- **System overview graphic:** TODO
- **Admin / project workflow screenshot:** TODO
- **Demo link:** TODO

## Stack

- JavaScript
- Node.js
- Express
- Prisma
- PostgreSQL
- JWT-based authentication (visible from dependencies)

## Key Features

- Registration and login routes
- Data model for users and owned projects
- Project membership tracking
- Event and song entities linked to projects
- File attachments linked to songs and events

## Architecture Summary

- `src/index.js`: Express server bootstrap and CORS setup
- `src/routes/authRoutes.js`: authentication endpoints
- `src/routes/userRoutes.js`: user-related routes
- `prisma/schema.prisma`: application data model

## Run Locally

```bash
npm install
npm run dev
```

> TODO: Add the required `.env` variables (`DATABASE_URL`, JWT secret, and any other runtime configuration), Prisma migration steps, and the exact frontend/client integration notes.

## Notes to Fill In Later

- API documentation or sample requests
- Relationship between JamLog and JamLogFrontEnd
- Deployment setup
- Screenshots or architecture diagram

---

## sourshots-web — suggested `README.md`

# sourshots-web

sourshots-web is a **TypeScript-heavy web project**.

## Overview

The repository itself was not accessible from this session, so this draft intentionally stays conservative. Use this README as a polished starting point and replace the TODO sections with verified details from the codebase.

## Goal / Objective

> TODO: Describe the app in one honest sentence. Example prompts:
>
> - What problem does sourshots-web solve?
> - Who is it for?
> - Is it a client project, a product prototype, or a portfolio experiment?

## Visuals

- **Homepage screenshot:** TODO
- **Feature demo GIF:** TODO
- **Live demo link:** TODO

## Stack

- TypeScript
- TODO: add framework/runtime after checking `package.json` and project structure

## Key Features

- TODO: list 4–6 features that are clearly visible in the code

## Architecture Summary

- TODO: summarize the main folders/modules once the repository is available

## Run Locally

```bash
# TODO: replace with the actual install and run commands from the repo
npm install
npm run dev
```

## Notes to Fill In Later

- Final product summary
- Exact stack
- Environment variables
- Screenshots / GIFs
- Deployment link
