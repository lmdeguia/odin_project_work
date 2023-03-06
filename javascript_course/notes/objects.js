function filter_list(l) {
  // Return a new array with the strings filtered out
  let idx;
  for (item of l) {
    console.log(item);
    if (typeof(item) === 'string'){
      idx = l.indexOf(item);
      
      l.splice(idx, 1);
    }
  }
  return l;
}


const out = filter_list([1,2,'a','b']);

// console.log(out);