import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: './env/.env.dev' });

export default defineConfig({

    testDir: './tests',

    timeout: 60000,

    fullyParallel: false,

    reporter: [
        ['html'],
        ['list']
    ],

    use: {

        baseURL: process.env.BASE_URL,

        headless: false,

        storageState: 'playwright/.auth/user.json',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ]
});