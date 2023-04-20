const my_URL = new URL(
  'https://github.com/search?q=owner%3AMilaZiabchenko+react&type=code'
);

const my_URL_Info = {
  href: my_URL.href,
  protocol: my_URL.protocol,
  hostname: my_URL.hostname,
  pathname: my_URL.pathname,
  searchParams: my_URL.searchParams
}

console.log({ my_URL });
console.log({ my_URL_Info });
console.log(my_URL.searchParams.get('q'));
console.log(my_URL.searchParams.get('type'));
