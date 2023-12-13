const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

//function takes in two hash tables
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // object is a hash table and is getting teh keys of the table 
  const keys = Object.keys(dataToUpdate);
  // error handling of hash table
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  // with the keys obtained above, the second object's uses those keys and also gives it an index starting from 1 
  const cols = keys.map((colName, idx) =>
      
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    //setCols gives each key an index
    setCols: cols.join(", "),
    // the first object's values 
    values: Object.values(dataToUpdate),
  };
}
//exporting the function elsewhere
module.exports = { sqlForPartialUpdate };
