create index if not exists price_snapshots_metal_captured_at_idx
  on public.price_snapshots (metal, captured_at desc);
