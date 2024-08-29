"use client";
import { useGetYCombinatorNews } from "@/hooks/useGetYCombinatorNews";
import { useState } from "react";
import Button from "../../atoms/Button";
import NewsContainer from "../../modules/NewsContainer";
import Spinner from "../../atoms/Spinner";

export default function HomeView() {
  const [sortAndFilter, setSortAndFilter] = useState("all");
  const { news, isLoading } = useGetYCombinatorNews(sortAndFilter);

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="flex w-full flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">Hacker News</h1>
        <p className="font-extralight text-2xl font-mono">
          News, news and more news
        </p>
      </div>
      <div className="w-full flex  flex-col">
        <Button
          onClick={() => setSortAndFilter("points-and-words-lower-than")}
          className="mt-4"
        >
          Filter and order by points
        </Button>
        <Button
          className="mt-4"
          onClick={() =>
            setSortAndFilter("number-comments-and-words-greather-than")
          }
        >
          Filter and order by number of comments
        </Button>
        <Button className="mt-4" onClick={() => setSortAndFilter("all")}>
          Reset
        </Button>
      </div>
      <div className="w-full m-auto">
        {isLoading ? <Spinner /> : <NewsContainer newsArray={news ?? []} />}
      </div>
    </div>
  );
}
