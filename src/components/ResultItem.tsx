import Image from "next/image";
import Link from "next/link";

import styles from './ResultItem.module.css';

type ResultItemProps = {
  title: string;
  thumb: string;
  id: number;
}

const ResultItem = ({title, thumb, id} : ResultItemProps) => {
  return (
    <Link className={styles.wrap} href={`/release?id=${id}`} data-cy="search-result">
      {thumb && <Image src={thumb} alt={title} width={150} height={150} />}
      <strong>{title}</strong>
    </Link>
  )
}

export default ResultItem;