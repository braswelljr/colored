'use client';

import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { HiChevronLeft } from 'react-icons/hi2';
import Navbar from '~/components/layout/navbar';

export default function Page() {
  const router = useRouter();
  const [q, setQuery] = useQueryState('color', parseAsString.withDefault(''));

  return (
    <div className="">
      <Navbar />
      <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
        <div className="flex items-center justify-between">
          <div className="">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded bg-neutral-500 py-1 pr-2 pl-1 hocus:outline-hidden"
              onClick={() => router.back()}
            >
              <HiChevronLeft className="size-4 stroke-2" /> Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
