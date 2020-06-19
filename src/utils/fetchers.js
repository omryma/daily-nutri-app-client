export const getLocation = async () => {
  const response = await fetch('http://ip-api.com/json/?fields=16593')
    .catch((e) => {
      console.log(e);
    });
  const location = await response.json()
  if (location.status === 'fail') return { status: 'fail' }
  return location;
}

const apiKey = 'hqXB1f6tFcH2FG9ngBOOhroEyG8BKrJ6'

export const autoCompleteLocation = async (query) => {
  const response = await fetch(`http://dataservice.accuweather.com//locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`)
    .catch((e) => console.log(e))
  const options = await response.json()
  return options;
}

