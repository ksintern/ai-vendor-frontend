import { useTheme } from "../../context/ThemeContext";


const DashboardLayout = ({
    children
}) => {

    const theme = useTheme();

    return (

        <div
            className={`
                min-h-screen
                ${theme.colors.background}
                ${theme.colors.textPrimary}
            `}
        >

            {children}

        </div>
    );
};

export default DashboardLayout;