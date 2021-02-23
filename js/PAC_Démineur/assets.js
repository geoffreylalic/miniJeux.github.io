const assetsToLoadURLs = {
    mine :{ url: 'assets/images/demineur/mine.jpg'},
    caseVide : { url: 'assets/images/demineur/caseVide.png'},
    drapeau : { url: 'assets/images/demineur/drapeau.jpg'},
    image1:{url: 'assets/images/demineur/1.png'},
    image2:{url: 'assets/images/demineur/2.png'},
    image3:{url: 'assets/images/demineur/3.png'},
    image4:{url: 'assets/images/demineur/4.png'},
    image5:{url: 'assets/images/demineur/5.png'},
    image6:{url: 'assets/images/demineur/6.png'},
    image7:{url: 'assets/images/demineur/7.png'},
    image8:{url: 'assets/images/demineur/8.png'}
}

function loadAssets(callback) {
    // here we should load the souds, the sprite sheets etc.
    // then at the end call the callback function
    loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
  }
  
  // You do not have to understand in details the next lines of code...
  // just use them!
  
  /* ############################
      BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
      files have been loaded and decoded 
   ############################## */
  function isImage(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  
  function isAudio(url) {
    return url.match(/\.(mp3|ogg|wav)$/) != null;
  }
  
  function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;
  
    // define ifLoad function
    var ifLoad = function () {
      if (++loadedAssets >= numberOfAssetsToLoad) {
        callback(assetsLoaded);
      }
      console.log("Loaded asset " + loadedAssets);
    };
  
    // get num of assets to load
    for (var name in assetsToBeLoaded) {
      numberOfAssetsToLoad++;
    }
  
    console.log("Nb assets to load: " + numberOfAssetsToLoad);
  
    for (name in assetsToBeLoaded) {
      var url = assetsToBeLoaded[name].url;
      console.log("Loading " + url);
      if (isImage(url)) {
        assetsLoaded[name] = new Image();
  
        assetsLoaded[name].onload = ifLoad;
        // will start async loading.
        assetsLoaded[name].src = url;
      } else {
        // We assume the asset is an audio file
        console.log(
          "loading " + name + " buffer : " + assetsToBeLoaded[name].loop
        );
        assetsLoaded[name] = new Howl({
          urls: [url],
          buffer: assetsToBeLoaded[name].buffer,
          loop: assetsToBeLoaded[name].loop,
          autoplay: false,
          volume: assetsToBeLoaded[name].volume,
          onload: function () {
            if (++loadedAssets >= numberOfAssetsToLoad) {
              callback(assetsLoaded);
            }
            console.log("Loaded asset " + loadedAssets);
          },
        }); // End of howler.js callback
      } // if
    } // for
  } // function
  
