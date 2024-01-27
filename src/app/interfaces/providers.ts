export interface ICrypt {
  hash: (value: string) => Promise<string>;
  compare: (value: string, hashedValue: string) => Promise<boolean>;
}

export type IGenerateToken = {
  id: string;
};

export type PayloadProps = {
  id: string;
};

export interface IToken {
  generate: ({ id }: IGenerateToken, duration?: number) => string;
  verify: (token: string) => string | PayloadProps;
}
