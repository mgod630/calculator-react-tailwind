import { useReducer } from "react";
import Button from "./Button";

const Calculator = () => {
    const ACTIONS = {
        ADD_DIGIT: "add-digit",
        CLEAR: "clear",
        CHOOSE_OPERATION: "choose-operation",
        DELETE_DIGIT: "delete-digit",
        EVALUATE: "evaluate",
    };
    const reducer = (state, { type, payload }) => {
        switch (type) {
            case ACTIONS.ADD_DIGIT:
                if (state.currOperand == null && payload === ".") return state;
                if (state.override) {
                    return {
                        ...state,
                        currOperand: payload,
                        override: false,
                    };
                }
                if (payload === "0" && state.currOperand === "0") return state;
                if (payload === "." && state.currOperand.includes("."))
                    return state;
                return {
                    ...state,
                    currOperand: `${state.currOperand || ""}${payload}`,
                };
            case ACTIONS.CHOOSE_OPERATION:
                if (state.currOperand == null && state.preOperand == null)
                    return state;
                if (state.currOperand == null) {
                    return {
                        ...state,
                        operation: payload,
                    };
                }
                if (state.preOperand == null) {
                    return {
                        ...state,
                        operation: payload,
                        currOperand: null,
                        preOperand: state.currOperand,
                    };
                }
                return {
                    ...state,
                    operation: payload,
                    currOperand: null,
                    preOperand: evaluate(state),
                };
            case ACTIONS.CLEAR:
                return {};
            case ACTIONS.EVALUATE:
                if (
                    state.operation == null ||
                    state.preOperand == null ||
                    state.currOperand == null
                )
                    return state;
                return {
                    ...state,
                    operation: null,
                    preOperand: null,
                    currOperand: evaluate(state),
                    override: true,
                };
            default:
                return state;
        }
    };
    const evaluate = ({ preOperand, currOperand, operation }) => {
        const pre = parseFloat(preOperand);
        const curr = parseFloat(currOperand);
        if (isNaN(pre || isNaN(curr))) return "";
        let result = "";
        switch (operation) {
            case "+":
                result = pre + curr;
                break;
            case "-":
                result = pre - curr;
                break;
            case "*":
                result = pre * curr;
                break;
            case "/":
                result = pre / curr;
                break;
            default:
                return "";
        }
        return result.toString();
    };
    const [{ preOperand, currOperand, operation }, dispatch] = useReducer(
        reducer,
        {}
    );
    return (
        <div className="border-2">
            <div
                style={{ height: "auto", minHeight: "60px" }}
                className="bg-slate-600 text-white w-40 py-1 px-2 break-words"
            >
                <p>
                    {preOperand} {operation}
                </p>
                <p>{currOperand}</p>
            </div>
            <div className="flex">
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="1"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="2"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="3"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.CHOOSE_OPERATION}
                    value="+"
                />
            </div>
            <div className="flex">
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="4"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="5"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="6"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.CHOOSE_OPERATION}
                    value="-"
                />
            </div>
            <div className="flex">
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="7"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="8"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="9"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.CHOOSE_OPERATION}
                    value="*"
                />
            </div>
            <div className="flex">
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.CLEAR}
                    value="C"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="0"
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.ADD_DIGIT}
                    value="."
                />
                <Button
                    dispatch={dispatch}
                    dispatchType={ACTIONS.CHOOSE_OPERATION}
                    value="/"
                />
            </div>
            <div>
                <Button
                    className="w-40"
                    dispatch={dispatch}
                    dispatchType={ACTIONS.EVALUATE}
                    value="="
                />
            </div>
        </div>
    );
};
export default Calculator;
