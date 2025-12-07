// src/components/SearchBar/SearchBar.tsx
// Компонент хедера з формою пошуку фільмів
// Використовує Form Actions через action prop

import { useRef } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  // Form Action функція - приймає FormData
  const searchAction = (formData: FormData) => {
    const query = formData.get('query') as string;

    if (!query || !query.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query.trim());
    formRef.current?.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form 
          ref={formRef} 
          className={styles.form} 
          action={(formData: FormData) => searchAction(formData)}
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}