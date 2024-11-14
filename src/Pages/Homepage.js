import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import Recomendations from "../components/Recomendations";
import Footer from "../components/Footer";
import { bookSearchURL } from "../utils/constant";
import Card from "../components/Card";
import { GoogleGenerativeAI } from "@google/generative-ai";
import CircularProgress from "@mui/material/CircularProgress";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Homepage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("Book");
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geminiError, setGeminiError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBookSearch = async () => {
    setLoading(true);
    setBookData([]);
    setErrorMessage("");
    setGeminiError(false);

    try {
      if (searchType === "Book") {
        const response = await fetch(bookSearchURL + searchValue);
        if (!response.ok) throw new Error("Failed to fetch book data.");

        const data = await response.json();
        setBookData([data]);
      } else if (searchType === "AI") {
        const gptQuery =
          "Act as a Book Library and only 1 book name for the given query:" +
          searchValue;
        const dataResponse = await model.generateContent(gptQuery);
        const dataResult = dataResponse?.response?.text();

        const response = await fetch(bookSearchURL + dataResult);
        if (!response.ok) throw new Error("Failed to fetch book data from AI.");

        const data = await response.json();
        setBookData([data]);
      }
    } catch (error) {
      setErrorMessage("Error while fetching data. Please try again later.");
      setGeminiError(true);
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setSearchValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBookSearch();
    }
  };

  console.log(bookData);

  return (
    <div className="flex w-full flex-col justify-center items-center">
      {/* NavBar */}
      <Navbar />

      {/* Content Section */}
      <div className="flex flex-col md:pt-8 justify-center items-center p-4">
        <h1 className="md:text-7xl text-3xl font-sans font-extrabold text-gray-700">
          Finder
        </h1>
        <p className="text-gray-500 font-semibold text-xl pt-5 text-center">
          Uncover Your Next Great Read - Find, Explore, and Connect with Books
          You'll Love!
        </p>
      </div>

      {/* Input Section */}
      <div className="md:pt-6 pt-3 p-4 md:p-0 md:w-2/3 lg:w-1/2 w-full">
        <div className="rounded-full p-2 px-3 flex bg-gray-50 shadow-md items-center">
          <input
            value={searchValue}
            placeholder={`Search with ` + searchType}
            className="ml-2 w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="ml-2 p-2 rounded-md bg-white text-gray-700 focus:outline-none border border-gray-300 shadow-sm"
          >
            <option value="Book">Book</option>
            <option value="AI">AI</option>
          </select>
          <div
            className="rounded-full bg-orange-500 ml-2 p-2 cursor-pointer hover:bg-orange-600 transition-all"
            onClick={handleBookSearch}
          >
            <SearchIcon className="text-gray-100" />
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-6">
          <CircularProgress color="inherit" />
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 font-semibold mt-4">{errorMessage}</div>
      )}

      {/* Search Results */}
      {bookData.length !== 0 && !loading && !geminiError && (
        <div className="p-3 md:mt-6 mt-4 w-full flex justify-center items-center">
          <div className="w-full md:w-4/5 bg-gray-50 rounded-md p-4">
            <h2 className="text-orange-400 font-bold text-2xl">
              Search Result:
            </h2>
            {bookData.map((book, index) => (
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
      )}

      {/* Recommendation Display Section */}
      <div className="p-3 md:mt-6 mt-4 w-full flex justify-center items-center">
        <div className="w-full md:w-4/5 bg-gray-50 rounded-md">
          <Recomendations />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
