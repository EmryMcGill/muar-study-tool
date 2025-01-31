import React from "react";
//import "./Components.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

// create const var for our auth url

const AUTH_URL =
  // response_type=code is our authorization code we need to pass to get our access token
  // redirect_uri needs to be set in your spotify first then you put that link here
  // scope is defining the user parameters we want to access within the api

  `https://accounts.spotify.com/authorize?client_id=8000e5a74ec242939a1246f4295be86c
  &response_type=code
  &redirect_uri=http://localhost:3000/callback
  &scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Spotify() {
  const navigate = useNavigate();
  function returnLogin() {
    navigate("/");
  }
  return (
    <>
      <button className="home" onClick={(e) => returnLogin()}>
        Home
      </button>
      <Container
        className="d-flex justify-content-center align-items-center "
        style={{ minHeight: "100vh" }}
      >
        {/* hyperlink ref the auth url */}
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
          Login with Spotify;
        </a>
      </Container>
    </>
  );
}