require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Level = require('../models/Level');
const Program = require('../models/Program');
const Pricing = require('../models/Pricing');
const User = require('../models/User');
const curriculumData = require('./curriculumData');

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Level.deleteMany({});
    await Program.deleteMany({});
    await Pricing.deleteMany({});
    await User.deleteMany({});

    console.log('📚 Seeding curriculum levels...');
    const levels = await Level.insertMany(curriculumData);
    console.log(`✅ Created ${levels.length} levels`);

    console.log('🎯 Seeding add-on programs...');
    const programs = await Program.insertMany([
      {
        name: "KidVestor",
        slug: "kidvestor",
        description: "Apply financial concepts in deeper ways through goal-setting, portfolio building, and simple investing scenarios. This optional add-on complements the main curriculum.",
        isAddOn: true,
        priceINR: 10000,
        priceBHD: 50,
        active: true
      },
      {
        name: "KidVentor",
        slug: "kidventor",
        description: "Dive into entrepreneurship and maker culture. Build, create, and launch your own ideas with hands-on projects. This optional add-on enhances the core business concepts.",
        isAddOn: true,
        priceINR: 10000,
        priceBHD: 50,
        active: true
      }
    ]);
    console.log(`✅ Created ${programs.length} programs`);

    console.log('💰 Seeding pricing data...');
    const pricingData = [
      {
        itemType: 'level',
        itemRef: levels[0]._id, // Level 1
        priceINR: 25000,
        priceBHD: 120,
        isActive: true
      },
      {
        itemType: 'level',
        itemRef: levels[1]._id, // Level 2
        priceINR: 28000,
        priceBHD: 135,
        isActive: true
      },
      {
        itemType: 'level',
        itemRef: levels[2]._id, // Level 3
        priceINR: 32000,
        priceBHD: 150,
        isActive: true
      },
      {
        itemType: 'program',
        itemRef: programs[0]._id, // KidVestor
        priceINR: 10000,
        priceBHD: 50,
        isActive: true
      },
      {
        itemType: 'program',
        itemRef: programs[1]._id, // KidVentor
        priceINR: 10000,
        priceBHD: 50,
        isActive: true
      }
    ];
    await Pricing.insertMany(pricingData);
    console.log(`✅ Created ${pricingData.length} pricing entries`);

    console.log('👤 Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@kidcapita.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Created admin user (email: admin@kidcapita.com, password: admin123)');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - ${levels.length} Curriculum Levels`);
    console.log(`   - ${programs.length} Add-on Programs`);
    console.log(`   - ${pricingData.length} Pricing Entries`);
    console.log(`   - 1 Admin User`);
    console.log('\n⚠️  Remember to change admin password in production!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

