
(() => {
  let currentUser = null;
  let updating = false;

  function refreshUserDetails() {
    if (!currentUser || updating) return;

    updating = true;

    try {
      const fullName = currentUser.name?.trim() || "Student";
      const firstName = fullName.split(/\s+/)[0];

      const initials = fullName
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase() || "")
        .join("");

      const hour = new Date().getHours();

      const greeting =
        hour < 12
          ? "Good morning"
          : hour < 17
          ? "Good afternoon"
          : "Good evening";

      const welcome = document.querySelector(".welcome h1");

      if (welcome) {
        welcome.textContent = `${greeting}, ${firstName} ✦`;
      }

      const dateElement = document.querySelector(
        ".welcome .eyebrow"
      );

      if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString(
          "en-IN",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
      }

      const miniName = document.querySelector(
        ".user-mini strong"
      );

      if (miniName) miniName.textContent = fullName;

      document.querySelectorAll(
        ".user-mini .avatar, #profile-avatar, .profile-dialog-avatar"
      ).forEach(element => {
        element.textContent = initials;
      });

      const profileTitle = document.querySelector("#profile-title");

      if (profileTitle) {
        profileTitle.textContent = fullName;
      }

      const profileButton = document.querySelector(
        "#profile-avatar"
      );

      if (profileButton) {
        profileButton.setAttribute(
          "aria-label",
          `Open ${fullName} profile`
        );
      }

      const university = currentUser.university;

      const profileDescription = document.querySelector(
        "#profile-description"
      );

      if (profileDescription && university) {
        profileDescription.textContent =
          `Student member · ${university}`;
      }

      document.querySelectorAll(".request-info strong")
        .forEach(element => {
          if (element.textContent.includes("Aisha Kapoor")) {
            element.textContent =
              element.textContent.replace(
                "Aisha Kapoor",
                fullName
              );
          }
        });

    } finally {
      updating = false;
    }
  }

  window.addEventListener("message", event => {
    if (event.origin !== window.location.origin) return;
    if (event.source !== window.parent) return;
    if (event.data?.type !== "SKILLSWAP_USER") return;

    if (!event.data.user) return;

    currentUser = event.data.user;
    refreshUserDetails();
  });

  const observer = new MutationObserver(() => {
    if (!currentUser || updating) return;

    const welcome = document.querySelector(".welcome h1");
    const fullName = currentUser.name?.trim() || "Student";
    const firstName = fullName.split(/\s+/)[0];

    if (
      welcome &&
      !welcome.textContent.includes(firstName)
    ) {
      refreshUserDetails();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("pageshow", refreshUserDetails);
})();
