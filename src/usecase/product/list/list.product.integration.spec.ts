import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 11.11);
    const product2 = new Product("456", "Product 2", 22.22);

    await productRepository.create(product);
    await productRepository.create(product2);

    const usecase = new ListProductUseCase(productRepository);
    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);

    expect(output.products[0].id).toBe(product.id);
    expect(output.products[0].name).toBe(product.name);
    expect(output.products[0].price).toBe(product.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);

   
  });
});
