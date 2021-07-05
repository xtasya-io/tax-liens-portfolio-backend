const faker = require("faker");
const { Admin } = require("../../../src/models");

describe('Admin model', () => {
    describe('Admin validation', () => {
        let newAdmin;
        beforeEach(() => {
            newAdmin = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email().toLowerCase(),
                password: 'password1',
                phone: faker.phone.phoneNumber()
            }
        });

        test('Should correctly validate a valid admin', async () => {
            await expect(new Admin(newAdmin).validate()).resolves.toBeTruthy();
        })

        test('should throw a validation error if email is invalid', async () => {
            newAdmin.email = 'invalidEmail';
            await expect(new Admin(newAdmin).validate()).rejects.toThrow();
        });
    })
})

