import { LANGUAGE_TO_FLAG } from "../constants";

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase().trim();
  console.log("Language received:", langLower);

  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return <span className="text-xs opacity-60">🌐</span>; // fallback
}

