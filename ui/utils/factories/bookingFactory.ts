import { faker } from '@faker-js/faker';

export function createBookingData() {

    return {

        name: faker.person.fullName(),

        email: faker.internet.email(),

        phone: faker.phone.number(),

        service: 'Corte Degradê'
    };
}