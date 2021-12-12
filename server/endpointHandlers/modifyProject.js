'use strict';

//require Mongodb
const { MongoClient } = require("mongodb");

//get URI
require("dotenv").config({path:"../.env"});
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// modify a project
const modifyProject = async (req, res) =>  {
    try {
        // get the project id from the request parameters
        const { _id } = req.params;
        
        // get updated info from request body
        const { 
                project_name,
                approval,
                description,
                requested_budget,
                actual_budget,
                status,
                final_report,
                } = req.body;

        // create a new client
        const client = new MongoClient(MONGO_URI, options);

        // connect to the client
        await client.connect();

        // connect to the database
        const db = client.db("goodmorning");
        console.log("CONNECTED");   

        // find the employee
        const projectFound = await db.collection("projects")
                                        .findOne({_id}); 
        
        // check for updated information
        const newName = projectFound.project_name !== project_name ? project_name : projectFound.project_name;
        const newApproval = projectFound.approval !== approval ? approval : projectFound.approval;
        const newDescription = projectFound.description !== description ? description : projectFound.description;
        const newRequested_budget = projectFound.requested_budget !== requested_budget ? requested_budget : projectFound.requested_budget;
        const newActual_budget = projectFound.actual_budget !== actual_budget ? actual_budget : projectFound.actual_budget;
        const newStatus = projectFound.status !== status ? status : projectFound.status;
        const newFinal_report = projectFound.final_report !== final_report ? final_report : projectFound.final_report;
        
        // update all employee info except projects
        const filterProjects = {"_id":_id};
        
        const updateProjectInfo = {$set: {
                                            "project_name": newName,
                                            "approval": newApproval,
                                            "description" : newDescription,
                                            "requested_budget" : newRequested_budget,
                                            "actual_budget" : newActual_budget,
                                            "status" : newStatus,
                                            "final_report" : newFinal_report,
                                            }};

        // update
        const updatedProject = await db.collection("projects")
                                        .updateOne(filterProjects, updateProjectInfo);  

        //close the collection
        client.close();
        console.log("DISCONNECTED");

        // return the json object and status
        return (

            // SUCCESS return
            res.status(200).json({
                status: 200,
                data: updatedProject,
            })
        ) 
    } catch (err) {

        // ERROR return
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
}

// export handler function
module.exports = { modifyProject };