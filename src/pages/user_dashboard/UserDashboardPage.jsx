import React, { useEffect, useState } from "react";
import "./UserDashboardPage.css";
import { BiChevronLeft } from "react-icons/bi";

import Transaction from "../../components/transaction/Transaction.jsx";
import Branding from "../../components/branding/Branding.jsx";

export default function UserDashboardPage() {
    const [users, setUsers] = useState([]);
    const [userHierarchy, setUserHierarchy] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [incomeData, setIncomeData] = useState([
        { incomeType: "Comprehensive", daily: 3.37, total: 15007.89 },
        { incomeType: "Reserve", daily: 3.12, total: 7.98 },
        { incomeType: "Team", daily: 0.25, total: 0 },
        { incomeType: "Activity", daily: 0, total: 15000 },
        { incomeType: "Bid", daily: 0, total: 0 },
        { incomeType: "Stake", daily: 0, total: 0 }
    ]);

    const [username, setUsername] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [error, setError] = useState("");
    const [depositBalanceError, setDepositBalanceError] = useState("");

    const [panelOpen, setPanelOpen] = useState(false);
    const togglePanel = () => setPanelOpen(!panelOpen);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        fetchUsers();
        fetchTransactions();
        fetchUserHierarchy();
    }

    const OpenMLMTreePopup = () => {
        window.open(
            '/tree', 
            '_blank', 
            'width=1000,height=700,toolbar=no,scrollbars=no,resizable=no,menubar=no,status=no');
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users`);
            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const fetchTransactions = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/transactions`);
            if (!res.ok) {
                throw new Error("Failed to fetch transactions");
            }
            const data = await res.json();
            setTransactions(data);
        } catch (err) {
            console.error("Error fetching transactions:", err);
        }
    };

    const fetchUserHierarchy = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/hierarchy`);
            if (!res.ok) {
                throw new Error("Failed to fetch hierarchy");
            }
            const data = await res.json();
            setUserHierarchy(data);
        } catch (err) {
            console.error("Error fetching user hierarchy:", err);
        }
    };


    const handleUserClick = async (userId) => {
        setSelectedUserId(userId);
        // Simulate API call to fetch income
        // Replace this with: fetch(`/api/users/${userId}`)
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setIncomeData({
            daily: data.dailyIncome ?? 0,
            total: data.totalIncome ?? 0,
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // clear previous error

        try {
            const res = await fetch("/api/v1/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, referralCode }),
            });

            if (!res.ok) {
                const errData = await res.json();
                setError(errData.message || "Registration failed.");
            } else {
                reload();

                // Success: clear form
                setUsername("");
                setReferralCode("");
                setError("");
                // Optionally refresh user list or user hierarchy
            }
        } catch (err) {
            setError("Network error or server unreachable.");
        }
    };

    const handleDepositBalance = async (e) => {
        e.preventDefault();
        setDepositBalanceError("");

        const formData = new FormData(e.target);
         const data = {
            userId: parseInt(formData.get("userId"), 10),
            amount: parseFloat(formData.get("amount")),
            transactionType: "DEPOSIT",
            remarks: formData.get("remarks")
        };

        try {
            const res = await fetch("/api/v1/transactions/deposit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                setDepositBalanceError(errData.message || "Deposit Balance failed.");
            } else {
                reload();
                e.target.reset(); // clear form fields
                togglePanel();
            }
        } catch (err) {
            setDepositBalanceError("Network error or server unreachable.");
        }
    };

    return (
        <div className="dashboard-container">
           {panelOpen && (
            <>
                <div className="right-panel-backdrop" onClick={togglePanel}></div>
                <div className="right-panel">
                <h2>Add Balance</h2>
                <form style={{marginTop: '32px'}} onSubmit={handleDepositBalance}>
                    <label>Username</label>
                    <select name="userId">
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                    </select>

                    <select name="transactionType">
                        <option key="DEPOSIT" value="DEPOSIT">Deposit</option>
                        <option key="WITHDRAWAL" value="WITHDRAWAL">Withdraw</option>
                        <option key="TRANSFER" value="TRANSFER" disabled>Transfer</option>
                        <option key="INVEST" value="INVEST" disabled>Invest</option>
                    </select>

                    <label>Balance</label>
                    <input type="number" name="amount" placeholder="Enter amount" required />

                    <label>Remarks</label>
                    <input type="text" name="remarks" placeholder="Optional" />

                    <button type="submit">Submit</button>
                    {depositBalanceError && <div className="alert error">{depositBalanceError}</div>}
                </form>
                </div>
            </>
            )}

            <button className="floating-icon" onClick={togglePanel}>
                <BiChevronLeft size={20} />
                Add Balance
            </button>

             <button className="floating-icon" onClick={togglePanel}>
                <BiChevronLeft size={20} />
                Add Balance
            </button>




            {/* Column 1: Registration + Users Table */}
            <div className="column" style={{ width: "30%" }}>
                <h2>User Registration</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="Referral Code" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
                    <button type="submit">Submit</button>
                    {error && <div className="alert error">{error}</div>}
                </form>

                <hr className="section-divider" />

                <div style={{display: 'flex'}}>
                    <h3>Users</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Referral</th>
                            <th>Resv Balance</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="clickable"
                                onClick={() => handleUserClick(user.id)}
                            >
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.referralCode}</td>
                                <td>{user.reserveBalance}</td>
                                <td>{user.level}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <br/>
                <hr className="section-divider" />

                
                <h3>User Hierarchy <button className="btn-open" onClick={OpenMLMTreePopup}> open</button></h3>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ancestor</th>
                                <th>Descendant</th>
                                <th>Depth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userHierarchy.map((hierarchy) => (
                            <tr key={hierarchy.id}>
                                    <td>{hierarchy.id}</td>
                                    <td>{hierarchy.ancestor}</td>
                                    <td>{hierarchy.descendant}</td>
                                    <td>{hierarchy.depth}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>

            {/* Column 2: Income Table */}
            <div className="column">
                <div style={{display: 'flex'}}>
                    <h2>Income</h2>
                    <input type="number" placeholder="Filter userId" className="filter"/>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Daily Income</th>
                            <th>Total Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomeData.map((income) => (
                            <tr
                                key={income.incomeType}
                                className="clickable"
                                onClick={() => handleUserClick(income.incomeType)}
                            >
                                <td>{income.incomeType}</td>
                                <td>{income.daily}</td>
                                <td>{income.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br/>
                <button type="button" className="btn-green">Schedule</button>

                <hr className="section-divider" />

                {/* <div style={{display: 'flex'}}>
                    <h3>MyTeam</h3>
                </div> */}

                <Branding/>
                
                


            </div>

            {/* Column 3: Transactions Table */}
            <div className="column">
                <div style={{display: 'flex'}}>
                    <h2>Transactions</h2>
                    <input type="number" placeholder="Filter userId" className="filter"/>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>UserId</th>
                            <th>Amount</th>
                            <th>Balance</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr
                                key={tx.id}
                                className="clickable"
                                onClick={() => handleUserClick(tx.id)}
                            >
                                <td>{tx.id}</td>
                                <td>{tx.userId}</td>
                                <td>{tx.amount}</td>
                                <td>{tx.balance}</td>
                                <td>{tx.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Transaction/>
               
            </div>
        </div>
    );
}
