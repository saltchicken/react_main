import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Connection } from "../types.ts";

export default function Index() {
  // const [connections, setConnections] = useState([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  // const [inputValue, setInputValue] = useState("");
  // const [displayValue, setDisplayValue] = useState("");
  //
  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     setDisplayValue(inputValue);
  //     setInputValue("");
  //   }
  // };

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/dinosaurs/`);
      const allConnections = (await response.json()) as Connection[];
      setConnections(allConnections);
    })();
  }, []);

  return (
    <main>
      <h1>Welcome to the Dinosaur app</h1>
      <p>Click ON a dinosaur below to learn more.</p>
      <p></p>
      {connections.map((connection: Connection) => {
        return <p key={connection.ip}>{connection.ip}</p>;
      })}

      {/* <input */}
      {/*   type="text" */}
      {/*   value={inputValue} */}
      {/*   onChange={(e) => setInputValue(e.target.value)} */}
      {/*   onKeyPress={handleKeyPress} */}
      {/*   placeholder="Type something and press Enter" */}
      {/* /> */}
      {/* <p>{displayValue}</p> */}
      {/* {connections.map((connection: Connection) => { */}
      {/*   return ( */}
      {/*     <Link */}
      {/*       to={`/${connection.ip.toLowerCase()}`} */}
      {/*       key={connection.ip} */}
      {/*       className="dinosaur" */}
      {/*     > */}
      {/*       {connection.ip} */}
      {/*     </Link> */}
      {/*   ); */}
      {/* })} */}
    </main>
  );
}
