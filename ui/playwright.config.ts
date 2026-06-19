import {
    defineConfig,
    devices
} from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config({
    path: 'env/.env.dev'
});

export default defineConfig({

    testDir:
        './tests',

    fullyParallel:
        false,

    forbidOnly:
        !!process.env.CI,

    retries:
        process.env.CI
            ? 1
            : 0,

    workers:
        process.env.CI
            ? 1
            : '50%',

    timeout:
        60000,

    expect: {
        timeout:
            30000
    },

    reporter: [
        ['html'],
        ['list']
    ],

    use: {

        baseURL:
        process.env.BASE_URL,

        storageState:
            'auth/user.json',

        trace:
            'on-first-retry',

        screenshot:
            'only-on-failure',

        video:
            'retain-on-failure',

        headless:
            !!process.env.CI,

        navigationTimeout:
            60000,

        actionTimeout:
            30000
    },

    projects: [
        {
            name:
                'chromium',

            use: {
                ...devices[
                    'Desktop Chrome'
                    ]
            }
        }
    ]
});