const { addDays, format, formatISO, getDay, isTuesday } = require('date-fns/fp');

const date = format('dd/MM/yyyy')(new Date());
// const date = format('dd/MM/yyyy')(addDays(1)(new Date()));
const dateIso = formatISO(new Date());
const dateIso2 = formatISO(addDays(2)(new Date()));

console.log(date);
console.log(format('dd/MM/yyyy')(new Date(dateIso)));
