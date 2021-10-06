import {exampleFunction} from "../functionA";

describe("Test one", () => {
  it('should add one', () => {
    expect(exampleFunction(123)).toBe(124);
  })
})
