export interface Category {
  id: string;
  backgroundColor: string;
  name: string;
  hoverImageUrl: string;
  link: string;
}

export const categories: Category[] = [
  {
    id: "130b13f9-aa75-4b36-b4e7-7d2399e3be49",
    backgroundColor: "#126782",
    name: "Cashew",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ec01f80010799fc518/view?project=67a96cd2001e32766970&mode=admin",
    link: "/cashew", // Add a link for navigation
  },
  {
    id: "dffbeaa6-7aa8-4442-a731-77fd032bc2df",
    backgroundColor: "#841e3e",
    name: "Walnuts",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ebfe8f003afd589395/view?project=67a96cd2001e32766970&mode=admin",
    link: "/walnuts", // Add a link for navigation
  },
  {
    id: "4ff965f3-320f-4c3d-8c27-1823727114b5",
    backgroundColor: "#A3A62B",
    name: "Pistachio",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ec00ba001ab2322e99/view?project=67a96cd2001e32766970&mode=admin",
    link: "/pistachio", // Add a link for navigation
  },



  {
    id: "f565c8ab-60f2-4e33-8002-83a76b95d252",
    backgroundColor: "#633E63",
    name: "Anjeer",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ebf8af003c01875f21/view?project=67a96cd2001e32766970&mode=admin",
    link: "/anjeer", // Add a link for navigation
  },
  {
    id: "06eb9231-2a6f-486d-adf9-8a9f079671e2",
    backgroundColor: "#9F440C",
    name: "Almond",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ebfeeb0039d10f7459/view?project=67a96cd2001e32766970&mode=admin",
    link: "/almond", // Add a link for navigation
  },
  {
    id: "7d05538c-6445-4cda-ade9-c2db6559da9d",
    backgroundColor: "#ad7f57",
    name: "Raisins",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9d500167eb39747/view?project=67a96cd2001e32766970&mode=admin",
    link: "/raisins", // Add a link for navigation
  },
  {
    id: "471a9c76-f8f4-403f-87cd-e115311844f1",
    backgroundColor: "#7C3C3B",
    name: "Dates",
    hoverImageUrl:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ebfcde00368bc92f47/view?project=67a96cd2001e32766970&mode=admin",
    link: "/dates", // Add a link for navigation
  },
];
