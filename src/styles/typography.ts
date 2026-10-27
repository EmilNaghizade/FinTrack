import { colors, fontSizes } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
  heading: {
    color: colors.text,
    fontSize: fontSizes.xl,
    fontWeight: "700",
  },

  sectionTitle: {
    color: colors.text,
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },

  middleTitle: {
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },

  body: {
    color: colors.text,
    fontSize: fontSizes.md,
  },

  secondary: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
  },

  text: {
    color: colors.text
  }
});
