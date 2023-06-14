
function updateBoxplot(country){

  url = "http://127.0.0.1:5000/api/v1.0/boxplot"
  d3.json(url).then(function(data){
    console.log(data)

    //Dimensions for the chart
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create the SVG container
    const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create the scales
    const xScale = d3.scaleBand()
    .domain(data.map((_, i) => i))
    .range([0, width])
    .paddingInner(0.1);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.flat())])
    .range([height, 0]);

    // Create the box plot
    svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (_, i) => `translate(${xScale(i)},0)`)
    .selectAll("rect")
    .data(d => d3.boxPlotQuartiles(d))
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", d => yScale(d[2]))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d[0]) - yScale(d[2]))
    .attr("stroke", "black")
    .attr("fill", "transparent");

    // Add the median line
    svg.selectAll("g")
    .data(data)
    .selectAll("line")
    .data(d => [d3.boxPlotMedian(d)])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", d => yScale(d))
    .attr("x2", xScale.bandwidth())
    .attr("y2", d => yScale(d))
    .attr("stroke", "black");

    // Add the whiskers
    svg.selectAll("g")
    .data(data)
    .selectAll("line")
    .data(d => [d3.boxPlotWhiskers(d)])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", d => yScale(d[0]))
      })
      
}

// function updateLinegraphs(data, country){
//   url = "http://127.0.0.1:5000/api/v1.0/domestic_commodities/" + country
//   d3.json(url)
//   country_data = []
//   let x_times = []
//   let y_prices = []
//   for(i = 0; i < data.length; i++){
//     let current_list = data[i]
    

//     if(current_list[1] == country){
//       country_data.append(current_list)
//       x_times.append(current_list[0])
//       y_prices.append(current_list[5])
//     }
//   }
// //average per year
//   let line_data = [{
//     x: x_times,
//     y: y_prices,
//     type: "line"
//   }]
//   //x: month
//   //y: price
//   let layout = {
//     title: "Commodities for " + country
//   }
//   Plotly.newPlot("line",line_data,)
// }


// function updatestackedBarCharts(country){
  /*
example
const data = {
  labels: ['Category 1', 'Category 2', 'Category 3'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30],
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: [15, 25, 35],
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    },
    {
      label: 'Dataset 3',
      data: [5, 15, 25],
      backgroundColor: 'rgba(75, 192, 192, 0.5)'
    }
  ]
};

// Chart configuration
const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  }
};

// Create the chart
const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, config)


  */


function optionChanged(country){
  url = "/api/v1.0/domestic_change/" + country
  d3.json(url).then(function(data){



    //updateSankey(country)
    updateBoxplot(country)
    //updateLinegraphs(data, country)
  });
}

// function lineOptionChanged(country){
//   url = "/api/v1.0/domestic_change/" + country
//   d3.json(url).then(function(data){



//     //updateSankey(country)
//     updateBoxplot(country)
//     //updateLinegraphs(data, country)
//   });
// }

function init() {
  //Creating dropdown menu
  let dropdownMenu1 = d3.select("#selDataset");

  url = "http://127.0.0.1:5000/api/v1.0/box_country_list"
  d3.json(url).then(function(data){
    //console.log(data)

    for(i = 0; i < data.length; i++){
      dropdownMenu.append("option").attr("value", data[i][0]).text(data[i][0]);
      console.log(data[i])
    }
    
    optionChanged(data[0][0]);
  });

  
  // var dropdown2 = document.createElement("select"); 

  // dropdown2.id = "dropdown2"; 
  // d3.json("http://127.0.0.1:5000/api/v1.0/line_country_list").then(function(data){
  //   for(i = 0; i < data.length; i++){
  //     dropdownMenu.append("option").attr("value", data[i][0]).text(data[i][0]);
  //     console.log(data[i])
  //   }
    
  //   //optionChanged(data[0][0]);
  // })

}   
    

init();