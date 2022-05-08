// create variable to hold db connection
let db;
// -- IndexedDB database called 'budget_tracker_kt' and set it to version 1
// When the connection to the database is open, it's emitting an event that the 'request' variable will be able to capture
const request = window.indexedDB.open('budget_tracker_kt', 1); // request variable to act as an event listener  

// -- This event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
  // save a reference to the database 
  const idb = event.target.result;
  // create an object-store (table) called 'new_bank_transaction' to hold the transaction data
  idb.createObjectStore('new_bank_transaction', { autoIncrement: true });   // auto incrementing index for each new set of data we insert
};

request.onsuccess = function(event){
  db = event.target.result;
  if(navigator.onLine){  // enable uploading when internet is back on
  }
};

request.onerror = function(event){
  console.log(event.target.errorCode);
}

// -- This function will be executed if we attempt to submit a new transaction and there's no internet connection

function saveRecord(record) {
  // Explicitly  open a new transaction with the database with read and write permissions 
  const transaction = db.transaction(['new_bank_transaction'], 'readwrite');
  const transactionObjectStore = transaction.objectStore('new_bank_transaction'); // access the object store for `new_bank_transaction`
  transactionObjectStore.add(record); // add record to storage with add method
}

function uploadTransaction() {
  // Explicitly open a transaction on your db
  const transaction = db.transaction(['new_bank_transaction'], 'readwrite');
  const transactionObjectStore = transaction.objectStore('new_bank_transaction');  // access your object store
  
  const getAll = transactionObjectStore.getAll(); // get all records from store and set to a variable 

  // upon a successful .getAll() execution, run this function
  getAll.onsuccess = function() {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch('/api/transaction', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open 1 more transaction to access the new_bank_transaction object store in order to empty it.
          const transaction = db.transaction(['new_bank_transaction'], 'readwrite');
          const transactionObjectStore = transaction.objectStore('new_bank_transaction');   // 
          transactionObjectStore.clear(); // clear all items in your store

          alert('All saved transactions have been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
} // end of uploadTransaction method
 
// Ans: Add a browser event listener to check for a network status change, i.e. back online after a short temporary outage
window.addEventListener('online', uploadTransaction);

 

