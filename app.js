var current_temp;

weather = Vue.component('weather', {
  props: ['location'],
  template: '<div class="weather_component">' +
    '<h3>{{ location }}</h3>' +
    "<div><strong>Temperature:</strong> {{ current_temp }}</div>" +
    "<div><strong>Max Temperature:</strong> {{ max_temp }}</div>" +
    "<div><strong>Min Temperature:</strong> {{ min_temp }}</div>" +
    "<img :src='icon'>" +
    "</div>",
  data: function () {
    var self = this;
    if(this.location) {
      axios.get("weather.php?command=search&keyword=" + this.location)
        .then(function (response) {
          axios.get("weather.php?command=location&woeid=" + response.data[0].woeid)
            .then(function (response) {
              self.current_temp = response.data.consolidated_weather[0].the_temp;
              self.max_temp = response.data.consolidated_weather[0].max_temp;
              self.min_temp = response.data.consolidated_weather[0].min_temp;
              self.icon = 'https://www.metaweather.com/static/img/weather/png/64/' + response.data.consolidated_weather[0].weather_state_abbr + '.png';
            })
        })
    }

    return {
      current_temp: self.current_temp,
      max_temp: self.max_temp,
      min_temp: self.min_temp,
      icon:  + self.icon
    }
  }
})

window.onload = function () {
  new Vue({ el: '#weather' })
}
