const emailHeaderForm = document.getElementById("header_email");
const emailHeaderButton = document.getElementById("header_button");
const emailHeaderDiv = document.getElementById("header-email-anim");
const emailHeaderSent = document.getElementById("header-email-sent-anim");

emailHeaderButton.addEventListener("click", (e) => {
  console.log(emailHeaderForm.value);
  emailHeaderDiv.classList.toggle("hidden-email");

  emailHeaderDiv.addEventListener("transitionend", () => {
    emailHeaderDiv.classList.add("display-none");
    emailHeaderSent.classList.add("email-sent-show");

    setTimeout(() => {
      emailHeaderSent.classList.remove("email-sent-show");
      emailHeaderSent.addEventListener("transitionend", () => {
        emailHeaderDiv.classList.remove("hidden-email");
        emailHeaderDiv.classList.remove("display-none");
      });
    }, 2000);
  });
});
