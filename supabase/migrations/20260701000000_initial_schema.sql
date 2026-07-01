-- Prime Gold Trading — initial schema
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Branches
create table public.branches (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  country text default 'USA',
  latitude double precision not null,
  longitude double precision not null,
  phone text not null,
  opening_hours text,
  services text[] default '{}',
  published boolean default true,
  created_at timestamptz default now()
);

-- Collections
create table public.collections (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  sort_default text default 'featured',
  is_public boolean default true,
  created_at timestamptz default now()
);

-- Products
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description_html text,
  metal_type text not null check (metal_type in ('gold', 'silver', 'platinum')),
  weight text not null,
  purity text not null,
  base_price_minor integer not null default 0,
  currency text default 'USD',
  image_url text,
  in_stock boolean default true,
  published boolean default true,
  created_at timestamptz default now()
);

create table public.product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  title text default 'Default',
  price_minor integer not null,
  sku text,
  available boolean default true,
  weight_g numeric,
  created_at timestamptz default now()
);

create table public.collection_products (
  collection_id uuid references public.collections(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  position integer default 0,
  primary key (collection_id, product_id)
);

-- Price snapshots
create table public.price_snapshots (
  id uuid primary key default uuid_generate_v4(),
  metal text not null,
  currency text default 'USD',
  spot_minor integer not null,
  captured_at timestamptz default now()
);

-- Carts
create table public.carts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  session_token text unique,
  currency text default 'USD',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid references public.carts(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete cascade,
  qty integer not null default 1 check (qty > 0),
  unit_price_minor integer not null,
  created_at timestamptz default now()
);

-- Orders
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  order_number text unique not null,
  status text default 'pending' check (status in ('pending', 'paid', 'kyc_pending', 'processing', 'shipped', 'completed', 'cancelled')),
  payment_status text default 'unpaid',
  currency text default 'USD',
  subtotal_minor integer not null default 0,
  shipping_minor integer default 0,
  tax_minor integer default 0,
  total_minor integer not null default 0,
  shipping_method text,
  customer_email text not null,
  customer_name text,
  stripe_session_id text,
  placed_at timestamptz default now()
);

create table public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  product_title text not null,
  variant_id uuid,
  qty integer not null,
  unit_price_minor integer not null,
  line_total_minor integer not null
);

-- KYC
create table public.kyc_cases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  status text default 'pending' check (status in ('pending', 'submitted', 'under_review', 'approved', 'rejected')),
  retention_until timestamptz,
  created_at timestamptz default now(),
  verified_at timestamptz
);

create table public.kyc_documents (
  id uuid primary key default uuid_generate_v4(),
  kyc_case_id uuid references public.kyc_cases(id) on delete cascade,
  doc_type text not null,
  file_path text not null,
  status text default 'pending',
  uploaded_at timestamptz default now()
);

-- Appointments
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  branch_id uuid references public.branches(id) on delete set null,
  mode text default 'in_branch' check (mode in ('in_branch', 'at_home')),
  service_type text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  preferred_date date not null,
  preferred_time text not null,
  address text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Buyback quotes
create table public.buyback_quotes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  estimated_total_minor integer not null,
  currency text default 'USD',
  status text default 'draft',
  created_at timestamptz default now()
);

create table public.buyback_quote_items (
  id uuid primary key default uuid_generate_v4(),
  quote_id uuid references public.buyback_quotes(id) on delete cascade,
  material_type text not null,
  karat text,
  weight_g numeric not null,
  est_rate_minor integer not null,
  est_total_minor integer not null
);

-- Newsletter
create table public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  consent_at timestamptz default now(),
  status text default 'active'
);

-- CMS
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body_html text not null,
  image_url text,
  published_at timestamptz default now()
);

create table public.cms_pages (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  body_html text not null,
  page_type text default 'legal',
  published_at timestamptz default now()
);

-- Audit log
create table public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_type text,
  actor_id uuid,
  event_type text not null,
  object_type text,
  object_id uuid,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.branches enable row level security;
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.collection_products enable row level security;
alter table public.price_snapshots enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.kyc_cases enable row level security;
alter table public.kyc_documents enable row level security;
alter table public.appointments enable row level security;
alter table public.buyback_quotes enable row level security;
alter table public.buyback_quote_items enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.blog_posts enable row level security;
alter table public.cms_pages enable row level security;

-- Public read policies
create policy "Public read branches" on public.branches for select using (published = true);
create policy "Public read collections" on public.collections for select using (is_public = true);
create policy "Public read products" on public.products for select using (published = true);
create policy "Public read variants" on public.product_variants for select using (true);
create policy "Public read collection_products" on public.collection_products for select using (true);
create policy "Public read price_snapshots" on public.price_snapshots for select using (true);
create policy "Public read blog_posts" on public.blog_posts for select using (true);
create policy "Public read cms_pages" on public.cms_pages for select using (true);

-- User-owned data policies
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users read own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users read own order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);
create policy "Users read own kyc" on public.kyc_cases for select using (auth.uid() = user_id);
create policy "Users read own appointments" on public.appointments for select using (auth.uid() = user_id);

-- Storage bucket for KYC (run in Supabase dashboard or separate migration)
-- insert into storage.buckets (id, name, public) values ('kyc-documents', 'kyc-documents', false);
