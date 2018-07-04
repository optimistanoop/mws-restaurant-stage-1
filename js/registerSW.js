if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: '/' })
  .then((register)=>{
    console.log(register);
  }).catch((error)=>{
    console.error(error);
  });
}