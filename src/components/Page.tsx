'use client'
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { fetcher } from '@/utils/fetcher';

import Search from "./Search";
import Results from "./Results";
import Pagination from './Pagination';

import styles from './Page.module.css';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const artist = searchParams.get('artist');
  const [page, setPage] = useState(1);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const { data, error, isLoading } = useSWR(artist ? `https://api.discogs.com/database/search?token=${process.env.NEXT_PUBLIC_DISCOGS_TOKEN}&artist=${artist}&page=${page}&per_page=5` : null, fetcher)

  const handleSearch = async (artist: string) => {
    router.push(pathname + '?' + createQueryString('artist', artist))
  };

  return (
    <div className={styles.wrap}>
      <Search search={handleSearch} />
      {error && <span className={styles.error}>An error occured, refresh and try again</span>}
      {isLoading && <span className={styles.loading}>loading</span>}
      {
        data && 
        (
          <>
            <Results results={data && data.results} />
            <Pagination page={page} pages={data && data.pagination.pages} setPage={setPage} />
          </>
        )
      }
    </div>
  )
}

export default Page;