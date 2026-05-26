import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class CyberButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isDanger;

  const CyberButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.isDanger = false,
  });

  @override
  State<CyberButton> createState() => _CyberButtonState();
}

class _CyberButtonState extends State<CyberButton> {
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    final baseColor = widget.isDanger ? AppTheme.dangerBase : AppTheme.primaryBase;
    final glowColor = widget.isDanger ? AppTheme.dangerBase.withValues(alpha: 0.4) : AppTheme.primaryGlow;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovering = true),
      onExit: (_) => setState(() => _isHovering = false),
      child: GestureDetector(
        onTapDown: (_) => setState(() => _isHovering = true),
        onTapUp: (_) => setState(() => _isHovering = false),
        onTapCancel: () => setState(() => _isHovering = false),
        onTap: widget.onPressed,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          decoration: BoxDecoration(
            color: _isHovering ? glowColor : Colors.transparent,
            border: Border.all(color: baseColor, width: 1.5),
            borderRadius: BorderRadius.circular(AppTheme.radiusSm),
            boxShadow: _isHovering
                ? [
                    BoxShadow(
                      color: glowColor,
                      blurRadius: 15,
                      spreadRadius: 2,
                    )
                  ]
                : [],
          ),
          child: Center(
            child: Text(
              widget.text.toUpperCase(),
              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: baseColor,
                    fontWeight: FontWeight.bold,
                  ),
            ),
          ),
        ),
      ),
    );
  }
}
