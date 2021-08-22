const FormInput = ({
  label = "",
  placeHolder = "",
  type = "text",
  isRequired = true,
  id = "",
  value = "",
  onChange,
}) => {
  return (
    <div className="form-group text-light w-25">
      <label htmlFor={id} className="h4 text-light">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeHolder}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
