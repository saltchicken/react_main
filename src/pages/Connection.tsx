import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Conn } from "../types";

export default function Connection() {
  const { selectedConnection } = useParams();
  const [connection, setConnection] = useState<Conn>({
    ip: "",
    latitude: 0.0,
    longitude: 0.0,
  });

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/connections/${selectedConnection}`);
      const connection = (await resp.json()) as Conn;
      setConnection(connection);
    })();
  }, [selectedConnection]);

  return (
    <div>
      <h1>{connection.ip}</h1>
      <p>{connection.latitude}</p>
      <Link to="/">🠠 Back to home</Link>
    </div>
  );
}
