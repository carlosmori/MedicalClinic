const { addDays, format, formatISO } = require('date-fns/fp');

const date = format('dd/MM/yyyy')(addDays(1)(new Date()));
const dateIso = formatISO(addDays(1)(new Date()));
const dateIso2 = formatISO(addDays(2)(new Date()));

console.log(dateIso > dateIso2);
