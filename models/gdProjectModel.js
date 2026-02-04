const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ''
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true,
        default: 0
    }
}, { _id: false });

const coverImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
}, { _id: false });

const gallerySchema = new mongoose.Schema({
    sliderImages: {
        type: [imageSchema],
        default: []
    },
    verticalImages: {
        type: [imageSchema],
        default: []
    }
}, { _id: false });

const gdProjectSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    story: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 2000,
        max: 2100
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    tools: {
        type: [String],
        default: [],
        index: true
    },
    tags: {
        type: [String],
        default: [],
        index: true
    },
    coverImage: {
        type: coverImageSchema,
        required: true
    },
    gallery: {
        type: gallerySchema,
        default: () => ({ sliderImages: [], verticalImages: [] })
    },
    mockups: {
        type: [imageSchema],
        default: []
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
        index: true
    }
}, {
    timestamps: true
});

gdProjectSchema.index({ slug: 1 }, { unique: true });
gdProjectSchema.index({ category: 1 });
gdProjectSchema.index({ status: 1 });
gdProjectSchema.index({ updatedAt: -1 });
gdProjectSchema.index({ 
    title: 'text', 
    tags: 'text', 
    shortDescription: 'text' 
}, {
    weights: {
        title: 10,
        tags: 5,
        shortDescription: 3
    }
});

gdProjectSchema.pre('save', function(next) {
    if (this.gallery && this.gallery.sliderImages) {
        this.gallery.sliderImages.sort((a, b) => a.order - b.order);
    }
    if (this.gallery && this.gallery.verticalImages) {
        this.gallery.verticalImages.sort((a, b) => a.order - b.order);
    }
    if (this.mockups) {
        this.mockups.sort((a, b) => a.order - b.order);
    }
    next();
});

const GDProject = mongoose.model('GDProject', gdProjectSchema, 'gd_projects');

module.exports = GDProject;
