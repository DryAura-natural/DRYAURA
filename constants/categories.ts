export interface Category {
  id: string;
  backgroundColor: string;
  name: string;
  hoverImageUrl: string;
  link: string;
}

export const categories: Category[] = [
  {
    id: "1",
    backgroundColor: "#126782",
    name: "Cashew",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ec01f80010799fc518/view?project=67a96cd2001e32766970&mode=admin",
    link: "/cashew", // Add a link for navigation
  },
  {
    id: "2",
    backgroundColor: "#841e3e",
    name: "Walnuts",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ebfe8f003afd589395/view?project=67a96cd2001e32766970&mode=admin",
    link: "/walnuts", // Add a link for navigation
  },
  {
    id: "3",
    backgroundColor: "#A3A62B",
    name: "Pistachio",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ec00ba001ab2322e99/view?project=67a96cd2001e32766970&mode=admin",
    link: "/pistachio", // Add a link for navigation
  },

  {
    id: "4",
    backgroundColor: "#633E63",
    name: "Anjeer",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ebf8af003c01875f21/view?project=67a96cd2001e32766970&mode=admin",
    link: "/anjeer", // Add a link for navigation
  },
  {
    id: "5",
    backgroundColor: "#9F440C",
    name: "Almond",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ebfeeb0039d10f7459/view?project=67a96cd2001e32766970&mode=admin",
    link: "/almond", // Add a link for navigation
  },
  {
    id: "6",
    backgroundColor: "#ad7f57",
    name: "Raisins",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9d500167eb39747/view?project=67a96cd2001e32766970&mode=admin",
    link: "/raisins", // Add a link for navigation
  },
  {
    id: "7",
    backgroundColor: "#7C3C3B",
    name: "Dates",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ebfcde00368bc92f47/view?project=67a96cd2001e32766970&mode=admin",
    link: "/dates", // Add a link for navigation
  },
  {
    id: "8",
    backgroundColor: "#2C3E50", // Deep blue-gray, sophisticated and premium
    name: "Apricot",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67f35368001e68940756/view?project=67a96cd2001e32766970&mode=admin",
    link: "/apricot", // Add a link for navigation
  },
];
