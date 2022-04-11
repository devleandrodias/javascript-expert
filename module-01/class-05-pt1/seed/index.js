const faker = require("faker");

const { join } = require("path");
const { writeFile } = require("fs/promises");

const { Car } = require("../src/entities/car");
const { Customer } = require("../src/entities/customer");
const { CarCategory } = require("../src/entities/carCategory");

const seederBaseFolder = join(__dirname, "..", "database");

const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  price: faker.finance.amount(20, 100),
  carIds: [],
});

const cars = [];
const customers = [];

for (let i = 0; i < ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    avaliable: true,
    gasAvaliable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  cars.push(car);
  carCategory.carIds.push(car.id);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });

  customers.push(customer);
}

const write = (filename, data) => {
  return writeFile(join(seederBaseFolder, filename), JSON.stringify(data));
};

(async () => {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("carCategories.json", [carCategory]);

  console.log({ cars, carsCategories: [carCategory] });
})();