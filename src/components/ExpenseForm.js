import React from 'react';
import { MdSend } from 'react-icons/md';
import './ExpenseForm.css';

// 두개 const 내렸음
const ExpenseForm = ({
  handleCharge,
  charge,
  handleAmount,
  amount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="id">지출 항목</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="예) 렌트비"
            value={charge} // 값
            onChange={handleCharge} // 이벤트 -> 이벤트가 있으면 appjs의 const에 e 파라미터를 받아야됨
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="id">비용</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="예) 100"
            value={amount} // 값
            onChange={handleAmount} // 이벤트 -> 이벤트가 있으면 appjs의 const에 e 파라미터를 받아야됨
          ></input>
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? '수정' : '제출'}
        제출
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
