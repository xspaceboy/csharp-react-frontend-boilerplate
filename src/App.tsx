import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Dashboard from "./components/pages/dashboard";
import Details from "./components/pages/details";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pokemon/:id" element={<Details />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
