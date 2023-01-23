import { IProperty } from "../typings";

const { faker } = require('@faker-js/faker');

export function getProperty(): IProperty {
    return {
        id: faker.datatype.uuid(),
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        address: {
            country: faker.address.country(),
            city: faker.address.city(),
            street: faker.address.street(),
            zipCode: faker.address.zipCode(),
        },
        picture: {
            url: faker.image.abstract()
        }
    }
}