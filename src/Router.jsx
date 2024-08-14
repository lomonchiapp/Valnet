import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { Dashboard } from "./scenes";
import { Tickets } from "./scenes/tickets";
import { Queues } from "./scenes/queues";
import { Login } from "./scenes/login";
import { ProtectedRoute } from "./scenes/ProtectedRoute";
import { Services } from "./scenes/services";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="queues" element={<Queues />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;