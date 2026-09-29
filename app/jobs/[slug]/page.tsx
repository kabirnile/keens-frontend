
import { notFound } from 'next/navigation';

import { getJobBySlug } from '@/lib/db/airtable.server';

import Link from 'next/link';



export const dynamic = 'force-dynamic';

export const revalidate = 0;



export default async function JobPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {

  const resolved = await Promise.resolve(params);

  const slug = resolved?.slug;

  if (!slug) notFound();



  const job = await getJobBySlug(slug);

  if (!job) notFound();



  return (

    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto space-y-6">

        <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">

          &larr; Back to all jobs

        </Link>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">

            <div>

              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">

                Verified ATS Role

              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{job.title}</h1>

              <p className="text-slate-600 font-medium mt-1">{job.company} &bull; {job.location}</p>

            </div>

            <a

              href={job.apply_url}

              target="_blank"

              rel="noopener noreferrer"

              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition whitespace-nowrap"

            >

              Apply Directly &rarr;

            </a>

          </div>



          <div className="py-6 border-b border-slate-100">

            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Role Overview</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">

              <div><span className="text-slate-400 block text-xs">Workplace</span><span className="font-semibold text-slate-800">{job.workplace_type}</span></div>

              <div><span className="text-slate-400 block text-xs">Career Level</span><span className="font-semibold text-slate-800">{job.career_level?.[0] || 'Mid Level'}</span></div>

              <div><span className="text-slate-400 block text-xs">Type</span><span className="font-semibold text-slate-800">{job.type}</span></div>

              <div><span className="text-slate-400 block text-xs">Source</span><span className="font-semibold text-slate-800">{job.job_source_name}</span></div>

            </div>

          </div>



          <div className="pt-6">

            <h2 className="text-xl font-bold text-slate-900 mb-4">Job Description & Requirements</h2>

            <div

              className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-normal"

              dangerouslySetInnerHTML={{ __html: job.description }}

            />

          </div>

        </div>

      </div>

    </div>

  );

}

