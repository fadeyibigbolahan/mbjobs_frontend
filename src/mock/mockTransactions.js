// src/mock/mockTransactions.js

const transactionTypes = ["credit", "debit"];
const statuses = ["pending", "completed", "failed"];
const detailsList = [
  "Wallet top-up",
  "Event booking",
  "Membership fee",
  "Referral bonus",
  "Admin credit",
  "Withdrawal request",
  "Event refund",
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateMockTransactions = (count = 10) => {
  const transactions = [];

  for (let i = 0; i < count; i++) {
    const transactionType = getRandomElement(transactionTypes);
    const amount =
      transactionType === "credit"
        ? Math.floor(Math.random() * 5000 + 1000)
        : Math.floor(Math.random() * 3000 + 500);

    transactions.push({
      _id: `txn_${i + 1}`,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 1000000000)
      ).toISOString(),
      amount,
      transactionType,
      status: getRandomElement(statuses),
      details: getRandomElement(detailsList),
    });
  }

  return transactions;
};
