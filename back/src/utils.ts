import { SortAndFilterEnum } from "./types";

export const convertValueToSortAndFilterEnum = (
  value: string | undefined
): SortAndFilterEnum => {
  switch (value) {
    case SortAndFilterEnum.PointsAndWordsLowerThan:
    case SortAndFilterEnum.NumberCommentsAndWordsGreatherThan:
    case SortAndFilterEnum.All:
      return value;
    default:
      return SortAndFilterEnum.All;
  }
};
