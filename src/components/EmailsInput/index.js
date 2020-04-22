import './emails-input.scss';

export default class EmailsInput {
  constructor(
    elem, { placeholder = '', className= '', onChange } 
    = {}) {
    // initialize
    const component = document.createElement('div');
    component.className = className ? `emails-input ${className}` : 'emails-input';
  
    const input = document.createElement('input');
    input.className = 'emails-input__input';

    input.placeholder = placeholder || '';

    component.appendChild(input);
    elem.appendChild(component);

    this.component = component;
    this.input = input;
    this.blockList = [];
    this.emailList = [];

    if(onChange && typeof onChange === 'function'){
    this.onChange = onChange;
    }

    component.addEventListener('click', () => input.focus());
    input.addEventListener('keydown', this.onKeyDown);
    input.addEventListener('blur', this.onBlur);
    input.addEventListener('paste', this.onPaste);
  }

  validateEmail(email){
    const EMAIL_REGEX =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    return EMAIL_REGEX.test(email);
  }

  createBlock(emailToDisplay){
    const email = emailToDisplay.trim();
    const isValid =  this.validateEmail(email);

    const block = document.createElement('span');
    const blockClass = 'emails-input__block';
    const validityClass = isValid ? 'valid' : 'invalid';

    const classes = `${blockClass} ${blockClass}--${validityClass}`;

    block.className = classes;
    block.textContent = email;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'emails-input__remove-btn';

    removeBtn.addEventListener('click', e => {
      const index = this.blockList.indexOf(block);
      this.removeBlock(e, block)})

    block.appendChild(removeBtn);

    this.component.insertBefore(block, this.input);

    this.blockList.push(block);
    this.emailList.push(email);

    if(this.onChange) {
      this.onChange(this.emailList);
    }
  }

  removeBlock(e, block){ 
    e.preventDefault();    
    const index = this.blockList.indexOf(block);
    this.component.removeChild(block);

    this.blockList.splice(index, 1);
    this.emailList.splice(index, 1);

    if(this.onChange) {
      this.onChange(this.emailList);
    }
  }

  addEmail = email => {
    const emailList = Array.isArray(email) ? email : [email];

    emailList.forEach(item => this.createBlock(item));

    return;
  }

  addEmailByInput = input => {
    this.createBlock(input.value);
    
    return input.value = '';
  }

  replaceEmail = newEmail => {
    const emailList = Array.isArray(newEmail) ? newEmail : [newEmail];

    this.blockList.forEach(item => this.component.removeChild(item));

    this.blockList = [];
    this.emailList = [];

    emailList.forEach(item => this.createBlock(item));
    
    return;
  }

  getAllEmails = () => {
    return this.emailList.map(email => ({
        email,
        isValid: this.validateEmail(email)
      })
    )
  }

  onKeyDown = e => {
    const input = e.target;
    const which = e.which;

    if(!input.value) {
      return false;
    }

    if(which === 13 || which === 188) {
      return this.addEmailByInput(input);
    }
  }

  onBlur = e => {
    const input = e.target;

    if(!input.value) {
      return false;
    }

    return this.addEmailByInput(input);
  }

  onPaste = e => {
    e.stopPropagation();
    e.preventDefault();
    const input = e.target;
  
    if(e.clipboardData && e.clipboardData.getData) {
      let pastedText = '';
      if (window.clipboardData && window.clipboardData.getData) { // IE
          pastedText = window.clipboardData.getData('Text');
      } else if (e.clipboardData && e.clipboardData.getData) {
          pastedText = e.clipboardData.getData('text/plain');
          e.clipboardData.clearData ("text/plain");
      }
      const splittedText =  pastedText.split(/[\s, ]+/);
      this.addEmail(splittedText);
    }
      input.value = '';

      return false;
  }
}