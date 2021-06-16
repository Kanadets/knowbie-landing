const emailHeaderForm = document.getElementById("header_email");
const emailHeaderButton = document.getElementById("header_button");

emailHeaderButton.addEventListener("click", (e) => {
  console.log(emailHeaderForm.value);
});
