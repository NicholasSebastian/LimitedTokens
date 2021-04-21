import fetch from 'isomorphic-unfetch';

export default async function postJSON (target: string, obj: object) {
  const response = await fetch(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  return response;
}