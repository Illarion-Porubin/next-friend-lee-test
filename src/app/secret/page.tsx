"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SecretPage = () => {
  const router = useRouter();
  const [shouldShowIframe, setShouldShowIframe] = useState(false);

  useEffect(() => {
    // Extract query parameters
    const query = new URLSearchParams(window.location.search);
    const key = query.get("key");

    if (key) {
      //Sending the key to the server
      fetch("http://localhost:8080/update-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });
    }

  }, [router]);

  return (
    <div>
      <h1>Secret Page</h1>
      {shouldShowIframe || true ? (
        <iframe src="http://localhost:3000" width="800" height="600" />
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default SecretPage;
