import { useTheme } from "../../../context/ThemeContext";


const Input = ({
    type = "text",
    placeholder,
    name,
    value,
    onChange,
    required = false,
}) => {

    const theme = useTheme();

    return (

        <input
            type={type}

            name={name}

            placeholder={placeholder}

            value={value}

            onChange={onChange}

            required={required}

            className={`
                w-full

                px-5
                py-4

                ${theme.colors.input}

                ${theme.radius.input}

                transition-all
                duration-300

                focus:scale-[1.01]
            `}
        />
    );
};

export default Input;