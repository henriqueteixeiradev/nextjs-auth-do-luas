"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const Company = () => {
  const params = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    !(async () => {
      const { data } = await api.get(`/${params.username}`);
      setCompany(data);
    })();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(company, null, 2)}</pre>
    </div>
  );
};

export default Company;
