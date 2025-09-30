import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },    
  { code: "ja", label: "日本語" } 
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("language", code);
    setOpen(false);
  };

  const currentLanguage = languages.find(
    (lang) => lang.code === i18n.language
  )?.label;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 12px",
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {currentLanguage || "Language ▼"}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            background: "#fff",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "5px",
            marginTop: "5px",
            zIndex: 1000,
            minWidth: "120px",
          }}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              style={{
                padding: "12px 14px",
                cursor: "pointer",
                background:
                  i18n.language === lang.code ? "#f0f0f0" : "transparent",
              }}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
