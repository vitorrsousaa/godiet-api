import {
  IHandlerLambda,
  IResponseLambda,
} from '../../server/interfaces/handlers';

type InvokeHandlerFnParams = {
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  params?: Record<string, string | undefined>;
};

type InvokeHandlerFnOutput = {
  statusCode: number;
  headers: Record<string, unknown>;
  body: Record<string, unknown>;
};

type InvokeHandlerFn = (
  params: InvokeHandlerFnParams
) => Promise<InvokeHandlerFnOutput>;

export interface IInvoke {
  execute: InvokeHandlerFn;
}

export class Invoke implements IInvoke {
  private path: string;
  private method: string;
  constructor(
    private readonly handler: IHandlerLambda,
    private readonly routeKey: string
  ) {
    const [method, path] = routeKey.split(' ');
    this.path = path;
    this.method = method;
  }

  async execute(input: InvokeHandlerFnParams) {
    const { body = {}, headers, params } = input;

    const defaultEvent = this.getDefaultEvent();
    const event = {
      ...defaultEvent,
      body: this.setBodyToJSON(body),
      headers: headers || {},
      pathParameters: params || {},
    };

    const response = await this.handler(event);

    return this.setResponseToJSON(response);
  }

  private setBodyToJSON(body: Record<string, unknown>) {
    return JSON.stringify(body);
  }

  private getDefaultEvent() {
    return {
      isBase64Encoded: false,
      rawPath: this.path,
      rawQueryString: '',
      routeKey: this.routeKey,
      version: '2.0',
      requestContext: {
        accountId: 'offlineContext_accountId',
        apiId: 'offlineContext_apiId',
        domainName: 'offlineContext_domainName',
        domainPrefix: 'offlineContext_domainPrefix',
        http: {
          method: this.method,
          path: this.path,
          protocol: 'HTTP/1.1',
          sourceIp: '::1',
          userAgent: 'Insomnia/2023.5.6',
        },
        requestId: 'offlineContext_resourceId',
        routeKey: this.routeKey,
        stage: '$default',
        time: '18/Mar/2024:08:31:44 -0300',
        timeEpoch: 1710761504185,
      },
    };
  }

  private setResponseToJSON(response: IResponseLambda): InvokeHandlerFnOutput {
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: JSON.parse(response.body),
    };
  }
}
