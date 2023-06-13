
//sunburst or sankey
function updateSankey(country){


}

function updateBoxplot(country){

}

function updateLinegraphs(data, country){
  url = "http://127.0.0.1:5000/api/v1.0/domestic_commodities/" + country
  d3.json(url)
  country_data = []
  let x_times = []
  let y_prices = []
  for(i = 0; i < data.length; i++){
    let current_list = data[i]
    

    if(current_list[1] == country){
      country_data.append(current_list)
      x_times.append(current_list[0])
      y_prices.append(current_list[5])
    }
  }
//average per year
  let line_data = [{
    x: x_times,
    y: y_prices,
    type: "line"
  }]
  //x: month
  //y: price
  let layout = {
    title: "Commodities for " + country
  }
  Plotly.newPlot("line",line_data,)
}


function updateBarCharts(country){

}


function optionChanged(country){
  url = "/api/v1.0/domestic_change/" + country
  d3.json(url).then(function(data){



    updateSankey(country)
    updateBoxplot(country)
    updateLinegraphs(data, country)
  });
}


function init() {
  //Creating dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  url = "http://127.0.0.1:5000/api/v1.0/country_list"
  d3.json(url).then(function(data){
    console.log(data)
    for(i = 0; i < data.length; i++){
      dropdownMenu.append("option").attr("value", data[i][0]).text(data[i][0]);
    }
    optionChanged(data[i][0]);
  });
}   
    

init();