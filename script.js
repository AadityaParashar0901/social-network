document.addEventListener("DOMContentLoaded", () => {
  // --- Elements: Auth ---
  const signUpButton = document.getElementById("signUpButton");
  const signInButton = document.getElementById("signInButton");
  const signInForm = document.getElementById("signIn");
  const signUpForm = document.getElementById("signup");

  // --- Elements: Help Modal ---
  const helpBtn = document.getElementById("helpBtn");
  const helpModal = document.getElementById("helpModal");
  const closeHelp = document.getElementById("closeHelp");
  const submitQueryButton = document.getElementById("submitQueryButton");
  const submissionSuccessModal = document.getElementById("submissionSuccessModal");
  const okButton = document.getElementById("okButton");

  // --- Elements: Contact Modal ---
  const contactModal = document.getElementById("contactModal");
  const contactBtn = document.getElementById("contactBtn");
  const closeContactBtn = document.getElementById("contactclose-btn");

  // --- Auth Form Toggling ---
  signUpButton?.addEventListener("click", () => {
    if (signInForm?.classList.contains("visible")) {
      signInForm.classList.replace("visible", "hidden");
    } else {
      signInForm?.classList.add("hidden");
    }
    if (signUpForm?.classList.contains("hidden")) {
      signUpForm.classList.replace("hidden", "visible");
    } else {
      signUpForm?.classList.add("visible");
    }
  });

  signInButton?.addEventListener("click", () => {
    if (signInForm?.classList.contains("hidden")) {
      signInForm.classList.replace("hidden", "visible");
    } else {
      signInForm?.classList.add("visible");
    }
    if (signUpForm?.classList.contains("visible")) {
      signUpForm.classList.replace("visible", "hidden");
    } else {
      signUpForm?.classList.add("hidden");
    }
  });

  // --- Login & Registration Animations ---
  const authForm = document.querySelector('form[action="register.php"]');
  authForm?.addEventListener("submit", (e) => {
    const formData = new FormData(authForm);
    
    if (typeof showLoadingPopup !== "function") return;

    if (formData.get("signIn")) {
      showLoadingPopup("Signing In...", "Please wait while we verify your credentials...");
    } else if (formData.get("signUp")) {
      showLoadingPopup("Creating Account...", "Please wait while we create your account...");
    }
  });

  // --- Search Engine Redirect Check ---
  const checkRedirectCondition = () => {
    const referrer = document.referrer || "";
    const searchEngines = ["google.com", "bing.com", "yahoo.com", "duckduckgo.com"];
    const isFromSearchEngine = searchEngines.some(engine => referrer.includes(engine));
    
    const hasVisited = sessionStorage.getItem("nexus_visited");
    const noRedirect = localStorage.getItem("nexus_no_redirect");

    if (!isFromSearchEngine && !hasVisited && !noRedirect) {
      if (typeof showLoadingPopup === "function") {
        showLoadingPopup("Welcome to Nexus", "Preparing your social experience...");
        setTimeout(() => typeof hidePopup === "function" && hidePopup(), 3000);
      }
      sessionStorage.setItem("nexus_visited", "true");
    }
  };
  
  checkRedirectCondition();

  // --- Help Modal Logic ---
  helpBtn?.addEventListener("click", () => helpModal && (helpModal.style.display = "block"));
  closeHelp?.addEventListener("click", () => helpModal && (helpModal.style.display = "none"));

  submitQueryButton?.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const query = document.getElementById("helpQuery")?.value;
    const email = document.getElementById("helpEmail")?.value;
    
    if (!query || !email) {
      typeof showErrorPopup === "function" && showErrorPopup("Error", "Please fill out both query and email fields.");
      return;
    }
    
    const formData = new FormData();
    formData.append("helpQuery", query);
    formData.append("helpEmail", email);
    formData.append("submitQueryButton", "true");
    
    try {
      const response = await fetch("helpQuerySubmit.php", {
        method: "POST",
        body: formData
      });
      await response.json();
      
      if (helpModal) helpModal.style.display = "none";
      
      if (typeof showSuccessPopup === "function") {
        showSuccessPopup("Query Submitted!", "Your query has been successfully submitted. We will get back to you shortly!", 3000);
      } else if (submissionSuccessModal) {
        submissionSuccessModal.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      typeof showErrorPopup === "function" && showErrorPopup("Error", "There was a problem submitting your query. Please try again.");
    }
  });

  okButton?.addEventListener("click", () => {
    if (submissionSuccessModal) submissionSuccessModal.style.display = "none";
  });

  // --- Contact Modal Logic ---
  contactBtn?.addEventListener("click", () => contactModal && (contactModal.style.display = "block"));
  closeContactBtn?.addEventListener("click", () => contactModal && (contactModal.style.display = "none"));

  // --- Global Window Click (Close Modals) ---
  window.addEventListener("click", (event) => {
    if (event.target === helpModal && helpModal) helpModal.style.display = "none";
    if (event.target === submissionSuccessModal && submissionSuccessModal) submissionSuccessModal.style.display = "none";
    if (event.target === contactModal && contactModal) contactModal.style.display = "none";
  });
});
