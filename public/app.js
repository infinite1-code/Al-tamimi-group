const STORAGE_KEY = "qatarJobApplicationDemo";

// PAGE 1: Save form data and open Page 2
const form = document.getElementById("applicationForm");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const error = document.getElementById("formError");

    if (error) {
      error.textContent = "";
    }

    if (!form.reportValidity()) {
      return;
    }

    const data = {
      fullName: document.getElementById("fullName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      dob: document.getElementById("dob").value,
      nationality: document.getElementById("nationality").value,
      location: document.getElementById("location").value.trim(),
      position: document.getElementById("position").value,
      experience:
        document.getElementById("experience").value || "Not specified",
      availability:
        document.getElementById("availability").value || "Not specified",
      skills: document.getElementById("skills").value.trim()
    };

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      const modal = document.getElementById("verifyModal");

      if (modal) {
        modal.classList.add("is-visible");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        window.setTimeout(function () {
          window.location.href = "page2.html";
        }, 2500);
      } else {
        window.location.href = "page2.html";
      }
    } catch (error) {
      if (error) {
        const formError = document.getElementById("formError");

        if (formError) {
          formError.textContent =
            "Could not save the preview. Please try again.";
        }
      }
    }
  });
}

// Helper: retrieve saved data
function getApplicationData() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
  } catch (error) {
    return null;
  }
}

// Helper: safely update text on the page
function setText(id, value, fallback = "Not provided") {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value || fallback;
  }
}

// PAGE 2: Display the saved application
const reviewName = document.getElementById("reviewName");

if (reviewName) {
  const data = getApplicationData();

  if (data) {
    setText("reviewName", data.fullName, "Applicant");
    setText("reviewPhone", data.phone);
    setText("reviewEmail", data.email);
    setText("reviewPosition", data.position, "Not selected");
    setText("reviewNationality", data.nationality);
    setText("reviewLocation", data.location);
    setText("reviewExperience", data.experience, "Not specified");
  } else {
    setText("reviewName", "No saved preview");
    setText("reviewPhone", "Return to Page 1");
    setText("reviewEmail", "Return to Page 1");
    setText("reviewPosition", "Return to Page 1");
    setText("reviewNationality", "Return to Page 1");
    setText("reviewLocation", "Return to Page 1");
    setText("reviewExperience", "Return to Page 1");
  }
}

// PAGE 2: Continue to Page 3
const continueButton = document.getElementById("continueToPage3");

if (continueButton) {
  continueButton.addEventListener("click", function () {
    window.location.href = "page3.html";
  });
}

// PAGE 3: Display the final preview
const finalName = document.getElementById("finalName");

if (finalName) {
  const data = getApplicationData();

  if (data) {
    setText("finalName", data.fullName, "Applicant");
    setText("finalPosition", data.position, "Not selected");
    setText("finalPhone", data.phone);
    setText("finalNationality", data.nationality);
  } else {
    setText("finalName", "No saved preview");
    setText("finalPosition", "Return to Page 1");
    setText("finalPhone", "Return to Page 1");
    setText("finalNationality", "Return to Page 1");
  }
    }
