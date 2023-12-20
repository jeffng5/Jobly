const Job = require("./job.js");
const db = require("../db.js");




async function beforeAll() {
const result = await db.query(`INSERT INTO jobs (title, salary, equity, company_handle)
VALUES ('c1', 20000, .5, "C1"`)}
beforeAll()

describe("findAll", function () {
    test("finds all jobs", async function() {


        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
               title: "c1",
               salary: 20000,
               equity: .5,
               company_handle: "C1" 
            }

        ])
    }
    
    )



})