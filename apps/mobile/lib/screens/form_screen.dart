import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../components/cyber_button.dart';
import '../components/cyber_input.dart';
import '../providers/risk_provider.dart';

class FormScreen extends ConsumerStatefulWidget {
  const FormScreen({super.key});

  @override
  ConsumerState<FormScreen> createState() => _FormScreenState();
}

class _FormScreenState extends ConsumerState<FormScreen> {
  final _formKey = GlobalKey<FormState>();
  final PageController _pageController = PageController();
  int _currentStep = 0;
  final int _totalSteps = 4;

  // Input Controllers
  final _ageController = TextEditingController(text: '35');
  final _incomeController = TextEditingController(text: '75000');
  final _loanAmountController = TextEditingController(text: '20000');
  final _creditScoreController = TextEditingController(text: '710');
  final _monthsEmployedController = TextEditingController(text: '48');
  final _numCreditLinesController = TextEditingController(text: '3');
  final _interestRateController = TextEditingController(text: '5.5');
  final _loanTermController = TextEditingController(text: '36');
  final _dtiRatioController = TextEditingController(text: '0.25');

  // Categorical Dropdowns/Selects
  String _education = "Bachelor's";
  String _employmentType = 'Full-time';
  String _maritalStatus = 'Married';
  String _hasMortgage = 'No';
  String _hasDependents = 'No';
  String _loanPurpose = 'Auto';
  String _hasCoSigner = 'No';
  String _modelType = 'Logistic Regression';

  @override
  void dispose() {
    _ageController.dispose();
    _incomeController.dispose();
    _loanAmountController.dispose();
    _creditScoreController.dispose();
    _monthsEmployedController.dispose();
    _numCreditLinesController.dispose();
    _interestRateController.dispose();
    _loanTermController.dispose();
    _dtiRatioController.dispose();
    _pageController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < _totalSteps - 1) {
      setState(() => _currentStep++);
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _submitForm();
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;

    final data = {
      'age': int.parse(_ageController.text),
      'income': double.parse(_incomeController.text),
      'loanAmount': double.parse(_loanAmountController.text),
      'creditScore': int.parse(_creditScoreController.text),
      'monthsEmployed': int.parse(_monthsEmployedController.text),
      'numCreditLines': int.parse(_numCreditLinesController.text),
      'interestRate': double.parse(_interestRateController.text),
      'loanTerm': int.parse(_loanTermController.text),
      'dtiRatio': double.parse(_dtiRatioController.text),
      'education': _education,
      'employmentType': _employmentType,
      'maritalStatus': _maritalStatus,
      'hasMortgage': _hasMortgage,
      'hasDependents': _hasDependents,
      'loanPurpose': _loanPurpose,
      'hasCoSigner': _hasCoSigner,
      'modelType': _modelType,
    };

    final success = await ref.read(riskProvider.notifier).submitPrediction(data);
    if (success && mounted) {
      context.push('/result');
    } else if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(ref.read(riskProvider).errorMessage ?? 'Connection error.'),
          backgroundColor: Colors.redAccent,
        ),
      );
    }
  }

  Widget _buildStepIndicator() {
    final theme = Theme.of(context);
    return Row(
      children: List.generate(_totalSteps, (index) {
        final active = index <= _currentStep;
        return Expanded(
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            height: 4,
            margin: const EdgeInsets.symmetric(horizontal: 4),
            decoration: BoxDecoration(
              color: active ? theme.colorScheme.primary : Colors.grey.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
        );
      }),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final riskState = ref.watch(riskProvider);

    ref.listen<RiskState>(riskProvider, (previous, next) {
      if (previous != null && !previous.isBackendLive && next.isBackendLive) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text(
              'ML ENGINE ONLINE! CONNECTION ACTIVE.',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                letterSpacing: 1.0,
                color: Colors.white,
              ),
            ),
            backgroundColor: Colors.teal.shade700,
            duration: const Duration(seconds: 4),
          ),
        );
      }
    });

    return Scaffold(
      appBar: AppBar(
        title: Text('ASSESSMENT FORM', style: theme.textTheme.labelSmall),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _buildStepIndicator(),
                const SizedBox(height: 24),
                Expanded(
                  child: PageView(
                    controller: _pageController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      // Step 1: Personal Profile
                      SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Text('PERSONAL PROFILE', style: theme.textTheme.displaySmall),
                            const SizedBox(height: 24),
                            CyberInput(
                              label: 'Age',
                              controller: _ageController,
                              keyboardType: TextInputType.number,
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                            const SizedBox(height: 16),
                            _buildDropdown('Education', _education, ["Bachelor's", 'High School', "Master's", 'PhD'], (val) {
                              setState(() => _education = val!);
                            }),
                            const SizedBox(height: 16),
                            _buildDropdown('Marital Status', _maritalStatus, ['Married', 'Single', 'Divorced'], (val) {
                              setState(() => _maritalStatus = val!);
                            }),
                            const SizedBox(height: 16),
                            _buildDropdown('Dependents', _hasDependents, ['Yes', 'No'], (val) {
                              setState(() => _hasDependents = val!);
                            }),
                          ],
                        ),
                      ),
                      // Step 2: Financial Vector
                      SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Text('FINANCIAL VECTOR', style: theme.textTheme.displaySmall),
                            const SizedBox(height: 24),
                            CyberInput(
                              label: 'Annual Income (\$)',
                              controller: _incomeController,
                              keyboardType: TextInputType.number,
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                            const SizedBox(height: 16),
                            _buildDropdown('Employment Type', _employmentType, ['Full-time', 'Part-time', 'Self-employed', 'Unemployed'], (val) {
                              setState(() => _employmentType = val!);
                            }),
                            const SizedBox(height: 16),
                            _buildDropdown('Mortgage Status', _hasMortgage, ['Yes', 'No'], (val) {
                              setState(() => _hasMortgage = val!);
                            }),
                          ],
                        ),
                      ),
                      // Step 3: Credit Performance
                      SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Text('CREDIT PERFORMANCE', style: theme.textTheme.displaySmall),
                            const SizedBox(height: 24),
                            CyberInput(
                              label: 'Credit Score',
                              controller: _creditScoreController,
                              keyboardType: TextInputType.number,
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                            const SizedBox(height: 16),
                            CyberInput(
                              label: 'Months Employed',
                              controller: _monthsEmployedController,
                              keyboardType: TextInputType.number,
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                            const SizedBox(height: 16),
                            CyberInput(
                              label: 'Active Credit Lines',
                              controller: _numCreditLinesController,
                              keyboardType: TextInputType.number,
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                          ],
                        ),
                      ),
                      // Step 4: Loan Settings
                      SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Text('LOAN PARAMETERS', style: theme.textTheme.displaySmall),
                            const SizedBox(height: 24),
                            CyberInput(
                              label: 'Loan Amount (\$)',
                              controller: _loanAmountController,
                              keyboardType: TextInputType.number,
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                            const SizedBox(height: 16),
                            CyberInput(
                              label: 'Interest Rate (%)',
                              controller: _interestRateController,
                              keyboardType: const TextInputType.numberWithOptions(decimal: true),
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                            const SizedBox(height: 16),
                            CyberInput(
                              label: 'Loan Term (Months)',
                              controller: _loanTermController,
                              keyboardType: TextInputType.number,
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                            const SizedBox(height: 16),
                            CyberInput(
                              label: 'Debt-to-Income (DTI) Ratio',
                              controller: _dtiRatioController,
                              keyboardType: const TextInputType.numberWithOptions(decimal: true),
                              validator: (v) => v!.isEmpty ? 'Required' : null,
                            ),
                            const SizedBox(height: 16),
                            _buildDropdown('Loan Purpose', _loanPurpose, ['Auto', 'Business', 'Education', 'Home', 'Other'], (val) {
                              setState(() => _loanPurpose = val!);
                            }),
                            const SizedBox(height: 16),
                            _buildDropdown('Co-Signer', _hasCoSigner, ['Yes', 'No'], (val) {
                              setState(() => _hasCoSigner = val!);
                            }),
                            const SizedBox(height: 16),
                            _buildDropdown('Model Engine', _modelType, ['Logistic Regression', 'Random Forest', 'XGBoost', 'KNN'], (val) {
                              setState(() => _modelType = val!);
                            }),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    if (_currentStep > 0)
                      Expanded(
                        child: TextButton(
                          onPressed: _prevStep,
                          child: Text('BACK', style: TextStyle(color: theme.colorScheme.primary)),
                        ),
                      ),
                    if (_currentStep > 0) const SizedBox(width: 16),
                    Expanded(
                      flex: 2,
                      child: riskState.isLoading
                          ? const Center(child: CircularProgressIndicator(color: Colors.cyan))
                          : CyberButton(
                              text: _currentStep == _totalSteps - 1 ? 'Compute Risk' : 'Next Step',
                              onPressed: _nextStep,
                            ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDropdown(String label, String value, List<String> items, ValueChanged<String?> onChanged) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          label.toUpperCase(),
          style: theme.textTheme.labelSmall?.copyWith(
            color: theme.textTheme.bodyLarge?.color,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          decoration: BoxDecoration(
            color: Colors.black.withValues(alpha: 0.3),
            border: const Border(
              bottom: BorderSide(color: Colors.white10, width: 2),
            ),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: value,
              isExpanded: true,
              dropdownColor: theme.colorScheme.surface,
              onChanged: onChanged,
              items: items.map((String item) {
                return DropdownMenuItem<String>(
                  value: item,
                  child: Text(item, style: theme.textTheme.bodyLarge),
                );
              }).toList(),
            ),
          ),
        ),
      ],
    );
  }
}
