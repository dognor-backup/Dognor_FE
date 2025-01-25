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
  danger: {
    default: (theme) => ({
      backgroundColor: theme.colors.point_orange_normal_100,
      border: `1px solid ${theme.colors.point_orange_normal_100}`,
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
    height: "42px",
  },
  small: {
    padding: "8px",
    fontSize: "14px",
    height: "36px",
  },
};

export const Button = styled.button(
  // variant = "primary", size = "medium", state = "default" 를 기본 default 값으로 정의
  ({ theme, variant = "primary", size = "medium", state = "default" }) => {
    const variantStyles = variants[variant][state](theme) || {}; // varients 객체안의 varient (ex. "primary") 안의 state (ex. "default")를 props로 받아 스타일 정의, 없으면 빈 객체 {}
    const sizeStyles = sizes[size] || {};
    // sizes 객체안의 size ("medium")을 props로 받아 스타일 정의, 없으면 빈 객체 {}
    return {
      ...sizeStyles,
      ...variantStyles,
      borderRadius: "6px",
      fontWeight: 700,
      whiteSpace: "nowrap",
      "&:hover": {
        ...(state !== "disabled" && variants[variant].hover(theme)),
      },
    };
  }
);
