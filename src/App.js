import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

const App = () => {
  // userState로 바꾸기
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     expense: [
  //       { id: 1, charge: '렌트비', amount: 1600 },
  //       { id: 2, charge: '교통비', amount: 400 },
  //       { id: 3, charge: '식사비', amount: 1200 },
  //     ],
  //   };
  // }

  const [charge, setCharge] = useState('');

  const [id, setId] = useState('');

  const [edit, setEdit] = useState(false);

  // useStateSnippet 하고 탭하면 됨
  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({ show: false });

  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 1600 },
    { id: 2, charge: '교통비', amount: 400 },
    { id: 3, charge: '식사비', amount: 1200 },
  ]);

  const clearItems = () => {
    setExpenses([]);
  };

  // 값이 바뀌니까 호출할때 사용할것
  // 함수 내리는 법은 아래 return에 넣어준다.
  const handleCharge = (e) => {
    console.log(e.target.value); // 클릭 했을 때 생성된 이벤트 확인
    setCharge(e.target.value);
  }; // 클릭했을때 이벤트를 e로 받아오는것

  const handleAmount = (e) => {
    console.log(e.target.valueAsNumber);
    setAmount(e.target.valueAsNumber); // 넘어오면 string이라서 int로 바꾸기 위함
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expenses) => expenses.id !== id);
    console.log(newExpenses);
    setExpenses(newExpenses);
    handleAlert({
      type: 'danger',
      text: '아이템이 삭제 되었습니다.',
    });
  };

  const handleAlert = ({ type, text }) => {
    // 제출 삭제 handle에서 사용
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  // 제출 기능
  const handleSubmit = (e) => {
    e.preventDefault(); // 제출 누르면 새로고침되는 기본 행위를 막는다.
    if (charge !== '' && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' });
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        const newExpenses = [...expenses, newExpense]; // 불변성을 지키기위해 업데이트하기전에 새로운거 하나 더 만듬
        setExpenses(newExpenses);
        handleAlert({ type: 'success', text: '아이템이 생성되었습니다.' });
      }
      setCharge('');
      setAmount(0);
    } else {
      console.log('error');
      handleAlert({
        type: 'danger',
        text: 'charge는 빈 값일 수 없으면 amount는 0 보다 커야 합니다.',
      });
    }
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        {/* Expense Form */}
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit} // props로 내리는 행위
          edit={edit}
        />
      </div>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div
        style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}
      >
        <p style={{ fontSize: '2rem' }}>
          총지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
};

export default App;
