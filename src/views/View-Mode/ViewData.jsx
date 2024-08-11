import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../../services/index.services";

export default function ViewData({ entity }) {
  const location = useLocation();
  const { id } = location.state || null;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      setData(await fetchData(`${entity}/${id}`));
    };
    fetch();
  }, [id, entity]);
  return <div>{id ? <div></div> : <div>No id found</div>}</div>;
}
