import { News } from "@/types/types";

interface NewsProps {
  news: News;
}

export default function NewsComponent({ news }: NewsProps) {
  return (
    <div className="flex flex-col w-full mb-3">
      <div className="flex text-xl font-bold">
        <span className="text-white">{news.number}. </span>
        <span className="pl-2 font-mono">{news.title}</span>
      </div>
      <div></div>
      <div className="flex flex-col">
        <span className="font-extralight">
          Number of comment(s):{" "}
          <span className="font-bold">{news.numberOfComments}</span>
        </span>
        <span className="font-extralight">
          Point(s): <span className="font-bold">{news.points}</span>
        </span>
      </div>
      <hr className="mt-3" />
    </div>
  );
}
