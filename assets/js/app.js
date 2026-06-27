// App State Management and Business Logic
let appState = null;
let charts = {}; // Store Chart.js instances

// Initial Database State with Extracted Placeholder Data
const DEMO_DATA = {
    accounts: ["Gowtham", "Renuka"],
    categories: {"Expense":{"Entertainment":["Activities","Media/Cinema","Sports","Gadgets","Vacation/Travel"],"Miscellaneous":["Other"],"Home Expenses":["Mortgage/Rent","Electricity","Water","Home Supplies"],"Transfer (Out)":["Lent to Others","Borrow Repayment"],"Bills/Subscriptions":["OTT\u0027s","Memberships","Mobile/Wifi"],"Daily Living":["Groceries","Personal Supplies","Clothing","Eating Out","Grooming"],"Health":["Hospital","Medicine/Drugs"],"Charity/Gifts":["Gifts Given","Donations"],"Transportation":["Fuel","Bus/Taxi/Train Fare","Repairs/Maintenance"],"Obligations":["To Home_G","To Home_R","Credit Cards","Other Loans"]},"Income":{"Carryforward":["Previous Balance"],"Variable":["Other Income"],"Transfer (In)":["Lent Repayment","Borrowed From"],"Fixed":["Salary_G","Salary_R"]},"Savings":{"Savings":["Emergency Fund","Investments"]}},
    statements: [],
    debts: [],
    descriptionMap: {"29-May-26":"IRCTC Wallet","08-Apr-26":"From Accenture","14-Feb-26":"Parker Pen","26-Feb-26":"Ghee, Paneer","13-May-26":"Eating Out","21-Nov-25":"Dinner @Shanthi Nagar","02-Apr-26":"From Ilanjiyam","29-Nov-25":"Pizza","23-Apr-26":"Bus","23-Dec-25":"Tea","04-Apr-26":"Chilli Chicken","29-Dec-25":"Curd","13-Mar-26":"Chicken","07-Dec-25":"Puliyur Ticket","05-Mar-26":"Internet Bill claim","14-Apr-26":"Marriage Reg. for Vasanth","01-Mar-26":"Juice","12-Dec-25":"Petrol","26-Apr-26":"Redbus to BG","18-Dec-25":"Grocerries","09-Mar-26":"Research 360","26-Nov-25":"Cone","18-Apr-26":"You tube Movie","17-Dec-25":"KFC","10-Dec-25":"Water Bill","17-Jan-26":"Fish","27-Dec-25":"Market, Yelahanka","17-May-26":"Tea","21-Apr-26":"Grocerries","23-Nov-25":"Aadhar Registration","08-Feb-26":"Puliyur EB Bill","05-Feb-26":"Bakery","16-Apr-26":"Swiggy Instamart","08-Jan-26":"Zepto-Weight Machine","07-Feb-26":"Dairy Milk","09-Feb-26":"To Home","09-Apr-26":"Milk","16-Mar-26":"Paani Poori","14-Jan-26":"Tea","06-May-26":"THE BIG MARKET","01-May-26":"Thangamayil","24-Dec-25":"Arav Farm","01-Jun-26":"Thangamayil","22-Dec-25":"Biriyani","21-Dec-25":"IRCTC Turicorin to BG","21-May-26":"BMTC","14-May-26":"Milk","25-Feb-26":"Chicken Roll","27-Mar-26":"Bus to Salem","19-Mar-26":"Curd","13-Dec-25":"Flower","14-Nov-25":"Grocerries-Untill 14-Nov","06-Jan-26":"Milk","19-Dec-25":"Grocerries","31-Dec-25":"Tea","15-Mar-26":"RKM Bus","25-Jan-26":"Perambalur Shopping","18-Jan-26":"Fruits Marapannor","22-May-26":"Chicken","28-Apr-26":"Shawarma","25-Dec-25":"Onion","09-Dec-25":"Annual Maintenance Fee","22-Nov-25":"Medicals","20-Mar-26":"Milk","12-May-26":"Number Plate","03-Mar-26":"Electricity","24-Jan-26":"Tea Snacks","03-Apr-26":"To Vaibhav","21-Jan-26":"SCAM","08-Dec-25":"Zepto","05-Apr-26":"Threading","10-Apr-26":"Zudio","15-Apr-26":"Popeyes","10-Jan-26":"Home Rent","28-Mar-26":"Fruits \u0026 Fuel, Goodalur","06-Apr-26":"Selvarani Current bill","27-Apr-26":"Thangamayil","28-Jan-26":"Zepto","24-May-26":"Bike Repair","11-Mar-26":"Parking @ marudhamalai","24-Mar-26":"Eating Out","13-Feb-26":"Kaviraj Marriage Train tickets","09-Nov-25":"Snacks","24-Apr-26":"Chicken Rice","13-Nov-25":"KPN Fresh","07-Apr-26":"Gift to Gowtham","05-Jan-26":"Cold tablet","02-Feb-26":"Electricity","17-Apr-26":"Snacks","12-Jan-26":"Paani Poori","03-May-26":"Perambalur Shopping","19-Jan-26":"Milk","03-Nov-25":"DINOY GE","16-May-26":"Swiggy Instamart","21-Feb-26":"Auto to SMVT","06-Mar-26":"KFC","03-Jan-26":"Tea","02-Mar-26":"Thangamayil","14-Dec-25":"Thangamayil - Diamond Bracelet","17-Mar-26":"Milk \u0026 Snacks","16-Nov-25":"Tea","23-May-26":"Tea","30-Dec-25":"Dress Alteration","13-Jan-26":"Ajio, Jacket","25-Mar-26":"Parotta","20-May-26":"Milk","19-Feb-26":"Sherif Bhai Biriyani-Zomato","19-May-26":"Capacitor","10-Feb-26":"Jimiki","16-Jan-26":"Murugan Stores","27-Jan-26":"Paani Poori","15-Feb-26":"Milk","23-Mar-26":"Bus to Perambalur","12-Apr-26":"Milk \u0026 Curd","12-Mar-26":"Milk","24-Nov-25":"Vela Bakery","15-Dec-25":"From Selvarani","26-Dec-25":"Tomato","22-Feb-26":"Local Bus","04-May-26":"Redbus Perambalur to BG","30-Nov-25":"Zepto-Rice","20-Jan-26":"Chicken","26-Jan-26":"Domino\u0027s","02-May-26":"From Elanjiyam","07-Mar-26":"Selvarani EMI","17-Feb-26":"Ointment for Neck","30-Apr-26":"Skate Shoes","29-Mar-26":"Flower","16-Dec-25":"Cab, Santhi Nagar to Home","22-Apr-26":"Cab","02-Nov-25":"SANTHIYA M","28-Dec-25":"Ithihaas","07-May-26":"Milk \u0026 Snacks","01-Dec-25":"Thalasery Hotel","02-Dec-25":"KPN Fresh","20-Apr-26":"Grocerries","05-Nov-25":"CHRG-ATM TXN DECLINE FEE","20-Feb-26":"Zepto - Cake","13-Apr-26":"Water Wash","08-Nov-25":"Sagar Dress","19-Apr-26":"Dress","09-Jan-26":"Wifi-Selvarani","23-Feb-26":"Cab from Majestic to Home","25-Nov-25":"Oil, KPN","11-Feb-26":"To Renu Thatha","11-Nov-25":"SETC","15-Jan-26":"EB Bill","11-Apr-26":"Muskan Fashion","29-Apr-26":"Thangamayil","05-May-26":"Airtel Wifi","01-Nov-25":"Selvarani","18-Nov-25":"Gocerries","17-Nov-25":"Zepto","01-Jan-26":"Chicken","07-Jan-26":"IRCTC Turicorin to BG-Cancelled","22-Mar-26":"Zepto","01-Apr-26":"To Savings Box","25-May-26":"Milk","11-Jan-26":"Mall Parking","21-Mar-26":"Zepto","31-Mar-26":"Thangamayil","09-May-26":"PVR INOX","10-Mar-26":"Juice","03-Dec-25":"Arav Farm","26-May-26":"EB Bill Parimala","15-May-26":"Speedometer Repair","27-Nov-25":"Thangamayil","04-Jan-26":"Malabar Foods","01-Feb-26":"Allowances","28-Nov-25":"Ajio","04-Nov-25":"Parimala Jio","18-Mar-26":"Milk \u0026 Snacks","12-Nov-25":"Monitor Cable","05-Dec-25":"Netflix","28-May-26":"Swiggy","04-Mar-26":"Zepto","06-Nov-25":"RAMACHAN","18-May-26":"Milk/Curd","14-Mar-26":"Bus Ticket","02-Jan-26":"Fruits","08-Mar-26":"Chicken","16-Feb-26":"Zepto-Potato, Milk","20-Dec-25":"Prawn","23-Jan-26":"Tea Snacks","29-Jan-26":"Dinner","18-Feb-26":"Chilli Chicken","03-Feb-26":"Zip Tag","10-May-26":"THE BIG MARKET"},
    budgets: {"Investments":12000,"Lent Repayment":8000,"Salary_R":48500,"OTT\u0027s":299,"Electricity":800,"To Home_G":5000,"Home Supplies":1000,"Credit Cards":5000,"Groceries":6000,"Water":250,"Clothing":2000,"Repairs/Maintenance":200,"Gifts Given":2760,"Mortgage/Rent":16250,"Fuel":600,"Media/Cinema":1000,"Mobile/Wifi":2000,"Borrowed From":10000,"Borrow Repayment":6875,"Salary_G":56200,"Eating Out":4000,"Grooming":300,"Medicine/Drugs":329,"Personal Supplies":1000,"To Home_R":4621,"Hospital":2000,"Activities":4500,"Bus/Taxi/Train Fare":2000,"Memberships":602},
    settings: {
        theme: "dark",
        currency: "â‚¹"
    }
};

// Excel Staging Global State
let excelStagingTransactions = [];

// Initialize LocalStorage State
function initAppState() {
    const saved = localStorage.getItem("family_finance_state_v3");
    if (saved) {
        try {
            appState = JSON.parse(saved);
        } catch (e) {
            console.error("Error parsing saved state. Restoring demo data.", e);
            appState = JSON.parse(JSON.stringify(DEMO_DATA));
        }
    } else {
        appState = JSON.parse(JSON.stringify(DEMO_DATA));
    }
    
    // Always check for missing keys
    if (!appState.budgets) appState.budgets = {};
    if (!appState.creditCards) appState.creditCards = [];
    if (!appState.emis) appState.emis = [];
    if (!appState.chits) appState.chits = [];
    if (!appState.debts) appState.debts = [];
    if (!appState.descriptionMap) appState.descriptionMap = {};
    if (!appState.statements) appState.statements = [];
    if (!appState.categories) appState.categories = DEMO_DATA.categories;
    if (!appState.settings) appState.settings = DEMO_DATA.settings;
    if (!appState.accounts) appState.accounts = DEMO_DATA.accounts;
    
    // Auto-inject missing specific categories safely
    try {
        if (appState.categories && appState.categories.Expense && appState.categories.Expense.Obligations) {
            if (!appState.categories.Expense.Obligations.includes("EMI")) {
                appState.categories.Expense.Obligations.push("EMI");
            }
        } else if (appState.categories && appState.categories.Expense) {
            appState.categories.Expense["Obligations"] = ["EMI"];
        }
        
        if (appState.categories && appState.categories.Savings && appState.categories.Savings.Savings) {
            if (!appState.categories.Savings.Savings.includes("Recurring Investments")) {
                appState.categories.Savings.Savings.push("Recurring Investments");
            }
        } else if (appState.categories && appState.categories.Savings) {
            appState.categories.Savings["Savings"] = ["Recurring Investments"];
        }
    } catch (e) {
        console.error("Could not inject EMI/Recurring Investments categories", e);
    }
    
    // Auto-sync EMI/Chit progress based on actual linked statements on load
    if (appState.emis && appState.statements) {
        appState.emis.forEach(emi => {
            const payments = appState.statements.filter(t => t.linkedId === emi.id).length;
            emi.remainingMonths = Math.max(0, emi.tenureMonths - payments);
        });
    }
    if (appState.chits && appState.statements) {
        appState.chits.forEach(chit => {
            const payments = appState.statements.filter(t => t.linkedId === chit.id).length;
            chit.bids = [];
            for (let i = 1; i <= payments; i++) {
                chit.bids.push({ bidNum: i, bidAmount: chit.totalValue });
            }
        });
    }
    
    if (!saved) saveState();
    
    // Run one-time data migration to fix swapped fields
    migrateSwappedFields();
}

function saveState() {
    // Auto-sync EMI progress based on actual linked statements
    if (appState.emis && appState.statements) {
        appState.emis.forEach(emi => {
            const payments = appState.statements.filter(t => t.linkedId === emi.id).length;
            emi.remainingMonths = Math.max(0, emi.tenureMonths - payments);
        });
    }
    
    // Auto-sync Chit progress based on actual linked statements
    if (appState.chits && appState.statements) {
        appState.chits.forEach(chit => {
            const payments = appState.statements.filter(t => t.linkedId === chit.id).length;
            chit.bids = [];
            for (let i = 1; i <= payments; i++) {
                chit.bids.push({ bidNum: i, bidAmount: chit.totalValue });
            }
        });
    }
    
    localStorage.setItem("family_finance_state_v3", JSON.stringify(appState));
}

function formatCurr(amount) {
    if (amount === 0 || amount === "0") return "0";
    if (!amount) return "";
    const absVal = Math.abs(amount).toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
    });
    return amount < 0 ? `-${absVal}` : absVal;
}

function parseAmountStr(valStr) {
    if (!valStr) return 0;
    return parseFloat(valStr.toString().replace(/,/g, '')) || 0;
}

// Format Date for Display (YYYY-MM-DD -> DD-MMM-YYYY)
function formatDateDisplay(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[parseInt(parts[1], 10) - 1];
    return `${parts[2]}-${month}-${parts[0]}`;
}

// One-time migration to fix swapped fields from build script
function migrateSwappedFields() {
    if (appState._migrated) return;
    
    // Detect: if statements have s_init_ IDs and description looks like a date (DD-Mon-YY)
    const datePattern = /^\d{2}-[A-Za-z]{3}-\d{2}$/;
    const needsMigration = appState.statements.some(s => 
        s.id && s.id.startsWith('s_init_') && datePattern.test(s.description)
    );
    
    if (!needsMigration) {
        appState._migrated = true;
        saveState();
        return;
    }
    
    console.log('Running one-time data migration to fix swapped fields...');
    
    // Month name to number mapping
    const monthMap = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    
    appState.statements = appState.statements.map(s => {
        if (!s.id || !s.id.startsWith('s_init_')) return s;
        if (!datePattern.test(s.description)) return s;
        
        // Current wrong mapping:
        // description = date string (DD-Mon-YY)
        // subCategory = actual description
        // date = account name (Gowtham/Renuka)
        // account = serial number
        // type is mostly wrong (Income for expenses)
        
        const rawDate = s.description; // e.g. "01-Nov-25"
        const actualDescription = s.subCategory;
        const actualAccount = s.date; // "Gowtham" or "Renuka"
        
        // Parse date: DD-Mon-YY -> YYYY-MM-DD
        const [day, monStr, yr] = rawDate.split('-');
        const month = monthMap[monStr] || '01';
        const year = parseInt(yr) < 50 ? `20${yr}` : `19${yr}`;
        const isoDate = `${year}-${month}-${day.padStart(2, '0')}`;
        
        // Fix type: items with amount > 0 that were tagged "Income" are actually expenses
        // Items with amount === 0 tagged "Expense" are actually incomes (Salary, received money)
        let fixedType = s.type;
        let fixedAmount = s.amount;
        
        if (s.type === 'Income' && s.amount > 0) {
            // This is actually an expense
            fixedType = 'Expense';
            fixedAmount = -Math.abs(s.amount);
        } else if (s.type === 'Expense' && s.amount === 0) {
            // This is actually an income entry (Salary, etc.) - keep as Income with 0
            // User will need to fill in the actual salary amount later
            fixedType = 'Income';
            fixedAmount = 0;
        }
        
        return {
            id: s.id,
            date: isoDate,
            account: actualAccount,
            description: actualDescription,
            subCategory: '', // User needs to categorize these
            amount: fixedAmount,
            type: fixedType
        };
    });
    
    // Sort by date descending
    appState.statements.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    appState._migrated = true;
    saveState();
    console.log(`Migration complete. ${appState.statements.length} records fixed.`);
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
    } else {
        sidebar.classList.toggle('collapsed');
        // Save preference
        appState.settings.sidebarCollapsed = sidebar.classList.contains('collapsed');
        saveState();
    }
}

// Add event listener to close mobile sidebar when a menu item is clicked
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-item a').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('mobile-open');
            }
        });
    });
});

// Switch themes
function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    appState.settings.theme = next;
    saveState();
    
    // Update theme toggle button icon
    const themeBtn = document.querySelector(".theme-toggle i");
    if (themeBtn) {
        themeBtn.className = next === "dark" ? "ri-sun-line" : "ri-moon-line";
    }
    
    // Rerender dashboard charts with new grid colors
    if (window.location.hash === "#dashboard" || !window.location.hash) {
        renderDashboardCharts();
    }
}

// -------------------------------------------------------------
// CHIT FUND CALCULATIONS
// -------------------------------------------------------------
function calculateChitRound(chit, bidNum, bidAmount) {
    const installment = chit.totalValue / chit.members;
    const discount = chit.totalValue - bidAmount;
    const divisor = chit.members - bidNum;
    
    // Standard division of discount among remaining active savers
    const dividend = divisor > 0 ? (discount / divisor) : 0;
    
    let userPayment = installment;
    let userReceived = 0;
    
    if (bidNum < chit.takenBidNum) {
        // Dividend discount is subtracted before user wins the chit
        userPayment = installment - dividend;
    } else if (bidNum === chit.takenBidNum) {
        // Round when chit is won: pays full installment, receives winning bid amount
        userPayment = installment;
        userReceived = bidAmount;
    } else {
        // After winning: pays full installment, no dividend discount
        userPayment = installment;
    }
    
    return {
        installment,
        discount,
        dividend,
        userPayment,
        userReceived
    };
}

function getChitCalculations(chit) {
    let totalPaid = 0;
    let totalReceived = 0;
    const calculatedRounds = [];
    
    for (let r = 1; r <= chit.members; r++) {
        const bid = chit.bids.find(b => b.bidNum === r) || { bidNum: r, bidAmount: chit.totalValue };
        const calc = calculateChitRound(chit, r, bid.bidAmount);
        totalPaid += calc.userPayment;
        totalReceived += calc.userReceived;
        calculatedRounds.push({
            bidNum: r,
            bidAmount: bid.bidAmount,
            ...calc
        });
    }
    
    return {
        rounds: calculatedRounds,
        totalPaid,
        totalReceived,
        netGain: totalReceived - totalPaid
    };
}

// -------------------------------------------------------------
// DEBT / LEND & BORROW CALCULATIONS
// -------------------------------------------------------------
function getDebtOutstanding(debt) {
    const repaid = debt.repayments.reduce((sum, r) => sum + r.amount, 0);
    return Math.max(0, debt.amount - repaid);
}

function getDebtSummary() {
    let totalLent = 0;
    let totalLentReceived = 0;
    let totalBorrowed = 0;
    let totalBorrowedRepaid = 0;
    
    appState.debts.forEach(debt => {
        const repaid = debt.repayments.reduce((sum, r) => sum + r.amount, 0);
        if (debt.type === "Lent") {
            totalLent += debt.amount;
            totalLentReceived += repaid;
        } else {
            totalBorrowed += debt.amount;
            totalBorrowedRepaid += repaid;
        }
    });
    
    const outstandingLent = totalLent - totalLentReceived;
    const outstandingBorrowed = totalBorrowed - totalBorrowedRepaid;
    
    return {
        totalLent,
        totalLentReceived,
        outstandingLent,
        totalBorrowed,
        totalBorrowedRepaid,
        outstandingBorrowed,
        netOverallPosition: outstandingLent - outstandingBorrowed // Positive means we are owed money
    };
}

// Group Debts by Contact Person
function getContactSummary() {
    const contacts = {};
    
    appState.debts.forEach(debt => {
        const name = debt.person;
        if (!contacts[name]) {
            contacts[name] = {
                name: name,
                lentAmount: 0,
                lentRepaid: 0,
                borrowAmount: 0,
                borrowRepaid: 0
            };
        }
        
        const repaid = debt.repayments.reduce((sum, r) => sum + r.amount, 0);
        if (debt.type === "Lent") {
            contacts[name].lentAmount += debt.amount;
            contacts[name].lentRepaid += repaid;
        } else {
            contacts[name].borrowAmount += debt.amount;
            contacts[name].borrowRepaid += repaid;
        }
    });
    
    // Calculate net positions
    return Object.values(contacts).map(c => {
        const outstandingOwedToUs = c.lentAmount - c.lentRepaid;
        const outstandingWeOwe = c.borrowAmount - c.borrowRepaid;
        return {
            ...c,
            outstandingOwedToUs,
            outstandingWeOwe,
            netFamilyPosition: outstandingOwedToUs - outstandingWeOwe // Positive: Contact owes us, Negative: We owe contact
        };
    });
}

// -------------------------------------------------------------
// END OF MONTH RECONCILIATION
// -------------------------------------------------------------
function getMonthlyReconciliation(yearMonth) {
    // yearMonth is in format "YYYY-MM"
    const targetTransactions = appState.statements.filter(t => t.date.startsWith(yearMonth));
    
    let totalIncome = 0;
    let totalExpense = 0;
    let totalSavings = 0;
    
    targetTransactions.forEach(t => {
        if (t.type === "Income") {
            totalIncome += t.amount;
        } else if (t.type === "Expense") {
            totalExpense += Math.abs(t.amount);
        } else if (t.type === "Savings") {
            totalSavings += Math.abs(t.amount);
        }
    });
    
    // Incorporate Debt repayments logged this month
    let debtLentOutflow = 0;
    let debtLentInflow = 0;
    let debtBorrowInflow = 0;
    let debtBorrowOutflow = 0;
    
    appState.debts.forEach(d => {
        if (d.date.startsWith(yearMonth)) {
            if (d.type === "Lent") debtLentOutflow += d.amount;
            else debtBorrowInflow += d.amount;
        }
        d.repayments.forEach(r => {
            if (r.date.startsWith(yearMonth)) {
                if (d.type === "Lent") debtLentInflow += r.amount;
                else debtBorrowOutflow += r.amount;
            }
        });
    });
    
    // Chit payments/receipts this month
    let chitOutflow = 0;
    let chitInflow = 0;
    appState.chits.forEach(c => {
        const calcs = getChitCalculations(c);
        // Estimate chit payments based on dates
        const chitStartDate = new Date(c.startDate);
        for (let r = 1; r <= c.members; r++) {
            const bidDate = new Date(chitStartDate);
            bidDate.setMonth(bidDate.getMonth() + (r - 1) * c.freqMonths);
            const bidYM = bidDate.toISOString().slice(0, 7);
            
            if (bidYM === yearMonth) {
                const roundCalc = calcs.rounds[r - 1];
                chitOutflow += roundCalc.userPayment;
                chitInflow += roundCalc.userReceived;
            }
        }
    });
    
    // Tally Net Cash Flow
    // Incomes + Borrows + Lent Repayments + Chit Payouts
    const totalInflow = totalIncome + debtBorrowInflow + debtLentInflow + chitInflow;
    // Expenses + Savings + Lends + Borrow Repayments + Chit Dues
    const totalOutflow = totalExpense + totalSavings + debtLentOutflow + debtBorrowOutflow + chitOutflow;
    const netCashFlow = totalInflow - totalOutflow;
    
    return {
        totalIncome,
        totalExpense,
        totalSavings,
        debtLentOutflow,
        debtLentInflow,
        debtBorrowInflow,
        debtBorrowOutflow,
        chitOutflow,
        chitInflow,
        totalInflow,
        totalOutflow,
        netCashFlow
    };
}

// -------------------------------------------------------------
// EXCEL IMPORT & PARSING (SheetJS)
// -------------------------------------------------------------
function importExcelFile(file, type, onLoadCallback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        let importedRows = [];
        
        if (type === "paytm") {
            const sheet = workbook.Sheets["Passbook Payment History"];
            if (!sheet) {
                alert("Sheet 'Passbook Payment History' not found in Paytm Excel file.");
                return;
            }
            
            const rawJson = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            if (rawJson.length <= 1) {
                alert("No transaction records found in the statement.");
                return;
            }
            
            const headers = rawJson[0];
            const colIdx = {
                date: headers.indexOf("Date"),
                time: headers.indexOf("Time"),
                details: headers.indexOf("Transaction Details"),
                account: headers.indexOf("Your Account"),
                amount: headers.indexOf("Amount"),
                tags: headers.indexOf("Tags")
            };
            
            if (colIdx.date === -1 || colIdx.details === -1 || colIdx.amount === -1) {
                alert("Paytm statement columns do not match expected schema.");
                return;
            }
            
            for (let r = 1; r < rawJson.length; r++) {
                const row = rawJson[r];
                if (!row || row.length === 0 || !row[colIdx.date]) continue;
                
                let rawDate = row[colIdx.date].toString().trim(); // DD/MM/YYYY
                let formattedDate = "";
                if (rawDate.includes("/")) {
                    const parts = rawDate.split("/");
                    formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
                } else {
                    formattedDate = rawDate;
                }
                
                let desc = row[colIdx.details] ? row[colIdx.details].trim() : "";
                if (desc.includes("Transferred to Self")) continue;
                
                const rawAmount = parseFloat(row[colIdx.amount].toString().replace(/,/g, ''));
                if (isNaN(rawAmount)) continue;
                
                const acct = row[colIdx.account] ? row[colIdx.account].trim() : "Gowtham";
                let accountOwner = "Gowtham";
                if (acct.toLowerCase().includes("renuka")) {
                    accountOwner = "Renuka";
                }
                
                let tagCategory = "";
                if (colIdx.tags !== -1 && row[colIdx.tags]) {
                    tagCategory = row[colIdx.tags].replace(/#/g, '').replace(/\?/g, '').trim();
                }
                
                if (tagCategory) {
                    desc = desc + (desc ? " - " : "") + tagCategory;
                }
                
                importedRows.push({
                    date: formattedDate,
                    description: desc,
                    account: accountOwner,
                    amount: rawAmount,
                    tagCategory: tagCategory,
                    subCategory: ""
                });
            }
        } else if (type === "standard") {
            const sheet = workbook.Sheets["STATEMENT"];
            if (!sheet) {
                alert("Sheet 'STATEMENT' not found in Excel file.");
                return;
            }
            
            const rawJson = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            let headerRowIndex = -1;
            for (let r = 0; r < rawJson.length; r++) {
                if (rawJson[r].includes("Accnt. Name") || rawJson[r].includes("Description")) {
                    headerRowIndex = r;
                    break;
                }
            }
            
            if (headerRowIndex === -1) {
                alert("Standard statement headers not found in spreadsheet.");
                return;
            }
            
            const headers = rawJson[headerRowIndex];
            const colIdx = {
                account: headers.indexOf("Accnt. Name"),
                date: headers.indexOf("Date"),
                desc: headers.indexOf("Description"),
                subcat: headers.indexOf("Sub-Category"),
                debit: headers.indexOf("Debit"),
                credit: headers.indexOf("Credit")
            };
            
            for (let r = headerRowIndex + 1; r < rawJson.length; r++) {
                const row = rawJson[r];
                if (!row || row.length === 0 || !row[colIdx.date]) continue;
                
                let formattedDate = "";
                let rawDate = row[colIdx.date].toString().trim();
                
                if (!isNaN(rawDate) && Number(rawDate) > 10000 && Number(rawDate) < 99999) {
                    const dateObj = new Date((Number(rawDate) - 25569) * 86400 * 1000);
                    formattedDate = dateObj.toISOString().slice(0, 10);
                } else if (rawDate.includes("-") || rawDate.includes("/")) {
                    const dateObj = new Date(rawDate);
                    if (!isNaN(dateObj)) {
                        formattedDate = dateObj.toISOString().slice(0, 10);
                    } else {
                        formattedDate = rawDate;
                    }
                } else {
                    formattedDate = rawDate;
                }
                
                const desc = row[colIdx.desc] ? row[colIdx.desc].trim() : "";
                const subcat = row[colIdx.subcat] ? row[colIdx.subcat].trim() : "";
                
                let debit = row[colIdx.debit] ? parseFloat(row[colIdx.debit].toString().replace(/[^\d.-]/g, '')) : 0;
                let credit = row[colIdx.credit] ? parseFloat(row[colIdx.credit].toString().replace(/[^\d.-]/g, '')) : 0;
                
                let amt = 0;
                if (!isNaN(debit) && debit !== 0) {
                    amt = -debit;
                } else if (!isNaN(credit) && credit !== 0) {
                    amt = credit;
                }
                
                if (amt === 0) continue;
                
                importedRows.push({
                    date: formattedDate,
                    description: desc,
                    account: row[colIdx.account] ? row[colIdx.account].trim() : "Gowtham",
                    amount: amt,
                    tagCategory: "",
                    subCategory: subcat
                });
            }
        }
        
        importedRows.forEach(row => {
            const memorySubCat = appState.descriptionMap[row.description];
            if (memorySubCat) {
                row.subCategory = memorySubCat;
            } else if (row.tagCategory) {
                const matched = findSubcategoryMatch(row.tagCategory);
                if (matched) row.subCategory = matched;
            }
        });
        
        excelStagingTransactions = importedRows;
        onLoadCallback(importedRows);
    };
    reader.readAsArrayBuffer(file);
}

function findSubcategoryMatch(tag) {
    const t = tag.toLowerCase();
    for (const group in appState.categories) {
        for (const cat in appState.categories[group]) {
            const subcats = appState.categories[group][cat];
            const found = subcats.find(s => s.toLowerCase() === t);
            if (found) return found;
        }
    }
    return "";
}

// Helper: build category optgroup options string, alphabetically sorted
function buildCategoryOptgroupOptions(selectedValue) {
    let html = '';
    const groups = Object.keys(appState.categories).sort();
    groups.forEach(group => {
        const cats = Object.keys(appState.categories[group]).sort();
        cats.forEach(cat => {
            html += `<optgroup label="${cat}">`;
            const subs = [...appState.categories[group][cat]].sort();
            subs.forEach(sub => {
                const sel = (sub === selectedValue) ? ' selected' : '';
                html += `<option value="${sub}"${sel}>${sub}</option>`;
            });
            html += `</optgroup>`;
        });
    });
    return html;
}

// -------------------------------------------------------------
// DOWNLOAD EXCEL TEMPLATE
// -------------------------------------------------------------
function downloadExcelTemplate() {
    const wb = XLSX.utils.book_new();
    
    // 1. Categories Sheet
    const catData = [["Sub-Category", "Category", "Category Type"]];
    for (const type in appState.categories) {
        for (const cat in appState.categories[type]) {
            appState.categories[type][cat].forEach(sub => {
                catData.push([sub, cat, type]);
            });
        }
    }
    const catWs = XLSX.utils.aoa_to_sheet(catData);
    XLSX.utils.book_append_sheet(wb, catWs, "CATEGORY");
    
    // 2. Statement Sheet
    const statementCols = ["Sl. No.", "Accnt. Name", "Date", "Description", "Sub-Category", "Debit", "Credit"];
    const statementData = [
        statementCols,
        [1, "Gowtham", "2026-06-01", "Sample Salary", "Salary_G", "", 50000],
        [2, "Gowtham", "2026-06-02", "Sample Rent", "Mortgage/Rent", 15000, ""]
    ];
    const statementWs = XLSX.utils.aoa_to_sheet(statementData);
    XLSX.utils.book_append_sheet(wb, statementWs, "STATEMENT");
    
    // 3. Lends & Borrows Sheet
    const lbData = [
        ["MONEY LENT TO OTHERS (You gave money; waiting to get back)"],
        ["S#", "Account", "Date", "Person / Description", "Category Tag", "Amount Lent (INR)", "Amount Received Back (INR)"],
        [1, "Gowtham", "2026-06-01", "To Friend Naveen", "Lent to Others", 5000, 2000],
        [],
        ["MONEY BORROWED FROM OTHERS (You received money; need to repay)"],
        ["S#", "Account", "Date", "Person / Description", "Category Tag", "Amount Borrowed (INR)", "Amount Repaid (INR)"],
        [1, "Gowtham", "2026-06-02", "From Vasanth for Rent", "Borrowed From", 10000, 0]
    ];
    const lbWs = XLSX.utils.aoa_to_sheet(lbData);
    XLSX.utils.book_append_sheet(wb, lbWs, "LEND & BORROW");
    
    XLSX.writeFile(wb, "financial_tracker_template.xlsx");
}

// -------------------------------------------------------------
// BACKUP EXPORT & RESTORE
// -------------------------------------------------------------
function downloadBackupFile() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `family_finance_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
}

function restoreBackupFile(file, onCompleteCallback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const restored = JSON.parse(e.target.result);
            if (restored.statements && restored.categories && restored.accounts) {
                appState = restored;
                saveState();
                onCompleteCallback(true);
            } else {
                onCompleteCallback(false, "Invalid backup schema. Required nodes missing.");
            }
        } catch (err) {
            onCompleteCallback(false, err.message);
        }
    };
    reader.readAsText(file);
}

// -------------------------------------------------------------
// UI ROUTING & RENDERING ENGINE
// -------------------------------------------------------------
function handleHashRouter() {
    const hash = window.location.hash || "#dashboard";
    
    document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    
    const targetLink = document.querySelector(`.menu-item a[href="${hash}"]`);
    if (targetLink) {
        targetLink.parentElement.classList.add("active");
    }
    
    const targetTab = document.querySelector(hash);
    if (targetTab) {
        targetTab.classList.add("active");
        
        if (hash === "#dashboard") {
            loadDashboardPage();
        } else if (hash === "#expenses") {
            loadExpensesPage();
        } else if (hash === "#budget") {
            loadBudgetPage();
        } else if (hash === "#debts") {
            loadDebtsPage();
        } else if (hash === "#chits") {
            loadChitsPage();
        } else if (hash === "#emis") {
            loadEMIsPage();
        } else if (hash === "#settings") {
            loadSettingsPage();
        } else if (hash === "#import") {
            loadImportPage();
        }
    }
}

// -------------------------------------------------------------
// PAGE LOADERS
// -------------------------------------------------------------
function loadDashboardPage() {
    const year = document.getElementById("dash-filter-year")?.value || "All";
    const month = document.getElementById("dash-filter-month")?.value || "All";
    const dateFrom = document.getElementById("dash-date-from")?.value || "";
    const dateTo = document.getElementById("dash-date-to")?.value || "";

    const yearSelect = document.getElementById("dash-filter-year");
    if (yearSelect) {
        const currentVal = yearSelect.value;
        const years = new Set(appState.statements.map(s => s.date.substring(0, 4)));
        yearSelect.innerHTML = `<option value="All">All Years</option>`;
        Array.from(years).sort().reverse().forEach(y => {
            const opt = document.createElement("option");
            opt.value = y;
            opt.textContent = y;
            yearSelect.appendChild(opt);
        });
        yearSelect.value = currentVal || "All";
    }

    const filtered = appState.statements.filter(s => {
        let match = true;
        if (year !== "All") match = match && s.date.startsWith(year);
        if (month !== "All") match = match && s.date.substring(5, 7) === month;
        if (dateFrom) match = match && s.date >= dateFrom;
        if (dateTo) match = match && s.date <= dateTo;
        return match;
    });

    let totalIncome = 0;
    let totalExpense = 0;
    let totalSavings = 0;
    
    filtered.forEach(s => {
        if (s.type === "Income") totalIncome += s.amount;
        else if (s.type === "Expense") totalExpense += Math.abs(s.amount);
        else if (s.type === "Savings") totalSavings += Math.abs(s.amount);
    });
    
    const debtSummary = getDebtSummary();
    const netWorth = totalIncome - totalExpense + debtSummary.netOverallPosition;
    
    document.getElementById("dash-net-worth").textContent = formatCurr(netWorth);
    document.getElementById("dash-income").textContent = formatCurr(totalIncome);
    document.getElementById("dash-expense").textContent = formatCurr(totalExpense);
    document.getElementById("dash-outstanding-debt").textContent = formatCurr(debtSummary.netOverallPosition);
    
    const debtCard = document.getElementById("dash-outstanding-debt");
    if (debtSummary.netOverallPosition < 0) {
        debtCard.parentElement.style.setProperty("--card-accent", "var(--danger)");
        debtCard.parentElement.style.setProperty("--card-accent-light", "var(--danger-light)");
    } else {
        debtCard.parentElement.style.setProperty("--card-accent", "var(--success)");
        debtCard.parentElement.style.setProperty("--card-accent-light", "var(--success-light)");
    }
    
    renderDueReminders();
    renderBudgetAlerts(filtered);
    renderDashboardCharts(filtered);
    renderRecentTransactions(filtered);
    renderMonthTallyWidget();
}

window.setDashboardToCurrentMonth = function() {
    const today = new Date();
    
    // Check if the current year exists in the dropdown, if not, add it
    const yearSelect = document.getElementById("dash-filter-year");
    const currentYearStr = today.getFullYear().toString();
    
    let hasYear = false;
    for (let i = 0; i < yearSelect.options.length; i++) {
        if (yearSelect.options[i].value === currentYearStr) hasYear = true;
    }
    if (!hasYear) {
        const opt = document.createElement("option");
        opt.value = currentYearStr;
        opt.textContent = currentYearStr;
        yearSelect.appendChild(opt);
    }
    
    yearSelect.value = currentYearStr;
    document.getElementById("dash-filter-month").value = (today.getMonth() + 1).toString().padStart(2, '0');
    document.getElementById("dash-date-from").value = "";
    document.getElementById("dash-date-to").value = "";
    loadDashboardPage();
};

window.clearDashboardFilter = function() {
    document.getElementById("dash-filter-year").value = "All";
    document.getElementById("dash-filter-month").value = "All";
    document.getElementById("dash-date-from").value = "";
    document.getElementById("dash-date-to").value = "";
    loadDashboardPage();
};

function renderBudgetAlerts(statements) {
    const list = document.getElementById("budget-alerts-list");
    if (!list) return;
    list.innerHTML = "";
    
    const actuals = {};
    statements.forEach(s => {
        if (s.type === "Expense") {
            actuals[s.subCategory] = (actuals[s.subCategory] || 0) + Math.abs(s.amount);
        }
    });
    
    let alerts = [];
    for (const subcat in appState.budgets) {
        const expected = appState.budgets[subcat];
        const actual = actuals[subcat] || 0;
        if (expected > 0 && actual > expected) {
            alerts.push({
                subcat: subcat,
                expected: expected,
                actual: actual,
                over: actual - expected
            });
        }
    }
    
    if (alerts.length === 0) {
        list.innerHTML = `<div class="empty-state">No budget limits crossed. Good job!</div>`;
        return;
    }
    
    alerts.sort((a, b) => b.over - a.over); // Highest overspend first
    
    alerts.forEach(alert => {
        const item = document.createElement("div");
        item.className = "reminder-item";
        item.innerHTML = `
            <div class="reminder-icon" style="background-color: var(--danger-light); color: var(--danger);">
                <i class="ri-alert-line"></i>
            </div>
            <div class="reminder-content">
                <div class="reminder-title" style="color: var(--danger); font-weight: 600;">Over Budget: ${alert.subcat}</div>
                <div class="reminder-meta">Spent ${formatCurr(alert.actual)} of ${formatCurr(alert.expected)} limit</div>
            </div>
            <div class="reminder-amount" style="color: var(--danger);">+${formatCurr(alert.over)}</div>
        `;
        list.appendChild(item);
    });
}

function renderDueReminders() {
    const list = document.getElementById("reminders-list");
    list.innerHTML = "";
    
    const today = new Date();
    const reminders = [];
    
    appState.creditCards.forEach(cc => {
        if (cc.outstandingAmount > 0) {
            let dueDate = new Date(today.getFullYear(), today.getMonth(), cc.dueDate);
            if (today.getDate() > cc.dueDate) {
                dueDate.setMonth(dueDate.getMonth() + 1);
            }
            const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            reminders.push({
                id: cc.id,
                title: `${cc.name} Credit Card Due`,
                desc: `${formatCurr(cc.outstandingAmount)} due on ${dueDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`,
                daysLeft: daysLeft,
                type: daysLeft <= 5 ? "urgent" : "warning",
                payAction: () => triggerCreditCardPayment(cc)
            });
        }
    });
    
    appState.emis.forEach(emi => {
        if (emi.remainingMonths > 0) {
            let dueDate = new Date(today.getFullYear(), today.getMonth(), 5);
            if (today.getDate() > 5) {
                dueDate.setMonth(dueDate.getMonth() + 1);
            }
            const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            reminders.push({
                title: `${emi.name} EMI Payment`,
                desc: `${formatCurr(emi.amount)} due on ${dueDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} (${emi.bank})`,
                daysLeft: daysLeft,
                type: daysLeft <= 5 ? "urgent" : "normal",
                payAction: () => triggerEMIPayment(emi)
            });
        }
    });
    
    appState.chits.forEach(chit => {
        const calcs = getChitCalculations(chit);
        const nextRoundNum = chit.bids.length + 1;
        if (nextRoundNum <= chit.members) {
            const chitStart = new Date(chit.startDate);
            chitStart.setMonth(chitStart.getMonth() + (nextRoundNum - 1) * chit.freqMonths);
            
            const daysLeft = Math.ceil((chitStart - today) / (1000 * 60 * 60 * 24));
            if (daysLeft < 30) {
                const roundCalc = calcs.rounds[nextRoundNum - 1] || { userPayment: chit.totalValue / chit.members };
                reminders.push({
                    title: `${chit.name} Round #${nextRoundNum}`,
                    desc: `${formatCurr(roundCalc.userPayment)} due on ${chitStart.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`,
                    daysLeft: daysLeft,
                    type: daysLeft <= 5 ? "urgent" : "normal",
                    payAction: () => triggerChitPayment(chit, nextRoundNum, roundCalc.userPayment)
                });
            }
        }
    });
    
    reminders.sort((a, b) => a.daysLeft - b.daysLeft);
    
    if (reminders.length === 0) {
        list.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px;">No pending bill dues or reminders. All caught up! ðŸŽ‰</div>`;
        return;
    }
    
    reminders.forEach(rem => {
        const item = document.createElement("div");
        item.className = `reminder-item ${rem.type}`;
        
        const actionBtn = document.createElement("button");
        actionBtn.className = "btn btn-secondary";
        actionBtn.style.padding = "6px 12px";
        actionBtn.style.fontSize = "11px";
        actionBtn.innerHTML = `<i class="ri-check-line"></i> Pay`;
        actionBtn.onclick = rem.payAction;
        
        item.innerHTML = `
            <div class="reminder-info">
                <div class="reminder-title">${rem.title}</div>
                <div class="reminder-desc">${rem.desc}</div>
            </div>
        `;
        item.appendChild(actionBtn);
        list.appendChild(item);
    });
}

function triggerCreditCardPayment(cc) {
    openTransactionModal({
        account: cc.account,
        description: `Credit Card Bill: ${cc.name}`,
        subCategory: "Credit Cards",
        amount: cc.outstandingAmount,
        type: "Expense",
        onSuccess: () => {
            const realCard = appState.creditCards.find(c => c.id === cc.id || (c.name === cc.name && c.account === cc.account));
            if (realCard) realCard.outstandingAmount = 0;
            saveState();
            loadDashboardPage();
        }
    });
}

function triggerEMIPayment(emi) {
    openTransactionModal({
        account: emi.account,
        description: `EMI Payment: ${emi.name}`,
        subCategory: "Other Loans",
        amount: emi.amount,
        type: "Expense",
        onSuccess: () => {
            emi.remainingMonths = Math.max(0, emi.remainingMonths - 1);
            saveState();
            loadDashboardPage();
        }
    });
}

function triggerChitPayment(chit, roundNum, amount) {
    openTransactionModal({
        account: "Gowtham",
        description: `${chit.name} - Round #${roundNum} Installment`,
        subCategory: "Chit Fund",
        amount: amount,
        type: "Savings",
        onSuccess: () => {
            if (chit.bids.length < roundNum) {
                chit.bids.push({ bidNum: roundNum, bidAmount: chit.totalValue });
            }
            saveState();
            loadDashboardPage();
        }
    });
}

function renderRecentTransactions(statementsToUse = appState.statements) {
    const tbody = document.querySelector("#recent-transactions-table tbody");
    tbody.innerHTML = "";
    
    const recents = statementsToUse.slice(0, 10); // Display top 10 on dashboard for real context
    
    if (recents.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No transactions logged yet.</td></tr>`;
        return;
    }
    
    recents.forEach(t => {
        const tr = document.createElement("tr");
        const isDebit = t.amount < 0;
        tr.innerHTML = `
            <td>${formatDateDisplay(t.date)}</td>
            <td><strong>${t.account}</strong></td>
            <td>${t.description}</td>
            <td><span class="badge badge-secondary" style="background-color: var(--accent-light); color: var(--accent);">${t.subCategory || 'Uncategorized'}</span></td>
            <td><span class="badge ${t.type === 'Income' ? 'badge-income' : t.type === 'Expense' ? 'badge-expense' : 'badge-savings'}">${t.type}</span></td>
            <td style="font-weight: 700; text-align: right; color: ${isDebit ? 'var(--danger)' : 'var(--success)'}">${formatCurr(t.amount)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderMonthTallyWidget() {
    const today = new Date();
    const currentYM = today.toISOString().slice(0, 7);
    
    const picker = document.getElementById("reconcile-month-picker");
    if (picker && !picker.value) {
        picker.value = currentYM;
    }
    
    const targetYM = picker ? picker.value : currentYM;
    const data = getMonthlyReconciliation(targetYM);
    
    const [y, m] = targetYM.split("-");
    const monthName = new Date(y, m - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
    
    document.getElementById("tally-title").textContent = `Monthly Tally: ${monthName}`;
    document.getElementById("tally-inflows").textContent = formatCurr(data.totalInflow);
    document.getElementById("tally-outflows").textContent = formatCurr(data.totalOutflow);
    
    const netCashEl = document.getElementById("tally-net-cash");
    netCashEl.textContent = formatCurr(data.netCashFlow);
    if (data.netCashFlow < 0) {
        netCashEl.style.color = "var(--danger)";
    } else {
        netCashEl.style.color = "var(--success)";
    }
}

// -------------------------------------------------------------
// CHARTS RENDERING (Chart.js)
// -------------------------------------------------------------
function renderDashboardCharts(statementsToUse = appState.statements) {
    const isDark = (document.documentElement.getAttribute("data-theme") || "dark") === "dark";
    const textColors = isDark ? "#9ca3af" : "#475569";
    const gridColors = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
    
    const catBreakdown = {};
    let totalAmount = 0;
    
    statementsToUse.forEach(s => {
        const amt = Math.abs(s.amount);
        totalAmount += amt;
        
        let parentCat = s.subCategory || "Uncategorized";
        // Find the parent category name from categories tree
        for (const type in appState.categories) {
            for (const cat in appState.categories[type]) {
                if (appState.categories[type][cat].includes(s.subCategory)) {
                    parentCat = cat;
                    break;
                }
            }
        }
        catBreakdown[parentCat] = (catBreakdown[parentCat] || 0) + amt;
    });
    
    const ctxPie = document.getElementById("categoryBreakdownChart");
    if (ctxPie) {
        if (charts.pie) charts.pie.destroy();
        
        const labels = Object.keys(catBreakdown);
        const data = Object.values(catBreakdown);
        
        if (labels.length === 0) {
            charts.pie = new Chart(ctxPie, {
                type: 'doughnut',
                data: {
                    labels: ["No Data"],
                    datasets: [{
                        data: [1],
                        backgroundColor: ["rgba(156,163,175,0.15)"],
                        borderColor: ["transparent"]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        } else {
            charts.pie = new Chart(ctxPie, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            'rgba(99, 102, 241, 0.7)',
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(245, 158, 11, 0.7)',
                            'rgba(239, 68, 68, 0.7)',
                            'rgba(139, 92, 246, 0.7)',
                            'rgba(236, 72, 153, 0.7)',
                            'rgba(20, 184, 166, 0.7)',
                            'rgba(251, 146, 60, 0.7)',
                            'rgba(34, 211, 238, 0.7)',
                            'rgba(163, 230, 53, 0.7)',
                            'rgba(244, 114, 182, 0.7)',
                            'rgba(96, 165, 250, 0.7)',
                            'rgba(253, 186, 116, 0.7)',
                            'rgba(167, 139, 250, 0.7)',
                            'rgba(110, 231, 183, 0.7)'
                        ],
                        borderColor: isDark ? '#111827' : '#ffffff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: textColors,
                                font: { family: 'Inter', size: 10 }
                            }
                        }
                    }
                }
            });
        }
    }
    
    const trendLabels = [];
    const incomeData = [];
    const expenseData = [];
    
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const ym = d.toISOString().slice(0, 7);
        trendLabels.push(d.toLocaleString('default', { month: 'short' }));
        
        let inc = 0;
        let exp = 0;
        statementsToUse.forEach(s => {
            if (s.date.startsWith(ym)) {
                if (s.type === "Income") inc += s.amount;
                else if (s.type === "Expense") exp += Math.abs(s.amount);
            }
        });
        incomeData.push(inc);
        expenseData.push(exp);
    }
    
    const ctxTrend = document.getElementById("monthlyTrendChart");
    if (ctxTrend) {
        if (charts.trend) charts.trend.destroy();
        
        charts.trend = new Chart(ctxTrend, {
            type: 'bar',
            data: {
                labels: trendLabels,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        backgroundColor: 'rgba(16, 185, 129, 0.75)',
                        borderRadius: 4
                    },
                    {
                        label: 'Expense',
                        data: expenseData,
                        backgroundColor: 'rgba(239, 68, 68, 0.75)',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textColors }
                    },
                    y: {
                        grid: { color: gridColors },
                        ticks: { color: textColors }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: textColors,
                            font: { family: 'Inter', size: 11 }
                        }
                    }
                }
            }
        });
    }
}

// -------------------------------------------------------------
// EXPENSES TAB
// -------------------------------------------------------------
function loadExpensesPage() {
    const subCatFilter = document.getElementById("exp-filter-subcategory");
    subCatFilter.innerHTML = `<option value="">All Sub-Categories</option>` + buildCategoryOptgroupOptions('');
    
    filterExpensesTable();
}

// -------------------------------------------------------------
// BUDGET PLANNER
// -------------------------------------------------------------
function loadBudgetPage() {
    const container = document.getElementById("budget-cards-container");
    if (!container) return;
    container.innerHTML = "";
    
    const monthFilter = document.getElementById("budget-month-filter");
    if (!monthFilter.value) {
        monthFilter.value = new Date().toISOString().slice(0, 7);
    }
    const currentMonth = monthFilter.value;
    const actuals = {};
    
    appState.statements.forEach(s => {
        if (s.date.startsWith(currentMonth)) {
            actuals[s.subCategory] = (actuals[s.subCategory] || 0) + Math.abs(s.amount);
        }
    });

    const groups = Object.keys(appState.categories).sort();
    groups.forEach(type => {
        const cats = Object.keys(appState.categories[type]).sort();
        cats.forEach(cat => {
            const card = document.createElement("div");
            card.className = "dashboard-panel";
            card.style.padding = "0";
            card.style.overflow = "hidden";
            card.style.display = "flex";
            card.style.flexDirection = "column";

            const header = document.createElement("div");
            header.className = "panel-header";
            header.style.padding = "12px 15px";
            header.style.margin = "0";
            header.style.backgroundColor = "var(--surface-2)";
            header.style.borderBottom = "1px solid var(--border)";
            header.innerHTML = `<span class="panel-title" style="font-size: 15px; margin: 0;">${cat} <span style="font-size: 11px; color: var(--text-muted); font-weight: normal; margin-left: 5px;">${type}</span></span>`;
            
            const tableWrapper = document.createElement("div");
            tableWrapper.style.overflowX = "auto";

            const table = document.createElement("table");
            table.className = "custom-table";
            table.style.margin = "0";
            table.style.border = "none";
            table.style.fontSize = "13px";
            table.innerHTML = `
                <thead>
                    <tr>
                        <th style="padding: 10px 15px; background: transparent; border-bottom: 1px solid var(--border);">Sub-Category</th>
                        <th style="padding: 10px 10px; width: 100px; background: transparent; border-bottom: 1px solid var(--border);">Expected</th>
                        <th style="padding: 10px 10px; text-align: right; background: transparent; border-bottom: 1px solid var(--border);">Actual</th>
                        <th style="padding: 10px 15px; text-align: right; background: transparent; border-bottom: 1px solid var(--border);">Diff</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            
            const tbody = table.querySelector("tbody");

            const subs = [...appState.categories[type][cat]].sort();
            subs.forEach((subcat, idx) => {
                const tr = document.createElement("tr");
                if (idx === subs.length - 1) {
                    tr.style.borderBottom = "none";
                }
                const expected = appState.budgets[subcat] || 0;
                const actual = actuals[subcat] || 0;
                let diff = expected - actual;
                
                let diffStyle = "";
                if (type === "Expense") {
                    if (diff < 0) diffStyle = "color: var(--danger); font-weight: bold;";
                    else if (diff >= 0) diffStyle = "color: var(--success);";
                } else if (type === "Income") {
                    diff = actual - expected; 
                    if (diff < 0) diffStyle = "color: var(--danger); font-weight: bold;";
                    else if (diff >= 0) diffStyle = "color: var(--success);";
                }
                
                tr.innerHTML = `
                    <td style="padding: 10px 15px; font-weight: 500;">${subcat}</td>
                    <td style="padding: 6px 10px;"><input type="text" inputmode="decimal" class="form-control budget-input" data-subcat="${subcat}" value="${formatCurr(expected)}" onblur="this.value = formatCurr(parseAmountStr(this.value))" style="padding: 4px 8px; height: 30px; font-size: 13px;"></td>
                    <td style="padding: 10px 10px; text-align: right;">${formatCurr(actual)}</td>
                    <td style="padding: 10px 15px; text-align: right; ${diffStyle}">${formatCurr(diff)}</td>
                `;
                tbody.appendChild(tr);
            });
            
            tableWrapper.appendChild(table);
            card.appendChild(header);
            card.appendChild(tableWrapper);
            container.appendChild(card);
        });
    });
}

function saveBudgetPlanner() {
    const inputs = document.querySelectorAll(".budget-input");
    inputs.forEach(input => {
        const subcat = input.getAttribute("data-subcat");
        const val = parseAmountStr(input.value);
        appState.budgets[subcat] = val;
    });
    saveState();
    alert("Budgets saved successfully!");
    loadBudgetPage();
}

function exportTransactionsCSV() {
    const txType = document.getElementById("exp-filter-type") ? document.getElementById("exp-filter-type").value : "";
    const subcat = document.getElementById("exp-filter-subcategory") ? document.getElementById("exp-filter-subcategory").value : "";
    const search = document.getElementById("exp-search") ? document.getElementById("exp-search").value.toLowerCase() : "";
    const dateFrom = document.getElementById("exp-date-from") ? document.getElementById("exp-date-from").value : "";
    const dateTo = document.getElementById("exp-date-to") ? document.getElementById("exp-date-to").value : "";
    
    const filtered = appState.statements.filter(t => {
        const matchesType = !txType || t.type === txType;
        const matchesSubcat = !subcat || t.subCategory === subcat;
        const matchesSearch = !search || (t.description || "").toLowerCase().includes(search) || (t.subCategory || "").toLowerCase().includes(search);
        const matchesDateFrom = !dateFrom || t.date >= dateFrom;
        const matchesDateTo = !dateTo || t.date <= dateTo;
        return matchesType && matchesSubcat && matchesSearch && matchesDateFrom && matchesDateTo;
    });
    
    if (filtered.length === 0) {
        alert("No transactions to export based on current filters.");
        return;
    }
    
    let csvContent = "Date,Account,Description,Category,Type,Amount\n";
    filtered.forEach(t => {
        // Escape quotes
        const desc = (t.description || "").replace(/"/g, '""');
        const cat = (t.subCategory || "").replace(/"/g, '""');
        csvContent += `${t.date},"${t.account}","${desc}","${cat}",${t.type},${t.amount}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function filterExpensesTable() {
    const txType = document.getElementById("exp-filter-type") ? document.getElementById("exp-filter-type").value : "";
    const subcat = document.getElementById("exp-filter-subcategory").value;
    const search = document.getElementById("exp-search").value.toLowerCase();
    const dateFrom = document.getElementById("exp-date-from") ? document.getElementById("exp-date-from").value : "";
    const dateTo = document.getElementById("exp-date-to") ? document.getElementById("exp-date-to").value : "";
    
    const tbody = document.querySelector("#expenses-table tbody");
    tbody.innerHTML = "";
    
    const filtered = appState.statements.filter(t => {
        const matchesType = !txType || t.type === txType;
        const matchesSubcat = !subcat || t.subCategory === subcat;
        const matchesSearch = !search || (t.description || "").toLowerCase().includes(search) || (t.subCategory || "").toLowerCase().includes(search);
        const matchesDateFrom = !dateFrom || t.date >= dateFrom;
        const matchesDateTo = !dateTo || t.date <= dateTo;
        return matchesType && matchesSubcat && matchesSearch && matchesDateFrom && matchesDateTo;
    });
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No matching transactions found.</td></tr>`;
        return;
    }
    
    filtered.forEach(t => {
        const tr = document.createElement("tr");
        const isDebit = t.amount < 0;
        tr.innerHTML = `
            <td>${formatDateDisplay(t.date)}</td>
            <td><strong>${t.account}</strong></td>
            <td>${t.description}</td>
            <td><span class="badge badge-secondary" style="background-color: var(--accent-light); color: var(--accent);">${t.subCategory || 'Uncategorized'}</span></td>
            <td><span class="badge ${t.type === 'Income' ? 'badge-income' : t.type === 'Expense' ? 'badge-expense' : 'badge-savings'}">${t.type}</span></td>
            <td style="font-weight: 700; text-align: right; color: ${isDebit ? 'var(--danger)' : 'var(--success)'}">${formatCurr(t.amount)}</td>
            <td style="text-align: right;">
                <div class="action-btn-group">
                    <button class="action-btn" title="Edit" onclick="editStatementItem('${t.id}')">
                        <i class="ri-pencil-line"></i>
                    </button>
                    <button class="action-btn delete" title="Delete" onclick="deleteStatementItem('${t.id}')">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function clearDateFilter() {
    const fromEl = document.getElementById("exp-date-from");
    const toEl = document.getElementById("exp-date-to");
    if (fromEl) fromEl.value = "";
    if (toEl) toEl.value = "";
    filterExpensesTable();
}

function editStatementItem(id) {
    const item = appState.statements.find(t => t.id === id);
    if (!item) return;
    
    openTransactionModal({
        account: item.account,
        date: item.date,
        description: item.description,
        subCategory: item.subCategory,
        amount: Math.abs(item.amount),
        type: item.type,
        linkedId: item.linkedId,
        editId: id,
        onSuccess: () => {
            handleHashRouter();
        }
    });
}

function deleteStatementItem(id) {
    if (confirm("Are you sure you want to delete this transaction record?")) {
        appState.statements = appState.statements.filter(t => t.id !== id);
        saveState();
        filterExpensesTable();
    }
}

// -------------------------------------------------------------
// DEBTS TAB (Lends & Borrows Ledger)
// -------------------------------------------------------------
function loadDebtsPage() {
    renderDebtsTable();
    renderFamilyDebtPosition();
}

function renderDebtsTable() {
    const tbody = document.querySelector("#debts-table tbody");
    tbody.innerHTML = "";
    
    if (appState.debts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No lending/borrowing agreements saved.</td></tr>`;
        return;
    }
    
    appState.debts.forEach(d => {
        const tr = document.createElement("tr");
        const repaid = d.repayments.reduce((sum, r) => sum + r.amount, 0);
        const outstanding = Math.max(0, d.amount - repaid);
        const isLent = d.type === "Lent";
        
        tr.innerHTML = `
            <td>${formatDateDisplay(d.date)}</td>
            <td><strong>${d.account}</strong></td>
            <td><span class="badge ${isLent ? 'badge-income' : 'badge-expense'}">${d.type}</span></td>
            <td><strong>${d.person}</strong></td>
            <td>${d.remarks || "-"}</td>
            <td>${formatCurr(d.amount)}</td>
            <td>${formatCurr(repaid)}</td>
            <td style="font-weight: 700; color: ${outstanding > 0 ? 'var(--warning)' : 'var(--success)'}">${formatCurr(outstanding)}</td>
            <td style="text-align: right; display: flex; gap: 4px; justify-content: flex-end;">
                ${outstanding > 0 ? `<button class="btn btn-success" style="padding: 4px 8px; font-size: 11px;" onclick="openRepaymentModal('${d.id}')"><i class="ri-refund-2-line"></i> Repay</button>` : ""}
                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="deleteDebtItem('${d.id}')"><i class="ri-delete-bin-line"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderFamilyDebtPosition() {
    const container = document.getElementById("debts-contacts-grid");
    container.innerHTML = "";
    
    const contactData = getContactSummary();
    const overall = getDebtSummary();
    
    document.getElementById("debt-total-lent").textContent = formatCurr(overall.outstandingLent);
    document.getElementById("debt-total-borrowed").textContent = formatCurr(overall.outstandingBorrowed);
    
    const netLabel = document.getElementById("debt-net-family");
    netLabel.textContent = formatCurr(overall.netOverallPosition);
    if (overall.netOverallPosition < 0) {
        netLabel.style.color = "var(--danger)";
    } else {
        netLabel.style.color = "var(--success)";
    }
    
    if (contactData.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 13px;">No contacts to show. Add a Lend or Borrow contract first!</div>`;
        return;
    }
    
    contactData.forEach(c => {
        if (c.outstandingOwedToUs === 0 && c.outstandingWeOwe === 0) return;
        
        const card = document.createElement("div");
        card.className = "tally-item";
        
        let positionText = "";
        let color = "";
        
        if (c.netFamilyPosition > 0) {
            positionText = `Owes Family ${formatCurr(c.netFamilyPosition)}`;
            color = "var(--success)";
        } else if (c.netFamilyPosition < 0) {
            positionText = `Family Owes ${formatCurr(Math.abs(c.netFamilyPosition))}`;
            color = "var(--danger)";
        } else {
            positionText = "Settled (Net 0 overall)";
            color = "var(--text-muted)";
        }
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 14px;">${c.name}</strong>
                <span style="font-weight: 700; color: ${color}; font-size: 12px;">${positionText}</span>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px; display: flex; flex-direction: column; gap: 2px;">
                <span>Owed to Gowtham/Renuka: ${formatCurr(c.outstandingOwedToUs)}</span>
                <span>Owed by Gowtham/Renuka: ${formatCurr(c.outstandingWeOwe)}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function deleteDebtItem(id) {
    if (confirm("Are you sure you want to delete this loan record? This will also delete all repayment history associated with it.")) {
        appState.debts = appState.debts.filter(d => d.id !== id);
        saveState();
        loadDebtsPage();
    }
}

function openRepaymentModal(debtId) {
    const debt = appState.debts.find(d => d.id === debtId);
    if (!debt) return;
    
    const repaid = debt.repayments.reduce((sum, r) => sum + r.amount, 0);
    const outstanding = debt.amount - repaid;
    
    document.getElementById("repayment-debt-id").value = debtId;
    document.getElementById("repayment-amount").value = outstanding;
    document.getElementById("repayment-amount").max = outstanding;
    document.getElementById("repayment-max-label").textContent = `Max: ${formatCurr(outstanding)}`;
    
    document.getElementById("repayment-modal").classList.add("active");
}

function saveRepaymentEntry() {
    const debtId = document.getElementById("repayment-debt-id").value;
    const amount = parseAmountStr(document.getElementById("repayment-amount").value);
    const date = document.getElementById("repayment-date").value;
    const account = document.getElementById("repayment-account").value;
    
    if (isNaN(amount) || amount <= 0 || !date) {
        alert("Please enter a valid amount and date.");
        return;
    }
    
    const debt = appState.debts.find(d => d.id === debtId);
    if (!debt) return;
    
    const repaid = debt.repayments.reduce((sum, r) => sum + r.amount, 0);
    if (amount > (debt.amount - repaid)) {
        alert("Repayment amount cannot exceed outstanding balance!");
        return;
    }
    
    debt.repayments.push({
        id: "rep_" + Date.now(),
        date: date,
        amount: amount,
        account: account
    });
    
    const isLent = debt.type === "Lent";
    appState.statements.unshift({
        id: "s_rep_" + Date.now(),
        account: account,
        date: date,
        description: `Repayment from ${debt.person}: ${debt.remarks}`,
        subCategory: isLent ? "Lent Repayment" : "Borrow Repayment",
        amount: isLent ? amount : -amount,
        type: isLent ? "Income" : "Expense"
    });
    
    saveState();
    closeAllModals();
    loadDebtsPage();
}

// -------------------------------------------------------------
// CHITS TAB
// -------------------------------------------------------------
function loadChitsPage() {
    const container = document.getElementById("chits-cards-grid");
    container.innerHTML = "";
    
    if (appState.chits.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align: center; color: var(--text-muted); font-size: 13px;">No Chit Funds created yet. Click "Add New Chit" to start tracking!</div>`;
        return;
    }
    
    appState.chits.forEach(chit => {
        const calcs = getChitCalculations(chit);
        const card = document.createElement("div");
        card.className = "dashboard-panel";
        card.style.padding = "20px";
        
        const completedRounds = chit.bids.length;
        const totalRounds = chit.members;
        const completionPct = (completedRounds / totalRounds) * 100;
        
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 12px;">
                <strong style="font-size: 16px; font-family: var(--font-heading);">${chit.name}</strong>
                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="deleteChitItem('${chit.id}')"><i class="ri-delete-bin-line"></i></button>
            </div>
            
            <div class="chit-details-grid">
                <span class="chit-detail-label">Total Fund Value:</span>
                <span class="chit-detail-value">${formatCurr(chit.totalValue)}</span>
                
                <span class="chit-detail-label">Members:</span>
                <span class="chit-detail-value">${chit.members}</span>
                
                <span class="chit-detail-label">Installment Base:</span>
                <span class="chit-detail-value">${formatCurr(chit.totalValue / chit.members)}</span>
                
                <span class="chit-detail-label">Winning Bid round:</span>
                <span class="chit-detail-value">Round #${chit.takenBidNum}</span>
                
                <span class="chit-detail-label">Total Payments Made:</span>
                <span class="chit-detail-value">${formatCurr(calcs.totalPaid)}</span>
                
                <span class="chit-detail-label">Total Payout Received:</span>
                <span class="chit-detail-value">${formatCurr(calcs.totalReceived)}</span>
                
                <span class="chit-detail-label" style="font-weight: 700;">Net Gain/Loss:</span>
                <span class="chit-detail-value" style="font-weight: 700; color: ${calcs.netGain >= 0 ? 'var(--success)' : 'var(--danger)'}">
                    ${formatCurr(calcs.netGain)}
                </span>
            </div>
            
            <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 6px;">
                <div style="display:flex; justify-content:space-between; font-size: 11px; color: var(--text-muted);">
                    <span>Progress (${completedRounds}/${totalRounds} Rounds)</span>
                    <span>${Math.round(completionPct)}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${completionPct}%;"></div>
                </div>
            </div>
            
            <button class="btn btn-primary" style="margin-top: 14px; width: 100%; justify-content: center;" onclick="openChitLedgerModal('${chit.id}')">
                <i class="ri-list-settings-line"></i> View Bids & Payments Ledger
            </button>
        `;
        container.appendChild(card);
    });
}

function deleteChitItem(id) {
    if (confirm("Are you sure you want to delete this Investment Plan? All calculation histories will be lost.")) {
        appState.chits = appState.chits.filter(c => c.id !== id);
        saveState();
        loadChitsPage();
    }
}

function openChitLedgerModal(chitId) {
    const chit = appState.chits.find(c => c.id === chitId);
    if (!chit) return;
    
    document.getElementById("ledger-chit-id").value = chitId;
    document.getElementById("ledger-modal-title").textContent = `Ledger: ${chit.name}`;
    
    const calcs = getChitCalculations(chit);
    const tbody = document.querySelector("#chit-ledger-table tbody");
    tbody.innerHTML = "";
    
    calcs.rounds.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>Round ${r.bidNum}</td>
            <td>
                <input type="number" class="form-control" style="width: 100px; padding: 4px 8px; font-size: 12px;" 
                       value="${r.bidAmount}" onchange="updateChitBidAmount('${chitId}', ${r.bidNum}, this.value)">
            </td>
            <td>${formatCurr(r.discount)}</td>
            <td>${formatCurr(r.dividend)}</td>
            <td>${formatCurr(r.userPayment)}</td>
            <td style="font-weight: 700; color: var(--success);">${r.userReceived > 0 ? formatCurr(r.userReceived) : "-"}</td>
            <td>
                <span class="badge ${r.bidNum <= chit.bids.length ? 'badge-income' : 'badge-pending'}">
                    ${r.bidNum <= chit.bids.length ? 'Paid' : 'Pending'}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    document.getElementById("chit-ledger-modal").classList.add("active");
}

function updateChitBidAmount(chitId, bidNum, value) {
    const val = parseAmountStr(value);
    if (isNaN(val) || val <= 0) return;
    
    const chit = appState.chits.find(c => c.id === chitId);
    if (!chit) return;
    
    let bid = chit.bids.find(b => b.bidNum === bidNum);
    if (bid) {
        bid.bidAmount = val;
    } else {
        chit.bids.push({ bidNum, bidAmount: val });
    }
    
    chit.bids.sort((a,b) => a.bidNum - b.bidNum);
    saveState();
    
    const calcs = getChitCalculations(chit);
    const tbody = document.querySelector("#chit-ledger-table tbody");
    tbody.innerHTML = "";
    calcs.rounds.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>Round ${r.bidNum}</td>
            <td>
                <input type="number" class="form-control" style="width: 100px; padding: 4px 8px; font-size: 12px;" 
                       value="${r.bidAmount}" onchange="updateChitBidAmount('${chitId}', ${r.bidNum}, this.value)">
            </td>
            <td>${formatCurr(r.discount)}</td>
            <td>${formatCurr(r.dividend)}</td>
            <td>${formatCurr(r.userPayment)}</td>
            <td style="font-weight: 700; color: var(--success);">${r.userReceived > 0 ? formatCurr(r.userReceived) : "-"}</td>
            <td>
                <span class="badge ${r.bidNum <= chit.bids.length ? 'badge-income' : 'badge-pending'}">
                    ${r.bidNum <= chit.bids.length ? 'Paid' : 'Pending'}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// -------------------------------------------------------------
// EMIs TAB
// -------------------------------------------------------------
function loadEMIsPage() {
    const tbody = document.querySelector("#emis-table tbody");
    tbody.innerHTML = "";
    
    let totalEmiAmount = 0;
    appState.emis.forEach(e => totalEmiAmount += e.amount);
    document.getElementById("emi-total-monthly").textContent = formatCurr(totalEmiAmount);
    
    if (appState.emis.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No active EMI loans found.</td></tr>`;
    } else {
        appState.emis.forEach(e => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${e.name}</strong></td>
                <td>${e.account}</td>
                <td>${e.bank}</td>
                <td>${formatCurr(e.amount)}</td>
                <td>${e.interestRate}%</td>
                <td>${e.remainingMonths} / ${e.tenureMonths} mos</td>
                <td style="text-align: right;">
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="deleteEMIItem('${e.id}')">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    const ccList = document.getElementById("cc-billing-list");
    if (ccList) {
        ccList.innerHTML = "";
        if (appState.creditCards.length === 0) {
            ccList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px;">No credit cards tracked.</div>`;
        } else {
            appState.creditCards.forEach(cc => {
                const item = document.createElement("div");
                item.className = "reminder-item normal";
                item.innerHTML = `
                    <div class="reminder-info">
                        <div class="reminder-title" style="font-weight:700;">${cc.name} (${cc.account})</div>
                        <div class="reminder-desc">Limit: ${formatCurr(cc.limit)} | Outstanding: ${formatCurr(cc.outstandingAmount)}</div>
                        <div class="reminder-desc" style="font-size:10px; color:var(--text-muted);">Stmt Day: ${cc.statementDate}th | Due Day: ${cc.dueDate}th</div>
                    </div>
                    <div style="display:flex; gap:4px; align-items:center;">
                        ${cc.outstandingAmount > 0 ? `<button class="btn btn-success" style="padding: 6px 10px; font-size: 11px;" onclick="triggerCreditCardPayment({id: '${cc.id}', name: '${cc.name}', account: '${cc.account}', outstandingAmount: ${cc.outstandingAmount}})"><i class="ri-check-line"></i> Pay</button>` : ""}
                        <button class="btn btn-secondary" style="padding: 6px 10px; font-size: 11px;" onclick="deleteCCItem('${cc.id}')"><i class="ri-delete-bin-line"></i></button>
                    </div>
                `;
                ccList.appendChild(item);
            });
        }
    }
}

function deleteEMIItem(id) {
    if (confirm("Are you sure you want to delete this EMI tracker record?")) {
        appState.emis = appState.emis.filter(e => e.id !== id);
        saveState();
        loadEMIsPage();
    }
}

function deleteCCItem(id) {
    if (confirm("Are you sure you want to stop tracking this credit card?")) {
        appState.creditCards = appState.creditCards.filter(c => c.id !== id);
        saveState();
        loadEMIsPage();
    }
}

// -------------------------------------------------------------
// IMPORT SCREEN (Excel Wizard)
// -------------------------------------------------------------
function loadImportPage() {
    renderStagingTable();
}

function handleExcelUpload(e) {
    const file = e.target.files[0];
    const type = document.getElementById("import-file-type").value;
    
    if (!file) return;
    
    importExcelFile(file, type, (rows) => {
        renderStagingTable();
        e.target.value = "";
    });
}

function renderStagingTable() {
    const tbody = document.querySelector("#import-staging-table tbody");
    tbody.innerHTML = "";
    
    const countBadge = document.getElementById("staging-count-badge");
    countBadge.textContent = `${excelStagingTransactions.length} items loaded`;
    
    if (excelStagingTransactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">Upload an Excel statement file to inspect and map.</td></tr>`;
        document.getElementById("btn-commit-import").disabled = true;
        return;
    }
    
    document.getElementById("btn-commit-import").disabled = false;
    
    excelStagingTransactions.forEach((item, idx) => {
        const tr = document.createElement("tr");
        const isDebit = item.amount < 0;
        
        let selectHtml = `<select class="select-dropdown" onchange="updateStagingRowCategory(${idx}, this.value)">`;
        selectHtml += `<option value="">-- Choose Sub-category --</option>`;
        selectHtml += buildCategoryOptgroupOptions(item.subCategory);
        selectHtml += `</select>`;
        
        tr.innerHTML = `
            <td>${formatDateDisplay(item.date)}</td>
            <td><strong>${item.account}</strong></td>
            <td>${item.description}</td>
            <td style="font-weight: 700; color: ${isDebit ? 'var(--danger)' : 'var(--success)'}">${formatCurr(item.amount)}</td>
            <td>${selectHtml}</td>
            <td style="text-align: right;">
                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="removeStagingRow(${idx})">
                    <i class="ri-close-line"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateStagingRowCategory(idx, value) {
    if (excelStagingTransactions[idx]) {
        excelStagingTransactions[idx].subCategory = value;
    }
}

function removeStagingRow(idx) {
    excelStagingTransactions.splice(idx, 1);
    renderStagingTable();
}

function commitStagingTransactions() {
    let commitCount = 0;
    excelStagingTransactions.forEach(item => {
        if (!item.subCategory) return;
        
        let catType = "Expense";
        if (item.amount > 0) catType = "Income";
        
        for (const type in appState.categories) {
            for (const cat in appState.categories[type]) {
                if (appState.categories[type][cat].includes(item.subCategory)) {
                    catType = type;
                }
            }
        }
        
        appState.descriptionMap[item.description] = item.subCategory;
        
        appState.statements.unshift({
            id: "s_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
            account: item.account,
            date: item.date,
            description: item.description,
            subCategory: item.subCategory,
            amount: item.amount,
            type: catType
        });
        commitCount++;
    });
    
    appState.statements.sort((a, b) => new Date(b.date) - new Date(a.date));
    excelStagingTransactions = [];
    saveState();
    return commitCount;
}

function executeImportCommit() {
    const unset = excelStagingTransactions.filter(t => !t.subCategory);
    if (unset.length > 0) {
        if (!confirm(`You have ${unset.length} items without a selected category. They will be ignored. Proceed?`)) {
            return;
        }
    }
    
    const count = commitStagingTransactions();
    alert(`Successfully imported ${count} transaction statement records to your database!`);
    if (window.location.hash === "#expenses") {
        loadExpensesPage();
        loadDashboardPage();
    } else {
        window.location.hash = "#expenses";
    }
}

// -------------------------------------------------------------
// SETTINGS TAB
// -------------------------------------------------------------
function loadSettingsPage() {
    const list = document.getElementById("settings-categories-list");
    list.innerHTML = "";
    
    for (const group in appState.categories) {
        const groupDiv = document.createElement("div");
        groupDiv.className = "dashboard-panel";
        groupDiv.style.marginBottom = "20px";
        
        let catsHtml = "";
        for (const cat in appState.categories[group]) {
            let subcatsHtml = "";
            appState.categories[group][cat].forEach(sub => {
                subcatsHtml += `
                    <div style="display:inline-flex; align-items:center; gap:8px; padding: 6px 12px; border-radius:var(--radius-sm); background:rgba(255,255,255,0.03); border:1px solid var(--border-color); font-size:12px;">
                        <span>${sub}</span>
                        <i class="ri-close-circle-fill" style="cursor:pointer; color:var(--text-muted);" onclick="deleteSubcategorySetting('${group}', '${cat}', '${sub}')"></i>
                    </div>
                `;
            });
            
            catsHtml += `
                <div style="margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <strong style="font-size:14px; color:var(--text-primary);">${cat}</strong>
                        <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="promptAddSubcategory('${group}', '${cat}')">
                            <i class="ri-add-line"></i> Add Sub-category
                        </button>
                    </div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                        ${subcatsHtml || '<span style="color:var(--text-muted); font-size:12px;">No sub-categories</span>'}
                    </div>
                </div>
            `;
        }
        
        groupDiv.innerHTML = `
            <div class="panel-header">
                <div class="panel-title">${group} Categories</div>
                <button class="btn btn-primary" style="padding:6px 12px; font-size:12px;" onclick="promptAddCategory('${group}')">
                    <i class="ri-add-line"></i> Add New Category
                </button>
            </div>
            <div style="padding-top:16px;">
                ${catsHtml}
            </div>
        `;
        list.appendChild(groupDiv);
    }
    
    document.getElementById("settings-currency-select").value = appState.settings.currency;
    document.getElementById("settings-theme-select").value = appState.settings.theme;
}

function updateSettingsConfig() {
    appState.settings.currency = document.getElementById("settings-currency-select").value;
    appState.settings.theme = document.getElementById("settings-theme-select").value;
    
    document.documentElement.setAttribute("data-theme", appState.settings.theme);
    saveState();
    alert("Settings updated successfully!");
    window.location.hash = "#dashboard";
}

function deleteSubcategorySetting(group, cat, sub) {
    // Check if there are any transactions using this subcategory
    const affected = appState.statements.filter(t => t.subCategory === sub);
    
    const finalizeDeletion = () => {
        appState.categories[group][cat] = appState.categories[group][cat].filter(s => s !== sub);
        saveState();
        loadSettingsPage();
    };

    if (affected.length === 0) {
        if (confirm(`Remove sub-category "${sub}"?`)) {
            finalizeDeletion();
        }
        return;
    }
    
    if (confirm(`Remove sub-category "${sub}"?\nYou have ${affected.length} transactions in this category.\n\nClick OK if you want to migrate these transactions to another category.\nClick Cancel if you want to delete the category but leave the old transactions as-is.`)) {
        // Ask which category to migrate to using prompt, but we'll show a quick list
        let allSubCats = [];
        for (const g in appState.categories) {
            for (const c in appState.categories[g]) {
                appState.categories[g][c].forEach(s => {
                    if (s !== sub) allSubCats.push(s);
                });
            }
        }
        
        const newCat = prompt(`Enter the EXACT name of the new category to migrate ${affected.length} transactions to.\n\nAvailable categories:\n${allSubCats.join(", ")}`);
        
        if (newCat && allSubCats.includes(newCat)) {
            affected.forEach(t => t.subCategory = newCat);
            alert(`Successfully migrated ${affected.length} transactions to "${newCat}".`);
            finalizeDeletion();
        } else if (newCat) {
            alert(`Category "${newCat}" not found. Deletion cancelled.`);
        } else {
            // They clicked cancel on the prompt
            finalizeDeletion(); // Wait, if they click cancel on the prompt, we should probably not delete it, or delete it and keep as is.
            // I'll assume cancel on prompt = keep as is, but still delete category.
            // Actually, let's just finalize deletion without migrating.
            alert("No category selected. Old transactions will remain as-is.");
            finalizeDeletion();
        }
    } else {
        // Keep as is
        if (confirm(`Are you sure you want to delete "${sub}" and leave transactions as-is?`)) {
            finalizeDeletion();
        }
    }
}

function promptAddSubcategory(group, cat) {
    const sub = prompt(`Enter new sub-category name for "${cat}":`);
    if (!sub || !sub.trim()) return;
    
    const trimmed = sub.trim();
    if (appState.categories[group][cat].includes(trimmed)) {
        alert("This sub-category already exists!");
        return;
    }
    
    appState.categories[group][cat].push(trimmed);
    saveState();
    loadSettingsPage();
}

function promptAddCategory(group) {
    const cat = prompt(`Enter name for new category group in "${group}":`);
    if (!cat || !cat.trim()) return;
    
    const trimmed = cat.trim();
    if (appState.categories[group][trimmed]) {
        alert("This category group already exists!");
        return;
    }
    
    appState.categories[group][trimmed] = [];
    saveState();
    loadSettingsPage();
}

// -------------------------------------------------------------
// ADD / QUICK ENTRY MODALS
// -------------------------------------------------------------
let transactionModalCallback = null;

let _editingTransactionId = null;

function openTransactionModal(options = {}) {
    const modal = document.getElementById("transaction-modal");
    const select = document.getElementById("tx-subcategory");
    select.innerHTML = `<option value="">-- Select Category --</option>` + buildCategoryOptgroupOptions('');
    
    document.getElementById("tx-account").value = options.account || "Gowtham";
    document.getElementById("tx-date").value = options.date || new Date().toISOString().slice(0, 10);
    document.getElementById("tx-description").value = options.description || "";
    document.getElementById("tx-subcategory").value = options.subCategory || "";
    document.getElementById("tx-amount").value = options.amount ? formatCurr(Math.abs(options.amount)) : "";
    document.getElementById("tx-type").value = options.type || "Expense";
    
    // Store edit ID if editing
    _editingTransactionId = options.editId || null;
    
    // Update modal title for edit mode
    const titleEl = modal.querySelector(".modal-title");
    if (titleEl) {
        titleEl.textContent = _editingTransactionId ? "Edit Transaction" : "Log New Transaction";
    }
    
    // Set up linked item dropdown listener
    select.onchange = function() {
        updateLinkedItemDropdown(this.value);
    };
    
    // Initialize linked item state
    updateLinkedItemDropdown(options.subCategory || "", options.linkedId || "");
    
    transactionModalCallback = options.onSuccess || null;
    modal.classList.add("active");
}

function updateLinkedItemDropdown(selectedSubCategory, selectedLinkedId = "") {
    const group = document.getElementById("tx-linked-item-group");
    const linkedSelect = document.getElementById("tx-linked-item");
    const label = document.getElementById("tx-linked-item-label");
    
    if (!group || !linkedSelect) return;
    
    const loanSubcats = ["Credit Cards", "Other Loans", "Lent to Others", "Borrow Repayment"];
    const chitSubcats = ["Emergency Fund", "Investments", "Recurring Investments"];
    const emiRelated = selectedSubCategory && (selectedSubCategory.toLowerCase().includes("emi") || selectedSubCategory === "EMI");
    
    let items = [];
    
    if (loanSubcats.includes(selectedSubCategory) && !emiRelated) {
        label.textContent = "Link to Loan/Debt";
        items = (appState.debts || []).map(d => ({
            value: d.id,
            text: `${d.type}: ${d.person} - ${formatCurr(d.amount)} (${d.account})`
        }));
    } else if (emiRelated || selectedSubCategory === "Other Loans") {
        label.textContent = "Link to EMI";
        items = (appState.emis || []).map(e => ({
            value: e.id,
            text: `${e.name} - ${formatCurr(e.amount)}/mo (${e.account})`
        }));
    } else if (chitSubcats.includes(selectedSubCategory)) {
        label.textContent = "Link to Recurring Investment";
        items = (appState.chits || []).map(c => ({
            value: c.id,
            text: `${c.name} - ${formatCurr(c.totalValue)} (${c.members} mos)`
        }));
    }
    
    // Also check credit card subcategory
    if (selectedSubCategory === "Credit Cards") {
        label.textContent = "Link to Credit Card";
        items = (appState.creditCards || []).map(cc => ({
            value: cc.id,
            text: `${cc.name} - Outstanding: ${formatCurr(cc.outstandingAmount)} (${cc.account})`
        }));
    }
    
    if (items.length > 0) {
        linkedSelect.innerHTML = `<option value="">-- Select --</option>`;
        items.forEach(i => {
            const sel = (i.value === selectedLinkedId) ? " selected" : "";
            linkedSelect.innerHTML += `<option value="${i.value}"${sel}>${i.text}</option>`;
        });
        group.classList.remove("hidden");
        group.classList.add("visible");
    } else {
        group.classList.remove("visible");
        group.classList.add("hidden");
        linkedSelect.innerHTML = `<option value="">-- Select --</option>`;
    }
}

function saveTransactionEntry() {
    const account = document.getElementById("tx-account").value;
    const date = document.getElementById("tx-date").value;
    const desc = document.getElementById("tx-description").value.trim();
    const subcat = document.getElementById("tx-subcategory").value;
    const rawAmt = parseAmountStr(document.getElementById("tx-amount").value);
    const type = document.getElementById("tx-type").value;
    
    if (!desc || !date || isNaN(rawAmt) || rawAmt <= 0) {
        alert("Please fill description, date, and amount fields.");
        return;
    }
    
    const amount = type === "Expense" ? -rawAmt : rawAmt;
    
    // If editing, find the old record to check if linkedId changed
    let oldTransaction = null;
    if (_editingTransactionId) {
        oldTransaction = appState.statements.find(t => t.id === _editingTransactionId);
        appState.statements = appState.statements.filter(t => t.id !== _editingTransactionId);
    }
    
    const linkedId = document.getElementById("tx-linked-item")?.value;
    
    appState.statements.unshift({
        id: _editingTransactionId || ("s_" + Date.now()),
        account,
        date,
        description: desc,
        subCategory: subcat,
        amount,
        type,
        linkedId: linkedId || null
    });
    
    appState.statements.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (subcat) appState.descriptionMap[desc] = subcat;
    
    // Process Linked Items
    const oldLinkedId = oldTransaction ? oldTransaction.linkedId : null;
    
    // 1. Revert the old link if it changed or was removed
    if (oldLinkedId && oldLinkedId !== linkedId) {
        if (oldLinkedId.startsWith("emi_")) {
            const emi = appState.emis.find(e => e.id === oldLinkedId);
            if (emi) emi.remainingMonths = Math.min(emi.tenureMonths, emi.remainingMonths + 1);
        } else if (oldLinkedId.startsWith("chit_")) {
            const chit = appState.chits.find(c => c.id === oldLinkedId);
            if (chit && chit.bids.length > 0) chit.bids.pop();
        }
    }
    
    // 2. Apply the new link if it's newly added or changed
    if (linkedId && linkedId !== oldLinkedId) {
        if (linkedId.startsWith("debt_")) {
            const debt = appState.debts.find(d => d.id === linkedId);
            if (debt) {
                debt.repayments.push({ id: "rep_" + Date.now(), date, account, amount: rawAmt });
            }
        } else if (linkedId.startsWith("emi_")) {
            const emi = appState.emis.find(e => e.id === linkedId);
            if (emi) {
                emi.remainingMonths = Math.max(0, emi.remainingMonths - 1);
            }
        } else if (linkedId.startsWith("chit_")) {
            const chit = appState.chits.find(c => c.id === linkedId);
            if (chit) {
                const nextBid = chit.bids.length + 1;
                chit.bids.push({ bidNum: nextBid, bidAmount: chit.totalValue });
                chit.bids.sort((a,b) => a.bidNum - b.bidNum);
            }
        }
    }
    
    _editingTransactionId = null;
    saveState();
    closeAllModals();
    
    if (transactionModalCallback) {
        transactionModalCallback();
        transactionModalCallback = null;
    } else {
        handleHashRouter();
    }
}

function openDebtModal(type) {
    document.getElementById("debt-add-type").value = type;
    document.getElementById("debt-add-title").textContent = type === "Lent" ? "Add Money Lent To Someone" : "Add Money Borrowed From Someone";
    document.getElementById("debt-add-date").value = new Date().toISOString().slice(0, 10);
    document.getElementById("debt-add-person").value = "";
    document.getElementById("debt-add-amount").value = "";
    document.getElementById("debt-add-remarks").value = "";
    
    document.getElementById("debt-add-modal").classList.add("active");
}

function saveDebtEntry() {
    const type = document.getElementById("debt-add-type").value;
    const account = document.getElementById("debt-add-account").value;
    const date = document.getElementById("debt-add-date").value;
    const person = document.getElementById("debt-add-person").value.trim();
    const amount = parseAmountStr(document.getElementById("debt-add-amount").value);
    const remarks = document.getElementById("debt-add-remarks").value.trim();
    
    if (!person || !date || isNaN(amount) || amount <= 0) {
        alert("Please fill out all fields.");
        return;
    }
    
    const tag = type === "Lent" ? "Lent to Others" : "Borrowed From";
    
    appState.debts.unshift({
        id: "d_" + Date.now(),
        type,
        account,
        date,
        person,
        categoryTag: tag,
        amount,
        remarks,
        repayments: []
    });
    
    appState.statements.unshift({
        id: "s_debt_" + Date.now(),
        account,
        date,
        description: type === "Lent" ? `Lent to ${person}: ${remarks}` : `Borrowed from ${person}: ${remarks}`,
        subCategory: tag,
        amount: type === "Lent" ? -amount : amount,
        type: type === "Lent" ? "Expense" : "Income"
    });
    
    saveState();
    closeAllModals();
    loadDebtsPage();
}

function openChitAddModal() {
    document.getElementById("chit-add-date").value = new Date().toISOString().slice(0, 10);
    document.getElementById("chit-add-name").value = "";
    document.getElementById("chit-add-value").value = "200000";
    document.getElementById("chit-add-members").value = "10";
    document.getElementById("chit-add-freq").value = "3";
    document.getElementById("chit-add-taken").value = "5";
    
    document.getElementById("chit-add-modal").classList.add("active");
}

function saveChitEntry() {
    const name = document.getElementById("chit-add-name").value.trim();
    const date = document.getElementById("chit-add-date").value;
    const value = parseAmountStr(document.getElementById("chit-add-value").value);
    const members = parseInt(document.getElementById("chit-add-members").value);
    const freq = parseInt(document.getElementById("chit-add-freq").value);
    const taken = parseInt(document.getElementById("chit-add-taken").value);
    
    if (!name || !date || isNaN(value) || isNaN(members) || isNaN(freq) || isNaN(taken)) {
        alert("Please fill all inputs.");
        return;
    }
    
    appState.chits.push({
        id: "ch_" + Date.now(),
        name,
        totalValue: value,
        members,
        freqMonths: freq,
        takenBidNum: taken,
        startDate: date,
        bids: []
    });
    
    saveState();
    closeAllModals();
    loadChitsPage();
}

function openEMIAddModal() {
    document.getElementById("emi-add-date").value = new Date().toISOString().slice(0, 10);
    document.getElementById("emi-add-name").value = "";
    document.getElementById("emi-add-bank").value = "";
    document.getElementById("emi-add-amount").value = "";
    document.getElementById("emi-add-rate").value = "";
    document.getElementById("emi-add-tenure").value = "";
    
    document.getElementById("emi-add-modal").classList.add("active");
}

function saveEMIEntry() {
    const name = document.getElementById("emi-add-name").value.trim();
    const account = document.getElementById("emi-add-account").value;
    const bank = document.getElementById("emi-add-bank").value.trim();
    const amount = parseAmountStr(document.getElementById("emi-add-amount").value);
    const rate = parseAmountStr(document.getElementById("emi-add-rate").value);
    const tenure = parseInt(document.getElementById("emi-add-tenure").value);
    const date = document.getElementById("emi-add-date").value;
    
    if (!name || !bank || !date || isNaN(amount) || isNaN(rate) || isNaN(tenure)) {
        alert("Please fill all input fields.");
        return;
    }
    
    appState.emis.push({
        id: "emi_" + Date.now(),
        name,
        account,
        bank,
        amount,
        interestRate: rate,
        tenureMonths: tenure,
        startDate: date,
        remainingMonths: tenure
    });
    
    saveState();
    closeAllModals();
    loadEMIsPage();
}

function openCCAddModal() {
    document.getElementById("cc-add-name").value = "";
    document.getElementById("cc-add-limit").value = "";
    document.getElementById("cc-add-stmt").value = "15";
    document.getElementById("cc-add-due").value = "5";
    document.getElementById("cc-add-outstanding").value = "0";
    
    document.getElementById("cc-add-modal").classList.add("active");
}

function saveCCEntry() {
    const name = document.getElementById("cc-add-name").value.trim();
    const account = document.getElementById("cc-add-account").value;
    const limit = parseAmountStr(document.getElementById("cc-add-limit").value);
    const stmt = parseInt(document.getElementById("cc-add-stmt").value);
    const due = parseInt(document.getElementById("cc-add-due").value);
    const outstanding = parseAmountStr(document.getElementById("cc-add-outstanding").value);
    
    if (!name || isNaN(limit) || isNaN(stmt) || isNaN(due) || isNaN(outstanding)) {
        alert("Please fill all input fields.");
        return;
    }
    
    appState.creditCards.push({
        id: "cc_" + Date.now(),
        name,
        account,
        limit,
        statementDate: stmt,
        dueDate: due,
        outstandingAmount: outstanding
    });
    
    saveState();
    closeAllModals();
    loadDashboardPage();
}

function triggerBackupRestore(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    restoreBackupFile(file, (success, errorMsg) => {
        if (success) {
            alert("Database backup successfully restored!");
            window.location.reload();
        } else {
            alert("Failed to restore backup: " + errorMsg);
        }
        e.target.value = "";
    });
}

function eraseAllData() {
    if (confirm("WARNING: Are you absolutely sure you want to completely erase all data? This cannot be undone unless you have downloaded a backup first!")) {
        localStorage.removeItem("family_finance_state_v3");
        window.location.reload();
    }
}

function closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
}

window.addEventListener("DOMContentLoaded", () => {
    initAppState();
    
    document.documentElement.setAttribute("data-theme", appState.settings.theme);
    const themeBtn = document.querySelector(".theme-toggle i");
    if (themeBtn) {
        themeBtn.className = appState.settings.theme === "dark" ? "ri-sun-line" : "ri-moon-line";
    }
    
    // Restore sidebar collapse state
    if (appState.settings.sidebarCollapsed) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.add('collapsed');
    }
    
    // Set Dashboard to current month by default on first load
    const today = new Date();
    const currentYearStr = today.getFullYear().toString();
    const yearSelect = document.getElementById("dash-filter-year");
    let hasYear = false;
    for (let i = 0; i < yearSelect.options.length; i++) {
        if (yearSelect.options[i].value === currentYearStr) hasYear = true;
    }
    if (!hasYear) {
        const opt = document.createElement("option");
        opt.value = currentYearStr;
        opt.textContent = currentYearStr;
        yearSelect.appendChild(opt);
    }
    yearSelect.value = currentYearStr;
    document.getElementById("dash-filter-month").value = (today.getMonth() + 1).toString().padStart(2, '0');
    
    window.addEventListener("hashchange", handleHashRouter);
    handleHashRouter();
});


