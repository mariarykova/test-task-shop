import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./ui/Card/index";
import { fetchCards } from "../../redux/slices/cards";
import { SkeletonCard } from "./ui/Card/skeleton";

export const Catalogue = () => {
  const dispatch = useDispatch();
  const { status, cards } = useSelector((state) => state.cards.data);

  const isCardsLoading = status === "loading";

  console.log(cards);
  useEffect(() => {
    dispatch(fetchCards());
  }, []);

  const renderCards = useCallback(() => {
    //const startItem = (currentPage - 1) * itemsPerPage;
    //const endItem = currentPage * itemsPerPage;
    return (isCardsLoading ? [...Array(6)] : cards).map((card, index) => {
      return isCardsLoading ? (
        <SkeletonCard />
      ) : (
        <div key={card.id}>
          <Card item={card} />
        </div>
      );
    });
  }, [cards, isCardsLoading]);

  return (
    <>
      <h1 className="font-roboto p-6 italic ">Catalogue</h1>
      <div>
        <div className="flex justify-around flex-wrap gap-x-4 gap-y-8 max-w-[920px]">
          {renderCards()}
        </div>
      </div>
    </>
  );
};
