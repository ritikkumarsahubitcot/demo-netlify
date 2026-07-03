export default async (request) => {
  const url = new URL(request.url);

  if (url.pathname === '/favicon.ico' || url.pathname.startsWith('/assets/') || url.pathname === '/styles.css' || url.pathname === '/script.js') {
    return;
  }

  const authHeader = request.headers.get('Authorization');
  const username = Netlify.env.get('BASIC_AUTH_USER');
  const password = Netlify.env.get('BASIC_AUTH_PASSWORD');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Site"',
      },
    });
  }

  const decoded = atob(authHeader.substring(6));
  const [user, pass] = decoded.split(':');

  if (user === username && pass === password) {
    return;
  }

  return new Response('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected Site"',
    },
  });
};
