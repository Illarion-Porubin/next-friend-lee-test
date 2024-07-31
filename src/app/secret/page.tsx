'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SecretPage = () => {
  const router = useRouter();
  const [shouldShowIframe, setShouldShowIframe] = useState(false);

  useEffect(() => {
    // Extract query parameters
    const query = new URLSearchParams(window.location.search);
    const key = query.get('key');

    // Check if the 'key' parameter matches the expected value
    if (key === 'mypassword') {
      setShouldShowIframe(true);
    } else {
      // Redirect if the key is incorrect
      router.push('/404');
    }
  }, [router]);

  return (
    <div>
      <h1>Secret Page</h1>
      {shouldShowIframe ? (
        <iframe src="http://localhost:3000" width="800" height="600" />
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default SecretPage;
