//VARIABLES
// ---> API Variables
const artKey = config.artKey;
const objectURL = "";
const svKey = config.svKey;
const svURL = `https://maps.googleapis.com/maps/api/js?key=${svKey}&callback=initMap`;


// ---> HTML Variables
const $input = $('input');
const $img = $('#art');
const $artist = $('#artist');
const $title = $('#title');
const $year = $('#year');
const $location = $('#location');
const $galleryText = $('#galleryText');

// ---> Coordinates Object
const coordinates = [
    {
        title: "The Gare Saint-Lazare: Arrival of a Train",
        objectID: 228649,
        latlng: {
            lat: 48.876694707650074,
            lng: 2.3237073184146277,
        },
        // looking side-to-side
        heading: -15,
        // looking up & down
        pitch: 5,
    },
    {
        title: "Nocturne in Grey and Gold: Chelsea Snow",
        objectID: 230417,
        latlng: {
            lat: 51.482024320892386,
            lng: -0.17400301461757903
        },
        heading: 34,
        pitch: 10
    },
    {
        title: "Mardi Gras on the Boulevards",
        objectID: 229059,
        latlng: {
            lat: 48.871200703105124,
            lng: 2.344928095122574,
        },
        heading: -54,
        pitch: 15,
    },
    {
        title: "The Rehearsal",
        objectID: 303496,
        latlng: {
            lat: 48.87490106924117,
            lng: 2.3394563623329425,
        },
        heading: 50,
        pitch: 35,
    },
    {
        title: `Seated Figures, Study for "A Sunday Afternoon on the Island of La Grande Jatte"
        `,
        objectID: 229049,
        latlng: {
            lat: 48.89934596788276,
            lng: 2.277605163112671,
        },
        heading: 110,
        pitch: -10,
    }
]


//EVENT LISTENERS
$input.on('click', handleGetData);

//Functions

// --- > Initialize and add the default streetview
// ajax cannot parse the google maps API without specifying the data type to be JSONP. I THINK this is because requesting the street view url is technically requesting another file, which is not acceptable with the cross-domain policy of AJAX. JSONP will request the streetview as an external script from the outside domain, which is acceptable.
$.ajax({ url: svURL, dataType: "jsonp" }).then(function () {
    initMap();
});

//instaniate map/streetview
function initMap(loc) {
    // The location
    const location = loc.latlng;
    console.log(loc.latlng);
    // The map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: location,
    });
    // the panorama
    const panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), {
        position: location,
        pov: {
            // looking side-to-side
            heading: loc.heading,
            // looking up/down
            pitch: loc.pitch,
        },
    });

    map.setStreetView(panorama);
}

//update position of map
// function changePosition(center) {
//     const map = google.maps.Map(document.getElementById("map"));
//     const pano = google.maps.StreetViewPanorama(document.getElementById("pano"));
//     map.setCenter(center);
//     pano.setPosition(center);

// }

// ---> Retrieve painting details
function handleGetData(event) {

    event.preventDefault();

    // build API call URL using object # stored in the clicked thumbnail
    const objectURL = `https://api.harvardartmuseums.org/object/${event.target.id}/?apikey=${artKey}`

    $.ajax(objectURL).then(function (data) {
        console.log('art data is ready');
        // Build photo url according to IIIF. attached string dictates that the image content is scaled for the best fit such that the resulting width and height are less than or equal to the requested width and height. More here: https://iiif.io/api/image/2.1/#size
        let src = data.images[0].iiifbaseuri + '/full/full/0/default.jpg';
        $img.attr("src", src);
        $artist.text(data.people[0].displayname);
        $title.text(data.title);
        $year.text(data.dated);
        $galleryText.text(data.labeltext);
    }, function (error) {
        console.log('somethings is awry');
        console.log(error);
    });
};





