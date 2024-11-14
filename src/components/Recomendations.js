import React, { useCallback, useEffect, useState } from "react";
import {
  bookSearchURL,
  classics,
  kids,
  romance,
  trending,
} from "../utils/constant";
import Card from "./Card";

const Recomendations = () => {
  const [trendingBooks, settrendingBooks] = useState([]);
  const [classicsBooks, setClassicsBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [kidsBooks, setKidsBooks] = useState([]);
  const [error, setError] = useState(null);

  const fetchCategoryBooks = useCallback(
    (booksArray, storageKey, setCategory) => {
      const storedBooks = sessionStorage.getItem(storageKey);
      if (storedBooks) {
        setCategory(JSON.parse(storedBooks));
      } else {
        booksArray.forEach((book) => {
          fetchBook({
            bookName: book,
            setCategory,
            storageKey,
          });
        });
      }
    },
    []
  );

  const fetchBook = async ({ bookName, setCategory, storageKey }) => {
    try {
      const response = await fetch(bookSearchURL + bookName);

      if (!response.ok) {
        throw new Error(`Failed to fetch book: ${response.statusText}`);
      }

      const data = await response.json();
      setCategory((prevBooks) => {
        const updatedBooks = [...prevBooks, data];
        sessionStorage.setItem(storageKey, JSON.stringify(updatedBooks));
        return updatedBooks;
      });
    } catch (error) {
      console.error("Error fetching book data:", error);
      setError("Failed to load book data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCategoryBooks(trending, "trendingBooks", settrendingBooks);
    fetchCategoryBooks(classics, "classicsBooks", setClassicsBooks);
    fetchCategoryBooks(romance, "romanceBooks", setRomanceBooks);
    fetchCategoryBooks(kids, "kidsBooks", setKidsBooks);
  }, [fetchCategoryBooks]);

  return (
    <div className="p-2 w-full">
      <h3 className="text-3xl font-bold text-gray-700 px-3 pb-4">
        Finder Recommendations
      </h3>

      {/* Error message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Trending Books */}
      <div>
        <h4 className="text-orange-400 px-5 font-semibold text-2xl pb-2">
          Trending Books
        </h4>
        <div className="flex flex-wrap gap-2 w-full justify-center">
          {trendingBooks.map((book, index) => (
            <Card
              key={index}
              name={book.docs[0]?.title}
              cover={book.docs[0]?.cover_i}
              author={book.docs[0]?.author_name[0]}
              first_publish_year={book.docs[0]?.first_publish_year}
              language={book.docs[0]?.language}
              number_of_pages_median={book.docs[0]?.number_of_pages_median}
              ratings_average={book.docs[0]?.ratings_average}
            />
          ))}
        </div>
      </div>
      {/* Classics Books */}
      <div>
        <h4 className="text-orange-400 px-5 font-semibold text-2xl pb-2">
          Classic Books
        </h4>
        <div className="flex flex-wrap gap-2 w-full justify-center">
          {classicsBooks.map((book, index) => (
            <Card
              key={index}
              name={book.docs[0]?.title}
              cover={book.docs[0]?.cover_i}
              author={book.docs[0]?.author_name[0]}
              first_publish_year={book.docs[0]?.first_publish_year}
              language={book.docs[0]?.language}
              number_of_pages_median={book.docs[0]?.number_of_pages_median}
              ratings_average={book.docs[0]?.ratings_average}
            />
          ))}
        </div>
      </div>
      {/* Romance Books */}
      <div>
        <h4 className="text-orange-400 px-5 font-semibold text-2xl pb-2">
          Romance Books
        </h4>
        <div className="flex flex-wrap gap-2 w-full justify-center">
          {romanceBooks.map((book, index) => (
            <Card
              key={index}
              name={book.docs[0]?.title}
              cover={book.docs[0]?.cover_i}
              author={book.docs[0]?.author_name[0]}
              first_publish_year={book.docs[0]?.first_publish_year}
              language={book.docs[0]?.language}
              number_of_pages_median={book.docs[0]?.number_of_pages_median}
              ratings_average={book.docs[0]?.ratings_average}
            />
          ))}
        </div>
      </div>
      {/* Kids Books */}
      <div>
        <h4 className="text-orange-400 px-5 font-semibold text-2xl pb-2">
          Kids Books
        </h4>
        <div className="flex flex-wrap gap-2 w-full justify-center">
          {kidsBooks.map((book, index) => (
            <Card
              key={index}
              name={book?.docs[0]?.title}
              cover={book?.docs[0]?.cover_i}
              author={book.docs[0]?.author_name[0]}
              first_publish_year={book.docs[0]?.first_publish_year}
              language={book.docs[0]?.language}
              number_of_pages_median={book.docs[0]?.number_of_pages_median}
              ratings_average={book.docs[0]?.ratings_average}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recomendations;
