import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/api_service.dart';

class RiskState {
  final bool isLoading;
  final bool isBackendLive;
  final double? probability;
  final int? prediction;
  final String? errorMessage;

  RiskState({
    this.isLoading = false,
    this.isBackendLive = false,
    this.probability,
    this.prediction,
    this.errorMessage,
  });

  RiskState copyWith({
    bool? isLoading,
    bool? isBackendLive,
    double? probability,
    int? prediction,
    String? errorMessage,
  }) {
    return RiskState(
      isLoading: isLoading ?? this.isLoading,
      isBackendLive: isBackendLive ?? this.isBackendLive,
      probability: probability ?? this.probability,
      prediction: prediction ?? this.prediction,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

class RiskNotifier extends StateNotifier<RiskState> {
  RiskNotifier() : super(RiskState()) {
    checkBackendHealth();
  }

  bool _isPolling = false;

  Future<void> checkBackendHealth() async {
    if (_isPolling) return;
    
    state = state.copyWith(isLoading: true);
    final isLive = await ApiService.healthCheck(timeout: const Duration(seconds: 8));
    state = state.copyWith(isLoading: false, isBackendLive: isLive);

    if (!isLive) {
      _startPolling();
    }
  }

  Future<void> _startPolling() async {
    _isPolling = true;
    int attempts = 0;
    const maxAttempts = 12; // Poll for 60 seconds (12 * 5s)
    
    while (attempts < maxAttempts && !state.isBackendLive) {
      await Future.delayed(const Duration(seconds: 5));
      attempts++;
      
      final isLive = await ApiService.healthCheck(timeout: const Duration(seconds: 4));
      if (isLive) {
        state = state.copyWith(isBackendLive: true);
        break;
      }
    }
    _isPolling = false;
  }

  Future<bool> submitPrediction(Map<String, dynamic> formData) async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    final response = await ApiService.predictRisk(formData);
    state = state.copyWith(isLoading: false);

    if (response != null && response['status'] == 'success') {
      state = state.copyWith(
        prediction: response['prediction'],
        probability: response['probability'],
      );
      return true;
    } else {
      state = state.copyWith(
        errorMessage: 'Failed to obtain prediction from engine. Check connection.',
      );
      return false;
    }
  }

  Future<bool> waitForBackend() async {
    state = state.copyWith(isLoading: true);
    final immediate = await ApiService.healthCheck(timeout: const Duration(seconds: 5));
    if (immediate) {
      state = state.copyWith(isLoading: false, isBackendLive: true);
      return true;
    }

    int attempts = 0;
    const maxAttempts = 11; // 11 * 5s = 55s + 5s initial = 60s
    while (attempts < maxAttempts) {
      await Future.delayed(const Duration(seconds: 5));
      attempts++;
      final isLive = await ApiService.healthCheck(timeout: const Duration(seconds: 4));
      if (isLive) {
        state = state.copyWith(isLoading: false, isBackendLive: true);
        return true;
      }
    }

    state = state.copyWith(isLoading: false, isBackendLive: false);
    return false;
  }

  void reset() {
    state = RiskState(isBackendLive: state.isBackendLive);
  }
}

final riskProvider = StateNotifierProvider<RiskNotifier, RiskState>((ref) {
  return RiskNotifier();
});
