export default async function fetchRandomInsult() {
  try {
    const response = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
}