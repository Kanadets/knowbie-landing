const emailHeaderForm = document.getElementById("header_email");
const emailHeaderButton = document.getElementById("header_button");
const emailHeaderDiv = document.getElementById("header-email-anim");
const emailHeaderSent = document.getElementById("header-email-sent-anim");
const contactUsForm = document.getElementById("anim-contact-us-container");
const contactUsFormSubmit = document.getElementById("anim-contact-us-submit");
const submitContactUsBtn = document.getElementById("submit-contact-us-btn");

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
const forRestaurantsInput = document.getElementById("for-restaurants-input");
const forResForm = document.getElementById("for-res-form");
const forRestaurantsBtn = document.getElementById("for-restaurants-btn");
const forRestaurantsEmailSentAnimForRes = document.getElementById(
  "for-restaurants-email-sent-anim-for-res"
);

emailHeaderButton.addEventListener("click", async (e) => {
  const data = { to_email: emailHeaderForm.value };

  const res = await sendEmail(data, "/send-email");

  if (res) {
    emailHeaderDiv.classList.add("hidden-email");

    emailHeaderDiv.addEventListener("transitionend", () => {
      emailHeaderDiv.classList.add("display-none");
      emailHeaderSent.classList.add("email-sent-show");
    });

    // setInterval(() => {
    //   emailHeaderSent.classList.remove("email-sent-show");
    //   emailHeaderSent.addEventListener("transitionend", () => {
    //     emailHeaderDiv.classList.remove("hidden-email");
    //     emailHeaderDiv.classList.remove("display-none");
    //   });
    //   clearInterval();
    // }, 5000);
  }
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
      contactUsFormSubmit.classList.add("show-contact-us-form-submit");
    });
  }
});

forRestaurantsBtn.addEventListener("click", async () => {
  const data = {
    to_email: forRestaurantsInput.value,
  };

  const res = await sendEmail(data, "/send-email");

  if (res) {
    forRestaurantsIntroEmailAnim.classList.add(
      "hide-for-restaurants-intro-email"
    );

    forRestaurantsIntroEmailAnim.addEventListener("transitionend", () => {
      forResForm.classList.add("display-none");
      forRestaurantsEmailSentAnimForRes.classList.add("email-sent-show");
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
