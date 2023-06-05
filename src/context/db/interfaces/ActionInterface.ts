// Actions - triggers for state changes and their respective payload
export interface Action {
  type: string;
  // Question mark here means that payload can be optional
  payload?: any;
}
