# DART — Enterprise Software Support, Solved.

DART is a specialized AI support platform for enterprise software. Not a general-purpose chatbot — a focused expert system that knows Salesforce, HubSpot, Jira, QuickBooks, and SAP the way a senior consultant would: the exact menu paths, the common failure modes, the gotchas, and the fix.

The core insight: most business software problems are solved by the same 20% of knowledge. A dedicated AI that lives and breathes these platforms will always outperform a general assistant asked the same question. DART isn't ChatGPT with a different coat of paint — it's closer to having a senior IT consultant on call 24/7 who has seen every edge case and can walk you through the fix step by step.

**The user it's built for:** a non-technical business person who is blocked and frustrated. DART's job is to unblock them in one conversation, every time.

---

## What's Inside

### Specialist Agents

Each agent has a deep system prompt tuned specifically to its platform — its terminology, its architecture, its common failure modes.

| Agent | Covers |
|---|---|
| **Salesforce** | Profiles, Permission Sets, OWD, Role Hierarchy, Sharing Rules, Flows, Automation, Reports, Sales Cloud, Service Cloud |
| **HubSpot** | Workflows, contact sync, sequences, pipeline automation, integrations, deal stages |
| **Jira** | Project permissions, workflow transitions, issue types, schemes, agile boards, automation rules |
| **QuickBooks** | Reconciliation errors, bank feeds, payroll issues, tax categories, reporting |
| **SAP** | Authorization objects, role assignments, transaction codes, basis-level troubleshooting |
| **General** | Cross-platform triage and anything not covered above |

Agents don't give vague guidance. They give paths: *Setup → Object Manager → Opportunity → Fields & Relationships → Set Field-Level Security.*

### Core Features

- **Streaming responses** — answers appear token by token, no waiting for a full response
- **Chat history** — every session is persisted; pick up where you left off
- **Session summaries** — conversations auto-summarize to a single line for the sidebar
- **Stop generation** — cancel a response mid-stream
- **Regenerate** — re-run the last assistant response without re-sending your message
- **Voice mode** — talk to the agent hands-free via Vapi (Deepgram transcription + PlayHT voice)
- **Collapsible sidebar** — full session history with search and inline delete
- **Auth** — email/password sign-up and sign-in via Supabase

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| AI | Anthropic Claude (claude-sonnet-4-6) via `@anthropic-ai/sdk` |
| Database + Auth | Supabase (Postgres + Row Level Security) |
| Voice | Vapi (`@vapi-ai/web`) with Deepgram + PlayHT |
| Payments | Stripe (wired, not yet live) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## Roadmap

### Next Up

- **Markdown rendering** — agents respond with numbered steps, bold paths, and code blocks; rendering these properly is the next immediate fix
- **Raised token limit** — increasing `max_tokens` from 2048 to 8192 so long Salesforce or SAP walkthroughs don't get cut off

### Planned

- **Live Agent Takeover (Computer Use)** — the flagship feature. User shares their screen, DART's agent sees what's happening, takes control via a browser extension, navigates the software, and fixes the issue directly. Built on Anthropic's Computer Use API. The agent shows its work step by step with pause/confirm checkpoints before any destructive action.

- **Browser Extension** — companion extension for Chrome/Edge that enables the live takeover flow. Reads DOM context from the active Salesforce/HubSpot/Jira tab for far richer diagnosis than screenshots alone.

- **Proactive Diagnosis** — paste an error message or screenshot and DART identifies the root cause before you even describe the problem.

- **Admin Dashboard** — usage analytics, session volume, most common issues per platform. For IT leads managing a team using DART.

- **Pricing / Seats** — Stripe integration is wired. Tiered plans: individual, team, enterprise.

- **More Agents** — ServiceNow, Zendesk, Monday.com, NetSuite, Workday.

---

## Running Locally

```bash
# Clone
git clone https://github.com/your-username/dart.git
cd dart

# Install
npm install

# Environment
cp .env.example .env.local
# Fill in: ANTHROPIC_API_KEY, NEXT_PUBLIC_SUPABASE_URL,
#          NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_VAPI_PUBLIC_KEY

# Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key — powers all agent responses |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Vapi public key for voice mode |
| `STRIPE_SECRET_KEY` | Stripe secret key (optional, for billing) |

### Supabase Schema

Two tables required:

```sql
create table sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  software text not null,
  summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references sessions on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table sessions enable row level security;
alter table messages enable row level security;

create policy "Users own their sessions"
  on sessions for all using (auth.uid() = user_id);

create policy "Users own their messages"
  on messages for all using (
    session_id in (select id from sessions where user_id = auth.uid())
  );
```

---

## The Vision

Enterprise software is where work gets stuck. A Salesforce permission bug blocks a sales rep from closing a deal. A HubSpot workflow that stopped enrolling contacts quietly kills a campaign. A Jira permission scheme change locks an entire team out of their project. These problems have known solutions — but finding them means wading through documentation, Stack Overflow threads, and support queues that move at the speed of tickets.

DART short-circuits all of that. Every agent knows the platform deeply enough to diagnose from a one-line description and respond with the exact steps to fix it. And soon, to fix it for you.

---

*Built with the Anthropic API · Powered by Claude*
