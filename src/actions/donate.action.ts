"use server";

import { getAuthSession } from "@/utils/auth";
import axios from "axios";

export const donateMoney = async () => {
  try {
    const session = await getAuthSession();

    const data = await axios.post(
      process.env.KHALTI_URL!,
      {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        website_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        amount: 100 * 100,
        purchase_order_id: "test12",
        purchase_order_name: "test",
        customer_info: {
          name: session?.user?.name,
          email: session?.user?.email,
          phone: "9804625081",
        },
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "Application/json",
        },
      }
    );

    return { data: data.data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
