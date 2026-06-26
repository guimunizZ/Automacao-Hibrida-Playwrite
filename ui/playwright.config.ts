import {
    defineConfig,
    devices
} from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config({
    path: './env/.env.dev'
});

export default defineConfig({

    testDir:
        './tests',

<<<<<<< HEAD
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
=======
    timeout: 60000,

    fullyParallel: false,
>>>>>>> d6e6520 (checkpoint: stable ui automation before bdd-feature-step architecture)

    reporter: [
        ['html'],
        ['list']
    ],

    use: {

        baseURL:
        process.env.BASE_URL,
<<<<<<< HEAD

        storageState:
            'auth/user.json',

        trace:
            'on-first-retry',

        screenshot:
            'only-on-failure',

        video:
            'retain-on-failure',
=======
>>>>>>> d6e6520 (checkpoint: stable ui automation before bdd-feature-step architecture)

        headless:
            !!process.env.CI,

<<<<<<< HEAD
        navigationTimeout:
            60000,

        actionTimeout:
            30000
=======
        storageState:
            './playwright/.auth/user.json',

        trace:
            'retain-on-failure',

        screenshot:
            'only-on-failure',

        video:
            'retain-on-failure'
>>>>>>> d6e6520 (checkpoint: stable ui automation before bdd-feature-step architecture)
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