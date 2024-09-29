// import React, { Component } from 'react';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

// export class ExpenseList extends Component {
const ExpenseList = ({ handleDelete, expenses, handleEdit, clearItems }) => {
  // render() {
  // console.log(props.initalExpenses);
  return (
    <>
      <ul className="list">
        {/* ExpenseItem */}
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};
// }

export default ExpenseList;
