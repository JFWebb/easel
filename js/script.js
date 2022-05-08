//Variables
// ---> API Variables
const URL = "https://api.harvardartmuseums.org/object/"
const KEY = "apikey=e4224f80-5149-40c2-baf7-7dea1178f26e";
const testURL = "https://api.harvardartmuseums.org/object/228649/?apikey=e4224f80-5149-40c2-baf7-7dea1178f26e"; //The Gare Saint-Lazare, Monet
// ---> HTML Variables
const $img = $('#art');
const $artist = $('#artist');
const $title = $('#title');
const $year = $('#year');
const $location = $('#location');
const $galleryText = $('#galleryText');

//Event Listeners

//Functions
// ---> Retrieve painting details
function handleGetData(){
    $.ajax(testURL).then(function(data){
        console.log('art data is ready');
        let src = data.images[0].iiifbaseuri + '/full/full/0/default.jpg';
        $img.attr("src", src);
        console.log(document.querySelector("#art"));
        $artist.text(data.people[0].displayname);
        $galleryText.text(data.labeltext);
    }, function (error) {
        console.log('somethings is awry');
        console.log(error);
    });
}