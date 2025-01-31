import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  name: string;
  email: string;
  phone: number;
  address: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, phone, address, streetAddress, city, state, postalCode, country }: Data = req.body;

    console.log("Received data:", { name, email, phone, address, streetAddress, city, state, postalCode, country });

    return res.status(200).json({ message: "Data received successfully!", data: req.body });
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
