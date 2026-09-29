export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { HomePage } from '@/components/home/HomePage';
import config from '@/config';
import { getJobs, getTotalJobCount } from '@/lib/db/airtable.server';
import { generateMetadata } from '@/lib/utils/metadata';

// Add metadata for SEO
export const metadata: Metadata = generateMetadata({
  title: config.title,
  description: config.description,
  path: '/',
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: `${config.title} - ${config.description}`,
      },
    ],
  },
});

// Revalidate every 5 minutes


export default async function Home() {
  const [jobs, totalJobCount] = await Promise.all([getJobs(), getTotalJobCount()]);
  return <HomePage initialJobs={jobs} />;
}
