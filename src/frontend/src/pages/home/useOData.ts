import { useReducer } from "react";

export interface ODataState {
  count?: boolean;
  filter?: string[];
  select?: string[];
  orderBy?: string[];
  expand?: string[];
  top?: number;
  skip?: number;
}

export enum ODataActionTypes {
  SetFilter,
  SetSelect,
  SetOrderBy,
  SetExpand,
  SetTop,
  SetSkip,
  SetCount,
  SetOData,
  Reset,
}

export interface ODataAction {
  type: ODataActionTypes;
  payload: ODataState | string[] | number | boolean;
}

const initialODataState: ODataState = {
  count: false,
  filter: [],
  select: [],
  orderBy: [],
  expand: [],
  top: 0,
  skip: 0,
};

const ODataReducer = (state: ODataState, action: ODataAction): ODataState => {
  switch (action.type) {
    case ODataActionTypes.Reset:
      return initialODataState;
    case ODataActionTypes.SetTop:
      return { ...state, top: action.payload as number };
    case ODataActionTypes.SetSkip:
      return { ...state, skip: action.payload as number };
    case ODataActionTypes.SetSelect:
      return { ...state, select: action.payload as string[] };
    case ODataActionTypes.SetExpand:
      return { ...state, expand: action.payload as string[] };
    case ODataActionTypes.SetOrderBy:
      return { ...state, orderBy: action.payload as string[] };
    case ODataActionTypes.SetFilter:
      return { ...state, filter: action.payload as string[] };
    case ODataActionTypes.SetCount:
      return { ...state, count: action.payload as boolean };
    case ODataActionTypes.SetOData:
      return { ...state, ...(action.payload as ODataState) };
    default:
      return state;
  }
};

export const useOData = (
  initialState?: ODataState
): {
  oDataQuery: string;
  oDataState: ODataState;
  dispatchODataAction: (action: ODataAction) => void;
} => {
  const [oDataState, dispatch] = useReducer(ODataReducer, {
    ...initialODataState,
    ...initialState,
  });
  const oDataQueryStrings: string[] = [];

  const dispatchODataAction = (action: ODataAction): void => {
    dispatch(action);
  };

  if (oDataState.count) {
    oDataQueryStrings.push(`$count=true`);
  }

  if (oDataState.top && oDataState.top > 0) {
    oDataQueryStrings.push(`$top=${oDataState.top}`);
  }

  if (oDataState.skip && oDataState.skip > 0) {
    oDataQueryStrings.push(`$skip=${oDataState.skip}`);
  }

  if (oDataState.filter && oDataState.filter.length > 0) {
    oDataQueryStrings.push(`$filter=${oDataState.filter.join(" and ")}`);
  }

  if (oDataState.select && oDataState.select.length > 0) {
    oDataQueryStrings.push(`$select=${oDataState.select.join(",")}`);
  }

  if (oDataState.orderBy && oDataState.orderBy.length > 0) {
    oDataQueryStrings.push(`$orderby=${oDataState.orderBy.join(", ")}`);
  }

  if (oDataState.expand && oDataState.expand.length > 0) {
    oDataQueryStrings.push(`$expand=${oDataState.expand.join(", ")}`);
  }
  const oDataQuery: string =
    oDataQueryStrings.length > 0 ? oDataQueryStrings.join("&") : "";

  return { oDataQuery, oDataState, dispatchODataAction };
};
