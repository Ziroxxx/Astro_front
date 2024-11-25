/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PlanetSerial {
  /** PlanetID */
  planetID?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 20
   */
  name?: string;
  /**
   * Description
   * @minLength 1
   * @maxLength 300
   */
  description?: string;
  /**
   * Img
   * @minLength 1
   * @maxLength 50
   */
  img?: string | null;
  /**
   * DetDes
   * @minLength 1
   */
  detDes?: string;
}

export interface MMwithPlanetSerial {
  planetID?: PlanetSerial;
  /** IsNew */
  isNew?: boolean | null;
}

export interface RequestDetailSerial {
  /** ReqID */
  reqID?: number;
  /**
   * DateCreated
   * @format date
   */
  dateCreated?: string;
  /**
   * DateSaved
   * @format date
   */
  dateSaved?: string | null;
  /**
   * DateModerated
   * @format date
   */
  dateModerated?: string | null;
  /**
   * Status
   * @minLength 1
   * @maxLength 30
   */
  status?: string;
  /**
   * DateStart
   * @format date
   */
  dateStart?: string | null;
  /**
   * DateEnd
   * @format date
   */
  dateEnd?: string | null;
  /**
   * Constellation
   * @minLength 1
   * @maxLength 50
   */
  constellation?: string | null;
  planets?: MMwithPlanetSerial[];
  /** Userid */
  userID?: string;
  /** Moderid */
  moderID?: string;
}

export interface RequestSerial {
  /** ReqID */
  reqID?: number;
  /** Userid */
  userID?: string;
  /** Moderid */
  moderID?: string;
  /**
   * DateCreated
   * @format date
   */
  dateCreated?: string;
  /**
   * DateSaved
   * @format date
   */
  dateSaved?: string | null;
  /**
   * DateModerated
   * @format date
   */
  dateModerated?: string | null;
  /**
   * Status
   * @minLength 1
   * @maxLength 30
   */
  status?: string;
  /**
   * DateStart
   * @format date
   */
  dateStart?: string | null;
  /**
   * DateEnd
   * @format date
   */
  dateEnd?: string | null;
  /**
   * Constellation
   * @minLength 1
   * @maxLength 50
   */
  constellation?: string | null;
}

export interface PlanetsSerial {
  planets: PlanetSerial[];
  /**
   * Wishid
   * @minLength 1
   */
  wishID: string;
  /** Wishcount */
  wishCount: number;
}

export interface UserSerial {
  /** ID */
  id?: number;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password?: string;
  /**
   * Last login
   * @format date-time
   */
  last_login?: string | null;
  /** Is superuser */
  is_superuser?: boolean;
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username?: string;
  /**
   * First name
   * @minLength 1
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @minLength 1
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Email
   * @minLength 1
   * @maxLength 254
   */
  email?: string;
  /** Is staff */
  is_staff?: boolean;
  /** Is active */
  is_active?: boolean;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  consPeriod = {
    /**
     * No description
     *
     * @tags cons_period
     * @name ConsPeriodRead
     * @request GET:/cons_period/{id}
     * @secure
     */
    consPeriodRead: (id: string, params: RequestParams = {}) =>
      this.request<RequestDetailSerial, any>({
        path: `/cons_period/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cons_period
     * @name ConsPeriodUpdate
     * @request PUT:/cons_period/{id}
     * @secure
     */
    consPeriodUpdate: (id: string, data: RequestDetailSerial, params: RequestParams = {}) =>
      this.request<RequestDetailSerial, any>({
        path: `/cons_period/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cons_period
     * @name ConsPeriodDelete
     * @request DELETE:/cons_period/{id}
     * @secure
     */
    consPeriodDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cons_period/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags cons_period
     * @name ConsPeriodModerateUpdate
     * @request PUT:/cons_period/{id}/moderate
     * @secure
     */
    consPeriodModerateUpdate: (id: string, data: RequestDetailSerial, params: RequestParams = {}) =>
      this.request<RequestDetailSerial, any>({
        path: `/cons_period/${id}/moderate`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cons_period
     * @name ConsPeriodSaveByCreatorUpdate
     * @request PUT:/cons_period/{id}/save-by-creator
     * @secure
     */
    consPeriodSaveByCreatorUpdate: (id: string, data: RequestDetailSerial, params: RequestParams = {}) =>
      this.request<RequestDetailSerial, any>({
        path: `/cons_period/${id}/save-by-creator`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  consPeriods = {
    /**
     * No description
     *
     * @tags cons_periods
     * @name ConsPeriodsList
     * @request GET:/cons_periods
     * @secure
     */
    consPeriodsList: (params: RequestParams = {}) =>
      this.request<RequestSerial[], any>({
        path: `/cons_periods`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  mm = {
    /**
     * No description
     *
     * @tags mm
     * @name MmUpdate
     * @request PUT:/mm/{pk_req}/{pk_planet}
     * @secure
     */
    mmUpdate: (pkReq: string, pkPlanet: string, data: MMwithPlanetSerial, params: RequestParams = {}) =>
      this.request<MMwithPlanetSerial, any>({
        path: `/mm/${pkReq}/${pkPlanet}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags mm
     * @name MmDelete
     * @request DELETE:/mm/{pk_req}/{pk_planet}
     * @secure
     */
    mmDelete: (pkReq: string, pkPlanet: string, params: RequestParams = {}) =>
      this.request<MMwithPlanetSerial[], any>({
        path: `/mm/${pkReq}/${pkPlanet}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  planet = {
    /**
     * No description
     *
     * @tags planet
     * @name PlanetRead
     * @request GET:/planet/{id}
     * @secure
     */
    planetRead: (id: string, params: RequestParams = {}) =>
      this.request<PlanetSerial, any>({
        path: `/planet/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags planet
     * @name PlanetCreate
     * @request POST:/planet/{id}
     * @secure
     */
    planetCreate: (id: string, params: RequestParams = {}) =>
      this.request<RequestDetailSerial, any>({
        path: `/planet/${id}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags planet
     * @name PlanetUpdate
     * @request PUT:/planet/{id}
     * @secure
     */
    planetUpdate: (id: string, data: PlanetSerial, params: RequestParams = {}) =>
      this.request<PlanetSerial, any>({
        path: `/planet/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags planet
     * @name PlanetDelete
     * @request DELETE:/planet/{id}
     * @secure
     */
    planetDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/planet/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  planets = {
    /**
     * No description
     *
     * @tags planets
     * @name PlanetsList
     * @request GET:/planets
     * @secure
     */
    planetsList: (
      query: {
        /** @minLength 1 */
        PlanetName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PlanetsSerial, any>({
        path: `/planets`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags planets
     * @name PlanetsCreate
     * @request POST:/planets
     * @secure
     */
    planetsCreate: (data: PlanetSerial, params: RequestParams = {}) =>
      this.request<PlanetSerial, any>({
        path: `/planets`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserLoginCreate
     * @request POST:/user/login
     * @secure
     */
    userLoginCreate: (data: UserSerial, params: RequestParams = {}) =>
      this.request<UserSerial, any>({
        path: `/user/login`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLogoutCreate
     * @request POST:/user/logout
     * @secure
     */
    userLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegCreate
     * @request POST:/user/reg
     * @secure
     */
    userRegCreate: (data: UserSerial, params: RequestParams = {}) =>
      this.request<UserSerial, any>({
        path: `/user/reg`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}
     * @secure
     */
    userUpdate: (id: string, data: UserSerial, params: RequestParams = {}) =>
      this.request<UserSerial, any>({
        path: `/user/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
