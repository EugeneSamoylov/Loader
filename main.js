import { addLoader, setProgress, removeLoader, animateLoader, stopAnimateLoader } from './scriptOfLoader.js';

const loaderId = addLoader(document.body, 'afterbegin');


// тесты методов

// setProgress(loaderId, 12);

// setTimeout(() => animateLoader(loaderId), 3000);
// setTimeout(() => stopAnimateLoader(loaderId), 6000);
// setTimeout(() => removeLoader(loaderId), 9000);

// function load(from, to){
//     let current = from;

//     setTimeout(function go() {
//         setProgress(loaderId, current);
//         if (current < to) {
//           setTimeout(go, 200);
//         }
//         current++;
//       }, 100);
// }

// load(0, 100);