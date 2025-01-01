import styled from "@emotion/styled";

const variants = {
  primary: {
    default: (theme) => ({
      backgroundColor: theme.colors.primary_blue,
      border: `1px solid ${theme.colors.primary_blue}`,
      color: theme.colors.neutrals_08,
    }),
    outline: (theme) => ({
      backgroundColor: theme.colors.neutrals_08,
      border: `1px solid ${theme.colors.blue_dark_100}`,
      color: theme.colors.primary_blue,
    }),
    hover: (theme) => ({
      backgroundColor: theme.colors.blue_dark_200,
      border: `1px solid ${theme.colors.blue_dark_100}`,
      color: theme.colors.neutrals_08,
    }),
    disabled: (theme) => ({
      backgroundColor: theme.colors.blue_light_200,
      border: `1px solid ${theme.colors.neutrals_05}`,
      color: theme.colors.neutrals_08,
      cursor: "not-allowed",
    }),
  },
  secondary: {
    default: (theme) => ({
      backgroundColor: theme.colors.primary_purple,
      border: `1px solid ${theme.colors.primary_purple}`,
      color: theme.colors.neutrals_08,
    }),
    outline: (theme) => ({
      backgroundColor: theme.colors.neutrals_08,
      border: `1px solid ${theme.colors.purple_normal_200}`,
      color: theme.colors.primary_purple,
    }),
    hover: (theme) => ({
      backgroundColor: theme.colors.purple_dark_100,
      border: `1px solid ${theme.colors.purple_dark_200}`,
      color: theme.colors.neutrals_08,
    }),
    disabled: (theme) => ({
      backgroundColor: theme.colors.purple_light_200,
      border: `1px solid ${theme.colors.neutrals_05}`,
      color: theme.colors.neutrals_08,
      cursor: "not-allowed",
    }),
  },
  normal: {
    default: (theme) => ({
      backgroundColor: theme.colors.neutrals_04,
      border: `1px solid ${theme.colors.neutrals_04}`,
      color: theme.colors.neutrals_08,
    }),
    outline: (theme) => ({
      backgroundColor: theme.colors.neutrals_08,
      border: `1px solid ${theme.colors.neutrals_03}`,
      color: theme.colors.neutrals_03,
    }),
    hover: (theme) => ({
      backgroundColor: theme.colors.neutrals_03,
      border: `1px solid ${theme.colors.neutrals_03}`,
      color: theme.colors.neutrals_08,
    }),
    disabled: (theme) => ({
      backgroundColor: theme.colors.neutrals_05,
      border: `1px solid ${theme.colors.neutrals_04}`,
      color: theme.colors.neutrals_08,
      cursor: "not-allowed",
    }),
  },
};

const sizes = {
  medium: {
    padding: "10px",
    fontSize: "16px",
    width: "75px",
    height: "42px",
  },
  small: {
    padding: "8px",
    fontSize: "14px",
    width: "64px",
    height: "36px",
  },
};

export const Button = styled.button(
  ({ theme, variant = "primary", size = "medium", state = "default" }) => {
    const variantStyles = variants[variant][state](theme) || {};
    const sizeStyles = sizes[size] || {};

    return {
      ...sizeStyles,
      ...variantStyles,
      borderRadius: "6px",
      fontWeight: "bold",
      "&:hover": {
        ...(state !== "disabled" && variants[variant].hover(theme)),
      },
    };
  }
);
