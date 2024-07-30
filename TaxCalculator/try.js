function calculateTax() {
    // Collect Personal Details
    const age = parseInt(document.getElementById('age').value);
    const city = document.getElementById('city').value;

    // Collect Gross Salary Details
    const basicSalary = parseFloat(document.getElementById('basic_salary').value);
    const hraReceived = parseFloat(document.getElementById('hra_received').value);
    const ltaReceived = parseFloat(document.getElementById('lta_received').value);
    const specialAllowances = parseFloat(document.getElementById('special_allowances').value);
    const bonuses = parseFloat(document.getElementById('bonuses').value);
    const otherTaxableComponents = parseFloat(document.getElementById('other_taxable_components').value);

    // Collect Exemptions
    const rentPaid = parseFloat(document.getElementById('rent_paid').value);
    const leaveTravelExpenses = parseFloat(document.getElementById('leave_travel_expenses').value);

    // Collect Deductions under Section 80C
    const pfContribution = parseFloat(document.getElementById('pf_contribution').value);
    const ppfContribution = parseFloat(document.getElementById('ppf_contribution').value);
    const lifeInsurancePremium = parseFloat(document.getElementById('life_insurance_premium').value);
    const elssContribution = parseFloat(document.getElementById('elss_contribution').value);
    const nscContribution = parseFloat(document.getElementById('nsc_contribution').value);
    const homeLoanPrincipalRepayment = parseFloat(document.getElementById('home_loan_principal_repayment').value);

    // Collect Other Deductions
    const healthInsurancePremium = parseFloat(document.getElementById('health_insurance_premium').value);
    const homeLoanInterest = parseFloat(document.getElementById('home_loan_interest').value);
    const educationLoanInterest = parseFloat(document.getElementById('education_loan_interest').value);
    const otherDeductions = parseFloat(document.getElementById('other_deductions').value);

    // Collect Tax Paid Information
    const tdsByEmployer = parseFloat(document.getElementById('tds_by_employer').value);
    const advanceTaxPayments = parseFloat(document.getElementById('advance_tax_payments').value);
    const selfAssessmentTaxPayments = parseFloat(document.getElementById('self_assessment_tax_payments').value);

    // Calculate Gross Income
    const grossIncome = basicSalary + hraReceived + ltaReceived + specialAllowances + bonuses + otherTaxableComponents;

    // Calculate Exemptions
    const hraExemption = Math.min(hraReceived, (rentPaid - 0.1 * basicSalary), (city === 'metro' ? 0.5 : 0.4) * basicSalary);
    const ltaExemption = leaveTravelExpenses;

    // Calculate Net Salary after Exemptions
    const netSalary = grossIncome - hraExemption - ltaExemption;

    // Calculate Deductions under Section 80C
    const totalDeductions80C = Math.min(150000, pfContribution + ppfContribution + lifeInsurancePremium + elssContribution + nscContribution + homeLoanPrincipalRepayment);

    // Calculate Other Deductions
    const totalDeductions = totalDeductions80C + healthInsurancePremium + homeLoanInterest + educationLoanInterest + otherDeductions + 50000;

    // Calculate Taxable Income
    const taxableIncome = netSalary - totalDeductions;

    // Calculate Income Tax Based on Tax Slabs (Example: For FY 2023-24)
    let incomeTax = 0;
    if (taxableIncome <= 250000) {
        incomeTax = 0;
    } else if (taxableIncome <= 500000) {
        incomeTax = 0.05 * (taxableIncome - 250000);
    } else if (taxableIncome <= 750000) {
        incomeTax = 0.05 * 250000 + 0.1 * (taxableIncome - 500000);
    } else if (taxableIncome <= 1000000) {
        incomeTax = 0.05 * 250000 + 0.1 * 250000 + 0.15 * (taxableIncome - 750000);
    } else if (taxableIncome <= 1250000) {
        incomeTax = 0.05 * 250000 + 0.1 * 250000 + 0.15 * 250000 + 0.2 * (taxableIncome - 1000000);
    } else if (taxableIncome <= 1500000) {
        incomeTax = 0.05 * 250000 + 0.1 * 250000 + 0.15 * 250000 + 0.2 * 250000 + 0.25 * (taxableIncome - 1250000);
    } else {
        incomeTax = 0.05 * 250000 + 0.1 * 250000 + 0.15 * 250000 + 0.2 * 250000 + 0.25 * 250000 + 0.3 * (taxableIncome - 1500000);
    }

    // Subtract Tax Paid
    const totalTaxPaid = tdsByEmployer + advanceTaxPayments + selfAssessmentTaxPayments;
    const netTaxPayable = incomeTax - totalTaxPaid;

    // Prepare the last line based on netTaxPayable
    const netTaxPayableText = netTaxPayable > 0 ? `<p><strong>Net Tax Payable:</strong> ₹${netTaxPayable.toFixed(2)}</p>` 
                                                : `<p><strong>Income Tax Return:</strong> ₹${Math.abs(netTaxPayable).toFixed(2)}</p>`;

    // Display the Results
    document.getElementById('result').innerHTML = `
        <h2>Tax Calculation Result</h2>
        <p><strong>Gross Income:</strong> ₹${grossIncome.toFixed(2)}</p>
        <p><strong>Net Salary after Exemptions:</strong> ₹${netSalary.toFixed(2)}</p>
        <p><strong>Total Deductions:</strong> ₹${totalDeductions.toFixed(2)}</p>
        <p><strong>Taxable Income:</strong> ₹${taxableIncome.toFixed(2)}</p>
        <p><strong>Income Tax:</strong> ₹${incomeTax.toFixed(2)}</p>
        <p><strong>Total Tax Paid:</strong> ₹${totalTaxPaid.toFixed(2)}</p>
        ${netTaxPayableText}
    `;

    // Detailed Results
    document.getElementById('detailedResult').innerHTML = `
        <h2>Detailed Tax Calculation Breakdown</h2>
        <p><strong>Gross Income Breakdown:</strong></p>
        <p>Basic Salary: ₹${basicSalary.toFixed(2)}</p>
        <p>HRA Received: ₹${hraReceived.toFixed(2)}</p>
        <p>LTA Received: ₹${ltaReceived.toFixed(2)}</p>
        <p>Special Allowances: ₹${specialAllowances.toFixed(2)}</p>
        <p>Bonuses: ₹${bonuses.toFixed(2)}</p>
        <p>Other Taxable Components: ₹${otherTaxableComponents.toFixed(2)}</p>
        <p><strong>Exemptions Breakdown:</strong></p>
        <p>HRA Exemption: ₹${hraExemption.toFixed(2)}</p>
        <p>LTA Exemption: ₹${ltaExemption.toFixed(2)}</p>
        <p><strong>Deductions Breakdown:</strong></p>
        <p>Standard Deduction: ₹50000.00</p>
        <p>PF Contribution: ₹${pfContribution.toFixed(2)}</p>
        <p>PPF Contribution: ₹${ppfContribution.toFixed(2)}</p>
        <p>Life Insurance Premium: ₹${lifeInsurancePremium.toFixed(2)}</p>
        <p>ELSS Contribution: ₹${elssContribution.toFixed(2)}</p>
        <p>NSC Contribution: ₹${nscContribution.toFixed(2)}</p>
        <p>Home Loan Principal Repayment: ₹${homeLoanPrincipalRepayment.toFixed(2)}</p>
        <p>Total Deductions under Section 80C: ₹${totalDeductions80C.toFixed(2)}</p>
        <p>Health Insurance Premium: ₹${healthInsurancePremium.toFixed(2)}</p>
        <p>Home Loan Interest: ₹${homeLoanInterest.toFixed(2)}</p>
        <p>Education Loan Interest: ₹${educationLoanInterest.toFixed(2)}</p>
        <p>Other Deductions: ₹${otherDeductions.toFixed(2)}</p>
        <p>Total Deductions: ₹${totalDeductions.toFixed(2)}</p>
        <p><strong>Tax Paid Breakdown:</strong></p>
        <p>TDS by Employer: ₹${tdsByEmployer.toFixed(2)}</p>
        <p>Advance Tax Payments: ₹${advanceTaxPayments.toFixed(2)}</p>
        <p>Self-Assessment Tax Payments: ₹${selfAssessmentTaxPayments.toFixed(2)}</p>
        <p>Total Tax Paid: ₹${totalTaxPaid.toFixed(2)}</p>
    `;

    document.getElementById('moreDetailsButton').style.display = 'block';
}

function toggleDetails() {
    const details = document.getElementById('detailedResult');
    if (details.style.display === 'none') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}
