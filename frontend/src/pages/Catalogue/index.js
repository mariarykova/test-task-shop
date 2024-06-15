import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/Card";
import { Header } from "../../components/Header";
import { SkeletonCard } from "../../components/Card/skeleton";

import { fetchCards } from "../../redux/slices/cards";

export const Catalogue = () => {
  const dispatch = useDispatch();
  const { status, cards } = useSelector((state) => state.cards.data);

  const isCardsLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const renderCards = useCallback(() => {
    return (isCardsLoading ? [...Array(6)] : cards).map((card, index) => {
      return isCardsLoading ? (
        <SkeletonCard key={index} />
      ) : (
        <div key={index}>
          <Card item={card} />
        </div>
      );
    });
  }, [cards, isCardsLoading]);

  return (
    <>
      <Header />
      <div className="font-roboto text-2xl text-center mb-[40px]">
        Catalogue
      </div>
      <div>
        <div className="flex justify-around flex-wrap gap-x-4 gap-y-8 max-w-[920px]">
          {renderCards()}
        </div>
      </div>
    </>
  );
};
