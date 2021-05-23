// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument

function init() {
  var selector = d3.select("#selDataset")
  d3.json("samples.json").then((data) => {
    // console.log(importedData);
    // var data = importedData.samples;

      // Select the dropdown element
      var subjectIds = data.names;
      subjectIds.forEach((id) => {
        selector
        .append("option")
        .text(id)
        .property("value", id);
      });
      var firstSample = subjectIds[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }

  function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  init();
function buildMetadata(metaSample){
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == metaSample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
     Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

    // data = data.reverse();
  
    // Trace1 for the Greek Data
    function buildCharts(sample){
      d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var layout = {
          margin: {
            l: 100,
            r: 100,
            t: 30,
            b: 100
          }
        };
        var chartData = [
          {
          x:sample_values.slice(0,10).reverse(),
          y: otu_ids.slice(0,10).map(otu_ID => `OTU ${otu_ID}`).reverse(),
          text: otu_labels.slice(0,10).reverse(),
          type: "bar",
          orientation: "h"
          }
          
    ]
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale:'Earth',
        size: sample_values
      }
    };
    var bubbleData = [trace1];
    var layout = {
      title: 'Marker Size and Color',
      showlegend: false,
      xaxis: {title:"OTU ID "},
      margin: {t:30}
};
    Plotly.newPlot("bar", chartData, layout);
    Plotly.newPlot("bubble", bubbleData, layout) 
    });

    // var chartData = [trace1];
  
    // Apply the group bar mode to the layout
    
  
    // function updatePlotly() 
    // Render the plot to the div tag with id "plot"
    
  };
  