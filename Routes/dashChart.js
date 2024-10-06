const express = require('express');
const router = express.Router();
const Project = require('../Models/projDetailsSchema');

// API to fetch department success data with optional department filtering
router.get('/departmentSuccess', async (req, res) => {
    try {
        const department = req.query.department; // Get the department from query params

        // Query to get total and closed projects, optionally filter by department
        const matchCondition = department ? { department } : {}; // Filter by department if provided

        const results = await Project.aggregate([
            { $match: matchCondition }, // Apply department filter if exists
            {
                $group: {
                    _id: '$department',
                    totalProjects: { $sum: 1 },
                    closedProjects: {
                        $sum: { $cond: [{ $eq: ['$Status', 'Closed'] }, 1, 0] }
                    }
                }
            }
        ]); 
        const formattedResults = results.map(department => ({
            department: department._id,
            total: department.totalProjects,
            closed: department.closedProjects,
            successPercentage: department.totalProjects > 0 ? 
                    ((department.closedProjects / department.totalProjects) * 100).toFixed(2) : '0.00'
        }));
        // res.set('Cache-Control', 'no-store');

        res.json(formattedResults);
    } catch (error) {
        console.error('Error fetching department success data:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
