/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}", // Arquivos dentro da pasta app
    "./src/components/**/*.{ts,tsx}", // Componentes reutilizáveis
  ],
  theme: {
    extend: {
      // Fontes personalizadas carregadas do @expo-google-fonts/inter
      fontFamily: {
        heading: "Inter_600SemiBold", // Para títulos principais
        subtitle: "Inter_500Medium", // Para subtítulos
        body: "Inter_400Regular", // Para textos padrão
        bold: "Inter_700Bold", // Para texto em destaque ou forte
      },

      // Paleta de cores personalizada
      colors: {
        primary: "#181818", // Azul para botões principais e links
        secondary: "#9333EA", // Roxo para destaques ou ícones
        background: {
          dark: "#1E293B", // Cor de fundo escura para modo noturno
        },
        card: {
          dark: "#334155", // Fundo de cartões no modo escuro
        },
        text: {
          light: "#E2E8F0", 
          dark: "#1E293B", 
        },
      },

      // Tamanhos de fonte personalizados
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }], // Texto pequeno
        sm: ["14px", { lineHeight: "20px" }], // Texto padrão menor
        base: ["16px", { lineHeight: "24px" }], // Texto padrão
        lg: ["18px", { lineHeight: "28px" }], // Texto maior
        xl: ["20px", { lineHeight: "30px" }], // Subtítulos
        "2xl": ["24px", { lineHeight: "36px" }], // Títulos pequenos
        "3xl": ["30px", { lineHeight: "40px" }], // Títulos grandes
      },

      // Estilização de bordas e sombras
      borderRadius: {
        sm: "4px", // Bordas levemente arredondadas
        md: "8px", // Bordas moderadamente arredondadas
        lg: "16px", // Bordas bem arredondadas
        full: "9999px", // Bordas totalmente arredondadas (círculos)
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra padrão para cartões
        modal: "0 8px 16px rgba(0, 0, 0, 0.2)", // Sombra para modais
      },

      // Tamanhos de espaçamento
      spacing: {
        0: "0px", // Sem espaçamento
        1: "4px", // Espaçamento pequeno
        2: "8px", // Espaçamento menor
        4: "16px", // Espaçamento padrão
        8: "32px", // Espaçamento grande
        16: "64px", // Espaçamento extra grande
      },
    },
  },
  plugins: [],
};
