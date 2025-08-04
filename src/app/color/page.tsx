'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { Swatch } from '~/components/colors/swatch';
import Navbar from '~/components/layout/navbar';
import { Search } from '~/components/layout/search';
import { circuit } from '~/utils/backgrounds';

export default function Page() {
  const [searchQuery, setSearchQuery] = useQueryState('color', parseAsString.withDefault(''));

  return (
    <div className="">
      <header
        className="w-full bg-yellow-500 dark:bg-neutral-950"
        style={{ backgroundImage: circuit }}
      >
        <Navbar />
        <div className="flex gap-2 bg-yellow-100/95 px-3 py-4 backdrop-blur-sm md:px-12 lg:px-20 xl:px-28 dark:bg-neutral-900/95">
          <Search
            query={searchQuery}
            onChangeQuery={setSearchQuery}
            className="w-full grow"
            placeholder={`Search ${searchQuery && `"${searchQuery}"`}`}
          />
          <Swatch className="" />
        </div>
      </header>
      <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
        <div className="flex items-center justify-between">
          <div className=""></div>
        </div>
      </main>
    </div>
  );
}
