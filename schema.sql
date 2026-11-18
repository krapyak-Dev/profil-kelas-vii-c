-- Jalankan seluruh SQL ini di Supabase > SQL Editor > New query.
-- Setelah membuat user admin melalui Authentication > Users, isi email di bagian BOOTSTRAP ADMIN.
create table if not exists public.site_content (
  id integer primary key check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_content (id, content)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.app_admins enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content for select
to anon, authenticated
using (true);

drop policy if exists "Admins can insert site content" on public.site_content;
create policy "Admins can insert site content"
on public.site_content for insert
to authenticated
with check (exists (select 1 from public.app_admins a where a.user_id = auth.uid()));

drop policy if exists "Admins can update site content" on public.site_content;
create policy "Admins can update site content"
on public.site_content for update
to authenticated
using (exists (select 1 from public.app_admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.app_admins a where a.user_id = auth.uid()));

drop policy if exists "Admins can read own admin record" on public.app_admins;
create policy "Admins can read own admin record"
on public.app_admins for select
to authenticated
using (user_id = auth.uid());

-- Bucket gambar publik agar foto dapat ditampilkan di website.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('class-media', 'class-media', true, 6291456, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = 6291456,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif'];

drop policy if exists "Public can view class media" on storage.objects;
create policy "Public can view class media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'class-media');

drop policy if exists "Admins can upload class media" on storage.objects;
create policy "Admins can upload class media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'class-media'
  and exists (select 1 from public.app_admins a where a.user_id = auth.uid())
);

drop policy if exists "Admins can update class media" on storage.objects;
create policy "Admins can update class media"
on storage.objects for update
to authenticated
using (bucket_id = 'class-media' and exists (select 1 from public.app_admins a where a.user_id = auth.uid()))
with check (bucket_id = 'class-media' and exists (select 1 from public.app_admins a where a.user_id = auth.uid()));

drop policy if exists "Admins can delete class media" on storage.objects;
create policy "Admins can delete class media"
on storage.objects for delete
to authenticated
using (bucket_id = 'class-media' and exists (select 1 from public.app_admins a where a.user_id = auth.uid()));

-- BOOTSTRAP ADMIN:
-- 1) Buat akun lewat Supabase Dashboard > Authentication > Users > Add user.
-- 2) Ganti alamat email di bawah dengan email akun admin yang benar, lalu jalankan query ini.
-- insert into public.app_admins (user_id)
-- select id from auth.users where email = 'EMAIL_ADMIN_KAMU';
-- Jangan pernah memasukkan secret/service_role key ke file website.
