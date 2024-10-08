import { Radio, Select, Table } from 'antd';
import { CiSearch } from "react-icons/ci";
import { parse, unparse } from 'papaparse'; // Import the unparse function

import React, { useState } from 'react'
import { toast } from 'react-toastify';

const TransactionTable = ({ trancaction, addTransaction, fetchTransaction }) => {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState('');
    const [typeFilter, setTypeFilter] = useState("");
    const { Option } = Select;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    let filteredTransactions = trancaction.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    );

    let sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortKey == "date") {
            return new Date(a.date) - new Date(b.date)
        }
        else if (sortKey == "amount") {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });

    function exportCSV() {
        var csv = unparse({
            fields: ["name", "type", "tag", "date", "amount"],
            data: trancaction,
        });
        var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        var url = window.URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        link.click();
    }

    // function importFromCsv(event) {
    //     event.preventDefault();
    //     try {
    //         parse(event.target.files[0], {
    //             header: true,
    //             complete: async function (results) {
    //                 for (const trancaction of results.data) {
    //                     console.log("Transactions", trancaction);
    //                     const newtransaction = {
    //                         ...trancaction,
    //                         amount: parseFloat(trancaction.amount),
    //                     };
    //                     await addTransaction(newtransaction, true)
    //                 }
    //             }
    //         });
    //         toast.success("All Transaction Added");
    //         fetchTransaction();
    //         event.target.files = null;
    //     } catch (e) {
    //         toast.error(e.message);
    //     }
    // }

    function importFromCsv(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if (!file || !file.name.endsWith('.csv')) {
          toast.error('Please select a valid CSV file');
          return;
        }
        try {
          parse(file, {
            header: true,
            complete: async function (results) {
              for (const transaction of results.data) {
                console.log("Transactions", transaction);
                const newTransaction = {
                  ...transaction,
                  amount: parseFloat(transaction.amount),
                };
                await addTransaction(newTransaction, true);
              }
            }
          });
          toast.success("All Transactions Added");
          fetchTransaction();
          event.target.value = null; // Clear the input value
        } catch (e) {
          toast.error(e.message);
        }
      }
    return (
        <>
            <div
                style={{ width: "90%", padding: "0rem 2rem", margin:"auto"}}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                        alignItems: "center", // Fix the typo here
                        marginBottom: "1rem",
                    }}
                >
                    <div className='input-flex'>
                        <CiSearch />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by Name' />
                    </div>
                    <Select
                        className='select-input'
                        onChange={(value) => setTypeFilter(value)}
                        value={typeFilter}
                        placeholder="Filter"
                        allowClear
                    >
                        <Option value="">All</Option>
                        <Option value="income">Income</Option>
                        <Option value="expense">expense</Option>
                    </Select>
                    </div>

                    <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // gap: "1rem",
                        width:"100%",
                        alignItems: "center", // Fix the typo here
                        marginBottom: "1rem",
                    }}
                >
                    <Radio.Group
                        className='input-radio'
                        onChange={(e) => setSortKey(e.target.value)}
                        value={sortKey}
                    >
                        <Radio.Button value="">No Sort</Radio.Button>
                        <Radio.Button value="date">Sort By Date</Radio.Button>
                        <Radio.Button value="amount">Sort by Amount</Radio.Button>
                    </Radio.Group>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        width: "400px"
                    }}>
                        <button className='btn' onClick={exportCSV}>Export to CSV</button>
                        <label for="file-csv" className='btn btn-blue' >
                            Import from CSV
                        </label>
                        <input
                            id='file-csv'
                            type='file'
                            accept='.csv'
                            required
                            style={{ display: "none" }}
                            onChange={importFromCsv}
                        />
                        </div>
                    </div>
                <Table dataSource={sortedTransactions} columns={columns} /> // Use sortedTransactions here
            </div>
        </>
    )
}

export default TransactionTable