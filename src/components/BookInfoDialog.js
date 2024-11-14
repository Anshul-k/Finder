import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

export default function BookInfoDialog({
  open,
  handleClose,
  name,
  cover,
  author,
  first_publish_year,
  language,
  number_of_pages_median,
  ratings_average,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="card-dialog-title"
        aria-describedby="card-dialog-description"
      >
        <DialogTitle id="card-dialog-title">
          <div className="flex w-full justify-between items-center">
            <h1 className="font-bold text-orange-400 text-2xl">{name}</h1>
            <Button onClick={handleClose}>
              <CloseIcon className="text-orange-300" />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col md:flex-row gap-2">
            <img
              className="rounded"
              src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
              alt="cover"
            />
            <div className="flex flex-col w-full justify-center flex-grow">
              <p className="text-gray-500 text-2xl pb-1">
                <span className="font-bold">Author: </span>
                {author}
              </p>
              <p className="text-gray-500 text-lg pb-1">
                <span className="font-bold">First Published year:</span>{" "}
                {first_publish_year}
              </p>
              <p className="text-gray-500 text-lg pb-1">
                <span className="font-bold">Language available in:</span>
              </p>
              <div className="grid grid-cols-2 gap-2 text-gray-500 text-base pb-2">
                {language?.map((lang, i) => (
                  <li key={i} className="list">
                    {lang}
                  </li>
                ))}
              </div>
              <div className="flex gap-3">
                <p className="text-gray-500 text-lg pb-1">
                  <span className="font-bold">Number of pages:</span>{" "}
                  <span className="text-orange-400">
                    {number_of_pages_median}
                  </span>
                </p>
                <p className="text-gray-500 text-lg pb-1">
                  <span className="font-bold">Average rating:</span>{" "}
                  <span className="text-orange-400">
                    {ratings_average
                      ? Math.round(ratings_average * 100) / 100
                      : 4.01}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
