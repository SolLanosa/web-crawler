import { getYCombinatorNews } from "@/service/api/getYCombinatorNews";
import { useQuery } from "@tanstack/react-query";

export const useGetYCombinatorNews = (sortAndFilter: string) => {
  const response = useQuery({
    queryKey: ["yCombinatorNews", sortAndFilter],
    queryFn: async () => {
      const res = await getYCombinatorNews(sortAndFilter);
      return res;
    },
    enabled: !!sortAndFilter,
    refetchOnWindowFocus: false,
  });

  return {
    ...response,
    news: response.data,
  };
};
