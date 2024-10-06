const express = require('express');
const router = express.Router();
const Project = require('../Models/projDetailsSchema');


router.get('/dashboardCount', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const result = await Project.aggregate([
            {
                $facet: {
                    totalProjects: [{ $count: "count" }],
                    closedProjects: [{ $match: { Status: "Closed" } }, { $count: "count" }],
                    runningProjects: [{ $match: { Status: "Running" } }, { $count: "count" }],
                    closureDelayProjects: [{ $match: { Status: "Running", endDate: { $lt: today } } }, { $count: "count" }],
                    cancelledProjects: [{ $match: { Status: "Cancelled" } }, { $count: "count" }]
                }
            }
        ]);

        const dashboardData = {
            totalProjects: result[0].totalProjects[0]?.count || 0,
            closedProjects: result[0].closedProjects[0]?.count || 0,
            runningProjects: result[0].runningProjects[0]?.count || 0,
            closureDelayProjects: result[0].closureDelayProjects[0]?.count || 0,
            cancelledProjects: result[0].cancelledProjects[0]?.count || 0
        };

        res.json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Server error');
    }
});



// without aggrigation query : 
// router.get('/dashboardCount', async (req, res) => {
//     try {
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         // Perform individual count queries
//         const totalProjects = await Project.countDocuments({});
//         const closedProjects = await Project.countDocuments({ Status: "Closed" });
//         console.log("closedProjects",closedProjects);
        
//         const runningProjects = await Project.countDocuments({ Status: "Running" });
//         const closureDelayProjects = await Project.countDocuments({
//             Status: "Running",
//             endDate: { $lt: today }
//         });
//         const cancelledProjects = await Project.countDocuments({ Status: "Cancelled" });

//         // Prepare the response data
//         const dashboardData = {
//             totalProjects: totalProjects,
//             closedProjects: closedProjects,
//             runningProjects: runningProjects,
//             closureDelayProjects: closureDelayProjects,
//             cancelledProjects: cancelledProjects
//         };

//         res.json(dashboardData);
//     } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
