import EmailsInput from '../components/EmailsInput';

const email = 'test@gmail.com';
const email2 = 'test2@gmail.com';
const emailInvalid = 'test3@gmailcom';

describe('EmailsInput component', () => { 
  afterEach(() => {
    const component = document.querySelector(".emails-input");
    if(component) {
      document.body.removeChild(component);
    }
    return;
  });

  it('should render EmailsInput component without props', () => {
    const instance = new EmailsInput(document.body);
    const component = document.querySelector(".emails-input");
    const input = document.querySelector("input");

    expect(component.className).toEqual('emails-input');
    expect(input.placeholder).toBeFalsy();
   });


  it('should render EmailsInput component with className prop', () => {
    const className =  'customClass';
    const instance = new EmailsInput(document.body, {
      className
    });
    const component = document.querySelector(".emails-input");

    expect(component.className).toBe(`emails-input ${className}`);
  });

  it('should render EmailsInput component with placeholder prop', () => {
    const placeholder = 'Add more...';

    const instance = new EmailsInput(document.body, {
      placeholder
    });

    const input = document.querySelector('input');

    expect(input.placeholder).toBe(placeholder);
   });

   it('should add 1 email', () => {
    const instance = new EmailsInput(document.body);
    const email = 'test@gmail.com';

    expect(instance.getAllEmails()).toEqual([]);
  
    instance.addEmail(email);

    const block = document.querySelectorAll('.emails-input__block');

    expect(instance.getAllEmails()).toEqual([
      { email, isValid: true }
    ]);
    expect(block.length).toEqual(1);
  });

  it('should add 3 emails (2 valid 1 invalid)', () => {
    const instance = new EmailsInput(document.body);
    const email = 'test@gmail.com';

    expect(instance.getAllEmails()).toEqual([]);
  
    instance.addEmail([email, email2, emailInvalid]);

    const block = document.querySelectorAll('.emails-input__block');

    expect(instance.getAllEmails()).toEqual([
      { email, isValid: true },
      { email: email2, isValid: true },
      { email: emailInvalid, isValid: false }
    ]);
    expect(block.length).toEqual(3);
  });


  it('should replace 1 email', () => {
    const instance = new EmailsInput(document.body);
   
    instance.addEmail(email);
    instance.replaceEmail(email2);

    expect(instance.getAllEmails()).toEqual([
      { email: email2, isValid: true }
    ]);
  });

  it('should remove 1 email ', () => {
    const instance = new EmailsInput(document.body);
    const e = {
      preventDefault: jest.fn()
    }

    instance.addEmail(email);

    const block = document.querySelector('.emails-input__block');
    instance.removeBlock(e, block);

    expect(instance.getAllEmails()).toEqual([]);
  });

  it('should call the onChange callback when email is added', () => {
    const instance = new EmailsInput(document.body,{
      onChange: jest.fn()
    });

    instance.addEmail(email);

    expect(instance.onChange).toHaveBeenCalledTimes(1);
  });

  it('should call the onChange callback when email is replaced', () => {
    const instance = new EmailsInput(document.body,{
      onChange: jest.fn()
    });
    
    instance.addEmail(email);
    instance.replaceEmail(email2);

    //add and replace
    expect(instance.onChange).toHaveBeenCalledTimes(2); 
  });

  it('should call the onChange callback when email is removed', () => {
    const instance = new EmailsInput(document.body, {
      onChange: jest.fn()
    });
    const e = {
      preventDefault: jest.fn()
    }

    instance.addEmail(email);

    const block = document.querySelector('.emails-input__block');
    instance.removeBlock(e, block);

    //add and remove 
    expect(instance.onChange).toHaveBeenCalledTimes(2); 
  });
});

