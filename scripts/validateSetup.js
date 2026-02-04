require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('🔍 Validating GD Portfolio Backend Setup...\n');

const checks = {
    passed: [],
    failed: [],
    warnings: []
};

const checkFile = (filePath, description) => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
        checks.passed.push(`✅ ${description}`);
        return true;
    } else {
        checks.failed.push(`❌ ${description} - File not found: ${filePath}`);
        return false;
    }
};

console.log('📁 Checking Files...');
checkFile('models/gdProjectModel.js', 'GD Project Model');
checkFile('controllers/gdProjectController.js', 'GD Project Controller');
checkFile('routes/gdProjectRoutes.js', 'GD Project Routes');
checkFile('scripts/seedGDProjects.js', 'Seed Script');
checkFile('scripts/testGDAPI.js', 'Test Script');
checkFile('README_GD_API.md', 'API Documentation');
checkFile('QUICKSTART_GD.md', 'Quick Start Guide');
checkFile('GD_IMPLEMENTATION_SUMMARY.md', 'Implementation Summary');
checkFile('GD_API_Collection.json', 'Postman Collection');

console.log('\n🔧 Checking Configuration...');
if (process.env.MONGO_URI_PROD) {
    checks.passed.push('✅ MongoDB URI configured');
} else {
    checks.failed.push('❌ MONGO_URI_PROD not found in .env');
}

if (process.env.PORT) {
    checks.passed.push(`✅ PORT configured (${process.env.PORT})`);
} else {
    checks.warnings.push('⚠️  PORT not set, will default to 5000');
}

console.log('\n📦 Checking Dependencies...');
const packageJson = require('../package.json');
const requiredDeps = ['mongoose', 'express', 'cors', 'dotenv', 'body-parser'];
requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
        checks.passed.push(`✅ ${dep} installed (${packageJson.dependencies[dep]})`);
    } else {
        checks.failed.push(`❌ ${dep} not installed`);
    }
});

console.log('\n📜 Checking Scripts...');
if (packageJson.scripts['seed:gd']) {
    checks.passed.push('✅ Seed script configured (npm run seed:gd)');
} else {
    checks.failed.push('❌ Seed script not configured');
}

if (packageJson.scripts['test:gd']) {
    checks.passed.push('✅ Test script configured (npm run test:gd)');
} else {
    checks.failed.push('❌ Test script not configured');
}

console.log('\n🔍 Checking Routes Registration...');
const apiIndexPath = path.join(__dirname, '..', 'api', 'index.js');
if (fs.existsSync(apiIndexPath)) {
    const apiContent = fs.readFileSync(apiIndexPath, 'utf8');
    if (apiContent.includes('gdProjectRoutes')) {
        checks.passed.push('✅ GD routes imported in api/index.js');
    } else {
        checks.failed.push('❌ GD routes not imported in api/index.js');
    }
    
    if (apiContent.includes('/api/gd/projects')) {
        checks.passed.push('✅ GD routes registered at /api/gd/projects');
    } else {
        checks.failed.push('❌ GD routes not registered');
    }
}

console.log('\n' + '='.repeat(60));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(60));

console.log(`\n✅ Passed: ${checks.passed.length}`);
checks.passed.forEach(check => console.log(`   ${check}`));

if (checks.warnings.length > 0) {
    console.log(`\n⚠️  Warnings: ${checks.warnings.length}`);
    checks.warnings.forEach(warning => console.log(`   ${warning}`));
}

if (checks.failed.length > 0) {
    console.log(`\n❌ Failed: ${checks.failed.length}`);
    checks.failed.forEach(fail => console.log(`   ${fail}`));
    console.log('\n🔴 Setup incomplete. Please fix the issues above.');
    process.exit(1);
} else {
    console.log('\n🎉 All checks passed! Setup is complete.');
    console.log('\n📝 Next Steps:');
    console.log('   1. Run: npm run seed:gd    (Seed the database)');
    console.log('   2. Run: npm run test:gd    (Test the API)');
    console.log('   3. Run: npm run dev        (Start the server)');
    console.log('   4. Test: http://localhost:3000/api/gd/projects');
    console.log('\n📚 Documentation:');
    console.log('   - README_GD_API.md         (Complete API docs)');
    console.log('   - QUICKSTART_GD.md         (Quick start guide)');
    console.log('   - GD_IMPLEMENTATION_SUMMARY.md (Implementation details)');
    process.exit(0);
}
