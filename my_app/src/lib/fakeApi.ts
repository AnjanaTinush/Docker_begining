// Pure front-end "API" with small delays to feel real.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function loginApi(email: string, password: string) {
  await sleep(600);
  if (password === 'demo123') {
    return { token: 'demo-token', user: { email } };
  }
  throw new Error('Invalid credentials. Try password: demo123');
}

export async function getMetrics() {
  await sleep(400);
  const kpis = {
    mrr: 12450,         // monthly recurring revenue
    activeUsers: 2874,
    churnRate: 2.1,     // %
  };
  const revenue = Array.from({ length: 12 }).map((_, i) => ({
    month: new Date(2024, i, 1).toLocaleString('en', { month: 'short' }),
    value: 7000 + i * 450 + (i % 2 ? 600 : -300),
  }));
  const topCustomers = [
    { id: 'c1', name: 'Octarine Labs', mrr: 1399 },
    { id: 'c2', name: 'Nimbus Corp',   mrr: 999  },
    { id: 'c3', name: 'Velvet AI',     mrr: 799  },
  ];
  return { kpis, revenue, topCustomers };
}

export async function getCustomers() {
  await sleep(500);
  return [
    { id: 'u1', name: 'Ada Lovelace',    plan: 'Pro',     mrr: 49,  joined: '2024-08-03' },
    { id: 'u2', name: 'Grace Hopper',    plan: 'Business',mrr: 99,  joined: '2024-10-19' },
    { id: 'u3', name: 'Alan Turing',     plan: 'Free',    mrr: 0,   joined: '2025-02-11' },
    { id: 'u4', name: 'Katherine Johnson',plan:'Pro',     mrr: 49,  joined: '2025-04-27' },
  ];
}
