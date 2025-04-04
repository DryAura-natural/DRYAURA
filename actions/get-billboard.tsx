import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {
    const res = await fetch(`${URL}/${id}`);
    const result = await res.json();
    // console.log('Billboard:', result);
    return result;

};

export default getBillboard;    