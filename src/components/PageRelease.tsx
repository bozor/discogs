'use client'

import useSWR from "swr";
import { useSearchParams } from "next/navigation";

import { fetcher } from "@/utils/fetcher";

import Release from "./Release";

import styles from './PageRelease.module.css'

const getImage = (image: Record<string, string | number>) => {
  if (image) {
    return {
      uri: image.uri as string,
      width: image.width as number,
      height: image.height as number
    }
  }

  return null;
}

const PageRelease = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data, error, isLoading } = useSWR(id ? `https://api.discogs.com/releases/${id}?token=${process.env.NEXT_PUBLIC_DISCOGS_TOKEN}`: null, fetcher)

  return (
    <div className={styles.wrap}>
      {error && <span className={styles.error}>An error occured, refresh and try again</span>}
      {isLoading && <span className={styles.loading}>loading</span>}
      {data && (
        <Release 
          have={data.community.have || 0}
          want={data.community.want || 0}
          artist={data.artists.map((artist: Record<string, string>) => artist.name).join(", ")}
          genres={data.genres}
          title={data.title}
          year={data.year}
          image={getImage(data.images[0])}
        />
      )}
      {
        (!data && !isLoading) && <p data-cy="no-release-id">Please specify a release id</p>
      }
    </div>
  )
}

export default PageRelease;