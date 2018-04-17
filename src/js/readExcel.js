const _ = require('underscore')
const XLSX = require('xlsx')

function csvJSON(csv){
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for(var i = 1; i < lines.length; i++){
	  var obj = {};
	  var currentline = lines[i].split(",");

	  for(var j = 0; j < headers.length; j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  //return result; //JavaScript object
  return (result); //JSON
}

function cleanData(result){
  return _.filter(result, entry => {
    return (entry['Date'] !== "" && entry['Time'] !== "" &&
      entry['Ambient'] !== "" && entry['%RH'] !== "" &&
      entry["Wind speed KPH"] !== "" && entry['0° W/m²'] !== "" &&
      entry['Blk Pnl °C'] !== "" && entry['Wind Direction'] !== "" &&
      entry['m/s'] !== "")
  })
}

function readExcel(file, callback){
  var reader = new FileReader()
  console.log(file)
  reader.onload = function(e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: 'binary'
    })

    var result;
    var sheet_name_list = workbook.SheetNames
    _.each(sheet_name_list, (sheet) => {
      var sheetResult = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet], {raw: true})
      if (sheetResult.length > 0) {
        result = csvJSON(sheetResult)
      }
    })

    result = cleanData(result)
    callback(result)
  }

  reader.readAsBinaryString(file)
}

function findMonths(data){
  var months = _.map(data, entry => {
    const date = entry['Date'].split("/")
    return date[0]
  })
  return _.uniq(months)
}

function findDays(month){
  var months = _.map(data, entry => {
    const date = entry['Date'].split("/")
    return date[1]
  })
  return _.uniq(months)
}

function splitDaysIntoMonths(data){
  var dataSplitByDay = []
  var months = findMonths(data)
  console.log(months, "månader")
  var result = _.map(months, month => {
    return _.filter(data, entry => {
      const date = entry['Date'].split("/")
      return date[0] === month
    })
  })
  return result
}

module.exports = {
  readExcel,
  splitDaysIntoMonths
}
