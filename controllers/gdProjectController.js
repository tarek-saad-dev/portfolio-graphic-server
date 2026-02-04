const GDProject = require('../models/gdProjectModel');

const getProjects = async (req, res) => {
    try {
        const {
            category = 'all',
            q = '',
            sort = 'newest',
            page = 1,
            limit = 12,
            includeDraft = 'false'
        } = req.query;

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
        const skip = (pageNum - 1) * limitNum;

        const filter = {};
        
        if (includeDraft !== 'true') {
            filter.status = 'published';
        }

        if (category && category !== 'all') {
            filter.category = category;
        }

        if (q && q.trim()) {
            filter.$text = { $search: q.trim() };
        }

        let sortOption = {};
        switch (sort) {
            case 'oldest':
                sortOption = { updatedAt: 1 };
                break;
            case 'az':
                sortOption = { title: 1 };
                break;
            case 'newest':
            default:
                sortOption = { updatedAt: -1 };
                break;
        }

        const [projects, total, categoriesResult] = await Promise.all([
            GDProject.find(filter)
                .select('_id slug title category year tools tags shortDescription coverImage updatedAt')
                .sort(sortOption)
                .skip(skip)
                .limit(limitNum)
                .lean(),
            GDProject.countDocuments(filter),
            GDProject.distinct('category', { status: 'published' })
        ]);

        const pages = Math.ceil(total / limitNum);

        res.status(200).json({
            data: projects,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages
            },
            categories: categoriesResult.sort()
        });

    } catch (error) {
        console.error('Error fetching projects:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                error: 'Invalid query parameters',
                message: error.message
            });
        }

        res.status(500).json({
            error: 'Server error',
            message: 'Failed to fetch projects'
        });
    }
};

const getProjectBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const { includeDraft = 'false' } = req.query;

        if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
            return res.status(400).json({
                error: 'Invalid slug format',
                message: 'Slug must contain only lowercase letters, numbers, and hyphens'
            });
        }

        const filter = { slug };
        if (includeDraft !== 'true') {
            filter.status = 'published';
        }

        const project = await GDProject.findOne(filter).lean();

        if (!project) {
            return res.status(404).json({
                error: 'Project not found',
                message: `No project found with slug: ${slug}`
            });
        }

        res.status(200).json({
            data: project
        });

    } catch (error) {
        console.error('Error fetching project by slug:', error);
        
        res.status(500).json({
            error: 'Server error',
            message: 'Failed to fetch project'
        });
    }
};

const createProject = async (req, res) => {
    try {
        const projectData = req.body;

        if (!projectData.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(projectData.slug)) {
            return res.status(400).json({
                error: 'Invalid slug format',
                message: 'Slug must contain only lowercase letters, numbers, and hyphens'
            });
        }

        const existingProject = await GDProject.findOne({ slug: projectData.slug });
        if (existingProject) {
            return res.status(400).json({
                error: 'Duplicate slug',
                message: 'A project with this slug already exists'
            });
        }

        const project = new GDProject(projectData);
        await project.save();

        res.status(201).json({
            data: project,
            message: 'Project created successfully'
        });

    } catch (error) {
        console.error('Error creating project:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                message: error.message,
                details: error.errors
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Duplicate key error',
                message: 'A project with this slug already exists'
            });
        }

        res.status(500).json({
            error: 'Server error',
            message: 'Failed to create project'
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const { slug } = req.params;
        const updateData = req.body;

        if (updateData.slug && updateData.slug !== slug) {
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(updateData.slug)) {
                return res.status(400).json({
                    error: 'Invalid slug format',
                    message: 'Slug must contain only lowercase letters, numbers, and hyphens'
                });
            }
        }

        const project = await GDProject.findOneAndUpdate(
            { slug },
            updateData,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                error: 'Project not found',
                message: `No project found with slug: ${slug}`
            });
        }

        res.status(200).json({
            data: project,
            message: 'Project updated successfully'
        });

    } catch (error) {
        console.error('Error updating project:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                message: error.message,
                details: error.errors
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Duplicate key error',
                message: 'A project with this slug already exists'
            });
        }

        res.status(500).json({
            error: 'Server error',
            message: 'Failed to update project'
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { slug } = req.params;

        const project = await GDProject.findOneAndDelete({ slug });

        if (!project) {
            return res.status(404).json({
                error: 'Project not found',
                message: `No project found with slug: ${slug}`
            });
        }

        res.status(200).json({
            message: 'Project deleted successfully',
            data: project
        });

    } catch (error) {
        console.error('Error deleting project:', error);

        res.status(500).json({
            error: 'Server error',
            message: 'Failed to delete project'
        });
    }
};

module.exports = {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
};
