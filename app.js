// BELLY BUTTON BACTERIA
// Load test subject IDs in to dropdown
var dropdownSubjects = bellyButtonData.dataset.names;
console.log(dropdownSubjects);

dropdownSubjects.forEach(function(subject){
    //add a new Option element to the HTML
    var newOption = d3.select("select").append("option");
    // add the subject to the newOption so it appears in the dropdown
    newOption.text(subject);
});



// Initializes the page with a default plot
function init() {
    data = [{
      x: [],
      y: [] }];
  
    Plotly.newPlot("bar", data);
  }
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);

  // This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    var x = [];
    var y = [];
  
    if (dataset === 'dataset1') {
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
    }
  
    if (dataset === 'dataset2') {
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
    }
  
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }
  
  init();
  
  


// 1. Use the D3 library to read in samples.json.
d3.json("data/bellyButtonData.json").then((importedData) => {
    console.log(importedData);
    var bacteriaData = importedData;
});
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.


// 3. Create a bubble chart that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected.

// BONUS
// The following task is advanced and therefore optional.
    // Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ 
    // to plot the weekly washing frequency of the individual.
    // You will need to modify the example gauge code to account for values ranging from 0 through 9.
    // Update the chart whenever a new sample is selected.

// DEPLOYMENT
// Deploy your app to a free static page hosting service, such as GitHub Pages.
// Submit the links to your deployment and your GitHub repo.