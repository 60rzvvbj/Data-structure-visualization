// let variables = {};
// let emptyValue = Symbol();
// let isCompile = false;
// let task = [];
// let runStatus = true;
// let runTask = [];

let memoryList = [];

function exec(key, fun) {
  let { task, isCompile, runTask } = memoryList[key];
  // console.log(task, isCompile);
  if (isCompile) {
    task.push(fun);
  } else {
    if (memoryList[key].runStatus) {
      memoryList[key].runStatus = false;
      return fun(() => {
        memoryList[key].runStatus = true;
        if (runTask.length) {
          runTask.shift()();
        }
      });
    } else {
      runTask.push(() => {
        exec(key, fun);
      });
    }
  }
}

function animation() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

function user_statement(key, variable) {
  let { variables, emptyValue } = memoryList[key];
  return exec(key, async (callback) => {
    variables[variable] = emptyValue;
    await animation();
    callback();
  });
}

function user_assignment(key, variable, value, type) {
  let { variables } = memoryList[key];
  return exec(key, async (callback) => {
    variables[variable] = value;
    await animation();
    callback();
  });
}

function read(key, variable) {
  let { variables, emptyValue } = memoryList[key];
  if (variables[variable] == emptyValue) {
    console.log(`变量${variable}未赋值不可使用`);
    return emptyValue;
  } else {
    return variables[variable];
  }
}

function user_output(key, variable) {
  let { emptyValue } = memoryList[key];
  return exec(key, async (callback) => {
    let res = read(key, variable);
    if (res != emptyValue) {
      console.log(res);
    }
    await animation();
    callback();
  });
}

function compile(key, fun) {
  memoryList[key].isCompile = true;
  fun();
  memoryList[key].isCompile = false;
}

function next(key) {
  let { task } = memoryList[key];
  if (task.length) {
    if (memoryList[key].nextStatus) {
      memoryList[key].nextStatus = false;
      task[0](() => {
        memoryList[key].nextStatus = true;
        task.shift();
        logMemory(key);
      });
    }
  }
}

function logMemory(key) {
  let { variables, emptyValue } = memoryList[key];
  // let t = [];
  // for (let attr in variables) {
  //   t.push({
  //     variable: attr,
  //     value: variables[attr],
  //   });
  // }
  // console.table(t);
  let s = "";
  for (let attr in variables) {
    s +=
      attr +
      " --- " +
      (variables[attr] == emptyValue ? "" : variables[attr]) +
      "\n";
  }
  console.log(s);
}

function handelInput(key, input) {
  try {
    let code = `
		function statement() {
			user_statement(${key}, ...arguments)
		}

		function assignment() {
			user_assignment(${key}, ...arguments)
		}

		function output() {
			user_output(${key}, ...arguments)
		}

		compile(${key}, function () {
			${input}
		});
	`;

    // console.log(code);
    eval(code);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function create(el) {
  // console.log(el);
  let key = memoryList.length;
  memoryList.push({
    variables: {},
    emptyValue: Symbol(),
    isCompile: false,
    task: [],
    runStatus: true,
    nextStatus: true,
    runTask: [],
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
