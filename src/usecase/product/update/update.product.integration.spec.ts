import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe('Test update product use case', () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const product = new Product("123", "Product 1", 11.11);
    const productRepository = new ProductRepository();

    await productRepository.create(product);

    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
        id: "123",
        name: "Product Updated",
        price: 22.22
    }

    const output = await usecase.execute(input)

    expect(output).toEqual(input)

  })
})