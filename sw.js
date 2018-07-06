let cacheName = 'v1';

self.addEventListener('fetch', (event)=>{
  event.respondWith(caches.match(event.request).then((response)=>{
    if (response !== undefined) return response;
        
    return fetch(event.request).then((response)=>{
      let responseClone = response.clone();
      caches.open(cacheName).then((cache)=>{
        cache.put(event.request, responseClone);
      });
      return response;
    }).catch((error)=>{
			console.error(error);
    });  
  }));
});

self.addEventListener('install', (event)=>{
  event.waitUntil(
    caches.open(cacheName).then((cache)=>{
      return cache.addAll([
        '/',
      	'/index.html',
      	'/restaurant.html',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/registerSW.js',
      	'sw.js',
        '/data/restaurants.json',
      	'/css/styles.css',
      	'/img/1.jpg',
      	'/img/2.jpg',
      	'/img/3.jpg',
      	'/img/4.jpg',
      	'/img/5.jpg',
      	'/img/6.jpg',
      	'/img/7.jpg',
      	'/img/8.jpg',
      	'/img/9.jpg',
      	'/img/10.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', (event)=>{
  event.waitUntil(
    caches.keys().then((keyList)=>{
      let promises = keyList.map((key)=>{
          if(cacheName.indexOf(key) === -1){
            return caches.delete(key);
          }
        });
      return Promise.all(promises);
    })
  );
});
