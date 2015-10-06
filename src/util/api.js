'use strict';

/*
  promisified api object.  TODO: enforce singleton?
*/

let api = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();

      req.open('GET', url);
      req.onload = () => {
        if (req.status === 200) resolve(req.response);
        reject(Error(req.statusTest));
      };
      req.onerror = () => reject(Error('Network Error'));
      req.send();
    });
  },
  location: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject(Error('Navigation not enabled'));
      let nav = navigator.geolocation;

      nav.getCurrentPosition((pos) => {
        resolve([pos.coords.latitude, pos.coords.longitude, 1000]);
      });
    });
  }
};

api.all = () => {
  return api.get('http://localhost:9000/accidents');
};

api.near = () => {
  return api
    .location()
    .then(data => {
      let [x, y, r] = data;
      return api.get(`http://localhost:9000/location/${x}/${y}/${r}`);
    })
    .then(data => JSON.parse(data));
};

export default api;
