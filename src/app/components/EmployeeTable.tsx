import Link from "next/link";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
// import * as Avatar from "@radix-ui/react-avatar";

type Employee = {
  dob: {
    age: number;
    date: string;
  };
  email: string;
  gender: string;
  name: {
    last: string;
    first: string;
    title: string;
  };
  location: {
    city: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    country: string;
    postcode: number;
    state: string;
    street: {
      number: number;
      name: string;
    };
    timezone: {
      description: string;
      offset: string;
    };
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

const EmployeeTable = ({ employees }: { employees: Employee[] }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-slate-800">
          <th className="p-2"></th>
          <th className="p-2">Name</th>
          <th className="p-2">Gender</th>
          <th className="p-2">Age</th>
          <th className="p-2">City</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index} className="bg-slate-700 cursor hover:bg-slate-600">
            <td className="p-2">
              <Link href={`/employee/${index}`}>
                <div className="flex justify-center">
                  <img
                    src={employee.picture.thumbnail}
                    alt="Employee Thumbnail"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </Link>
            </td>
            <td className="flex justify-center p-2 hover:underline">
              <Link href={`/employee/${index}`}>
                {`${employee.name.title} ${employee.name.first} ${employee.name.last}`}
              </Link>
            </td>
            <td className="p-2">
              <span className="w-full flex justify-center">
                {employee.gender}
              </span>
            </td>
            <td className="p-2">
              <span className="w-full flex justify-center">
                {employee.dob.age}
              </span>
            </td>
            <td className="p-2">
              <span className="w-full flex justify-center">
                {employee.location.city}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
