require('dotenv').config();
const mongoose = require('mongoose');
const GDProject = require('../models/gdProjectModel');

const seedProjects = [
    {
        slug: 'health-care-awareness-campaign',
        title: 'Health Care Awareness Campaign',
        category: 'Campaign Design',
        shortDescription: 'A comprehensive health awareness campaign featuring vibrant visuals and impactful messaging to promote preventive healthcare in local communities.',
        story: 'This campaign was designed to raise awareness about preventive healthcare measures in underserved communities. The visual identity combines warm, approachable colors with clean typography to make medical information accessible and non-intimidating. Through a series of posters, social media graphics, and community materials, we created a cohesive narrative that emphasizes the importance of regular health checkups and healthy lifestyle choices. The campaign successfully reached over 50,000 people across multiple platforms and contributed to a 30% increase in community health center visits.',
        year: 2024,
        role: 'Lead Graphic Designer',
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Adobe InDesign'],
        tags: ['healthcare', 'social-impact', 'campaign', 'branding', 'print-design', 'digital-design'],
        coverImage: {
            url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
            alt: 'Health Care Campaign Cover - Vibrant poster design',
            width: 1200,
            height: 800
        },
        gallery: {
            sliderImages: [
                {
                    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=1080&fit=crop',
                    alt: 'Campaign hero banner with healthcare messaging',
                    caption: 'Main campaign banner featuring the tagline "Your Health, Your Future"',
                    width: 1920,
                    height: 1080,
                    order: 1
                },
                {
                    url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1920&h=1080&fit=crop',
                    alt: 'Social media graphics set',
                    caption: 'Instagram carousel designs promoting healthy habits',
                    width: 1920,
                    height: 1080,
                    order: 2
                },
                {
                    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&h=1080&fit=crop',
                    alt: 'Community poster series',
                    caption: 'Series of posters for community health centers',
                    width: 1920,
                    height: 1080,
                    order: 3
                },
                {
                    url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1920&h=1080&fit=crop',
                    alt: 'Infographic design',
                    caption: 'Educational infographic about preventive care',
                    width: 1920,
                    height: 1080,
                    order: 4
                },
                {
                    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&h=1080&fit=crop',
                    alt: 'Brochure layout spread',
                    caption: 'Tri-fold brochure design for health workshops',
                    width: 1920,
                    height: 1080,
                    order: 5
                },
                {
                    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920&h=1080&fit=crop',
                    alt: 'Digital billboard design',
                    caption: 'Large format billboard for city placement',
                    width: 1920,
                    height: 1080,
                    order: 6
                }
            ],
            verticalImages: [
                {
                    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=1200&fit=crop',
                    alt: 'Mobile app interface mockup',
                    caption: 'Health tracking app interface design',
                    width: 800,
                    height: 1200,
                    order: 1
                },
                {
                    url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=1200&fit=crop',
                    alt: 'Instagram story template',
                    caption: 'Branded Instagram story templates',
                    width: 800,
                    height: 1200,
                    order: 2
                },
                {
                    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=1200&fit=crop',
                    alt: 'Vertical banner design',
                    caption: 'Pull-up banner for health fairs',
                    width: 800,
                    height: 1200,
                    order: 3
                },
                {
                    url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=1200&fit=crop',
                    alt: 'Door hanger design',
                    caption: 'Community outreach door hangers',
                    width: 800,
                    height: 1200,
                    order: 4
                },
                {
                    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=1200&fit=crop',
                    alt: 'Poster series vertical',
                    caption: 'Vertical poster for clinic waiting rooms',
                    width: 800,
                    height: 1200,
                    order: 5
                }
            ]
        },
        mockups: [
            {
                url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=1200&fit=crop',
                alt: 'Billboard mockup in urban setting',
                caption: 'Campaign billboard in downtown location',
                width: 1600,
                height: 1200,
                order: 1
            },
            {
                url: 'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=1600&h=1200&fit=crop',
                alt: 'Poster mockup on wall',
                caption: 'Poster displayed in community center',
                width: 1600,
                height: 1200,
                order: 2
            },
            {
                url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1600&h=1200&fit=crop',
                alt: 'Mobile app mockup on devices',
                caption: 'App interface on various mobile devices',
                width: 1600,
                height: 1200,
                order: 3
            }
        ],
        isFeatured: true,
        status: 'published'
    },
    {
        slug: 'branding-identity-kit',
        title: 'Modern Tech Startup - Complete Branding Identity',
        category: 'Brand Identity',
        shortDescription: 'Full brand identity system for an innovative tech startup, including logo design, color palette, typography, and comprehensive brand guidelines.',
        story: 'Developed a complete brand identity for a cutting-edge AI technology startup targeting enterprise clients. The challenge was to create a visual language that communicates innovation and trustworthiness simultaneously. The logo features a geometric symbol representing neural networks, paired with a modern sans-serif typeface. The color palette combines deep navy blues with vibrant electric accents to convey professionalism with a forward-thinking edge. The comprehensive brand guidelines ensure consistency across all touchpoints, from digital platforms to physical materials. This identity has helped the client secure Series A funding and establish a strong market presence.',
        year: 2024,
        role: 'Brand Designer & Art Director',
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma'],
        tags: ['branding', 'logo-design', 'identity', 'tech', 'startup', 'guidelines'],
        coverImage: {
            url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
            alt: 'Brand identity showcase with logo variations',
            width: 1200,
            height: 800
        },
        gallery: {
            sliderImages: [
                {
                    url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1920&h=1080&fit=crop',
                    alt: 'Logo design and variations',
                    caption: 'Primary logo with alternative versions and usage guidelines',
                    width: 1920,
                    height: 1080,
                    order: 1
                },
                {
                    url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&h=1080&fit=crop',
                    alt: 'Color palette and typography',
                    caption: 'Brand color system and typeface selection',
                    width: 1920,
                    height: 1080,
                    order: 2
                },
                {
                    url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1920&h=1080&fit=crop',
                    alt: 'Business card design',
                    caption: 'Corporate business card front and back',
                    width: 1920,
                    height: 1080,
                    order: 3
                },
                {
                    url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1920&h=1080&fit=crop',
                    alt: 'Stationery set',
                    caption: 'Letterhead, envelope, and compliment slip designs',
                    width: 1920,
                    height: 1080,
                    order: 4
                },
                {
                    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',
                    alt: 'Brand guidelines spread',
                    caption: 'Sample pages from the 50-page brand manual',
                    width: 1920,
                    height: 1080,
                    order: 5
                }
            ],
            verticalImages: [
                {
                    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1200&fit=crop',
                    alt: 'Mobile app icon design',
                    caption: 'App icon variations for iOS and Android',
                    width: 800,
                    height: 1200,
                    order: 1
                },
                {
                    url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=1200&fit=crop',
                    alt: 'Social media profile templates',
                    caption: 'Branded social media avatar and cover designs',
                    width: 800,
                    height: 1200,
                    order: 2
                },
                {
                    url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=1200&fit=crop',
                    alt: 'Packaging design concept',
                    caption: 'Product packaging for company merchandise',
                    width: 800,
                    height: 1200,
                    order: 3
                }
            ]
        },
        mockups: [
            {
                url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=1200&fit=crop',
                alt: 'Business card mockup',
                caption: 'Business cards on desk with branding materials',
                width: 1600,
                height: 1200,
                order: 1
            },
            {
                url: 'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=1600&h=1200&fit=crop',
                alt: 'Stationery mockup',
                caption: 'Complete stationery set in corporate environment',
                width: 1600,
                height: 1200,
                order: 2
            },
            {
                url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1600&h=1200&fit=crop',
                alt: 'Digital device mockups',
                caption: 'Brand identity across laptop, tablet, and phone',
                width: 1600,
                height: 1200,
                order: 3
            },
            {
                url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=1200&fit=crop',
                alt: 'Office signage mockup',
                caption: 'Logo on office entrance and interior signage',
                width: 1600,
                height: 1200,
                order: 4
            }
        ],
        isFeatured: true,
        status: 'published'
    },
    {
        slug: 'social-media-product-launch',
        title: 'Social Media Product Launch Campaign',
        category: 'Social Media Design',
        shortDescription: 'Dynamic social media campaign for a new sustainable fashion product line, featuring engaging visuals optimized for Instagram, Facebook, and TikTok.',
        story: 'Created a vibrant social media campaign to launch an eco-friendly fashion brand\'s new sustainable clothing line. The campaign needed to resonate with Gen Z and millennial audiences while highlighting the brand\'s commitment to environmental responsibility. Using bold colors, dynamic compositions, and authentic photography, we developed a cohesive visual narrative across multiple platforms. The campaign included feed posts, stories, reels templates, and carousel designs that drove significant engagement. Within the first month, the campaign generated over 2 million impressions and contributed to a 150% increase in online sales compared to previous launches.',
        year: 2023,
        role: 'Social Media Designer',
        tools: ['Figma', 'Adobe Photoshop', 'Canva', 'Adobe Premiere Pro'],
        tags: ['social-media', 'product-launch', 'fashion', 'sustainability', 'digital-marketing', 'content-creation'],
        coverImage: {
            url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
            alt: 'Social media campaign grid layout',
            width: 1200,
            height: 800
        },
        gallery: {
            sliderImages: [
                {
                    url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1920&h=1080&fit=crop',
                    alt: 'Instagram feed grid preview',
                    caption: 'Cohesive Instagram feed layout showcasing product line',
                    width: 1920,
                    height: 1080,
                    order: 1
                },
                {
                    url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=1920&h=1080&fit=crop',
                    alt: 'Instagram carousel design',
                    caption: 'Multi-slide carousel highlighting sustainability features',
                    width: 1920,
                    height: 1080,
                    order: 2
                },
                {
                    url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1920&h=1080&fit=crop',
                    alt: 'Facebook ad campaign',
                    caption: 'Targeted Facebook ad variations for different audiences',
                    width: 1920,
                    height: 1080,
                    order: 3
                },
                {
                    url: 'https://images.unsplash.com/photo-1611162617263-4ec3060a115f?w=1920&h=1080&fit=crop',
                    alt: 'Product showcase graphics',
                    caption: 'Individual product highlight posts with lifestyle photography',
                    width: 1920,
                    height: 1080,
                    order: 4
                }
            ],
            verticalImages: [
                {
                    url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=1200&fit=crop',
                    alt: 'Instagram story template set',
                    caption: 'Branded story templates for daily content',
                    width: 800,
                    height: 1200,
                    order: 1
                },
                {
                    url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=1200&fit=crop',
                    alt: 'TikTok video thumbnail',
                    caption: 'Eye-catching thumbnails for TikTok content',
                    width: 800,
                    height: 1200,
                    order: 2
                },
                {
                    url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=1200&fit=crop',
                    alt: 'Instagram Reels cover',
                    caption: 'Branded Reels covers maintaining feed aesthetic',
                    width: 800,
                    height: 1200,
                    order: 3
                },
                {
                    url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=1200&fit=crop',
                    alt: 'Pinterest pin design',
                    caption: 'Vertical pins optimized for Pinterest discovery',
                    width: 800,
                    height: 1200,
                    order: 4
                }
            ]
        },
        mockups: [
            {
                url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=1200&fit=crop',
                alt: 'Mobile phone mockup with Instagram feed',
                caption: 'Campaign content displayed on iPhone',
                width: 1600,
                height: 1200,
                order: 1
            },
            {
                url: 'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=1600&h=1200&fit=crop',
                alt: 'Tablet mockup showing Facebook ads',
                caption: 'Ad campaign on tablet device',
                width: 1600,
                height: 1200,
                order: 2
            },
            {
                url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1600&h=1200&fit=crop',
                alt: 'Multiple device mockup',
                caption: 'Campaign across phone, tablet, and desktop',
                width: 1600,
                height: 1200,
                order: 3
            }
        ],
        isFeatured: false,
        status: 'published'
    }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting GD Projects seed...');
        
        await mongoose.connect(process.env.MONGO_URI_PROD, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB');

        await GDProject.deleteMany({});
        console.log('🗑️  Cleared existing GD projects');

        const insertedProjects = await GDProject.insertMany(seedProjects);
        console.log(`✅ Successfully inserted ${insertedProjects.length} projects`);

        insertedProjects.forEach(project => {
            console.log(`   - ${project.title} (${project.slug})`);
        });

        console.log('\n📊 Database Statistics:');
        const stats = await GDProject.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        stats.forEach(stat => {
            console.log(`   ${stat._id}: ${stat.count} project(s)`);
        });

        console.log('\n🎉 Seed completed successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Database connection closed');
        process.exit(0);
    }
};

seedDatabase();
