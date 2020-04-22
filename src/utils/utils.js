export function generateRandomEmail(){
  const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'; //0123456789
  const minLength = 2; 
  const maxLengthName = 8; //just sample
  const randomLength = Math.floor(Math.random() * (maxLengthName - minLength + 1) + minLength);

  /* real rules regarding to domain, tld, email min/max length and other rules here:  
  RFC 5322, RFC 1034, RFC 1035 etc */

  const exampleDomainList = ['gmail', 'yahoo', 'miro',  'test', 'domain'];
  const exampleTldList = ['com', 'org', 'hu', 'ru', 'nl'];    
  const domain = exampleDomainList[Math.floor(Math.random() * exampleDomainList.length)];
  const tld = exampleTldList[Math.floor(Math.random() * exampleTldList.length)];
  
  let emailName = '';

  for ( var i = 0; i < randomLength; i++ ) {
      emailName += CHARACTERS.charAt(Math.floor(Math.random() * maxLengthName));
   }
 
  const email = `${emailName}@${domain}.${tld}`;

  return email;
}