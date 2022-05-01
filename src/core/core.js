export const memoryList = [];

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
    await animation();
    variables[variable] = emptyValue;
    callback();
  });
}

function user_assignment(key, variable, value, type) {
  let { variables } = memoryList[key];
  return exec(key, async (callback) => {
    await animation();
    if (type == "variable") {
      variables[variable] = read(key, value);
    } else {
      variables[variable] = value;
    }
    callback();
  });
}

function read(key, variable) {
  let { variables, emptyValue, consoleBox } = memoryList[key];
  if (variables[variable] == emptyValue) {
    consoleBox.innerText += `\nerror: 变量${variable}未赋值不可使用\n`;
    return emptyValue;
  } else {
    return variables[variable];
  }
}

function user_output(key, variable) {
  let { emptyValue, consoleBox } = memoryList[key];
  return exec(key, async (callback) => {
    await animation();
    let res = read(key, variable);
    if (res != emptyValue) {
      consoleBox.innerText += res;
    }
    callback();
  });
}

function compile(key, fun) {
  memoryList[key].isCompile = true;
  fun();
  memoryList[key].isCompile = false;
}

export function next(key) {
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

export function handelInput(key, input) {
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
    let { codeBox } = memoryList[key];
    codeBox.innerText = input;

    eval(code);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
