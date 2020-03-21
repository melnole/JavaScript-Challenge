// from data.js
var tableData = data;

// YOUR CODE HERE!
//Using the UFO dataset provided in the form of an array of JavaScript objects
//write code that appends a table to your web page and then adds new rows of 
//data for each UFO sighting.

//Make sure you have a column for `date/time`, `city`, `state`, `country`,
// `shape`, and `comment` at the very least.

//Use a date form in your HTML document and write JavaScript code that will 
//listen for events and search through the `date/time` column to find rows 
//that match user input.


//variables
var $tbody = document.querySelector("tbody");
var $DatetimeInput = document.querySelector("Date_Time")
var $CityInput = document.querySelector("#City")
var $StateInput = document.querySelector("#State")
var $CountryInput = document.querySelector("#Country")
var $ShapeInput = document.querySelector("#Shape")
var $SearchButton = document.querySelector("#Search");
var $RecordCounter = document.querySelector("#Record_Counter");
var $Pages = document.querySelector("#Pages");
var $LoadButton = document.querySelector("#Load");
var $NextButton = document.querySelector("#Next");
var $PrevButton = document.querySelector("#Previous");

//listeners:

$SearchButton.addEventListener("click", handleSearchButtonClick);
$LoadButton.addEventListener("click", handleReloadButtonClick);
$NextButton.addEventListener("click", handleNextButtonClick);
$PrevButton.addEventListener("click", handlePrevButtonClick);
$Pages.addEventListener("change", handlePagesChange);

// from data.js
var tableData = data;
var count = 0;

//next button and prev button
function handleNextButtonClick() {
    count++;
    renderTable();
}

function handlePrevButtonClick() {
    count--;
    renderTable();
}

//  Renders for New Record Count Selected
function handlePagesChange() {
    renderTable();
}

// Handles search button click:

function handleSearchButtonClick() {
    var filterDate = $DatetimeInput.value.trim();
    var filterCity = $CityInput.value.trim().toLowerCase();
    var filterState = $StateInput.value.trim().toLowerCase();
    var filterCountry = $CountryInput.value.trim().toLowerCase();
    var filterShape = $ShapeInput.value.trim().toLowerCase();

    if (filterDate != "") {
        tableData = tableData.filter(function (date) {
        var dataDate = date.datetime;
        return dataDate === filterDate;
    });

    }

    if (filterCity != "") {
        tableData = tableData.filter(function (city) {
        var dataCity = city.city;
        return dataCity === filterCity;
    });
    }

    if (filterState != "") {
        tableData = tableData.filter(function (state) {
            var dataState = state.state;
            return dataState === filterState;
        });
    }

    if (filterCountry != "") {
        tableData = tableData.filter(function (country) {
            var dataCountry = country.country;
            return dataCountry === filterCountry;
        });
    }

    if (filterShape != "") {
        tableData = tableData.filter(function (shape) {
            var dataShape = shape.shape;
            return dataShape === filterShape;
        });
    }

    renderTable();
}
// 0 count thing
function handleReloadButtonClick() {
    count = 0;
    tableData = data;
    $DatetimeInput.value = '';
    $CityInput.value = '';
    $StateInput.value = '';
    $CountryInput.value = '';
    $ShapeInput.value = '';

    renderTable();
}

// Define renderTable function
function renderTable() {
    $tbody.innerHTML = "";

    // Get number of records to be rendered
    var pages = Number(document.getElementById("pages").value);

    // Initialize local variables
    var start = count * pages + 1;
    var end = start + pages - 1;
    var button;

    // Adjusting Records Displayed for end of Data and State of Next button
    if (end > tableData.length) {
      end = tableData.length;
      button = document.getElementById("Next");
      button.disabled = true;
    }
    else {
      button = document.getElementById("Next");
      button.disabled = false;
    }

    // Adjusts State of Previous button
    if (start == 1) {
      button = document.getElementById("Previous");
      button.disabled = true;
    }
    else {
      button = document.getElementById("Previous");
      button.disabled = false;
    }

    // Display Record Counts and Loads Records into Table
    $RecordCounter.innerText = "From Record: " + start + " to: " + end + " of " + tableData.length;
    // Outer loop loads specified number of records
    for (var i = 0; i < pages; i++) {
        var item = tableData[i+(count * pages)];
        var fields = Object.keys(item);
        var $row = $tbody.insertRow(i);
        // Inner loop loads fields in record
        for (var v = 0; v < fields.length; v++) {
            var field = fields[v];
            var $cell = $row.insertCell(v);
            $cell.innerText = item[field];
        }
    }
}
renderTable();
