# Miro frontend assessment - EmailsInput

Demo site avaliable here: 

## Example Usage

```html
<div id="emails-input"></div>

<script src="dist/emails-input.js"></script>
<script>
  const sampleEmail = 'katinka@k.com';
  const sampleEmailList = [sampleEmail, 'bogyo@domain.com', 'test@test.com', 'katinka@miro.com'];

  const component = new EmailsInput(
    document.querySelector('#emails-input'),
    {
      placeholder: 'any placeholder text here...',
      className: 'class1 class2',
      onChange: list => console.log('input changed to:', list);
    }
  );

  component.addEmail(sampleEmail);
  component.getAllEmails(); 
  component.replaceEmail(sampleEmailList);   
</script>
```

### option params & avaliable methods

**placeholder** | *string* | input placeholder text | not required <br />
**className** | *string* | additional component class name(s) | not required <br />
**function** | *function* | callback function for email list changes, returning an array with entered emails and the validity of the emails | not required

**addEmail(string || array(strings))** | *function* | validates then add the given string or array of strings to the emaiList and display it/them in the emailsInput component <br />
**replaceEmail(string || array(strings))** | *function* | removes the already entered emails from the emailList and emailsInput component and add the given string or array of strings to the emaiList and display it in the emailsInput component <br />
**getAllEmails()** | *function* returns all entered email in a list of objects and their validity. ```[{email: string, isValid: bool }]```

## Local development

### Install

1. `npm install` to install dependencies.
1. `npm run start` to run webpack dev server and open a preview in the browser.
1. Running on port 8080

### Unit Tests

1. `npm run test`
1. Unit tests under __tests__ directory will running (not 100% test coverage, I just wrote a couple of tests (10))

### Build

1. `npm run build` 
1. Built version will be found under `docs` directory (for github pages)

