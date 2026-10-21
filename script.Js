"use strict";

// ==========================================
// SMARTPHI — AUTHENTIFICATION DE DÉMONSTRATION
// ==========================================

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const authPanel = document.getElementById("authPanel");
const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");
const authSubmit = document.getElementById("authSubmit");
const authForm = document.getElementById("authForm");
const closeAuth = document.getElementById("closeAuth");
const authMessage = document.getElementById("authMessage");

function openAuth(mode) {
  if (!authPanel) return;

  authPanel.hidden = false;

  if (authMessage) {
    authMessage.textContent = "";
  }

  if (mode === "signup") {
    if (authTitle) authTitle.textContent = "Créer un compte";

    if (authDescription) {
      authDescription.textContent =
        "Préparez votre espace personnel.";
    }

    if (authSubmit) {
      authSubmit.textContent = "Créer mon compte";
    }
  } else {
    if (authTitle) authTitle.textContent = "Se connecter";

    if (authDescription) {
      authDescription.textContent =
        "Bienvenue de retour chez SmartPHI.";
    }

    if (authSubmit) {
      authSubmit.textContent = "Se connecter";
    }
  }

  authPanel.dataset.mode = mode;
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => openAuth("signup"));
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => openAuth("login"));
}

function closeAuthPanel() {
  if (authPanel) {
    authPanel.hidden = true;
  }
}

if (closeAuth) {
  closeAuth.addEventListener("click", closeAuthPanel);
}

if (authPanel) {
  authPanel.addEventListener("click", (event) => {
    if (event.target === authPanel) {
      closeAuthPanel();
    }
  });
}

if (authForm) {
  authForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (authMessage) {
      authMessage.textContent =
        "Interface de démonstration : aucun compte réel n'est créé.";
    }
  });
}

// ==========================================
// PHARAMI KIDS — ACTIVITÉS INTERACTIVES
// ==========================================

const pharamiBtn = document.getElementById("pharamiBtn");
const pharamiModal = document.getElementById("pharamiModal");
const closePharami = document.getElementById("closePharami");
const pharamiResponse = document.getElementById("pharamiResponse");
const pharamiSpeak = document.getElementById("pharamiSpeak");

const pharamiLessons = {
  body: {
    text:
      "Ton cœur travaille jour et nuit pour faire circuler le sang. " +
      "Tes poumons t'aident à respirer. Ton corps est extraordinaire ! ❤️",
    speech:
      "Ton cœur travaille jour et nuit pour faire circuler le sang. " +
      "Tes poumons t'aident à respirer."
  },

  medicine: {
    text:
      "Bravo ! Un médicament doit être pris uniquement selon les " +
      "instructions d'un professionnel de santé et avec l'aide d'un " +
      "adulte responsable. Ne joue jamais avec les médicaments ! 💊",
    speech:
      "Un médicament doit être pris selon les instructions d'un " +
      "professionnel de santé et avec l'aide d'un adulte responsable. " +
      "Ne joue jamais avec les médicaments."
  },

  quiz: {
    text:
      "Petite question ⭐ : si tu trouves un comprimé par terre, " +
      "que dois-tu faire ?",
    speech:
      "Petite question ! Si tu trouves un comprimé par terre, " +
      "que dois-tu faire ?"
  }
};

function openPharamiWindow() {
  if (!pharamiModal) return;

  pharamiModal.hidden = false;
  document.body.style.overflow = "hidden";

  if (pharamiResponse) {
    pharamiResponse.textContent =
      "Choisis une activité pour commencer !";
  }

  if (pharamiSpeak) {
    pharamiSpeak.dataset.speech =
      "Salut ! Je suis PHARAMI. Choisis une activité pour apprendre.";
  }

  if (closePharami) {
    closePharami.focus();
  }
}

function closePharamiWindow() {
  if (!pharamiModal) return;

  pharamiModal.hidden = true;
  document.body.style.overflow = "";

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (pharamiBtn) {
    pharamiBtn.focus();
  }
}

if (pharamiBtn && pharamiModal) {
  pharamiBtn.addEventListener("click", openPharamiWindow);
}

if (closePharami) {
  closePharami.addEventListener("click", closePharamiWindow);
}

if (pharamiModal) {
  pharamiModal.addEventListener("click", (event) => {
    if (event.target === pharamiModal) {
      closePharamiWindow();
    }
  });
}

// ==========================================
// ACTIVITÉS PHARAMI
// ==========================================

document.querySelectorAll("[data-pharami]").forEach((button) => {
  button.addEventListener("click", () => {
    const lesson = pharamiLessons[button.dataset.pharami];

    if (!lesson || !pharamiResponse) return;

    if (pharamiSpeak) {
      pharamiSpeak.dataset.speech = lesson.speech;
    }

    if (button.dataset.pharami === "quiz") {
      pharamiResponse.replaceChildren();

      const question = document.createElement("p");
      question.textContent =
        "Si tu trouves un comprimé par terre, que dois-tu faire ?";

      const wrong = document.createElement("button");
      wrong.type = "button";
      wrong.className = "pharami-choice";
      wrong.textContent = "A. Le goûter";

      const correct = document.createElement("button");
      correct.type = "button";
      correct.className = "pharami-choice";
      correct.textContent =
        "B. Prévenir un adulte sans le toucher";

      const feedback = document.createElement("p");
      feedback.setAttribute("aria-live", "polite");

      wrong.addEventListener("click", () => {
        feedback.textContent =
          "Pas tout à fait ! Ne goûte jamais un médicament trouvé. " +
          "Préviens un adulte.";
      });

      correct.addEventListener("click", () => {
        feedback.textContent =
          "Bravo ! 🎉 Préviens un adulte et ne touche pas au comprimé.";
      });

      pharamiResponse.append(
        question,
        wrong,
        correct,
        feedback
      );

      return;
    }

    pharamiResponse.textContent = lesson.text;
  });
});

// ==========================================
// LECTURE VOCALE
// ==========================================

if (pharamiSpeak) {
  pharamiSpeak.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      if (pharamiResponse) {
        pharamiResponse.textContent =
          "La lecture vocale n'est pas disponible dans ce navigateur.";
      }

      return;
    }

    window.speechSynthesis.cancel();

    const message =
      pharamiSpeak.dataset.speech ||
      "Salut ! Je suis PHARAMI. Choisis une activité pour apprendre.";

    const utterance = new SpeechSynthesisUtterance(message);

    utterance.lang = "fr-FR";
    utterance.rate = 0.9;

    window.speechSynthesis.speak(utterance);
  });
}

// ==========================================
// FERMETURE AVEC ÉCHAP
// ==========================================

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (pharamiModal && !pharamiModal.hidden) {
    closePharamiWindow();
  } else if (authPanel && !authPanel.hidden) {
    closeAuthPanel();
  }
});

// ==========================================
// ANNÉE ACTUELLE
// ==========================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
console.log("SmartPHI JavaScript fonctionne !");

console.log("Bouton PHARAMI :", document.getElementById("pharamiBtn"));

console.log("Fenêtre PHARAMI :", document.getElementById("pharamiModal"));
document.addEventListener("DOMContentLoaded", function () {
const btn = document.getElementById("discoverPharmi");

if (btn) {
btn.addEventListener("click", function () {
const section = document.getElementById("pharmiSection");

  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("PHARAMI : la section est introuvable !");
  }
});

}
});
// ==========================================
// SMARTPHI — LANGUES : FRANÇAIS, ARABE, ENGLISH
// ==========================================

const languageBtn = document.getElementById("languageBtn");

const translations = {
  fr: {
    "Accueil": "Accueil",
    "Nos services": "Nos services",
    "Comment ça marche ?": "Comment ça marche ?",
    "Contact": "Contact",
    "Mon espace": "Mon espace",
    "Votre santé, notre priorité": "Votre santé, notre priorité",
    "Vos médicaments,": "Vos médicaments,",
    "en toute simplicité.": "en toute simplicité.",
    "Découvrir nos services": "Découvrir nos services",
    "Notre engagement": "Notre engagement",
    "Innovation": "Innovation",
    "Simplicité": "Simplicité",
    "Sécurité": "Sécurité",
    "Accompagnement": "Accompagnement",
    "Nos fonctionnalités": "Nos fonctionnalités",
    "Recherche de médicaments": "Recherche de médicaments",
    "Catalogue pharmaceutique": "Catalogue pharmaceutique",
    "Rappels de prise": "Rappels de prise",
    "Interactions médicamenteuses": "Interactions médicamenteuses",
    "Alternatives génériques": "Alternatives génériques",
    "Profil du patient": "Profil du patient",
    "La sécurité avant tout": "La sécurité avant tout",
    "Questions fréquentes": "Questions fréquentes",
    "Retour à l'accueil ↑": "Retour à l'accueil ↑"
  },

  ar: {
    "Accueil": "الرئيسية",
    "Nos services": "خدماتنا",
    "Comment ça marche ?": "كيف يعمل؟",
    "Contact": "اتصل بنا",
    "Mon espace": "حسابي",
    "Votre santé, notre priorité": "صحتك أولويتنا",
    "Vos médicaments,": "أدويتك،",
    "en toute simplicité.": "بكل سهولة.",
    "Découvrir nos services": "اكتشفي خدماتنا",
    "Notre engagement": "التزامنا",
    "Innovation": "الابتكار",
    "Simplicité": "البساطة",
    "Sécurité": "السلامة",
    "Accompagnement": "المرافقة",
    "Nos fonctionnalités": "مميزاتنا",
    "Recherche de médicaments": "البحث عن الأدوية",
    "Catalogue pharmaceutique": "دليل الأدوية",
    "Rappels de prise": "تذكير بمواعيد الدواء",
    "Interactions médicamenteuses": "التفاعلات الدوائية",
    "Alternatives génériques": "الأدوية الجنيسة البديلة",
    "Profil du patient": "ملف المريض",
    "La sécurité avant tout": "السلامة قبل كل شيء",
    "Questions fréquentes": "الأسئلة الشائعة",
    "Retour à l'accueil ↑": "العودة إلى الرئيسية ↑"
  },

  en: {
    "Accueil": "Home",
    "Nos services": "Our Services",
    "Comment ça marche ?": "How It Works",
    "Contact": "Contact",
    "Mon espace": "My Account",
    "Votre santé, notre priorité": "Your Health, Our Priority",
    "Vos médicaments,": "Your medication,",
    "en toute simplicité.": "made simple.",
    "Découvrir nos services": "Discover Our Services",
    "Notre engagement": "Our Commitment",
    "Innovation": "Innovation",
    "Simplicité": "Simplicity",
    "Sécurité": "Safety",
    "Accompagnement": "Support",
    "Nos fonctionnalités": "Our Features",
    "Recherche de médicaments": "Medicine Search",
    "Catalogue pharmaceutique": "Medicine Catalogue",
    "Rappels de prise": "Medication Reminders",
    "Interactions médicamenteuses": "Drug Interactions",
    "Alternatives génériques": "Generic Alternatives",
    "Profil du patient": "Patient Profile",
    "La sécurité avant tout": "Safety First",
    "Questions fréquentes": "Frequently Asked Questions",
    "Retour à l'accueil ↑": "Back to Home ↑"
  }
};

function changeSmartPHILanguage(lang) {
  if (!translations[lang]) return;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // Traduction des textes de l'interface
  document.querySelectorAll("body *").forEach(element => {
    if (element.children.length === 0) {
      const originalText = element.textContent.trim();

      if (translations[lang][originalText]) {
        if (!element.dataset.originalText) {
          element.dataset.originalText = originalText;
        }

        element.textContent = translations[lang][originalText];
      } else if (element.dataset.originalText) {
        element.textContent =
          translations[lang][element.dataset.originalText] ||
          element.dataset.originalText;
      }
    }
  });

  // Mise à jour du bouton
  if (languageBtn) {
    languageBtn.textContent =
      lang === "fr" ? "FR ▾" :
      lang === "ar" ? "عربي ▾" :
      "EN ▾";
  }

  localStorage.setItem("smartphi-language", lang);
}

// Menu de sélection de la langue
if (languageBtn) {
  languageBtn.addEventListener("click", () => {
    const choice = prompt(
      "Choisis ta langue / Choose your language:\n1 - Français\n2 - العربية\n3 - English",
      "1"
    );

    if (choice === "1") {
      changeSmartPHILanguage("fr");
    } else if (choice === "2") {
      changeSmartPHILanguage("ar");
    } else if (choice === "3") {
      changeSmartPHILanguage("en");
    }
  });
}

// Restaurer la langue choisie
const savedLanguage = localStorage.getItem("smartphi-language");

if (savedLanguage && translations[savedLanguage]) {
  changeSmartPHILanguage(savedLanguage);
}
