import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../components/cyber_button.dart';
import '../components/glass_card.dart';
import '../providers/risk_provider.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _startInitialConnectionCheck();
    });
  }

  Future<void> _startInitialConnectionCheck() async {
    final notifier = ref.read(riskProvider.notifier);
    final success = await notifier.waitForBackend();
    if (success && mounted) {
      final currentPath = GoRouter.of(context).routeInformationProvider.value.uri.path;
      if (currentPath == '/home') {
        context.push('/form');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final riskState = ref.watch(riskProvider);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              Center(
                child: Image.asset(
                  'assets/logo_no_bg.png',
                  width: 120,
                  height: 120,
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Mastering \nthe \nMargin of Risk',
                textAlign: TextAlign.center,
                style: theme.textTheme.displayMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  letterSpacing: 2,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'An interactive deep-dive into AI-driven credit risk assessment and high-fidelity predictive modeling.',
                textAlign: TextAlign.center,
                style: theme.textTheme.bodyMedium,
              ),
              const Spacer(),
              GlassCard(
                height: 200,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'ENGINE STATUS',
                          style: theme.textTheme.labelSmall,
                        ),
                        riskState.isLoading
                            ? const SizedBox(
                                width: 16,
                                height: 16,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.cyan,
                                ),
                              )
                            : Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: riskState.isBackendLive
                                      ? Colors.green.withValues(alpha: 0.2)
                                      : Colors.red.withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(4),
                                  border: Border.all(
                                    color: riskState.isBackendLive ? Colors.green : Colors.red,
                                    width: 1,
                                  ),
                                ),
                                child: Text(
                                  riskState.isBackendLive ? 'ONLINE' : 'OFFLINE',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: riskState.isBackendLive ? Colors.green : Colors.red,
                                  ),
                                ),
                              ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      riskState.isLoading
                          ? 'Checking ML engine health. Connecting to Render server (takes up to 1 min to boot)...'
                          : riskState.isBackendLive
                              ? 'Machine Learning model endpoint is live. Redirecting you to assessment...'
                              : 'Backend API is currently sleeping or offline. The 1-minute wake-up window timed out.',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: isDark ? Colors.white70 : Colors.black87,
                      ),
                    ),
                    if (!riskState.isBackendLive && !riskState.isLoading) ...[
                      const SizedBox(height: 16),
                      GestureDetector(
                        onTap: _startInitialConnectionCheck,
                        child: const Text(
                          'Tap to retry connection',
                          style: TextStyle(
                            color: Colors.cyan,
                            decoration: TextDecoration.underline,
                            fontSize: 12,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      )
                    ]
                  ],
                ),
              ),
              const SizedBox(height: 24),
              CyberButton(
                text: 'Initialize Assessment',
                onPressed: () => context.push('/form'),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}
