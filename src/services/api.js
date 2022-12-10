export default async function getCurrencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const categories = await fetch(url);
  const response = await categories.json();
  return response;
}
