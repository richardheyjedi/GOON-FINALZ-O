import { createClient } from '@supabase/supabase-js';
import { Mentor, ScheduleItem, Testimonial, ProductItem } from '../content';

// ─── Supabase Client ─────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

// ─── Types (DB row shape, snake_case) ────────────────────────────────────────

interface MentorRow {
  id: string;
  name: string;
  role: string;
  level: string;
  image: string;
  bio: string;
  detailed_bio: string | null;
  stats: Mentor['stats'];
  tags: string[];
  note: string;
  note_color: string;
  note_rotation: string;
  image_position: string | null;
  achievements: string[] | null;
}

interface EventRow {
  id: number;
  time: string;
  day: string;
  month: string;
  year: string;
  original_time: string | null;
  title: string;
  description: string;
  location: string | null;
  type: 'network' | 'break' | 'secret';
  icon_name: string;
  link: string | null;
  exclusive_tag: string | null;
  image: string | null;
}

interface ResultRow {
  id: string;
  subject: string;
  role: string;
  impact: string;
  impact_label: string | null;
  thumbnail: string;
  video: string | null;
}

interface ProductRow {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  type: string;
  duration: string | null;
  duration_label: string | null;
  date_tag: string | null;
  original_price: string | null;
  price: string | null;
  link: string | null;
}

// ─── Converters (DB → App interfaces) ────────────────────────────────────────

const toMentor = (row: MentorRow): Mentor => ({
  id: row.id,
  name: row.name,
  role: row.role,
  level: row.level,
  image: row.image,
  bio: row.bio,
  detailedBio: row.detailed_bio ?? undefined,
  stats: row.stats ?? [],
  tags: row.tags ?? [],
  note: row.note,
  noteColor: row.note_color,
  noteRotation: row.note_rotation,
  imagePosition: row.image_position ?? undefined,
  achievements: row.achievements ?? [],
});

const toEventRow = (item: Partial<ScheduleItem>): Omit<EventRow, 'id'> => ({
  time: item.time ?? '',
  day: item.day ?? '',
  month: item.month ?? '',
  year: item.year ?? '',
  original_time: item.originalTime ?? null,
  title: item.title ?? '',
  description: item.description ?? '',
  location: item.location ?? null,
  type: item.type ?? 'network',
  icon_name: item.iconName ?? 'Zap',
  link: item.link ?? null,
  exclusive_tag: item.exclusiveTag ?? null,
  image: item.image ?? null,
});

const toScheduleItem = (row: EventRow): ScheduleItem => ({
  time: row.time,
  day: row.day,
  month: row.month,
  year: row.year,
  originalTime: row.original_time ?? undefined,
  title: row.title,
  description: row.description,
  location: row.location ?? undefined,
  type: row.type,
  iconName: row.icon_name,
  link: row.link ?? undefined,
  exclusiveTag: row.exclusive_tag ?? undefined,
  image: row.image ?? undefined,
});

const toTestimonial = (row: ResultRow): Testimonial => ({
  id: row.id,
  subject: row.subject,
  role: row.role,
  impact: row.impact,
  impactLabel: row.impact_label ?? undefined,
  thumbnail: row.thumbnail,
  video: row.video ?? undefined,
});

const toProductItem = (row: ProductRow): ProductItem => ({
  id: row.id,
  title: row.title,
  description: row.description,
  iconName: row.icon_name,
  type: row.type,
  duration: row.duration ?? undefined,
  durationLabel: row.duration_label ?? undefined,
  dateTag: row.date_tag ?? undefined,
  originalPrice: row.original_price ?? undefined,
  price: row.price ?? undefined,
  link: row.link ?? undefined,
});

// ─── Mentor CRUD ─────────────────────────────────────────────────────────────

export const getMentors = async (): Promise<Mentor[]> => {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return [];
  return (data as MentorRow[]).map(toMentor);
};

export const upsertMentor = async (mentor: Mentor): Promise<boolean> => {
  const { error } = await supabase.from('mentors').upsert({
    id: mentor.id,
    name: mentor.name,
    role: mentor.role,
    level: mentor.level,
    image: mentor.image,
    bio: mentor.bio,
    detailed_bio: mentor.detailedBio ?? null,
    stats: mentor.stats,
    tags: mentor.tags,
    note: mentor.note,
    note_color: mentor.noteColor,
    note_rotation: mentor.noteRotation,
    image_position: mentor.imagePosition ?? null,
    achievements: mentor.achievements ?? null,
  });
  return !error;
};

export const deleteMentor = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from('mentors').delete().eq('id', id);
  return !error;
};

// ─── Event CRUD ───────────────────────────────────────────────────────────────

export const getEvents = async (): Promise<(ScheduleItem & { _dbId?: number })[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return [];
  return (data as EventRow[]).map(row => ({
    ...toScheduleItem(row),
    _dbId: row.id
  }));
};

export const insertEvent = async (item: Partial<ScheduleItem>): Promise<boolean> => {
  const { error } = await supabase.from('events').insert(toEventRow(item));
  return !error;
};

export const updateEvent = async (id: number, item: Partial<ScheduleItem>): Promise<boolean> => {
  const { error } = await supabase.from('events').update(toEventRow(item)).eq('id', id);
  return !error;
};

export const deleteEvent = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from('events').delete().eq('id', id);
  return !error;
};

// ─── Result CRUD ─────────────────────────────────────────────────────────────

export const getResults = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return [];
  return (data as ResultRow[]).map(toTestimonial);
};

export const upsertResult = async (result: Testimonial): Promise<boolean> => {
  const { error } = await supabase.from('results').upsert({
    id: result.id,
    subject: result.subject,
    role: result.role,
    impact: result.impact,
    impact_label: result.impactLabel ?? null,
    thumbnail: result.thumbnail,
    video: result.video ?? null,
  });
  return !error;
};

export const deleteResult = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from('results').delete().eq('id', id);
  return !error;
};

// ─── Product CRUD ────────────────────────────────────────────────────────────

export const getProducts = async (): Promise<ProductItem[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return [];
  return (data as ProductRow[]).map(toProductItem);
};

export const upsertProduct = async (product: ProductItem): Promise<boolean> => {
  const { error } = await supabase.from('products').upsert({
    id: product.id,
    title: product.title,
    description: product.description,
    icon_name: product.iconName,
    type: product.type,
    duration: product.duration ?? null,
    duration_label: product.durationLabel ?? null,
    date_tag: product.dateTag ?? null,
    original_price: product.originalPrice ?? null,
    price: product.price ?? null,
    link: product.link ?? null,
  });
  return !error;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  return !error;
};
