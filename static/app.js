const url = 

function updateBar(data,subject_id){
}


function updateDemo(data,subject_id){
  console.log(`updateDemo ${subject_id}`);
  console.log(data);
  let id_metadata = findDictionary(data["metadata"],'id',parseInt(subject_id))

  let demoTable = d3.select("#sample-metadata");
  let keys = Object.keys(id_metadata)

  

}


function optionChanged(subject_id){
  // d3.json(url).then(function(data){
  //   updateBar(data, subject_id);
  //   updateBubble(data, subject_id);
  //   updateDemo(data, subject_id);
  // });
}


function init() {
  //Creating dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  d3.json(url).then(function(data){
    subject_ids = data.names;
    for(i = 0; i < subject_ids.length; i++){
      dropdownMenu.append("option").attr("value", subject_ids[i]).text(subject_ids[i]);
    }
    optionChanged(subject_ids[0]);
  });
}   

init();