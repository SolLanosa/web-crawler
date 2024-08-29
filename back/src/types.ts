export interface News {
  number: number;
  title: string;
  points: number;
  numberOfComments: number;
}

export enum SortAndFilterEnum {
  PointsAndWordsLowerThan = "points-and-words-lower-than",
  NumberCommentsAndWordsGreatherThan = "number-comments-and-words-greather-than",
  All = "all",
}
