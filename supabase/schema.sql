

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  software text not null,
  summary text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now() not null
);

-- Indexes
create index if not exists sessions_user_id_idx on sessions(user_id);
create index if not exists sessions_created_at_idx on sessions(created_at desc);
create index if not exists messages_session_id_idx on messages(session_id);

-- Enable RLS
alter table sessions enable row level security;
alter table messages enable row level security;

-- Sessions RLS policies
create policy "Users can view their own sessions"
  on sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own sessions"
  on sessions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own sessions"
  on sessions for delete
  using (auth.uid() = user_id);

-- Messages RLS policies
create policy "Users can view messages in their sessions"
  on messages for select
  using (
    exists (
      select 1 from sessions
      where sessions.id = messages.session_id
      and sessions.user_id = auth.uid()
    )
  );

create policy "Users can insert messages in their sessions"
  on messages for insert
  with check (
    exists (
      select 1 from sessions
      where sessions.id = messages.session_id
      and sessions.user_id = auth.uid()
    )
  );
