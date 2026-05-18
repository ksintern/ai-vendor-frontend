import {
    createContext,
    useContext
} from "react";


const ThemeContext = createContext();


export const ThemeProvider = ({
    children
}) => {

    const theme = {

        colors: {

            background:
                "bg-gradient-to-br from-slate-950 via-[#071326] to-[#020617]",

            card:
                "bg-slate-900/60 backdrop-blur-xl border border-cyan-500/10 shadow-2xl",

            primary:
                "bg-cyan-600 hover:bg-cyan-700",

            secondary:
                "bg-slate-800 hover:bg-slate-700",

            input:
                "bg-slate-950/70 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none",

            textPrimary:
                "text-white",

            textSecondary:
                "text-slate-400",

            accent:
                "text-cyan-400",

            analytics:
                "text-blue-400",
        },

        spacing: {

            section:
                "px-6 py-10",

            cardPadding:
                "p-8",
        },

        radius: {

            card:
                "rounded-3xl",

            button:
                "rounded-2xl",

            input:
                "rounded-2xl",
        }
    };

    return (

        <ThemeContext.Provider value={theme}>

            {children}

        </ThemeContext.Provider>
    );
};


export const useTheme = () => {

    return useContext(ThemeContext);
};