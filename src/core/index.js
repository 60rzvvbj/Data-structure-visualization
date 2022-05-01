import { memoryList, handelInput, next } from "./core.js";

export function create(showBox, codeBox, consoleBox) {
  // console.log({ showBox, codeBox, consoleBox });
  let key = memoryList.length;
  memoryList.push({
    variables: {},
    emptyValue: Symbol(),
    isCompile: false,
    task: [],
    runStatus: true,
    nextStatus: true,
    runTask: [],
    showBox,
    codeBox,
    consoleBox,
  });

  return {
    handelInput: (input) => {
      return handelInput(key, input);
    },
    next: () => {
      return next(key);
    },
  };
}
