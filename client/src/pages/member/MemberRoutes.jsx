import React from "react";
import { Routes, Route } from "react-router-dom";
import MemberDashboardLayout from "./screens/MemberDashboardLayout";
import MemberPage from "./MemberPage";
import CreateProduct from "./screens/CreateProduct/CreateProduct";
import Dashboard from "./screens/Dashboard";
import CreatedProductList from "./screens/CreateProduct/CreatedProductList";

export default function MemberRoutes() {
  return (
    <MemberDashboardLayout>
      <Routes>
        {/* Dashboard Page */}
        <Route path="/" element={<MemberPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* Product Page */}
        <Route path="product" element={<CreatedProductList />} />
        <Route path="product/create" element={<CreateProduct />} />
      </Routes>
    </MemberDashboardLayout>
  );
}
