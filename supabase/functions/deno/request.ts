/** string */

// en - name
const res = await fetch("https://green.adam.ne.jp/roomazi/cgi-bin/randomname.cgi");
const text = await res.text();
console.info(text);
// const json = await res.json();
// console.info(json);

export {};
