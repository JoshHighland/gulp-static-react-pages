export function getData() {
  return new Promise((resolve) => {
    resolve({
      fileData: {
        nestedData: 123
      }
    });
  });
}
