if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocationInfo)
}

function displayLocationInfo (position) {
  var blockToInsert = document.createElement('iframe')
  var containerBlock
  const lng = position.coords.longitude
  const lat = position.coords.latitude

  blockToInsert.style.width = '100%'
  blockToInsert.style.height = '600px'
  blockToInsert.style.border = '0'

  blockToInsert.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBdffraumdcWacCqb2uot3eZ4DmizWRn8g&q=haircut&center=' + lat + ',' + lng
  containerBlock = document.getElementById('map')
  containerBlock.appendChild(blockToInsert)
  console.log(`longitude: ${lng} | latitude: ${lat}`)
  console.log(blockToInsert.src)
}
