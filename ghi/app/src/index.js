import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

async function loadLyraViews() {
  let songsData, categoriesData;

  const songsResponse = await fetch(
    `${process.env.REACT_APP_DJANGO_SERVICE}api/songs/`
  );
  const categoriesResponse = await fetch(
    `${process.env.REACT_APP_DJANGO_SERVICE}api/categories`
  );

  // if (songsResponse.ok) {
  //   songsData = await songsResponse.json();
  //   console.log("songs in db:", songsData);
  // } else {
  //   console.error(songsResponse);
  // }

  if (categoriesResponse.ok) {
    categoriesData = await categoriesResponse.json();
    console.log("categories in db:", categoriesData);
  } else {
    console.error(categoriesResponse);
  }

  root.render(
    <React.StrictMode>
      <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
      <App
        songs={songsData}
        //can change this to songsData.{something} to get specific parts of the song in list, like songsData.title or songsData.artist
        categories={categoriesData}
        //same with this
      />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

loadLyraViews();
reportWebVitals();
