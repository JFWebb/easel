//VARIABLES
// ---> API Variables
const objectURL = "";
const svKey = "e4224f80-5149-40c2-baf7-7dea1178f26e";
const svURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDDQ3QWiI0AVuOoS-LK2RNYHNF_fethYjA&callback=initMap";


// ---> HTML Variables
const $input = $('input');
const $img = $('#art');
const $artist = $('#artist');
const $title = $('#title');
const $year = $('#year');
const $location = $('#location');
const $galleryText = $('#galleryText');

// ---> Coordinates Object


//EVENT LISTENERS
$input.on('click', handleGetData);

//Functions
// ---> Retrieve painting details
function handleGetData(event) {

    event.preventDefault();

    // build API call URL using object # stored in the clicked thumbnail
    const objectURL = `https://api.harvardartmuseums.org/object/${event.target.id}/?apikey=e4224f80-5149-40c2-baf7-7dea1178f26e`

    $.ajax(objectURL).then(function (data) {
        console.log('art data is ready');
        // Build photo url according to IIIF. attached string dictates that the image content is scaled for the best fit such that the resulting width and height are less than or equal to the requested width and height. More here: https://iiif.io/api/image/2.1/#size
        let src = data.images[0].iiifbaseuri + '/full/full/0/default.jpg';
        $img.attr("src", src);
        $artist.text(data.people[0].displayname);
        $title.text(data.title);
        $year.text(data.dated);
        // THis piece doesnt have location data, so will have to update?
        $galleryText.text(data.labeltext);
    }, function (error) {
        console.log('somethings is awry');
        console.log(error);
    });
};

$.ajax({ url: svURL, dataType: "jsonp" }).then(function () {
    initMap();
  });

  // Initialize and add the map
function initMap() {
    // The location
    const saintLazare = { lat: 48.87654299083505, lng: 2.3238306820761157 };
    // The map
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: saintLazare,
    });

    const panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), {
        position: saintLazare,
        pov: {
            heading: 34,
            pitch: 10,
        },
    });
    
      map.setStreetView(panorama);
}
// Coordinates:
//Nocturne in Grey and Gold : 51.48204449128982, -0.17413937371912416
//The Parc Monceau, Monet 48.8789630676398, 2.307332645028721
// The Dance Class 48.87490106924117, 2.3394563623329425
// mardigras 48.8712125970842, 2.344939078928708
// ile de la jatte 48.899723328699245, 2.2782328346520906
// Saint Lazare 48.87654299083505, 2.3238306820761157