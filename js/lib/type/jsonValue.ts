import { JsonObject } from './jsonObject';
import { JsonArray  } from './jsonArray';

export type JsonValue = string|number|boolean|Date|JsonObject|JsonArray|null;

