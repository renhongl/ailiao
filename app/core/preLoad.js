'use strict';
(function() {

    let body = document.querySelector('body');
    let loadingDiv = document.createElement('div');
    let loadingImg = document.createElement('img');
    loadingDiv.id = 'loadingDiv';
    loadingImg.id = 'loadingImg';
    loadingImg.src = 'images/loading.gif';
    loadingDiv.appendChild(loadingImg);
    body.appendChild(loadingDiv);

})();