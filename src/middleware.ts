import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define your middleware function

// http://localhost:3000/secret?key=mypassword 


export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Get the referer header
  const referer = request.headers.get('referer') || '';

  // Restrict access to the homepage unless coming from /secret
  if (url.pathname === '/' && !referer.includes('/secret')) {
    // Redirect to a 404 page
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  // Allow access to the homepage or other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/secret'],
};
