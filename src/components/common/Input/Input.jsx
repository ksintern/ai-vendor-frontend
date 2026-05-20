import { useTheme } from "../../../context/ThemeContext";

const Input = ({
    label,
    type = "text",
    placeholder,
    name,
    value,
    onChange,
    required = false,
    disabled = false,
}) => {

    const theme = useTheme();

    return (

        <div className="w-full">

            {

                label && (

                    <label

                        htmlFor={name}

                        className="block mb-2 text-sm font-medium text-violet-300"

                    >

                        {label}

                    </label>

                )

            }

            <input

                id={name}

                type={type}

                name={name}

                placeholder={placeholder}

                value={value}

                onChange={onChange}

                required={required}

                disabled={disabled}

                className={`

                    w-full
                    px-5
                    py-4

                    ${theme.colors.input}

                    ${theme.radius.input}

                    border
                    border-gray-700

                    bg-gray-800

                    text-white

                    placeholder-gray-400

                    transition-all
                    duration-300

                    focus:outline-none

                    focus:border-violet-500

                    focus:ring-2

                    focus:ring-violet-500/40

                `}

            />

        </div>

    );

};

export default Input;