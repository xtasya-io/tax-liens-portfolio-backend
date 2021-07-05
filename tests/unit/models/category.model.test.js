const faker = require("faker");
const { Category } = require("../../../src/models");

describe('Category model', () => {
    describe('Category validation', () => {
        let newCategory;
        beforeEach(() => {
            newCategory = {
                code: faker.datatype.number({ 'min': 0, 'max': 9999 }),
                title: faker.random.word()
            }
        });

        test('Should correctly validate a valid category', async () => {
            await expect(new Category(newCategory).validate()).resolves.toBeTruthy();
        })

        test('should throw a validation error if code has more than 4 digits', async () => {
            newCategory.code = 11111;
            await expect(new Category(newCategory).validate()).rejects.toThrow();
        });
    })
})

