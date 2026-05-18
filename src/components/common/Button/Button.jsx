import { useTheme } from "../../../context/ThemeContext";


const Button = ({
    children,
    type = "button",
    onClick,
    disabled = false,
}) => {

    const theme = useTheme();

    return (

        <button
            type={type}

            onClick={onClick}

            disabled={disabled}

            className={`
                w-full

                px-6
                py-4

                ${theme.colors.primary}

                ${theme.radius.button}

                text-white
                font-semibold

                transition-all
                duration-300

                hover:scale-[1.01]
                active:scale-[0.99]

                disabled:opacity-60
                disabled:cursor-not-allowed

                shadow-xl
            `}
        >

            {children}

        </button>
    );
};

export default Button;