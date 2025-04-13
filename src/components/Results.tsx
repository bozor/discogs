import { Result } from "@/types/result";

import ResultItem from "./ResultItem";

import styles from './Results.module.css';

type ResultsProps = {
  results: Result[] | null;
}

const Results = ({ results } : ResultsProps) => {
  if(results?.length === 0) return <div className={styles.wrap}><p className={styles.message}>no results found</p></div>

  return (
    <div className={styles.wrap}>
      {
        results && results.map((result: Result) => (
          <ResultItem 
            key={result.id as number} 
            title={result.title as string} 
            thumb={result.thumb as string} 
            id={result.id as number}
          />
        ))
      }
    </div>
  )
}

export default Results;