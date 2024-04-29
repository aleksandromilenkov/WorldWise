import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import PageNav from "./components/PageNav/PageNav";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider, useCities } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
