const { faker } = require('@faker-js/faker');

function createRandomArticle() {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.lines(1),
        description: faker.lorem.lines(2),
        date: faker.date.past()
    };
}

const ARTICLE = createRandomArticle();

const ARTICLES = faker.helpers.multiple(createRandomArticle, {
    count: 10,
});

module.exports = { ARTICLES, ARTICLE };