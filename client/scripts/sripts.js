const contactUsForm = document.getElementById("anim-contact-us-container");
const contactUsFormSubmit = document.getElementById("anim-contact-us-submit");
const submitContactUsBtn = document.getElementById("submit-contact-us-btn");

const comingSoonTextChange = document.getElementById("coming-soon-link");

const fullNameInputContact = document.getElementById("fullNameInputContact");
const emailInputContact = document.getElementById("emailInputContact");
const companyTypeInputContact = document.getElementById(
  "companyTypeInputContact"
);
const companyNameInputContact = document.getElementById(
  "companyNameInputContact"
);
const messageInputContact = document.getElementById("messageInputContact");

const forRestaurantsIntroEmailAnim = document.getElementById(
  "for-restaurants-intro-email-anim"
);
const spanFormSubmit = document.getElementById("name-form-submit");

const burgerMenu = document.getElementById("nav-links-burger-open");

burgerMenu.addEventListener("click", () => {
  onLinkClick();
});

submitContactUsBtn.addEventListener("click", async () => {
  const data = {
    fullName: fullNameInputContact.value,
    to_email: emailInputContact.value,
    companyType: companyTypeInputContact.value,
    companyName: companyNameInputContact.value,
    message: messageInputContact.value || "Message was not included",
  };

  const res = await sendEmail(data, "/send-form-email");

  if (res) {
    contactUsForm.classList.add("hide-contact-us-form");

    contactUsForm.addEventListener("transitionend", () => {
      contactUsForm.classList.add("display-none");
      contactUsFormSubmit.classList.remove("display-none");
      contactUsForm.addEventListener("transitionend", () => {
        spanFormSubmit.innerText = fullNameInputContact.value;
        contactUsFormSubmit.classList.add("show-contact-us-form-submit");
      });
    });
  }
});

const sendEmail = async (data, url) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (e) {
    return e;
  }
};

const openGoogleForms = () => {
  document.getElementById("iframe-control").classList.add("iframe-open");
};

const closeGoogleForms = () => {
  document.getElementById("iframe-control").classList.remove("iframe-open");
};

const onLinkClick = () => {
  burgerMenu.childNodes[1].classList.toggle("upper-burger-open");
  burgerMenu.childNodes[3].classList.toggle("middle-burger-open");
  burgerMenu.childNodes[5].classList.toggle("bottom-burger-open");
  document
    .getElementById("nav-links-control")
    .classList.toggle("nav-links-open");
};

const backdropClick = () => {
  const iframeGoogle = document.getElementById("iframe-control");
  iframeGoogle.classList.remove("iframe-open");
};

comingSoonTextChange.addEventListener("mouseenter", () => {
  document.getElementById("coming-soon-link").innerText = "Coming soon";
});

comingSoonTextChange.addEventListener("mouseleave", () => {
  document.getElementById("coming-soon-link").innerText = "Blog";
});
