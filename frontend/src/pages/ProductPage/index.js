import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../redux/slices/api";
import { Product } from "../../components/Product/index";

export const Good = () => {
  const { model } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({
    model,
  });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate("/");
    }
  }, [isFetching, isLoading, isSuccess, navigate]);

  return !data ? (
    <section className="flex-grow p-6 flex items-center justify-center">
      Loading...
    </section>
  ) : (
    <Product {...data} />
  );
};
