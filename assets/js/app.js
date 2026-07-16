// App State Management and Business Logic
let appState = null;
let charts = {}; // Store Chart.js instances

const PROTECTED_CATEGORIES = [
    "Self Transfer", "Previous Balance", "Borrow Repayment", 
    "EMI", "Credit Card Bill", "Lent to Others", 
    "Borrowed From", "Lent Repayment", "Salary",
    "Emergency Fund", "Investments", "Recurring Investments", "Chit Fund"
];

// Initial Database State with Extracted Placeholder Data
const DEMO_DATA = {
    accounts: ["Gowtham", "Renuka"],
    categories: {"Expense":{"Entertainment":["Activities","Media/Cinema","Sports","Gadgets","Vacation/Travel"],"Miscellaneous":["Other"],"Home Expenses":["Mortgage/Rent","Electricity","Water","Home Supplies"],"Transfer (Out)":["Lent to Others","Borrow Repayment"],"Bills/Subscriptions":["OTT\u0027s","Memberships","Mobile/Wifi"],"Daily Living":["Groceries","Personal Supplies","Clothing","Eating Out","Grooming"],"Health":["Hospital","Medicine/Drugs"],"Charity/Gifts":["Gifts Given","Donations"],"Transportation":["Fuel","Bus/Taxi/Train Fare","Repairs/Maintenance"],"Obligations":["To Home_G","To Home_R","Credit Cards","Other Loans"]},"Income":{"Carryforward":["Previous Balance"],"Variable":["Other Income"],"Transfer (In)":["Lent Repayment","Borrowed From"],"Fixed":["Salary_G","Salary_R"]},"Savings":{"Savings":["Emergency Fund","Investments"]}},
    statements: [],
    debts: [],
    trades: [],
    descriptionMap: {"29-May-26":"IRCTC Wallet","08-Apr-26":"From Accenture","14-Feb-26":"Parker Pen","26-Feb-26":"Ghee, Paneer","13-May-26":"Eating Out","21-Nov-25":"Dinner @Shanthi Nagar","02-Apr-26":"From Ilanjiyam","29-Nov-25":"Pizza","23-Apr-26":"Bus","23-Dec-25":"Tea","04-Apr-26":"Chilli Chicken","29-Dec-25":"Curd","13-Mar-26":"Chicken","07-Dec-25":"Puliyur Ticket","05-Mar-26":"Internet Bill claim","14-Apr-26":"Marriage Reg. for Vasanth","01-Mar-26":"Juice","12-Dec-25":"Petrol","26-Apr-26":"Redbus to BG","18-Dec-25":"Grocerries","09-Mar-26":"Research 360","26-Nov-25":"Cone","18-Apr-26":"You tube Movie","17-Dec-25":"KFC","10-Dec-25":"Water Bill","17-Jan-26":"Fish","27-Dec-25":"Market, Yelahanka","17-May-26":"Tea","21-Apr-26":"Grocerries","23-Nov-25":"Aadhar Registration","08-Feb-26":"Puliyur EB Bill","05-Feb-26":"Bakery","16-Apr-26":"Swiggy Instamart","08-Jan-26":"Zepto-Weight Machine","07-Feb-26":"Dairy Milk","09-Feb-26":"To Home","09-Apr-26":"Milk","16-Mar-26":"Paani Poori","14-Jan-26":"Tea","06-May-26":"THE BIG MARKET","01-May-26":"Thangamayil","24-Dec-25":"Arav Farm","01-Jun-26":"Thangamayil","22-Dec-25":"Biriyani","21-Dec-25":"IRCTC Turicorin to BG","21-May-26":"BMTC","14-May-26":"Milk","25-Feb-26":"Chicken Roll","27-Mar-26":"Bus to Salem","19-Mar-26":"Curd","13-Dec-25":"Flower","14-Nov-25":"Grocerries-Untill 14-Nov","06-Jan-26":"Milk","19-Dec-25":"Grocerries","31-Dec-25":"Tea","15-Mar-26":"RKM Bus","25-Jan-26":"Perambalur Shopping","18-Jan-26":"Fruits Marapannor","22-May-26":"Chicken","28-Apr-26":"Shawarma","25-Dec-25":"Onion","09-Dec-25":"Annual Maintenance Fee","22-Nov-25":"Medicals","20-Mar-26":"Milk","12-May-26":"Number Plate","03-Mar-26":"Electricity","24-Jan-26":"Tea Snacks","03-Apr-26":"To Vaibhav","21-Jan-26":"SCAM","08-Dec-25":"Zepto","05-Apr-26":"Threading","10-Apr-26":"Zudio","15-Apr-26":"Popeyes","10-Jan-26":"Home Rent","28-Mar-26":"Fruits \u0026 Fuel, Goodalur","06-Apr-26":"Selvarani Current bill","27-Apr-26":"Thangamayil","28-Jan-26":"Zepto","24-May-26":"Bike Repair","11-Mar-26":"Parking @ marudhamalai","24-Mar-26":"Eating Out","13-Feb-26":"Kaviraj Marriage Train tickets","09-Nov-25":"Snacks","24-Apr-26":"Chicken Rice","13-Nov-25":"KPN Fresh","07-Apr-26":"Gift to Gowtham","05-Jan-26":"Cold tablet","02-Feb-26":"Electricity","17-Apr-26":"Snacks","12-Jan-26":"Paani Poori","03-May-26":"Perambalur Shopping","19-Jan-26":"Milk","03-Nov-25":"DINOY GE","16-May-26":"Swiggy Instamart","21-Feb-26":"Auto to SMVT","06-Mar-26":"KFC","03-Jan-26":"Tea","02-Mar-26":"Thangamayil","14-Dec-25":"Thangamayil - Diamond Bracelet","17-Mar-26":"Milk \u0026 Snacks","16-Nov-25":"Tea","23-May-26":"Tea","30-Dec-25":"Dress Alteration","13-Jan-26":"Ajio, Jacket","25-Mar-26":"Parotta","20-May-26":"Milk","19-Feb-26":"Sherif Bhai Biriyani-Zomato","19-May-26":"Capacitor","10-Feb-26":"Jimiki","16-Jan-26":"Murugan Stores","27-Jan-26":"Paani Poori","15-Feb-26":"Milk","23-Mar-26":"Bus to Perambalur","12-Apr-26":"Milk \u0026 Curd","12-Mar-26":"Milk","24-Nov-25":"Vela Bakery","15-Dec-25":"From Selvarani","26-Dec-25":"Tomato","22-Feb-26":"Local Bus","04-May-26":"Redbus Perambalur to BG","30-Nov-25":"Zepto-Rice","20-Jan-26":"Chicken","26-Jan-26":"Domino\u0027s","02-May-26":"From Elanjiyam","07-Mar-26":"Selvarani EMI","17-Feb-26":"Ointment for Neck","30-Apr-26":"Skate Shoes","29-Mar-26":"Flower","16-Dec-25":"Cab, Santhi Nagar to Home","22-Apr-26":"Cab","02-Nov-25":"SANTHIYA M","28-Dec-25":"Ithihaas","07-May-26":"Milk \u0026 Snacks","01-Dec-25":"Thalasery Hotel","02-Dec-25":"KPN Fresh","20-Apr-26":"Grocerries","05-Nov-25":"CHRG-ATM TXN DECLINE FEE","20-Feb-26":"Zepto - Cake","13-Apr-26":"Water Wash","08-Nov-25":"Sagar Dress","19-Apr-26":"Dress","09-Jan-26":"Wifi-Selvarani","23-Feb-26":"Cab from Majestic to Home","25-Nov-25":"Oil, KPN","11-Feb-26":"To Renu Thatha","11-Nov-25":"SETC","15-Jan-26":"EB Bill","11-Apr-26":"Muskan Fashion","29-Apr-26":"Thangamayil","05-May-26":"Airtel Wifi","01-Nov-25":"Selvarani","18-Nov-25":"Gocerries","17-Nov-25":"Zepto","01-Jan-26":"Chicken","07-Jan-26":"IRCTC Turicorin to BG-Cancelled","22-Mar-26":"Zepto","01-Apr-26":"To Savings Box","25-May-26":"Milk","11-Jan-26":"Mall Parking","21-Mar-26":"Zepto","31-Mar-26":"Thangamayil","09-May-26":"PVR INOX","10-Mar-26":"Juice","03-Dec-25":"Arav Farm","26-May-26":"EB Bill Parimala","15-May-26":"Speedometer Repair","27-Nov-25":"Thangamayil","04-Jan-26":"Malabar Foods","01-Feb-26":"Allowances","28-Nov-25":"Ajio","04-Nov-25":"Parimala Jio","18-Mar-26":"Milk \u0026 Snacks","12-Nov-25":"Monitor Cable","05-Dec-25":"Netflix","28-May-26":"Swiggy","04-Mar-26":"Zepto","06-Nov-25":"RAMACHAN","18-May-26":"Milk/Curd","14-Mar-26":"Bus Ticket","02-Jan-26":"Fruits","08-Mar-26":"Chicken","16-Feb-26":"Zepto-Potato, Milk","20-Dec-25":"Prawn","23-Jan-26":"Tea Snacks","29-Jan-26":"Dinner","18-Feb-26":"Chilli Chicken","03-Feb-26":"Zip Tag","10-May-26":"THE BIG MARKET"},
    budgets: {"Investments":12000,"Lent Repayment":8000,"Salary_R":48500,"OTT\u0027s":299,"Electricity":800,"To Home_G":5000,"Home Supplies":1000,"Credit Cards":5000,"Groceries":6000,"Water":250,"Clothing":2000,"Repairs/Maintenance":200,"Gifts Given":2760,"Mortgage/Rent":16250,"Fuel":600,"Media/Cinema":1000,"Mobile/Wifi":2000,"Borrowed From":10000,"Borrow Repayment":6875,"Salary_G":56200,"Eating Out":4000,"Grooming":300,"Medicine/Drugs":329,"Personal Supplies":1000,"To Home_R":4621,"Hospital":2000,"Activities":4500,"Bus/Taxi/Train Fare":2000,"Memberships":602},
    settings: {
        currency: "₹"
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
    if (!appState.monthlyBudgets) {
        appState.monthlyBudgets = {};
        // Migrate existing global budgets to current month to preserve data
        const currentYYYYMM = new Date().toISOString().slice(0, 7);
        if (Object.keys(appState.budgets).length > 0) {
            appState.monthlyBudgets[currentYYYYMM] = { ...appState.budgets };
        }
    }
    if (!appState.creditCards) appState.creditCards = [];
    if (!appState.emis) appState.emis = [];
    if (!appState.chits) appState.chits = [];
    if (!appState.debts) appState.debts = [];
    if (!appState.trades) appState.trades = [];
    if (!appState.descriptionMap) appState.descriptionMap = {};
    if (!appState.statements) appState.statements = [];
    if (!appState.categories) appState.categories = DEMO_DATA.categories;
    if (!appState.settings) appState.settings = DEMO_DATA.settings;
    if (!appState.settings.savingsTarget) appState.settings.savingsTarget = 30000;
    if (!appState.settings.deactivatedCategories) appState.settings.deactivatedCategories = [];
    if (!appState.accounts || appState.accounts.length === 0) appState.accounts = ["Main Account"];
    
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
        
        if (appState.categories && appState.categories.Investments && appState.categories.Investments.Fixed) {
            if (!appState.categories.Investments.Fixed.includes("Chit Fund")) {
                appState.categories.Investments.Fixed.push("Chit Fund");
            }
        }
        
        // Salary Merge Migration
        if (appState.categories && appState.categories.Income && appState.categories.Income.Fixed) {
            let fixed = appState.categories.Income.Fixed;
            if (fixed.includes("Salary_G") || fixed.includes("Salary_R")) {
                appState.categories.Income.Fixed = fixed.filter(c => c !== "Salary_G" && c !== "Salary_R");
                if (!appState.categories.Income.Fixed.includes("Salary")) {
                    appState.categories.Income.Fixed.push("Salary");
                }
                
                // Update historical transactions
                let migrated = false;
                appState.statements.forEach(t => {
                    if (t.subCategory === "Salary_G" || t.subCategory === "Salary_R") {
                        t.subCategory = "Salary";
                        migrated = true;
                    }
                });
                if (migrated) saveState();
            }
        }
    } catch (e) {
        console.error("Could not inject auto-categories or run migrations", e);
    }
    
    populateAccountFilters();
    
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
    
    // Check for remote updates silently
    silentGithubPull();
}

async function silentGithubPull() {
    if (!appState || !appState.githubSync || !appState.githubSync.token) return;
    const { username, repo, token, path, lastSha } = appState.githubSync;
    
    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            headers: { "Authorization": `token ${token}` }
        });
        if (res.ok) {
            const data = await res.json();
            githubFileSha = data.sha;
            
            // If the SHA on GitHub is different from our last known SHA, an update happened elsewhere
            // If the SHA on GitHub is different from our last known SHA, or if we have no lastSha (first time on this device), an update happened elsewhere
            if (!lastSha || lastSha !== data.sha) {
                console.log("Remote changes detected or first-time sync! Syncing...");
                const cleanContent = data.content.replace(/\n/g, '');
                const decoded = decodeURIComponent(escape(atob(cleanContent)));
                const remoteState = JSON.parse(decoded);
                
                const localToken = appState.githubSync.token;
                appState = remoteState;
                if(!appState.githubSync) appState.githubSync = {};
                appState.githubSync.token = localToken;
                appState.githubSync.lastSha = data.sha;
                
                localStorage.setItem("family_finance_state_v3", JSON.stringify(appState));
                // Reload to reflect new data
                location.reload();
            }
        }
    } catch (e) {
        console.warn("Silent sync failed", e);
    }
}

function populateAccountFilters() {
    const dashSelect = document.getElementById("dash-filter-account");
    const expSelect = document.getElementById("exp-filter-account");
    const balances = typeof getAccountBalances === "function" ? getAccountBalances() : {};
    
    const populateFilter = (select) => {
        if (!select) return;
        const curVal = select.value;
        select.innerHTML = '<option value="All">All Accounts</option>';
        
        // Regular Accounts
        const accGroup = document.createElement("optgroup");
        accGroup.label = "Bank / Cash";
        appState.accounts.forEach(acc => {
            const bal = balances[acc] || 0;
            const sign = bal < 0 ? "-" : "";
            const opt = document.createElement("option");
            opt.value = acc; 
            opt.textContent = `${acc} (${sign}₹${formatCurr(Math.abs(bal))})`;
            accGroup.appendChild(opt);
        });
        select.appendChild(accGroup);
        
        // Credit Cards
        if (appState.creditCards && appState.creditCards.length > 0) {
            const ccGroup = document.createElement("optgroup");
            ccGroup.label = "Credit Cards";
            appState.creditCards.forEach(cc => {
                const bal = balances[cc.name] || 0;
                const sign = bal < 0 ? "-" : "";
                const opt = document.createElement("option");
                opt.value = cc.name; 
                opt.textContent = `${cc.name} (${sign}₹${formatCurr(Math.abs(bal))})`;
                ccGroup.appendChild(opt);
            });
            select.appendChild(ccGroup);
        }
        
        if (curVal) select.value = curVal;
    };
    
    populateFilter(dashSelect);
    populateFilter(expSelect);
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
    
    // GitHub Sync state
    if (!appState.githubSync) appState.githubSync = { username: "", repo: "", token: "", path: "appState.json" };
    
    localStorage.setItem("family_finance_state_v3", JSON.stringify(appState));
    
    // Auto-sync to GitHub if configured
    if (appState.githubSync && appState.githubSync.token && appState.githubSync.username && appState.githubSync.repo) {
        pushToGithub();
    }
}

// ==========================================
// GITHUB API SYNC LOGIC
// ==========================================
let isSyncing = false;
let githubFileSha = null;

async function pushToGithub() {
    if (isSyncing) return;
    const { username, repo, token, path } = appState.githubSync;
    
    try {
        isSyncing = true;
        // 1. Get current SHA
        let sha = githubFileSha;
        if (!sha) {
            const getRes = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
                headers: { "Authorization": `token ${token}` }
            });
            if (getRes.ok) {
                const data = await getRes.json();
                sha = data.sha;
            }
        }
        
        // 2. Prepare payload
        // Create a copy without the token to avoid storing the token in the github repo file itself
        const safeState = JSON.parse(JSON.stringify(appState));
        safeState.githubSync.token = ""; 
        
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(safeState))));
        const body = {
            message: `Auto-sync: ${new Date().toISOString()}`,
            content: content
        };
        if (sha) body.sha = sha;
        
        // 3. Put to Github
        const putRes = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            method: "PUT",
            headers: { 
                "Authorization": `token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        
        if (putRes.ok) {
            const putData = await putRes.json();
            githubFileSha = putData.content.sha;
            appState.githubSync.lastSha = putData.content.sha;
            localStorage.setItem("family_finance_state_v3", JSON.stringify(appState));
            console.log("GitHub Sync Successful");
        }
    } catch (e) {
        console.error("GitHub Sync Failed", e);
    } finally {
        isSyncing = false;
    }
}

async function forceGithubSync() {
    const btn = document.getElementById("btn-force-sync");
    const msg = document.getElementById("sync-status-msg");
    const { username, repo, token, path } = appState.githubSync;
    
    if (!token) {
        msg.innerHTML = '<span style="color:var(--danger)">Please configure and save settings first.</span>';
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Syncing...';
    msg.innerHTML = '';
    
    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            headers: { "Authorization": `token ${token}` }
        });
        
        if (res.status === 404) {
            // File doesn't exist yet, push current local state
            await pushToGithub();
            msg.innerHTML = '<span style="color:var(--success)">Created new file on GitHub!</span>';
        } else if (res.ok) {
            // Pull existing data
            const data = await res.json();
            githubFileSha = data.sha;
            
            const cleanContent = data.content.replace(/\n/g, '');
            const decoded = decodeURIComponent(escape(atob(cleanContent)));
            const remoteState = JSON.parse(decoded);
            
            // Restore local token before replacing appState
            const localToken = appState.githubSync.token;
            appState = remoteState;
            if(!appState.githubSync) appState.githubSync = {};
            appState.githubSync.token = localToken;
            appState.githubSync.lastSha = data.sha;
            
            localStorage.setItem("family_finance_state_v3", JSON.stringify(appState));
            msg.innerHTML = '<span style="color:var(--success)">Data successfully pulled from GitHub! Reloading...</span>';
            setTimeout(() => location.reload(), 1500);
        } else {
            throw new Error(`API returned ${res.status}`);
        }
    } catch (e) {
        msg.innerHTML = `<span style="color:var(--danger)">Sync failed: ${e.message}. Check console.</span>`;
        console.error(e);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="ri-refresh-line"></i> Sync Now';
    }
}

function saveGithubSyncSettings() {
    appState.githubSync.username = document.getElementById("github-username").value.trim();
    appState.githubSync.repo = document.getElementById("github-repo").value.trim();
    const t = document.getElementById("github-token").value.trim();
    if (t) appState.githubSync.token = t;
    appState.githubSync.path = document.getElementById("github-path").value.trim() || "appState.json";
    
    saveState();
    document.getElementById("sync-status-msg").innerHTML = '<span style="color:var(--success)">Configuration saved to local browser!</span>';
    document.getElementById("btn-force-sync").style.display = "inline-flex";
}

async function verifyGithubConnection() {
    const btn = document.getElementById("btn-verify-sync");
    const msg = document.getElementById("sync-status-msg");
    const { username, repo, token, path } = appState.githubSync;
    
    if (!token || !username || !repo) {
        msg.innerHTML = '<span style="color:var(--danger)">Please fill all fields and save first.</span>';
        return;
    }
    
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Verifying...';
    msg.innerHTML = '';
    
    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
            headers: { "Authorization": `token ${token}` }
        });
        
        if (res.ok) {
            msg.innerHTML = '<span style="color:var(--success)"><i class="ri-shield-check-fill"></i> Verified! Connection is working perfectly!</span>';
        } else if (res.status === 401) {
            msg.innerHTML = '<span style="color:var(--danger)"><i class="ri-error-warning-fill"></i> Invalid Token or Token Expired!</span>';
        } else if (res.status === 404) {
            msg.innerHTML = '<span style="color:var(--danger)"><i class="ri-error-warning-fill"></i> Repository not found! Check username and repo name.</span>';
        } else {
            msg.innerHTML = `<span style="color:var(--danger)"><i class="ri-error-warning-fill"></i> API Error: ${res.status}</span>`;
        }
    } catch (e) {
        msg.innerHTML = `<span style="color:var(--danger)"><i class="ri-error-warning-fill"></i> Network Error: ${e.message}</span>`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="ri-check-double-line"></i> Verify Connection';
    }
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

// (Event listener for mobile sidebar removed - logic moved to handleHashRouter)

// Switch themes
function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    let next = "dark";
    if (current === "dark") next = "light";
    else if (current === "light") next = "fresh";
    
    document.documentElement.setAttribute("data-theme", next);
    appState.settings.theme = next;
    saveState();
    
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
    
    // Find all statements linked to this round
    const stmts = appState.statements.filter(s => s.linkedId === chit.id && s.linkedRound === bidNum);
    
    let userPayment = installment;
    let discount = 0;
    let userReceived = 0;
    let hasPayment = false;
    
    let paymentDate = null;
    
    stmts.forEach(s => {
        if (s.type === "Savings" || s.type === "Expense") { // Payment
            userPayment = Math.abs(s.amount);
            discount = installment - userPayment;
            hasPayment = true;
            paymentDate = s.date;
        } else if (s.type === "Income") { // Payout received
            userReceived += Math.abs(s.amount);
        }
    });
    
    if (!hasPayment) {
        userPayment = installment; // Fallback to full installment
        discount = 0;
    }
    
    const chitStart = new Date(chit.startDate);
    chitStart.setMonth(chitStart.getMonth() + (bidNum - 1) * chit.freqMonths);
    const scheduledDate = chitStart.toISOString().slice(0, 10);
    
    return {
        installment,
        discount,
        userPayment,
        userReceived,
        hasPayment,
        isPaid: hasPayment || userReceived > 0,
        paymentDate,
        scheduledDate
    };
}

function getChitCalculations(chit) {
    let totalPaid = 0;
    let totalReceived = 0;
    const calculatedRounds = [];
    
    for (let r = 1; r <= chit.members; r++) {
        const bid = chit.bids.find(b => b.bidNum === r) || { bidNum: r, bidAmount: chit.totalValue };
        const calc = calculateChitRound(chit, r, bid.bidAmount);
        if (calc.hasPayment) {
            totalPaid += calc.userPayment;
        }
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
                borrowRepaid: 0,
                accountsLentFrom: new Set(),
                accountsBorrowedBy: new Set()
            };
        }
        
        const repaid = debt.repayments.reduce((sum, r) => sum + r.amount, 0);
        if (debt.type === "Lent") {
            contacts[name].lentAmount += debt.amount;
            contacts[name].lentRepaid += repaid;
            if (debt.amount - repaid > 0) contacts[name].accountsLentFrom.add(debt.account || 'Us');
        } else {
            contacts[name].borrowAmount += debt.amount;
            contacts[name].borrowRepaid += repaid;
            if (debt.amount - repaid > 0) contacts[name].accountsBorrowedBy.add(debt.account || 'Us');
        }
    });
    
    // Calculate net positions
    return Object.values(contacts).map(c => {
        const outstandingOwedToUs = c.lentAmount - c.lentRepaid;
        const outstandingWeOwe = c.borrowAmount - c.borrowRepaid;
        return {
            ...c,
            accountsLentFromArr: Array.from(c.accountsLentFrom),
            accountsBorrowedByArr: Array.from(c.accountsBorrowedBy),
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
        } else if (type === "tradebook") {
            const sheet = workbook.Sheets["Equity"];
            if (!sheet) {
                alert("Sheet 'Equity' not found in Tradebook Excel file.");
                return;
            }
            
            const rawJson = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            let headerRowIndex = -1;
            for (let r = 0; r < rawJson.length; r++) {
                if (rawJson[r].includes("Symbol") && rawJson[r].includes("Trade Date")) {
                    headerRowIndex = r;
                    break;
                }
            }
            
            if (headerRowIndex === -1) {
                alert("Tradebook headers not found.");
                return;
            }
            
            const headers = rawJson[headerRowIndex];
            const colIdx = {
                symbol: headers.indexOf("Symbol"),
                date: headers.indexOf("Trade Date"),
                type: headers.indexOf("Trade Type"),
                qty: headers.indexOf("Quantity"),
                price: headers.indexOf("Price")
            };
            
            let addedCount = 0;
            let dupCount = 0;
            for (let r = headerRowIndex + 1; r < rawJson.length; r++) {
                const row = rawJson[r];
                if (!row || row.length === 0 || !row[colIdx.symbol]) continue;
                
                let rawDate = row[colIdx.date].toString().trim();
                let qty = parseFloat(row[colIdx.qty]);
                let price = parseFloat(row[colIdx.price]);
                let tType = row[colIdx.type].toString().trim().toLowerCase();
                let symbol = row[colIdx.symbol].toString().trim();
                
                if (isNaN(qty) || isNaN(price)) continue;
                
                const exec = {
                    id: "tr_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
                    symbol: symbol,
                    date: rawDate,
                    type: tType,
                    quantity: qty,
                    price: price
                };
                
                // Duplicate check
                const isDup = appState.trades.some(t => t.symbol === exec.symbol && t.date === exec.date && t.type === exec.type && t.quantity === exec.quantity && t.price === exec.price);
                
                if (!isDup) {
                    appState.trades.push(exec);
                    addedCount++;
                } else {
                    dupCount++;
                }
            }
            
            saveState();
            alert(`Imported ${addedCount} new executions. Skipped ${dupCount} duplicates.`);
            loadTradingPage();
            window.location.hash = "#trading";
            return;
        }
        
        let deduplicatedRows = [];
        let skippedDups = 0;
        
        importedRows.forEach(row => {
            const isDup = appState.statements.some(s => 
                s.date === row.date && 
                s.amount === row.amount && 
                s.description === row.description
            );
            if (!isDup) {
                deduplicatedRows.push(row);
            } else {
                skippedDups++;
            }
        });
        
        if (skippedDups > 0) {
            alert(`Skipped ${skippedDups} duplicate statements that were already imported.`);
        }
        
        deduplicatedRows.forEach(row => {
            const memorySubCat = appState.descriptionMap[row.description];
            if (memorySubCat) {
                row.subCategory = memorySubCat;
            } else if (row.tagCategory) {
                const matched = findSubcategoryMatch(row.tagCategory);
                if (matched) row.subCategory = matched;
            }
        });
        
        excelStagingTransactions = deduplicatedRows;
        onLoadCallback(deduplicatedRows);
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
function buildCategoryOptgroupOptions(selectedValue, filterType = null) {
    let html = '';
    const groups = Object.keys(appState.categories).sort();
    groups.forEach(group => {
        if (filterType && filterType !== "Transfer" && group !== filterType) return;
        const cats = Object.keys(appState.categories[group]).sort();
        cats.forEach(cat => {
            html += `<optgroup label="${cat}">`;
            const subs = [...appState.categories[group][cat]].sort();
            subs.forEach(sub => {
                const isDeactivated = appState.settings.deactivatedCategories && appState.settings.deactivatedCategories.includes(sub);
                const isSelected = (sub === selectedValue);
                if (isDeactivated && !isSelected) return; // Hide deactivated unless it's currently selected
                
                const sel = isSelected ? ' selected' : '';
                html += `<option value="${sub}"${sel}>${sub}</option>`;
            });
            html += `</optgroup>`;
        });
    });
    
    if (filterType === "Income") {
        html += `<optgroup label="Investments (Payouts)">`;
        const sel = ("Recurring Investments" === selectedValue) ? ' selected' : '';
        html += `<option value="Recurring Investments"${sel}>Recurring Investments</option>`;
        html += `</optgroup>`;
    }
    
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
    const now = new Date();
    const dateStr = now.getFullYear() + "-" + 
                   String(now.getMonth() + 1).padStart(2, '0') + "-" + 
                   String(now.getDate()).padStart(2, '0') + "_" + 
                   String(now.getHours()).padStart(2, '0') + "-" + 
                   String(now.getMinutes()).padStart(2, '0') + "-" + 
                   String(now.getSeconds()).padStart(2, '0');
    dlAnchorElem.setAttribute("download", `family_finance_backup_${dateStr}.json`);
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
    document.body.style.overflow = ''; // Failsafe to unlock scrolling
    
    document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".mobile-bottom-nav .nav-item").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    
    const targetLink = document.querySelector(`.menu-item a[href="${hash}"]`);
    if (targetLink) {
        targetLink.parentElement.classList.add("active");
    }
    
    // Also highlight bottom nav if it exists
    const bottomNavMap = {
        "#dashboard": "#dashboard",
        "#expenses": "#expenses",
        "#budget": "#budget"
    };
    // Map everything else to settings/more
    const bottomNavTarget = bottomNavMap[hash] || "#settings";
    const targetBottomLink = document.querySelector(`.mobile-bottom-nav .nav-item[href="${bottomNavTarget}"]`);
    if (targetBottomLink) {
        targetBottomLink.classList.add("active");
    }
    
    const targetTab = document.querySelector(hash);
    if (targetTab) {
        targetTab.classList.add("active");
        
        // Auto-close mobile sidebar when navigating to a tab
        if (window.innerWidth <= 1024) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            }
        }
        
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
        } else if (hash === "#trading") {
            loadTradingPage();
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
    
    const cmBtn = document.getElementById("btn-current-month");
    if (cmBtn) {
        const today = new Date();
        const currentYearStr = today.getFullYear().toString();
        const currentMonthStr = (today.getMonth() + 1).toString().padStart(2, '0');
        if (year === currentYearStr && month === currentMonthStr && !dateFrom && !dateTo) {
            cmBtn.classList.remove("btn-secondary");
            cmBtn.classList.add("btn-primary");
        } else {
            cmBtn.classList.remove("btn-primary");
            cmBtn.classList.add("btn-secondary");
        }
    }

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
    
    const account = document.getElementById("dash-filter-account")?.value || "All";

    const filtered = appState.statements.filter(s => {
        let match = true;
        if (year !== "All") match = match && s.date.startsWith(year);
        if (month !== "All") match = match && s.date.substring(5, 7) === month;
        if (dateFrom) match = match && s.date >= dateFrom;
        if (dateTo) match = match && s.date <= dateTo;
        if (account !== "All") match = match && (s.account === account || s.toAccount === account);
        return match;
    });

    let totalIncome = 0;
    let livingExpense = 0;
    let invested = 0;
    let debtRepaid = 0;
    
    filtered.forEach(s => {
        const amt = Math.abs(s.amount);
        const expCats = appState.categories?.Expense || {};
        
        if (s.type === "Transfer") {
            const isCCPayment = appState.creditCards && appState.creditCards.some(cc => cc.name === s.toAccount);
            if (isCCPayment) {
                debtRepaid += amt;
            }
            return; 
        }
        
        if (s.subCategory === "Self Transfer") return;
        
        if (s.type === "Income") {
            totalIncome += amt;
        } else if (s.type === "Savings") {
            invested += amt;
        } else if (s.type === "Expense") {
            if (expCats["Transfer (Out)"]?.includes(s.subCategory) || expCats["Obligations"]?.includes(s.subCategory)) {
                debtRepaid += amt;
            } else {
                livingExpense += amt;
            }
        }
    });
    
    const netSurplus = totalIncome - livingExpense - invested - debtRepaid;
    
    // Calculate balances
    const balances = getAccountBalances();
    let totalCash = 0;
    let ccDebt = 0;
    
    appState.accounts.forEach(acc => {
        if (balances[acc] !== undefined) totalCash += balances[acc];
    });
    
    if (appState.creditCards) {
        appState.creditCards.forEach(cc => {
            if (balances[cc.name] !== undefined) ccDebt += balances[cc.name];
        });
    }
    
    const debtSummary = getDebtSummary();
    let positions = (typeof getTradingPositions === "function") ? getTradingPositions() : [];
    let openPositionsValue = 0;
    positions.forEach(p => {
        if (p.status === "Open" && p.buyPrice > 0) {
            let cp = p.currentPrice ? parseFloat(p.currentPrice) : p.buyPrice;
            openPositionsValue += (cp * p.qty);
        }
    });
    let includeTrading = true;
    if (appState.settings && appState.settings.includeTradingInNetworth !== undefined) {
        includeTrading = appState.settings.includeTradingInNetworth;
    }
    
    // Net Worth is globally calculated (All Time), irrespective of the dashboard's monthly filter
    const netWorth = totalCash + ccDebt + debtSummary.netOverallPosition + (includeTrading ? openPositionsValue : 0);
    
    // Check for negative account balances
    let warningsHtml = "";
    const ccNames = (appState.creditCards || []).map(cc => cc.name);
    for (const [acc, bal] of Object.entries(balances)) {
        if (bal < 0 && !ccNames.includes(acc)) {
            warningsHtml += `<div style="background-color: var(--warning-light); color: var(--warning); padding: 12px; border-radius: var(--radius-md); border-left: 4px solid var(--warning); margin-bottom: 8px;">
                <strong>⚠️ Caution:</strong> Account '${acc}' is currently in minus (₹${formatCurr(Math.abs(bal))}). Please log income to balance it.
            </div>`;
        }
    }
    
    const warningsContainer = document.getElementById("dash-account-warnings");
    if (warningsContainer) {
        warningsContainer.innerHTML = warningsHtml;
        warningsContainer.style.display = warningsHtml ? "block" : "none";
    }
    
    // Populate Equation UI
    document.getElementById("dash-net-worth").textContent = formatCurr(netWorth);
    document.getElementById("dash-eq-income").textContent = formatCurr(totalIncome);
    document.getElementById("dash-eq-expense").textContent = formatCurr(livingExpense);
    document.getElementById("dash-eq-invested").textContent = formatCurr(invested);
    document.getElementById("dash-eq-debt").textContent = formatCurr(debtRepaid);
    document.getElementById("dash-eq-surplus").textContent = formatCurr(netSurplus);
    
    // Calculate percentages
    const expPct = totalIncome > 0 ? Math.round((livingExpense / totalIncome) * 100) : 0;
    const invPct = totalIncome > 0 ? Math.round((invested / totalIncome) * 100) : 0;
    const debtPct = totalIncome > 0 ? Math.round((debtRepaid / totalIncome) * 100) : 0;
    
    document.getElementById("dash-eq-expense-pct").textContent = `${expPct}%`;
    document.getElementById("dash-eq-invested-pct").textContent = `${invPct}%`;
    document.getElementById("dash-eq-debt-pct").textContent = `${debtPct}%`;
    
    const surplusEl = document.getElementById("dash-eq-surplus");
    if (surplusEl) {
        if (netSurplus < 0) {
            surplusEl.style.color = "var(--danger)";
        } else {
            surplusEl.style.color = "var(--accent)";
        }
    }
    
    renderDueReminders();
    renderBudgetAlerts(filtered);
    renderDashboardPnL(filtered);
    renderDashboardCharts(filtered);
    renderRecentTransactions(filtered);
    renderDashboardAccountSummary();
    renderCategoryBars(filtered);
    renderSavingsTracker();
}

function renderDashboardAccountSummary() {
    const tbody = document.querySelector("#dashboard-account-summary-table tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    const balances = getAccountBalances();
    
    // Calculate debt per account
    const accountDebts = {};
    const allAccounts = new Set(appState.accounts);
    
    if (appState.creditCards) {
        appState.creditCards.forEach(cc => {
            allAccounts.add(cc.name);
            accountDebts[cc.name] = (cc.outstandingAmount || 0); // Credit cards are always debt
        });
    }
    
    if (appState.debts) {
        appState.debts.forEach(d => {
            if (d.status !== "Settled" && d.account) {
                allAccounts.add(d.account);
                const repaid = (d.repayments || []).reduce((sum, r) => sum + r.amount, 0);
                const outstanding = Math.max(0, d.amount - repaid);
                
                if (!accountDebts[d.account]) accountDebts[d.account] = 0;
                
                if (d.type === "Borrowed") {
                    accountDebts[d.account] += outstanding; // We owe them (Positive Debt)
                } else if (d.type === "Lent") {
                    accountDebts[d.account] -= outstanding; // They owe us (Negative Debt / Asset)
                }
            }
        });
    }
    
    Array.from(allAccounts).forEach(acc => {
        const bal = balances[acc] || 0;
        const debt = accountDebts[acc] || 0;
        
        let debtHtml = formatCurr(debt);
        if (debt > 0) {
            debtHtml = `<span style="color: var(--danger); font-weight: 500;">${formatCurr(debt)} (You Owe)</span>`;
        } else if (debt < 0) {
            debtHtml = `<span style="color: var(--success); font-weight: 500;">${formatCurr(Math.abs(debt))} (Owed to You)</span>`;
        } else {
            debtHtml = `<span style="color: var(--text-muted);">₹0</span>`;
        }
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${acc}</strong></td>
            <td style="text-align: right; ${bal < 0 ? 'color: var(--danger);' : 'color: var(--success); font-weight: 500;'}">${formatCurr(bal)}</td>
            <td style="text-align: right;">${debtHtml}</td>
        `;
        tbody.appendChild(tr);
    });
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
    const cmBtn = document.getElementById("btn-current-month");
    if (cmBtn) { cmBtn.classList.remove("btn-secondary"); cmBtn.classList.add("btn-primary"); }
    loadDashboardPage();
};

window.clearDashboardFilter = function() {
    document.getElementById("dash-filter-year").value = "All";
    document.getElementById("dash-filter-month").value = "All";
    document.getElementById("dash-date-from").value = "";
    document.getElementById("dash-date-to").value = "";
    const cmBtn = document.getElementById("btn-current-month");
    if (cmBtn) { cmBtn.classList.remove("btn-primary"); cmBtn.classList.add("btn-secondary"); }
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
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="background-color: var(--danger-light); color: var(--danger); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                    <i class="ri-alert-line"></i>
                </div>
                <div class="reminder-info" style="text-align: left;">
                    <div class="reminder-title" style="color: var(--danger); font-weight: 600;">Over Budget: ${alert.subcat}</div>
                    <div class="reminder-desc">Spent ${formatCurr(alert.actual)} of ${formatCurr(alert.expected)} limit</div>
                </div>
            </div>
            <div style="color: var(--danger); font-weight: 600; font-size: 14px;">+${formatCurr(alert.over)}</div>
        `;
        list.appendChild(item);
    });
}

function renderDueReminders() {
    const list = document.getElementById("reminders-list");
    list.innerHTML = "";
    
    const today = new Date();
    const reminders = [];
    const balances = getAccountBalances();
    
    appState.creditCards.forEach(cc => {
        const outstanding = Math.abs(balances[cc.name] || 0);
        if (outstanding > 0) {
            let dueDate = new Date(today.getFullYear(), today.getMonth(), cc.dueDate);
            if (today.getDate() > cc.dueDate) {
                dueDate.setMonth(dueDate.getMonth() + 1);
            }
            const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            reminders.push({
                id: cc.id,
                title: `${cc.name} Credit Card Due`,
                desc: `${formatCurr(outstanding)} due on ${dueDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`,
                daysLeft: daysLeft,
                type: daysLeft <= 5 ? "urgent" : "warning",
                payAction: () => triggerCreditCardPayment({id: cc.id, name: cc.name, account: cc.account, outstandingAmount: outstanding})
            });
        }
    });
    
    appState.emis.forEach(emi => {
        if (emi.remainingMonths > 0) {
            const startDay = emi.startDate ? parseInt(emi.startDate.split('-')[2], 10) : 5;
            let dueDate = new Date(today.getFullYear(), today.getMonth(), startDay);
            if (today.getDate() > startDay) {
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
        list.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px;">No pending bill dues or reminders. All caught up! 🥳</div>`;
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
        toAccount: cc.name,
        description: `Credit Card Bill: ${cc.name}`,
        subCategory: "Self Transfer",
        amount: cc.outstandingAmount,
        type: "Transfer",
        onSuccess: () => {
            saveState();
            loadDashboardPage();
            if (typeof loadEMIsPage === "function") loadEMIsPage();
        }
    });
}

function triggerEMIPayment(emi) {
    openTransactionModal({
        account: emi.account,
        description: `EMI Payment: ${emi.name}`,
        subCategory: "EMI",
        amount: emi.amount,
        type: "Expense",
        linkedId: emi.id,
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
        subCategory: "Recurring Investments",
        amount: amount,
        type: "Savings",
        linkedId: chit.id,
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
    if (!tbody) return;
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
    
    document.getElementById("tally-title").textContent = `TALLY MONTH: ${monthName.toUpperCase()}`;
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
function renderDashboardPnL(statementsToUse) {
    const tbody = document.querySelector("#dashboard-pnl-table tbody");
    if (!tbody) return;
    
    const pnlData = {
        Income: {},
        Expense: {},
        Savings: {}
    };
    
    const year = document.getElementById("dash-filter-year")?.value || "All";
    const month = document.getElementById("dash-filter-month")?.value || "All";
    const dateFrom = document.getElementById("dash-date-from")?.value || "";
    const dateTo = document.getElementById("dash-date-to")?.value || "";
    
    const titleEl = document.getElementById("pnl-panel-title");
    if (titleEl) {
        if (month !== "All" && year !== "All") {
            const mName = new Date(2000, parseInt(month, 10) - 1).toLocaleString('default', { month: 'short' });
            titleEl.textContent = `Personal P&L (${mName}-${year})`;
        } else if (month !== "All") {
            const mName = new Date(2000, parseInt(month, 10) - 1).toLocaleString('default', { month: 'short' });
            titleEl.textContent = `Personal P&L (${mName})`;
        } else if (year !== "All") {
            titleEl.textContent = `Personal P&L (${year})`;
        } else {
            titleEl.textContent = "Personal P&L (All Time)";
        }
    }

    const aggBudgets = {};
    for (const ym in appState.monthlyBudgets) {
        let match = true;
        if (year !== "All") match = match && ym.startsWith(year);
        if (month !== "All") match = match && ym.substring(5, 7) === month;
        if (dateFrom && ym < dateFrom.substring(0, 7)) match = false;
        if (dateTo && ym > dateTo.substring(0, 7)) match = false;
        
        if (match) {
            for (const subcat in appState.monthlyBudgets[ym]) {
                aggBudgets[subcat] = (aggBudgets[subcat] || 0) + appState.monthlyBudgets[ym][subcat];
            }
        }
    }
    
    for (const subcat in aggBudgets) {
        let parentType = null;
        let parentCat = null;
        
        for (const t in appState.categories) {
            for (const c in appState.categories[t]) {
                if (appState.categories[t][c].includes(subcat)) {
                    parentType = t;
                    parentCat = c;
                    break;
                }
            }
            if (parentType) break;
        }
        
        if (parentType && pnlData[parentType]) {
            if (!pnlData[parentType][parentCat]) {
                pnlData[parentType][parentCat] = { actual: 0, budget: 0 };
            }
            pnlData[parentType][parentCat].budget += aggBudgets[subcat];
        }
    }
    
    statementsToUse.forEach(s => {
        let parentType = s.type;
        if (!pnlData[parentType]) return;
        
        let parentCat = s.subCategory || "Uncategorized";
        if (appState.categories[parentType]) {
            for (const c in appState.categories[parentType]) {
                if (appState.categories[parentType][c].includes(s.subCategory)) {
                    parentCat = c;
                    break;
                }
            }
        }
        
        if (!pnlData[parentType][parentCat]) {
            pnlData[parentType][parentCat] = { actual: 0, budget: 0 };
        }
        pnlData[parentType][parentCat].actual += Math.abs(s.amount);
    });
    
    let html = "";
    let overallIncomeAct = 0;
    let overallIncomeBud = 0;
    let overallExpenseAct = 0;
    let overallExpenseBud = 0;
    
    const renderSection = (type, label) => {
        const cats = Object.keys(pnlData[type]).sort();
        if (cats.length === 0) return;
        
        html += `<tr style="background-color: var(--bg-surface);"><td colspan="4" style="font-weight:700; color:var(--text-muted); padding-top:12px;">${label}</td></tr>`;
        
        let secActual = 0;
        let secBudget = 0;
        
        cats.forEach(c => {
            const act = pnlData[type][c].actual;
            const bud = pnlData[type][c].budget;
            secActual += act;
            secBudget += bud;
            
            const variance = act - bud;
            let statusIcon = "";
            let varColor = "";
            
            if (type === "Income") {
                statusIcon = act >= bud ? '✔️' : '❌';
                varColor = variance >= 0 ? 'var(--success)' : 'var(--danger)';
            } else {
                statusIcon = act <= bud ? '✔️' : '❌';
                varColor = variance <= 0 ? 'var(--success)' : 'var(--danger)';
            }
            
            html += `<tr>
                <td style="padding-left: 16px;">${c}</td>
                <td style="text-align: right;">${formatCurr(act)}</td>
                <td style="text-align: right;">${formatCurr(bud)}</td>
                <td style="text-align: right; color: ${varColor}">${statusIcon} ${formatCurr(variance)}</td>
            </tr>`;
        });
        
        html += `<tr style="font-weight:700; background-color: var(--bg-surface);">
            <td style="padding-left: 16px; color: var(--text-muted);">${label} Total</td>
            <td style="text-align: right;">${formatCurr(secActual)}</td>
            <td style="text-align: right;">${formatCurr(secBudget)}</td>
            <td style="text-align: right;">${formatCurr(secActual - secBudget)}</td>
        </tr>`;
        
        if (type === "Income") {
            overallIncomeAct = secActual;
            overallIncomeBud = secBudget;
        }
        if (type === "Expense") {
            overallExpenseAct = secActual;
            overallExpenseBud = secBudget;
        }
    };
    
    renderSection("Income", "Income");
    renderSection("Expense", "Expense");
    renderSection("Savings", "Savings");
    
    const surplusAct = overallIncomeAct - overallExpenseAct;
    const surplusBud = overallIncomeBud - overallExpenseBud;
    html += `<tr style="font-weight:700; background-color: var(--border-color); font-size: 14px;">
        <td style="padding: 12px 16px;">Income Surplus / (Deficit)</td>
        <td style="text-align: right; color: ${surplusAct >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurr(surplusAct)}</td>
        <td style="text-align: right;">${formatCurr(surplusBud)}</td>
        <td style="text-align: right;">${formatCurr(surplusAct - surplusBud)}</td>
    </tr>`;
    
    tbody.innerHTML = html;
}

function renderDashboardCharts(statementsToUse = appState.statements) {
    const isDark = (document.documentElement.getAttribute("data-theme") || "dark") !== "light";
    const textColors = isDark ? "#9ca3af" : "#475569";
    const gridColors = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
    
    const trendLabels = [];
    const totalIncomeData = [];
    const totalExpenseData = [];
    const totalInvestedData = [];
    const investmentsBreakdown = {};
    
    let endYear = new Date().getFullYear();
    let endMonth = new Date().getMonth();
    
    const filterYear = document.getElementById("dash-filter-year")?.value || "All";
    const filterMonth = document.getElementById("dash-filter-month")?.value || "All";
    
    if (filterYear !== "All") {
        endYear = parseInt(filterYear);
        if (filterMonth !== "All") {
            const mNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            endMonth = mNames.indexOf(filterMonth) !== -1 ? mNames.indexOf(filterMonth) : endMonth;
        } else {
            endMonth = 11;
        }
    }
    
    const endDate = new Date(endYear, endMonth, 1);
    
    for (let i = 5; i >= 0; i--) {
        const index = 5 - i;
        const d = new Date(endDate.getFullYear(), endDate.getMonth() - i, 1);
        const y = d.getFullYear();
        const m = (d.getMonth() + 1).toString().padStart(2, '0');
        const ym = `${y}-${m}`;
        trendLabels.push(d.toLocaleString('default', { month: 'short' }) + " '" + y.toString().slice(-2));
        
        let sal = 0, pb = 0, oInc = 0;
        let sav = 0, debt = 0, tExp = 0;
        
        appState.statements.forEach(s => {
            if (s.date.startsWith(ym)) {
                const amt = Math.abs(s.amount);
                const incCats = appState.categories?.Income || {};
                const expCats = appState.categories?.Expense || {};
                
                if (s.type === "Transfer") {
                    const isCCPayment = appState.creditCards && appState.creditCards.some(cc => cc.name === s.toAccount);
                    if (isCCPayment) debt += amt;
                    return;
                }
                
                if (s.subCategory === "Self Transfer") return;
                
                if (s.type === "Income") {
                    if (incCats.Fixed?.includes(s.subCategory)) sal += amt;
                    else if (incCats.Carryforward?.includes(s.subCategory)) pb += amt;
                    else oInc += amt;
                } else if (s.type === "Savings") {
                    sav += amt;
                    const invCat = s.subCategory || "Other";
                    if (!investmentsBreakdown[invCat]) {
                        investmentsBreakdown[invCat] = Array(6).fill(0);
                    }
                    investmentsBreakdown[invCat][index] += amt;
                } else if (s.type === "Expense") {
                    if (expCats["Transfer (Out)"]?.includes(s.subCategory) || expCats["Obligations"]?.includes(s.subCategory)) {
                        debt += amt;
                    } else {
                        tExp += amt;
                    }
                }
            }
        });
        
        totalIncomeData.push(sal + pb + oInc);
        totalInvestedData.push(sav);
        totalExpenseData.push(debt + tExp);
    }
    
    const invColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#6366f1'];
    const invDatasets = Object.keys(investmentsBreakdown).map((cat, idx) => {
        return {
            label: cat,
            data: investmentsBreakdown[cat],
            backgroundColor: invColors[idx % invColors.length],
            stack: 'Stack 0',
            borderRadius: 4
        };
    });
    
    const target = appState.settings?.savingsTarget || 0;
    const goalInput = document.getElementById("dash-sip-goal");
    if (goalInput) goalInput.value = target || "";
    
    if (target > 0) {
        invDatasets.push({
            label: 'Goal',
            data: Array(6).fill(target),
            type: 'line',
            borderColor: 'rgba(245, 158, 11, 0.8)',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
        });
    }
    
    const ctxTrend = document.getElementById("monthlyTrendChart");
    if (ctxTrend) {
        if (charts.trend) charts.trend.destroy();
        
        charts.trend = new Chart(ctxTrend, {
            type: 'bar',
            data: {
                labels: trendLabels,
                datasets: invDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { color: textColors }
                    },
                    y: {
                        stacked: true,
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

    const ctxMacro = document.getElementById("macroTrendLineChart");
    if (ctxMacro) {
        if (charts.macroTrend) charts.macroTrend.destroy();
        
        charts.macroTrend = new Chart(ctxMacro, {
            type: 'line',
            data: {
                labels: trendLabels,
                datasets: [
                    {
                        label: 'Income',
                        data: totalIncomeData,
                        borderColor: 'rgba(59, 130, 246, 1)', // Blue
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: 'rgba(59, 130, 246, 1)'
                    },
                    {
                        label: 'Expenses',
                        data: totalExpenseData,
                        borderColor: 'rgba(239, 68, 68, 1)', // Red
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false,
                        pointBackgroundColor: 'rgba(239, 68, 68, 1)'
                    },
                    {
                        label: 'Invested',
                        data: totalInvestedData,
                        borderColor: 'rgba(16, 185, 129, 1)', // Green
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false,
                        pointBackgroundColor: 'rgba(16, 185, 129, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
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
                            font: { family: 'Inter', size: 11 },
                            usePointStyle: true,
                            boxWidth: 8
                        }
                    }
                }
            }
        });
    }
}

function renderCategoryBars(filtered) {
    const container = document.getElementById("category-spending-bars");
    if (!container) return;
    
    let expensesByCategory = {};
    let totalMax = 0;
    
    filtered.forEach(s => {
        if (s.type === "Expense" && s.subCategory !== "Self Transfer") {
            const cat = s.subCategory || s.category || "Other";
            if (!expensesByCategory[cat]) expensesByCategory[cat] = 0;
            expensesByCategory[cat] += Math.abs(s.amount);
        } else if (s.type === "Transfer") {
            const isCCPayment = appState.creditCards && appState.creditCards.some(cc => cc.name === s.toAccount);
            if (isCCPayment) {
                const cat = "Credit Card Bill";
                if (!expensesByCategory[cat]) expensesByCategory[cat] = 0;
                expensesByCategory[cat] += Math.abs(s.amount);
            }
        }
    });
    
    let sortedCats = Object.keys(expensesByCategory).map(cat => {
        return { name: cat, amount: expensesByCategory[cat] };
    }).sort((a, b) => b.amount - a.amount);
    
    if (sortedCats.length > 0) {
        totalMax = sortedCats[0].amount;
    }
    
    const colors = ['#3b82f6', '#f59e0b', '#64748b', '#f97316', '#4f46e5', '#10b981', '#ef4444', '#16a34a', '#8b5cf6', '#ec4899'];
    
    let html = "";
    if (sortedCats.length === 0) {
        html = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 13px;">No expense data for this period</div>`;
    } else {
        sortedCats.forEach((c, index) => {
            const pct = (c.amount / totalMax) * 100;
            const color = colors[index % colors.length];
            // Format number concisely like 15.5K for large numbers if needed, but formatCurr is fine
            html += `
            <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; margin-bottom: 8px;">
                <div style="width: 110px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-primary); font-weight: 500;" title="${c.name}">${c.name}</div>
                <div style="flex-grow: 1; background-color: var(--border-color); height: 8px; border-radius: 4px; overflow: hidden; position: relative;">
                    <div style="background-color: ${color}; width: ${pct}%; height: 100%; border-radius: 4px;"></div>
                </div>
                <div style="width: 80px; text-align: right; color: var(--text-primary); font-weight: 600;">${formatCurr(c.amount)}</div>
            </div>`;
        });
    }
    
    container.innerHTML = html;
}

function saveSIPGoal(value) {
    if (!appState.settings) appState.settings = {};
    appState.settings.savingsTarget = parseFloat(value) || 0;
    saveState();
    loadDashboardPage();
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
window.showBudgetTransactions = function(subcat, monthYear) {
    const title = document.getElementById("budget-transactions-title");
    const tbody = document.querySelector("#budget-transactions-table tbody");
    
    title.textContent = `${subcat} - ${monthYear}`;
    tbody.innerHTML = "";
    
    // Filter transactions
    const filtered = appState.statements.filter(t => {
        if (t.subCategory !== subcat) return false;
        
        let d;
        if (t.date.includes("-")) {
            d = new Date(t.date);
        } else {
            d = new Date(t.date);
        }
        
        if (isNaN(d)) return false;
        
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const m = `${yyyy}-${mm}`;
        return m === monthYear;
    });
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--text-muted);">No transactions found.</td></tr>`;
    } else {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(t => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="padding: 12px 16px; border-bottom: 1px solid var(--border-color); color: var(--text-primary); font-size: 13px;">${formatDateDisplay(t.date)}</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 13px;">${t.description || '-'}</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid var(--border-color);"><span class="badge" style="background:var(--bg-hover); color:var(--text-secondary); border: 1px solid var(--border-color);">${t.account}</span></td>
                <td style="padding: 12px 16px; border-bottom: 1px solid var(--border-color); text-align:right; font-weight: 600; font-size: 14px; color: var(--text-primary);">${formatCurr(Math.abs(t.amount))}</td>
            `;
            tbody.appendChild(tr);
        });
    }
    
    document.getElementById("budget-transactions-modal").classList.add("active");
};

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

    const titleEl = document.getElementById("budget-page-title");
    if (titleEl) {
        const d = new Date(currentMonth + "-01");
        titleEl.textContent = "Monthly Budget Planner - " + d.toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    let globalTotalPlanned = 0;
    let globalTotalActual = 0;

    const groups = Object.keys(appState.categories).sort();
    groups.forEach(type => {
        const cats = Object.keys(appState.categories[type]).sort();
        cats.forEach(cat => {
            const subs = [...appState.categories[type][cat]].sort();
            
            let catExpected = 0;
            let catActual = 0;
            subs.forEach(subcat => {
                const monthBudgets = appState.monthlyBudgets[currentMonth] || {};
                const expected = monthBudgets[subcat] || 0;
                const actual = actuals[subcat] || 0;
                catExpected += expected;
                catActual += actual;
                
                if (type === "Expense" || type === "Savings") {
                    globalTotalPlanned += expected;
                    globalTotalActual += actual;
                }
            });
            
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
            header.innerHTML = `
                <div style="display:flex; justify-content:space-between; width: 100%; align-items:center;">
                    <span class="panel-title" style="font-size: 15px; margin: 0;">${cat} <span style="font-size: 11px; color: var(--text-muted); font-weight: normal; margin-left: 5px;">${type}</span></span>
                    <div style="font-size: 13px;">
                        <span style="color: var(--text-muted); margin-right: 12px;">Budget: <span style="color:var(--text-primary); font-weight:600;">${formatCurr(catExpected)}</span></span>
                        <span style="color: var(--text-muted);">Actual: <span style="color:var(--text-primary); font-weight:600;">${formatCurr(catActual)}</span></span>
                    </div>
                </div>
            `;
            
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

            subs.forEach((subcat, idx) => {
                const tr = document.createElement("tr");
                if (idx === subs.length - 1) {
                    tr.style.borderBottom = "none";
                }
                const monthBudgets = appState.monthlyBudgets[currentMonth] || {};
                const expected = monthBudgets[subcat] || 0;
                const actual = actuals[subcat] || 0;
                let diff = expected - actual;
                
                let diffStyle = "";
                let cautionIcon = "";
                if (type === "Expense") {
                    if (diff < 0) {
                        diffStyle = "color: var(--danger); font-weight: bold;";
                        cautionIcon = ' <i class="ri-alert-fill" title="Budget Exceeded!" style="color: var(--danger);"></i>';
                    }
                    else if (diff >= 0) diffStyle = "color: var(--success);";
                } else if (type === "Income") {
                    diff = actual - expected; 
                    if (diff < 0) diffStyle = "color: var(--warning); font-weight: bold;";
                    else if (diff >= 0) diffStyle = "color: var(--success);";
                }
                
                tr.innerHTML = `
                    <td style="padding: 10px 15px; font-weight: 500;">${subcat}${cautionIcon}</td>
                    <td style="padding: 6px 10px;"><input type="text" inputmode="decimal" class="form-control budget-input" data-subcat="${subcat.replace(/"/g, '&quot;')}" value="${formatCurr(expected)}" onblur="this.value = formatCurr(parseAmountStr(this.value))" style="padding: 4px 8px; height: 30px; font-size: 13px;"></td>
                    <td style="padding: 10px 10px; text-align: right; color: var(--accent); cursor: pointer; text-decoration: underline;" data-subcat="${subcat.replace(/"/g, '&quot;')}" onclick="showBudgetTransactions(this.getAttribute('data-subcat'), '${currentMonth}')" title="View Transactions">${formatCurr(actual)}</td>
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
    
    const variance = globalTotalPlanned - globalTotalActual;
    const varianceEl = document.getElementById("budget-total-variance");
    
    if (document.getElementById("budget-total-planned")) {
        document.getElementById("budget-total-planned").textContent = formatCurr(globalTotalPlanned);
        document.getElementById("budget-total-actual").textContent = formatCurr(globalTotalActual);
        varianceEl.textContent = formatCurr(variance);
        
        if (variance < 0) {
            varianceEl.style.color = "var(--danger)";
        } else {
            varianceEl.style.color = "var(--success)";
        }
    }
}

function saveBudgetPlanner() {
    const monthFilter = document.getElementById("budget-month-filter");
    const currentMonth = monthFilter && monthFilter.value ? monthFilter.value : new Date().toISOString().slice(0, 7);
    
    if (!appState.monthlyBudgets[currentMonth]) {
        appState.monthlyBudgets[currentMonth] = {};
    }
    
    const inputs = document.querySelectorAll(".budget-input");
    inputs.forEach(input => {
        const subcat = input.getAttribute("data-subcat");
        const val = parseAmountStr(input.value);
        appState.monthlyBudgets[currentMonth][subcat] = val;
    });
    saveState();
    alert(`Budgets for ${currentMonth} saved successfully!`);
    loadBudgetPage();
}

window.resetBudgets = function() {
    const monthFilter = document.getElementById("budget-month-filter");
    const currentMonth = monthFilter && monthFilter.value ? monthFilter.value : new Date().toISOString().slice(0, 7);
    
    if (confirm(`Are you sure you want to reset all budgets for ${currentMonth} to zero?`)) {
        appState.monthlyBudgets[currentMonth] = {};
        saveState();
        loadBudgetPage();
    }
};

window.copyPreviousMonthActuals = function() {
    const picker = document.getElementById("budget-month-filter");
    if (!picker) return;
    
    let currentMonth = picker.value || new Date().toISOString().slice(0, 7);
    
    const date = new Date(currentMonth + "-01");
    date.setMonth(date.getMonth() - 1);
    const prevMonth = date.toISOString().slice(0, 7);
    
    if (!confirm(`This will overwrite your ${currentMonth} budgets with your ACTUAL expenses from ${prevMonth}. Proceed?`)) {
        return;
    }
    
    const actuals = {};
    appState.statements.forEach(s => {
        if (s.date.startsWith(prevMonth) && (s.type === "Expense" || s.type === "Income")) {
            const sc = s.subCategory || "Uncategorized";
            actuals[sc] = (actuals[sc] || 0) + Math.abs(s.amount);
        }
    });
    
    appState.monthlyBudgets[currentMonth] = {};
    for (const subcat in actuals) {
        appState.monthlyBudgets[currentMonth][subcat] = actuals[subcat];
    }
    
    saveState();
    loadBudgetPage();
    alert(`Budgets for ${currentMonth} updated to match ${prevMonth} actuals!`);
};

window.copyPreviousMonthBudget = function() {
    const picker = document.getElementById("budget-month-filter");
    if (!picker) return;
    
    let currentMonth = picker.value || new Date().toISOString().slice(0, 7);
    
    const date = new Date(currentMonth + "-01");
    date.setMonth(date.getMonth() - 1);
    const prevMonth = date.toISOString().slice(0, 7);
    
    if (!confirm(`This will copy your BUDGET TARGETS from ${prevMonth} into ${currentMonth}. Proceed?`)) {
        return;
    }
    
    if (appState.monthlyBudgets[prevMonth]) {
        appState.monthlyBudgets[currentMonth] = { ...appState.monthlyBudgets[prevMonth] };
    } else {
        appState.monthlyBudgets[currentMonth] = {};
    }
    
    saveState();
    loadBudgetPage();
    alert(`Budgets copied from ${prevMonth} to ${currentMonth}!`);
};

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
    
    let csvContent = "Accnt. Name,Date,Description,Sub-Category,Debit,Credit\n";
    filtered.forEach(t => {
        // Escape quotes
        const desc = (t.description || "").replace(/"/g, '""');
        const cat = (t.subCategory || "").replace(/"/g, '""');
        
        const isDebit = t.type !== "Income";
        const debitStr = isDebit ? Math.abs(t.amount) : "";
        const creditStr = !isDebit ? Math.abs(t.amount) : "";
        
        csvContent += `"${t.account}",${t.date},"${desc}","${cat}",${debitStr},${creditStr}\n`;
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
    const account = document.getElementById("exp-filter-account") ? document.getElementById("exp-filter-account").value : "All";
    
    const tbody = document.querySelector("#expenses-table tbody");
    tbody.innerHTML = "";
    
    const filtered = appState.statements.filter(t => {
        const matchesType = !txType || t.type === txType;
        const matchesSubcat = !subcat || t.subCategory === subcat;
        const matchesSearch = !search || (t.description || "").toLowerCase().includes(search) || (t.subCategory || "").toLowerCase().includes(search);
        const matchesDateFrom = !dateFrom || t.date >= dateFrom;
        const matchesDateTo = !dateTo || t.date <= dateTo;
        const matchesAccount = account === "All" || t.account === account || t.toAccount === account;
        return matchesType && matchesSubcat && matchesSearch && matchesDateFrom && matchesDateTo && matchesAccount;
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

function clearAllFilters() {
    const fromEl = document.getElementById("exp-date-from");
    const toEl = document.getElementById("exp-date-to");
    const searchEl = document.getElementById("exp-search");
    const accountEl = document.getElementById("exp-filter-account");
    const typeEl = document.getElementById("exp-filter-type");
    const subcatEl = document.getElementById("exp-filter-subcategory");
    
    if (fromEl) fromEl.value = "";
    if (toEl) toEl.value = "";
    if (searchEl) searchEl.value = "";
    if (accountEl) accountEl.value = "All";
    if (typeEl) typeEl.value = "";
    if (subcatEl) subcatEl.value = "All";
    
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
        const t = appState.statements.find(s => s.id === id);
        if (t && t.linkedId) {
            if (t.linkedId.startsWith("emi_")) {
                const emi = appState.emis.find(e => e.id === t.linkedId);
                if (emi) emi.remainingMonths = Math.min(emi.tenureMonths, emi.remainingMonths + 1);
            } else if (t.linkedId.startsWith("chit_")) {
                const chit = appState.chits.find(c => c.id === t.linkedId);
                if (chit && chit.bids.length > 0) chit.bids.pop();
            } else if (t.linkedId.startsWith("debt_")) {
                if (t.id === "s_" + t.linkedId) {
                    // This is the principal transaction. Deleting it deletes the entire debt.
                    if (confirm("This transaction is the original principal of a Loan/Debt. Deleting it will delete the entire Debt ledger along with its repayments. Proceed?")) {
                        appState.debts = appState.debts.filter(d => d.id !== t.linkedId);
                        // Also delete any repayment transactions associated with this debt
                        appState.statements = appState.statements.filter(s => s.linkedId !== t.linkedId);
                        saveState();
                        filterExpensesTable();
                        loadDebtsPage(); // Refresh debt UI if active
                        return; // Done
                    } else {
                        return; // Cancel deletion
                    }
                } else {
                    const debt = appState.debts.find(d => d.id === t.linkedId);
                    if (debt) debt.repayments = debt.repayments.filter(r => r.id !== id);
                }
            }
        }
        
        appState.statements = appState.statements.filter(s => s.id !== id);
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
    const activeTbody = document.querySelector("#debts-table tbody");
    const settledTbody = document.querySelector("#settled-debts-table tbody");
    if (!activeTbody || !settledTbody) return;
    
    activeTbody.innerHTML = "";
    settledTbody.innerHTML = "";
    
    const activeDebts = [];
    const settledDebts = [];
    
    appState.debts.forEach(d => {
        const repaid = d.repayments.reduce((sum, r) => sum + r.amount, 0);
        const outstanding = Math.max(0, d.amount - repaid);
        if (outstanding > 0) activeDebts.push({ ...d, repaid, outstanding });
        else settledDebts.push({ ...d, repaid, outstanding });
    });
    
    if (activeDebts.length === 0) {
        activeTbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted);">No active lending/borrowing agreements.</td></tr>`;
    } else {
        activeDebts.forEach(d => {
            const isLent = d.type === "Lent";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${formatDateDisplay(d.date)}</td>
                <td><strong>${d.account}</strong></td>
                <td><span class="badge ${isLent ? 'badge-income' : 'badge-expense'}">${d.type}</span></td>
                <td><strong>${d.person}</strong></td>
                <td>${d.remarks || "-"}</td>
                <td>${formatCurr(d.amount)}</td>
                <td>${formatCurr(d.repaid)}</td>
                <td style="font-weight: 700; color: var(--warning)">${formatCurr(d.outstanding)}</td>
                <td style="text-align: right; display: flex; gap: 4px; justify-content: flex-end;">
                    <button class="btn btn-success" style="padding: 4px 8px; font-size: 11px;" onclick="openRepaymentModal('${d.id}')"><i class="ri-refund-2-line"></i> Repay</button>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="promptEditDebt('${d.id}')"><i class="ri-pencil-line"></i></button>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="deleteDebtItem('${d.id}')"><i class="ri-delete-bin-line"></i></button>
                </td>
            `;
            activeTbody.appendChild(tr);
        });
    }
    
    if (settledDebts.length === 0) {
        settledTbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No settled loans yet.</td></tr>`;
    } else {
        settledDebts.forEach(d => {
            const isLent = d.type === "Lent";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${formatDateDisplay(d.date)}</td>
                <td><strong>${d.account}</strong></td>
                <td><span class="badge ${isLent ? 'badge-income' : 'badge-expense'}">${d.type}</span></td>
                <td><strong>${d.person}</strong></td>
                <td>${d.remarks || "-"}</td>
                <td>${formatCurr(d.amount)}</td>
                <td><span class="badge" style="background-color: var(--success-light); color: var(--success);">Settled</span></td>
                <td style="text-align: right; display: flex; gap: 4px; justify-content: flex-end;">
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="promptEditDebt('${d.id}')" title="Edit"><i class="ri-pencil-line"></i></button>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="undoDebtSettlement('${d.id}')" title="Undo Settlement"><i class="ri-arrow-go-back-line" style="color: var(--warning);"></i></button>
                </td>
            `;
            settledTbody.appendChild(tr);
        });
    }
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
        
        const lentAccts = c.accountsLentFromArr.length > 0 ? c.accountsLentFromArr.join("/") : "Us";
        const borrowAccts = c.accountsBorrowedByArr.length > 0 ? c.accountsBorrowedByArr.join("/") : "Us";
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 14px;">${c.name}</strong>
                <span style="font-weight: 700; color: ${color}; font-size: 12px;">${positionText}</span>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px; display: flex; flex-direction: column; gap: 2px;">
                <span>Owed to ${lentAccts}: ${formatCurr(c.outstandingOwedToUs)}</span>
                <span>Owed by ${borrowAccts}: ${formatCurr(c.outstandingWeOwe)}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function deleteDebtItem(id) {
    if (confirm("Are you sure you want to delete this loan record? This will also delete all repayment history associated with it.")) {
        appState.debts = appState.debts.filter(d => d.id !== id);
        // Also delete the principal transaction and all repayment transactions from the statements ledger
        appState.statements = appState.statements.filter(s => s.linkedId !== id && s.id !== "s_" + id);
        saveState();
        loadDebtsPage();
    }
}

window.undoDebtSettlement = function(id) {
    if (confirm("Are you sure you want to undo the settlement? This will remove the most recent repayment and move the loan back to Active status.")) {
        const debt = appState.debts.find(d => d.id === id);
        if (debt && debt.repayments.length > 0) {
            const lastRepayment = debt.repayments.pop(); // Remove the last pushed repayment
            
            // Delete the corresponding transaction statement
            appState.statements = appState.statements.filter(s => 
                s.id !== lastRepayment.id && 
                s.id !== "s_" + lastRepayment.id
            );
            
            saveState();
            loadDebtsPage();
        }
    }
};

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
    
    const txId = "s_rep_" + Date.now();
    debt.repayments.push({
        id: txId,
        date: date,
        amount: amount,
        account: account
    });
    
    const isLent = debt.type === "Lent";
    appState.statements.unshift({
        id: txId,
        account: account,
        date: date,
        description: `Repayment from ${debt.person}: ${debt.remarks}`,
        subCategory: isLent ? "Lent Repayment" : "Borrow Repayment",
        amount: isLent ? amount : -amount,
        type: isLent ? "Income" : "Expense",
        linkedId: debtId
    });
    
    saveState();
    closeAllModals();
    loadDebtsPage();
}

// -------------------------------------------------------------
// CHITS TAB
// -------------------------------------------------------------
function loadChitsPage() {
    const activeContainer = document.getElementById("chits-cards-grid");
    const completedContainer = document.getElementById("completed-chits-cards-grid");
    if (!activeContainer || !completedContainer) return;
    
    activeContainer.innerHTML = "";
    completedContainer.innerHTML = "";
    
    if (appState.chits.length === 0) {
        activeContainer.innerHTML = `<div style="grid-column:1/-1; text-align: center; color: var(--text-muted); font-size: 13px;">No Chit Funds created yet. Click "Add New Plan" to start tracking!</div>`;
        return;
    }
    
    const activeChits = [];
    const completedChits = [];
    
    appState.chits.forEach(chit => {
        if (chit.members > 0 && chit.bids.length >= chit.members) {
            completedChits.push(chit);
        } else {
            activeChits.push(chit);
        }
    });
    
    const renderCard = (chit, container) => {
        const calcs = getChitCalculations(chit);
        const card = document.createElement("div");
        card.className = "dashboard-panel";
        card.style.padding = "20px";
        
        const isFixed = chit.members > 0;
        const completedRounds = chit.bids.length;
        const totalRounds = isFixed ? chit.members : 0;
        const completionPct = isFixed ? Math.min(100, (completedRounds / totalRounds) * 100) : 0;
        
        let detailsHtml = '';
        if (isFixed) {
            detailsHtml = `
                <span class="chit-detail-label">Total Fund Value:</span>
                <span class="chit-detail-value">${formatCurr(chit.totalValue)}</span>
                
                <span class="chit-detail-label">Members:</span>
                <span class="chit-detail-value">${chit.members}</span>
                
                <span class="chit-detail-label">Installment Base:</span>
                <span class="chit-detail-value">${formatCurr(chit.totalValue / chit.members)}</span>
                
                <span class="chit-detail-label">Total Payments Made:</span>
                <span class="chit-detail-value">${formatCurr(calcs.totalPaid)}</span>
                
                <span class="chit-detail-label">Total Payout Received:</span>
                <span class="chit-detail-value">${formatCurr(calcs.totalReceived)}</span>
                
                <span class="chit-detail-label" style="font-weight: 700;">Net Gain/Loss:</span>
                <span class="chit-detail-value" style="font-weight: 700; color: ${calcs.netGain >= 0 ? 'var(--success)' : 'var(--danger)'}">
                    ${formatCurr(calcs.netGain)}
                </span>
            `;
        } else {
            detailsHtml = `
                <span class="chit-detail-label">Type:</span>
                <span class="chit-detail-value">Open-Ended Tracker</span>
                
                <span class="chit-detail-label">Expected Monthly:</span>
                <span class="chit-detail-value">${chit.monthlyAmount ? formatCurr(chit.monthlyAmount) : 'Not Set'}</span>
                
                <span class="chit-detail-label">Total Payments Made:</span>
                <span class="chit-detail-value">${formatCurr(calcs.totalPaid)}</span>
                
                <span class="chit-detail-label">Total Payout Received:</span>
                <span class="chit-detail-value">${formatCurr(calcs.totalReceived)}</span>
                
                <span class="chit-detail-label" style="font-weight: 700;">Net Gain/Loss:</span>
                <span class="chit-detail-value" style="font-weight: 700; color: ${calcs.netGain >= 0 ? 'var(--success)' : 'var(--danger)'}">
                    ${formatCurr(calcs.netGain)}
                </span>
            `;
        }

        let progressHtml = '';
        if (isFixed) {
            progressHtml = `
            <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 6px;">
                <div style="display:flex; justify-content:space-between; font-size: 11px; color: var(--text-muted);">
                    <span>Progress (${completedRounds}/${totalRounds} Rounds)</span>
                    <span>${Math.round(completionPct)}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${completionPct}%; ${completionPct === 100 ? 'background: var(--success);' : ''}"></div>
                </div>
            </div>`;
        }
        
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 12px;">
                <strong style="font-size: 16px; font-family: var(--font-heading);">${chit.name}</strong>
                <div>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px; margin-right: 4px;" onclick="promptEditChit('${chit.id}')"><i class="ri-pencil-line"></i></button>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="deleteChitItem('${chit.id}')"><i class="ri-delete-bin-line"></i></button>
                </div>
            </div>
            
            <div class="chit-details-grid">
                ${detailsHtml}
            </div>
            
            ${progressHtml}
            
            <button class="btn btn-primary" style="margin-top: 14px; width: 100%; justify-content: center;" onclick="openChitLedgerModal('${chit.id}')">
                <i class="ri-list-settings-line"></i> View Ledger & Add Payments
            </button>
        `;
        container.appendChild(card);
    };

    if (activeChits.length === 0) {
        activeContainer.innerHTML = `<div style="grid-column:1/-1; text-align: center; color: var(--text-muted); font-size: 13px;">No active investments right now.</div>`;
    } else {
        activeChits.forEach(chit => renderCard(chit, activeContainer));
    }
    
    if (completedChits.length === 0) {
        completedContainer.innerHTML = `<div style="grid-column:1/-1; text-align: center; color: var(--text-muted); font-size: 13px;">No matured investments yet.</div>`;
    } else {
        completedChits.forEach(chit => renderCard(chit, completedContainer));
    }
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
    
    // Migrate linked statements to have a linkedRound if missing
    const linkedStatements = appState.statements.filter(s => s.linkedId === chit.id);
    linkedStatements.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let maxRound = 0;
    linkedStatements.forEach(s => {
        if (s.linkedRound && s.linkedRound > maxRound) {
            maxRound = s.linkedRound;
        }
    });
    
    let r = maxRound + 1;
    let modified = false;
    linkedStatements.forEach(s => {
        if (!s.linkedRound) {
            s.linkedRound = r++;
            modified = true;
        }
    });
    if (modified) saveState();
    
    const calcs = getChitCalculations(chit);
    const tbody = document.querySelector("#chit-ledger-table tbody");
    tbody.innerHTML = "";
    
    calcs.rounds.forEach(r => {
        const dateStr = (r.isPaid && r.paymentDate) ? formatDateDisplay(r.paymentDate) : `Due: ${formatDateDisplay(r.scheduledDate)}`;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span style="font-size: 11px; color: var(--text-muted);">${dateStr}</span></td>
            <td>Round ${r.bidNum}</td>
            <td>${formatCurr(r.installment)}</td>
            <td>${formatCurr(r.discount)}</td>
            <td style="font-weight: 700; color: var(--success);">${r.userReceived > 0 ? formatCurr(r.userReceived) : "-"}</td>
            <td>
                <span class="badge ${r.isPaid ? 'badge-income' : 'badge-pending'}">
                    ${r.isPaid ? 'Paid' : 'Pending'}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    document.getElementById("chit-ledger-modal").classList.add("active");
}

// -------------------------------------------------------------
// EMIs TAB
// -------------------------------------------------------------
function loadEMIsPage() {
    const activeTbody = document.querySelector("#emis-table tbody");
    const completedTbody = document.querySelector("#completed-emis-table tbody");
    if (!activeTbody || !completedTbody) return;
    
    activeTbody.innerHTML = "";
    completedTbody.innerHTML = "";
    
    let totalEmiAmount = 0;
    let totalEmiPrincipal = 0;
    const activeEmis = [];
    const completedEmis = [];
    
    appState.emis.forEach(e => {
        if (e.remainingMonths > 0) {
            activeEmis.push(e);
            totalEmiAmount += e.amount;
            totalEmiPrincipal += (e.amount * e.remainingMonths);
        } else {
            completedEmis.push(e);
        }
    });
    
    let totalCCOutstanding = 0;
    const balances = typeof getAccountBalances === "function" ? getAccountBalances() : {};
    appState.creditCards.forEach(cc => {
        totalCCOutstanding += Math.abs(balances[cc.name] || 0);
    });
    
    document.getElementById("emi-total-monthly").textContent = formatCurr(totalEmiAmount);
    
    const nextBillEl = document.getElementById("emi-cc-next-bill");
    if (nextBillEl) {
        nextBillEl.textContent = formatCurr(totalEmiAmount + totalCCOutstanding);
    }
    
    const totalObligEl = document.getElementById("emi-cc-total-obligations");
    if (totalObligEl) {
        totalObligEl.textContent = formatCurr(totalEmiPrincipal + totalCCOutstanding);
    }
    
    if (activeEmis.length === 0) {
        activeTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No active EMI loans found.</td></tr>`;
    } else {
        activeEmis.forEach(e => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${e.name}</strong></td>
                <td>${e.account}</td>
                <td>${e.bank}</td>
                <td>${formatCurr(e.amount)}</td>
                <td>${e.interestRate}%</td>
                <td>${e.remainingMonths} / ${e.tenureMonths} mos</td>
                <td style="text-align: right; white-space: nowrap;">
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px; margin-right: 4px;" onclick="promptEditEMI('${e.id}')">
                        <i class="ri-pencil-line"></i>
                    </button>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="deleteEMIItem('${e.id}')">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </td>
            `;
            activeTbody.appendChild(tr);
        });
    }

    if (completedEmis.length === 0) {
        completedTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No completed EMIs yet.</td></tr>`;
    } else {
        completedEmis.forEach(e => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${e.name}</strong></td>
                <td>${e.account}</td>
                <td>${e.bank}</td>
                <td>${formatCurr(e.amount)}</td>
                <td>${e.interestRate}%</td>
                <td><span class="badge" style="background-color: var(--success-light); color: var(--success);">Completed</span></td>
                <td style="text-align: right; white-space: nowrap;">
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px; margin-right: 4px;" onclick="promptEditEMI('${e.id}')">
                        <i class="ri-pencil-line"></i>
                    </button>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="deleteEMIItem('${e.id}')">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </td>
            `;
            completedTbody.appendChild(tr);
        });
    }

    const ccList = document.getElementById("cc-billing-list");
    if (ccList) {
        ccList.innerHTML = "";
        const balances = getAccountBalances();
        if (appState.creditCards.length === 0) {
            ccList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px;">No credit cards tracked.</div>`;
        } else {
            appState.creditCards.forEach(cc => {
                const outstanding = Math.abs(balances[cc.name] || 0);
                
                // Calculate EMI locks and next month bills
                let lockedByEmi = 0;
                let nextMonthEmiSum = 0;
                appState.emis.forEach(e => {
                    if (e.bank === cc.name && e.remainingMonths > 0) {
                        lockedByEmi += (e.amount * e.remainingMonths);
                        nextMonthEmiSum += e.amount;
                    }
                });
                const availableLimit = cc.limit - outstanding - lockedByEmi;
                
                const item = document.createElement("div");
                item.className = "reminder-item normal";
                item.innerHTML = `
                    <div class="reminder-info">
                        <div class="reminder-title" style="font-weight:700; display:flex; align-items:center; gap:12px;">
                            <span>${cc.name} (${cc.account})</span>
                            <span style="font-size:10px; color:var(--text-primary); cursor:pointer; padding:2px 8px; border:1px solid var(--border-color); border-radius:12px; background:rgba(255,255,255,0.05);" onclick="viewCCTransactions('${cc.id}')"><i class="ri-history-line"></i> View Stmt</span>
                        </div>
                        <div class="reminder-desc">Available Limit: <strong>${formatCurr(availableLimit)}</strong></div>
                        <div class="reminder-desc" style="font-size:11px; color:var(--text-muted);">
                            Limit: ${formatCurr(cc.limit)} | Outstanding: ${formatCurr(outstanding)} | EMI Locked: ${formatCurr(lockedByEmi)}
                        </div>
                        <div class="reminder-desc" style="font-size:10px; color:var(--text-muted);">Stmt Day: ${cc.statementDate}th | Due Day: ${cc.dueDate}th</div>
                    </div>
                    <div style="display:flex; gap:4px; align-items:center; flex-wrap:wrap; margin-top:8px;">
                        ${outstanding > 0 ? `<button class="btn btn-success" style="padding: 6px 10px; font-size: 11px;" onclick="triggerCreditCardPayment({id: '${cc.id}', name: '${cc.name}', account: '${cc.account}', outstandingAmount: ${outstanding}})"><i class="ri-check-line"></i> Pay Card</button>` : ""}
                        <button class="btn btn-primary" style="padding: 6px 10px; font-size: 11px;" onclick="generateCCBill('${cc.id}')"><i class="ri-receipt-line"></i> Bill EMIs</button>
                        <button class="btn btn-secondary" style="padding: 6px 10px; font-size: 11px;" onclick="promptEditCreditCard('${cc.id}')"><i class="ri-pencil-line"></i></button>
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
        
        // Scrub the ledger to remove historical EMI payments associated with this tracker
        appState.statements = appState.statements.filter(s => s.linkedId !== id);
        
        saveState();
        loadEMIsPage();
    }
}

window.generateCCBill = function(ccId) {
    const cc = appState.creditCards.find(c => c.id === ccId);
    let nextMonthEmiSum = 0;
    const activeEmis = [];
    
    appState.emis.forEach(e => {
        if (e.bank === cc.name && e.remainingMonths > 0) {
            nextMonthEmiSum += e.amount;
            activeEmis.push(e);
        }
    });
    
    if (nextMonthEmiSum === 0) {
        alert("No active EMIs linked to this Credit Card.");
        return;
    }
    
    if (confirm(`Generate an EMI bill for ${formatCurr(nextMonthEmiSum)} on ${cc.name}? This will add individual expenses for each EMI to your credit card and update their repayment progress.`)) {
        let timestamp = Date.now();
        activeEmis.forEach(e => {
            appState.statements.unshift({
                id: "t_" + (timestamp++),
                date: new Date().toISOString().slice(0, 10),
                account: cc.name,
                description: `EMI Billing: ${e.name}`,
                subCategory: "EMI",
                amount: -e.amount,
                type: "Expense",
                linkedId: e.id // This is crucial for saveState() to track repayment progress
            });
        });
        
        saveState();
        loadEMIsPage();
        loadDashboardPage();
    }
};

window.viewCCTransactions = function(ccId) {
    const cc = appState.creditCards.find(c => c.id === ccId);
    if (!cc) return;
    
    // Switch to expenses tab
    window.location.hash = "#expenses";
    
    setTimeout(() => {
        // Set the account filter
        const accSelect = document.getElementById("exp-filter-account");
        if (accSelect) {
            accSelect.value = cc.name;
        }
        
        // Calculate statement period
        const today = new Date();
        let fromDate = new Date(today.getFullYear(), today.getMonth() - 1, cc.statementDate + 1);
        let toDate = new Date(today.getFullYear(), today.getMonth(), cc.statementDate);
        
        if (today.getDate() <= cc.statementDate) {
            fromDate = new Date(today.getFullYear(), today.getMonth() - 2, cc.statementDate + 1);
            toDate = new Date(today.getFullYear(), today.getMonth() - 1, cc.statementDate);
        }
        
        const fromStr = new Date(fromDate.getTime() - (fromDate.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
        const toStr = new Date(toDate.getTime() - (toDate.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
        
        document.getElementById("exp-date-from").value = fromStr;
        document.getElementById("exp-date-to").value = toStr;
        
        filterExpensesTable();
    }, 100);
};

function deleteCCItem(id) {
    if (confirm("Are you sure you want to stop tracking this credit card? This will also remove any past transactions associated with it from the ledger.")) {
        const cc = appState.creditCards.find(c => c.id === id);
        
        if (cc) {
            // Delete all statements where this credit card was the source or destination account
            appState.statements = appState.statements.filter(s => s.account !== cc.name && s.toAccount !== cc.name);
            appState.creditCards = appState.creditCards.filter(c => c.id !== id);
        }
        
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
// ACCOUNT MANAGEMENT
// -------------------------------------------------------------
function renderAccountsSettings() {
    const list = document.getElementById("settings-accounts-list");
    if (!list) return;
    
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 12px;">';
    appState.accounts.forEach(acc => {
        html += `
            <div style="display:inline-flex; align-items:center; gap:8px; padding: 8px 14px; border-radius:var(--radius-md); background:var(--bg-card); border:1px solid var(--border-color); font-size:13px;">
                <span style="font-weight: 500;">${acc}</span>
                <div style="display:flex; gap:4px; margin-left:8px;">
                    <i class="ri-edit-line" style="cursor:pointer; color:var(--text-muted);" onclick="promptEditAccount('${acc}')" title="Rename Account"></i>
                    <i class="ri-close-circle-fill" style="cursor:pointer; color:var(--danger);" onclick="deleteAccount('${acc}')" title="Delete Account"></i>
                </div>
            </div>
        `;
    });
    html += '</div>';
    list.innerHTML = html;
}

window.promptAddAccount = function() {
    const newName = prompt("Enter new account name:");
    if (!newName) return;
    const trimmed = newName.trim();
    if (trimmed.length === 0) return;
    
    if (appState.accounts.includes(trimmed)) {
        alert("An account with this name already exists.");
        return;
    }
    
    appState.accounts.push(trimmed);
    saveState();
    populateAccountFilters();
    renderAccountsSettings();
};

window.promptEditAccount = function(oldName) {
    const newName = prompt(`Enter new name for account "${oldName}":`, oldName);
    if (!newName) return;
    const trimmed = newName.trim();
    if (trimmed.length === 0 || trimmed === oldName) return;
    
    if (appState.accounts.includes(trimmed)) {
        alert("An account with this name already exists.");
        return;
    }
    
    if (confirm(`Are you sure you want to rename "${oldName}" to "${trimmed}"?\n\nThis will automatically update ALL your historical transactions linking to this account.`)) {
        // Update the accounts list
        appState.accounts = appState.accounts.map(a => a === oldName ? trimmed : a);
        
        // Migrate transactions
        appState.statements.forEach(t => {
            if (t.account === oldName) t.account = trimmed;
            if (t.toAccount === oldName) t.toAccount = trimmed;
        });
        
        saveState();
        populateAccountFilters();
        renderAccountsSettings();
        alert(`Successfully renamed account to "${trimmed}".`);
    }
};

window.deleteAccount = function(acc) {
    const affected = appState.statements.filter(t => t.account === acc || t.toAccount === acc);
    if (affected.length > 0) {
        alert(`Cannot delete account "${acc}" because it is used in ${affected.length} historical transactions.\n\nPlease rename it instead, or delete those transactions first.`);
        return;
    }
    
    if (confirm(`Are you sure you want to delete the account "${acc}"?`)) {
        appState.accounts = appState.accounts.filter(a => a !== acc);
        saveState();
        populateAccountFilters();
        renderAccountsSettings();
    }
};

// -------------------------------------------------------------
// SETTINGS TAB
// -------------------------------------------------------------
function loadSettingsPage() {
    renderAccountsSettings();

    // Populate GitHub Sync Fields
    if (appState.githubSync) {
        if (document.getElementById("github-username")) document.getElementById("github-username").value = appState.githubSync.username || "";
        if (document.getElementById("github-repo")) document.getElementById("github-repo").value = appState.githubSync.repo || "";
        if (document.getElementById("github-token")) document.getElementById("github-token").value = appState.githubSync.token || "";
        if (document.getElementById("github-path")) document.getElementById("github-path").value = appState.githubSync.path || "appState.json";
        
        if (appState.githubSync.token) {
            document.getElementById("btn-force-sync").style.display = "inline-flex";
        }
    }

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
                const isProtected = PROTECTED_CATEGORIES.includes(sub);
                const isDeactivated = appState.settings.deactivatedCategories.includes(sub);
                const opacity = isDeactivated ? "0.5" : "1";
                const eyeIcon = isDeactivated ? "ri-eye-off-line" : "ri-eye-line";
                
                let actionsHtml = `<i class="${eyeIcon}" style="cursor:pointer; color:var(--text-muted); margin-right:4px;" onclick="toggleCategoryActivation('${sub}')" title="${isDeactivated ? 'Activate' : 'Deactivate'}"></i>`;
                if (!isProtected) {
                    actionsHtml += `<i class="ri-close-circle-fill" style="cursor:pointer; color:var(--danger);" onclick="deleteSubcategorySetting('${group}', '${cat}', '${sub}')" title="Delete"></i>`;
                }
                
                subcatsHtml += `
                    <div style="display:inline-flex; align-items:center; gap:8px; padding: 6px 12px; border-radius:var(--radius-sm); background:rgba(255,255,255,0.03); border:1px solid var(--border-color); font-size:12px; opacity:${opacity}; transition: opacity 0.2s;">
                        <span>${sub}</span>
                        <div style="display:flex; gap:4px;">${actionsHtml}</div>
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
    document.getElementById("settings-theme-select").value = appState.settings.theme || "dark";
}

function updateSettingsConfig() {
    appState.settings.currency = document.getElementById("settings-currency-select").value;
    appState.settings.theme = document.getElementById("settings-theme-select").value;
    
    document.documentElement.setAttribute("data-theme", appState.settings.theme);
    saveState();
    alert("Settings updated successfully!");
    window.location.hash = "#dashboard";
}

function toggleCategoryActivation(sub) {
    if (appState.settings.deactivatedCategories.includes(sub)) {
        appState.settings.deactivatedCategories = appState.settings.deactivatedCategories.filter(c => c !== sub);
    } else {
        appState.settings.deactivatedCategories.push(sub);
    }
    saveState();
    loadSettingsPage();
}

function deleteSubcategorySetting(group, cat, sub) {
    if (PROTECTED_CATEGORIES.includes(sub)) {
        alert("This is a core system category and cannot be deleted. You can deactivate it if you don't want to see it.");
        return;
    }
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

function getAccountBalances() {
    let balances = {};
    appState.accounts.forEach(a => balances[a] = 0);
    if (appState.creditCards) {
        appState.creditCards.forEach(cc => balances[cc.name] = -(cc.outstandingAmount || 0));
    }
    appState.statements.forEach(t => {
        if (balances[t.account] !== undefined) {
            if (t.type === "Income") balances[t.account] += Math.abs(t.amount);
            else if (t.type === "Expense" || t.type === "Savings") balances[t.account] -= Math.abs(t.amount);
            else if (t.type === "Transfer") balances[t.account] -= Math.abs(t.amount);
        }
        if (t.type === "Transfer" && t.toAccount && balances[t.toAccount] !== undefined) {
            balances[t.toAccount] += Math.abs(t.amount);
        }
    });
    return balances;
}

function populateAccountDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    const balances = getAccountBalances();
    const currentVal = select.value;
    
    select.innerHTML = "";
    
    // Regular Accounts
    select.innerHTML += `<optgroup label="Bank / Cash">`;
    appState.accounts.forEach(acc => {
        const bal = balances[acc] || 0;
        const formattedBal = formatCurr(Math.abs(bal));
        const sign = bal < 0 ? "-" : "";
        select.innerHTML += `<option value="${acc}">${acc} (${sign}₹${formattedBal})</option>`;
    });
    select.innerHTML += `</optgroup>`;
    
    // Credit Cards
    if (appState.creditCards && appState.creditCards.length > 0) {
        select.innerHTML += `<optgroup label="Credit Cards">`;
        appState.creditCards.forEach(cc => {
            const bal = balances[cc.name] || 0;
            const formattedBal = formatCurr(Math.abs(bal));
            const sign = bal < 0 ? "-" : "";
            select.innerHTML += `<option value="${cc.name}">${cc.name} (${sign}₹${formattedBal})</option>`;
        });
        select.innerHTML += `</optgroup>`;
    }
    
    const allAccounts = appState.accounts.concat((appState.creditCards || []).map(c => c.name));
    if (currentVal && allAccounts.includes(currentVal)) {
        select.value = currentVal;
    }
}

function openTransactionModal(options = {}) {
    const modal = document.getElementById("transaction-modal");
    const select = document.getElementById("tx-subcategory");
    
    populateAccountDropdown("tx-account");
    document.getElementById("tx-account").value = options.account || "Gowtham";
    document.getElementById("tx-date").value = options.date || new Date().toISOString().slice(0, 10);
    document.getElementById("tx-description").value = options.description || "";
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
    
    // This populates tx-subcategory based on tx-type
    handleTxTypeChange(options.linkedId);
    
    // Restore the subCategory if provided
    if (options.subCategory) {
        select.value = options.subCategory;
        updateLinkedItemDropdown(options.subCategory, options.linkedId);
    }
    
    if (options.type === "Transfer" && options.toAccount) {
        document.getElementById("tx-to-account").value = options.toAccount;
    }
    
    transactionModalCallback = options.onSuccess || null;
    modal.classList.add("active");
}

function handleTxTypeChange(prefillLinkedId = null) {
    const type = document.getElementById("tx-type").value;
    const toAccountGroup = document.getElementById("tx-to-account-group");
    const linkedGroup = document.getElementById("tx-linked-item-group");
    const select = document.getElementById("tx-subcategory");
    
    const currentSubCat = select.value;
    
    if (type === "Transfer") {
        toAccountGroup.classList.remove("hidden");
        linkedGroup.classList.add("hidden");
        select.innerHTML = `<option value="Self Transfer">-- Self Transfer --</option>`;
        populateAccountDropdown("tx-to-account");
    } else {
        toAccountGroup.classList.add("hidden");
        select.innerHTML = `<option value="">-- Select Category --</option>` + buildCategoryOptgroupOptions(currentSubCat, type);
        const subCat = select.value;
        const currentLinked = prefillLinkedId || document.getElementById("tx-linked-item").value;
        updateLinkedItemDropdown(subCat, currentLinked);
    }
}

function getCategoryType(subCategoryName) {
    if (!subCategoryName) return null;
    for (const type in appState.categories) {
        for (const group in appState.categories[type]) {
            if (appState.categories[type][group].includes(subCategoryName)) {
                return type;
            }
        }
    }
    return null;
}

function updateLinkedItemDropdown(selectedSubCategory, selectedLinkedId = "") {
    const group = document.getElementById("tx-linked-item-group");
    const linkedSelect = document.getElementById("tx-linked-item");
    const label = document.getElementById("tx-linked-item-label");
    
    if (!group || !linkedSelect) return;
    
    const loanSubcats = ["Credit Cards", "Other Loans", "Lent to Others", "Borrow Repayment", "Borrowed From", "Lent Repayment"];
    const chitSubcats = ["Recurring Investments"];
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
    
    linkedSelect.onchange = function() {
        const roundGroup = document.getElementById("tx-linked-round-group");
        const roundSelect = document.getElementById("tx-linked-round");
        const val = this.value;
        if (val && val.startsWith("ch_")) {
            const chit = appState.chits.find(c => c.id === val);
            if (chit) {
                roundSelect.innerHTML = `<option value="">-- Auto --</option>`;
                
                const paidRounds = new Set(
                    appState.statements
                        .filter(s => s.linkedId === chit.id && s.linkedRound)
                        .map(s => s.linkedRound)
                );
                
                if (typeof _editingTransactionId !== 'undefined' && _editingTransactionId) {
                    const tx = appState.statements.find(t => t.id === _editingTransactionId);
                    if (tx && tx.linkedId === chit.id && tx.linkedRound) {
                        paidRounds.delete(tx.linkedRound);
                    }
                }
                
                for (let i = 1; i <= chit.members; i++) {
                    if (!paidRounds.has(i)) {
                        roundSelect.innerHTML += `<option value="${i}">Round ${i}</option>`;
                    }
                }
                roundGroup.classList.remove("hidden");
                return;
            }
        }
        roundGroup.classList.add("hidden");
        roundSelect.innerHTML = `<option value="">-- Auto --</option>`;
    };
    
    // Trigger onchange to initialize the round dropdown visibility
    if (selectedLinkedId) {
        linkedSelect.onchange();
        // If we have an editing transaction, try to pre-fill the round
        if (typeof _editingTransactionId !== 'undefined' && _editingTransactionId) {
            const tx = appState.statements.find(t => t.id === _editingTransactionId);
            if (tx && tx.linkedRound) {
                document.getElementById("tx-linked-round").value = tx.linkedRound;
            }
        }
    } else {
        document.getElementById("tx-linked-round-group").classList.add("hidden");
    }
}

function saveTransactionEntry() {
    const account = document.getElementById("tx-account").value;
    const date = document.getElementById("tx-date").value;
    let desc = document.getElementById("tx-description").value.trim();
    const subcat = document.getElementById("tx-subcategory").value;
    const rawAmt = parseAmountStr(document.getElementById("tx-amount").value);
    const type = document.getElementById("tx-type").value;
    const linkedId = document.getElementById("tx-linked-item")?.value;
    
    if (!desc && subcat === "Recurring Investments" && linkedId && linkedId.startsWith("ch_")) {
        const chit = appState.chits.find(c => c.id === linkedId);
        const linkedRoundVal = document.getElementById("tx-linked-round")?.value;
        if (chit) {
            desc = `${chit.name} - Round ${linkedRoundVal || "Auto"}`;
        }
    }
    
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
    
    // linkedId is already captured above
    
    let toAccount = null;
    let finalSubcat = subcat;
    
    if (type === "Transfer") {
        toAccount = document.getElementById("tx-to-account").value;
        if (!toAccount) {
            alert("Please select a destination account for the transfer.");
            return;
        }
        if (account === toAccount) {
            alert("Cannot transfer to the same account.");
            return;
        }
        finalSubcat = "Self Transfer";
    }
    
    const txId = _editingTransactionId || ("s_" + Date.now());
    
    const linkedRoundVal = document.getElementById("tx-linked-round")?.value;
    const linkedRound = linkedRoundVal ? parseInt(linkedRoundVal) : null;
    
    appState.statements.unshift({
        id: txId,
        account,
        toAccount,
        date,
        description: desc,
        subCategory: finalSubcat,
        amount,
        type,
        linkedId: linkedId || null,
        linkedRound
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
            // we don't modify chit bids anymore based on statement
        } else if (oldLinkedId.startsWith("debt_")) {
            const debt = appState.debts.find(d => d.id === oldLinkedId);
            if (debt) {
                debt.repayments = debt.repayments.filter(r => r.id !== _editingTransactionId);
            }
        }
    }
    
    // 2. Apply the new link if it's newly added or changed
    if (linkedId && linkedId !== oldLinkedId) {
        if (linkedId.startsWith("debt_")) {
            const debt = appState.debts.find(d => d.id === linkedId);
            if (debt) {
                debt.repayments.push({ id: txId, date, account, amount: rawAmt });
            }
        } else if (linkedId.startsWith("emi_")) {
            const emi = appState.emis.find(e => e.id === linkedId);
            if (emi) {
                emi.remainingMonths = Math.max(0, emi.remainingMonths - 1);
            }
        } else if (linkedId.startsWith("chit_")) {
            // No bid modification needed here anymore
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

let _editingDebtId = null;

function promptEditDebt(id) {
    const debt = appState.debts.find(d => d.id === id);
    if (!debt) return;
    
    _editingDebtId = id;
    document.getElementById("debt-add-type").value = debt.type;
    document.getElementById("debt-add-title").textContent = debt.type === "Lent" ? "Edit Money Lent" : "Edit Money Borrowed";
    document.getElementById("debt-add-date").value = debt.date;
    document.getElementById("debt-add-person").value = debt.person;
    document.getElementById("debt-add-account").value = debt.account;
    document.getElementById("debt-add-amount").value = formatCurr(debt.amount);
    document.getElementById("debt-add-remarks").value = debt.remarks || "";
    
    document.getElementById("debt-add-modal").classList.add("active");
}

function openDebtModal(type) {
    _editingDebtId = null;
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
    
    if (_editingDebtId) {
        const debt = appState.debts.find(d => d.id === _editingDebtId);
        if (debt) {
            debt.type = type;
            debt.account = account;
            debt.date = date;
            debt.person = person;
            debt.categoryTag = tag;
            debt.amount = amount;
            debt.remarks = remarks;
            
            // Sync the underlying transaction (so account balances update)
            const linkedStatement = appState.statements.find(s => s.id === ("s_" + debt.id));
            if (linkedStatement) {
                const isLent = type === "Lent";
                linkedStatement.account = account;
                linkedStatement.date = date;
                linkedStatement.description = `${type} ${isLent ? 'to' : 'from'} ${person}: ${remarks}`;
                linkedStatement.subCategory = tag;
                linkedStatement.amount = isLent ? -amount : amount;
                linkedStatement.type = isLent ? "Expense" : "Income";
            }
        }
    } else {
        const debtId = "debt_" + Date.now();
        appState.debts.unshift({
            id: debtId,
            type,
            account,
            date,
            person,
            categoryTag: tag,
            amount,
            remarks,
            repayments: []
        });
        
        // Log the initial transaction for cash flow and net worth
        const isLent = type === "Lent";
        appState.statements.unshift({
            id: "s_" + debtId,
            account: account,
            date: date,
            description: `${type} ${isLent ? 'to' : 'from'} ${person}: ${remarks}`,
            subCategory: tag,
            amount: isLent ? -amount : amount,
            type: isLent ? "Expense" : "Income",
            linkedId: debtId
        });
    }
    
    _editingDebtId = null;
    saveState();
    closeAllModals();
    loadDebtsPage();
}

let _editingChitId = null;

function promptEditChit(id) {
    const chit = appState.chits.find(c => c.id === id);
    if (!chit) return;
    
    _editingChitId = id;
    document.getElementById("chit-add-name").value = chit.name;
    document.getElementById("chit-add-date").value = chit.startDate;
    
    const isFixed = chit.members > 0;
    document.getElementById("chit-is-fixed-target").checked = isFixed;
    
    if (isFixed) {
        document.getElementById("chit-add-value").value = formatCurr(chit.totalValue);
        document.getElementById("chit-add-members").value = chit.members;
        document.getElementById("chit-add-freq").value = chit.freqMonths;
        document.getElementById("chit-add-monthly").value = "";
    } else {
        document.getElementById("chit-add-monthly").value = chit.monthlyAmount ? formatCurr(chit.monthlyAmount) : "";
        document.getElementById("chit-add-value").value = "200000";
        document.getElementById("chit-add-members").value = "10";
        document.getElementById("chit-add-freq").value = "1";
    }
    
    toggleChitType();
    
    const modal = document.getElementById("chit-add-modal");
    modal.querySelector(".modal-title").textContent = "Edit Recurring Investment";
    modal.classList.add("active");
}

function openChitAddModal() {
    _editingChitId = null;
    document.getElementById("chit-add-date").value = new Date().toISOString().slice(0, 10);
    document.getElementById("chit-add-name").value = "";
    document.getElementById("chit-add-value").value = "200000";
    document.getElementById("chit-add-members").value = "10";
    document.getElementById("chit-add-freq").value = "1";
    document.getElementById("chit-add-monthly").value = "";
    
    document.getElementById("chit-is-fixed-target").checked = true;
    toggleChitType();
    
    const modal = document.getElementById("chit-add-modal");
    modal.querySelector(".modal-title").textContent = "Add Recurring Investment";
    modal.classList.add("active");
}

function toggleChitType() {
    const isFixed = document.getElementById("chit-is-fixed-target").checked;
    document.getElementById("chit-fixed-fields").style.display = isFixed ? "block" : "none";
    document.getElementById("chit-open-fields").style.display = isFixed ? "none" : "block";
}

function saveChitEntry() {
    const name = document.getElementById("chit-add-name").value.trim();
    const date = document.getElementById("chit-add-date").value;
    const isFixed = document.getElementById("chit-is-fixed-target").checked;
    
    let value = 0, members = 0, freq = 1, monthlyAmount = 0;
    
    if (isFixed) {
        value = parseAmountStr(document.getElementById("chit-add-value").value);
        members = parseInt(document.getElementById("chit-add-members").value);
        freq = parseInt(document.getElementById("chit-add-freq").value);
        if (isNaN(value) || isNaN(members) || isNaN(freq)) {
            alert("Please fill all fixed target inputs.");
            return;
        }
    } else {
        const mStr = document.getElementById("chit-add-monthly").value;
        if (mStr) monthlyAmount = parseAmountStr(mStr);
    }
    
    if (!name || !date) {
        alert("Please provide a name and start date.");
        return;
    }
    
    if (_editingChitId) {
        const chit = appState.chits.find(c => c.id === _editingChitId);
        if (chit) {
            chit.name = name;
            chit.startDate = date;
            chit.totalValue = value;
            chit.members = members;
            chit.freqMonths = freq;
            chit.monthlyAmount = monthlyAmount;
        }
    } else {
        appState.chits.push({
            id: "ch_" + Date.now(),
            name,
            totalValue: value,
            members,
            freqMonths: freq,
            startDate: date,
            monthlyAmount: monthlyAmount,
            bids: []
        });
    }
    
    saveState();
    closeAllModals();
    loadChitsPage();
}

let _editingEMIId = null;

function promptEditEMI(id) {
    const emi = appState.emis.find(e => e.id === id);
    if (!emi) return;
    
    _editingEMIId = id;
    document.getElementById("emi-add-name").value = emi.name;
    document.getElementById("emi-add-account").value = emi.account;
    populateAccountDropdown("emi-add-bank");
    document.getElementById("emi-add-bank").value = emi.bank;
    document.getElementById("emi-add-amount").value = formatCurr(emi.amount);
    document.getElementById("emi-add-rate").value = emi.interestRate;
    document.getElementById("emi-add-tenure").value = emi.tenureMonths;
    document.getElementById("emi-add-date").value = emi.startDate;
    
    const modal = document.getElementById("emi-add-modal");
    modal.querySelector(".modal-title").textContent = "Edit EMI Tracker";
    modal.classList.add("active");
}

function openEMIAddModal() {
    _editingEMIId = null;
    document.getElementById("emi-add-date").value = new Date().toISOString().slice(0, 10);
    document.getElementById("emi-add-name").value = "";
    populateAccountDropdown("emi-add-bank");
    document.getElementById("emi-add-bank").value = "";
    document.getElementById("emi-add-amount").value = "";
    document.getElementById("emi-add-rate").value = "";
    document.getElementById("emi-add-tenure").value = "";
    
    const modal = document.getElementById("emi-add-modal");
    modal.querySelector(".modal-title").textContent = "Add EMI Tracker";
    modal.classList.add("active");
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
    
    if (_editingEMIId) {
        const emi = appState.emis.find(e => e.id === _editingEMIId);
        if (emi) {
            emi.name = name;
            emi.account = account;
            emi.bank = bank;
            emi.amount = amount;
            emi.interestRate = rate;
            emi.tenureMonths = tenure;
            emi.startDate = date;
        }
    } else {
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
    }
    
    saveState();
    closeAllModals();
    loadEMIsPage();
}

let _editingCCId = null;

function promptEditCreditCard(id) {
    const cc = appState.creditCards.find(c => c.id === id);
    if (!cc) return;
    
    _editingCCId = id;
    document.getElementById("cc-add-name").value = cc.name;
    document.getElementById("cc-add-account").value = cc.account;
    document.getElementById("cc-add-limit").value = formatCurr(cc.limit);
    document.getElementById("cc-add-stmt").value = cc.statementDate;
    document.getElementById("cc-add-due").value = cc.dueDate;
    document.getElementById("cc-add-outstanding").value = formatCurr(cc.outstandingAmount || 0);
    
    const modal = document.getElementById("cc-add-modal");
    modal.querySelector(".modal-title").textContent = "Edit Credit Card";
    modal.classList.add("active");
}

function openCCAddModal() {
    _editingCCId = null;
    document.getElementById("cc-add-name").value = "";
    document.getElementById("cc-add-limit").value = "";
    document.getElementById("cc-add-stmt").value = "15";
    document.getElementById("cc-add-due").value = "5";
    document.getElementById("cc-add-outstanding").value = "0";
    
    const modal = document.getElementById("cc-add-modal");
    modal.querySelector(".modal-title").textContent = "Track Credit Card Dues";
    modal.classList.add("active");
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
    
    if (_editingCCId) {
        const cc = appState.creditCards.find(c => c.id === _editingCCId);
        if (cc) {
            cc.name = name;
            cc.account = account;
            cc.limit = limit;
            cc.statementDate = stmt;
            cc.dueDate = due;
            cc.outstandingAmount = outstanding;
        }
    } else {
        appState.creditCards.push({
            id: "cc_" + Date.now(),
            name,
            account,
            limit,
            statementDate: stmt,
            dueDate: due,
            outstandingAmount: outstanding
        });
    }
    
    saveState();
    closeAllModals();
    loadDashboardPage();
    loadEMIsPage();
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

// -------------------------------------------------------------
// TRADING JOURNAL LOGIC
// -------------------------------------------------------------
function getTradingPositions() {
    if (!appState.trades) return [];
    let executions = [...appState.trades].sort((a, b) => new Date(a.date) - new Date(b.date));
    let positions = [];
    let symbolMap = {}; 
    
    executions.forEach(exec => {
        let sym = exec.symbol;
        if (!symbolMap[sym]) symbolMap[sym] = { openBuys: [], openSells: [] };
        
        let map = symbolMap[sym];
        let remainingQty = exec.quantity;
        
        if (exec.type === "buy") {
            while (remainingQty > 0 && map.openSells.length > 0) {
                let s = map.openSells[0];
                let matchedQty = Math.min(remainingQty, s.quantity);
                let isIntraday = (s.date === exec.date);
                positions.push({
                    symbol: sym,
                    type: isIntraday ? "Intraday" : "Positional",
                    entryDate: s.date,
                    exitDate: exec.date,
                    qty: matchedQty,
                    buyPrice: exec.price,
                    sellPrice: s.price,
                    pnl: (s.price - exec.price) * matchedQty,
                    returnPct: ((s.price - exec.price) / exec.price) * 100,
                    status: "Closed",
                    target: s.target || exec.target || "",
                    remarks: s.remarks || exec.remarks || "",
                    currentPrice: "",
                    execIds: s.id && exec.id ? [s.id, exec.id] : []
                });
                s.quantity -= matchedQty;
                remainingQty -= matchedQty;
                if (s.quantity <= 0) map.openSells.shift();
            }
            if (remainingQty > 0) {
                map.openBuys.push({ ...exec, quantity: remainingQty });
            }
        } else if (exec.type === "sell") {
            while (remainingQty > 0 && map.openBuys.length > 0) {
                let b = map.openBuys[0];
                let matchedQty = Math.min(remainingQty, b.quantity);
                let isIntraday = (b.date === exec.date);
                positions.push({
                    symbol: sym,
                    type: isIntraday ? "Intraday" : "Positional",
                    entryDate: b.date,
                    exitDate: exec.date,
                    qty: matchedQty,
                    buyPrice: b.price,
                    sellPrice: exec.price,
                    pnl: (exec.price - b.price) * matchedQty,
                    returnPct: ((exec.price - b.price) / b.price) * 100,
                    status: "Closed",
                    target: b.target || exec.target || "",
                    remarks: b.remarks || exec.remarks || "",
                    currentPrice: "",
                    execIds: b.id && exec.id ? [b.id, exec.id] : []
                });
                b.quantity -= matchedQty;
                remainingQty -= matchedQty;
                if (b.quantity <= 0) map.openBuys.shift();
            }
            if (remainingQty > 0) {
                map.openSells.push({ ...exec, quantity: remainingQty });
            }
        }
    });
    
    for (let sym in symbolMap) {
        let map = symbolMap[sym];
        
        if (map.openBuys.length > 0) {
            let totalQty = 0;
            let totalCost = 0;
            let execIds = [];
            map.openBuys.forEach(b => {
                totalQty += b.quantity;
                totalCost += (b.price * b.quantity);
                if (b.id) execIds.push(b.id);
            });
            let avgBuy = totalCost / totalQty;
            let currentPrice = map.openBuys[0].currentPrice || "";
            let pnl = 0;
            let returnPct = 0;
            if (currentPrice) {
                pnl = (parseFloat(currentPrice) - avgBuy) * totalQty;
                returnPct = ((parseFloat(currentPrice) - avgBuy) / avgBuy) * 100;
            }
            
            positions.push({
                symbol: sym,
                type: "Positional",
                entryDate: map.openBuys[0].date,
                exitDate: "-",
                qty: totalQty,
                buyPrice: avgBuy,
                sellPrice: 0,
                pnl: pnl,
                returnPct: returnPct,
                status: "Open",
                target: map.openBuys[0].target || "",
                remarks: map.openBuys[0].remarks || "",
                currentPrice: currentPrice,
                execIds: execIds
            });
        }
        
        if (map.openSells.length > 0) {
            let totalQty = 0;
            let totalCost = 0;
            let execIds = [];
            map.openSells.forEach(s => {
                totalQty += s.quantity;
                totalCost += (s.price * s.quantity);
                if (s.id) execIds.push(s.id);
            });
            let avgSell = totalCost / totalQty;
            let currentPrice = map.openSells[0].currentPrice || "";
            let pnl = 0;
            let returnPct = 0;
            if (currentPrice) {
                pnl = (avgSell - parseFloat(currentPrice)) * totalQty;
                returnPct = ((avgSell - parseFloat(currentPrice)) / avgSell) * 100;
            }
            
            positions.push({
                symbol: sym,
                type: "Positional",
                entryDate: map.openSells[0].date,
                exitDate: "-",
                qty: totalQty,
                buyPrice: 0,
                sellPrice: avgSell,
                pnl: pnl,
                returnPct: returnPct,
                status: "Open",
                target: map.openSells[0].target || "",
                remarks: map.openSells[0].remarks || "",
                currentPrice: currentPrice,
                execIds: execIds
            });
        }
    }
    
    positions.sort((a, b) => {
        let dA = a.exitDate === "-" ? a.entryDate : a.exitDate;
        let dB = b.exitDate === "-" ? b.entryDate : b.exitDate;
        return new Date(dB) - new Date(dA);
    });
    
    return positions;
}

window.clearTradingFilters = function() {
    if (document.getElementById("trade-filter-type")) document.getElementById("trade-filter-type").value = "All";
    if (document.getElementById("trade-filter-status")) document.getElementById("trade-filter-status").value = "All";
    if (document.getElementById("trade-filter-symbol")) document.getElementById("trade-filter-symbol").value = "";
    if (document.getElementById("trade-filter-date")) document.getElementById("trade-filter-date").value = "";
    loadTradingPage();
};

window.exportTradesCSV = function() {
    const filterType = document.getElementById("trade-filter-type") ? document.getElementById("trade-filter-type").value : "All";
    const filterStatus = document.getElementById("trade-filter-status") ? document.getElementById("trade-filter-status").value : "All";
    const filterSymbol = document.getElementById("trade-filter-symbol") ? document.getElementById("trade-filter-symbol").value.toLowerCase() : "";
    const filterDate = document.getElementById("trade-filter-date") ? document.getElementById("trade-filter-date").value : "";
    
    let positions = getTradingPositions();
    let filtered = positions.filter(p => {
        let typeMatch = filterType === "All" || p.type === filterType;
        let statusMatch = filterStatus === "All" || p.status === filterStatus;
        let symbolMatch = filterSymbol === "" || p.symbol.toLowerCase().includes(filterSymbol);
        let dateMatch = filterDate === "" || (p.entryDate && p.entryDate.startsWith(filterDate)) || (p.exitDate && p.exitDate.startsWith(filterDate));
        return typeMatch && statusMatch && symbolMatch && dateMatch;
    });
    
    if (filtered.length === 0) {
        alert("No trades to export based on current filters.");
        return;
    }
    
    let csv = "Symbol,Type,Status,Entry Date,Entry Price,Quantity,Current/Exit Price,Exit Date,Realized PnL,Unrealized PnL\n";
    filtered.forEach(p => {
        const pnl = p.status === "Closed" ? p.realizedPnl : 0;
        const unrealizedPnl = p.status === "Open" ? ((parseFloat(p.currentPrice || p.buyPrice) - p.buyPrice) * p.qty) : 0;
        const curPrice = p.status === "Closed" ? (p.sellPrice || p.currentPrice || "") : (p.currentPrice || p.buyPrice);
        
        csv += `"${p.symbol}","${p.type}","${p.status}","${p.entryDate || ""}","${p.buyPrice}","${p.qty}","${curPrice}","${p.exitDate || ""}","${pnl}","${unrealizedPnl}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `trading_journal_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.toggleTradingNetworth = function() {
    const cb = document.getElementById("trade-networth-toggle");
    if (!appState.settings) appState.settings = {};
    appState.settings.includeTradingInNetworth = cb.checked;
    saveState();
    if (typeof loadDashboardPage === "function") loadDashboardPage();
};

function loadTradingPage() {
    if (!appState.trades) appState.trades = [];
    
    const cb = document.getElementById("trade-networth-toggle");
    if (cb) {
        cb.checked = (appState.settings && appState.settings.includeTradingInNetworth !== undefined) 
            ? appState.settings.includeTradingInNetworth 
            : true;
    }
    
    const filterType = document.getElementById("trade-filter-type") ? document.getElementById("trade-filter-type").value : "All";
    const filterStatus = document.getElementById("trade-filter-status") ? document.getElementById("trade-filter-status").value : "All";
    const filterSymbol = document.getElementById("trade-filter-symbol") ? document.getElementById("trade-filter-symbol").value.toLowerCase() : "";
    const filterDate = document.getElementById("trade-filter-date") ? document.getElementById("trade-filter-date").value : "";
    
    let positions = getTradingPositions();
    
    // Apply Filters
    let filtered = positions.filter(p => {
        let typeMatch = filterType === "All" || p.type === filterType;
        let statusMatch = filterStatus === "All" || p.status === filterStatus;
        let symbolMatch = filterSymbol === "" || p.symbol.toLowerCase().includes(filterSymbol);
        let dateMatch = filterDate === "" || (p.entryDate && p.entryDate.startsWith(filterDate)) || (p.exitDate && p.exitDate.startsWith(filterDate));
        return typeMatch && statusMatch && symbolMatch && dateMatch;
    });
    
    // Calculate Summary Metrics
    let totalTrades = 0;
    let openPositions = 0;
    let winCount = 0;
    let lossCount = 0;
    let totalPnl = 0;
    let currentHolding = 0;
    
    filtered.forEach(p => {
        totalTrades++;
        if (p.status === "Open") {
            openPositions++;
            if (p.buyPrice > 0) {
                currentHolding += (p.qty * p.buyPrice);
            } else if (p.sellPrice > 0) {
                currentHolding += (p.qty * p.sellPrice);
            }
        } else if (p.status === "Closed") {
            totalPnl += p.pnl;
            if (p.pnl >= 0) winCount++;
            else lossCount++;
        }
    });
    
    let closedTrades = winCount + lossCount;
    let winRate = closedTrades > 0 ? ((winCount / closedTrades) * 100).toFixed(1) : 0;
    
    // Update DOM
    if (document.getElementById("trade-total-count")) document.getElementById("trade-total-count").textContent = totalTrades;
    if (document.getElementById("trade-open-count")) document.getElementById("trade-open-count").textContent = openPositions;
    if (document.getElementById("trade-current-holding")) document.getElementById("trade-current-holding").textContent = formatCurr(currentHolding);
    if (document.getElementById("trade-win-rate")) document.getElementById("trade-win-rate").textContent = winRate + "%";
    
    let returnCard = document.getElementById("trade-return-card");
    let returnVal = document.getElementById("trade-overall-return");
    if (returnCard && returnVal) {
        returnVal.textContent = formatCurr(totalPnl);
        returnVal.style.color = totalPnl >= 0 ? "var(--success)" : "var(--danger)";
        returnCard.style.setProperty("--card-accent", totalPnl >= 0 ? "var(--success)" : "var(--danger)");
    }
    
    // Render Table
    const tbody = document.querySelector("#trading-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: var(--text-muted); padding: 30px;">No trades match the selected filters. Use the Excel Wizard to import a Zerodha Tradebook.</td></tr>`;
        return;
    }
    
    filtered.forEach(p => {
        const tr = document.createElement("tr");
        let pnlColor = p.pnl >= 0 ? "var(--success)" : "var(--danger)";
        if (p.status === "Open") pnlColor = "var(--text-color)";
        
        tr.innerHTML = `
            <td><strong>${p.symbol}</strong></td>
            <td><span class="badge" style="background: ${p.type === 'Intraday' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)'}; color: ${p.type === 'Intraday' ? '#f59e0b' : '#3b82f6'}; border: 1px solid ${p.type === 'Intraday' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)'};">${p.type}</span></td>
            <td>${formatDateDisplay(p.entryDate)}</td>
            <td>${p.exitDate === "-" ? "-" : formatDateDisplay(p.exitDate)}</td>
            <td style="text-align: right;">${p.qty}</td>
            <td style="text-align: right;">${p.buyPrice > 0 ? formatCurr(p.buyPrice) : "-"}</td>
            <td style="text-align: right;">${p.sellPrice > 0 ? formatCurr(p.sellPrice) : "-"}</td>
            <td style="text-align: right;">
                ${p.status === "Open" ? `<input type="number" step="0.05" class="form-control" style="width:80px; padding: 4px; font-size: 12px; display: inline-block;" value="${p.currentPrice || ''}" onchange="updateTradeField('${p.execIds[0]}', 'currentPrice', this.value)" placeholder="LTP">` : '-'}
            </td>
            <td style="text-align: right; font-weight: 600; color: ${pnlColor}">${p.status === "Open" && !p.currentPrice ? "-" : formatCurr(p.pnl)}</td>
            <td style="text-align: right; color: ${pnlColor}">${p.status === "Open" && !p.currentPrice ? "-" : p.returnPct.toFixed(2) + "%"}</td>
            <td style="text-align: right;">
                <input type="number" step="0.05" class="form-control" style="width:80px; padding: 4px; font-size: 12px; display: inline-block;" value="${p.target || ''}" onchange="updateTradeField('${p.execIds[0]}', 'target', this.value)" placeholder="Target">
            </td>
            <td>
                <input type="text" class="form-control" style="width:120px; padding: 4px; font-size: 12px; display: inline-block;" value="${p.remarks || ''}" onchange="updateTradeField('${p.execIds[0]}', 'remarks', this.value)" placeholder="Remarks">
            </td>
            <td style="text-align: center;"><span class="badge" style="background:${p.status === 'Open' ? 'var(--warning)' : 'var(--bg-surface)'}; border: 1px solid ${p.status === 'Open' ? 'transparent' : 'var(--border-color)'}">${p.status}</span></td>
            <td style="text-align: center;">
                <div style="display:flex; justify-content:center; gap:5px;">
                    <button class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="openTradeModal('${p.execIds ? p.execIds[0] : ''}')" title="Edit">
                        <i class="ri-edit-line"></i>
                    </button>
                    <button class="btn btn-secondary" style="padding:4px 8px; font-size:12px;" onclick="deleteTrade('${p.execIds ? p.execIds.join(',') : ''}')" title="Delete">
                        <i class="ri-delete-bin-line" style="color:var(--danger)"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateTradeField(execId, field, value) {
    if (!execId) return;
    let exec = appState.trades.find(t => t.id === execId);
    if (exec) {
        if (field === 'target' || field === 'currentPrice') {
            exec[field] = value ? parseFloat(value) : "";
        } else {
            exec[field] = value;
        }
        saveState();
        loadTradingPage();
        if (document.getElementById("dashboard").classList.contains("active")) {
            loadDashboardPage();
        }
    }
}

function deleteTrade(execIdsStr) {
    if (!execIdsStr) return;
    
    if (confirm("Are you sure you want to delete this trade and its underlying executions?")) {
        const idsToDelete = execIdsStr.split(',');
        appState.trades = appState.trades.filter(t => !idsToDelete.includes(t.id));
        saveState();
        loadTradingPage();
    }
}

function openTradeModal(execId) {
    document.getElementById("trade-edit-id").value = "";
    document.getElementById("trade-symbol").value = "";
    document.getElementById("trade-date").value = new Date().toISOString().split("T")[0];
    document.getElementById("trade-type").value = "buy";
    document.getElementById("trade-qty").value = "1";
    document.getElementById("trade-price").value = "";
    document.getElementById("trade-target").value = "";
    document.getElementById("trade-remarks").value = "";
    
    if (execId) {
        let exec = appState.trades.find(t => t.id === execId);
        if (exec) {
            document.getElementById("trade-edit-id").value = exec.id;
            document.getElementById("trade-symbol").value = exec.symbol;
            document.getElementById("trade-date").value = exec.date;
            document.getElementById("trade-type").value = exec.type;
            document.getElementById("trade-qty").value = exec.quantity;
            document.getElementById("trade-price").value = exec.price;
            document.getElementById("trade-target").value = exec.target || "";
            document.getElementById("trade-remarks").value = exec.remarks || "";
        }
    }
    
    document.getElementById("add-trade-modal").classList.add("active");
}

function saveTradeEntry() {
    let id = document.getElementById("trade-edit-id").value;
    let symbol = document.getElementById("trade-symbol").value.trim().toUpperCase();
    let date = document.getElementById("trade-date").value;
    let type = document.getElementById("trade-type").value;
    let qty = parseFloat(document.getElementById("trade-qty").value);
    let price = parseFloat(document.getElementById("trade-price").value);
    let target = parseFloat(document.getElementById("trade-target").value) || 0;
    let remarks = document.getElementById("trade-remarks").value.trim();
    
    if (!symbol || !date || isNaN(qty) || isNaN(price)) {
        alert("Please fill all required fields correctly.");
        return;
    }
    
    if (id) {
        let exec = appState.trades.find(t => t.id === id);
        if (exec) {
            exec.symbol = symbol;
            exec.date = date;
            exec.type = type;
            exec.quantity = qty;
            exec.price = price;
            exec.target = target;
            exec.remarks = remarks;
        }
    } else {
        appState.trades.push({
            id: "tr_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
            symbol,
            date,
            type,
            quantity: qty,
            price,
            target,
            remarks
        });
    }
    
    saveState();
    closeAllModals();
    loadTradingPage();
}
function closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
}

window.addEventListener("DOMContentLoaded", () => {
    initAppState();
    
    // Add click outside to close all modals
    document.querySelectorAll(".modal-overlay").forEach(m => {
        m.addEventListener("click", function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });
    
    // Restore Theme
    if (!appState.settings.theme) {
        appState.settings.theme = "dark";
    }
    document.documentElement.setAttribute("data-theme", appState.settings.theme);
    
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


