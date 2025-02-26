export interface Category {
  id: string;
  background: string;
  name: string;
  hoverImageUrl: string;
  link: string;
}

export const categories: Category[] = [
 
  {
    id: '1',
    background: "bg-[#126782]",
    name: "Cashews",
    hoverImageUrl: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9cd0010a01ed07b/view?project=67a96cd2001e32766970&mode=admin",
    link: "/Cashews", // Add a link for navigation
  },
  {
    id: '2',
    background: "bg-[#ad7f57]",
    name: "Raisins",
    hoverImageUrl: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9d500167eb39747/view?project=67a96cd2001e32766970&mode=admin",
    link: "/raisins", // Add a link for navigation
  },
  {
    id: '3',
    background: "bg-[#7C3C3B]",
    name: "Dates",
    hoverImageUrl: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9f800226d0007f6/view?project=67a96cd2001e32766970&mode=admin",
    link: "/dates", // Add a link for navigation
  },
  {
    id: '4',
    background: "bg-[#916a5e]",
    name: "Almond",
    hoverImageUrl: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b4bec1002350e98a2d/view?project=67a96cd2001e32766970&mode=admin",
    link: "/almond", // Add a link for navigation
  },
  {
    id: '5',
    background: "bg-[#841e3e]",
    name: "Walnuts",
    hoverImageUrl: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9e7001ff28737da/view?project=67a96cd2001e32766970&mode=admin",
    link: "/walnuts", // Add a link for navigation
  },
  {
    id: '6',
    background: "bg-[#633E63]",
    name: "Seeds",
    hoverImageUrl: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9ee002c785844cd/view?project=67a96cd2001e32766970&mode=admin",
    link: "/seeds", // Add a link for navigation
  },
  {
    id: '7',
    background: "bg-gradient-to-r from-green-500 to-teal-500",
    name: "Almond",
    hoverImageUrl: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b4bec1002350e98a2d/view?project=67a96cd2001e32766970&mode=admin",
    link: "/almond", // Add a link for navigation
  },
  {
    id: '8',
    background: "bg-gradient-to-r from-green-500 to-teal-500",
    name: "Pistachio",
    hoverImageUrl: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9c600138cb2fb9a/view?project=67a96cd2001e32766970&mode=admin",
    link: "/pistachio", // Add a link for navigation
  },
  
];