import React from "react";
import BannerSection from "../../components/BannerSection";
import ProductList from "../../components/ProductList";
import StatsSection from "../../components/StatsSection";
import FAQ from "../../components/FAQ";
import BecameMemeber from "../../components/BecameMember";

export default function UserPage() {
  return (
    <>
      <BannerSection />
      <ProductList />
      <StatsSection />
      <FAQ/>
      <BecameMemeber/>
    </>
  );
}
