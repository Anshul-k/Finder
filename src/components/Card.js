import React, { useState } from "react";
import BookInfoDialog from "./BookInfoDialog";

const Card = ({
  name,
  cover,
  author,
  first_publish_year,
  language,
  number_of_pages_median,
  ratings_average,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="rounded-lg shadow-md p-2 h-full w-full sm:w-56 md:w-60 lg:w-64 cursor-pointer"
        onClick={handleClickOpen}
      >
        <img
          className="rounded w-full sm:h-60 md:h-64 lg:h-80"
          src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
          alt="cover"
        />
        <div className="py-2 text-base truncate text-gray-500 font-medium">
          {name}
        </div>
      </div>
      <BookInfoDialog
        open={open}
        handleClose={handleClose}
        name={name}
        cover={cover}
        author={author}
        first_publish_year={first_publish_year}
        language={language}
        number_of_pages_median={number_of_pages_median}
        ratings_average={ratings_average}
      />
    </>
  );
};

export default Card;
