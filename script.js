const BASE_URL = "https://banking-backend-6cnf.onrender.com";

// 1. Create Account
async function createAccount() {
    const { value: formValues } = await Swal.fire({
        title: 'Create Account',
        html:
            '<input id="swal-name" class="swal2-input" placeholder="Account Holder Name">' +
            '<input id="swal-balance" type="number" class="swal2-input" placeholder="Initial Balance">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => [
            document.getElementById('swal-name').value,
            document.getElementById('swal-balance').value
        ]
    });

    if (formValues && formValues[0] && formValues[1]) {
        try {
            const response = await fetch(`${BASE_URL}/accounts/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    accountHolderName: formValues[0],
                    balance: parseFloat(formValues[1])
                })
            });
            const data = await response.json();
            Swal.fire('Success', `Account Created! Account No: ${data.accNo || data.id}`, 'success');
        } catch (err) {
            Swal.fire('Error', 'Failed to create account', 'error');
        }
    }
}

// 2. Deposit
async function deposit() {
    const { value: formValues } = await Swal.fire({
        title: 'Deposit Money',
        html:
            '<input id="swal-id" type="number" class="swal2-input" placeholder="Account Number">' +
            '<input id="swal-amount" type="number" class="swal2-input" placeholder="Deposit Amount">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => [
            document.getElementById('swal-id').value,
            document.getElementById('swal-amount').value
        ]
    });

    if (formValues && formValues[0] && formValues[1]) {
        try {
            const response = await fetch(`${BASE_URL}/accounts/${formValues[0]}/deposite`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(formValues[1]) })
            });
            const data = await response.json();
            Swal.fire('Success', `Updated Balance: $${data.balance}`, 'success');
        } catch (err) {
            Swal.fire('Error', 'Deposit failed! Invalid Account No', 'error');
        }
    }
}

// 3. Withdraw
async function withdraw() {
    const { value: formValues } = await Swal.fire({
        title: 'Withdraw Money',
        html:
            '<input id="swal-id" type="number" class="swal2-input" placeholder="Account Number">' +
            '<input id="swal-amount" type="number" class="swal2-input" placeholder="Withdraw Amount">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => [
            document.getElementById('swal-id').value,
            document.getElementById('swal-amount').value
        ]
    });

    if (formValues && formValues[0] && formValues[1]) {
        try {
            const response = await fetch(`${BASE_URL}/accounts/${formValues[0]}/withdraw`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(formValues[1]) })
            });
            const data = await response.json();
            Swal.fire('Success', `Remaining Balance: $${data.balance}`, 'success');
        } catch (err) {
            Swal.fire('Error', 'Withdrawal failed! Check balance or Account No', 'error');
        }
    }
}

// 4. Transfer
async function transfer() {
    const { value: formValues } = await Swal.fire({
        title: 'Transfer Money',
        html:
            '<input id="swal-from" type="number" class="swal2-input" placeholder="Sender Account No">' +
            '<input id="swal-to" type="number" class="swal2-input" placeholder="Receiver Account No">' +
            '<input id="swal-amount" type="number" class="swal2-input" placeholder="Transfer Amount">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => [
            document.getElementById('swal-from').value,
            document.getElementById('swal-to').value,
            document.getElementById('swal-amount').value
        ]
    });

    if (formValues && formValues[0] && formValues[1] && formValues[2]) {
        try {
            const response = await fetch(`${BASE_URL}/accounts/transfer`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fromAccNo: parseInt(formValues[0]),
                    toAccNo: parseInt(formValues[1]),
                    amount: parseFloat(formValues[2])
                })
            });
            if (!response.ok) throw new Error("Transfer Failed");
            Swal.fire('Success', 'Transfer Completed Successfully!', 'success');
        } catch (err) {
            Swal.fire('Error', 'Transfer Failed! Check Account details & Balance', 'error');
        }
    }
}

// 5. View Account
async function viewAccount() {
    const { value: id } = await Swal.fire({
        title: 'View Account Details',
        input: 'number',
        inputPlaceholder: 'Enter Account Number',
        showCancelButton: true
    });

    if (id) {
        try {
            const response = await fetch(`${BASE_URL}/accounts/${id}`);
            const data = await response.json();
            document.getElementById('output').innerHTML = `
                <h3>Account Details</h3>
                <p><strong>Account No:</strong> ${data.accNo || data.id}</p>
                <p><strong>Holder Name:</strong> ${data.accountHolderName || data.name}</p>
                <p><strong>Balance:</strong> $${data.balance}</p>
            `;
        } catch (err) {
            Swal.fire('Error', 'Account not found!', 'error');
        }
    }
}

// 6. View All Accounts
async function viewAllAccounts() {
    try {
        const response = await fetch(`${BASE_URL}/accounts/all`);
        const data = await response.json();
        
        let tableHTML = `
            <h3>All Accounts</h3>
            <table>
                <tr>
                    <th>Acc No</th>
                    <th>Holder Name</th>
                    <th>Balance</th>
                </tr>
        `;
        
        data.forEach(acc => {
            tableHTML += `
                <tr>
                    <td>${acc.accNo || acc.id}</td>
                    <td>${acc.accountHolderName || acc.name}</td>
                    <td>$${acc.balance}</td>
                </tr>
            `;
        });
        
        tableHTML += `</table>`;
        document.getElementById('output').innerHTML = tableHTML;
    } catch (err) {
        Swal.fire('Error', 'Failed to fetch accounts!', 'error');
    }
}
