import EmployeeTable from "./components/EmployeeTable";

const getEmployees = async () => {
  const res = await fetch(
    "https://randomuser.me/api/?results=10&seed=abc&inc=age,dob,gender,location,name,picture"
  );
  const employees = await res.json();
  return employees.results;
};

const EmployeesPage = async () => {
  const employees = await getEmployees();
  return (
    <div className="bg-slate-900 p-4 h-screen">
      <h1 className="text-4xl py-6">Employees</h1>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default EmployeesPage;
