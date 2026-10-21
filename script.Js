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