const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/gdProjectController');

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', createProject);
router.put('/:slug', updateProject);
router.delete('/:slug', deleteProject);

module.exports = router;
