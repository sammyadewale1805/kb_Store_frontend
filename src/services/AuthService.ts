export async function authenticate(type: 'signIn' | 'signUp', formData: any) {
  const endpoint = `http://localhost:3000/auth/${type}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
