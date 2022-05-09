//Variables
// ---> API Variables
const objectURL = "";
const testURL = "https://api.harvardartmuseums.org/object/228649/?apikey=e4224f80-5149-40c2-baf7-7dea1178f26e"; //The Gare Saint-Lazare, Monet
// ---> HTML Variables
const $input = $('input');
const $img = $('#art');
const $artist = $('#artist');
const $title = $('#title');
const $year = $('#year');
const $location = $('#location');
const $galleryText = $('#galleryText');

//Event Listeners
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
}


////////////////////////////////////////////////////
//TESTING THE METAPI

// ---> API Variables
const metURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/437107";
function handleGetData2() {
    $.ajax(metURL).then(function (data) {
        console.log('art data is ready');
        // Build photo url according to IIIF. attached string dictates that the image content is scaled for the best fit such that the resulting width and height are less than or equal to the requested width and height. More here: https://iiif.io/api/image/2.1/#size
        //$img.attr("src", data.primaryImageSmall);
        $artist.text(data.artistDisplayName);
        $title.text(data.title);
        $year.text(data.objectEndDate);
        // THis piece doesnt have location data, so will have to update?
        $galleryText.text('dummy text');
    }, function (error) {
        console.log('somethings is awry');
        console.log(error);
    });
}


// Coordinates:
//Nocturne in Grey and Gold : 51.48204449128982, -0.17413937371912416
//The Parc Monceau, Monet 48.8789630676398, 2.307332645028721
// The Dance Class 48.87490106924117, 2.3394563623329425
// mardigras 48.8712125970842, 2.344939078928708
// ile de la jatte 48.899723328699245, 2.2782328346520906