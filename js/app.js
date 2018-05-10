// public key 783939daf19eb8441847704249ce67dc
// private 736196fbf1af1db71394c54f8a4f247b9030bd5c

const pubKey =  "783939daf19eb8441847704249ce67dc";
const privKey =  "736196fbf1af1db71394c54f8a4f247b9030bd5c";

var date = new Date();
var ts = date.getTime();
var hash = CryptoJS.MD5(ts + privKey + pubKey).toString();


$.ajax({
  url: 'https://gateway.marvel.com/v1/public/comics',
  data: { 
    apikey: pubKey  ,
    ts: ts,
    hash: hash
   },
  success: function(data) {
    var results = data.data.results;
    
    var html = '';
    results.forEach(result => {
      if (result.images.length) {
      html += '<div class="col-md-4">';
      
        html += '<img src="' + result.images[0].path + '.' + result.images[0].extension +'">';
      
      html += '<p class="lead">' + result.title +'</p>'
      if (result.description) {
        html += '<p>' + result.description + '</p>'
      }
      html += "</div>"
    }
    });
    $('.loader').hide()
    $('#comic-list').append(html);
  },
  error: function(err) {
    console.log('Error getting data', err);
  }
})