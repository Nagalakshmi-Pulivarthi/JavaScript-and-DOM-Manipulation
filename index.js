// Get references to the tbody element, input field and button
var $tbody=document.querySelector("tbody");
var $dateinput=document.querySelector("#date-time");
var $cityinput=document.querySelector("#city");
var $stateinput=document.querySelector("#state");
var $countryinput=document.querySelector("#country");
var $shapeinput=document.querySelector("#shape");
var $searchbtn=document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchbtn.addEventListener("click",handleSearchButtonClick);
var pagelinks=document.querySelectorAll(".pagination a");
for(var i=0;i<pagelinks.length;i++){
  pagelinks[i].addEventListener("click",handlenavlinkButton);
}
function handlenavlinkButton(){
  var pageNumber = 1;
  console.log(this);
  if(this.innerText=="»"){
    var $links=document.querySelectorAll(".pagination a");
    var lastPageNum = $links[$links.length-2].innerText;
    if( parseInt( lastPageNum)>=numberOfPages ) return;
    for(var i=0;i<$links.length;i++){
      if(!isNaN($links[i].innerText))
      {
        $links[i].innerText =parseInt($links[i].innerText)+1;
      }
    }
    pageNumber = parseInt($links[$links.length-2].innerText);
  }
  else if(this.innerText=="«"){
    startingIndex += resultsPerPage;
    var $links=document.querySelectorAll(".pagination a");
    
    if($links[1].innerText=="1") return;

    for(var i=0;i<$links.length;i++){
      if(!isNaN($links[i].innerText))
      {
        $links[i].innerText =parseInt($links[i].innerText)-1;
      }
    }
    pageNumber = parseInt($links[1].innerText);
  }
  else
  {
    pageNumber =parseInt(this.innerText);
  }
    startingIndex = (pageNumber-1)*resultsPerPage;
  renderTable();
};


// Set filtereddata to Data initially
var filterdata=dataSet;
var startingIndex = 0;
var resultsPerPage = 500;//Math.ceil(filterdata.length/5,0);
var numberOfPages =  Math.ceil(filterdata.length/resultsPerPage);
// renderTable renders the filtereddata to the tbody
function renderTable()
{  
   var endingIndex = startingIndex + resultsPerPage;
   if(endingIndex > filterdata.length)
      endingIndex = filterdata.length
   document.querySelector("#pagingSpan").innerText = "Showing results from "+(startingIndex+1) +" to " + endingIndex + " out of "+filterdata.length+" results";
    var filterdataSubset = filterdata.slice(startingIndex, endingIndex);
    $tbody.innerHTML="";
    for(var i=0; i<filterdataSubset.length; i++){
    var data1 = filterdataSubset[i];
    var fields = Object.keys(data1);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data1[field];
    }
  }
}    

//dMoreBtn.addEventListener("click", handleSearchButtonClick);
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterdate = $dateinput.value.trim();
  var filtercity = $cityinput.value.trim().toLowerCase();
  var filterstate = $stateinput.value.trim().toLowerCase();
  var filtercountry =$countryinput.value.trim().toLowerCase();
  var filtershape =$shapeinput.value.trim().toLowerCase();

  //var convertdate=filterdate.toLocaleDate();
  //var convertdate=new Date(filterdate);
  //var finaldate=convertdate.toLocaleDateString();
  if(filterdate!='')
  {
   var dateParts = filterdate.split('-');
   filterdate = parseInt(dateParts[1])+'/'+ parseInt(dateParts[2]) +"/"+dateParts[0];
  }
  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filterdata= dataSet.filter(
      
     function(item) {
    var datadate = item.datetime;
    var citydata=item.city;
    var statedata=item.state;
    var countrydata=item.country;
    var shapedata=item.shape;


    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return (  (datadate === filterdate||filterdate==="")
            &&(citydata===filtercity||filtercity==="")
            &&(statedata===filterstate||filterstate==="")
            &&(countrydata===filtercountry||filtercountry==="")
            &&(shapedata===filtershape||filtershape===""));
  }
  
  );
  startingIndex=0;
  numberOfPages =  Math.ceil(filterdata.length/resultsPerPage);
  var pagelinks=document.querySelectorAll(".pagination a");
   for(var i=1;i<pagelinks.length-1;i++){
     pagelinks[i].innerText =i;
      if(i>numberOfPages)
      {
        pagelinks[i].style.display ="none";
      }
      else{
        pagelinks[i].style.display ="inline";
      }
    }

  //resultsPerPage = Math.ceil(filterdata.length/5,0);
  renderTable();
}
// Add an event listener to the button, call handleButtonClick when clicked
//$loadMoreBtn.addEventListener("click", handleButtonClick);


//Render the table for the first time on page load
renderTable();
    