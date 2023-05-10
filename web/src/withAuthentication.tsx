import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { api } from "./lib/api";

export const withAuthentiaction = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return async (props: any) => {
    const accessToken = cookies().get("access_token");
    if (!accessToken) {
      redirect("/auth/login");
    }

    const { data } = await api.get("/", {
      headers: {
        authorization: `Bearer ${accessToken.value}`,
      },
    });

    if (!data) {
      redirect("/auth/login");
    }

    return <Component {...props} session={data} />;
  };
};
