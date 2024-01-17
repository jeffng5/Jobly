"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Job {
    static async create({title, salary, equity, company_handle}){
        const duplicateCheck = await db.query(
            `SELECT handle FROM companies WHERE handle = $1`, [company_handle]
        );
        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Job already posted: ${company_handle}`);
        
        const result= await db.query(
            `INSERT into jobs (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING *`
            [title, salary, equity, company_handle]
        )
        const newJob=  result.rows[0]
        return newJob; 

    }

    static async findAll(){
        const getJob= await db.query(
            `SELECT title, salary, equity, company_handle FROM jobs ORDER BY title`
        );
        return getJob.rows
    }

    static async get(company_handle){
        const getJobByHandle= await db.query(
            `SELECT * from jobs WHERE company_handle = $1`, [company_handle]
        )
         const jobByHandle = getJobByHandle.rows[0];

         if (!jobByHandle) throw new NotFoundError(`No job named: ${company_handle}`)
        
         return jobByHandle;
    }

    // static async update(handle, data){
    //     const 

    // }

    static async remove(company_handle){    
        const result = await db.query(
            `DELETE 
            from jobs
            WHERE handle = $1 RETURNING handle`, [company_handle]);
        const deleted = result.rows[0];

        if (!deleted) throw new NotFoundError(`No job named: ${company_handle}`)

    }
   // filter function takes in 3 parameters and returns job info based off those parameters
    static async filter(title, minSalary, hasEquity)
  {   const result = await db.query(
// this query filters out the jobs based on entered parameters
      `SELECT * FROM jobs
      WHERE title %LIKES% $1 as title, salary => $2 as minSalary, hasEquity >= 0 as hasEquity,` [title, minSalary, hasEquity])
    let jobFilter = result.rows

   
    if (!jobFilter) throw NotFoundError('No job matches this query')
    return jobFilter

  }



}

module.exports = Job;