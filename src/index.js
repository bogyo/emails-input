import EmailsInput from "./components/EmailsInput";
import { PLACEHOLDER_TEXT } from './utils/constants';
import './style/style.scss';

import { generateRandomEmail } from './utils/utils';

document.addEventListener('DOMContentLoaded', () => {
  // create instance of the component
  var inputContainerNode = document.querySelector('#emails-input');
  var options = {
      placeholder: PLACEHOLDER_TEXT,
      className: '',
      onChange: (list) => console.log('input changed to:', list)
  };

  var emailsInputInstance = new EmailsInput(inputContainerNode, {...options});

  document.querySelector(".btn-add").addEventListener("click", () => {
    const email = generateRandomEmail();
    emailsInputInstance.addEmail(email);
  });

  document.querySelector(".btn-get-count").addEventListener("click",() => {
    const emails = emailsInputInstance.getAllEmails();
    const validEmails = emails.filter(email => email.isValid);
    const msg = validEmails.length === 1 ? 
    `There is ${validEmails.length} valid email` : `There are ${validEmails.length} valid emails`;

    alert(msg);
  });

  document.querySelector(".btn-replace").addEventListener("click",() => {
    const emailsLength = emailsInputInstance.getAllEmails().length;

    const emailList = [...Array(emailsLength)].map((_, i) => generateRandomEmail());
    emailsInputInstance.replaceEmail(emailList);   
  }); 
});