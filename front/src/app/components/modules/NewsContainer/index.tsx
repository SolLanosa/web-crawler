import { News } from "@/types/types";
import NewsComponent from "../../atoms/News";

interface NewsContainerProps {
  newsArray: News[];
}

export default function NewsContainer({ newsArray }: NewsContainerProps) {
  return (
    <div className="mt-10">
      {newsArray?.map((news, index) => (
        <NewsComponent key={index} news={news}></NewsComponent>
      ))}
    </div>
  );
}
