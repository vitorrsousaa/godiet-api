(function Template() {
  const toPascalCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (fl) => fl.toUpperCase())
      .replace(/\W+/g, "");

  const toCamelCase = (str) =>
    toPascalCase(str).replace(/^./, (firstLetter) => firstLetter.toLowerCase());

  return {
    userInputs: [
      {
        title: "Service Name",
        argumentName: "name",
        defaultValue: "Sample",
      },
    ],
    template: [
      {
        type: "folder",
        name: (inputs) => `${toPascalCase(inputs.name)}`,
        children: [
          {
            type: "file",
            name: "index.ts",
            content: (inputs) => `import {
  ${toPascalCase(inputs.name)}Service,
  ${toPascalCase(inputs.name)}ServiceSchema,
  I${toPascalCase(inputs.name)}Input,
  I${toPascalCase(inputs.name)}Output,
  I${toPascalCase(inputs.name)}Service,
} from './service';

export type { I${toPascalCase(inputs.name)}Service, I${toPascalCase(
              inputs.name
            )}Input, I${toPascalCase(inputs.name)}Output};

export  { ${toPascalCase(inputs.name)}ServiceSchema };

export { ${toPascalCase(inputs.name)}Service };
`,
          },
          {
            type: "file",
            name: "service.ts",
            content: (inputs) => `import * as z from 'zod';

export const ${toPascalCase(inputs.name)}ServiceSchema = z.object({
  name: z.string(),
});

export type T${toPascalCase(inputs.name)} = z.infer<typeof ${toPascalCase(
              inputs.name
            )}ServiceSchema>;

export interface I${toPascalCase(inputs.name)}Input {
  name: string;
}

export interface I${toPascalCase(inputs.name)}Output {
  name: string;
}

export interface I${toPascalCase(inputs.name)}Service {
  execute(${toCamelCase(inputs.name)}Input: I${toPascalCase(
              inputs.name
            )}Input): Promise<I${toPascalCase(inputs.name)}Output>;
}

export class ${toPascalCase(inputs.name)}Service implements I${toPascalCase(
              inputs.name
            )}Service {
  constructor() {}

  async execute(${toCamelCase(inputs.name)}Input: I${toPascalCase(
              inputs.name
            )}Input): Promise<I${toPascalCase(inputs.name)}Output> {
    return {
      name: ${toCamelCase(inputs.name)}Input.name,
    };
  }
}
`,
          },
        ],
      },
    ],
  };
});
