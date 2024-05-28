export const answerList = [
  "当然!以下是使用JavaScript实现冒泡排序的示例代码:\n\n```javascript\nfunction bubbleSort(arr) {\n  const len = arr.length;\n  \n  for (let i = 0; i < len - 1; i++) {\n    for (let j = 0; j < len - 1 - i; j++) {\n      if (arr[j] > arr[j + 1]) {\n        // 交换相邻元素\n        const temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  \n  return arr;\n}\n\n// 示例调用\nconst arr = [64, 34, 25, 12, 22, 11, 90];\nconsole.log(\"排序前:\", arr);\n\nconst sortedArr = bubbleSort(arr);\nconsole.log(\"排序后:\", sortedArr);\n```\n\n输出结果:\n```\n排序前: [64, 34, 25, 12, 22, 11, 90]\n排序后: [11, 12, 22, 25, 34, 64, 90]\n```\n\n冒泡排序的基本思想是:\n1. 比较相邻的元素。如果第一个元素比第二个元素大,就交换它们两个。\n2. 对每一对相邻元素做同样的工作,从开始第一对到结尾的最后一对。这步做完后,最后的元素会是最大的数。\n3. 针对所有的元素重复以上的步骤,除了最后一个。\n4. 持续每次对越来越少的元素重复上面的步骤,直到没有任何一对数字需要比较。\n\n在上面的代码中:\n- 外层循环`i`控制排序的轮数,总共需要`len - 1`轮。\n- 内层循环`j`控制每一轮比较的次数,每轮比较次数逐渐减少。\n- 如果相邻元素的顺序不正确,就交换它们的位置。\n- 每一轮结束后,最大的元素就会被放到正确的位置上。\n\n冒泡排序是一种简单直观的排序算法,但在实际应用中,它的效率较低,时间复杂度为O(n^2)。对于大规模数据,通常会使用更高效的排序算法,如快速排序、归并排序等。",
  "您好！很高兴您对椅子相关产品感兴趣。以下是我为您准备的椅子选品清单，请您查看：\n\n#### 椅子选品清单：\n1. 折叠户外露台椅 - 品牌：XX\n2. 办公室转椅 - 品牌：YY\n3. 儿童可调节学习椅 - 品牌：ZZ\n4. 北欧风格餐厅椅 - 品牌：WW\n5. 温暖舒适的休闲椅 - 品牌：VV\n\n#### 您可以在亚马逊搜索框中输入上述关键词和品牌名，查找这些具有竞争力的椅子产品，希望对您有所帮助。\n\n如果您需要更多帮助或有其他问题，请随时告诉我。祝您生意兴隆！",
  "对不起,我不太明白你的意思。'12121'似乎只是一串数字,没有明确的上下文或问题。你能否提供更多的信息或者说明你的具体问题是什么?这样我才能更好地理解你的需求并给出恰当的回答。请随时告诉我你需要什么帮助",
  "好的,我很乐意与你分享一些TypeScript的高级用法。以下是几个常见的TypeScript高级特性和技巧:\n\n1. 交叉类型(Intersection Types):\n   交叉类型允许你将多个类型合并为一个类型。它使用`&`操作符来组合现有的类型。例如:\n   ```typescript\n   type Employee = {\n     name: string;\n     id: number;\n   };\n   \n   type Manager = {\n     name: string;\n     subordinates: number;\n   };\n   \n   type ManagementEmployee = Employee & Manager;\n   ```\n\n2. 映射类型(Mapped Types):\n   映射类型允许你基于现有类型创建新类型,并对属性进行转换。它使用`in`关键字来遍历类型的属性。例如:\n   ```typescript\n   type Readonly<T> = {\n     readonly [P in keyof T]: T[P];\n   };\n   \n   type PartialEmployee = Partial<Employee>;\n   ```\n\n3. 条件类型(Conditional Types):\n   条件类型允许你根据某个条件来决定类型。它使用`extends`关键字进行类型检查,并根据检查结果返回不同的类型。例如:\n   ```typescript\n   type NonNullable<T> = T extends null | undefined ? never : T;\n   \n   type EmployeeName = NonNullable<Employee['name']>;\n   ```\n\n4. 模板字面量类型(Template Literal Types):\n   模板字面量类型允许你使用字符串字面量来定义类型。它支持类型推断和字符串操作。例如:\n   ```typescript\n   type PropEventSource<T> = {\n     on(eventName: `${string & keyof T}Changed`, callback: () => void): void;\n   };\n   \n   declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;\n   ```\n\n5. 递归条件类型(Recursive Conditional Types):\n   递归条件类型允许你在条件类型中递归地引用自身,从而实现更复杂的类型转换。例如:\n   ```typescript\n   type DeepReadonly<T> = {\n     readonly [P in keyof T]: DeepReadonly<T[P]>;\n   };\n   \n   type DeepReadonlyEmployee = DeepReadonly<Employee>;\n   ```\n\n这些只是TypeScript高级用法的一部分示例。TypeScript还提供了许多其他强大的特性,如类型推断、类型守卫、类型别名、泛型约束等。掌握这些高级用法可以帮助你编写更加类型安全和可维护的代码。\n\n如果你对某个具体的高级用法有进一步的问题或需要更详细的解释,请随时告诉我。",
  "在JavaScript中,如果你想将Markdown文档的字符转换为字符串,你可以使用模板字符串(template strings)或转义字符(escape characters)来处理特殊字符。下面是一些常见的Markdown字符及其在JavaScript字符串中的表示方法:\n\n1. 反引号(`)\n   - 在模板字符串中,反引号用于定义字符串的边界,所以你需要使用反斜杠(\\)转",
  
]

