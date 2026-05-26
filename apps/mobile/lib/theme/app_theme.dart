import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Dark Theme Colors
  static const Color darkBgBase = Color(0xFF0A0C10);
  static const Color darkBgSurface = Color(0xFF12161F);
  static const Color darkTextPrimary = Color(0xFFFFFFFF);
  static const Color darkTextSecondary = Color(0xFF8A94A6);

  // Light Theme Colors
  static const Color lightBgBase = Color(0xFFF4F6F9);
  static const Color lightBgSurface = Color(0xFFFFFFFF);
  static const Color lightTextPrimary = Color(0xFF1C1F26);
  static const Color lightTextSecondary = Color(0xFF6B7280);

  // Global Accents
  static const Color primaryBase = Color(0xFF00ADB5); // Darker cyan for light theme readability
  static const Color primaryGlow = Color(0x3300ADB5);
  static const Color dangerBase = Color(0xFFFF4D4D);
  static const Color successBase = Color(0xFF46E3B7);

  // Borders & Spacing
  static const double radiusSm = 4.0;
  static const double radiusMd = 12.0;
  static const double radiusLg = 24.0;

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: darkBgBase,
      primaryColor: primaryBase,
      colorScheme: const ColorScheme.dark(
        primary: primaryBase,
        surface: darkBgSurface,
        error: dangerBase,
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.inter(
          fontSize: 48,
          fontWeight: FontWeight.bold,
          letterSpacing: -1.5,
          color: darkTextPrimary,
        ),
        displayMedium: GoogleFonts.inter(
          fontSize: 32,
          fontWeight: FontWeight.w600,
          color: darkTextPrimary,
        ),
        displaySmall: GoogleFonts.inter(
          fontSize: 24,
          fontWeight: FontWeight.w500,
          color: darkTextPrimary,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          color: darkTextPrimary,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.normal,
          color: darkTextSecondary,
        ),
        labelSmall: GoogleFonts.firaCode(
          fontSize: 12,
          fontWeight: FontWeight.normal,
          letterSpacing: 2.0,
          color: darkTextSecondary,
        ),
      ),
    );
  }

  static ThemeData get lightTheme {
    return ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: lightBgBase,
      primaryColor: primaryBase,
      colorScheme: const ColorScheme.light(
        primary: primaryBase,
        surface: lightBgSurface,
        error: dangerBase,
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.inter(
          fontSize: 48,
          fontWeight: FontWeight.bold,
          letterSpacing: -1.5,
          color: lightTextPrimary,
        ),
        displayMedium: GoogleFonts.inter(
          fontSize: 32,
          fontWeight: FontWeight.w600,
          color: lightTextPrimary,
        ),
        displaySmall: GoogleFonts.inter(
          fontSize: 24,
          fontWeight: FontWeight.w500,
          color: lightTextPrimary,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          color: lightTextPrimary,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.normal,
          color: lightTextSecondary,
        ),
        labelSmall: GoogleFonts.firaCode(
          fontSize: 12,
          fontWeight: FontWeight.normal,
          letterSpacing: 2.0,
          color: lightTextSecondary,
        ),
      ),
    );
  }
}
