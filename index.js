
//Define a function to get % grades from an array of ojbects
var getGrade = function(object){
    return (object.grade/object.max)*100;
}
    
//Get total grade
var getTotalGrade = function(student){
    return (d3.mean(student.quizes.map(getGrade))*0.2 + d3.mean(student.homework.map(getGrade))*0.15 + d3.mean(student.test.map(getGrade))*0.3 + student.final[0].grade*0.35).toFixed(2);
}

//Create a table
var drawTable = function(d)
{   
    //Create table rows
    var rows = d3.select("#studentsTable tbody")
        .selectAll("tr")
        .data(d)
        .enter()
        .append("tr")
    
    //Create picture column
    rows.append("td")
        .append("img")
        .attr("src", function(student){
        return "imgs/" + student.picture;
    })
    
    //Create mean quiz column
    rows.append("td")
        .text(function(student){
        return d3.mean(student.quizes.map(getGrade)).toFixed(2) + "%";
    })
    
    //Create mean HW column
    rows.append("td")
        .text(function(student){
        return d3.mean(student.homework.map(getGrade)).toFixed(2) + "%";
    })
    
    //Create mean Tests column
    rows.append("td")
        .text(function(student){
        return d3.mean(student.test.map(getGrade)).toFixed(2) + "%";
    })
    
    //Create final column
    rows.append("td")
        .text(function(student){
        return student.final[0].grade + "%";
    })
    
    //Create grade column
    rows.append("td")
        .text(getTotalGrade)
        //Warning for low-grade students
        .classed("warning", function(student){
            if (getTotalGrade(student)<70)
            {
                return true;
            }
            else
            {
                return false;
            }
        })
};

//Clear table
var clearTable = function()
{
    d3.selectAll("#studentsTable tbody tr")
        .remove();
}

//Sort table
var sortTable = function(d)
{
    d3.select("#quiz")
    .on("click", function()
        {
            console.log("Clicked");
            d.sort(function(a, b){
                return d3.mean(b.quizes.map(getGrade)) - d3.mean(a.quizes.map(getGrade));
            })
        clearTable();
        drawTable(d);
    })
    
    d3.select("#hw")
    .on("click", function()
        {
            console.log("Clicked");
            d.sort(function(a, b){
                return d3.mean(b.homework.map(getGrade)) - d3.mean(a.homework.map(getGrade));
            })
        clearTable();
        drawTable(d);
    })
    
    d3.select("#hw")
    .on("click", function()
        {
            console.log("Clicked");
            d.sort(function(a, b){
                return d3.mean(b.homework.map(getGrade)) - d3.mean(a.homework.map(getGrade));
            })
        clearTable();
        drawTable(d);
    })
    
    d3.select("#test")
    .on("click", function()
        {
            console.log("Clicked");
            d.sort(function(a, b){
                return d3.mean(b.test.map(getGrade)) - d3.mean(a.test.map(getGrade));
            })
        clearTable();
        drawTable(d);
    })
    
    d3.select("#final")
    .on("click", function()
        {
            console.log("Clicked");
            d.sort(function(a, b){
                return b.final[0].grade - a.final[0].grade;
            })
        clearTable();
        drawTable(d);
    })
    
    d3.select("#grade")
    .on("click", function()
        {
            console.log("Clicked");
            d.sort(function(a, b){
                return getTotalGrade(b) - getTotalGrade(a);
            })
        clearTable();
        drawTable(d);
    })
}


//Retrieve data
var studentPromise = d3.json("classData.json");

//When data returns...
var successFun = function(d)
{
    //Print data
    console.log(d);
    
    //Create table
    drawTable(d);
    
    //Sort table
    sortTable(d);
}

//When data was found...
var failFun = function(error)
{
    console.log(error);
}

//Call functions after retrieving data
studentPromise.then(successFun, failFun);