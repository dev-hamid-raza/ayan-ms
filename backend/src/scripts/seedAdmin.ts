// src/scripts/seedAdmin.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import { ROLES } from '../config/accessControl.js';
import { connectDB } from '../db/index.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const seedAdmin = async () => {
    try {
        
        await connectDB();

        const username = process.env.ADMIN_USERNAME || 'Admin';
        const firstName = process.env.ADMIN_FIRST_NAME || 'MS';
        const lastName = process.env.ADMIN_LAST_NAME || 'Admin';
        const password = process.env.ADMIN_PASSWORD || 'admin123';

        if (!username || !firstName || !lastName || !password) {
            throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');
        }

        const existingAdmin = await User.findOne({ username: firstName });

        if (existingAdmin) {
            console.log('Admin already exists:', existingAdmin.username);
            return;
        }


        const admin = await User.create({
            username,
            firstName,
            lastName,
            password,
            role: ROLES.ADMIN,
            permissions: [], // admin gets full access via role, no need for per-module
        });

        console.log('Admin created:', admin.username);
    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
};

seedAdmin();