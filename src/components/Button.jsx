import classNames from "classnames";

const Button = ({ dispatch, value, dispatchType, className }) => {
    return (
        <button
            className={classNames(
                "py-2 px-3 w-10 h-10 text-white bg-slate-500 border hover:bg-slate-700 duration-300",
                className
            )}
            onClick={() => dispatch({ type: dispatchType, payload: value })}
        >
            {value}
        </button>
    );
};
export default Button;
