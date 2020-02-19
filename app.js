// BELLY BUTTON BACTERIA

// function unpack(rows, index) {
//     // return rows.map(function(row) {
//     //   return row[index];
//     return rows.map(row =>row[index]);
//     // });
//   }

function buildPlot() {
//Get the data
    d3.json("data/bellyButtonData.json").then(function(data){
        console.log(data);

// --------------------------------------------------------------------------------------
    // Get the names
        var names = data.names;
        console.log("Names: ", names);
        // Load names array into dropdown menu
        names.forEach(function(name){
            //add a new Option element to the HTML
            var newOption = d3.select("select").append("option");
            // add the subject to the newOption so it appears in the dropdown
            newOption.text(name);
        });

// --------------------------------------------------------------------------------------
// Extract the metadata
        var metadataArray = data.metadata;
        // console.log("metadata: ", metadataArray);
// --------------------------------------------------------------------------------------
    // SAMPLE_VALUES
        // Get sample_values, create an empty array
        var listOfSampleValues = [];
        var slicedListofSampleValues = [];

        // isolate the sampleArray
        var sampleArray = data.samples;
        // loop through the sample Array to pull out the sample values
        for (var i = 0; i < sampleArray.length; i++){
            // extract all the samples and push to listOfSampleValues
            var singleSample = data.samples[i].sample_values;
            listOfSampleValues.push(singleSample);
            // extract only the first 10 values and push to slicedListofSampleValues
            var sampleSlice = singleSample.slice(0,10);
            slicedListofSampleValues.push(sampleSlice);
        };
        // console.log("Sample Values List: ", listOfSampleValues);
        // console.log("Sample Slice: ",slicedListofSampleValues);
// --------------------------------------------------------------------------------------
    // OTU_IDS
        // Get otu_ids, create an empty array
        var listOfOTUIDs = [];
        var sliceOfOTUids = [];

        // isolate the sampleArray
        var OTUIDArray = data.samples;
        // loop through the sample Array to pull out the sample values
        for (var i = 0; i < OTUIDArray.length; i++){
            // extract all the otu_ids and push to listOfOTUIDs
            var singleOTU = data.samples[i].otu_ids;
            // console.log(singleOTU);
                // add OTU to the start of each id ex. "OTU id#"
                for (var x = 0; x < singleOTU.length; x++){
                    // console.log(x);
                    var updateOTU = "OTU " + singleOTU[x]
                    // console.log(updateOTU);
                    singleOTU.splice(x,1+x,updateOTU);
                }

            listOfOTUIDs.push(singleOTU);
            
            // extract only the first 10 values and push to slicedListofSampleValues
            var OTUidSlice = singleOTU.slice(0,10);
            sliceOfOTUids.push(OTUidSlice);
        };
        // console.log("OTU Ids List: ", listOfOTUIDs);
        // console.log("otu_id Slice: ", sliceOfOTUids)
 
// --------------------------------------------------------------------------------------     
// Get otu_labels, create an empty array
        var listOfOTULabels = [];
        var slice_otu_labels = [];
         // isolate the sampleArray
         var OTULabelArray = data.samples;
         // loop through the sample Array to pull out the sample values
         for (var i = 0; i < OTULabelArray.length; i++){
             // extract full list
             var singleOTUlabel = data.samples[i].otu_labels;
             listOfOTULabels.push(singleOTUlabel);
             // slice the list
             var otu_labelSlice = singleOTUlabel.slice(0,10);
             slice_otu_labels .push(otu_labelSlice);
         };
        // console.log("OTU Labels List: ", listOfOTULabels);
        // console.log("otu_label Slice: ",slice_otu_labels);
// =================================================================== 
//DROPDOWN select
var sel = document.getElementById('selDataset');

// display value property of select list (from selected option)
console.log( sel.value );

// Use D3 to create an event handler
d3.select("#selDataset").on("change", updatePage);
function updatePage() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset").node();
  // Assign the dropdown menu option to a variable
  var selectedSample = dropdownMenu.value;
  console.log(selectedSample);
  var sampleIndex = names.indexOf(selectedSample);
  console.log(sampleIndex);
// --------------------------------------------------------------------------------------
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    var barTrace ={
        x: slicedListofSampleValues[sampleIndex].reverse(),
        y: sliceOfOTUids[sampleIndex].reverse(),
        text: slice_otu_labels[sampleIndex].reverse(),
        type: "bar",
        orientation: "h"
    };

    var data = [barTrace];

    var layout ={
        title:`Subject ${names[sampleIndex]}: Top 10 Bacteria`,
        xaxis: {
            title: "sample values"
        },
        yaxis: {
            title: "otu id"
        }
    };

    Plotly.newPlot("bar", data, layout);
// --------------------------------------------------------------------------------------   
// 3. Create a bubble chart that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.
    // console.log(listOfOTUIDs[0]);
    var bubbleTrace = {
        x: listOfOTUIDs[sampleIndex],
        y: listOfSampleValues[sampleIndex],
        type: "scatter",
        mode: 'markers',
        marker: {
          size: listOfSampleValues[sampleIndex]
        },
        text: listOfOTULabels[sampleIndex]
      };
      
      var data = [bubbleTrace];
      
      var layout = {
        title: `Subject ${names[sampleIndex]}: All Samples`,
        showlegend: false,
        height: 500,
        xaxis: {
            title: "OTU IDs"
        },
        yaxis: {
            title: "Sample Values"
        }
      };
      
      Plotly.newPlot('bubble', data, layout);
// --------------------------------------------------------------------------------------  
// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// console.log(metadataArray[0]);
var card = d3.select("#sample-metadata");
card.append("p").text(`ID: ${metadataArray[sampleIndex].id}`);
card.append("p").text(`Ethnicity: ${metadataArray[sampleIndex].ethnicity}`);
card.append("p").text(`Gender: ${metadataArray[sampleIndex].gender}`);
card.append("p").text(`Age: ${metadataArray[sampleIndex].age}`);
card.append("p").text(`Location: ${metadataArray[sampleIndex].location}`);
// --------------------------------------------------------------------------------------  

// BONUS
// The following task is advanced and therefore optional.
    // Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ 
    // to plot the weekly washing frequency of the individual.
    // You will need to modify the example gauge code to account for values ranging from 0 through 9.
    // Update the chart whenever a new sample is selected.
    var wklyScubFreq = metadataArray[sampleIndex].wfreq;
        // console.log("scrubs: ", wklyScubFreq);

    var data = [
        {
          type: "indicator",
          mode: "gauge+number",
          value: wklyScubFreq,
          title: "Weekly Washings",
          delta: { reference: 4, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "blue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0,1], color: "CornflowerBlue" },
              { range: [1,2], color: "royalblue" },
              { range: [2,3], color: "CornflowerBlue" },
              { range: [3,4], color: "royalblue" },
              { range: [4,5], color: "CornflowerBlue" },
              { range: [5,6], color: "royalblue" },
              { range: [6,7], color: "CornflowerBlue" },
              { range: [7,8], color: "royalblue" },
              { range: [8,9], color: "CornflowerBlue" }
            ]
          }
        }
      ];
      
    //   var layout = {
    //     width: 500,
    //     height: 400,
    //     margin: { t: 25, r: 25, l: 25, b: 25 },
    //     paper_bgcolor: "lavender",
    //     font: { color: "darkblue", family: "Arial" }
    //   };
      
      Plotly.newPlot('gauge', data);



// --------------------------------------------------------------------------------------  
// 6. Update all of the plots any time that a new sample is selected.


// --------------------------------------------------------------------------------------  
    }
    });
}

buildPlot();



// BONUS
// The following task is advanced and therefore optional.
    // Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ 
    // to plot the weekly washing frequency of the individual.
    // You will need to modify the example gauge code to account for values ranging from 0 through 9.
    // Update the chart whenever a new sample is selected.

// DEPLOYMENT
// Deploy your app to a free static page hosting service, such as GitHub Pages.
// Submit the links to your deployment and your GitHub repo.