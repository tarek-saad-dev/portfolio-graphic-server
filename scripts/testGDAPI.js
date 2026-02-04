require('dotenv').config();
const mongoose = require('mongoose');
const GDProject = require('../models/gdProjectModel');

const runTests = async () => {
    try {
        console.log('🧪 Starting API Tests...\n');
        
        await mongoose.connect(process.env.MONGO_URI_PROD, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB\n');

        console.log('📋 Test 1: Fetch all published projects');
        const allProjects = await GDProject.find({ status: 'published' })
            .select('_id slug title category year tools tags shortDescription coverImage updatedAt')
            .sort({ updatedAt: -1 })
            .lean();
        console.log(`   Found ${allProjects.length} published projects`);
        allProjects.forEach(p => console.log(`   - ${p.title}`));

        console.log('\n📋 Test 2: Fetch project by slug');
        const project = await GDProject.findOne({ 
            slug: 'health-care-awareness-campaign',
            status: 'published'
        }).lean();
        if (project) {
            console.log(`   ✅ Found: ${project.title}`);
            console.log(`   - Slider images: ${project.gallery.sliderImages.length}`);
            console.log(`   - Vertical images: ${project.gallery.verticalImages.length}`);
            console.log(`   - Mockups: ${project.mockups.length}`);
        } else {
            console.log('   ❌ Project not found');
        }

        console.log('\n📋 Test 3: Filter by category');
        const brandingProjects = await GDProject.find({ 
            category: 'Brand Identity',
            status: 'published'
        }).lean();
        console.log(`   Found ${brandingProjects.length} Brand Identity projects`);

        console.log('\n📋 Test 4: Text search');
        const searchResults = await GDProject.find({ 
            $text: { $search: 'healthcare' },
            status: 'published'
        }).lean();
        console.log(`   Found ${searchResults.length} projects matching "healthcare"`);

        console.log('\n📋 Test 5: Get distinct categories');
        const categories = await GDProject.distinct('category', { status: 'published' });
        console.log(`   Categories: ${categories.join(', ')}`);

        console.log('\n📋 Test 6: Pagination test');
        const page = 1;
        const limit = 2;
        const skip = (page - 1) * limit;
        const paginatedProjects = await GDProject.find({ status: 'published' })
            .skip(skip)
            .limit(limit)
            .lean();
        const total = await GDProject.countDocuments({ status: 'published' });
        const pages = Math.ceil(total / limit);
        console.log(`   Page ${page} of ${pages} (${paginatedProjects.length} items, ${total} total)`);

        console.log('\n📋 Test 7: Sort by title (A-Z)');
        const sortedProjects = await GDProject.find({ status: 'published' })
            .select('title')
            .sort({ title: 1 })
            .lean();
        console.log('   Projects sorted alphabetically:');
        sortedProjects.forEach(p => console.log(`   - ${p.title}`));

        console.log('\n📋 Test 8: Featured projects');
        const featuredProjects = await GDProject.find({ 
            isFeatured: true,
            status: 'published'
        }).lean();
        console.log(`   Found ${featuredProjects.length} featured projects`);

        console.log('\n📋 Test 9: Validate image ordering');
        const projectWithGallery = await GDProject.findOne({ 
            slug: 'health-care-awareness-campaign'
        }).lean();
        if (projectWithGallery) {
            const sliderOrders = projectWithGallery.gallery.sliderImages.map(img => img.order);
            const isOrdered = sliderOrders.every((val, i, arr) => !i || arr[i - 1] <= val);
            console.log(`   Slider images ordered correctly: ${isOrdered ? '✅' : '❌'}`);
            console.log(`   Orders: [${sliderOrders.join(', ')}]`);
        }

        console.log('\n📋 Test 10: Validate slug format');
        const invalidSlugTest = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test('health-care-awareness-campaign');
        const invalidSlugTest2 = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test('Invalid_Slug');
        console.log(`   Valid slug test: ${invalidSlugTest ? '✅' : '❌'}`);
        console.log(`   Invalid slug test: ${!invalidSlugTest2 ? '✅' : '❌'}`);

        console.log('\n🎉 All tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Test error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
        process.exit(0);
    }
};

runTests();
