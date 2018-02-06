
import { HTTP } from 'meteor/http'
// attach connect-style middleware for response header injection
Meteor.startup(function () {
WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});
})


if(Meteor.isServer) {

Meteor.methods({
  getData() {
var count = 0;
var finalData = []

for(var i = 0 ; count <=9 ; i ++){
try {
  var result = HTTP.get( "http://api.giphy.com/v1/gifs/random?api_key=5SWFmaJHfQh3seufHeHd7XwsILxKuKNg&limit=10" )
  var DATA = result.content;
  console.log(result.data.data.id)

  var result2 =HTTP.get( "http://api.giphy.com/v1/gifs/"+result.data.data.id+"?api_key=5SWFmaJHfQh3seufHeHd7XwsILxKuKNg" )
  var DATA2 =  result2.content;
  console.log(result2.data.data.images.downsized_small.mp4_size);
  if(result2.data.data.images.downsized_small.mp4_size < 100000){
  	count++;
 console.log(count)

 console.log(result2.data.data.images.downsized_small.mp4_size)
 finalData.push(result2)
  }
} catch(e) {
  console.log( "Error ", e );
}
}
return finalData;
  }
});
	console.log("Server")
}