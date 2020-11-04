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
    
    //Define a function to get grades from an array of ojbects
    var getGrade = function(object){
        return object.grade;
    }
    
    //Create mean quiz column
    rows.append("td")
        .text(function(student){
        return d3.mean(student.quizes.map(getGrade)).toFixed(2);
    })
    
    //Create mean HW column
    rows.append("td")
        .text(function(student){
        return d3.mean(student.homework.map(getGrade)).toFixed(2);
    })
    
    //Create mean Tests column
    rows.append("td")
        .text(function(student){
        return d3.mean(student.test.map(getGrade)).toFixed(2);
    })
    
    //Create final column
    rows.append("td")
        .text(function(student){
        return student.final[0].grade;
    })
};


//Retrieve data
var studentPromise = d3.json("classData.json");

//When data returns...
var successFun = function(d)
{
    //Print data
    console.log(d);
    
    //Create a table
    drawTable(d);
}

//When data was found...
var failFun = function(error)
{
    console.log(error);
}

//Call functions after retrieving data
studentPromise.then(successFun, failFun);