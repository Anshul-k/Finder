import { useEffect, useState } from "react";

const useFetchBook = ({ name }) => {
  const [book, setBook] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=" + name
      );
      const data = await response.json();
      setBook(data);
    };

    fetchBook();
  }, [name]);

  return book;
};

export default useFetchBook;
