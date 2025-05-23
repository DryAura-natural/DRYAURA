
import React, { useEffect, useState } from "react";
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

interface currencyProps {
  value?: string | number;
}
const Currency: React.FC<currencyProps> = ({ value }) => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;
