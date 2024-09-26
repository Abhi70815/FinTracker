import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Cards from '../Cards'
import { Modal } from 'antd';
import AddExpense from '../Modals/AddExpense';
import AddIncomes from '../Modals/AddIncomes';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import moment from 'moment';
import TransactionTable from '../TransactionsTable';
import ChartComponent from '../Charts';
import NoTransaction from '../NoTransaction';

const Dashboard = () => {
  const [authUser] = useAuthState(auth);
  // console.log(authUser.uid)
  const user = authUser;
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income,setIncome]=useState(0);
  const [expense,setExpense]= useState(0);
  const [totalBalance, setTotalBalance]=useState(0);

  console.log("Income",income,"expense",expense,"totalBalance",totalBalance)

  const showExpenseModel = () => {
    setIsExpenseModalVisible(true);
  }

  const showIncomeModel = () => {
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }

  function onFinish(value, type) {
    console.log(value.name);
    const newTransction = {
      type: type ,
      date: value.date.format("YYYY-MM-DD"),
      amount: value.amount ,
      name: value.name ,
      tag: value.tag
    };
    // console.log(value.tag)
    addTransaction(newTransction);
  };

  async function addTransaction(newTransaction, many) {
    if (!user) {
      console.error("User is not authenticated");
      toast.error("Please authenticate before adding a transaction");
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transaction`), newTransaction);
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      setTransaction((prevTransactions) => [...prevTransactions, newTransaction]);
    
      console.log("Document written with ID: ", docRef.id);
     if(!many) toast.success("Transaction Added!");
      setTransaction([...transaction,newTransaction]);
    } catch (e) {
      console.error("Error adding document: ", e);
      if(!many)toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    if(user){

      fetchTransaction();
    }
  }, [user]);

 useEffect(()=>{
   calculateBalance();
 },[transaction])

 function calculateBalance(){
    let incomeTotal=0;
    let expenseTotal=0;

    transaction.forEach((transaction)=>{
      console.log(transaction)
      if(transaction.type === "Income"){
        incomeTotal += parseInt(transaction.amount);
      }else{
        expenseTotal+= parseInt(transaction.amount);
      }
      setIncome(incomeTotal);
      setExpense(expenseTotal);
      setTotalBalance(incomeTotal  - expenseTotal);
    })
 }

  async function fetchTransaction() {
    setLoading(true);
    if (user) {

      const q = query(collection(db, `users/${user.uid}/transaction`));
      let transactionsArray =[];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data())
      });
      setTransaction(transactionsArray);
      console.log(transactionsArray)
      toast.success("Transactions Fetched! ")
    }
    setLoading(false);
  }

  let sortedTransactions=transaction.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      });

  return(
    <div>
      <Header />
          { loading ? <p>Loading.....</p> :
            <>
          <Cards
          income={income}
          expense={expense}
          totalBalance={totalBalance}
           showExpenseModel={showExpenseModel}
            showIncomeModel={showIncomeModel}
            />

          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

          <AddIncomes
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
        {transaction.length != 0 ? <ChartComponent sortedTransactions={sortedTransactions}/> : <NoTransaction/>}
          <TransactionTable trancaction={transaction}
                 addTransaction={addTransaction}
                 fetchTransaction={fetchTransaction}
           />
          </>}
    </div>
  )
}

export default Dashboard