import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../components/cyber_button.dart';
import '../components/glass_card.dart';
import '../providers/risk_provider.dart';

class ResultScreen extends ConsumerWidget {
  const ResultScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final riskState = ref.watch(riskProvider);
    final theme = Theme.of(context);

    final probability = riskState.probability ?? 0.0;
    final isHighRisk = riskState.prediction == 1;

    final primaryColor = isHighRisk ? Colors.redAccent : Colors.cyanAccent;
    final riskLabel = isHighRisk ? 'HIGH RISK' : 'LOW RISK';
    final riskDescription = isHighRisk
        ? 'Borrower exhibits high probability of credit default based on training vectors. Application rejected.'
        : 'Borrower satisfies safety margin parameters. Application approved.';

    return Scaffold(
      appBar: AppBar(
        title: Text('RISK ANALYSIS', style: theme.textTheme.labelSmall),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              // Radial Gauge Representation
              Center(
                child: SizedBox(
                  width: 200,
                  height: 200,
                  child: Stack(
                    children: [
                      Center(
                        child: SizedBox(
                          width: 180,
                          height: 180,
                          child: CircularProgressIndicator(
                            value: probability,
                            strokeWidth: 12,
                            backgroundColor: Colors.white10,
                            valueColor: AlwaysStoppedAnimation<Color>(primaryColor),
                          ),
                        ),
                      ),
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              '${(probability * 100).toStringAsFixed(1)}%',
                              style: theme.textTheme.displayMedium?.copyWith(
                                color: primaryColor,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'DEFAULT PROB',
                              style: theme.textTheme.labelSmall?.copyWith(fontSize: 10),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),
              // Risk Badge
              Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: primaryColor.withValues(alpha: 0.1),
                    border: Border.all(color: primaryColor, width: 1.5),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    riskLabel,
                    style: TextStyle(
                      color: primaryColor,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
                  ),
                ),
              ),
              const Spacer(),
              GlassCard(
                height: 140,
                child: Center(
                  child: Text(
                    riskDescription,
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      height: 1.5,
                      color: theme.brightness == Brightness.dark ? Colors.white70 : Colors.black87,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              CyberButton(
                text: 'New Assessment',
                onPressed: () {
                  ref.read(riskProvider.notifier).reset();
                  context.go('/home');
                },
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}
