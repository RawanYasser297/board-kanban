import clsx from "clsx";

function InputField({ label, isFocused, hasError, name,dv }) {
  return (
    <div className="mb-5 flex flex-1 flex-col">
      <label className="mb-1 text-heading-m font-semibold text-medium-grey">
        {label}
      </label>
      <input
        name={name}
        type="text"
        defaultValue={dv}
        className={clsx(
          "rounded-md border border-lines-light py-1 pl-3", // Base styles
          {
            "ring-blue-300 border-x-black ring-2": isFocused, // Styles when focused
            "border-red ring-2 ring-red": hasError, // Styles when there's an error
            "bg-gray-100": !isFocused && !hasError, // Default background when not focused and no error
          },
        )}
        placeholder={clsx({
          "field can not be empty..": hasError,
          "Enter text...": !isFocused && !hasError,
        })}
      />
    </div>
  );
}

export default InputField;
