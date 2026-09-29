
import 'server-only';

import { Pool } from 'pg';



const pool = new Pool({

  host: process.env.DB_HOST || 'db',

  port: 5432,

  user: process.env.POSTGRES_USER || 'app_admin',

  password: process.env.POSTGRES_PASSWORD || 'postgres',

  database: process.env.POSTGRES_DB || 'job_platform',

  max: 20

});



function decodeHtml(str: string) {

  if (!str) return '';

  return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');

}



function formatJob(row: any) {

  const id = String(row.id || '');

  const ct = (row.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const cc = (row.companyName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const rawDesc = decodeHtml(row.description);



  return {

    id,

    slug: row.slug || `${ct}-at-${cc}-${id.slice(0, 8)}`,

    title: row.title || 'Untitled',

    company: row.companyName || 'Company',

    type: 'Full-time',

    description: rawDesc.length > 30 ? rawDesc : '<p>Actively hiring.</p>',

    apply_url: row.applyUrl || '#',

    posted_date: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),

    job_identifier: id,

    job_source_name: 'ATS Live Feed',

    career_level: ['Mid Level'],

    workplace_type: 'Remote',

    remote_region: 'Worldwide',

    location: row.location || 'Remote'

  };

}




export async function getJobs(): Promise<any[]> {

  try {

    const res = await pool.query('SELECT "id", "title", "companyName", "location", "applyUrl", "slug", "createdAt" FROM "Job" WHERE published = true ORDER BY "createdAt" DESC LIMIT 100000');

    return res.rows.map(formatJob);

  } catch { return []; }

}



export async function getTotalJobCount(): Promise<number> {

  try {

    const res = await pool.query('SELECT count(*)::int AS total FROM "Job" WHERE published = true');

    return res.rows[0]?.total || 0;

  } catch { return 0; }

}



export async function getJobBySlug(slug: string): Promise<any | null> {

  try {

    let res = await pool.query('SELECT * FROM "Job" WHERE "slug" = $1 LIMIT 1', [slug]);

    if (res.rows.length === 0) res = await pool.query('SELECT * FROM "Job" WHERE "slug" LIKE $1 || \'%\' LIMIT 1', [slug]);

    

    if (res.rows.length === 0) {

      const parts = slug.split('-at-');

      if (parts.length === 2) {

        const tWords = parts[0].split('-').filter(w => w.length > 2).join('%');

        const cWords = parts[1].split('-')[0];

        res = await pool.query('SELECT * FROM "Job" WHERE "title" ILIKE $1 AND "companyName" ILIKE $2 LIMIT 1', [`%${tWords}%`, `%${cWords}%`]);

      }

    }

    if (res.rows.length === 0) return null;

    return formatJob(res.rows[0]);

  } catch { return null; }

}

