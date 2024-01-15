import { expect, it } from "../../../modulo03-conceitos-tajs/aula01-setup-jest/node_modules/@jest/globals/build";

function Sum(a, b) {
  return a + b;
}
it("should ", async () => {
  const result = Sum(1, 2);
  expect(result).toBe(3);
});
